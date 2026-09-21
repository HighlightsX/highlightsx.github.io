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
