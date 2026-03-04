

# Provider Scoring Logic Flowchart Page

## What We're Building
A new page at `/insights/scoring-logic` (or similar) that visually maps out how the recommendation engine decides which payment provider to suggest. This is an interactive, educational flowchart showing the full pipeline: quiz inputs, hard elimination, scoring dimensions, and final ranking.

## Page Structure

### Section 1: Header
Title: "How We Match You to a Provider"
Subtitle: "The scoring logic behind every recommendation -- no black boxes."

### Section 2: Pipeline Overview (Interactive SVG Flowchart)
A top-to-bottom flow showing the 3 stages:

```text
+---------------------+
|   Quiz Answers In    |
| (channel, type,      |
|  volume, priority)   |
+----------+----------+
           |
           v
+----------+----------+
|  STAGE 1: ELIMINATE  |
|  Hard disqualifiers  |
+----------+----------+
           |
           v
+----------+----------+
|  STAGE 2: SCORE      |
|  Multi-axis points   |
+----------+----------+
           |
           v
+----------+----------+
|  STAGE 3: RANK       |
|  Top 1 + 2 alts      |
+---------------------+
```

### Section 3: Hard Elimination Rules (Expandable Cards)
Visual cards for each elimination rule, sourced directly from the edge function logic:
- Missing payment type (online/in-person/marketplace/subscriptions)
- Region mismatch (UK/EU/both)
- Volume below provider minimum
- Industry exclusion list match
- Red risk appetite for industry
- Marketplace required but not supported

Each card shows the rule, an example, and which providers it typically eliminates.

### Section 4: Scoring Dimensions (Interactive Breakdown)
Show the 6 scoring axes as a visual breakdown, with point values:

| Dimension | Max Points | Logic |
|-----------|-----------|-------|
| Base Score | 50 | Every surviving provider starts here |
| Risk Fit | +20 | Green = +20, Amber = +5 |
| Volume Alignment | +15 | Enterprise match or low-volume match |
| Priority Match | +10 each | low-fees, fast-setup, international, developer-friendly |
| Feature Fit | +15 | Subscriptions (+10), split payments (+15), in-person (+10) |
| Channel Match | +10 | In-person channel + in-person strength |

### Section 5: Provider Registry Matrix
An interactive table showing all 22 providers with columns for:
- Payment types supported
- Terminal support
- Marketplace capability
- Regions
- Minimum volume
- Key strengths

Users can filter/sort to see which providers survive for different profiles.

### Section 6: Risk Appetite Heatmap
A grid showing every provider vs every industry category, color-coded green/amber/red. This is the "matrix" view of provider internal logic.

### Section 7: Example Walkthrough
An animated or step-by-step walkthrough using a sample quiz answer set, showing:
1. Which providers get eliminated (and why)
2. How remaining providers score on each axis
3. The final ranking with point totals

## Technical Approach

### Files to Create
1. **`src/pages/ScoringLogic.tsx`** -- Main page component with all sections
2. **`src/components/ScoringFlowchart.tsx`** -- SVG pipeline visualization
3. **`src/components/RiskHeatmap.tsx`** -- Provider vs industry heatmap grid
4. **`src/components/ScoringWalkthrough.tsx`** -- Interactive example walkthrough

### Files to Modify
1. **`src/App.tsx`** -- Add route `/insights/scoring-logic`

### Data Source
All data comes directly from the provider registry and scoring logic already defined in `supabase/functions/quiz-recommendation/index.ts`. We'll extract the provider configs and scoring rules into a shared data structure rendered on the page. No backend calls needed -- this is a static educational page.

### Design Approach
- Follows existing InsightsGraph page patterns (Header/Footer, card-based layout, SVG visualizations)
- Uses existing Tailwind design tokens and shadcn/ui components (Table, Card, Tabs)
- Color-coded by risk level: green (#22c55e), amber (#f59e0b), red (#ef4444)
- Responsive -- table scrolls horizontally on mobile, flowchart stacks vertically

