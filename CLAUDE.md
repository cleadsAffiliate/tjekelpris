# CLAUDE.md — Tjekelpris.dk (Astro)

## Project Overview

Tjekelpris.dk is a Danish electricity price comparison service. This is a greenfield Astro project that helps consumers compare electricity suppliers in Denmark. The site must achieve **100/100 Lighthouse scores** (mobile + desktop) and maximize the **isitagentready.com** score across discoverability, content, and bot access control.

## Tech Stack

- **Framework**: Astro (latest stable) — static-first, minimal JS
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist (sans) + Geist Mono — self-hosted (no Google Fonts CDN)
- **Data**: Supabase (PostgreSQL) — design schema first, use mock data until connected
- **Deployment**: Vercel (Astro adapter)
- **Analytics**: GA4 server-side tracking + Google Search Console verification
- **Language**: Danish only (no i18n)
- **Components**: All custom — no UI component libraries
- **Dark mode**: System preference via `prefers-color-scheme` (no JS toggle)
- **Transitions**: None — standard page navigation

## Architecture Principles

### Performance (Lighthouse 100/100)

- **Zero client-side JS** unless absolutely required (e.g., prisberegner interaktivitet)
- Self-host all fonts with `font-display: swap` and proper preloading
- Use Astro's built-in image optimization (`<Image />` component)
- Inline critical CSS, defer non-critical
- No third-party scripts in the critical path (GA4 must be server-side or deferred)
- Semantic HTML with proper heading hierarchy (single `<h1>` per page)
- All images must have explicit `width`/`height` attributes
- Preconnect to Supabase domain
- Use `<link rel="preload">` for above-the-fold assets only
- Target CLS = 0, LCP < 1.5s, FID < 50ms

### Agent-Readiness (isitagentready.com)

Target: maximum score on Discoverability, Content Accessibility, and Bot Access Control.

#### Discoverability
- `/robots.txt` — dynamic Astro endpoint (`robots.txt.ts`), valid, with sitemap directive and AI bot rules
- `/sitemap.xml` — dynamic Astro endpoint (or `@astrojs/sitemap`), auto-generates from all pages and blog posts
- Link response headers — add `Link` header pointing to sitemap (via Astro middleware or Vercel headers)

#### Content Accessibility
- Markdown content negotiation — serve markdown version of pages when `Accept: text/markdown` is requested
- `/llms.txt` — dynamic Astro endpoint (`llms.txt.ts`), machine-readable site description following the llmstxt.org standard

#### Bot Access Control
- AI bot rules in `robots.txt` — explicit `User-agent` rules for known AI crawlers (GPTBot, Google-Extended, ClaudeBot, etc.)
- Content signals — proper `<meta>` tags, structured data (JSON-LD), Open Graph
- No aggressive bot blocking (allow AI crawlers)

### Semantic HTML & Accessibility

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
- ARIA labels where needed
- Skip-to-content link
- Proper form labels and fieldsets
- Color contrast ratios meeting WCAG AA minimum
- Focus indicators visible in both light and dark mode

## Site Structure

```
/                       → Forside (hero + prisberegner + highlighted offers)
/elpriser/              → Fuld prissammenligning (beregner + filtertabel)
/blog/                  → Blog oversigt
/blog/[slug]/           → Individuel artikel
/om-os/                 → Om Tjekelpris
/kontakt/               → Kontaktformular
/faq/                   → Ofte stillede spørgsmål
/robots.txt             → Dynamic bot access rules (Astro endpoint)
/sitemap.xml            → Dynamic, auto-generated sitemap (Astro endpoint)
/llms.txt               → Dynamic LLM-readable site description (Astro endpoint)
```

## Design System

### Theme

- **Style**: Minimalistisk, data-drevet, professionel & tillidsskabende
- **Light mode**: White/off-white background, dark text
- **Dark mode**: Dark background via `prefers-color-scheme: dark`
- **Accent color**: Define a primary brand color for CTAs and interactive elements

### Typography

- **Headings**: Geist (variable weight)
- **Body**: Geist (regular 400, medium 500)
- **Code/data**: Geist Mono
- **Scale**: Use a consistent type scale (e.g., minor third 1.2)

