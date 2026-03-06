import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Manitoba 2025 | Winnipeg Real Estate',
  description: 'Manitoba housing market analysis. Check Winnipeg and other Manitoba cities for absorption rates and real estate trends.',
  keywords: 'housing market manitoba, winnipeg housing market, manitoba real estate, housing crash manitoba',
};

export default async function ManitobaPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  const manitobaCities = ['Winnipeg', 'Brandon'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market Manitoba 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Analyze Manitoba's real estate market. Track Winnipeg and regional housing market absorption rates and forecasts.
      </p>
      
      <AbsorptionCalculator initialCities={cities} />

      <div style={{
        marginTop: '50px',
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px'
      }}>
        <h2 style={{ 
          fontSize: '1.8em',
          fontFamily: 'Merriweather, serif',
          marginBottom: '20px',
          color: '#1a1a1a'
        }}>
          Manitoba Cities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {manitobaCities.map((city) => (
            <a key={city} href={`/${city.toLowerCase()}`} style={{
              display: 'block',
              padding: '12px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '6px',
              textDecoration: 'none',
              color: '#0066cc',
              fontSize: '0.95em'
            }}>
              {city} Housing Market
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
