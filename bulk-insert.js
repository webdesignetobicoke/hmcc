const fs = require('fs');
const path = require('path');

// Load env variables
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  }
});

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials");
  console.error("URL:", supabaseUrl);
  console.error("Key:", supabaseKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const cities = [
  "Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton",
  "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener",
  "London", "Halifax", "Saskatoon", "Regina", "Victoria",
  "Windsor", "Surrey", "Laval", "Brampton", "Markham"
];

function generateData() {
  const data = [];
  const years = [2024, 2025, 2026];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  cities.forEach(city => {
    years.forEach(year => {
      months.forEach(month => {
        const cityFactor = Math.sin(cities.indexOf(city) / 10) * 0.3 + 0.7;
        const yearFactor = (year - 2023) * 0.15;
        const monthFactor = Math.sin(month / 6) * 0.2;

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

  // Insert in batches of 100
  for (let i = 0; i < data.length; i += 100) {
    const batch = data.slice(i, i + 100);
    
    try {
      const { error } = await supabase
        .from("HMCC - Table")
        .upsert(batch, { onConflict: "city,year,month" });

      if (error) {
        console.log(`❌ Batch ${Math.floor(i/100) + 1} Error: ${error.message}`);
        errorCount += batch.length;
      } else {
        successCount += batch.length;
        console.log(`✅ Batch ${Math.floor(i/100) + 1} inserted (${batch.length} records)`);
      }
    } catch (error) {
      console.log(`❌ Batch ${Math.floor(i/100) + 1} Exception: ${error.message}`);
      errorCount += batch.length;
    }
  }

  console.log(`\n📈 Results:`);
  console.log(`✅ Successfully inserted: ${successCount}/${totalRecords}`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount}`);
  }
  console.log(`\n✨ Extended data insertion complete!`);
  console.log(`🎯 You now have data for ${cities.length} cities across 3 years and all 12 months!`);
}

insertData().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
