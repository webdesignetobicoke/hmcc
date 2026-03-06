# Absorption Rate Calculator — Next.js Setup

## Project structure

```
absorption-calculator/
├── app/
│   ├── layout.js               ← root layout + fonts
│   ├── globals.css             ← global styles
│   ├── page.js                 ← redirects / → /market
│   ├── market/
│   │   └── page.js             ← calculator page (server component)
│   └── api/market/
│       └── route.js            ← POST/DELETE API route (writes to Supabase)
├── components/
│   └── AbsorptionCalculator.jsx ← main UI (client component)
├── lib/
│   └── supabase.js             ← Supabase client + query helpers
├── supabase-schema.sql         ← run this in Supabase SQL Editor
├── .env.local.example          ← copy to .env.local
└── package.json
```

---

## Quickstart

### 1. Create the Next.js app and copy files

```bash
npx create-next-app@latest absorption-calculator --app --no-typescript --no-eslint
cd absorption-calculator
```

Copy all files from this folder into the project, replacing defaults.

### 2. Install dependencies

```bash
npm install @supabase/supabase-js recharts
```

### 3. Set up Supabase

1. Go to https://supabase.com → create a free project
2. In the dashboard go to **SQL Editor**
3. Paste `supabase-schema.sql` and click **Run**
4. Go to **Settings → API** and copy your keys

### 4. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Run it

```bash
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/market`.

---

## How to add data

Click **"+ Add Data"** in the top right of the calculator.

Fill in:
- City name (type a new one or pick an existing one)
- Month + Year
- Active Listings
- Closed Sales

Hit **Save Entry**. The calculator instantly shows a live preview of the
months-of-inventory before you save. Once saved, select the city from the
dropdown to see all its data visualized.

---

## How data flows

```
You enter data via the form
        ↓  POST /api/market
Supabase market_data table
        ↓  market_summary view (calculates months_of_inventory)
Next.js server component fetches city list
        ↓
AbsorptionCalculator client component
        ↓  fetches data when city is selected
Chart + Table + Verdicts + Trend indicators
        ↓
Your clients see the dashboard at /market
```

---

## Deploying to Vercel (free)

```bash
npm install -g vercel
vercel
```

Add your three env vars in the Vercel dashboard under **Settings → Environment Variables**.
