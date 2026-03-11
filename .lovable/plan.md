

# Desktop Assessment Layout: Sidebar Progress Tracker

## Overview
Add a left sidebar on desktop (≥768px) showing all quiz steps with completion status. Mobile stays unchanged.

## Layout

```text
┌──────────────────────────────────────────────────┐
│  Header (Back / Exit / Progress bar)             │
├────────────┬─────────────────────────────────────┤
│            │                                     │
│  SIDEBAR   │     QUESTION AREA                   │
│  (desktop) │     (current question + options)    │
│            │                                     │
│  ✓ Q1      │                                     │
│  ✓ Q2      │                                     │
│  → Q3 ●    │                                     │
│  ○ Q4      │                                     │
│  ○ Q5      │                                     │
│  ...       │                                     │
│            │                                     │
├────────────┴─────────────────────────────────────┤
```

- **Completed**: Green tick icon, muted text
- **Current**: Primary-colored dot/highlight, bold text
- **Incomplete/remaining**: Soft red/rose circle outline (e.g. `text-rose-400/50`, `border-rose-300/40`)

## Changes

### `src/pages/Quiz.tsx`
- Import `useIsMobile` from `@/hooks/use-mobile`
- On desktop: wrap the main content in a flex row — left sidebar (w-64, border-right) + right content area (flex-1, centered)
- Sidebar renders all `questions` from `getQuestions(answers)` as a vertical list:
  - Each item shows a short label (the question's `question` text, truncated) and a status icon
  - Completed = `Check` icon in green circle; Incomplete = empty circle with `border-rose-300/40 bg-rose-50`; Current = primary ring
  - Clicking a completed step navigates back to it (`setCurrentStep`)
- On mobile (`useIsMobile()`): render the existing layout unchanged (no sidebar)
- Remove the top progress bar on desktop since the sidebar replaces it; keep it on mobile

### No other files changed.

