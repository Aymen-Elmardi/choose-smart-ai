

# Fix: Insights Search Should Work Across All Categories

## Problem
When a user types a search query (e.g., "rolling") in the Insights search box, results are filtered by **both** the search text AND the active category tab. So if the user is on the "Fees" tab and searches for "rolling reserve", those articles (categorized as `compliance` and `explainer`) are hidden because they don't match the `fees` filter.

## Solution
When a search query is entered, automatically override the category filter to show results from **all** categories. This matches user expectation — typing in a search box should search everything.

## Changes

### `src/pages/Insights.tsx`
- Update `filteredInsights` logic: when `searchQuery` is non-empty, pass `"all"` as the category to `filterInsights` instead of `activeFilter`
- This is a one-line change inside the `useMemo` callback:

```ts
const effectiveFilter = searchQuery.trim() ? "all" : activeFilter;
return filterInsights(allInsights, effectiveFilter, searchQuery);
```

- Optionally: visually indicate that category filter is bypassed during search (e.g., deselect the active tab pill styling when searching), but this is cosmetic and not strictly necessary

