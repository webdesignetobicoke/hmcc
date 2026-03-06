import { getCities } from "@/lib/supabase";
import AbsorptionCalculator from "@/components/AbsorptionCalculator";

export const revalidate = 60; // revalidate cached data every 60 seconds

export default async function MarketPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch {
    // Supabase not yet configured — calculator still renders with empty city list
  }

  return <AbsorptionCalculator initialCities={cities} />;
}
