import { getCities } from "@/lib/supabase";
import AbsorptionCalculator from "@/components/AbsorptionCalculator";
import NavLinks from "@/components/NavLinks";

export const revalidate = 60; // revalidate cached data every 60 seconds

export const metadata = {
  title: "Housing Market Crash Calculator | Real Estate Analytics",
  description: "Analyze housing market absorption rates and identify market turning points. Real estate data for major Canadian cities.",
  keywords: "housing market crash, real estate calculator, absorption rate, market analysis, Canada housing",
};

export default async function MarketPage() {
  let cities = [];
  try {
    cities = await getCities();
  } catch {
    // Supabase not yet configured — calculator still renders with empty city list
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          h1 { font-size: 2rem !important; }
          .hero-subheading { font-size: 1rem !important; }
          .hero-description { font-size: 0.9rem !important; }
          .main-content { padding: 30px 16px !important; }
          .calculator-card { padding: 24px 16px !important; }
          .margin-bottom-hero { margin-bottom: 40px !important; }
        }
      `}</style>
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #1a2847 50%, #0f172a 100%)',
        padding: '0'
      }}>
        {/* Navigation Links Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid #e0e0e0',
          padding: '16px 20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <NavLinks />
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content" style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hero Section with Heading */}
          <div className="margin-bottom-hero" style={{
            marginBottom: '60px',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            <h1 style={{
              fontSize: '3.5rem',
              fontWeight: 800,
              marginBottom: '16px',
              fontFamily: "Helvetica, Arial, sans-serif",
              lineHeight: 1.2,
              letterSpacing: '-0.02em'
            }}>
              Housing Market Crash Calculator
            </h1>
            <p className="hero-subheading" style={{
              fontSize: '1.3rem',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '8px',
              fontWeight: 400,
              fontFamily: "Helvetica, Arial, sans-serif",
              maxWidth: '700px',
              margin: '0 auto 8px'
            }}>
              Analyze Real Estate Market Trends
            </p>
            <p className="hero-description" style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: "Helvetica, Arial, sans-serif",
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Calculate absorption rates across major Canadian cities to identify market turning points and predict buyer vs seller advantage
            </p>
          </div>

          {/* Calculator Card */}
          <div className="calculator-card" style={{
            background: '#ffffff',
            borderRadius: '0px',
            padding: '50px 40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <AbsorptionCalculator initialCities={cities} />
          </div>
        </div>
      </div>
    </>
  );
}
