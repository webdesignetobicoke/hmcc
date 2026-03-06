const fs = require('fs');
const path = require('path');

/**
 * Script to insert extended housing market data with multiple months and years
 * Usage: node insert-extended-data.js
 */

const cities = [
  "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton",
  "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener",
  "London", "Halifax", "Saskatoon", "Regina", "Victoria",
  "Windsor", "Surrey", "Laval", "Brampton", "Markham"
];

// Generate data for multiple months and years (2024, 2025, 2026)
function generateData() {
  const data = [];
  const years = [2024, 2025, 2026];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  cities.forEach(city => {
    years.forEach(year => {
      months.forEach(month => {
        // Vary data based on city and time
        const cityFactor = Math.sin(cities.indexOf(city) / 10) * 0.3 + 0.7;
        const yearFactor = (year - 2023) * 0.15; // Market variation by year
        const monthFactor = Math.sin(month / 6) * 0.2; // Seasonal variation

        const baseListings = 5000;
        const baseSales = 2000;

        data.push({
          city,
          year,
          month,
          active_listings: Math.round(baseListings * cityFactor * (1 + yearFactor + monthFactor)),
          sold_transactions: Math.round(baseSales * cityFactor * (1 + yearFactor / 2 - monthFactor)),
          months_inventory: parseFloat((2.0 + yearFactor - monthFactor).toFixed(2)),
        });
      });
    });
  });

  return data;
}

async function insertData() {
  const data = generateData();
  const totalRecords = data.length;

  console.log(`📊 Inserting ${totalRecords} records into Supabase...`);
  console.log(`📅 Data range: 2024-2026 (all months, ${cities.length} cities)\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const record of data) {
    try {
      const response = await fetch('http://localhost:3003/api/market', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      const result = await response.json();

      if (response.ok) {
        successCount++;
        // Verbose mode: uncomment to see each record
        // console.log(`✅ ${record.city} ${record.year}-${String(record.month).padStart(2, '0')}`);
      } else {
        errorCount++;
        console.log(`❌ ${record.city} ${record.year}-${String(record.month).padStart(2, '0')} Error: ${result.error}`);
      }
    } catch (error) {
      errorCount++;
      console.log(`❌ ${record.city} ${record.year}-${String(record.month).padStart(2, '0')} Network error: ${error.message}`);
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log(`\n📈 Results:`);
  console.log(`✅ Successfully inserted: ${successCount}/${totalRecords}`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount}`);
  }
  console.log(`\n✨ Extended data insertion complete!`);
  console.log(`🎯 You now have data for ${cities.length} cities across 3 years and all 12 months!`);
}

insertData().catch(console.error);
