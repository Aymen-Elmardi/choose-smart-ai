/**
 * Cloudflare Worker: Crawler Prerender Proxy
 * 
 * This worker intercepts requests from crawlers/bots and proxies them
 * to the Supabase prerender edge function for correct meta tags.
 * Normal browser requests pass through to the origin unchanged.
 * 
 * DEPLOYMENT:
 * 1. Go to Cloudflare Dashboard → Workers & Pages → Create Worker
 * 2. Paste this code and deploy
 * 3. Go to your domain's DNS settings → Workers Routes
 * 4. Add route: chosepayments.com/* → select this worker
 * 5. Add route: www.chosepayments.com/* → select this worker
 */

const PRERENDER_FUNCTION_URL =
  "https://yftyxqnshmsstwkdceny.supabase.co/functions/v1/prerender";

const CRAWLER_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "discordbot",
  "whatsapp",
  "telegrambot",
  "applebot",
  "gptbot",
  "chatgpt-user",
  "claudebot",
  "anthropic-ai",
  "perplexitybot",
  "bytespider",
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dotbot",
  "petalbot",
  "rogerbot",
  "seznambot",
  "ia_archiver",
  "archive.org_bot",
];

function isCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((bot) => ua.includes(bot));
}

// Paths that should never be proxied (static assets, API calls)
function isStaticAsset(pathname) {
  return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|map|json|xml|txt|webp|avif|mp4|webm)$/i.test(pathname);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";

    // Skip static assets — always serve from origin
    if (isStaticAsset(url.pathname)) {
      return fetch(request);
    }

    // Skip non-GET requests
    if (request.method !== "GET") {
      return fetch(request);
    }

    // If it's a crawler, proxy to the prerender function
    if (isCrawler(userAgent)) {
      try {
        const prerenderUrl = `${PRERENDER_FUNCTION_URL}?path=${encodeURIComponent(url.pathname)}`;

        const prerenderResponse = await fetch(prerenderUrl, {
          headers: {
            "User-Agent": userAgent,
            Accept: "text/html",
          },
        });

        if (prerenderResponse.ok) {
          const html = await prerenderResponse.text();
          return new Response(html, {
            status: 200,
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "public, max-age=3600, s-maxage=86400",
              "X-Prerendered": "true",
            },
          });
        }

        // If prerender fails, fall through to origin
        console.error(`Prerender returned ${prerenderResponse.status}`);
      } catch (err) {
        console.error("Prerender proxy error:", err);
      }
    }

    // Normal browsers — pass through to origin
    return fetch(request);
  },
};
