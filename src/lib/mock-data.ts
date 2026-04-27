import type { ElectricityProvider, ProductWithProvider } from './types';
import { STANDARD_ANNUAL_KWH } from './types';

const NOW = '2026-04-01T00:00:00.000Z';

const providers: ElectricityProvider[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'OK',
    slug: 'ok',
    logo_url: '/images/providers/ok.svg',
    trustpilot_score: 4.3,
    trustpilot_url: 'https://dk.trustpilot.com/review/ok.dk',
    website_url: 'https://www.ok.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    name: 'Modstrøm',
    slug: 'modstrom',
    logo_url: '/images/providers/modstrom.svg',
    trustpilot_score: 4.7,
    trustpilot_url: 'https://dk.trustpilot.com/review/modstrom.dk',
    website_url: 'https://www.modstrom.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    name: 'Andel Energi',
    slug: 'andel-energi',
    logo_url: '/images/providers/andel-energi.svg',
    trustpilot_score: 4.1,
    trustpilot_url: 'https://dk.trustpilot.com/review/andelenergi.dk',
    website_url: 'https://andelenergi.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Norlys',
    slug: 'norlys',
    logo_url: '/images/providers/norlys.svg',
    trustpilot_score: 3.9,
    trustpilot_url: 'https://dk.trustpilot.com/review/norlys.dk',
    website_url: 'https://norlys.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'Ørsted',
    slug: 'orsted',
    logo_url: '/images/providers/orsted.svg',
    trustpilot_score: 3.7,
    trustpilot_url: 'https://dk.trustpilot.com/review/orsted.dk',
    website_url: 'https://orsted.dk/privat',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'NRGi',
    slug: 'nrgi',
    logo_url: '/images/providers/nrgi.svg',
    trustpilot_score: 4.0,
    trustpilot_url: 'https://dk.trustpilot.com/review/nrgi.dk',
    website_url: 'https://nrgi.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000007',
    name: 'Vindstød',
    slug: 'vindstod',
    logo_url: '/images/providers/vindstod.svg',
    trustpilot_score: 4.8,
    trustpilot_url: 'https://dk.trustpilot.com/review/vindstoed.dk',
    website_url: 'https://vindstoed.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000008',
    name: 'EWII',
    slug: 'ewii',
    logo_url: '/images/providers/ewii.svg',
    trustpilot_score: 3.8,
    trustpilot_url: 'https://dk.trustpilot.com/review/ewii.dk',
    website_url: 'https://www.ewii.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000009',
    name: 'AURA Energi',
    slug: 'aura-energi',
    logo_url: '/images/providers/aura-energi.svg',
    trustpilot_score: 4.2,
    trustpilot_url: 'https://dk.trustpilot.com/review/aura.dk',
    website_url: 'https://aura.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000010',
    name: 'Jysk Energi',
    slug: 'jysk-energi',
    logo_url: '/images/providers/jysk-energi.svg',
    trustpilot_score: 4.4,
    trustpilot_url: 'https://dk.trustpilot.com/review/jyskenergi.dk',
    website_url: 'https://jysk-energi.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000011',
    name: 'Energi Fyn',
    slug: 'energi-fyn',
    logo_url: '/images/providers/energi-fyn.svg',
    trustpilot_score: 4.0,
    trustpilot_url: 'https://dk.trustpilot.com/review/energifyn.dk',
    website_url: 'https://www.energifyn.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
  {
    id: '00000000-0000-0000-0000-000000000012',
    name: 'Gasel',
    slug: 'gasel',
    logo_url: '/images/providers/gasel.svg',
    trustpilot_score: 4.5,
    trustpilot_url: 'https://dk.trustpilot.com/review/gasel.dk',
    website_url: 'https://gasel.dk/',
    created_at: NOW,
    updated_at: NOW,
  },
];

interface ProductSeed {
  provider_slug: string;
  product_name: string;
  spot_premium: number;
  subscription_fee: number;
  binding_months: number;
  settlement_type: 'variabel' | 'fast' | 'aconto_1' | 'aconto_3';
  price_type: 'variabel' | 'fast';
  green_energy: boolean;
  intro_offer_kr?: number;
  features: string[];
}

