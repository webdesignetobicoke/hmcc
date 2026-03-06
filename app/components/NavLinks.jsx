'use client';

export default function NavLinks() {
  return (
    <>
      <div style={{
        marginTop: '50px',
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ 
          fontSize: '1.8em',
          fontFamily: 'Merriweather, serif',
          marginBottom: '20px',
          color: '#1a1a1a'
        }}>
          Popular Topics
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '15px',
          fontFamily: 'Inter, sans-serif'
        }}>
          <a href="/canada" style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#0066cc',
            transition: 'all 0.3s ease'
          }} onMouseOver={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.target.style.boxShadow = 'none'}>
            <strong>Housing Market Crash Canada</strong>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '0.9em' }}>National market analysis and trends</p>
          </a>
          <a href="/will-crash" style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#0066cc',
            transition: 'all 0.3s ease'
          }} onMouseOver={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.target.style.boxShadow = 'none'}>
            <strong>Will Housing Market Crash?</strong>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '0.9em' }}>Prediction and risk assessment</p>
          </a>
          <a href="/crash-2025" style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#0066cc',
            transition: 'all 0.3s ease'
          }} onMouseOver={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.target.style.boxShadow = 'none'}>
            <strong>Housing Market 2025 Forecast</strong>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '0.9em' }}>Current year market conditions</p>
          </a>
          <a href="/crash-2008" style={{
            display: 'block',
            padding: '15px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            textDecoration: 'none',
            color: '#0066cc',
            transition: 'all 0.3s ease'
          }} onMouseOver={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'} onMouseOut={(e) => e.target.style.boxShadow = 'none'}>
            <strong>2008 Housing Crash Analysis</strong>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '0.9em' }}>Historical comparison and lessons</p>
          </a>
        </div>
      </div>

      <div style={{
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h2 style={{ 
          fontSize: '1.8em',
          fontFamily: 'Merriweather, serif',
          marginBottom: '20px',
          color: '#1a1a1a'
        }}>
          Browse by Province
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          <a href="/ontario" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Ontario</a>
          <a href="/bc" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>British Columbia</a>
          <a href="/alberta" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Alberta</a>
          <a href="/quebec" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Quebec</a>
          <a href="/manitoba" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Manitoba</a>
          <a href="/saskatchewan" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Saskatchewan</a>
          <a href="/nova-scotia" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Nova Scotia</a>
        </div>
      </div>

      <div style={{
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
          Browse by Region
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          fontFamily: 'Inter, sans-serif'
        }}>
          <a href="/gta" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Greater Toronto Area</a>
          <a href="/durham-region" style={{
            display: 'block',
            padding: '12px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textDecoration: 'none',
            color: '#0066cc',
            fontSize: '0.95em'
          }}>Durham Region</a>
        </div>
      </div>
    </>
  );
}
