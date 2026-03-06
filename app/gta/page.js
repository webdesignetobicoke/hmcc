import AbsorptionCalculator from '@/components/AbsorptionCalculator';
import { getCities } from '@/lib/supabase';

export const metadata = {
  title: 'Housing Market GTA 2025 | Greater Toronto Area Real Estate',
  description: 'GTA housing market crash analysis. Track Toronto, Mississauga, Brampton, Oakville, and surrounding area absorption rates and trends.',
  keywords: 'housing market gta, housing market toronto, gta real estate, housing market in gta, greater toronto area housing',
};

export default async function GTAPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch (error) {
    console.error('Error fetching cities:', error);
  }

  const gtaCities = ['Toronto', 'Mississauga', 'Brampton', 'Oakville', 'Burlington', 'Milton', 'Richmond Hill', 'Vaughan', 'Pickering', 'Oshawa', 'Ajax', 'Whitby'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        fontFamily: 'Merriweather, serif',
        marginBottom: '10px',
        color: '#1a1a1a'
      }}>
        Housing Market GTA 2025
      </h1>
      <p style={{ 
        fontSize: '1.1em', 
        color: '#666', 
        marginBottom: '30px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Monitor the Greater Toronto Area housing market. Analyze absorption rates across Toronto, Mississauga, Brampton, Oakville, and surrounding cities.
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
          GTA Cities
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          {gtaCities.map((city) => (
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
