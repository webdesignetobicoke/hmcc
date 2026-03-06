import { createClient } from "@supabase/supabase-js";

// Public client — safe in the browser (read-only via RLS)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Admin client — server-side only, never import in client components
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function getCities() {
  const { data, error } = await supabase
    .from("HMCC - Table")
    .select("city")
    .order("city");
  if (error) throw error;
  return [...new Set(data.map((r) => r.city))];
}

export async function getMarketData(city, limit = 12) {
  const { data, error } = await supabase
    .from("HMCC - Table")
    .select("*")
    .eq("city", city)
    .order("year", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}
