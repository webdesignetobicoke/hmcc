import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market Ontario 2025 | Market Crash Indicators',
  description: 'Analyze housing market trends in Ontario. Check absorption rates, market crash risk, and real estate forecasts for Toronto, Ottawa, Hamilton, and more.',
  keywords: 'housing market ontario, ontario real estate, toronto housing market, ottawa housing market, hamilton housing market',
};

export default async function OntarioPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  const ontarioCities = ['Toronto', 'Ottawa', 'Hamilton', 'London', 'Kitchener', 'Mississauga', 'Brampton', 'Oshawa', 'Barrie', 'St Catharines', 'Cambridge', 'Guelph', 'Waterloo', 'Richmond Hill', 'Vaughan', 'Milton', 'Oakville', 'Burlington', 'Pickering'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market Ontario 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Track Ontario's housing market crisis. Analyze absorption rates across major cities including Toronto, Ottawa, and Hamilton to understand regional market trends.
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
          Ontario Cities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {ontarioCities.map((city) => (
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
