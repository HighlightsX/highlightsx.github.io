# GitHub Highlights

One new open-source project per post: what it does, why it surfaced now, how it works,
where it is weak. Static Astro site, published from a queue.

```bash
npm install && npm run dev
```

## Publishing a post

1. `npm run discover` — queries GitHub, scores candidates, writes `data/queue.json`.
   It never writes to `src/content`; nothing publishes itself.
2. Pick a brief from the queue and write `src/content/news/<repo-name>.md`. The front
   matter schema lives in [src/content.config.ts](src/content.config.ts) — repository
   figures are a **snapshot** taken from the brief, never re-fetched at build time.
3. Set `publishDate` to the day it should appear. A future date queues the post: it gets
   no page, no listing, no feed entry and no search row until a build runs on or after
   that date. Two posts a day is the cadence.
4. Push. `.github/workflows/deploy.yml` builds and deploys on every push to `main`, and
   again each morning on a cron — the morning run is what moves the queue.

Reject a repository permanently by adding `owner/name` to `data/rejected.json`.
`data/seen.json` is the star baseline the momentum score is computed against — commit it,
or every run looks like a first run.

## Layout

| Path | What |
|---|---|
| `src/content/news/` | the posts |
| `src/data/site.ts` | name, URL, the nine categories and their colours |
| `src/lib/posts.ts` | `publishedNews()` — the one place the queue is enforced |
| `src/components/RepoFacts.astro` | the facts strip under each headline |
| `scripts/discover.mjs` | discovery; `--selftest` runs the filter and score checks offline |
| `plan.md` | why the thing is built this way |

## Deploy

GitHub Pages, from the repository `tomerdamari/tomerdamari.github.io`, served at the domain
root — which is why every link in the source is an absolute path with no base prefix.
`npm run build` → `dist` → `actions/deploy-pages`. Set Pages source to **GitHub Actions**
in the repository settings once; no secrets, no build hook.

Moving to a custom domain later: add `public/CNAME` containing the domain, set it in Pages
settings, update `site` in [astro.config.mjs](astro.config.mjs) and `url` in
[src/data/site.ts](src/data/site.ts). No other code changes — the site is already
root-relative.
