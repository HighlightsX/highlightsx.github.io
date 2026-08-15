import { categories } from '../data/site';
import { publishedNews } from '../lib/posts';

// Short keys on purpose: this file is fetched by every visitor who opens the
// search page, and the field names are a real share of its weight.
export async function GET() {
  const posts = (await publishedNews()).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  const index = posts.map((post) => ({
    t: post.data.title,
    d: post.data.description,
    g: post.data.tags,
    c: categories[post.data.category].name,
    s: categories[post.data.category].color,
    u: `/${post.id}`,
    // owner/name is what people type into a search box when they half-remember
    // a project, so it is indexed separately from the prose.
    r: `${post.data.repo.owner}/${post.data.repo.name}`,
    l: post.data.repo.language ?? '',
    // Body text is what makes search useful past the headline, but the whole
    // article would multiply the payload - the opening is where the topic is.
    b: (post.body ?? '').replace(/[#*`>\[\]()]/g, ' ').slice(0, 600),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
