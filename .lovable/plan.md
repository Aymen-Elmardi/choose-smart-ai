

# ChosePayments Strategic Enhancement Plan

## Overview
Three changes in one pass: updated homepage messaging, enhanced lead form, and a Risk Alignment Score on the recommendation page.

---

## 1. Homepage Headline Update (`src/components/HeroSection.tsx`)

**Current**: "Choose the Right Payment Provider for Your Risk Profile"

**New**:
- H1: "The Pre-Underwriting Layer for High-Growth Merchants."
- Sub-headline: "We align your industry, volume, and risk signals with the right provider's appetite — before you apply."
- Keep existing CTA button ("Run My Risk Profile") and secondary link unchanged

---

## 2. Risk Alignment Score (`src/pages/Recommendation.tsx`)

Add a visual percentage match score between the Business Profile card and the Recommended Provider card.

**How it works**:
- The server already returns a numeric score from `scoreProviders()` (base 50 + up to ~85 points)
- Expose the best match score in the edge function response (add `matchScore` to the `bestMatch` object)
- On the client, normalize the raw score to a 0-100% display range (e.g., `Math.min(Math.round((rawScore / 130) * 100), 99)`)
- Display as a large circular or badge element: "94% Risk Alignment"

**Edge function change** (`supabase/functions/quiz-recommendation/index.ts`):
- Add `score` field to `bestMatch` in the response (line ~350): `score: bestMatch.score`

**Client changes** (`src/pages/Recommendation.tsx`):
- Update `Provider` type usage to include optional `score` field
- Add `fetchServerRecommendation` to pass through the score
- Render a prominent score badge above the provider card

**Service layer** (`src/lib/quizRecommendationService.ts`):
- Pass through `matchScore` from server response to the `Provider` object

---

## 3. Enhanced Lead Form (`src/pages/Recommendation.tsx`)

Add three new fields to the "Request Introduction" form to create a richer lead dossier:

| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Website URL | url input | No | "https://yoursite.com" |
| Current Provider | text input | No | "e.g. Stripe, PayPal, none" |
| Pain Points | textarea | No | "e.g. High chargebacks, poor support, account frozen" |

**Form state**: Add `websiteUrl`, `currentProvider`, `painPoints` to `formData` state object.

**Payload**: Include all three new fields in the `send-lead-email` payload so the advisory team receives them.

**Edge function** (`supabase/functions/send-lead-email/index.ts`): Accept and include the three new fields in the email body. No validation changes needed since these are optional free-text fields.

---

## Files to Edit

| File | Change |
|------|--------|
| `src/components/HeroSection.tsx` | Update H1 and sub-headline copy |
| `supabase/functions/quiz-recommendation/index.ts` | Add `score` to bestMatch response |
| `src/lib/quizRecommendationService.ts` | Pass through `matchScore` from server |
| `src/pages/Recommendation.tsx` | Add Risk Alignment Score display + 3 new form fields |
| `supabase/functions/send-lead-email/index.ts` | Accept new form fields in email body |

