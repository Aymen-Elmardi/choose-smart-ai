/**
 * Cloudflare Worker entry for the chosepayments static site.
 *
 * Runs before static assets (assets.run_worker_first = true) so it can:
 *   1. 301-redirect the www host to the apex on every path.
 *   2. Geo-route: send US human visitors who land on the homepage ("/")
 *      to the US site ("/us"). SEO-safe — search-engine crawlers are never
 *      redirected (so Googlebot, which crawls from US IPs, keeps indexing
 *      "/" as the UK home), only the homepage is redirected (deep links are
 *      left alone), and it uses a temporary 302. A short-lived cookie stops
 *      redirect loops and lets a visitor who navigates back to "/" stay there.
 *
 * All other requests pass through to the static asset handler unchanged.
 */

// Match the major search-engine / preview crawlers we must never redirect.
const BOT_UA = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|whatsapp|telegrambot|google-inspectiontool|chrome-lighthouse/i;

function isCrawler(request) {
  // Verified bots (only present with Cloudflare Bot Management) — trust if available.
  if (request.cf && request.cf.botManagement && request.cf.botManagement.verifiedBot) return true;
  const ua = request.headers.get('user-agent') || '';
  return BOT_UA.test(ua);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 1. www -> apex
    if (url.hostname === 'www.chosepayments.com') {
      url.hostname = 'chosepayments.com'
      return Response.redirect(url.toString(), 301)
    }

    // 2. Geo-route US humans from the homepage to /us (once per day, never bots).
    if (url.pathname === '/') {
      // Cloudflare sets the CF-IPCountry header on every edge request; fall back
      // to request.cf.country. (Header is also testable in local wrangler.)
      const country = request.headers.get('cf-ipcountry') || (request.cf && request.cf.country)
      const cookies = request.headers.get('cookie') || ''
      const alreadyRouted = cookies.includes('cp_geo=1')

      if (country === 'US' && !alreadyRouted && !isCrawler(request)) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: '/us',
            // Suppress further auto-redirects for a day so navigating back to
            // "/" (e.g. via the logo) keeps the visitor on the UK home.
            'Set-Cookie': 'cp_geo=1; Path=/; Max-Age=86400; SameSite=Lax',
            'Cache-Control': 'no-store',
          },
        })
      }
    }

    return env.ASSETS.fetch(request)
  },
}
