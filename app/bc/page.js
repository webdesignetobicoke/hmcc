import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market BC 2025 | British Columbia Real Estate',
  description: 'British Columbia housing market analysis. Check Vancouver, Victoria, Kelowna, and other BC cities for absorption rates and crash indicators.',
  keywords: 'housing market bc, british columbia housing, vancouver housing market, victoria housing market, kelowna housing',
};

export default async function BCPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  const bcCities = ['Vancouver', 'Victoria', 'Kelowna', 'Abbotsford', 'Burnaby', 'Surrey', 'Coquitlam', 'Richmond'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market British Columbia 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Analyze BC's real estate market trends. Monitor absorption rates in Vancouver, Victoria, Kelowna and other British Columbia cities.
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
          BC Cities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {bcCities.map((city) => (
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