### Font Loading Strategy

```
/public/fonts/
  geist-variable.woff2
  geist-mono-variable.woff2
```

Preload in `<head>`:
```html
<link rel="preload" href="/fonts/geist-variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/geist-mono-variable.woff2" as="font" type="font/woff2" crossorigin>
```

Use `@font-face` with `font-display: swap` in global CSS.

## Data Model (Supabase Schema)

### Table: `electricity_providers`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Company name (e.g., "OK", "Modstrøm") |
| slug | text | URL-friendly name |
| logo_url | text | Path to provider logo |
| trustpilot_score | decimal | Trustpilot rating (1-5) |
| trustpilot_url | text | Link to Trustpilot page |
| website_url | text | Provider's website |
| created_at | timestamptz | Record creation |
| updated_at | timestamptz | Last update |

### Table: `electricity_products`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| provider_id | uuid | FK → electricity_providers |
| product_name | text | Product name (e.g., "enkel kvartal") |
| spot_premium | decimal | Spot price markup (øre/kWh) |
| subscription_fee | decimal | Monthly subscription (kr/mnd) |
| binding_months | integer | Binding period (0 = ingen) |
| settlement_type | enum | 'variabel' / 'fast' / 'aconto_1' / 'aconto_3' |
| price_type | enum | 'variabel' / 'fast' |
| green_energy | boolean | Green energy option |
| estimated_kwh_price | decimal | Estimated total price (kr/kWh) |
| estimated_monthly | decimal | Estimated monthly cost (kr/mnd, based on standard consumption) |
| is_active | boolean | Whether the product is currently available |
| features | text[] | Feature tags (e.g., "Ingen binding", "Godt omdømme") |
| created_at | timestamptz | Record creation |
| updated_at | timestamptz | Last update |

### Standard consumption reference

Danish standard household consumption: **4,000 kWh/year** (~333 kWh/month). Use this as default for estimates.

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navigation.astro
│   │   └── SkipToContent.astro
│   ├── comparison/
│   │   ├── PriceCalculator.astro    # Interactive calculator (needs JS island)
│   │   ├── PriceTable.astro         # Filterable comparison table
│   │   ├── ProviderCard.astro       # Individual provider card
│   │   └── FilterBar.astro          # Filter controls
│   ├── common/
│   │   ├── SEOHead.astro            # Meta, OG, JSON-LD
│   │   ├── Breadcrumb.astro
│   │   └── TrustpilotStars.astro
│   └── blog/
│       ├── ArticleCard.astro
│       └── ArticleList.astro
├── layouts/
│   ├── BaseLayout.astro             # HTML shell, fonts, meta
│   └── BlogLayout.astro             # Article-specific layout
├── pages/
│   ├── index.astro
│   ├── elpriser/
│   │   └── index.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── om-os.astro
│   ├── kontakt.astro
│   ├── faq.astro
│   ├── robots.txt.ts                # Dynamic robots.txt endpoint
│   ├── llms.txt.ts                  # Dynamic LLM-readable site info endpoint
│   └── sitemap-index.xml.ts         # Dynamic sitemap endpoint (or use @astrojs/sitemap)
├── content/
│   ├── blog/                        # Markdown blog posts
│   └── faq/                         # FAQ entries (markdown or JSON)
├── lib/
│   ├── supabase.ts                  # Supabase client
│   └── mock-data.ts                 # Mock electricity data for development
├── styles/
│   └── global.css                   # @font-face, Tailwind directives, CSS custom properties
└── data/
    └── providers.json               # Static fallback data
