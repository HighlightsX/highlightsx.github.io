import rss from '@astrojs/rss';
import { site } from '../data/site';
import { publishedNews } from '../lib/posts';

export async function GET(context) {
  const posts = (await publishedNews()).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );

  return rss({
    title: `${site.name} - ${site.tagline}`,
    description: site.description,
    site: context.site,
    trailingSlash: false,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: `<language>en</language><atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/${post.id}`,
      categories: post.data.tags,
    })),
  });
}
