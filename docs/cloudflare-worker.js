/**
 * Cloudflare Worker: Per-Page Meta Tag Rewriter + Crawler Prerender Proxy
 *
 * For EVERY request: rewrites <title>, meta description, OG, Twitter, and canonical tags
 * based on the URL path using META_MAP.
 *
 * For crawler requests: proxies to the Supabase prerender edge function for full
 * static HTML with content.
 *
 * DEPLOYMENT:
 * 1. Go to Cloudflare Dashboard → Workers & Pages → Create Worker
 * 2. Paste this code and deploy
 * 3. Go to your domain's DNS settings → Workers Routes
 * 4. Add route: chosepayments.com/* → select this worker
 * 5. Add route: www.chosepayments.com/* → select this worker
 */

const BASE_URL = "https://chosepayments.com";
const ORIGIN_IP = "185.158.133.1";

const PRERENDER_FUNCTION_URL =
  "https://yftyxqnshmsstwkdceny.supabase.co/functions/v1/prerender";

const META_MAP = {
  "/": {
    title: "ChosePayments — Match Your Business to the Right Payment Processor",
    description: "Stop overpaying or getting frozen. We match UK businesses to risk-aligned payment processors based on your volume, industry, and chargeback profile. Free assessment.",
  },
  "/assessment": {
    title: "Free Payment Provider Assessment | ChosePayments",
    description: "Answer a few questions about your business model, volume, and risk profile. Get matched to the right payment processor in minutes.",
  },
  "/recommendation": {
    title: "Your Payment Provider Recommendation | ChosePayments",
    description: "Your personalised payment processor recommendation based on your risk profile, volume, and business model.",
  },
  "/about": {
    title: "About ChosePayments | Payment Strategy Advisory",
    description: "ChosePayments helps UK businesses find risk-aligned payment processors. Built by payments professionals who understand underwriting, chargebacks, and processing costs.",
  },
  "/contact": {
    title: "Contact ChosePayments",
    description: "Get in touch with ChosePayments for payment processor matching, advisory, or partnership enquiries.",
  },
  "/faq": {
    title: "Frequently Asked Questions | ChosePayments",
    description: "Common questions about payment processor selection, risk profiling, switching providers, and how ChosePayments works.",
  },
  "/choose-payment-provider": {
    title: "How to Choose a Payment Provider for Your UK Business | ChosePayments",
    description: "A practical guide to choosing the right payment provider — covering risk appetite, pricing models, chargeback handling, and what most comparison sites miss.",
  },
  "/best-payment-processor-uk": {
    title: "Best Payment Processor UK — Matched to Your Risk Profile | ChosePayments",
    description: "The best UK payment processor depends on your risk profile, not just price. We match you based on chargeback tolerance, industry, and volume.",
  },
  "/stripe-vs-square-vs-paypal-uk": {
    title: "Stripe vs Square vs PayPal UK — Which Is Right for You? | ChosePayments",
    description: "An honest comparison of Stripe, Square, and PayPal for UK businesses. We break down fees, risk tolerance, and which business types each one actually suits.",
  },
  "/best-payment-api-uk": {
    title: "Best Payment API UK — For Developers & Platforms | ChosePayments",
    description: "Comparing the best payment APIs for UK businesses. Stripe, Adyen, Checkout.com and more — matched to your integration needs and risk profile.",
  },
  "/payment-provider-hidden-fees": {
    title: "Hidden Fees in Payment Processing — What Providers Don't Tell You | ChosePayments",
    description: "Uncover hidden fees in payment processing: scheme fees, PCI charges, chargeback costs, and markups that erode your margins.",
  },
  "/switch-payment-provider": {
    title: "How to Switch Payment Provider Without Downtime | ChosePayments",
    description: "A step-by-step guide to switching payment processors in the UK — covering migration, data portability, and avoiding service interruption.",
  },
  "/best-payment-provider-small-business": {
    title: "Best Payment Provider for Small Business UK | ChosePayments",
    description: "Finding the right payment provider as a small UK business. We compare pricing, setup, and which providers actually accept your business type.",
  },
  "/stripe-alternatives-marketplace": {
    title: "Stripe Alternatives for Marketplaces | ChosePayments",
    description: "Looking beyond Stripe for your marketplace? Compare Adyen, Checkout.com, PayPal, and specialist providers for multi-seller platforms.",
  },
  "/payment-provider-support": {
    title: "Payment Provider Support — What to Expect | ChosePayments",
    description: "Comparing customer support quality across UK payment providers. Response times, account management, and what happens when things go wrong.",
  },
  "/marketplace-payment-provider": {
    title: "Best Payment Provider for Marketplaces | ChosePayments",
    description: "Payment solutions for marketplace platforms — split payments, seller onboarding, KYC, and risk management across Stripe Connect, Adyen, and more.",
  },
  "/merchant-account-problems": {
    title: "Merchant Account Problems Explained | ChosePayments",
    description: "Funds withheld, reserves imposed, fees higher than expected. Understand what your payment provider is doing and why.",
  },
  "/insights": {
    title: "Payment Insights & Guides | ChosePayments",
    description: "Expert guides on payment processing, risk management, pricing models, and provider comparisons for UK businesses.",
  },
  "/insights/payment-risk": {
    title: "Payment Risk Insights | ChosePayments",
    description: "Understanding payment risk: why accounts get frozen, how underwriting works, and what triggers provider reviews.",
  },
  "/insights/guides": {
    title: "Payment Processing Guides | ChosePayments",
    description: "Practical guides on payment processing for UK businesses — from choosing providers to understanding fee structures.",
  },
  "/insights/case-studies": {
    title: "Payment Provider Case Studies | ChosePayments",
    description: "Real-world examples of UK businesses navigating payment provider selection, risk issues, and processor migration.",
  },
  "/insights/crisis": {
    title: "Payment Crisis Guides | ChosePayments",
    description: "Your account is frozen, fees are spiking, or you've been rejected. Actionable guides for payment emergencies.",
  },
  "/insights/pricing": {
    title: "Payment Pricing Models Explained | ChosePayments",
    description: "Understand how payment processors price their services — blended, interchange++, and what each model means for your costs.",
  },
  "/insights/crisis/stripe-account-frozen-guide": {
    title: "Stripe Account Frozen? What to Do Next | ChosePayments",
    description: "Your Stripe account is frozen and funds are held. Why it happened, how to respond, and your options for getting back to processing.",
  },
  "/insights/crisis/hidden-fee-crisis": {
    title: "Discovered Hidden Fees in Your Payment Processing? | ChosePayments",
    description: "Found unexpected charges on your processing statement? How to identify hidden fees, challenge them, and switch to transparent pricing.",
  },
  "/insights/crisis/rejected-high-risk-strategy": {
    title: "Rejected as High Risk? Your Strategy Guide | ChosePayments",
    description: "Been declined by payment processors as high risk? Practical steps to understand why, fix your profile, and find providers that will accept you.",
  },
  "/insights/pricing/blended-vs-interchange": {
    title: "Blended vs Interchange++ Pricing Explained | ChosePayments",
    description: "Should your business be on blended or interchange++ pricing? We break down the difference and when each model saves you money.",
  },
  "/insights/pricing/interchange-plus-plus": {
    title: "Interchange++ Pricing Explained for UK Businesses | ChosePayments",
    description: "How interchange++ pricing works, what the components mean, and whether it's the right model for your processing volume.",
  },
  "/insights/stripe-payment-platform": {
    title: "Stripe Platform Review for UK Businesses | ChosePayments",
    description: "An honest review of Stripe as a payment platform — features, limitations, pricing, and what types of UK businesses it suits best.",
  },
  "/insights/adyen-enterprise-payments-platform": {
    title: "Adyen Enterprise Platform Review | ChosePayments",
    description: "Adyen for enterprise and high-volume merchants — capabilities, pricing model, and whether it fits your business.",
  },
  "/insights/checkout-com-enterprise-platform": {
    title: "Checkout.com Enterprise Platform Review | ChosePayments",
    description: "Checkout.com for enterprise payments — API capabilities, pricing, risk appetite, and what sets it apart from Stripe and Adyen.",
  },
  "/insights/paypal-payment-platform": {
    title: "PayPal as a Payment Platform — UK Business Review | ChosePayments",
    description: "Is PayPal still viable as your main payment platform? We review fees, limitations, buyer protection issues, and alternatives.",
  },
  "/insights/shift4-payments-platform": {
    title: "Shift4 Payments Platform Review | ChosePayments",
    description: "Shift4 for enterprise payments — end-to-end processing, pricing, and how it compares to Stripe and Adyen.",
  },
  "/insights/fiserv-payments-platform": {
    title: "Fiserv Payments Platform Review | ChosePayments",
    description: "Fiserv and Clover for UK merchants — capabilities, pricing, and whether legacy infrastructure suits your business.",
  },
  "/insights/stripe-fees-explained": {
    title: "Stripe Fees Explained: What UK Businesses Actually Pay | ChosePayments",
    description: "A clear breakdown of Stripe pricing for UK businesses — transaction fees, international charges, and hidden costs.",
  },
  "/insights/checkout-com-fees-explained": {
    title: "Checkout.com Fees Explained for UK Businesses | ChosePayments",
    description: "What does Checkout.com actually cost? We break down their pricing model, interchange++ structure, and what to expect.",
  },
  "/insights/adyen-pricing-explained": {
    title: "Adyen Pricing Explained for UK Merchants | ChosePayments",
    description: "How Adyen pricing works — processing fees, scheme fees, and the real cost of running on Adyen for UK businesses.",
  },
  "/insights/fiserv-clover-pricing-explained": {
    title: "Fiserv & Clover Pricing Explained | ChosePayments",
    description: "What Fiserv and Clover actually charge UK merchants — hardware costs, processing fees, and contract terms to watch for.",
  },
  "/insights/paypal-fees-explained": {
    title: "PayPal Fees Explained for UK Businesses | ChosePayments",
    description: "A full breakdown of PayPal transaction fees, currency conversion charges, and the real cost for UK merchants.",
  },
  "/insights/why-stripe-freezes-accounts-uk": {
    title: "Why Stripe Freezes UK Accounts — And How to Prevent It | ChosePayments",
    description: "Common reasons Stripe freezes UK business accounts, how their risk triggers work, and steps to protect your processing.",
  },
  "/insights/why-accounts-get-flagged-after-growth": {
    title: "Why Payment Accounts Get Flagged After Growth | ChosePayments",
    description: "Your business grew and now your payment account is under review. Why processors flag growth and how to stay ahead of it.",
  },
  "/insights/why-payment-accounts-get-frozen-without-warning": {
    title: "Why Payment Accounts Get Frozen Without Warning | ChosePayments",
    description: "No warning, funds held, account locked. Why payment providers freeze accounts suddenly and what your options are.",
  },
  "/insights/why-providers-re-underwrite-accounts": {
    title: "Why Payment Providers Re-Underwrite Existing Accounts | ChosePayments",
    description: "Your provider is reviewing your account again. Why re-underwriting happens, what triggers it, and how to prepare.",
  },
  "/insights/why-some-businesses-never-get-approved": {
    title: "Why Some Businesses Never Get Approved for Payment Processing | ChosePayments",
    description: "Rejected by every processor? The common reasons businesses fail underwriting and what you can do to fix your application.",
  },
  "/insights/why-payment-providers-ask-for-director-documents": {
    title: "Why Payment Providers Ask for Director Documents | ChosePayments",
    description: "KYC and director verification explained — why processors need your ID, proof of address, and how to speed up onboarding.",
  },
  "/insights/why-payment-providers-ask-for-source-of-funds": {
    title: "Why Payment Providers Ask for Source of Funds | ChosePayments",
    description: "Source of funds requests explained — what providers are looking for, how to respond, and why it matters for compliance.",
  },
  "/insights/what-to-do-when-provider-asks-for-documents": {
    title: "What to Do When Your Payment Provider Asks for Documents | ChosePayments",
    description: "Your provider wants documents. What to prepare, how to respond quickly, and how to avoid delays or account holds.",
  },
  "/insights/payment-provider-risk-models": {
    title: "How Payment Providers Assess Risk | ChosePayments",
    description: "How acquirers and PSPs model risk — underwriting criteria, ongoing monitoring, and what makes you high or low risk.",
  },
  "/insights/why-payment-providers-reject-growing-businesses": {
    title: "Why Payment Providers Reject Growing Businesses | ChosePayments",
    description: "Your business is scaling but providers keep declining you. Why growth triggers rejections and how to position yourself.",
  },
  "/insights/why-providers-impose-reserves": {
    title: "Why Payment Providers Impose Reserves | ChosePayments",
    description: "Rolling reserves, fixed reserves, and why your provider is holding back a percentage of your revenue.",
  },
  "/insights/what-to-do-when-funds-held": {
    title: "What to Do When Your Payment Provider Holds Your Funds | ChosePayments",
    description: "Your funds are being held. Why it happens, how long it lasts, and practical steps to get your money released.",
  },
  "/insights/rolling-vs-fixed-reserve": {
    title: "Rolling vs Fixed Reserve Explained | ChosePayments",
    description: "The difference between rolling and fixed reserves in payment processing, how they work, and what to expect.",
  },
  "/insights/credit-card-payments-explained": {
    title: "How Credit Card Payments Work — UK Guide | ChosePayments",
    description: "A clear explanation of how credit card payments are processed — from authorisation to settlement — for UK business owners.",
  },
  "/insights/open-banking-payments-uk": {
    title: "Open Banking Payments Explained for UK Businesses | ChosePayments",
    description: "How open banking payments work in the UK, the benefits over card payments, and which providers support them.",
  },
  "/insights/apple-pay-google-pay-explained": {
    title: "Apple Pay & Google Pay Explained for UK Merchants | ChosePayments",
    description: "How Apple Pay and Google Pay work for UK businesses — setup, fees, and whether you should offer them at checkout.",
  },
  "/insights/low-value-transaction-exemption": {
    title: "Low Value Transaction Exemption Explained | ChosePayments",
    description: "How the SCA low value transaction exemption works and when it applies to reduce friction at checkout.",
  },
  "/insights/tra-exemption-reduces-payment-friction": {
    title: "TRA Exemption — Reduce Payment Friction | ChosePayments",
    description: "How Transaction Risk Analysis exemptions reduce SCA friction and improve checkout conversion for UK merchants.",
  },
  "/insights/visa-mastercard-control-card-payments": {
    title: "How Visa & Mastercard Control Card Payments | ChosePayments",
    description: "The role of card schemes in payment processing — interchange rules, scheme fees, and how they impact your costs.",
  },
  "/insights/what-is-an-acquirer": {
    title: "What Is an Acquirer? Payment Processing Explained | ChosePayments",
    description: "The role of acquiring banks in payment processing — what they do, how they differ from PSPs, and why it matters.",
  },
  "/insights/payment-provider-vs-acquirer-vs-bank": {
    title: "Payment Provider vs Acquirer vs Bank — What's the Difference? | ChosePayments",
    description: "Confused by payment terminology? We explain the difference between payment providers, acquirers, and banks.",
  },
  "/insights/why-card-approval-speed-affects-checkout-abandonment": {
    title: "How Card Approval Speed Affects Checkout Abandonment | ChosePayments",
    description: "Slow card approvals kill conversions. How authorisation latency impacts checkout abandonment and what you can do.",
  },
  "/insights/same-day-settlement-and-instant-payouts": {
    title: "Same-Day Settlement & Instant Payouts Explained | ChosePayments",
    description: "How same-day settlement and instant payouts work in UK payment processing — providers, costs, and cash flow impact.",
  },
  "/insights/chargebacks-what-they-are-and-how-to-avoid-them": {
    title: "Chargebacks Explained: What They Are & How to Avoid Them | ChosePayments",
    description: "A practical guide to chargebacks for UK businesses — what causes them, how to fight them, and prevention strategies.",
  },
  "/insights/chargeback-loss-recovery": {
    title: "Chargeback Loss Recovery for UK Merchants | ChosePayments",
    description: "How to recover revenue lost to chargebacks — representment strategies, evidence requirements, and prevention.",
  },
  "/insights/payment-acronyms-explained": {
    title: "Payment Acronyms Explained — PSP, PCI, SCA & More | ChosePayments",
    description: "A glossary of payment processing acronyms and jargon, explained in plain English for UK business owners.",
  },
  "/insights/payment-scheme-rules-explained": {
    title: "Payment Scheme Rules Explained | ChosePayments",
    description: "How Visa and Mastercard scheme rules affect your business — compliance requirements, fines, and what to watch for.",
  },
  "/insights/scheme-rules-by-payment-method": {
    title: "Scheme Rules by Payment Method | ChosePayments",
    description: "How card scheme rules differ across payment methods — cards, wallets, recurring, and MOTO transactions.",
  },
  "/insights/scheme-rules-reserves-monitoring": {
    title: "Scheme Rules, Reserves & Monitoring Programs | ChosePayments",
    description: "How scheme monitoring programs work, when reserves get triggered, and what thresholds to watch.",
  },
  "/insights/net-vs-gross-settlement": {
    title: "Net vs Gross Settlement Explained | ChosePayments",
    description: "The difference between net and gross settlement in payment processing and how it affects your cash flow.",
  },
  "/insights/payout-settlement-explained": {
    title: "Payout & Settlement Explained | ChosePayments",
    description: "How payment settlement works — payout timing, settlement cycles, and what affects when you receive your money.",
  },
  "/insights/scoring-logic": {
    title: "How ChosePayments Scores & Matches Providers | ChosePayments",
    description: "Our transparent methodology for scoring payment providers against your business profile — risk, pricing, and fit.",
  },
  "/insights/proof-of-business-activity": {
    title: "Proof of Business Activity for Payment Providers | ChosePayments",
    description: "What counts as proof of business activity when onboarding with a payment provider, and how to prepare it.",
  },
  "/insights/sales-increase": {
    title: "How Sales Increases Trigger Payment Provider Reviews | ChosePayments",
    description: "A sudden sales spike can trigger account reviews. How to notify your provider proactively and avoid holds.",
  },
  "/insights/marketplace-seller-info": {
    title: "Marketplace Seller Information Requirements | ChosePayments",
    description: "KYC and documentation requirements for marketplace sellers — what platforms and payment providers need from you.",
  },
  "/insights/source-of-funds": {
    title: "Source of Funds Documentation for Payment Processing | ChosePayments",
    description: "How to prepare source of funds documentation when required by your payment provider or acquirer.",
  },
  "/insights/industry-verification": {
    title: "Industry Verification in Payment Processing | ChosePayments",
    description: "Why payment providers verify your industry classification and how MCC codes affect your processing terms.",
  },
  "/insights/international-sales": {
    title: "International Sales & Cross-Border Payment Processing | ChosePayments",
    description: "How international sales affect your payment processing — currency conversion, cross-border fees, and provider selection.",
  },
  "/insights/contracts-invoices": {
    title: "Contracts & Invoices for Payment Provider Onboarding | ChosePayments",
    description: "What contract and invoice documentation payment providers need during onboarding and compliance reviews.",
  },
  "/insights/wallet-payments-guaranteed-success": {
    title: "Are Wallet Payments Guaranteed to Succeed? | ChosePayments",
    description: "Do Apple Pay and Google Pay guarantee transaction success? We explain what actually happens behind the scenes.",
  },
  "/insights/adyen-vs-first-data": {
    title: "Adyen vs First Data (Fiserv) — UK Comparison | ChosePayments",
    description: "Comparing Adyen and First Data for UK merchants — pricing, technology, risk appetite, and which suits your business.",
  },
  "/insights/shift4-vs-stripe-enterprise": {
    title: "Shift4 vs Stripe for Enterprise — Comparison | ChosePayments",
    description: "Comparing Shift4 and Stripe for enterprise payment processing — pricing, features, integration, and risk handling.",
  },
  "/insights/marketplace-payments-guide": {
    title: "Marketplace Payments Guide — UK | ChosePayments",
    description: "A comprehensive guide to marketplace payment processing in the UK — split payments, compliance, and provider options.",
  },
  "/insights/enterprise-provider-comparison": {
    title: "Enterprise Payment Provider Comparison | ChosePayments",
    description: "Comparing enterprise payment providers — Adyen, Checkout.com, Stripe, and others for high-volume UK businesses.",
  },
  "/insights/referral-commission-guide": {
    title: "Payment Provider Referral Commissions Guide | ChosePayments",
    description: "How payment provider referral programs work — commission structures, eligibility, and what to expect.",
  },
  "/insights/provider-appetite-index": {
    title: "Provider Appetite Index | ChosePayments",
    description: "Which payment providers accept which business types — a risk appetite guide for UK merchants.",
  },
  "/insights/risk-profile-matching": {
    title: "Risk Profile Matching for Payment Providers | ChosePayments",
    description: "How we match your business risk profile to payment providers that will actually approve and support you.",
  },
  "/insights/provider-fit/high-risk-ecommerce": {
    title: "Payment Providers for High-Risk Ecommerce | ChosePayments",
    description: "Which payment providers accept high-risk ecommerce businesses and what you need to get approved.",
  },
  "/insights/provider-fit/subscription-saas": {
    title: "Payment Providers for Subscription & SaaS | ChosePayments",
    description: "Best payment providers for recurring billing and SaaS businesses — chargeback handling, dunning, and pricing.",
  },
  "/insights/provider-fit/food-delivery-acquirers": {
    title: "Payment Providers for Food Delivery Platforms | ChosePayments",
    description: "Payment processing for food delivery businesses — MCC codes, chargeback rates, and provider selection.",
  },
  "/insights/provider-fit/high-chargeback-processors": {
    title: "Payment Providers for High-Chargeback Businesses | ChosePayments",
    description: "Which processors accept businesses with high chargeback rates and how to manage dispute thresholds.",
  },
  "/insights/provider-fit/mcc-5812-restaurants": {
    title: "Payment Providers for Restaurants (MCC 5812) | ChosePayments",
    description: "Payment processing for restaurants — terminal options, tipping, and which providers suit hospitality businesses.",
  },
  "/insights/ecommerce/chargeback-thresholds": {
    title: "Chargeback Thresholds for Ecommerce | ChosePayments",
    description: "Understanding chargeback monitoring thresholds — Visa and Mastercard programs, penalties, and prevention strategies.",
  },
  "/insights/ecommerce/high-risk-to-high-growth": {
    title: "From High-Risk to High-Growth Ecommerce | ChosePayments",
    description: "How high-risk ecommerce businesses can grow sustainably with the right payment strategy and provider selection.",
  },
  "/insights/ecommerce/subscription-revenue": {
    title: "Subscription Revenue & Payment Processing | ChosePayments",
    description: "Optimising payment processing for subscription revenue — failed payments, dunning, and provider capabilities.",
  },
  "/privacy": {
    title: "Privacy Policy | ChosePayments",
    description: "ChosePayments privacy policy — how we handle your data when you use our payment provider assessment tool.",
  },
  "/terms": {
    title: "Terms of Service | ChosePayments",
    description: "ChosePayments terms of service for using our payment provider matching and advisory platform.",
  },
};

