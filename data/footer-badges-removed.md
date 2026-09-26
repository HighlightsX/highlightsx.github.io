# Footer badges removed 21 Sep 2026

All twelve directory badges were pulled from the homepage footer
(`src/components/Footer.astro`) on 21 Sep 2026. Nothing else about the
listings changed: no directory was contacted, no listing was withdrawn.

Several of these directories require the badge and re-check it. This file is
the record for that audit: recheck each listing URL below and note which ones
dropped us once the badge went away, and which ones kept the listing. Rows in
`data/submissions.md` marked *badge required* are the ones at risk.

| Directory | Listing to recheck | Badge required |
|---|---|---|
| LemonLaunch | https://lemonlaunch.dev/dev-tools/github-highlights | no |
| TheSaaSDir | https://thesaasdir.com/product/github-highlights | yes |
| Wired Business | https://wired.business/highlightsx-github-io | yes |
| Twelve Tools | https://twelve.tools (slug `highlightsx-github-io`) | yes |
| AIHuntList | https://aihuntlist.com/tool/github-highlights | verified by them |
| TheAIToolsDir | https://theaitoolsdir.com/product/github-highlights/ | yes |
| SpotStartups | https://spotstartups.com/github-highlights | yes |
| SaaS Cubes | https://saascubes.com | yes |
| EasyLaunch | https://easylaunch.dev/dev-tools/github-highlights | yes |
| Nick Launches | https://nicklaunches.com/products/github-highlights | verified by them |
| Dironix | https://dironix.com | yes |
| Gets.tools | https://gets.tools | yes |

## Who dropped us

**Two of the ten dropped us, and both listings are now deleted.** The link came off
both on 24 Sep 2026, three days after the badges came down. The pages themselves
were deleted on 25 and 26 Sep.

| Directory | What happened |
|---|---|
| Wired Business | **Gone in two steps.** 24 Sep: link stripped, page still up, reading *"This listing has been unlisted because the website no longer displays the Wired Business badge."* 25 Sep: the listing page itself deleted, a hard 404 with an empty body. Their homepage and peer listings (checked `/ikasulabs`) still answer 200, so this was aimed at us and not an outage. |
| Twelve Tools | **Same path, one day behind its sibling.** 24 Sep: link stripped, page up, reading *"This listing has been unlisted because the website no longer displays the Twelve Tools badge."* 26 Sep: the page serves their 404 template, *"The page you were looking for does not exist."*, carrying `noindex, follow`. Their homepage and a peer listing (`/backlinkcatalog`) both answer 200. This one was already an orphan, so little was lost. |

These two are **one operator**, so this is one decision rather than two. Neither
page carries a `noindex`; they simply stripped the outbound link.

The other eight are unchanged from the baseline below: same anchors, same `rel`
values, same robots directives across four checks: 22, 24, 25 and 26 Sep 2026.

## Baseline, checked 21 Sep 2026

Taken within the hour after the badges came down, so this is the "before anyone
reacted" state. Every row is a live fetch of the listing page, not a recollection.
`rel` is the actual attribute on the anchor pointing at our homepage.

| Directory | Listing | Status | rel on the link to us | Verdict |
|---|---|---|---|---|
| LemonLaunch | /dev-tools/github-highlights | 200 | `noopener` | live, passes |
| TheSaaSDir | /product/github-highlights | 200 | `noopener` | live, passes |
| Wired Business | /highlightsx-github-io | 200 | **no rel at all** | live, passes |
| Twelve Tools | /highlightsx-github-io | 200 | `noopener` | live, passes |
| AIHuntList | /tool/github-highlights | 200 | `noopener noreferrer` | live, passes (the `/about` link alone is nofollow) |
| TheAIToolsDir | /product/github-highlights/ | 200 | `noopener` | live, passes |
| SpotStartups | /github-highlights | 200 | `noopener` | live, passes, page is `index, follow` |
| SaaS Cubes | /saas/github-highlights | 200 | `noopener noreferrer` | **live, passes**. Went live without us noticing; it sat under "waiting on review" |
| EasyLaunch | /dev-tools/github-highlights | 200 | `noopener` | live, passes |
| Nick Launches | /products/github-highlights | 200 | `noreferrer noopener` | **now `index, follow`**. The `noindex` seen on 19 Sep is gone, so the link counts as of today |
| Gets.tools | none | n/a | n/a | **no listing ever existed.** 158 URLs in their sitemap, none ours. Submission was never pressed |
| Dironix | none | n/a | n/a | **domain registration expired.** HTTPS fails handshake, HTTP serves a registrar parking page. We were linking to a dead domain |

