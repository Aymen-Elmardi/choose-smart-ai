

# Fix How It Works, Redesign Risk Report, Improve Diagnostic UX

## 3 problems to solve

1. **"How It Works" nav link** scrolls to `/#how-it-works` but the `HowItWorksSection` is not on the homepage (it exists as a component but is not imported into Index.tsx). Need to add it.

2. **Risk report (Recommendation page)** is visually flat and doesn't reflect the user's own inputs. It should show a "Your Business Profile" summary card with the details they entered (industry, volume, sales channel, location, etc.) above the provider results. Currently, `prepareEngineAnswers` strips out rich fields like `industry`, `deliveryTimeline`, `previousRestriction` before saving to sessionStorage — we need to store the full raw answers alongside the engine answers.

3. **Diagnostic block** ("What's Happening to You Right Now?") uses plain text buttons with checkbox characters (☐/✓). Needs better visual treatment with icons and cards.

---

## Changes

### 1. Store full quiz answers for the report
**`src/pages/Quiz.tsx`** — In both `advanceToNext` and `handleDropdownSelect`, also store the raw (unmapped) answers:
```
sessionStorage.setItem("quizAnswersRaw", JSON.stringify(updatedAnswers));
```
This preserves industry label, delivery timeline, previous restriction, etc.

### 2. Add HowItWorksSection to the homepage
**`src/pages/Index.tsx`** — Import and add `HowItWorksSection` between `ExampleOutputPreview` and `HowPaymentsWorkSection` inside the Suspense block.

### 3. Redesign Recommendation page with business profile summary
**`src/pages/Recommendation.tsx`** — Major visual overhaul:

- Read `quizAnswersRaw` from sessionStorage on mount
- Add a **"Your Business Profile"** card at the top showing:
  - Sales channel, business type, industry (resolved from INDUSTRY_OPTIONS label), monthly volume, avg transaction, delivery timeline, location, priorities (as tags)
  - Displayed as a clean 2-column grid of label/value pairs
- Restructure the results into a cleaner card layout:
  - Risk Confidence and Funds Hold Risk as colored badges inline (not full-width cards)
  - Best Fit provider in a prominent card with a subtle green left border
  - Also Compatible as a simpler row beneath
  - "Not Suited" section with muted, compact rows
- Overall: tighter spacing, better visual hierarchy, more polished

### 4. Redesign DiagnosticBlock
**`src/components/DiagnosticBlock.tsx`** — Replace plain text buttons with icon-based cards:
- Use Lucide icons for each problem (ShieldOff for funds held, Landmark for reserves, Receipt for fees, Scale for chargebacks, Wallet for payout mismatch)
- 2-column grid on mobile, single row on desktop
- Card-style with border, icon, and short label
- Selected state uses primary border + subtle bg fill
- Remove the checkbox characters

---

## Files changed

| File | Change |
|------|--------|
| `src/pages/Quiz.tsx` | Store raw answers in sessionStorage |
| `src/pages/Index.tsx` | Add HowItWorksSection to homepage |
| `src/pages/Recommendation.tsx` | Add business profile summary, redesign results layout |
| `src/components/DiagnosticBlock.tsx` | Redesign with icon cards and grid layout |

