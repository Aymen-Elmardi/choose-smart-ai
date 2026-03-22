

# Recommendation Page Enhancements + Newsletter Signup

## Overview
Four changes: (1) restructure the recommendation page to show a lightweight email capture first, then the introduction form as secondary, (2) enhance the post-submission confirmation with personalized detail, (3) add a Calendly booking link, (4) add newsletter signup to the footer.

## Changes

### 1. Recommendation Page: Two-Step Form Flow (`src/pages/Recommendation.tsx`)

**Current**: After results load, one large "Request Introduction" form with many fields.

**New flow**:
- After results load, show a lightweight "Get personalized guidance" card with only Name + Email fields
- On submit of this first form, show a detailed confirmation message:
  - "Thanks! Our founder will review your profile and email you within 24 hours with personalized guidance and a warm introduction to [Provider Name]."
  - "You'll receive an email at [email] with: Your full risk analysis, Why [Provider] is a fit for your business, Direct introduction to [Provider]'s partnership team, Next steps to get approved"
- Below the confirmation, show the full "Request Introduction" form (website, current provider, pain points, notes) as a secondary/optional action: "Want to speed things up? Share more details for a faster introduction."
- Add a Calendly link at the bottom: "Prefer to talk? Book a 30 minute call" linking to `https://calendly.com/hello-chosepayments/30min`

**State changes**: Add `guidanceSubmitted` boolean state. The lightweight form triggers the same edge function calls. The full form becomes visible only after the first submission.

### 2. Post-Submission Confirmation Enhancement (`src/pages/Recommendation.tsx`)

Update the existing `isSubmitted` confirmation card to show:
- Personalized message with provider name and email address
- Bullet list of what they'll receive
- Calendly booking link as secondary CTA

### 3. Newsletter Signup in Footer (`src/components/Footer.tsx`)

Add a newsletter section above the existing footer content:
- Headline: "Stay updated on payment processor trends and tips for high growth merchants"
- Email input + "Subscribe" button in a single row
- Store submissions in the `popup_submissions` table (reuse existing table with `popup_type: 'newsletter'`)
- Show a simple "Thanks! You're subscribed." confirmation on submit

### 4. Calendly Link (`src/pages/Recommendation.tsx`)

Add below the retake assessment link:
- Calendar icon + "Prefer to talk? Book a 30 minute call" linking to the Calendly URL
- Opens in new tab

### Files
- **Edit**: `src/pages/Recommendation.tsx` (two-step form, enhanced confirmation, Calendly)
- **Edit**: `src/components/Footer.tsx` (newsletter signup)

