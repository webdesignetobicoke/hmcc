import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Quebec 2025 | Montreal Real Estate Analysis',
  description: 'Quebec housing market trends and crash indicators. Analyze Montreal, Quebec City absorption rates and provincial real estate forecasts.',
  keywords: 'housing market quebec, montreal housing market, quebec city housing, quebec real estate, housing crash quebec',
};

export default async function QuebecPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  const quebecCities = ['Montreal', 'Quebec City', 'Gatineau', 'Sherbrooke', 'Trois-Rivières'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market Quebec 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Track Quebec's housing market conditions. Monitor Montreal, Quebec City, and other regional markets for absorption rate trends and forecasts.
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
          Quebec Cities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {quebecCities.map((city) => (
            <a key={city} href={`/${city.toLowerCase().replace(' ', '-')}`} style={{
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