So the real count on the day the badges came down was ten live listings, not
twelve. Nine of the ten pass link equity right now. That is the number any later
loss gets measured against.

## The exact markup that was removed

Paste this back inside `.footer-legal` in `src/components/Footer.astro` to
restore it, along with the `isHome` const it depends on.

```astro
      {isHome && (
        <p>
          <a href="https://lemonlaunch.dev/dev-tools/github-highlights" target="_blank" rel="noopener">
            <img src="https://lemonlaunch.dev/badge/lemonlaunch-badge-dark.svg"
                 alt="Featured on LemonLaunch" width="134" height="40" />
          </a>
          <a href="https://thesaasdir.com/product/github-highlights?ref=badge" rel="dofollow">
            <img src="https://thesaasdir.com/badge/github-highlights.svg"
                 alt="Featured on TheSaaSDir" width="158" height="40" />
          </a>
          <a href="https://wired.business" target="_blank" rel="noopener">
            <img src="https://wired.business/badge0-dark.svg"
                 alt="Featured on Wired Business" width="148" height="40" />
          </a>
          <a href="https://twelve.tools" target="_blank" rel="noopener">
            <img src="https://twelve.tools/badge2-dark.svg"
                 alt="Featured on Twelve Tools" width="148" height="40" />
          </a>
          <a href="https://aihuntlist.com/tool/github-highlights" target="_blank" rel="noopener">
            <img src="https://aihuntlist.com/badge-light.svg"
                 alt="Featured on aihuntlist.com" height="40" />
          </a>
          <a href="https://theaitoolsdir.com/product/github-highlights?ref=badge" rel="dofollow">
            <img src="https://theaitoolsdir.com/badge/github-highlights.svg"
                 alt="Featured on TheAIToolsDir" width="145" height="40" />
          </a>
          <a href="https://spotstartups.com" target="_blank" rel="noopener">
            <img src="https://spotstartups.com/badges/spotstartups.com_badge_dark.svg"
                 alt="Featured on SpotStartups" width="127" height="40" />
          </a>
          <a href="https://saascubes.com" rel="noopener" title="Listed on SaaS Cubes">
            <img src="https://saascubes.com/images/badges/badge-light.png"
                 alt="Listed on SaaS Cubes" width="130" height="40" />
          </a>
          <a href="https://easylaunch.dev/dev-tools/github-highlights" target="_blank" rel="noopener">
            <img src="https://easylaunch.dev/badge/easylaunch-badge-dark.svg"
                 alt="Featured on EasyLaunch" width="134" height="40" />
          </a>
          <a href="https://nicklaunches.com/products/github-highlights/?utm_source=highlightsx.github.io&utm_medium=badge&utm_campaign=featured" target="_blank" rel="noopener">
            <img src="https://nicklaunches.com/badges/featured-dark.png"
                 alt="GitHub Highlights on Nick Launches" width="174" height="40" />
          </a>
          <a href="https://dironix.com" target="_blank" rel="noopener">
            <img src="https://dironix.com/bage.png"
                 alt="Featured on Dironix" width="111" height="40" />
          </a>
          <a href="https://gets.tools" target="_blank" rel="noopener">
            <img src="https://gets.tools/badge/badge_dark.svg"
                 alt="Featured on Gets.Tools" width="148" height="40" />
          </a>
        </p>
      )}
```
