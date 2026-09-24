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

// A topic earns a page once five posts share it. Below that the page is a
// worse copy of the posts it lists: a heading and a few cards that already sit
// on the category page. At a floor of two, 19 of 26 tag pages held two or three
// posts, and pairs like "inference" and "mixture of experts" overlapped 96%
// because they listed the same posts.
//
// Both the tag pages and the chips on a post read this map, so a tag can never
// be linked from a post without having a page to land on.
const TOPIC_MIN = 5;

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
