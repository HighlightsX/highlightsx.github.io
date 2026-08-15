import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://github-highlights.netlify.app',
  // One URL per page, without a trailing slash: canonical, og:url and the
  // sitemap all emit the slashless form.
  trailingSlash: 'never',
  markdown: { smartypants: false },
  build: {
    // Netlify's Pretty URLs serve about.html at /about as-is, but 301 a
    // directory URL onto its trailing-slash form. With 'directory' output every
    // canonical URL we publish would redirect somewhere else.
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
