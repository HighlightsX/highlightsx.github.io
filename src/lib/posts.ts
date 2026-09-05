import { topicSlug } from './format';
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

// A topic earns a page once a second post shares it. Below that the page is a
// worse copy of the post it lists: same title, same single card, same sidebar.
// 103 of 126 tags were in that state, and they made up two thirds of the
// sitemap on a domain with almost no crawl budget to spend.
//
// Both the tag pages and the chips on a post read this map, so a tag can never
// be linked from a post without having a page to land on.
const TOPIC_MIN = 2;

export const topics = async () => {
  const posts = await publishedNews();
  const byTopic = new Map<string, { name: string; posts: typeof posts }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = topicSlug(tag);
      if (!byTopic.has(slug)) byTopic.set(slug, { name: tag, posts: [] });
      byTopic.get(slug)!.posts.push(post);
    }
  }

  for (const [slug, { posts }] of byTopic) if (posts.length < TOPIC_MIN) byTopic.delete(slug);
  return byTopic;
};
