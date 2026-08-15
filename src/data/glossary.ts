// Terms the posts link into. Keep definitions to two or three sentences and say
// what the term means in practice, not what it stands for.
export const glossary = [
  {
    term: 'Star',
    slug: 'star',
    body: 'A bookmark, not a vote of quality or a download. Stars measure attention on the day it arrived, which is why this site quotes the count with the date it was captured and, where possible, how many of them are new.',
  },
  {
    term: 'Fork',
    slug: 'fork',
    body: 'A copy of a repository under someone else’s account. Most forks exist to open a pull request and are abandoned within days; a fork that keeps its own release schedule is a different project and is covered as one.',
  },
  {
    term: 'Permissive licence',
    slug: 'permissive-license',
    body: 'MIT, Apache-2.0, BSD: you may use, modify and ship the code in closed-source products, provided the copyright notice travels with it. Apache-2.0 also grants patent rights, which is why legal teams prefer it to MIT.',
  },
  {
    term: 'Copyleft licence',
    slug: 'copyleft-license',
    body: 'GPL and its relatives require anything you distribute that is derived from the code to carry the same licence. AGPL extends that obligation to software you only run as a network service, which is the clause that rules a project out for many companies.',
  },
  {
    term: 'Source-available',
    slug: 'source-available',
    body: 'You can read the code, but the licence restricts commercial use or competing services — BUSL, SSPL, Elastic License. Not open source under the OSI definition, and this site labels it as what it is.',
  },
  {
    term: 'Monorepo',
    slug: 'monorepo',
    body: 'One repository holding several packages that ship separately. It changes what a star count means: the number belongs to the whole tree, not to the one package you were looking for.',
  },
  {
    term: 'Release',
    slug: 'release',
    body: 'A tagged commit with notes attached. A project with tags but no releases, or releases that stopped a year ago, is telling you something about how it is maintained.',
  },
  {
    term: 'Semantic versioning',
    slug: 'semver',
    body: 'MAJOR.MINOR.PATCH, where a bumped major number promises a breaking change. Anything still on 0.x is saying the interface is not stable yet, whatever the star count suggests.',
  },
  {
    term: 'Bus factor',
    slug: 'bus-factor',
    body: 'How many maintainers would have to disappear before the project stalls. For a large share of trending repositories the answer is one, which is a real risk and gets named in the post rather than implied.',
  },
  {
    term: 'Issue triage',
    slug: 'issue-triage',
    body: 'How fast issues get a first response and whether they get closed or accumulate. A thousand open issues means little on its own; a thousand open and no maintainer reply in three months means a great deal.',
  },
  {
    term: 'Supply chain',
    slug: 'supply-chain',
    body: 'Everything your build pulls in that you did not write: dependencies, their dependencies, build actions and published artefacts. A small, audited dependency tree is a feature, and this site mentions when a project has one.',
  },
  {
    term: 'Vendoring',
    slug: 'vendoring',
    body: 'Copying a dependency’s source into your own repository instead of resolving it at build time. Trades update convenience for a build that cannot break because someone else unpublished a package.',
  },
  {
    term: 'Self-hosted',
    slug: 'self-hosted',
    body: 'Software you run on your own machine or server rather than as somebody’s SaaS. Usually means you also own the backups, the upgrades and the TLS certificate.',
  },
  {
    term: 'Rewrite in Rust',
    slug: 'rewrite-in-rust',
    body: 'A recurring genre: an established tool reimplemented in a compiled language for speed and a single binary. Worth covering when the benchmark is reproducible and the feature parity is real, which is the part usually left out of the README.',
  },
  {
    term: 'Trending',
    slug: 'trending',
    body: 'GitHub’s own list of repositories gaining stars quickly. It has no API and mixes genuinely new software with list repositories, so this site computes its own star deltas instead of scraping it.',
  },
];
