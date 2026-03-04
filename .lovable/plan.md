

# Engine Overhaul: Tiered Output, Rebalanced Scoring, Homepage Integration

## Summary

12 changes across the backend engine, frontend data layer, scoring transparency page, homepage, and article CTAs. Broken into 3 implementation batches.

---

## Batch 1: Backend Engine Rebalancing + New Output Model

**File: `supabase/functions/quiz-recommendation/index.ts`**

### 1. Rebalance scoring weights in `scoreProviders`
- Risk Fit: Green +40 (was +20), Amber +10 (was +5)
- Priority Match: +5 each, cap +20 (was +10 each, uncapped)
- Volume: 5-tier system replacing binary low/enterprise check

### 2. Capture elimination reasons in `applyHardElimination`
Change from silent `filter()` to collecting `{ provider, reason }` for each eliminated provider. Return both surviving providers and eliminated-with-reasons list.

### 3. Add `riskConfidence` and `reserveProbability` to output
Computed after scoring:
- **riskConfidence**: High (green risk + volume aligned), Medium (amber risk or volume mismatch), Low (fallback triggered / <3 survivors)
- **reserveProbability**: Low (green + aligned volume), Moderate (amber risk), Elevated (amber + high-risk industry signals)

### 4. Restructure `RecommendationResult` output
```text
{
  bestMatch: { name, description, reasons },
  acceptable: [{ name, description, reasons }],
  avoid: [{ name, reason }],
  riskConfidence: "high" | "medium" | "low",
  reserveProbability: "low" | "moderate" | "elevated"
}
```

### 5. Expand industry risk appetite maps
Add 5 industries across all 21 providers: `subscription-ecommerce`, `food-delivery`, `ticketing`, `education`, `gaming` (non-gambling).

### 6. Add `fast-settlement` priority
Map to providers with `fast-settlement` strength (Dojo, Revolut Business).

---

## Batch 2: Frontend Data Sync + Scoring Page Redesign

**File: `src/lib/scoringData.ts`**
- Mirror all weight changes, new industries, new volume tiers
- Update `SCORING_DIMENSIONS` table with new values
- Add `SAMPLE_WALKTHROUGH` that demonstrates the avoid tier

**File: `src/lib/quizRecommendationService.ts`**
- Update `ServerRecommendation` interface to match new output shape (bestMatch, acceptable, avoid, riskConfidence, reserveProbability)
- Map new response to existing `Provider` type for backward compatibility on Recommendation page

**File: `src/pages/ScoringLogic.tsx`**
Rewrite section headings to be product-oriented:
- "How We Match You to a Provider" (keep)
- "Your Risk Profile" (new section explaining riskConfidence + reserveProbability)
- "Why Some Providers Are Avoided" (new section showing avoid logic)
- Update scoring dimensions table with new weights

**File: `src/components/ScoringWalkthrough.tsx`**
- Add "Eliminated" step showing avoid providers with reasons
- Add risk confidence and reserve probability to the final output display

---

## Batch 3: Homepage + Article CTA Integration

**File: `src/components/HeroSection.tsx`**
- Change CTA text to "Run My Risk Profile"
- Link to `/assessment` instead of `#diagnostic`
- Keep secondary link to `/insights`

**File: `src/pages/Index.tsx`**
- Add new `ExampleOutputPreview` component between DiagnosticBlock and HowPaymentsWorkSection
- Static card showing a sample result with Best Fit / Acceptable / Avoid / Reserve Risk

**File: `src/components/ExampleOutputPreview.tsx`** (new)
- Hardcoded sample: UK SaaS, £120k/month
- Shows: Best Fit (Checkout.com), Acceptable (Stripe, Adyen), Avoid (Square), Reserve Risk: Low
- CTA button: "Run My Risk Profile"

**File: `src/components/InsightsCTA.tsx`**
- Add contextual line above existing CTA: "Most payment problems happen because the provider wasn't a good risk fit."
- Change button text to "Run My Risk Profile"

---

## Files Changed Summary

| File | Action |
|------|--------|
| `supabase/functions/quiz-recommendation/index.ts` | Rebalance weights, add avoid tier, risk confidence, reserve probability, new industries |
| `src/lib/scoringData.ts` | Mirror all engine changes |
| `src/lib/quizRecommendationService.ts` | Update response interface |
| `src/pages/ScoringLogic.tsx` | Add risk/reserve/avoid sections, update weights |
| `src/components/ScoringWalkthrough.tsx` | Show avoid + new indicators |
| `src/components/HeroSection.tsx` | New CTA text + link |
| `src/pages/Index.tsx` | Add ExampleOutputPreview section |
| `src/components/ExampleOutputPreview.tsx` | New component |
| `src/components/InsightsCTA.tsx` | Updated copy + CTA text |

