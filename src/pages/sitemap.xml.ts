import { site } from '../data/site';

// Crawlers and Search Console probe /sitemap.xml first - its submit box is
// pre-filled with that name - and @astrojs/sitemap only ever writes
// sitemap-index.xml plus sitemap-N.xml. On Netlify a 301 covered the gap; on
// GitHub Pages there are no redirects, so a 404 here is reported back as
// "Couldn't fetch" with no explanation. This serves the same index at the URL
// that actually gets asked for.
//
// ponytail: hardcodes the single child sitemap. The integration only starts
// writing sitemap-1.xml past 45,000 URLs, which is about 44,900 posts away; if
// that ever changes, generate this list instead of typing it.
export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${site.url}/sitemap-0.xml</loc></sitemap>
</sitemapindex>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