const productSeeds: ProductSeed[] = [
  {
    provider_slug: 'vindstod',
    product_name: 'Danskvind',
    spot_premium: 0,
    subscription_fee: 19,
    binding_months: 0,
    settlement_type: 'aconto_1',
    price_type: 'variabel',
    green_energy: true,
    intro_offer_kr: 500,
    features: ['Ingen binding', '100% vindenergi', 'Lav pris'],
  },
  {
    provider_slug: 'modstrom',
    product_name: 'Mod til Plus',
    spot_premium: 2.5,
    subscription_fee: 19,
    binding_months: 0,
    settlement_type: 'aconto_1',
    price_type: 'variabel',
    green_energy: true,
    intro_offer_kr: 373,
    features: ['Ingen binding', '100% grøn strøm', 'Godt omdømme'],
  },
  {
    provider_slug: 'modstrom',
    product_name: 'Mod til Mere',
    spot_premium: 4.0,
    subscription_fee: 29,
    binding_months: 6,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: true,
    features: ['100% grøn strøm', 'Loyalitetsbonus'],
  },
  {
    provider_slug: 'gasel',
    product_name: 'Gasel Enkel',
    spot_premium: 1.5,
    subscription_fee: 0,
    binding_months: 0,
    settlement_type: 'aconto_1',
    price_type: 'variabel',
    green_energy: false,
    features: ['Intet abonnement', 'Ingen binding'],
  },
  {
    provider_slug: 'ok',
    product_name: 'OK El Variabel',
    spot_premium: 3.0,
    subscription_fee: 25,
    binding_months: 0,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: true,
    intro_offer_kr: 200,
    features: ['Ingen binding', 'Rabat på OK benzin'],
  },
  {
    provider_slug: 'ok',
    product_name: 'OK El Fast 12',
    spot_premium: 0,
    subscription_fee: 29,
    binding_months: 12,
    settlement_type: 'fast',
    price_type: 'fast',
    green_energy: true,
    features: ['Fast pris 12 mdr.', 'Budgetsikkerhed'],
  },
  {
    provider_slug: 'andel-energi',
    product_name: 'FlexEl',
    spot_premium: 2.0,
    subscription_fee: 23,
    binding_months: 0,
    settlement_type: 'aconto_1',
    price_type: 'variabel',
    green_energy: true,
    features: ['Ingen binding', 'Andelsejet', 'Månedlig afregning'],
  },
  {
    provider_slug: 'andel-energi',
    product_name: 'FastPris 6',
    spot_premium: 0,
    subscription_fee: 35,
    binding_months: 6,
    settlement_type: 'fast',
    price_type: 'fast',
    green_energy: true,
    features: ['Fast pris 6 mdr.', 'Andelsejet'],
  },
  {
    provider_slug: 'norlys',
    product_name: 'Norlys Standard',
    spot_premium: 4.5,
    subscription_fee: 35,
    binding_months: 6,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: false,
    features: ['Kundeservice 24/7'],
  },
  {
    provider_slug: 'norlys',
    product_name: 'Norlys Grøn',
    spot_premium: 5.5,
    subscription_fee: 39,
    binding_months: 6,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: true,
    intro_offer_kr: 600,
    features: ['100% grøn strøm', 'Klimaregnskab'],
  },
  {
    provider_slug: 'orsted',
    product_name: 'Variabel El',
    spot_premium: 6.0,
    subscription_fee: 39,
    binding_months: 6,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: true,
    features: ['100% havvind', 'Grøn profil'],
  },
  {
    provider_slug: 'nrgi',
    product_name: 'NRGi Standard',
    spot_premium: 3.5,
    subscription_fee: 29,
    binding_months: 0,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: false,
    features: ['Ingen binding'],
  },
  {
    provider_slug: 'nrgi',
    product_name: 'NRGi Grøn',
    spot_premium: 4.5,
    subscription_fee: 35,
    binding_months: 6,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: true,
    intro_offer_kr: 300,
    features: ['100% grøn strøm'],
  },
  {
    provider_slug: 'ewii',
    product_name: 'EWII Basis',
    spot_premium: 3.8,
    subscription_fee: 29,
    binding_months: 0,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: false,
    features: ['Ingen binding'],
  },
  {
    provider_slug: 'aura-energi',
    product_name: 'AURA Variabel',
    spot_premium: 2.9,
    subscription_fee: 25,
    binding_months: 0,
    settlement_type: 'aconto_1',
    price_type: 'variabel',
    green_energy: true,
    features: ['Ingen binding', 'Grøn strøm'],
  },
  {
    provider_slug: 'jysk-energi',
    product_name: 'Jysk Enkel',
    spot_premium: 1.9,
    subscription_fee: 19,
    binding_months: 0,
    settlement_type: 'aconto_1',
    price_type: 'variabel',
    green_energy: true,
    intro_offer_kr: 250,
    features: ['Ingen binding', 'Månedlig afregning', 'Jysk forankret'],
  },
  {
    provider_slug: 'energi-fyn',
    product_name: 'Fyn El',
    spot_premium: 3.2,
    subscription_fee: 27,
    binding_months: 0,
    settlement_type: 'aconto_3',
    price_type: 'variabel',
    green_energy: true,
    features: ['Ingen binding', 'Lokalt forankret'],
  },
];

const BASE_SPOT_PRICE_ORE = 85;

function estimateKwhPriceKr(spotPremiumOre: number): number {
  const totalOre = BASE_SPOT_PRICE_ORE + spotPremiumOre;
  return totalOre / 100;
}

function estimateMonthlyKr(kwhPriceKr: number, subscription: number): number {
  const monthlyKwh = STANDARD_ANNUAL_KWH / 12;
  return Math.round(kwhPriceKr * monthlyKwh + subscription);
}

function buildProducts(): ProductWithProvider[] {
  return productSeeds.map((seed, index) => {
    const provider = providers.find((p) => p.slug === seed.provider_slug);
    if (!provider) throw new Error(`Unknown provider slug: ${seed.provider_slug}`);
    const estimated_kwh_price = estimateKwhPriceKr(seed.spot_premium);
    const estimated_monthly = estimateMonthlyKr(estimated_kwh_price, seed.subscription_fee);
    return {
      id: `product-${String(index + 1).padStart(4, '0')}`,
      provider_id: provider.id,
      product_name: seed.product_name,
      spot_premium: seed.spot_premium,
      subscription_fee: seed.subscription_fee,
      binding_months: seed.binding_months,
      settlement_type: seed.settlement_type,
      price_type: seed.price_type,
      green_energy: seed.green_energy,
      intro_offer_kr: seed.intro_offer_kr ?? 0,
      estimated_kwh_price,
      estimated_monthly,
      is_active: true,
      features: seed.features,
      created_at: NOW,
      updated_at: NOW,
      provider,
    };
  });
}

const cachedProducts: ProductWithProvider[] = buildProducts().sort(
  (a, b) => a.estimated_monthly - b.estimated_monthly,
);

export function getMockProviders(): ElectricityProvider[] {
  return providers;
}

export function getMockProducts(): ProductWithProvider[] {
  return cachedProducts;
}

export function getMockProductsByProvider(slug: string): ProductWithProvider[] {
  return cachedProducts.filter((p) => p.provider.slug === slug);
}
