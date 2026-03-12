

# Code Cleanup & CTA Verification

## Dead Code to Remove

### 1. `src/components/QuizSidebar.tsx` — Delete file
No longer imported anywhere after the sidebar was removed from Quiz.tsx.

### 2. `src/components/LeadCaptureForm.tsx` — Delete file
Not imported anywhere in the codebase. The Recommendation page now has its own inline form. (269 lines removed)

### 3. `src/pages/Recommendation.tsx` — Remove unused variables
- **`alternatives`** state + setter: stored but never rendered (the "Also Compatible" section was removed)
- **`riskConfidence`** state + setter: stored but never displayed
- **`reserveProbability`** state + setter: stored but never displayed
- **`profileData`** (line 231): assigned but never used
- **`cn`** import: not used in this file
- **`initializeSessionTracking`** import from `useEnrichmentData`: verify if still needed or redundant with session tracking elsewhere

### 4. `src/pages/Quiz.tsx` — Remove unused import
- **`CreditCard`** import from lucide-react: only used inside `QuizHeader` which uses it, so keep. Actually need to verify all lucide imports are used.

## CTA Verification Results

All CTAs resolve correctly:
- **"How It Works"** → `/#how-it-works` → `HowItWorksSection` has `id="how-it-works"` ✓
- **"Why Us"** → `/#why-us` → `ValuePropsSection` has `id="why-us"` ✓
- **Assessment CTAs** across ~52 files all link to `/assessment` or `/assessment?start=true` → Quiz.tsx route ✓
- **"Partner With Us"** → `/onboard-with-us` → route exists ✓
- **"Back to Home"** on Recommendation page → `href="/"` ✓
- **"Retake assessment"** → `href="/assessment?start=true"` ✓
- **Form submit** → calls `send-lead-email` edge function ✓

No broken CTA links found.

## Files to Edit
| File | Action |
|------|--------|
| `src/components/QuizSidebar.tsx` | Delete |
| `src/components/LeadCaptureForm.tsx` | Delete |
| `src/pages/Recommendation.tsx` | Remove `alternatives`, `riskConfidence`, `reserveProbability`, `profileData`, unused imports |

