

# Remove Stripe from Provider Options + Fix Adyen Volume Bug

## Problem 1: Stripe in provider options
Stripe appears in:
- `src/lib/scoringData.ts` (client-side scoring visualization)
- `supabase/functions/quiz-recommendation/index.ts` (server-side engine)
- `src/pages/Recommendation.tsx` (CURATED_PROVIDERS list + "current provider" dropdown)
- `src/components/ProviderLogosSection.tsx` (homepage logos)

**Action**: Remove the Stripe entry from all four locations.

## Problem 2: Adyen incorrectly eliminated for "low volume" at £50k+
**Root cause**: The quiz answer mapper (`quizAnswerMappers.ts`) converts "£50k+" → `"£50k–100k"` (with `£` sign and en-dash `–`). But the edge function's `parseMonthlyVolume` expects keys like `"50k-100k"` (no `£`, regular hyphen). The mapped string doesn't match any key, so it **falls back to 10,000** — below Adyen's 50,000 minimum threshold.

**Fix**: Update `parseMonthlyVolume` in the edge function to also recognize the `£`-prefixed, en-dash versions that the mapper actually sends. Add these keys to the volume map:
- `"< £5k"` → 2500
- `"£5k–20k"` → 12500  
- `"£20k–50k"` → 35000
- `"£50k–100k"` → 75000

This ensures all volume strings from the mapper are correctly parsed.

## Changes

### 1. `supabase/functions/quiz-recommendation/index.ts`
- Remove Stripe from `PROVIDER_REGISTRY`
- Add `£`-prefixed volume keys to `parseMonthlyVolume` map

### 2. `src/lib/scoringData.ts`
- Remove Stripe from `PROVIDER_REGISTRY`

### 3. `src/pages/Recommendation.tsx`
- Remove "Stripe" from `CURATED_PROVIDERS` array
- Remove "Stripe" from the current provider `<SelectItem>` dropdown

### 4. `src/components/ProviderLogosSection.tsx`
- Remove "Stripe" from the providers array

