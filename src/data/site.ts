export const site = {
  name: 'GitHub Highlights',
  // Keep in sync with `site` in astro.config.mjs, which the sitemap reads.
  url: 'https://tomerdamari.github.io',
  tagline: 'New open source, explained',
  description:
    'One new open-source project a day, read properly: what it does, why it showed up now, how it works and where it is weak. Every number linked to its source.',
  footerAbout:
    'GitHub Highlights covers repositories that just became worth knowing about, for people who will actually run the code. Every post names the project, the commit history behind it and the day its numbers were true, because a star count with no date is not a fact.',
};

// The colour feeds the nav tag, the sidebar dot and the generated thumbnail.
// Tuned for the dark canvas: each one has to stay legible at 14% opacity behind
// a chip and at full strength as a 0.5rem dot, so they run light, not deep.
// Nine distinct hues, none of them the violet of --accent, which is the one
// colour that has to mean "this is a link".
export const categories = {
  ai: {
    name: 'AI & ML',
    description: 'Models, agents, inference engines, training and evaluation code.',
    icon: 'M12 3a7 7 0 0 0-4 12.7V18h8v-2.3A7 7 0 0 0 12 3Z M9.5 21h5',
    color: '#60a5fa',
  },
  devtools: {
    name: 'Dev Tools',
    description: 'Command-line tools, editors, build systems, debuggers and formatters.',
    icon: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
    color: '#2dd4bf',
  },
  web: {
    name: 'Web',
    description: 'Frameworks, frontend libraries, browsers and everything that ships to a page.',
    icon: 'M3 12h18 M12 3c2.5 3 2.5 15 0 18 M12 3c-2.5 3-2.5 15 0 18 M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0Z',
    color: '#a3e635',
  },
  infra: {
    name: 'Infrastructure',
    description: 'Deployment, containers, orchestration, observability and networking.',
    icon: 'M4 5h16v5H4z M4 14h16v5H4z M7.5 7.5h.01 M7.5 16.5h.01',
    color: '#f59e0b',
  },
  data: {
    name: 'Data',
    description: 'Databases, query engines, pipelines, formats and analytics.',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    color: '#22d3ee',
  },
  security: {
    name: 'Security',
    description: 'Scanners, cryptography, authentication, supply chain and offensive tooling.',
    icon: 'M12 3 5 6v6c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z M9 12l2 2 4-4',
    color: '#fb7185',
  },
  languages: {
    name: 'Languages',
    description: 'Compilers, interpreters, runtimes, type systems and package managers.',
    icon: 'M7 3h10a1 1 0 0 1 1 1v17l-3-2-3 2-3-2-3 2V4a1 1 0 0 1 1-1Z M9.5 8h5 M9.5 12h5',
    color: '#f472b6',
  },
  apps: {
    name: 'Apps & Self-Hosted',
    description: 'Finished software people run: desktop, mobile, homelab and productivity.',
    icon: 'M4 21V9l8-6 8 6v12 M9.5 21v-6h5v6',
    color: '#34d399',
  },
  graphics: {
    name: 'Graphics & Games',
    description: 'Renderers, game engines, shaders, simulation and creative coding.',
    icon: 'M4 7h16v11H4z M8 12h4 M10 10v4 M16 11h.01 M17.5 13.5h.01',
    color: '#818cf8',
  },
} as const;

export type CategorySlug = keyof typeof categories;

// Single source of truth: the schema's z.enum reads this array, so a category
// can never exist in one place and not the other.
export const CATEGORY_SLUGS = Object.keys(categories) as [CategorySlug, ...CategorySlug[]];
