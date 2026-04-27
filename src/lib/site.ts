export const SITE = {
  name: 'Tjekelpris.dk',
  url: 'https://tjekelpris.dk',
  locale: 'da-DK',
  description:
    'Tjekelpris.dk er Danmarks uafhængige elsammenligningstjeneste. Sammenlign elpriser fra alle elselskaber og find den billigste elaftale.',
  shortDescription: 'Sammenlign elpriser og find den billigste elaftale i Danmark.',
  tagline: 'Uafhængig sammenligning af elpriser',
  email: 'kontakt@tjekelpris.dk',
  twitter: '@tjekelpris',
  defaultOgImage: '/og-image.png',
} as const;

export const NAV_LINKS = [
  { href: '/elpriser/', label: 'Elpriser' },
  { href: '/blog/', label: 'Blog' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/om-os/', label: 'Om os' },
  { href: '/kontakt/', label: 'Kontakt' },
] as const;
