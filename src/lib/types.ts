export type SettlementType = 'variabel' | 'fast' | 'aconto_1' | 'aconto_3';
export type PriceType = 'variabel' | 'fast';

export interface ElectricityProvider {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  trustpilot_score: number;
  trustpilot_url: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}

export interface ElectricityProduct {
  id: string;
  provider_id: string;
  product_name: string;
  spot_premium: number;
  subscription_fee: number;
  binding_months: number;
  settlement_type: SettlementType;
  price_type: PriceType;
  green_energy: boolean;
  intro_offer_kr: number;
  estimated_kwh_price: number;
  estimated_monthly: number;
  is_active: boolean;
  features: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductWithProvider extends ElectricityProduct {
  provider: ElectricityProvider;
}

export const SETTLEMENT_LABELS: Record<SettlementType, string> = {
  variabel: 'Variabel',
  fast: 'Fast',
  aconto_1: 'A conto (månedlig)',
  aconto_3: 'A conto (kvartal)',
};

export const PRICE_TYPE_LABELS: Record<PriceType, string> = {
  variabel: 'Variabel pris',
  fast: 'Fast pris',
};

export const STANDARD_ANNUAL_KWH = 4000;
