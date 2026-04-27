import type { APIRoute } from 'astro';
import { SITE } from '../lib/site';

const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Bytespider',
  'CCBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'Applebot-Extended',
  'Amazonbot',
  'MistralAI-User',
  'DuckAssistBot',
];

export const GET: APIRoute = () => {
  const lines: string[] = [];

  lines.push('# robots.txt for Tjekelpris.dk');
  lines.push('# AI crawlers are welcome — see explicit rules below.');
  lines.push('');
  lines.push('User-agent: *');
  lines.push('Allow: /');
  lines.push('Disallow: /api/');
  lines.push('');
  lines.push('# AI Crawlers — explicitly allowed');
  for (const bot of AI_BOTS) {
    lines.push(`User-agent: ${bot}`);
    lines.push('Allow: /');
    lines.push('');
  }
  lines.push(`Sitemap: ${SITE.url}/sitemap-index.xml`);
  lines.push(`Host: ${SITE.url.replace(/^https?:\/\//, '')}`);
  lines.push('');

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
