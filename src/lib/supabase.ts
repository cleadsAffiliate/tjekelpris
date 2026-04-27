import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { ElectricityProvider, ProductWithProvider } from './types';
import { getMockProducts, getMockProviders } from './mock-data';

const SUPABASE_URL = import.meta.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export async function fetchProviders(): Promise<ElectricityProvider[]> {
  const supabase = getClient();
  if (!supabase) return getMockProviders();
  const { data, error } = await supabase
    .from('electricity_providers')
    .select('*')
    .order('name');
  if (error || !data) return getMockProviders();
  return data as ElectricityProvider[];
}

export async function fetchProducts(): Promise<ProductWithProvider[]> {
  const supabase = getClient();
  if (!supabase) return getMockProducts();
  const { data, error } = await supabase
    .from('electricity_products')
    .select('*, provider:electricity_providers(*)')
    .eq('is_active', true)
    .order('estimated_monthly');
  if (error || !data) return getMockProducts();
  return data as ProductWithProvider[];
}

export async function fetchProductsByProvider(slug: string): Promise<ProductWithProvider[]> {
  const all = await fetchProducts();
  return all.filter((p) => p.provider.slug === slug);
}
