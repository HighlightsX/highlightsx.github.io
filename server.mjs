import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import sirv from 'sirv';

// Cloudflare caches whatever the origin sends, misses included. http-server
// applies one global max-age to every response, so a 404 requested just before
// a deploy kept a freshly published asset invisible for the full hour after it
// existed. Static files keep the cache lifetime; misses opt out of it.
const notFound = readFileSync(new URL('./dist/404.html', import.meta.url));
// sirv sends .txt as bare text/plain, which leaves the browser guessing at the
// encoding. Declaring utf-8 keeps non-ASCII in robots.txt and llms.txt intact.
const serveStatic = sirv('dist', {
  maxAge: 3600,
  etag: true,
  setHeaders: (res, pathname) => {
    if (pathname.endsWith('.txt')) res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  },
});

// Moved pages: slug -> target. A real 301 here instead of Astro's meta-refresh
// stub pages, which cost an extra hop and stay in Search Console as indexable
// URLs. Empty until a post is renamed.
const moved = {};

// One live URL per page, slashless (what canonical, hreflang, og:url and the
// sitemap all declare). sirv answers both forms with the same 200 on its own,
// which left Google two URLs per page to choose between.
const redirect = (req, res) => {
  const [path, query] = req.url.split('?');
  // Normalized first, so a moved page requested with a trailing slash lands on
  // its target in one hop instead of two.
  const slashless = path.endsWith('/index.html')
    ? path.slice(0, -'/index.html'.length) || '/'
    : path !== '/' && path.endsWith('/')
      ? path.replace(/\/+$/, '') || '/'
      : path;
  const target = moved[slashless] ?? (slashless === path ? null : slashless);
  if (!target) return false;
  res.writeHead(301, { Location: `${target}${query ? `?${query}` : ''}`, 'Cache-Control': 'no-store' });
  res.end();
  return true;
};

createServer((req, res) =>
  redirect(req, res) ||
  serveStatic(req, res, () => {
    res.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    res.end(notFound);
  }),
).listen(Number(process.env.PORT) || 8080);
