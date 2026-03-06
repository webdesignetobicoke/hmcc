import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Crash Canada | National Market Analysis',
  description: 'Analyze housing market crash indicators across Canada. Check the national real estate absorption rate and market conditions.',
  keywords: 'housing market crash Canada, Canadian real estate, housing market forecast',
};

export default async function CanadaPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market Crash Canada
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Explore housing market conditions across Canadian cities. Our absorption rate calculator helps you understand market health and predict crash indicators nationally.
      </p>
      
      <AbsorptionCalculator initialCities={cities} />
    </div>
  );
}
