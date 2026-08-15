# GitHub Highlights — build plan

A daily English news site about newly-interesting open-source projects on GitHub.
Same architecture and design language as [hamechona](../hamechona): Astro static site,
markdown content collection, future-dated publishing queue drained by a GitHub Actions
cron. One repo per post. Discovery is scripted; writing stays human/Claude.

---

## 1. Decisions locked

| Question | Answer |
|---|---|
| Language | English, LTR |
| Pipeline | Script discovers + scores candidates → queue JSON → posts written in-session |
| Post shape | One repository per post |
| Stack | Astro 7 static, zero UI framework, 3 npm deps (astro, @astrojs/rss, @astrojs/sitemap) |
| Host | GitHub Pages, org site `highlightsx.github.io` (root URL, no base path) |
| Cadence | 2 posts/day, published from a queue by `publishDate` |

## 2. What is copied from hamechona, unchanged

These are already load-bearing and correct; copy them verbatim and only rename strings.

- `astro.config.mjs` — `trailingSlash: 'never'`, `build.format: 'file'`, `assets: 'assets'`, sitemap with `/search` filtered out.
- `src/lib/posts.ts` — the single `publishedNews()` chokepoint that hides future-dated posts from *every* surface (pages, listings, RSS, search index). This is what makes the queue work.
- `src/pages/rss.xml.js`, `src/pages/search-index.json.ts`, `src/pages/search.astro`, `public/site.js` (theme toggle, command-palette search, reading progress, TOC builder).
- `src/components/*` — Header, Footer, Sidebar, NewsCard, Sources, Thumb, A11yWidget.
- `src/styles/style.css` — the dark bento system: `--bg #08090d`, violet `--accent #7c5cff`, cyan `--accent-2`, 18px radius cards, fixed radial glow behind the header, `html{font-size:90%}`.
- `.github/workflows/*.yml` — dual cron rows + local-hour guard (rewritten for Pages: build and deploy in one workflow, no build hook).

## 3. What changes

### 3.1 Localization strip (mechanical)
- `<html lang="en">`, drop `dir="rtl"`; `og:locale: en_US`; RSS `<language>en</language>`.
- CSS is already logical-property based (`margin-inline`, `inset-block-start`), so LTR needs no layout edits — only the RTL-specific bits in `style.css` get checked.
- Fonts: **Inter** (UI/body) + **JetBrains Mono** (repo names, commands, code) replacing Assistant.
- `src/lib/format.ts`: `heDate` → `enDate` (`Aug 15, 2026`), `topicSlug` loses the Hebrew-preserving branch and becomes plain kebab-case ASCII.

### 3.2 Content schema (`src/content.config.ts`)
Adds a `repo` object on top of hamechona's news schema. Facts are snapshotted at write
time, not fetched at build time — a static site that hits the GitHub API on every build
is a rate limit waiting to happen, and a star count that silently changes makes the prose
lie.

```ts
title, description, publishDate, category, tags, sources[≥1],
reviewed, corrections[], generated?
repo: {
  owner, name,                   // "zed-industries", "zed"
  url,                           // canonical https://github.com/owner/name
  stars, starsGained,            // snapshot + delta over the discovery window
  language,                      // primary language, null allowed
  license,                       // SPDX id or "none"
  createdAt, pushedAt,           // dates
  latestRelease?: { tag, date },
  homepage?,
  snapshotAt,                    // when the numbers were true
}
```

Rules enforced by the schema, not by review: at least one source; `repo.url` must match
`github.com/owner/name`; description ≤160; title ≤70.

### 3.3 Categories (`src/data/site.ts`)
Nine, each with a colour + an SVG icon path (feeds nav chip, sidebar dot, generated thumb),
all avoiding the violet that means "link":

| slug | name | covers |
|---|---|---|
| `ai` | AI & ML | models, agents, inference, RAG, training |
| `devtools` | Dev Tools | CLIs, editors, build systems, debuggers |
| `web` | Web | frameworks, frontend, browsers, CSS/JS |
| `infra` | Infrastructure | k8s, deploy, observability, networking |
| `data` | Data | databases, engines, pipelines, analytics |
| `security` | Security | scanners, crypto, auth, offensive/defensive |
| `languages` | Languages & Runtimes | compilers, VMs, type systems |
| `apps` | Apps & Self-Hosted | end-user OSS, homelab, productivity |
| `graphics` | Graphics & Games | rendering, engines, creative coding |

### 3.4 Thumbnail
`Thumb.astro` stays (deterministic slug-seeded SVG, nothing stored), with the circuit
lattice re-tuned into a **contribution-grid** motif — same mulberry32 seeding, cells instead
of nodes, category colour, category icon ghosted in the corner. Same 400×220 box, same code
shape, ~20 lines changed.

### 3.5 New component: `RepoFacts.astro`
The one genuinely new UI piece. A facts strip under the post H1: `owner/name` in mono
linking to GitHub, stars (+delta), language dot, license, age, last release. Reads
`post.data.repo` only — no fetching, no client JS.

## 4. Discovery pipeline

`scripts/discover.mjs` — one file, node:fetch, no dependencies. Run locally (`npm run
discover`) or by Actions on a schedule; output is a JSON file, never a published post.

