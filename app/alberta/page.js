import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Alberta 2025 | Calgary Edmonton Real Estate',
  description: 'Alberta housing market analysis and forecasts. Track Calgary, Edmonton, Airdrie, and Sherwood Park absorption rates and market trends.',
  keywords: 'housing market alberta, calgary housing market, edmonton housing market, airdrie housing, alberta real estate',
};

export default async function AlbertaPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  const albertaCities = ['Calgary', 'Edmonton', 'Airdrie', 'Sherwood Park', 'Red Deer', 'Lethbridge'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market Alberta 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Monitor Alberta's real estate landscape. Check absorption rates in Calgary, Edmonton, Airdrie, and other major Alberta cities.
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
          Alberta Cities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {albertaCities.map((city) => (
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
