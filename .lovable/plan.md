

# Contextual In-Article Assessment CTAs

## Problem
Articles only have a generic "Run My Risk Profile" CTA at the very bottom. Readers who don't scroll that far never see it. Contextual, topic-relevant prompts within the article body would convert better.

## Approach

### 1. Create `src/components/InlineAssessmentCTA.tsx`
A compact, reusable inline CTA component that sits within article content. Takes a `context` prop for the contextual message and an optional `cta` prop for button text.

- Styled as a subtle card: `bg-primary/5 border border-primary/15 rounded-lg p-5`
- Contextual line (e.g., "See which providers have better chargeback policies for your industry")
- Small CTA button: "Get your risk profile →" linking to `/assessment`
- Trust line: "2 minutes. Free. No sales calls."
- Visually distinct from article body but not intrusive

### 2. Add contextual CTAs to key articles
Insert 1-2 `InlineAssessmentCTA` placements at natural breakpoints in the highest-value articles:

- **StripeFees.tsx**: After Connect fees section and after chargeback fees section
- **WhyStripeFreezes.tsx**: After triggers explanation
- **AdyenFees.tsx**: After pricing tiers
- **CheckoutComFees.tsx**: After fee breakdown
- **PayPalFees.tsx**: After hidden fees section
- **FiservCloverFees.tsx**: After pricing section
- **Chargebacks.tsx**: After impact explanation
- **WhyAccountsFrozenWithoutWarning.tsx**: After causes
- **WhatToDoWhenFundsHeld.tsx**: After action steps
- **RollingVsFixedReserve.tsx**: After comparison
- **PayoutSettlementExplained.tsx**: After reconciliation section
- **StripePaymentPlatform.tsx**, **AdyenEnterprisePlatform.tsx**, **CheckoutComEnterprisePlatform.tsx**: After platform overview

Each gets a unique contextual message relevant to what the reader just learned.

### 3. Auto-inject a mid-position CTA for all other articles
In `InsightsArticleLayout.tsx`, add a secondary compact CTA between the article actions and sources sections. This ensures every article (even those without manual inline CTAs) has a contextual prompt before the reader reaches the bottom.

Text: "Wondering if your current provider is the right fit? See how your business matches against 21 providers."

### Files
- **Create**: `src/components/InlineAssessmentCTA.tsx`
- **Edit**: `src/components/InsightsArticleLayout.tsx` (add auto mid-article CTA)
- **Edit**: ~15 article files (add manual contextual CTAs at key content breakpoints)

