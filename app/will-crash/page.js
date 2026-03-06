import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Will Housing Market Crash? | Prediction & Analysis Tool',
  description: 'Will the housing market crash? Use our real-time absorption rate calculator to forecast market conditions and assess crash risk indicators.',
  keywords: 'will housing market crash, housing market prediction, market crash indicators',
};

export default async function WillCrashPage() {
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
        Will Housing Market Crash?
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Predicting a housing market crash requires analyzing key indicators. Our tool measures absorption rates to reveal early warning signs and help you understand market risk.
      </p>
      
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        fontFamily: 'Inter, sans-serif'
      }}>
        <p style={{ margin: 0, color: '#856404' }}>
          <strong>Market Crash Indicators:</strong> When months of inventory exceeds 6+ months, it signals a strong buyer's market and potential price corrections.
        </p>
      </div>

      <AbsorptionCalculator initialCities={cities} />
    </div>
  );
}
