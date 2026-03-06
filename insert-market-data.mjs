import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
      const { data: result, error } = await supabase
        .from("HMCC - Table")
        .upsert(
          {
            city: record.city,
            month,
            year,
            active_listings: record.active_listings,
            sold_transactions: record.sold_transactions,
            months_inventory: record.months_inventory,
          },
          { onConflict: "city,year,month" }
        )
        .select();

      if (error) {
        console.log(
          `❌ ${record.city} - Error: ${error.message}`
        );
        errorCount++;
      } else {
        console.log(`✅ ${record.city} - MOI: ${record.months_inventory.toFixed(2)} months`);
        successCount++;
      }
    } catch (error) {
      console.log(`❌ ${record.city} - Exception: ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n📈 Results:`);
  console.log(`✅ Successfully inserted: ${successCount}/${data.length}`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount}`);
  }
  console.log(`\n✨ Data insertion complete!`);
  process.exit(0);
}

insertData().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
