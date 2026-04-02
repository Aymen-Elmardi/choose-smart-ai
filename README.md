# ChooseSmartAI — Payment Provider Recommendation Engine

A React + TypeScript web app that helps UK and US businesses find the optimal payment provider through an intelligent quiz and scoring engine. Deployed at **chosepayments.co.uk**.

## What it does

1. Users complete a 9-question quiz (sales channel, business type, location, monthly volume, priorities)
2. A scoring algorithm eliminates incompatible providers and ranks the rest
3. The top recommendation + 2 alternatives are returned, with lead capture

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS, shadcn/ui |
| Routing | React Router v7 |
| Backend | Supabase Edge Functions |
| Email | Resend API |
| Fonts | DM Sans |

## Getting Started

```sh
# Clone the repo
git clone https://github.com/AymenElmardi/choose-smart-ai.git
cd choose-smart-ai

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
RESEND_API_KEY=your_resend_key
```

## Project Structure

```
src/
├── pages/          # Route-level components (Quiz, Recommendation, Insights, etc.)
├── components/     # Reusable UI components
├── lib/            # Client-side recommendation fallback logic
└── hooks/          # SEO, enrichment data, and other hooks

docs/
└── PRD.md          # Full product requirements and scoring algorithm spec
```

## Key Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | UK Homepage |
| `/us` | US Homepage |
| `/quiz` | Payment provider quiz |
| `/insights` | Content hub |
| `/stripe-alternatives` | Comparison landing pages |
| `/best-payment-processor-uk` | SEO landing page |

## Recommendation Algorithm

Providers are scored in two steps:

1. **Hard Elimination** — removes providers that don't support the required payment type, region, or industry risk level
2. **Scoring** — surviving providers are scored on business model fit, channel fit, volume alignment, priority match, and risk comfort

See [`docs/PRD.md`](docs/PRD.md) for the full algorithm spec and provider registry.

## Scripts

```sh
npm run dev        # Start development server
npm run build      # Production build
npm run lint       # Run ESLint
npm run preview    # Preview production build
```
