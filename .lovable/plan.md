

# Prerender Proxy via Backend Function

## Problem
AI tools, social media crawlers, and link previews see generic homepage metadata for all pages because they don't execute JavaScript. Your SPA renders meta tags client-side via React, but crawlers only see what's in `index.html`.

## Solution
Create a backend function called `prerender` that:
1. Detects crawler user-agents (Googlebot, LinkedInBot, Twitterbot, ChatGPT, etc.)
2. Looks up the correct title, description, and OG tags for the requested URL
3. Returns a minimal HTML page with the correct meta tags
4. For normal browsers, redirects to the SPA as usual

Then, update the site's hosting configuration to route crawler requests through this function.

---

## Architecture

```text
Crawler Request
      |
      v
  Edge Function (prerender)
      |
      +-- Is crawler? --> YES --> Return HTML with correct meta tags
      |
      +-- Is crawler? --> NO  --> Return 302 redirect to SPA
```

## Implementation Steps

### 1. Create route-to-metadata map
Build a comprehensive metadata registry inside the edge function containing every route's title, description, and OG data. This will be sourced from the existing `insightsArticles` data and the SEO props used on each page (roughly 80+ routes).

### 2. Create the `prerender` edge function
**File:** `supabase/functions/prerender/index.ts`

- Accept a `path` query parameter (e.g., `?path=/insights/stripe-fees-explained`)
- Check the `User-Agent` header against known crawler patterns:
  - `Googlebot`, `bingbot`, `LinkedInBot`, `Twitterbot`, `facebookexternalhit`, `Slackbot`, `ChatGPT-User`, `GPTBot`, `ClaudeBot`, `Applebot`, `Discordbot`
- Look up metadata for the path from the registry
- Return a complete HTML document with:
  - Correct `<title>`
  - `<meta name="description">`
  - All Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`)
  - Twitter Card tags
  - Article-specific tags (`article:published_time`, etc.) where applicable
  - A canonical `<link>` tag
  - A `<noscript>` redirect to the real SPA page
- For unknown paths, fall back to default homepage metadata
- For non-crawler requests, return a 302 redirect to the actual page

### 3. Update `supabase/config.toml`
Add the function configuration with `verify_jwt = false` (this must be publicly accessible to crawlers).

### 4. Update `public/_redirects` or hosting proxy
Add a Netlify/Cloudflare-style rewrite rule (or document for the user) that proxies crawler requests to the edge function. Since Lovable deploys as a static site, the practical approach is:
- Add a `_redirects` file that sends specific bot traffic to the edge function
- OR document that the user should configure their DNS/CDN (e.g., Cloudflare Worker) to intercept crawler requests

**Note:** Static hosting platforms like Netlify/Vercel cannot inspect User-Agent in `_redirects`. The most reliable approach is a Cloudflare Worker or similar edge proxy that checks the UA and forwards crawlers to the edge function.

### 5. Alternative: Direct crawler URL approach
Since static hosting can't do UA-based routing natively, we'll make the edge function self-contained so it can be used as:
- A shareable URL for social previews (e.g., share the edge function URL on LinkedIn)
- A sitemap entry pointing crawlers to the function
- A Cloudflare Worker proxy (documented for the user)

---

## Technical Details

### Crawler detection patterns
```text
Googlebot, bingbot, Slurp, DuckDuckBot, Baiduspider,
facebookexternalhit, Twitterbot, LinkedInBot, Slackbot,
Discordbot, WhatsApp, TelegramBot, Applebot,
GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Bytespider
```

### HTML template structure
The returned HTML will be minimal (no JS needed) -- just meta tags and a redirect fallback:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="canonical" href="https://chosepayments.com{path}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:url" content="https://chosepayments.com{path}">
  <meta property="og:image" content="{ogImage}">
  <meta property="og:type" content="{article|website}">
  <!-- Twitter, article tags, etc. -->
  <meta http-equiv="refresh" content="0;url=https://chosepayments.com{path}">
</head>
<body><p>Redirecting...</p></body>
</html>
```

### Metadata registry
Will cover all ~90 routes including:
- Homepage and US variant
- All SEO content pages (hidden-fees, switch-provider, etc.)
- All insight articles (risk, guides, compliance, explainer, providers, crisis, pricing, fees)
- Static pages (about, privacy, terms, contact)

### Files to create/modify
1. **Create** `supabase/functions/prerender/index.ts` -- the edge function
2. **Modify** `supabase/config.toml` -- add `[functions.prerender]` with `verify_jwt = false`
3. **Modify** `public/robots.txt` -- optionally add the prerender function URL pattern
4. **Create** `public/_redirects` -- add rewrite rules for crawler paths (platform-dependent)

## Limitations and Notes
- This does NOT require any changes to the React app itself
- The metadata map in the edge function will need to be kept in sync with new articles (a manual step when adding content)
- For full automated crawler interception, the user will need a CDN-level proxy (e.g., Cloudflare Worker) -- we'll document this clearly
- The edge function alone solves the problem for social sharing if links are shared via the function URL pattern