const CRAWLER_USER_AGENTS = [
  "googlebot", "bingbot", "slurp", "duckduckbot", "baiduspider", "yandexbot",
  "facebookexternalhit", "twitterbot", "linkedinbot", "slackbot", "discordbot",
  "whatsapp", "telegrambot", "applebot", "gptbot", "chatgpt-user", "claudebot",
  "anthropic-ai", "perplexitybot", "bytespider", "semrushbot", "ahrefsbot",
  "mj12bot", "dotbot", "petalbot", "rogerbot", "seznambot", "ia_archiver",
  "archive.org_bot",
];

function isCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some((bot) => ua.includes(bot));
}

function isStaticAsset(pathname) {
  return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|map|json|xml|txt|webp|avif|mp4|webm)$/i.test(pathname);
}

function getMeta(path) {
  // Exact match first
  if (META_MAP[path]) return META_MAP[path];
  // Try without trailing slash
  const trimmed = path.replace(/\/$/, "");
  if (META_MAP[trimmed]) return META_MAP[trimmed];
  // Try with trailing slash
  if (META_MAP[trimmed + "/"]) return META_MAP[trimmed + "/"];
  return null;
}

/**
 * HTMLRewriter handlers that swap meta tags in the streamed HTML response.
 */
class TitleHandler {
  constructor(title) { this.title = title; }
  element(el) { el.setInnerContent(this.title); }
}

