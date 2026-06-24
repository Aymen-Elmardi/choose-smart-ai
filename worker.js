/**
 * Cloudflare Worker entry for the chosepayments static site.
 *
 * Runs before static assets (assets.run_worker_first = true) so it can
 * 301-redirect the www host to the apex on every path, including HTML pages
 * that would otherwise be served directly as assets. All other requests are
 * passed through to the static asset handler unchanged.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.hostname === 'www.chosepayments.com') {
      url.hostname = 'chosepayments.com'
      return Response.redirect(url.toString(), 301)
    }

    return env.ASSETS.fetch(request)
  },
}
