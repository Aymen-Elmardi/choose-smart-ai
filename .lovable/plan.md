
# Fix Social Media Link Previews (LinkedIn, Twitter, Facebook)

## Problem Summary
When sharing article links on LinkedIn, the preview shows generic site metadata instead of article-specific content because:
1. **No prerendering**: The `vite-prerender-plugin` is installed but not configured
2. **No OG image**: The referenced `og-default.png` doesn't exist in `/public`
3. **Client-side meta tags**: Social crawlers don't execute JavaScript

## Solution Overview
Configure pre-rendering so that static HTML includes proper Open Graph meta tags for each page, and add a default OG image.

---

## Implementation Steps

### Step 1: Add Default OG Image
Create or upload a branded OG image (1200x630px recommended) to `/public/og-default.png`. This will be the fallback image for all social shares.

**Requirements:**
- Dimensions: 1200x630 pixels (optimal for LinkedIn/Twitter)
- Include ChosePayments branding/logo
- Clean, professional design

### Step 2: Configure vite-prerender-plugin
Update `vite.config.ts` to enable pre-rendering for all key pages:

```typescript
import vitePrerenderPlugin from 'vite-prerender-plugin';

// Add to plugins array:
vitePrerenderPlugin({
  routes: [
    '/',
    '/assessment',
    '/about',
    '/contact',
    '/insights',
    '/insights/checkout-com-enterprise-platform',
    '/insights/stripe-payment-platform',
    '/insights/adyen-enterprise-payments-platform',
    // ... all other insight article routes
  ],
})
```

This will generate static HTML with the correct OG tags baked in during the build process.

### Step 3: Verify useSEO Hook Compatibility
The current `useSEO` hook uses `useLayoutEffect` which should work during prerendering. No changes needed, but we'll verify the tags are being set correctly.

### Step 4: (Optional) Article-Specific OG Images
For maximum social engagement, create unique OG images for high-priority articles:
- `/public/og-checkout-com.png`
- `/public/og-stripe-platform.png`
- etc.

Then pass the specific image path to the `useSEO` hook:
```typescript
useSEO({
  title: "...",
  description: "...",
  ogImage: "https://chosepayments.com/og-checkout-com.png"
});
```

---

## Technical Details

### Routes to Prerender (55+ pages)
All pages listed in `sitemap.xml` should be included in the prerender configuration, including:
- Homepage and core pages (/, /assessment, /about, /contact)
- All SEO content pages (/best-payment-processor-uk, /stripe-vs-square-vs-paypal-uk, etc.)
- All insight articles (/insights/*, /insights/crisis/*, /insights/pricing/*)

### Expected Outcome
After implementation:
- LinkedIn will show: "Checkout.com: The High-Performance Platform Built for Global Ambition | ChosePayments"
- Description will appear: "Discover why Checkout.com's modular architecture..."
- OG image will display properly

### Testing
After deployment, use LinkedIn's Post Inspector to verify:
https://www.linkedin.com/post-inspector/

---

## Files to Modify
1. `vite.config.ts` - Add prerender plugin configuration
2. `/public/og-default.png` - Add new file (upload branded image)
3. Optionally: Individual article files to add custom OG images

## Estimated Impact
- All shared links will display article-specific titles and descriptions
- Professional branded image in social previews
- Better click-through rates from social shares
