import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

export const GET: APIRoute = async (context) => {
  const posts = (await getCollection('blog', (entry) => !entry.data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: `${SITE.name} Blog`,
    description: 'Guides og artikler om elpriser og elmarkedet i Danmark.',
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: '<language>da-DK</language>',
  });
};
