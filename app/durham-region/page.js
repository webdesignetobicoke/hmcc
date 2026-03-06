import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Durham Region 2025 | Oshawa Whitby Real Estate',
  description: 'Durham Region housing market analysis. Track Oshawa, Whitby, Ajax, and Pickering absorption rates and market trends.',
  keywords: 'housing market durham region, oshawa housing market, whitby housing market, ajax housing, durham housing',
};

export default async function DurhamPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  const durhamCities = ['Oshawa', 'Whitby', 'Ajax', 'Pickering', 'Clarington'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market Durham Region 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Analyze Durham Region's real estate market. Monitor Oshawa, Whitby, Ajax, and Pickering absorption rates and housing trends.
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
          Durham Region Cities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {durhamCities.map((city) => (
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
