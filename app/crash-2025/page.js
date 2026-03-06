import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Crash 2025 | Year Forecast & Analysis',
  description: 'Will housing market crash in 2025? Analyze current market absorption rates and 2025 real estate forecast using live data.',
  keywords: 'housing market crash 2025, 2025 housing forecast, real estate market 2025',
};

export default async function Crash2025Page() {
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
        Housing Market Crash 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Is the housing market heading toward a crash in 2025? Monitor absorption rates and market indicators across your city to forecast market conditions for this year.
      </p>

      <div style={{
        backgroundColor: '#e7f3ff',
        border: '1px solid #0066cc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <p style={{ margin: 0, color: '#0043a3' }}>
          <strong>2025 Market Watch:</strong> Track absorption rates monthly to identify market shift patterns and prepare for 2025 conditions.
        </p>
      </div>

      <AbsorptionCalculator initialCities={cities} />
    </div>
  );
}
