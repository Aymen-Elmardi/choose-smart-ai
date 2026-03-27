const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://chosepayments.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.png`;

// --- Crawler detection ---
const CRAWLER_PATTERNS = [
  "Googlebot",
  "bingbot",
  "Slurp",
  "DuckDuckBot",
  "Baiduspider",
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot",
  "Discordbot",
  "WhatsApp",
  "TelegramBot",
  "Applebot",
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Bytespider",
  "PetalBot",
  "YandexBot",
  "Amazonbot",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
  "DataForSeoBot",
  "SemrushBot",
  "AhrefsBot",
];

function isCrawler(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return CRAWLER_PATTERNS.some((p) => ua.includes(p.toLowerCase()));
}

// --- Metadata types ---
interface PageMeta {
  title: string;
  description: string;
  ogType?: "website" | "article";
  ogImage?: string;
  publishedTime?: string;
}

// --- Complete route-to-metadata registry ---
const META: Record<string, PageMeta> = {
  // ===== Core pages =====
  "/": {
    title: "Payment Provider Risk Profile | ChosePayments",
    description:
      "Find out which payment providers fit your business — and which ones to avoid. Free risk profile assessment with tiered provider matching.",
  },
  "/us": {
    title: "Payment Provider Advisory for US Businesses | ChosePayments",
    description:
      "Independent payment advisory helping US businesses find the right payment provider. Expert guidance on fees, risk, and provider selection.",
  },
  "/assessment": {
    title: "Payment Provider Assessment | ChosePayments",
    description:
      "Take our free assessment to find the best payment provider for your business. Get a personalised recommendation in minutes.",
  },
  "/recommendation": {
    title: "Your Payment Provider Recommendation | ChosePayments",
    description:
      "Your personalised payment provider recommendation based on your business profile.",
  },
  "/about": {
    title: "About ChosePayments | Independent Payment Advisory",
    description:
      "ChosePayments provides independent payment advisory services to help businesses understand and select appropriate payment providers.",
  },
  "/privacy": {
    title: "Privacy Policy | ChosePayments",
    description:
      "Privacy Policy for ChosePayments. Learn how we collect, use, and protect your personal data.",
  },
  "/terms": {
    title: "Terms of Service | ChosePayments",
    description:
      "Terms of Service for ChosePayments. Read our terms and conditions for using our payment provider advisory services.",
  },
  "/contact": {
    title: "Contact ChosePayments | Payment Advisory",
    description:
      "Get in touch with ChosePayments for independent payment advisory services.",
  },
  "/onboard-with-us": {
    title: "Onboard With Us | ChosePayments",
    description:
      "Start your onboarding with ChosePayments for expert payment provider advisory.",
  },

  // ===== SEO Content Pages =====
  "/best-payment-processor-uk": {
    title: "Best Payment Processor UK 2026 | ChosePayments",
    description:
      "Compare the best payment processors in the UK for 2026. Expert analysis of fees, features, and suitability for different business types.",
  },
  "/stripe-vs-square-vs-paypal-uk": {
    title: "Stripe vs Square vs PayPal UK: Honest Comparison | ChosePayments",
    description:
      "An honest comparison of Stripe, Square, and PayPal for UK businesses. Understand the real differences in fees, features, and risk.",
  },
  "/best-payment-api-uk": {
    title: "Best Payment API UK 2026 | ChosePayments",
    description:
      "Compare the best payment APIs in the UK for developers and businesses. Expert analysis of integration options, fees, and capabilities.",
  },
  "/payment-provider-hidden-fees": {
    title: "Payment Provider Hidden Fees Exposed | ChosePayments",
    description:
      "Uncover the hidden fees your payment provider charges. Learn about markup structures, cross-border fees, and how to calculate your real cost.",
  },
  "/switch-payment-provider": {
    title: "How to Switch Payment Provider Without Losing Revenue | ChosePayments",
    description:
      "A step-by-step guide to switching payment providers safely. Avoid downtime, protect recurring revenue, and negotiate better terms.",
  },
  "/best-payment-provider-small-business": {
    title: "Best Payment Provider for Small Business UK | ChosePayments",
    description:
      "Find the best payment provider for your small business. Compare options based on fees, ease of use, and growth potential.",
  },
  "/stripe-alternatives-marketplace": {
    title: "Stripe Alternatives for Marketplaces | ChosePayments",
    description:
      "Explore the best Stripe alternatives for marketplace businesses. Compare split payment support, compliance, and scalability.",
  },
  "/payment-provider-support": {
    title: "Why Payment Provider Support Matters | ChosePayments",
    description:
      "Customer support quality varies dramatically between payment providers. Learn why it matters and how to evaluate it.",
  },
  "/marketplace-payment-provider": {
    title: "Best Marketplace Payment Providers | ChosePayments",
    description:
      "Compare payment providers purpose-built for marketplaces. Split payments, seller onboarding, and compliance handled.",
  },
  "/choose-payment-provider": {
    title: "How to Choose a Payment Provider | ChosePayments",
    description:
      "A framework for choosing the right payment provider. Go beyond headline rates and evaluate what actually matters.",
  },

  // ===== Insights hub =====
  "/insights": {
    title: "Payment Insights & Guides | ChosePayments",
    description:
      "Expert insights on payment processing, provider selection, risk management, and compliance for UK businesses.",
  },
  "/insights/payment-risk": {
    title: "Payment Risk Insights | ChosePayments",
    description:
      "Understand payment risk triggers, account freezes, and how to protect your payment processing.",
    ogType: "article",
  },
  "/insights/guides": {
    title: "Payment Guides | ChosePayments",
    description:
      "Practical guides on payment processing, chargebacks, compliance, and provider management.",
    ogType: "article",
  },
  "/insights/case-studies": {
    title: "Payment Case Studies | ChosePayments",
    description:
      "Real-world case studies showing how businesses solved payment challenges.",
    ogType: "article",
  },
  "/insights/graph": {
    title: "Insights Knowledge Graph | ChosePayments",
    description:
      "Interactive knowledge graph showing how payment concepts connect across our insights library.",
  },
  "/insights/scoring-logic": {
    title: "How We Match You to a Provider | Scoring Logic | ChosePayments",
    description:
      "Full transparency into how our recommendation engine scores and ranks payment providers. See the elimination rules, scoring dimensions, and risk appetite matrix.",
  },

  // ===== Fees & Costs =====
  "/insights/stripe-fees-explained": {
    title: "Stripe Fees Explained: What Businesses Actually Pay | ChosePayments",
    description:
      "A complete breakdown of Stripe's pricing for UK businesses. Understand card processing fees, Connect costs, payout charges, and hidden fees.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/checkout-com-fees-explained": {
    title: "Checkout.com Fees Explained: What Businesses Actually Pay | ChosePayments",
    description:
      "A clear breakdown of Checkout.com's negotiated pricing model, including card processing fees, international costs, and chargebacks.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/fiserv-clover-pricing-explained": {
    title: "Fiserv and Clover Pricing Explained | ChosePayments",
    description:
      "A clear breakdown of Fiserv and Clover pricing for resellers, ISVs, and multi-location businesses.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/adyen-pricing-explained": {
    title: "Adyen Pricing Explained: How Fees Really Work | ChosePayments",
    description:
      "A clear breakdown of Adyen's interchange plus pricing model, how fees are structured, and when Adyen pricing makes sense.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/paypal-fees-explained": {
    title: "PayPal Pricing Explained for UK Businesses | ChosePayments",
    description:
      "A clear breakdown of PayPal's blended pricing model for UK businesses and how fees compare to Adyen's interchange-plus model.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Pricing Models =====
  "/insights/pricing-models/interchange-plus-plus": {
    title: "Interchange++ Pricing Explained | ChosePayments",
    description:
      "The expert guide to Interchange++ pricing: what it really is, why it's an underwriting outcome not a menu option, and how to know if you qualify.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/pricing-models/blended-vs-interchange": {
    title: "Blended vs Interchange++: Expert Pricing Guide | ChosePayments",
    description:
      "Discover the strategic trade off between blended pricing and Interchange++. Learn which model fits your business.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Crisis Intervention =====
  "/insights/crisis": {
    title: "Crisis Intervention Guides | ChosePayments",
    description:
      "Urgent guides for merchants dealing with frozen accounts, hidden fees, or provider rejections. Practical steps to recover and find the right payment partner.",
  },
  "/insights/crisis/stripe-account-frozen": {
    title: "Stripe Account Frozen? 5 Hidden Reasons Why | ChosePayments",
    description:
      "Funds frozen? Learn the 5 hidden triggers that cause account freezes, immediate recovery steps, and how to find a stable long-term provider.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/crisis/rejected-high-risk-strategy": {
    title: "Rejected by Stripe or Square? Recovery Plan | ChosePayments",
    description:
      "Rejected by a major payment provider? Learn why the 'high-risk' label is not a judgment and how to find a provider that actually wants your business.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/crisis/hidden-fee-crisis": {
    title: "Hidden Fee Crisis: How Your Low Rate Costs Thousands | ChosePayments",
    description:
      "Your headline rate isn't your real cost. Learn how to calculate your Effective Rate and uncover the 5 hidden fees draining your profits.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Compliance =====
  "/insights/proof-of-business-activity": {
    title: "Proof of Business Activity Requests Explained | ChosePayments",
    description:
      "Understanding why payment providers ask for proof of business activity and how to prepare.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/sales-increase": {
    title: "Sales Growth Triggers Document Requests | ChosePayments",
    description:
      "Learn why sudden sales growth triggers additional document requests from payment providers.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/marketplace-seller-info": {
    title: "Marketplace Seller Verification Explained | ChosePayments",
    description:
      "Why marketplace businesses face additional verification for seller and payout information.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/source-of-funds": {
    title: "Source of Funds Requests Explained | ChosePayments",
    description:
      "Learn why providers request bank statements and source of funds documentation.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/industry-verification": {
    title: "High-Risk Industry Verification Requirements | ChosePayments",
    description:
      "Understanding why certain industries face additional verification requirements from payment providers.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/international-sales": {
    title: "International Sales and Payment Provider Checks | ChosePayments",
    description:
      "Learn why selling internationally can trigger additional verification from payment providers.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/contracts-invoices": {
    title: "Document Requests: Contracts, Invoices, Agreements | ChosePayments",
    description:
      "Understanding why payment providers request contracts and customer agreements.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-payment-providers-ask-for-director-documents": {
    title: "Director ID Verification Explained | ChosePayments",
    description:
      "Understand why payment providers request director documents and how to respond effectively.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-payment-providers-ask-for-source-of-funds": {
    title: "Source of Funds Verification Explained | ChosePayments",
    description:
      "Understand why payment providers request source of funds documentation and how to respond effectively.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/payment-scheme-rules-explained": {
    title: "Payment Scheme Rules Explained | ChosePayments",
    description:
      "Learn what payment scheme rules are, how flow down provisions work, and why the rules set by Visa and Mastercard often matter more than your provider contract.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/scheme-rules-reserves-monitoring": {
    title: "How Scheme Rules Trigger Reserves and Monitoring | ChosePayments",
    description:
      "Learn how card network thresholds from Visa and Mastercard trigger reserves, monitoring programs, and account reviews.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/scheme-rules-by-payment-method": {
    title: "Scheme Rules by Payment Method Explained | ChosePayments",
    description:
      "Scheme rules do not apply identically across payment methods. Learn how cards, wallets, marketplaces and BNPL each carry different requirements.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Risk =====
  "/insights/why-stripe-freezes-accounts-uk": {
    title: "Stripe Account Freezes UK: Triggers and Prevention | ChosePayments",
    description:
      "Stripe does not freeze accounts at random. Learn the common triggers and how to prevent them.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-accounts-get-flagged-after-growth": {
    title: "Growth Triggers Account Reviews | ChosePayments",
    description:
      "Rapid growth is one of the most common reasons payment accounts are reviewed.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-payment-accounts-get-frozen-without-warning": {
    title: "Account Freezes Without Warning Explained | ChosePayments",
    description:
      "Payment providers are not always able to warn merchants before taking action. Learn what triggers sudden freezes.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/marketplace-payments-guide": {
    title: "The Marketplace Founder's Guide to Payment Processing | ChosePayments",
    description:
      "Marketplaces introduce additional layers of risk for payment providers. Learn what they look for.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-providers-re-underwrite-accounts": {
    title: "Re-Underwriting Explained | ChosePayments",
    description:
      "Approval is not a one-time event. Learn why providers periodically re-underwrite accounts.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-some-businesses-never-get-approved": {
    title: "Why Some Businesses Struggle to Get Approved | ChosePayments",
    description:
      "Not all businesses are declined because they are doing something wrong. Learn the real reasons.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-payment-accounts-get-flagged-after-growth": {
    title: "Growth-Related Account Flags Explained | ChosePayments",
    description:
      "Redirects to the consolidated article on growth-related account flags.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-providers-re-underwrite-existing-accounts": {
    title: "Re-Underwriting Existing Accounts | ChosePayments",
    description:
      "Redirects to the consolidated article on provider re-underwriting.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-payment-providers-reject-growing-businesses": {
    title: "Why Providers Reject Growing Businesses | ChosePayments",
    description:
      "Understand why payment providers reject growing businesses and what you can fix before applying.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Explainers =====
  "/insights/visa-mastercard-control-card-payments": {
    title: "Visa and Mastercard Control Card Payments | ChosePayments",
    description:
      "Learn how Visa and Mastercard control the card payment system and what UK and EU businesses can realistically do.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/what-is-an-acquirer": {
    title: "What Is an Acquirer and Why It Matters | ChosePayments",
    description:
      "Understand what an acquirer is, how they connect payment providers to card networks, and why this affects your business.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/payment-provider-vs-acquirer-vs-bank": {
    title: "Payment Provider vs Acquirer vs Bank | ChosePayments",
    description:
      "Learn who does what in card payments, how long each step takes, and why money moves slower than transactions.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/why-card-approval-speed-affects-checkout-abandonment": {
    title: "Card Approval Speed and Checkout Abandonment | ChosePayments",
    description:
      "Learn why card approval speed matters for conversion rates and how delays cause checkout abandonment.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/same-day-settlement-and-instant-payouts": {
    title: "Same-Day Settlement and Instant Payouts | ChosePayments",
    description:
      "Learn how same-day settlement and instant payouts work, when they help businesses, and the trade-offs involved.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/tra-exemption-reduces-payment-friction": {
    title: "TRA Exemption Reduces Payment Friction | ChosePayments",
    description:
      "Learn how TRA Exemption reduces checkout friction, improves approval rates, and affects conversion for UK and EU businesses.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/credit-card-payments-explained": {
    title: "Credit Card Payments Explained | ChosePayments",
    description:
      "Credit card payments carry more risk and scrutiny than any other payment method. Learn how providers judge card-heavy businesses.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/open-banking-payments-uk": {
    title: "Open Banking Payments in the UK | ChosePayments",
    description:
      "Learn how Open Banking payments work in the UK, why providers see them as lower risk, and where they improve payment performance.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/apple-pay-google-pay-explained": {
    title: "Apple Pay and Google Pay Explained | ChosePayments",
    description:
      "Learn how Apple Pay and Google Pay improve transaction security, reduce chargebacks, and increase conversion rates.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/low-value-transaction-exemption": {
    title: "Low Value Transaction Exemption Explained | ChosePayments",
    description:
      "Learn how the Low Value Transaction exemption under SCA rules can improve card approval rates and boost conversion.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/payment-provider-risk-models": {
    title: "Payment Provider Risk Models Explained | ChosePayments",
    description:
      "Learn why two similar businesses get very different outcomes from payment providers. Understand how risk models work.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/wallet-payments-guaranteed-success": {
    title: "The Only Payment Method With 100% Success Rate | ChosePayments",
    description:
      "Wallet payments are the only method that can reach a 100% success rate. Learn why and when wallets make sense.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/payment-acronyms-explained": {
    title: "Payment Acronyms Merchants Need to Know | ChosePayments",
    description:
      "A clear guide to the payment acronyms that affect approval, cash flow, and costs.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Guides =====
  "/insights/what-to-do-when-provider-asks-for-documents": {
    title: "What To Do When Provider Asks for Documents | ChosePayments",
    description:
      "Learn why document requests happen, what they usually mean, and how to respond with confidence.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/chargebacks-what-they-are-and-how-to-avoid-them": {
    title: "Chargebacks: Why They Happen and How to Avoid Them | ChosePayments",
    description:
      "Chargebacks cost merchants billions every year. Learn why they happen, how much they really cost, and how to reduce them.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/referral-commission-guide": {
    title: "How to Earn Commission Referring Payment Providers | ChosePayments",
    description:
      "Learn how platforms, agencies, and consultants can earn ongoing revenue share by making qualified payment provider introductions.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Provider Deep Dives =====
  "/insights/adyen-enterprise-payments-platform": {
    title: "Adyen Enterprise Payments Platform | ChosePayments",
    description:
      "How Adyen's unified approach to acquiring, gateway, and risk management is transforming global commerce.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/stripe-payment-platform": {
    title: "Stripe: The Engine of Modern Internet Economy | ChosePayments",
    description:
      "How Stripe's API-first approach and unified financial infrastructure revolutionized digital commerce.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/checkout-com-enterprise-platform": {
    title: "Checkout.com Enterprise Platform | ChosePayments",
    description:
      "How Checkout.com's modular architecture delivers superior authorization rates for high growth global merchants.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/shift4-payments-platform": {
    title: "Shift4 Payments Platform | ChosePayments",
    description:
      "Learn what Shift4 offers, who they serve best, and why they matter for businesses choosing a long term payment partner.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/enterprise-provider-comparison": {
    title: "Enterprise Payment Providers Compared | ChosePayments",
    description:
      "A founder-level comparison of Adyen, Shift4, and Checkout.com. Real differences in risk appetite, underwriting, and operational fit.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/fiserv-payments-platform": {
    title: "Fiserv and First Data Legacy | ChosePayments",
    description:
      "Fiserv operates across acquiring, issuing, bank infrastructure, and Clover POS. Learn where it fits and where friction appears.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/adyen-vs-first-data": {
    title: "Adyen vs First Data Comparison | ChosePayments",
    description:
      "A strategic comparison of Adyen's unified global platform versus First Data's bank led acquiring infrastructure.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
  "/insights/paypal-payment-platform": {
    title: "PayPal Payment Platform | ChosePayments",
    description:
      "Understand where PayPal fits in the payments landscape, how its consumer trust drives conversion, and which businesses benefit most.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },

  // ===== Legacy/alias article (Stripe frozen guide) =====
  "/insights/stripe-account-frozen-guide": {
    title: "Stripe Account Frozen Guide | ChosePayments",
    description:
      "Funds held by Stripe? Learn the 5 hidden risk triggers that cause freezes and how to find a stable provider.",
    ogType: "article",
    publishedTime: "2026-01-01",
  },
};

// Default metadata for unknown paths
const DEFAULT_META: PageMeta = {
  title: "ChosePayments | Independent Payment Advisory",
  description:
    "Independent payment advisory helping businesses find the right payment provider. Expert guidance on fees, risk, and provider selection.",
};

// --- HTML builder ---
function buildHTML(path: string, meta: PageMeta): string {
  const canonicalUrl = `${BASE_URL}${path}`;
  const ogType = meta.ogType || "website";
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;

  let articleTags = "";
  if (ogType === "article") {
    if (meta.publishedTime) {
      articleTags += `\n  <meta property="article:published_time" content="${meta.publishedTime}">`;
    }
    articleTags += `\n  <meta property="article:author" content="ChosePayments">`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(meta.title)}</title>
  <meta name="description" content="${escapeHtml(meta.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(meta.title)}">
  <meta property="og:description" content="${escapeHtml(meta.description)}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:site_name" content="ChosePayments">${articleTags}

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(meta.description)}">
  <meta name="twitter:image" content="${ogImage}">

  <!-- Redirect non-crawlers to real SPA -->
  <meta http-equiv="refresh" content="0;url=${canonicalUrl}">
</head>
<body>
  <h1>${escapeHtml(meta.title)}</h1>
  <p>${escapeHtml(meta.description)}</p>
  <p><a href="${canonicalUrl}">Continue to ChosePayments</a></p>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// --- Edge function handler ---
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    // Accept path as query param or from x-original-path header (for CDN proxy)
    let path =
      url.searchParams.get("path") ||
      req.headers.get("x-original-path") ||
      "/";

    // Normalize: remove trailing slash (except root)
    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    const userAgent = req.headers.get("user-agent") || "";
    const meta = META[path] || DEFAULT_META;

    // Always return the HTML with meta tags (useful for social preview testing)
    // But for non-crawlers, the meta refresh tag will redirect them immediately
    if (isCrawler(userAgent)) {
      // Crawlers get the full meta HTML
      return new Response(buildHTML(path, meta), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      });
    }

    // Non-crawlers: 302 redirect to the real SPA page
    const redirectUrl = `${BASE_URL}${path}`;
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: redirectUrl,
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
