#!/usr/bin/env node
// Finds repositories worth a post and writes a writing brief to data/queue.json.
//
// It never touches src/content: nothing publishes without a person writing it.
//
//   node scripts/discover.mjs            # normal run
//   node scripts/discover.mjs --selftest # filter + score checks, no network
//
// Auth: GITHUB_TOKEN, else `gh auth token`, else unauthenticated (10 search
// requests/minute and 60 core requests/hour, which this run will exhaust).

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data');
const CONTENT = join(ROOT, 'src', 'content', 'news');

const NEW_DAYS = 90; // "created recently" window
const PUSH_DAYS = 7; // "actively worked on" window
const ENRICH = 25; // how many candidates get README + release lookups
const KEEP = 20; // how many make it into the queue

// The genre that collects stars faster than software does. Covering it is how a
// site about GitHub stops being about code.
const LIST_WORDS =
  /\b(awesome|roadmap|interview|interviews|cheat[- ]?sheet|cheatsheets?|tutorials?|courses?|handbook|bootcamp|learn|resources|collection|curated|guide|books?|notes|papers|examples|templates|boilerplate|starter|dotfiles|leetcode|freecodecamp|100[- ]?days)\b/i;

// A README's first two thousand characters are usually badges. Stripping the
// shields, logo blocks and centring markup is the difference between a brief
// that describes the software and one that describes a trophy shelf.
export function readablePart(md) {
  return md
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g, '') // linked badge
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // image
    .replace(/<img[^>]*>/gi, '')
    .replace(/<\/?(div|p|a|table|tr|td|th|sub|sup|b|br|h1|h2|h3|center|picture|source|details|summary)[^>]*>/gi, '')
    .replace(/^[ \t]*\|.*\|[ \t]*$/gm, '') // badge tables
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const json = (p, fallback) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : fallback);
const iso = (d) => d.toISOString().slice(0, 10);
const daysAgo = (n) => iso(new Date(Date.now() - n * 86400000));

function token() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

const TOKEN = token();

async function api(path, { raw = false } = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json',
      'User-Agent': 'github-highlights-discover',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  });
  if (res.status === 404) return null;
  if (res.status === 403 || res.status === 429) {
    const reset = Number(res.headers.get('x-ratelimit-reset') || 0) * 1000;
    throw new Error(`rate limited on ${path}${reset ? `, resets ${new Date(reset).toLocaleTimeString()}` : ''}`);
  }
  if (!res.ok) throw new Error(`${res.status} on ${path}`);
  return raw ? res.text() : res.json();
}

// --- filters -----------------------------------------------------------------
// Split out so --selftest can exercise them without a network call.

export function isJunk(repo, { covered = new Set(), rejected = new Set() } = {}) {
  if (covered.has(repo.full_name.toLowerCase())) return 'already covered';
  if (rejected.has(repo.full_name.toLowerCase())) return 'on the reject list';
  if (repo.fork) return 'fork';
  if (repo.archived || repo.disabled) return 'archived';
  if (!repo.license) return 'no license';
  if (!repo.description || repo.description.length < 20) return 'no description';
  if (LIST_WORDS.test(repo.name) || LIST_WORDS.test(repo.description)) return 'list/tutorial repo';
  if (repo.topics?.some((t) => LIST_WORDS.test(t))) return 'list/tutorial topic';
  return null;
}

// Transparent integer sum, printed per candidate, so a bad ranking is debuggable
// instead of being an opaque number nobody can argue with.
export function score(repo, gained) {
  const parts = {};
  // Momentum is the signal; absolute stars mostly measure how old a repo is.
  parts.momentum = Math.min(30, Math.round((gained ?? 0) / 40) * 3);
  parts.stars = Math.min(12, Math.round(Math.log10(Math.max(repo.stargazers_count, 1)) * 4));
  const ageDays = (Date.now() - Date.parse(repo.created_at)) / 86400000;
  parts.fresh = ageDays < NEW_DAYS ? 8 : ageDays < 365 ? 4 : 0;
  const pushedDays = (Date.now() - Date.parse(repo.pushed_at)) / 86400000;
  parts.active = pushedDays < 7 ? 6 : pushedDays < 30 ? 3 : 0;
  parts.docs = repo.homepage ? 3 : 0;
  // A repo whose issues are all open and untouched is a story about abandonment,
  // not about software worth installing.
  parts.issues = repo.open_issues_count > 400 ? -4 : 0;
  parts.topics = Math.min(4, repo.topics?.length ?? 0);
  const total = Object.values(parts).reduce((a, b) => a + b, 0);
  return { total, parts };
}

// --- run ---------------------------------------------------------------------

async function search(q) {
  const out = [];
  for (const page of [1, 2]) {
    const res = await api(`/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=50&page=${page}`);
    out.push(...(res?.items ?? []));
    if ((res?.items?.length ?? 0) < 50) break;
  }
  return out;
}

function coveredRepos() {
  if (!existsSync(CONTENT)) return new Set();
  const set = new Set();
  for (const f of readdirSync(CONTENT).filter((f) => f.endsWith('.md'))) {
    const text = readFileSync(join(CONTENT, f), 'utf8');
    for (const m of text.matchAll(/github\.com\/([\w.-]+)\/([\w.-]+)/g)) {
      set.add(`${m[1]}/${m[2]}`.toLowerCase());
    }
  }
  return set;
}

