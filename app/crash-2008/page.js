import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Crash 2008 | Historical Analysis & Comparison',
  description: 'Learn from the 2008 housing market crash. Compare historical data with current market conditions using absorption rate analysis.',
  keywords: 'housing market crash 2008, financial crisis real estate, market comparison analysis',
};

export default async function Crash2008Page() {
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
        Housing Market Crash 2008
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        The 2008 housing crash transformed real estate markets globally. Compare historical market data with current conditions to understand how absorption rates revealed the crisis.
      </p>

      <div style={{
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <p style={{ margin: 0, color: '#721c24' }}>
          <strong>Historical Lesson:</strong> In 2008, absorption rates spiked to 12+ months, signaling market collapse. Early warning signs were visible in absorption data months before prices crashed.
        </p>
      </div>

      <AbsorptionCalculator initialCities={cities} />
    </div>
  );
}
