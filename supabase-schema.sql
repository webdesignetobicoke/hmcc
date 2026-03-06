-- ================================================================
-- Housing Market Crash Calculator · Supabase Schema
-- Paste this into Supabase SQL Editor and click Run
-- ================================================================

CREATE TABLE IF NOT EXISTS "HMCC - Table" (
  id               SERIAL PRIMARY KEY,
  city             TEXT NOT NULL,
  year             INTEGER NOT NULL CHECK (year >= 2000),
  month            INTEGER NOT NULL CHECK (month BETWEEN 1 AND 12),
  active_listings  INTEGER NOT NULL CHECK (active_listings >= 0),
  sold_transactions INTEGER NOT NULL CHECK (sold_transactions >= 0),
  months_inventory NUMERIC(5, 2) NOT NULL CHECK (months_inventory >= 0),
  UNIQUE (city, year, month)
);

CREATE INDEX IF NOT EXISTS idx_hmcc_city_date
  ON "HMCC - Table" (city, year DESC, month DESC);

-- Row Level Security: public can read, only service role can write
ALTER TABLE "HMCC - Table" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read" ON "HMCC - Table" FOR SELECT USING (true);
CREATE POLICY "Service write" ON "HMCC - Table" FOR ALL
  USING (auth.role() = 'service_role');
