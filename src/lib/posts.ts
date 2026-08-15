import { getCollection } from 'astro:content';

// Future-dated posts are queued, not published: they get no page, no listing,
// no feed entry and no search-index row until a build runs on or after their
// date. Every read of the collection goes through here, so a post can never
// leak into one surface while being hidden from another.
//
// The site is static, so the queue only moves when something rebuilds - see
// .github/workflows/deploy.yml, which rebuilds and redeploys each morning.
// Without that build, a queued post stays invisible past its date.
export const publishedNews = () =>
  getCollection('news', ({ data }) => data.publishDate <= new Date());
