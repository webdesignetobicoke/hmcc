const fs = require('fs');
const path = require('path');

/**
 * Script to insert housing market data from CSV into Supabase via the API
 * Usage: node insert-data.js
 */

const data = [
  { city: "Toronto", active_listings: 12000, sold_transactions: 6000, months_inventory: 2.00 },
  { city: "Montreal", active_listings: 8000, sold_transactions: 4000, months_inventory: 2.00 },
  { city: "Vancouver", active_listings: 6500, sold_transactions: 2600, months_inventory: 2.50 },
  { city: "Calgary", active_listings: 4200, sold_transactions: 1750, months_inventory: 2.40 },
  { city: "Edmonton", active_listings: 3900, sold_transactions: 1300, months_inventory: 3.00 },
  { city: "Ottawa", active_listings: 3600, sold_transactions: 1800, months_inventory: 2.00 },
  { city: "Winnipeg", active_listings: 2400, sold_transactions: 1000, months_inventory: 2.40 },
  { city: "Quebec City", active_listings: 2100, sold_transactions: 900, months_inventory: 2.33 },
  { city: "Hamilton", active_listings: 2800, sold_transactions: 1200, months_inventory: 2.33 },
  { city: "Kitchener", active_listings: 1900, sold_transactions: 760, months_inventory: 2.50 },
  { city: "London", active_listings: 2000, sold_transactions: 800, months_inventory: 2.50 },
  { city: "Halifax", active_listings: 1400, sold_transactions: 560, months_inventory: 2.50 },
  { city: "Saskatoon", active_listings: 1100, sold_transactions: 440, months_inventory: 2.50 },
  { city: "Regina", active_listings: 1000, sold_transactions: 400, months_inventory: 2.50 },
  { city: "Victoria", active_listings: 1300, sold_transactions: 520, months_inventory: 2.50 },
  { city: "Windsor", active_listings: 950, sold_transactions: 380, months_inventory: 2.50 },
  { city: "Surrey", active_listings: 2300, sold_transactions: 920, months_inventory: 2.50 },
  { city: "Laval", active_listings: 1700, sold_transactions: 680, months_inventory: 2.50 },
  { city: "Brampton", active_listings: 2600, sold_transactions: 1040, months_inventory: 2.50 },
  { city: "Markham", active_listings: 1800, sold_transactions: 720, months_inventory: 2.50 },
];

// Current date - set to March 2026
const currentDate = new Date();
const month = currentDate.getMonth() + 1; // March = 3
const year = currentDate.getFullYear(); // 2026

async function insertData() {
  console.log(`📊 Inserting ${data.length} cities into Supabase...`);
  console.log(`📅 For: March ${year}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const record of data) {
    try {
      const response = await fetch('http://localhost:3003/api/market', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: record.city,
          month,
          year,
          active_listings: record.active_listings,
          sold_transactions: record.sold_transactions,
          months_inventory: record.months_inventory,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(`✅ ${record.city} - MOI: ${record.months_inventory.toFixed(2)} months`);
        successCount++;
      } else {
        console.log(`❌ ${record.city} - Error: ${result.error}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`❌ ${record.city} - Network error: ${error.message}`);
      errorCount++;
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n📈 Results:`);
  console.log(`✅ Successfully inserted: ${successCount}/${data.length}`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount}`);
  }
  console.log(`\n✨ Data insertion complete!`);
}

insertData().catch(console.error);
