

# Streamline Website: Remove Strategy Review, Unify CTAs, Show Recommendations

## What's changing

The site currently has competing CTAs ("Book a Payment Strategy Review", "Get Direct Help", "Run My Risk Profile") and references to a service model ("Payment Strategy Review") that conflicts with the risk-profile engine. This plan unifies everything around one clear flow: **Run My Risk Profile → Assessment → See Results + Submit Details**.

---

## Changes by file

### 1. Header — Remove green "Book" button, update mobile CTA
**`src/components/Header.tsx`**
- Remove the `Button variant="hero"` linking to "Book a Payment Strategy Review" (desktop nav, lines 42-46)
- Remove the mobile equivalent "Book a Strategy Review" button (lines 80-84)
- Keep the "Partner With Us" link as-is

### 2. HowItWorksSection — Rewrite for risk profile flow
**`src/components/HowItWorksSection.tsx`**
- Change heading from "How the Payment Strategy Review Works" to "How It Works"
- Rewrite 3 steps:
  1. "Enter Your Business Details" — answer a short assessment about your model, volume, and industry
  2. "We Calculate Your Risk Profile" — our engine scores providers against your risk signals
  3. "See Your Provider Match" — view which providers fit, which are acceptable, and which to avoid

### 3. SuccessPreviewSection — Rewrite for engine output
**`src/components/SuccessPreviewSection.tsx`**
- Change heading from "What the Payment Strategy Review Includes" to "What Your Risk Profile Reveals"
- Change subtitle from "A fixed-scope, fee-based engagement..." to "Based on your business profile, we show you:"
- Replace 5 deliverables with engine-aligned items:
  1. Best Fit Provider — the provider most aligned to your risk profile
  2. Acceptable Alternatives — providers that can work but may have trade-offs
  3. Providers to Avoid — and exactly why they don't fit
  4. Reserve Risk Indicator — likelihood of holds on your funds
  5. Risk Confidence Level — how strong the match signal is

### 4. CTASection — Update copy
**`src/components/CTASection.tsx`**
- Change heading from "Still Stuck? Get Direct Help." to "Not Sure Which Provider Fits?"
- Change body text to "Find out which providers match your business and which ones to avoid."
- Change button text from "Get Direct Help" to "Run My Risk Profile"

### 5. Footer — Remove "Payment Strategy Advisory"
**`src/components/Footer.tsx`**
- Change "Payment Strategy Advisory" to "Independent Payment Risk Analysis"

### 6. About page — Update heading
**`src/pages/About.tsx`**
- Line 22: Change "The Missing Layer in Payment Strategy" to "The Missing Layer in Payment Risk"
- Line 9: Remove "payment strategy" from keywords, replace with "payment risk analysis"

### 7. Recommendation page — Show tiered results above the form
**`src/pages/Recommendation.tsx`**
This is the key UX change. Currently this page only shows a contact form after the quiz. It needs to:
- Call `fetchServerRecommendation` on mount with stored answers
- Display the tiered result (Best Fit / Acceptable / Avoid) with risk confidence and reserve probability
- Show the contact form **below** the results, framed as "Want us to follow up with next steps?"
- The results become the value; the form becomes the conversion

### 8. Prerender metadata
**`supabase/functions/prerender/index.ts`**
- Update the `/` route title from "Payment Strategy Review for High-Volume Merchants" to "Payment Provider Risk Profile | ChosePayments"

### 9. ExampleOutputPreview — Already exists, no changes needed

---

## Files changed summary

| File | Change |
|------|--------|
| `src/components/Header.tsx` | Remove green "Book" button (desktop + mobile) |
| `src/components/HowItWorksSection.tsx` | Rewrite heading + 3 steps for risk profile flow |
| `src/components/SuccessPreviewSection.tsx` | Rewrite heading + deliverables for engine output |
| `src/components/CTASection.tsx` | Update heading, body, button text |
| `src/components/Footer.tsx` | Replace "Payment Strategy Advisory" |
| `src/pages/About.tsx` | Update heading + keywords |
| `src/pages/Recommendation.tsx` | Add tiered result display above contact form |
| `supabase/functions/prerender/index.ts` | Update homepage meta title |

