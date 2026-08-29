/**
 * Cloudflare Worker entry for the chosepayments static site.
 *
 * Runs before static assets (assets.run_worker_first = true) so it can:
 *   1. 301-redirect the www host to the apex on every path.
 *   2. 301-redirect the retired /us section onto the main site.
 *
 * All other requests pass through to the static asset handler unchanged.
 *
 * Geo-routing (US visitors on "/" were 302'd to "/us") was removed on
 * 2026-08-27 — every visitor now gets the same site regardless of country.
 * The /us redirects live here rather than in public/_redirects because
 * out/us.html and out/us/insights.html are still built as real static
 * assets, and an existing asset takes precedence over a _redirects rule.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 1. www -> apex
    if (url.hostname === 'www.chosepayments.com') {
      url.hostname = 'chosepayments.com'
      return Response.redirect(url.toString(), 301)
    }

    // 2. Retired US section -> the equivalent page on the main site.
    //    /us -> /, /us/insights -> /insights, and so on for any /us/* path.
    if (url.pathname === '/us' || url.pathname.startsWith('/us/')) {
      url.pathname = url.pathname.slice(3) || '/'
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