**Sources** (GitHub REST, `GITHUB_TOKEN` for the 30 req/min search limit):
1. `search/repositories?q=created:>{90d} stars:>150 sort=stars` — new projects that landed hard.
2. `search/repositories?q=pushed:>{7d} stars:{300..8000} sort=updated` — sleepers waking up.
3. The trending scrape is deliberately **not** used: no API, breaks on markup changes.

**Velocity**: `stargazers` history is not in the API, so the script keeps
`data/seen.json` (`full_name → {stars, checkedAt}`) and computes `starsGained` as the delta
since the last run. First run has no delta; that is fine — it seeds the baseline.

**Filters** (drop, do not score): forks, archived, no license, no description, README under
500 chars, topics matching `awesome|roadmap|interview|book|cheatsheet|tutorial|course`,
name matching the same, already in `src/content/news/*.md` (`repo.url` grep), already
rejected in `data/rejected.json`.

**Score** (transparent integer sum, printed per candidate so a bad rank is debuggable):
`starsGained` normalized ×3 + release-in-window ×2 + has-docs-site + issue-response
activity + language diversity bonus (down-weights the 4th Python LLM wrapper of the week).

**Output** `data/queue.json` — top 20, each with the full fact set plus a README excerpt
(first 2000 chars) and the last 5 release titles. That file is the writing brief; the post
gets written from it, sources cited from the real URLs it contains.

**Guardrail**: the script never writes to `src/content/`. Nothing publishes without a human
pass. Posts land with `reviewed: false` until read.

## 5. Editorial format (per post, ~500-700 words)

1. **What it is** — one paragraph, no marketing verbs.
2. **Why it showed up now** — the release, the HN thread, the rewrite, the funding, the fork.
3. **How it actually works** — the one technical idea worth knowing.
4. **Try it** — the real install/run command, in a mono block, taken from the README.
5. **Where it is weak** — open issues, missing platforms, license traps, bus factor. This is the section that makes the site worth reading instead of a star-count feed.
6. **Sources** — repo, release notes, docs, discussion thread.

Non-negotiables inherited from hamechona: every claim traceable to a linked source; the
snapshot date shown next to the star count; corrections live on the post they correct and
aggregate to `/corrections`.

## 6. URL map

```
/                       feed, newest first
/{repo-slug}            post   (slug = repo name; owner-repo on collision)
/c/{category}           9 category pages
/t/{topic}              tag pages (our tags + selected GitHub topics)
/search                 client-side, noindex
/rss.xml  /sitemap.xml  /search-index.json  /robots.txt
/about /disclosure /corrections /privacy /terms /accessibility /glossary
```

`/disclosure` states the thing plainly: posts are drafted with AI assistance from public
repository data, every one is read by a human before publishing, no repo pays for coverage.

## 7. Phases

**P0 — Scaffold (½ day).** Copy hamechona, `git init`, strip Hebrew/RTL, swap fonts,
rewrite `site.ts` (name, tagline, 9 categories), rename `hm-theme` → `gh-theme`. Deliverable:
`npm run dev` serves an empty English site with working header/sidebar/search.

**P1 — Content model (½ day).** `repo` block in the schema, `RepoFacts.astro`, contribution-grid
thumb, post template. Deliverable: 3 hand-written seed posts render end to end.

**P2 — Discovery (1 day).** `scripts/discover.mjs`, `data/seen.json`, `data/rejected.json`,
`npm run discover`. Deliverable: a `queue.json` with 20 real, filtered, scored candidates.

**P3 — Content run (ongoing).** Write 14 posts from the queue, `publishDate` spread 2/day
across the first week. Deliverable: a site that looks alive on launch day.

**P4 — Ship (½ day).** Create `HighlightsX/highlightsx.github.io`, set Pages source to
GitHub Actions, push. `deploy.yml` covers push + the 09:00 Israel cron (both DST rows).
Then Search Console verification meta + submit `/sitemap-index.xml`, RSS validated,
Lighthouse pass.

**P5 — Later, only if wanted.** Weekly digest post linking that week's repos; `/l/{language}`
pages; a "since last week" star delta badge; automated drafting via the Claude API in CI.

## 8. Explicitly not building

No CMS, no database, no serverless functions, no auth, no comments, no newsletter, no
image generation, no model API key in CI, no analytics beyond Search Console, no trending
scraper. Each one is addable later; none is needed to publish.

## 9. Risks

- **Star-count staleness** — solved by snapshotting with `snapshotAt` shown in the UI. Never re-fetch at build.
- **Rate limits** — `GITHUB_TOKEN` in Actions, `data/seen.json` prevents re-querying the same repos.
- **No redirects on Pages** — a renamed post slug breaks its old URL outright, since the static host cannot 301. Rename only before a post is indexed, or leave the slug alone.
- **Slop feed** — the filter list is the product. Awesome-lists and tutorial repos are the failure mode of every GitHub-trending site.
- **Repo dies after coverage** — `pushedAt` recorded; a stale-project note can be appended as a correction.
- **Duplicate coverage** — the discover script greps existing posts for `repo.url` before proposing anything.
```
