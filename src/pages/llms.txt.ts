import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', (entry) => !entry.data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  const faqs = (await getCollection('faq')).sort((a, b) => a.data.order - b.data.order);

  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push('');
  lines.push(`> ${SITE.description}`);
  lines.push('');
  lines.push('## Hvad vi tilbyder');
  lines.push('');
  lines.push('- Sammenligning af elpriser fra danske elselskaber');
  lines.push('- Prisberegner baseret på dit faktiske årlige forbrug (kWh)');
  lines.push('- Uafhængige guides og artikler om elmarkedet');
  lines.push('- Overblik over variable og faste priser, binding, afregningsformer og grøn strøm');
  lines.push('- Trustpilot-ratings og direkte links til leverandørerne');
  lines.push('');
  lines.push('## Nøglesider');
  lines.push('');
  lines.push(`- [Forside](${SITE.url}/): Introduktion og hurtig prisoversigt`);
  lines.push(`- [Elpriser](${SITE.url}/elpriser/): Fuld sammenligning af alle aftaler med filtre`);
  lines.push(`- [Blog](${SITE.url}/blog/): Guides om elmarkedet`);
  lines.push(`- [FAQ](${SITE.url}/faq/): Ofte stillede spørgsmål`);
  lines.push(`- [Om os](${SITE.url}/om-os/): Om Tjekelpris og vores metodik`);
  lines.push(`- [Kontakt](${SITE.url}/kontakt/): Kontakt redaktionen`);
  lines.push('');

  if (posts.length > 0) {
    lines.push('## Artikler');
    lines.push('');
    for (const post of posts) {
      lines.push(`- [${post.data.title}](${SITE.url}/blog/${post.id}/): ${post.data.description}`);
    }
    lines.push('');
  }

  if (faqs.length > 0) {
    lines.push('## FAQ-emner');
    lines.push('');
    for (const faq of faqs) {
      lines.push(`- ${faq.data.question} (${faq.data.category})`);
    }
    lines.push('');
  }

  lines.push('## Kontakt');
  lines.push('');
  lines.push(`- E-mail: ${SITE.email}`);
  lines.push('- Sprog: dansk');
  lines.push('- Marked: Danmark');
  lines.push('');

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