public/
├── fonts/
│   ├── geist-variable.woff2
│   └── geist-mono-variable.woff2
├── images/
│   └── providers/                   # Provider logos
└── favicon.svg
```

## Development Commands

```bash
npm create astro@latest .            # Initialize (if not done)
npm run dev                          # Dev server
npm run build                        # Production build
npm run preview                      # Preview production build
npx astro add tailwind               # Add Tailwind integration
npx astro add sitemap                # Add sitemap integration
npx astro add vercel                 # Add Vercel adapter
```

## Key Implementation Notes

### Prisberegner (Calculator)

The calculator on `/` and `/elpriser/` needs client-side interactivity for:
- Input: annual kWh consumption (default 4000)
- Input: postnummer (for grid tariff lookup)
- Filter: settlement type, binding, price type
- Sort: by estimated monthly cost

Use an Astro island with vanilla JS (`<script>` tag) — no framework needed. Keep the HTML server-rendered and enhance with JS for filtering/sorting.

### Blog Content

Use Astro Content Collections for blog posts:
- Frontmatter: title, description, publishDate, author, tags, image
- Generate OG images or use static ones
- Add JSON-LD `Article` schema to each post

### Structured Data (JSON-LD)

Every page should have appropriate JSON-LD:
- **Forside**: `Organization` + `WebSite` with `SearchAction`
- **Elpriser**: `ItemList` of `Product` entries
- **Blog posts**: `Article` with author, date, publisher
- **FAQ**: `FAQPage` schema
- **Om os**: `Organization` with contact info

### robots.txt — Dynamic Endpoint (`src/pages/robots.txt.ts`)

Generated dynamically as an Astro endpoint. Output:

```
User-agent: *
Allow: /
Sitemap: https://tjekelpris.dk/sitemap-index.xml

# AI Crawlers - Allowed
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /
```

### sitemap.xml — Dynamic Endpoint

Use `@astrojs/sitemap` integration OR a custom `src/pages/sitemap.xml.ts` endpoint. Must include all static pages and dynamically generated blog post URLs. Update automatically when new content is added (blog posts, FAQ entries).

### llms.txt — Dynamic Endpoint (`src/pages/llms.txt.ts`)

Generated dynamically as an Astro endpoint. Follows the llms.txt standard (https://llmstxt.org/). Can optionally pull blog post titles dynamically from Content Collections so the list stays current.

Output:

```
# Tjekelpris.dk

> Tjekelpris.dk er Danmarks uafhængige elsammenligningstjeneste. Vi hjælper forbrugere med at finde den billigste og bedste elaftale.

## Hvad vi tilbyder
- Sammenligning af elpriser fra 40+ danske elselskaber
- Prisberegner baseret på dit faktiske forbrug
- Uafhængige anmeldelser og guides om elmarkedet

## Sider
- [Elpriser](https://tjekelpris.dk/elpriser/): Sammenlign elpriser
- [Blog](https://tjekelpris.dk/blog/): Guides og artikler
- [FAQ](https://tjekelpris.dk/faq/): Ofte stillede spørgsmål
- [Om os](https://tjekelpris.dk/om-os/): Om Tjekelpris
- [Kontakt](https://tjekelpris.dk/kontakt/): Kontakt os
```

### GA4 Server-Side Tracking

Use Measurement Protocol for GA4 or a lightweight server-side approach:
- Do NOT include `gtag.js` in the client bundle (kills performance score)
- Use Vercel Edge Functions or Astro middleware to send events server-side
- Alternatively: use Partytown to run GA4 in a web worker (acceptable if server-side is too complex)

### Google Search Console

Add verification via `<meta>` tag in `<head>` or DNS TXT record.

## Tone & Content Guidelines

- **Language**: Danish
- **Tone**: Professional, trustworthy, data-driven
- **Focus**: Transparency, consumer empowerment, savings
- **Avoid**: Salesy language, superlatives without data backing
- **Numbers**: Always format with Danish conventions (comma as decimal separator, period as thousands separator)

## Pre-Launch Checklist

- [ ] Lighthouse 100/100 on all 4 categories (Performance, Accessibility, Best Practices, SEO) — mobile AND desktop
- [ ] isitagentready.com — max score on Discoverability, Content, Bot Access
- [ ] All pages have proper `<title>`, `<meta description>`, OG tags
- [ ] JSON-LD structured data validates (schema.org validator)
- [ ] sitemap.xml generates correctly
- [ ] robots.txt is correct and accessible
- [ ] llms.txt is accessible
- [ ] Fonts load correctly with no FOUT/FOIT
- [ ] Dark mode works via system preference
- [ ] Forms are accessible (labels, validation, error messages)
- [ ] No console errors
- [ ] All links work (no 404s)
- [ ] Responsive design works on all breakpoints
- [ ] GA4 tracking fires without blocking render