async function main() {
  mkdirSync(DATA, { recursive: true });
  const seenPath = join(DATA, 'seen.json');
  const seen = json(seenPath, {});
  const rejected = new Set(json(join(DATA, 'rejected.json'), []).map((s) => s.toLowerCase()));
  const covered = coveredRepos();

  if (!TOKEN) console.warn('! no GITHUB_TOKEN and no gh login: 60 core requests/hour, this may not finish\n');

  const found = new Map();
  for (const q of [
    `created:>=${daysAgo(NEW_DAYS)} stars:>150`,
    `pushed:>=${daysAgo(PUSH_DAYS)} stars:200..20000`,
  ]) {
    const items = await search(q);
    console.log(`query "${q}" -> ${items.length} repos`);
    for (const r of items) found.set(r.full_name, r);
  }

  const dropped = new Map();
  const ranked = [];
  for (const repo of found.values()) {
    const reason = isJunk(repo, { covered, rejected });
    if (reason) {
      dropped.set(reason, (dropped.get(reason) ?? 0) + 1);
      continue;
    }
    const previous = seen[repo.full_name];
    const gained = previous ? repo.stargazers_count - previous.stars : undefined;
    ranked.push({ repo, gained, ...score(repo, gained) });
  }
  // Stars break ties: on the first run every delta is undefined, so momentum is
  // zero for everyone and the score alone would leave the order to chance.
  ranked.sort((a, b) => b.total - a.total || b.repo.stargazers_count - a.repo.stargazers_count);

  console.log(`\nkept ${ranked.length}, dropped ${[...dropped].map(([k, v]) => `${v} ${k}`).join(', ') || 'none'}`);
  if (!Object.keys(seen).length) console.log('first run: no star deltas yet, this run only seeds the baseline');

  // Two extra requests per repo, so only the shortlist is enriched.
  const queue = [];
  for (const { repo, gained, total, parts } of ranked.slice(0, ENRICH)) {
    const [release, rawReadme] = await Promise.all([
      api(`/repos/${repo.full_name}/releases/latest`).catch(() => null),
      api(`/repos/${repo.full_name}/readme`, { raw: true }).catch(() => null),
    ]);
    const readme = rawReadme ? readablePart(rawReadme) : null;
    // A repo with no real README cannot be written about honestly.
    if (!readme || readme.length < 500) {
      console.log(`  skip ${repo.full_name}: thin README`);
      continue;
    }
    queue.push({
      full_name: repo.full_name,
      owner: repo.owner.login,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      starsGained: gained,
      language: repo.language,
      license: repo.license?.spdx_id ?? 'NOASSERTION',
      topics: repo.topics ?? [],
      createdAt: repo.created_at.slice(0, 10),
      pushedAt: repo.pushed_at.slice(0, 10),
      openIssues: repo.open_issues_count,
      homepage: repo.homepage || undefined,
      latestRelease: release ? { tag: release.tag_name, date: release.published_at.slice(0, 10) } : undefined,
      snapshotAt: iso(new Date()),
      score: total,
      scoreParts: parts,
      readme: readme.slice(0, 3000),
    });
    if (queue.length >= KEEP) break;
  }

  // The baseline covers everything the search returned, junk included: a repo
  // filtered out today can still be the delta reference if it stops being junk.
  for (const repo of found.values()) {
    seen[repo.full_name] = { stars: repo.stargazers_count, checkedAt: iso(new Date()) };
  }
  writeFileSync(seenPath, JSON.stringify(seen, null, 0) + '\n');
  writeFileSync(join(DATA, 'queue.json'), JSON.stringify(queue, null, 2) + '\n');

  console.log(`\nwrote data/queue.json with ${queue.length} briefs:`);
  for (const q of queue) {
    console.log(`  ${String(q.score).padStart(3)}  ${q.full_name}  ${q.stars}★${q.starsGained ? ` (+${q.starsGained})` : ''}  ${q.language ?? '-'}`);
  }
}

// --- self-check --------------------------------------------------------------

function selftest() {
  const assert = (cond, msg) => {
    if (!cond) throw new Error(`selftest: ${msg}`);
  };
  const base = {
    full_name: 'acme/thing',
    name: 'thing',
    description: 'A fast incremental build system for large repositories',
    fork: false,
    archived: false,
    license: { spdx_id: 'MIT' },
    topics: ['build'],
    stargazers_count: 1000,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    pushed_at: new Date().toISOString(),
    open_issues_count: 12,
    homepage: '',
  };
  assert(isJunk(base) === null, 'a normal repo must survive');
  const badges = [
    '[![Build](https://img.shields.io/x.svg)](https://ci.example)',
    '<img src="logo.svg" />',
    '',
    '# Tool',
    '',
    'Does the thing.',
  ].join('\n');
  assert(readablePart(badges) === '# Tool\n\nDoes the thing.', 'badges and logos must be stripped from the brief');
  assert(isJunk({ ...base, fork: true }) === 'fork', 'forks are dropped');
  assert(isJunk({ ...base, license: null }) === 'no license', 'unlicensed repos are dropped');
  assert(isJunk({ ...base, name: 'awesome-rust' }) === 'list/tutorial repo', 'awesome lists are dropped');
  assert(
    isJunk({ ...base, description: 'Curated resources to learn systems programming' }) === 'list/tutorial repo',
    'tutorial descriptions are dropped',
  );
  assert(isJunk({ ...base, topics: ['cheatsheet'] }) === 'list/tutorial topic', 'list topics are dropped');
  assert(
    isJunk(base, { covered: new Set(['acme/thing']) }) === 'already covered',
    'a repo already written about is dropped',
  );

  const quiet = score(base, 0).total;
  const rising = score(base, 900).total;
  assert(rising > quiet, 'star momentum must outrank a flat week');
  assert(score({ ...base, open_issues_count: 900 }, 0).total < quiet, 'an issue pileup must cost points');
  const old = score({ ...base, created_at: new Date(Date.now() - 900 * 86400000).toISOString() }, 0).total;
  assert(old < quiet, 'a new repo must outrank an old one, all else equal');
  console.log('selftest ok');
}

if (process.argv.includes('--selftest')) selftest();
else await main();