class MetaHandler {
  constructor(meta) { this.meta = meta; }
  element(el) {
    const name = (el.getAttribute("name") || "").toLowerCase();
    const prop = (el.getAttribute("property") || "").toLowerCase();

    if (name === "description") {
      el.setAttribute("content", this.meta.description);
    } else if (name === "author") {
      el.setAttribute("content", "ChosePayments");
    } else if (name === "twitter:title") {
      el.setAttribute("content", this.meta.title);
    } else if (name === "twitter:description") {
      el.setAttribute("content", this.meta.description);
    } else if (prop === "og:title") {
      el.setAttribute("content", this.meta.title);
    } else if (prop === "og:description") {
      el.setAttribute("content", this.meta.description);
    } else if (prop === "og:url") {
      el.setAttribute("content", this.meta.url);
    }
  }
}

class CanonicalHandler {
  constructor(url) { this.url = url; }
  element(el) {
    if (el.getAttribute("rel") === "canonical") {
      el.setAttribute("href", this.url);
    }
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const userAgent = request.headers.get("user-agent") || "";

    // Skip static assets — pass through to origin
    if (isStaticAsset(url.pathname)) {
      const originUrl = new URL(url.pathname + url.search, `https://${ORIGIN_IP}`);
      return fetch(originUrl.toString(), {
        method: request.method,
        headers: { ...Object.fromEntries(request.headers), Host: "chosepayments.com" },
      });
    }

    // Skip non-GET requests
    if (request.method !== "GET") {
      const originUrl = new URL(url.pathname + url.search, `https://${ORIGIN_IP}`);
      return fetch(originUrl.toString(), {
        method: request.method,
        headers: { ...Object.fromEntries(request.headers), Host: "chosepayments.com" },
        body: request.body,
      });
    }

    // For crawlers, try the full prerender function first
    if (isCrawler(userAgent)) {
      try {
        const prerenderUrl = `${PRERENDER_FUNCTION_URL}?path=${encodeURIComponent(url.pathname)}`;
        const prerenderResponse = await fetch(prerenderUrl, {
          headers: { "User-Agent": userAgent, Accept: "text/html" },
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
        console.error(`Prerender returned ${prerenderResponse.status}`);
      } catch (err) {
        console.error("Prerender proxy error:", err);
      }
      // Fall through to meta-tag rewriting below
    }

    // Fetch from the ORIGIN server (by IP) to avoid Worker loop
    const originUrl = new URL(url.pathname + url.search, `https://${ORIGIN_IP}`);
    const originResponse = await fetch(originUrl.toString(), {
      method: "GET",
      headers: { ...Object.fromEntries(request.headers), Host: "chosepayments.com" },
    });

    // Only rewrite HTML responses
    const contentType = originResponse.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return originResponse;
    }

    const meta = getMeta(url.pathname);
    if (!meta) {
      // No meta map entry — return origin unchanged
      return originResponse;
    }

    const pageUrl = `${BASE_URL}${url.pathname === "/" ? "" : url.pathname}`;
    const enrichedMeta = { ...meta, url: pageUrl };

    // Use HTMLRewriter to efficiently swap tags in the streaming response
    return new HTMLRewriter()
      .on("title", new TitleHandler(meta.title))
      .on("meta", new MetaHandler(enrichedMeta))
      .on("link[rel='canonical']", new CanonicalHandler(pageUrl))
      .transform(originResponse);
  },
};
