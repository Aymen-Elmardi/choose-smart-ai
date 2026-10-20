/**
 * Cloudflare Worker entry for the chosepayments static site.
 *
 * Runs before static assets (assets.run_worker_first = true) so it can:
 *   1. 301-redirect the www host to the apex on every path.
 *   2. 301-redirect the retired /us section onto the main site.
 *   3. 301-redirect pages merged into a stronger page (fix list Section 5).
 *
 * All other requests pass through to the static asset handler unchanged.
 *
 * Geo-routing (US visitors on "/" were 302'd to "/us") was removed on
 * 2026-08-27 — every visitor now gets the same site regardless of country.
 * The /us redirects live here rather than in public/_redirects because
 * out/us.html and out/us/insights.html are still built as real static
 * assets, and an existing asset takes precedence over a _redirects rule.
 */

/**
 * Merged pages (fix list Section 5): old path -> the page it was folded into.
 * These live here, not in public/_redirects, because the old pages are still
 * built as static assets (their source is kept until the owner approves a
 * cleanup), and an existing asset takes precedence over a _redirects rule.
 * One hop, straight to the final URL. Keys have no trailing slash.
 */
const MERGED_PAGES = {
  // M5a, 2026-10-20
  '/insights/why-payment-providers-ask-for-source-of-funds': '/insights/source-of-funds',
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Final path for a merged page, so a www request for an old URL still
    // takes a single hop (rules 1 and 3 share it).
    const mergedFrom = url.pathname.replace(/\.html$/, '').replace(/\/+$/, '')
    const mergedTo = Object.hasOwn(MERGED_PAGES, mergedFrom) ? MERGED_PAGES[mergedFrom] : null

    // 1. www -> apex
    if (url.hostname === 'www.chosepayments.com') {
      url.hostname = 'chosepayments.com'
      if (mergedTo) url.pathname = mergedTo
      return Response.redirect(url.toString(), 301)
    }

    // 2. Retired US section -> the equivalent page on the main site.
    //    /us -> /, /us/insights -> /insights, and so on for any /us/* path.
    if (url.pathname === '/us' || url.pathname.startsWith('/us/')) {
      url.pathname = url.pathname.slice(3) || '/'
      return Response.redirect(url.toString(), 301)
    }

    // 3. Merged pages. Matches with or without a trailing slash or ".html";
    //    the query string is kept.
    if (mergedTo) {
      url.pathname = mergedTo
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
