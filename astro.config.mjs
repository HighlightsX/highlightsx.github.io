import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://highlightsx.github.io',
  // One URL per page, without a trailing slash: canonical, og:url and the
  // sitemap all emit the slashless form.
  trailingSlash: 'never',
  // Astro's HTML compression deletes the newline between a word and an inline
  // element instead of collapsing it to a space, so prose written as
  //   ... the full account is on the
  //   <a href="/disclosure">disclosure page</a>
  // ships as "on thedisclosure page". It hit the footer on all 74 pages plus
  // three other spots. Costs about 170 gzipped bytes a page to switch off,
  // which is cheaper than remembering to write {' '} in every paragraph.
  compressHTML: false,
  markdown: { smartypants: false },
  build: {
    // GitHub Pages serves about.html at /about as-is, but 301s a directory URL
    // onto its trailing-slash form. With 'directory' output every canonical URL
    // we publish would redirect somewhere else.
    format: 'file',
    // Renames /_astro/ so the asset paths stop announcing the framework. No SEO
    // effect either way; the point is that the site doesn't introduce itself.
    assets: 'assets',
  },
  integrations: [
    sitemap({
      // The search page is noindex, so submitting it would only earn a Search
      // Console warning about a URL we ask not to index.
      filter: (page) => !page.replace(/\/$/, '').endsWith('/search'),
    }),
  ],
});
