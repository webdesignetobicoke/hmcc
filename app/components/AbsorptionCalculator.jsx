"use client";

import { useState, useEffect } from "react";
import { getMarketData } from "@/lib/supabase";

const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MARKET_TYPES = [
  { min: 0, max: 2, label: "Strong Seller's Market", meaning: "Expect competition; prices likely rising", color: "#2d6a4f" },
  { min: 2, max: 3, label: "Mild Seller's Market", meaning: "Still competitive but stabilizing", color: "#4a9d6f" },
  { min: 3, max: 5, label: "Balanced Market", meaning: "Considered fair for both buyers and sellers", color: "#1d5f8a" },
  { min: 5, max: 6, label: "Mild Buyer's Market", meaning: "More negotiating power for buyers", color: "#d97a6a" },
  { min: 6, max: Infinity, label: "Strong Buyer's Market", meaning: "Buyers have significant leverage", color: "#9b2335" },
];

function getMarketType(moi) {
  if (moi === null || moi === undefined) return null;
  return MARKET_TYPES.find(m => moi >= m.min && moi < m.max);
}

export default function AbsorptionCalculator({ initialCities = [] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const now = new Date();
  const [cities, setCities] = useState(initialCities.length > 0 ? initialCities : [
   "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton",
    "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener"
  ]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 6 }, (_, i) => now.getFullYear() - i);

  useEffect(() => {
    if (!selectedCity) {
      setData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const marketData = await getMarketData(selectedCity);
        if (!marketData || marketData.length === 0) {
          setData(null);
          setError(`No data available for ${selectedCity}. Make sure data has been inserted into the database.`);
          return;
        }
        const matched = marketData.find(
          (row) => row.month === selectedMonth && row.year === selectedYear
        );
        if (matched) {
          setData({
            city: selectedCity,
            month: selectedMonth,
            year: selectedYear,
            active_listings: matched.active_listings,
            sold_transactions: matched.sold_transactions,
            months_of_inventory: matched.months_inventory,
            market_type: getMarketType(matched.months_inventory),
          });
        } else {
          setData(null);
          setError(`No data found for ${selectedCity} in ${MONTH_NAMES[selectedMonth]} ${selectedYear}. Try a different month/year.`);
        }
      } catch (err) {
        console.error("Supabase error:", err);
        const demoData = {
          city: selectedCity,
          month: selectedMonth,
          year: selectedYear,
          active_listings: 5000 + Math.random() * 5000,
          sold_transactions: 2000 + Math.random() * 2000,
          months_of_inventory: 2 + Math.random() * 2,
        };
        demoData.market_type = getMarketType(demoData.months_of_inventory);
        setData(demoData);
        setError("📌 Database not available - showing demo data. Create the HMCC - Table and insert data to see real results.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCity, selectedMonth, selectedYear]);

  return (
    <div style={{ width: "100%" }}>
      <style>{`
        @media (max-width: 768px) {
          .selectors-card { grid-template-columns: 1fr !important; padding: 1.2rem !important; margin-bottom: 1.5rem !important; }
          .selector-input { font-size: 1.2rem !important; padding: 0.9rem !important; }
          .calc-card-container { grid-template-columns: 1fr !important; }
          .calc-left { border-right: none !important; border-bottom: 2px solid #e0e8f0 !important; }
          .calc-display { flex-direction: column !important; gap: 1rem !important; }
          .calc-division { font-size: 1.8rem !important; }
          .calc-result { padding: 2rem 1.5rem !important; }
          .market-rate { font-size: 3.5rem !important; }
          .error-box { font-size: 0.85rem !important; padding: 1rem !important; }
          .empty-box { padding: 2rem 1rem !important; }
        }
      `}</style>

      {/* Selectors Card */}
      <div className="selectors-card" style={{
        background: "#ffffff",
        borderRadius: "0px",
        padding: "2rem",
        marginBottom: "2.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "1.5rem",
        border: "1px solid #e8e8e8",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
      }}>
        {/* City */}
        <div>
          <label style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "0.7rem",
            display: "block",
            fontWeight: 600,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}>📍 City</label>
          <select
            className="selector-input"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              width: "100%",
              padding: "1.2rem 0.9rem",
              background: "#ffffff",
              border: "1.5px solid #0066cc",
              borderRadius: "0px",
              color: selectedCity ? "#000000" : "#666666",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: selectedCity ? "1.8rem" : "1.2rem",
              fontWeight: selectedCity ? 800 : 600,
              outline: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <option value="">-- Choose City --</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Month */}
        <div>
          <label style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "0.7rem",
            display: "block",
            fontWeight: 600,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}>📅 Month</label>
          <select
            className="selector-input"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(+e.target.value)}
            style={{
              width: "100%",
              padding: "1.2rem 0.9rem",
              background: "#ffffff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "0px",
              color: "#1a1a1a",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              outline: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {months.map((m) => (
              <option key={m} value={m}>{MONTH_NAMES[m]}</option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#888",
            marginBottom: "0.7rem",
            display: "block",
            fontWeight: 600,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}>📆 Year</label>
          <select
            className="selector-input"
            value={selectedYear}
            onChange={(e) => setSelectedYear(+e.target.value)}
            style={{
              width: "100%",
              padding: "1.2rem 0.9rem",
              background: "#ffffff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "0px",
              color: "#1a1a1a",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              outline: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Box */}
      {error && (
        <div className="error-box" style={{
          background: error.includes("demo") ? "#e6f3ff" : "#ffe6e6",
          border: `1.5px solid ${error.includes("demo") ? "#3399ff" : "#ff6b6b"}`,
          color: error.includes("demo") ? "#0052a3" : "#c92a2a",
          padding: "1.2rem 1.5rem",
          marginBottom: "2rem",
          fontSize: "0.95rem",
          borderRadius: "0px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
          lineHeight: "1.6",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: "center", color: "#0066cc", fontSize: "1rem", marginBottom: "2rem", fontWeight: 600, fontFamily: "Helvetica, Arial, sans-serif" }}>
          Loading...
        </div>
      )}

      {/* Empty State */}
      {!selectedCity && !loading && (
        <div className="empty-box" style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)",
          border: "2px dashed #b0b8c1",
          padding: "4rem 2rem",
          textAlign: "center",
          color: "#666",
          fontSize: "1rem",
          letterSpacing: "0.02em",
          marginBottom: "2rem",
          borderRadius: "0px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        }}>
          👆 Choose a city to get started
        </div>
      )}

      {/* Results */}
      {data && !loading && renderResults()}
    </div>
  );

  function renderResults() {
    return (
      <div style={{ width: "100%" }}>
        {/* Location & Date Display */}
        <div style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1a2847 100%)",
          padding: "2.5rem",
          textAlign: "center",
          marginBottom: "2rem",
          borderRadius: "0px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "Helvetica, Arial, sans-serif",
            letterSpacing: "-0.01em",
          }}>
            Housing Market {data.city} {data.year}
          </div>
          <div style={{
            fontSize: "0.9rem",
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: "0.5rem",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}>
            {MONTH_NAMES[data.month]} {data.year}
          </div>
        </div>

        {/* Calculation Card */}
        <div className="calc-card-container" style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8fbff 100%)",
          border: "2px solid #e0e8f0",
          padding: "0",
          marginBottom: "2rem",
          borderRadius: "0px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}>
          {/* LEFT Panel */}
          <div className="calc-left" style={{
            padding: "3rem 2.5rem",
            borderRight: "2px solid #e0e8f0",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}>
            <div className="calc-display" style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}>
              {/* Active Listings */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "0.75rem",
                  color: "#888",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}>Active Listings</div>
                <div style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#1a4d7f",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.01em",
                }}>
                  {data.active_listings.toLocaleString()}
                </div>
              </div>

              {/* Division Symbol */}
              <div className="calc-division" style={{
                fontSize: "2.5rem",
                color: "#ccc",
                fontWeight: 300,
              }}>
                ÷
              </div>

              {/* Sold Transactions */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontSize: "0.75rem",
                  color: "#888",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}>Sold Transactions</div>
                <div style={{
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  color: "#9b4d34",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  letterSpacing: "-0.01em",
                }}>
                  {data.sold_transactions.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT Panel */}
          <div className="calc-result" style={{
            padding: "3rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: `linear-gradient(135deg, ${data.market_type.color}08 0%, ${data.market_type.color}04 100%)`,
            textAlign: "center",
          }}>
            <div style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: data.market_type.color,
              marginBottom: "1rem",
              fontWeight: 800,
              opacity: 0.6,
              fontFamily: "Helvetica, Arial, sans-serif",
            }}>
              = Absorption Rate
            </div>

            <div className="market-rate" style={{
              fontSize: "5.5rem",
              fontWeight: 900,
              color: data.market_type.color,
              lineHeight: 1,
              marginBottom: "0.5rem",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}>
              {data.months_of_inventory.toFixed(1)}
            </div>

            <div style={{
              fontSize: "0.7rem",
              color: data.market_type.color,
              marginBottom: "1.5rem",
              fontWeight: 600,
              opacity: 0.5,
              fontFamily: "Helvetica, Arial, sans-serif",
            }}>
              MONTHS
            </div>

            <div style={{
              fontSize: "1.1rem",
              color: data.market_type.color,
              fontWeight: 800,
              fontFamily: "Helvetica, Arial, sans-serif",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}>
              {data.market_type.label}
            </div>
          </div>
        </div>

        {/* Market Type Table */}
        <div style={{
          background: "#ffffff",
          border: "1px solid #e8e8e8",
          borderRadius: "0px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#666",
            padding: "1.5rem",
            background: "linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%)",
            borderBottom: "1px solid #e8e8e8",
            fontWeight: 600,
            fontFamily: "Helvetica, Arial, sans-serif",
          }}>
            📈 Market Type Reference
          </div>

          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.95rem",
          }}>
            <thead>
              <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #e0e0e0" }}>
                <th style={{
                  padding: "1rem 1.5rem",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}>Rate (mo)</th>
                <th style={{
                  padding: "1rem 1.5rem",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}>Market Type</th>
                <th style={{
                  padding: "1rem 1.5rem",
                  textAlign: "left",
                  color: "#666",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_TYPES.map((type, idx) => {
                const isHighlighted =
                  data.market_type &&
                  data.market_type.label === type.label;

                return (
                  <tr
                    key={idx}
                    style={{
                      background: isHighlighted
                        ? `${type.color}08`
                        : idx % 2 === 0 ? "#ffffff" : "#f8f9fa",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <td style={{
                      padding: "1.2rem 1.5rem",
                      color: isHighlighted ? type.color : "#333",
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: isHighlighted ? 700 : 500,
                      fontSize: "0.95rem",
                    }}>
                      {type.min}-{type.max === Infinity ? "+" : type.max}
                    </td>
                    <td style={{
                      padding: "1.2rem 1.5rem",
                      color: isHighlighted ? type.color : "#1a1a1a",
                      fontWeight: isHighlighted ? 700 : 600,
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: "0.95rem",
                    }}>
                      {type.label}
                    </td>
                    <td style={{
                      padding: "1.2rem 1.5rem",
                      color: isHighlighted ? type.color : "#666",
                      fontWeight: isHighlighted ? 600 : 400,
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontSize: "0.95rem",
                      lineHeight: 1.5,
                    }}>
                      {type.meaning}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
