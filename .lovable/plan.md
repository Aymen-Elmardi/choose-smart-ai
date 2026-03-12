

# Assessment Flow & Recommendation Page Redesign

## Changes

### 1. Remove sidebar from Assessment (Quiz.tsx)
- Remove the `QuizSidebar` component and `useIsMobile` import
- Always show the horizontal progress bar (remove `hideProgressBar` logic)
- The quiz becomes a clean, centered single-column layout on all viewports

### 2. Redesign Recommendation page (Recommendation.tsx)
Restructure the page into 4 clearly prioritized sections with distinct visual weight:

**Section 1 — Your Business Profile (HIGHLIGHTED)**
- Full-width card with a bold header and prominent styling (primary border/accent)
- Grid layout showing: Sales Channel, Business Type, Industry, Monthly Volume, Avg Transaction, Location, Priorities, Delivery Timeline, Previous Restrictions
- This is the hero of the page — larger text, colored border, slight background tint

**Section 2 — Recommended Provider (SUBDUED)**
- Single best-fit provider only (remove "Also Compatible" section entirely)
- Styled with a lighter, less prominent card — no green left border, muted tones
- Show provider name, description, and match reasons

**Section 3 — Providers to Avoid (HIGHLIGHTED)**
- Show exactly 2 providers (`.slice(0, 2)`)
- Clear visual treatment with warning styling — keep the existing muted/caution design but make it more prominent with a visible header

**Section 4 — Contact Form (PAGE HIGHLIGHT)**
- New intro copy: "Want a warm introduction to [provider name]? Leave your details below and we'll connect you directly."
- Visually elevated: primary-colored border, slight background tint, larger card
- Keep existing form fields (Name, Email, Company, Notes)
- Update button text to "Request Introduction"

Remove the risk indicator badges (Risk Confidence / Funds Hold Risk) from the user-facing page — these are internal scoring details.

### Files to edit
- `src/pages/Quiz.tsx` — remove sidebar, always show progress bar
- `src/pages/Recommendation.tsx` — full restructure per above
- `src/components/QuizSidebar.tsx` — no changes needed (just unused)

