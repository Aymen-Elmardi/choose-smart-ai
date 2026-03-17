

# Homepage Improvements: Emotional Hero, Interactive Diagnostics, Social Proof, Stronger Secondary CTA

## Changes

### 1. HeroSection.tsx: Rewrite headline and secondary link

- **Headline**: Change from "The Pre-Underwriting Layer for High-Growth Merchants." to "Find the Payment Processor That Won't Freeze Your Account."
- **Subhead**: Replace em dash with a period. New copy: "We match your industry, volume, and risk signals to the right provider's appetite. Before you apply."
- **Secondary link**: Replace "Just want to understand? Start here →" with "See how it works in 60 seconds" linking to `/risk-profile-matching`

### 2. DiagnosticBlock.tsx: More interactive cards, dynamic CTA, social proof

- **Card hover/interaction**: Add `cursor-pointer`, stronger hover scale (`hover:scale-[1.03]`), `shadow-md` on hover, and a subtle ring effect on selected state for a more button-like feel
- **Dynamic CTA text**: When one item is selected, show "Show Me What This Means for [label]" (e.g., "Show Me What This Means for Funds on Hold"). When multiple are selected, keep the generic "Show Me What This Means"
- **Social proof line**: Add a single trust line below the CTA: "Trusted by 50+ merchants across the UK and EU" in muted text with a small shield or check icon

### Files modified
- `src/components/HeroSection.tsx`
- `src/components/DiagnosticBlock.tsx`

