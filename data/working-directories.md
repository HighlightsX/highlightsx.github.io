# Working directories — free, self-serve, link-carrying

Portable list distilled from `submissions.md` (run for https://highlightsx.github.io, Aug 2026).
Only directories whose submission flow actually completed on a free tier. Paid, login-walled,
Cloudflare-blocked, nofollow-only and broken ones are left out on purpose.

"Badge" = their badge must stay in your site footer or the listing is pulled.

## Live listings, link confirmed

| Directory | URL | Badge | Note |
|---|---|---|---|
| LemonLaunch | https://lemonlaunch.dev | yes | |
| TheSaaSDir | https://thesaasdir.com | yes | badge required |
| Twelve Tools | https://twelve.tools | yes | badge required |
| Wired Business | https://wired.business | yes | dofollow verified — bare hrefs, no rel |
| TheAIToolsDir | https://theaitoolsdir.com | yes | dofollow verified — `rel="noopener"` only |
| EasyLaunch | https://www.easylaunch.dev | yes | dofollow verified — `rel="noopener"` only |

## Accepted, awaiting publish — flow worked end to end

| Directory | URL | Badge | Note |
|---|---|---|---|
| SpotStartups | https://spotstartups.com | yes | dofollow queue, 24h review |
| SaaS Cubes | https://saascubes.com | yes | free plan, 3–5 business days |
| AIHuntList | https://aihuntlist.com | yes | free listing, they verify the badge |
| Nick Launches | https://nicklaunches.com | yes | Free Launch $0, launch weeks book out ~3 weeks |
| DevPages | https://devpages.io | **no** | open form, no account, hand-reviewed |
| Curlie | https://curlie.org | **no** | no account, human editor, pick the exact-fit category |
| Launching Next | https://www.launchingnext.com | **no** | free submission, reviewed daily |
| FutureTools | https://futuretools.io | **no** | free tier |
| https://ooh.directory | ooh.directory | **no** | curated blog directory, slow |
| Search My Site | https://searchmysite.net | **no** | Basic free tier, independent-website category |
| https://indieblog.page | indieblog.page | **no** | RSS feed |
| https://feedle.world | feedle.world | **no** | RSS feed |

## Start here

Eight need **no badge and no account**: DevPages, Curlie, Launching Next, FutureTools,
ooh.directory, Search My Site, indieblog.page, feedle.world. Zero ongoing obligation.

## Rules that produced this list

- Free tier only. No paid listing, no paid skip-the-queue.
- No nofollow-only free tiers (FoundrList's free tier links nofollow — skipped).
- Verify dofollow by fetching the live listing and reading the actual `rel`, never from memory.
- Verify the listing URL returns 200 before adding their badge (EasyDoFollow 404'd — badge pulled).
- Two listings per operator is the ceiling. Known clusters: Twelve Tools / Wired Business /
  500.tools / Ramen Tools are one operator; TheAIToolsDir / SaaSLineup / TheMicroSaaSDir /
  IndieLineup another; SaaSBison / DodoDirectory / Toolcurio another.
- `*.github.io` is rejected by some (BetaList) and some gate on GitHub stars (OpenSaaS needs 200+).

All 20 domains probed live on 21 Aug 2026 — every one returns 200 (SpotStartups answers 406 to
curl, bot filter, the site is up). Listing URLs above are ours from the original run; on a new
project find the submit link on each home page.

## Never published, badges pulled 4 Sep 2026

One operator, three sites: SaaSBison, DodoDirectory, Toolcurio. Submitted Aug 2026, accepted,
and no listing exists on any of the three. Checked by slug (`/item/github-highlights`,
`/products/github-highlights`) and against their sitemaps: 350 item URLs on SaaSBison and 61
product URLs on Toolcurio, none ours. Their badges are out of the footer. Do not resubmit as
three separate wins, it is one decision by one operator.
