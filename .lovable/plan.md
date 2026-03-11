

# Performance Investigation: Site Feels Slow

## Findings

After reviewing the codebase thoroughly, the site architecture is already well-optimized:
- ~90 routes are lazy-loaded with `React.lazy`
- Homepage sections below the fold are lazy-loaded
- Vendor chunking is in place (react-vendor, router)
- CSS minification is enabled
- Static assets have 1-year immutable caching

The perceived slowness is most likely caused by the **Lovable preview environment** itself (the preview iframe adds latency that won't exist in production). However, there are a few real optimizations worth making:

## Identified Issues

1. **`useIsMobile` causes a flash/re-render**: It initializes as `undefined`, then updates to `true/false` after the effect runs. On the Quiz page, this means the sidebar briefly doesn't render, then pops in — causing a layout shift that feels sluggish.

2. **`animate-ping` on the sidebar's current-step indicator** runs continuously — this triggers constant GPU compositing and repaints, which can cause jank on lower-end machines.

3. **`fetchGeoLocation` (ipapi.co)** fires on every mount of `useEnrichmentData` — if that external API is slow (up to 3s timeout), it blocks enrichment data. Not directly causing UI sluggishness but adds network contention.

4. **`animate-fade-up` on the Quiz page re-triggers on every step change** via the `key={currentStep}` prop — this is intentional but the 0.6s animation combined with the `useIsMobile` re-render can feel like a double delay.

## Plan

### 1. Fix `useIsMobile` initial flash (avoid `undefined` state)
**File**: `src/hooks/use-mobile.tsx`
- Initialize state with `window.innerWidth < MOBILE_BREAKPOINT` instead of `undefined`
- This eliminates the initial render where `isMobile` is falsy, preventing layout shift

### 2. Remove `animate-ping` from sidebar indicator
**File**: `src/components/QuizSidebar.tsx`
- Replace the infinite `animate-ping` pulse on the current step with a one-shot or no animation
- Continuous CSS animations cause ongoing paint/composite work

### 3. Reduce fade animation duration
**File**: `src/index.css`
- Reduce `fadeUp` from `0.6s` to `0.35s` — still smooth but feels snappier

### 4. Cache geo lookup result in sessionStorage
**File**: `src/lib/deviceDetection.ts`
- Before fetching from ipapi.co, check sessionStorage for a cached result
- Avoids repeat 1-3s network requests on page navigations

All changes are small, surgical, and preserve existing behavior while reducing perceived latency.

