import { getCities } from "@/lib/supabase";
import AbsorptionCalculator from "@/components/AbsorptionCalculator";

export async function generateMetadata({ params }) {
  const city = decodeURIComponent(params.city);
  const formattedCity = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Housing Market ${formattedCity} Crash Calculator | Real Estate Analytics`,
    description: `Analyze the housing market in ${formattedCity}. Calculate absorption rates and identify market turning points using our real estate crash calculator. Data-driven insights for ${formattedCity} market conditions.`,
    openGraph: {
      title: `Housing Market ${formattedCity} Crash Calculator`,
      description: `Analyze absorption rates and market conditions in ${formattedCity}`,
    },
  };
}

export default async function CityPage({ params }) {
  const city = decodeURIComponent(params.city);
  const formattedCity = city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  let cities = [];
  try {
    cities = await getCities();
  } catch {
    // Supabase not yet configured
  }

  return <AbsorptionCalculator initialCities={cities} selectedCityProp={formattedCity} />;
}
