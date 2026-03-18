

# SEO Metadata & Minor UI Updates

## Changes

### 1. Homepage SEO (`src/pages/Index.tsx`)
Update `useSEO` title to `"Find the Payment Processor That Won't Freeze Your Account | ChosePayments"` and description to the provided text.

### 2. Fiserv/Clover SEO (`src/pages/insights/FiservCloverFees.tsx`)
Update the `title` prop on `InsightsArticleLayout` to `"Fiserv Clover Review: Is It Right for Your Business Risk Profile?"` and `description` to the provided text. (Route: `/insights/fiserv-clover-pricing-explained`)

### 3. Stripe Fees SEO (`src/pages/insights/StripeFees.tsx`)
Update the `title` prop on `InsightsArticleLayout` to `"Stripe Fees Explained: What High-Growth Merchants Actually Pay"` and `description` to the provided text. (Route: `/insights/stripe-fees-explained`)

### 4. Diagnostic card tap targets (`src/components/DiagnosticBlock.tsx`)
Add `min-h-[48px]` (or `min-h-12`) to the diagnostic card buttons to meet the 48px mobile tap target minimum. Current padding (`p-5`) likely meets this on desktop but the 2-column mobile grid can compress them.

### 5. Trust signal below hero CTA (`src/components/HeroSection.tsx`)
The trust line already exists at line 32-34 but is placed **after** the "See how it works" link. Move it directly below the CTA button (before the "See how it works" link) so it sits immediately under "Run My Risk Profile". The text is already correct: "Independent. Free for merchants. Trusted by businesses across the UK and EU."

