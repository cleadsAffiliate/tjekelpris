import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/site';

export const getStaticPaths = (async () => {
  const posts = await getCollection('blog', (entry) => !entry.data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection<'blog'>>>[number] };
  const { title, description, publishDate, updatedDate, author, tags } = post.data;

  const frontmatter: string[] = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `url: ${SITE.url}/blog/${post.id}/`,
    `publishDate: ${publishDate.toISOString()}`,
    ...(updatedDate ? [`updatedDate: ${updatedDate.toISOString()}`] : []),
    `author: ${author}`,
    ...(tags.length > 0 ? [`tags: [${tags.map((t) => `"${t}"`).join(', ')}]`] : []),
    '---',
    '',
  ];

  const body = post.body ?? '';
  const markdown = `${frontmatter.join('\n')}\n# ${title}\n\n${body}`;

  return new Response(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
