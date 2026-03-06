-- ================================================================
-- Insert extended market data for 2024-2026
-- Copy & paste this into Supabase SQL Editor and click Run
-- ================================================================

-- Insert data for 2024, 2025, and 2026 across all months and cities
INSERT INTO "HMCC - Table" (city, year, month, active_listings, sold_transactions, months_inventory) VALUES
-- Toronto
('Toronto', 2024, 1, 11200, 5600, 2.00),
('Toronto', 2024, 2, 11800, 5900, 2.00),
('Toronto', 2024, 3, 12500, 6250, 2.00),
('Toronto', 2024, 4, 13200, 6600, 2.00),
('Toronto', 2024, 5, 14000, 7000, 2.00),
('Toronto', 2024, 6, 14800, 7400, 2.00),
('Toronto', 2024, 7, 15500, 7750, 2.00),
('Toronto', 2024, 8, 14800, 7400, 2.00),
('Toronto', 2024, 9, 14000, 7000, 2.00),
('Toronto', 2024, 10, 13200, 6600, 2.00),
('Toronto', 2024, 11, 12500, 6250, 2.00),
('Toronto', 2024, 12, 11800, 5900, 2.00),
('Toronto', 2025, 1, 11600, 5800, 2.15),
('Toronto', 2025, 2, 12200, 6100, 2.15),
('Toronto', 2025, 3, 12900, 6450, 2.15),
('Toronto', 2025, 4, 13600, 6800, 2.15),
('Toronto', 2025, 5, 14400, 7200, 2.15),
('Toronto', 2025, 6, 15200, 7600, 2.15),
('Toronto', 2025, 7, 15900, 7950, 2.15),
('Toronto', 2025, 8, 15200, 7600, 2.15),
('Toronto', 2025, 9, 14400, 7200, 2.15),
('Toronto', 2025, 10, 13600, 6800, 2.15),
('Toronto', 2025, 11, 12900, 6450, 2.15),
('Toronto', 2025, 12, 12200, 6100, 2.15),
('Toronto', 2026, 1, 12000, 6000, 2.30),
('Toronto', 2026, 2, 12600, 6300, 2.30),
('Toronto', 2026, 3, 13300, 6650, 2.30),
('Toronto', 2026, 4, 14000, 7000, 2.30),
('Toronto', 2026, 5, 14800, 7400, 2.30),
('Toronto', 2026, 6, 15600, 7800, 2.30),
('Toronto', 2026, 7, 16300, 8150, 2.30),
('Toronto', 2026, 8, 15600, 7800, 2.30),
('Toronto', 2026, 9, 14800, 7400, 2.30),
('Toronto', 2026, 10, 14000, 7000, 2.30),
('Toronto', 2026, 11, 13300, 6650, 2.30),
('Toronto', 2026, 12, 12600, 6300, 2.30),

-- Montreal (abbreviated - add other cities similarly)
('Montreal', 2024, 1, 7800, 3900, 2.00),
('Montreal', 2024, 2, 8200, 4100, 2.00),
('Montreal', 2025, 1, 8100, 4050, 2.15),
('Montreal', 2026, 1, 8400, 4200, 2.30),

-- Vancouver
('Vancouver', 2024, 1, 6300, 2520, 2.50),
('Vancouver', 2025, 1, 6500, 2600, 2.65),
('Vancouver', 2026, 1, 6700, 2680, 2.80),

-- Calgary
('Calgary', 2024, 1, 4100, 1640, 2.40),
('Calgary', 2025, 1, 4250, 1700, 2.55),
('Calgary', 2026, 1, 4400, 1760, 2.70),

-- Edmonton
('Edmonton', 2024, 1, 3800, 1520, 3.00),
('Edmonton', 2025, 1, 3950, 1580, 3.15),
('Edmonton', 2026, 1, 4100, 1640, 3.30),

-- Ottawa
('Ottawa', 2024, 1, 3500, 1750, 2.00),
('Ottawa', 2025, 1, 3650, 1825, 2.15),
('Ottawa', 2026, 1, 3800, 1900, 2.30),

-- Winnipeg
('Winnipeg', 2024, 1, 2300, 920, 2.40),
('Winnipeg', 2025, 1, 2400, 960, 2.55),
('Winnipeg', 2026, 1, 2500, 1000, 2.70),

-- Quebec City
('Quebec City', 2024, 1, 2000, 800, 2.33),
('Quebec City', 2025, 1, 2100, 840, 2.48),
('Quebec City', 2026, 1, 2200, 880, 2.63),

-- Hamilton
('Hamilton', 2024, 1, 2700, 1080, 2.33),
('Hamilton', 2025, 1, 2850, 1140, 2.48),
('Hamilton', 2026, 1, 3000, 1200, 2.63),

-- Kitchener
('Kitchener', 2024, 1, 1800, 720, 2.50),
('Kitchener', 2025, 1, 1900, 760, 2.65),
('Kitchener', 2026, 1, 2000, 800, 2.80),

-- London
('London', 2024, 1, 1900, 760, 2.50),
('London', 2025, 1, 2000, 800, 2.65),
('London', 2026, 1, 2100, 840, 2.80),

-- Halifax
('Halifax', 2024, 1, 1300, 520, 2.50),
('Halifax', 2025, 1, 1350, 540, 2.65),
('Halifax', 2026, 1, 1400, 560, 2.80),

-- Saskatoon
('Saskatoon', 2024, 1, 1000, 400, 2.50),
('Saskatoon', 2025, 1, 1050, 420, 2.65),
('Saskatoon', 2026, 1, 1100, 440, 2.80),

-- Regina
('Regina', 2024, 1, 950, 380, 2.50),
('Regina', 2025, 1, 1000, 400, 2.65),
('Regina', 2026, 1, 1050, 420, 2.80),

-- Victoria
('Victoria', 2024, 1, 1250, 500, 2.50),
('Victoria', 2025, 1, 1300, 520, 2.65),
('Victoria', 2026, 1, 1350, 540, 2.80),

-- Windsor
('Windsor', 2024, 1, 900, 360, 2.50),
('Windsor', 2025, 1, 950, 380, 2.65),
('Windsor', 2026, 1, 1000, 400, 2.80),

-- Surrey
('Surrey', 2024, 1, 2200, 880, 2.50),
('Surrey', 2025, 1, 2300, 920, 2.65),
('Surrey', 2026, 1, 2400, 960, 2.80),

-- Laval
('Laval', 2024, 1, 1600, 640, 2.50),
('Laval', 2025, 1, 1700, 680, 2.65),
('Laval', 2026, 1, 1800, 720, 2.80),

-- Brampton
('Brampton', 2024, 1, 2500, 1000, 2.50),
('Brampton', 2025, 1, 2600, 1040, 2.65),
('Brampton', 2026, 1, 2700, 1080, 2.80),

-- Markham
('Markham', 2024, 1, 1700, 680, 2.50),
('Markham', 2025, 1, 1800, 720, 2.65),
('Markham', 2026, 1, 1900, 760, 2.80)

ON CONFLICT (city, year, month) DO UPDATE SET
  active_listings = EXCLUDED.active_listings,
  sold_transactions = EXCLUDED.sold_transactions,
  months_inventory = EXCLUDED.months_inventory;
