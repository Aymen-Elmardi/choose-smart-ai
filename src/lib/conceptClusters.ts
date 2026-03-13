// Concept-based clustering for SEO internal linking
// Groups articles by semantic concepts to help Google understand topical relationships

export type ConceptCluster = 
  | "risk" 
  | "approval" 
  | "provider-behaviour" 
  | "payment-methods";

export interface ConceptArticle {
  slug: string;
  title: string;
  shortTitle: string; // For inline links
  concepts: ConceptCluster[];
  keywords: string[]; // For matching within article content
}

/**
 * Master article registry with concept mappings.
 * Each article can belong to multiple concept clusters.
 */
export const conceptArticles: ConceptArticle[] = [
  // === RISK CLUSTER ===
  // Articles about account freezes, flags, reserves, chargebacks
  {
    slug: "why-stripe-freezes-accounts-uk",
    title: "Stripe Account Freezes in the UK: Common Triggers and Prevention",
    shortTitle: "Why Stripe Freezes Accounts",
    concepts: ["risk", "provider-behaviour"],
    keywords: ["freeze", "frozen", "stripe", "account freeze", "funds held", "stripe frozen"]
  },
  {
    slug: "crisis/stripe-account-frozen",
    title: "Stripe Account Frozen? The 5 Hidden Reasons Why",
    shortTitle: "Stripe Account Frozen Recovery",
    concepts: ["risk"],
    keywords: ["frozen", "freeze", "stripe frozen", "funds frozen", "reserve"]
  },
  {
    slug: "why-payment-accounts-get-frozen-without-warning",
    title: "Account Freezes Without Warning: What Triggers Them",
    shortTitle: "Why Accounts Freeze Without Warning",
    concepts: ["risk", "provider-behaviour"],
    keywords: ["freeze", "frozen", "warning", "sudden freeze", "without notice"]
  },
  {
    slug: "chargebacks-what-they-are-and-how-to-avoid-them",
    title: "Chargebacks: Why They Happen and How to Avoid Them",
    shortTitle: "Understanding Chargebacks",
    concepts: ["risk"],
    keywords: ["chargeback", "dispute", "fraud", "chargeback rate", "dispute rate", "too many chargebacks", "what is a chargeback fee", "how do chargebacks work"]
  },
  {
    slug: "provider-appetite-index",
    title: "The Provider Appetite Index: Why Payment Processors Say No",
    shortTitle: "Provider Appetite Index",
    concepts: ["approval", "risk", "provider-behaviour"],
    keywords: ["appetite", "underwriting", "rejected", "declined", "MATCH", "high-risk", "merchant account declined", "provider approval"]
  },
  {
    slug: "why-payment-accounts-get-flagged-without-changes",
    title: "Account Flagged Without Changes? What Providers React To",
    shortTitle: "Why Accounts Get Flagged",
    concepts: ["risk", "provider-behaviour"],
    keywords: ["flagged", "flag", "review", "flagged account", "under review"]
  },
  {
    slug: "crisis/hidden-fee-crisis",
    title: "The Hidden Fee Crisis: How Low Rate Processors Cost You Thousands",
    shortTitle: "Hidden Fee Crisis",
    concepts: ["risk"],
    keywords: ["hidden fees", "effective rate", "hidden charges", "real cost"]
  },

  // === APPROVAL CLUSTER ===
  // Articles about getting approved, underwriting, rejection, growing businesses
  {
    slug: "crisis/rejected-high-risk-strategy",
    title: "Rejected by Stripe or Square? Strategic Recovery Plan",
    shortTitle: "Rejected Merchant Recovery",
    concepts: ["approval", "provider-behaviour"],
    keywords: ["rejected", "declined", "high risk", "approval", "denied"]
  },
  {
    slug: "why-some-businesses-never-get-approved",
    title: "Why Some Businesses Struggle to Get Approved",
    shortTitle: "Why Businesses Struggle to Get Approved",
    concepts: ["approval"],
    keywords: ["approved", "approval", "never approved", "declined", "rejection"]
  },
  {
    slug: "why-payment-providers-reject-growing-businesses",
    title: "Why Payment Providers Reject Growing Businesses",
    shortTitle: "Why Providers Reject Growing Businesses",
    concepts: ["approval", "provider-behaviour"],
    keywords: ["reject", "rejection", "growing", "scale", "growth rejection"]
  },
  {
    slug: "why-accounts-get-flagged-after-growth",
    title: "Sudden Growth Can Trigger Account Reviews",
    shortTitle: "Growth Triggers Account Reviews",
    concepts: ["approval", "risk"],
    keywords: ["growth", "scaling", "volume increase", "rapid growth", "spike"]
  },
  {
    slug: "why-payment-accounts-get-flagged-after-growth",
    title: "Growth Related Account Flags: What Triggers Them",
    shortTitle: "Growth Related Account Flags",
    concepts: ["approval", "risk"],
    keywords: ["growth", "flagged", "scaling", "volume", "transaction spike"]
  },
  {
    slug: "tra-exemption-reduces-payment-friction",
    title: "TRA Exemption: How It Reduces Payment Friction",
    shortTitle: "TRA Exemption Explained",
    concepts: ["approval", "payment-methods"],
    keywords: ["TRA", "tra exemption", "tra exemptions", "transaction risk analysis", "exemption", "approval rate", "SCA"]
  },
  {
    slug: "low-value-transaction-exemption",
    title: "Low Value Transaction Exemption: Higher Approval Rates",
    shortTitle: "LVT Exemption Explained",
    concepts: ["approval", "payment-methods"],
    keywords: ["LVT", "low value", "exemption", "small payments", "approval rate"]
  },
  {
    slug: "why-card-approval-speed-affects-checkout-abandonment",
    title: "Card Approval Speed and Checkout Abandonment",
    shortTitle: "Approval Speed and Abandonment",
    concepts: ["approval"],
    keywords: ["approval speed", "abandonment", "checkout", "conversion", "fast approval"]
  },

  // === PROVIDER BEHAVIOUR CLUSTER ===
  // Articles about how providers operate, underwriting, re-reviews
  {
    slug: "why-providers-re-underwrite-accounts",
    title: "Re Underwriting: When Providers Review Existing Accounts",
    shortTitle: "Why Providers Re Underwrite",
    concepts: ["provider-behaviour", "risk"],
    keywords: ["re-underwrite", "underwriting", "review", "periodic review", "account review"]
  },
  {
    slug: "why-providers-re-underwrite-existing-accounts",
    title: "When Providers Re Underwrite Existing Accounts",
    shortTitle: "Re Underwriting Existing Accounts",
    concepts: ["provider-behaviour"],
    keywords: ["re-underwrite", "existing account", "review", "renewal", "reassessment"]
  },
  {
    slug: "why-marketplaces-get-extra-scrutiny",
    title: "Marketplaces Face Extra Scrutiny: What Providers Look For",
    shortTitle: "Marketplace Scrutiny",
    concepts: ["provider-behaviour", "risk"],
    keywords: ["marketplace", "scrutiny", "platform", "seller", "multi-party"]
  },
  {
    slug: "what-to-do-when-provider-asks-for-documents",
    title: "When a Payment Provider Asks for More Documents",
    shortTitle: "Handling Document Requests",
    concepts: ["provider-behaviour"],
    keywords: ["documents", "verification", "document request", "KYB", "compliance"]
  },
  {
    slug: "source-of-funds",
    title: "Source of Funds Requests: What They Mean",
    shortTitle: "Source of Funds Explained",
    concepts: ["provider-behaviour"],
    keywords: ["source of funds", "bank statement", "AML", "money origin", "why is bank asking for source of funds"]
  },
  {
    slug: "why-payment-providers-ask-for-source-of-funds",
    title: "Understanding Source of Funds Verification",
    shortTitle: "Source of Funds Verification",
    concepts: ["provider-behaviour"],
    keywords: ["source of funds", "verification", "AML", "compliance", "why is bank asking for source of funds"]
  },
  {
    slug: "why-payment-providers-ask-for-director-documents",
    title: "Director ID Verification: What Providers Ask For",
    shortTitle: "Director Verification",
    concepts: ["provider-behaviour"],
    keywords: ["director", "ID verification", "UBO", "beneficial owner", "KYC"]
  },
  {
    slug: "proof-of-business-activity",
    title: "Understanding Proof of Business Activity Requests",
    shortTitle: "Proof of Business Activity",
    concepts: ["provider-behaviour"],
    keywords: ["proof of business", "business activity", "website", "invoices"]
  },
  {
    slug: "industry-verification",
    title: "High Risk Industries Face Extra Verification",
    shortTitle: "High Risk Industry Verification",
    concepts: ["provider-behaviour", "approval"],
    keywords: ["high risk", "industry", "MCC", "restricted", "prohibited"]
  },

  // === PAYMENT METHODS CLUSTER ===
  // Articles about card payments, wallets, open banking, settlement
  {
    slug: "apple-pay-google-pay-explained",
    title: "Apple Pay and Google Pay: Faster Checkout, Lower Risk",
    shortTitle: "Apple Pay and Google Pay",
    concepts: ["payment-methods", "approval"],
    keywords: ["apple pay", "google pay", "wallet", "tokenisation", "mobile payments"]
  },
  {
    slug: "open-banking-payments-uk",
    title: "Open Banking Payments: Faster Settlement, Lower Risk",
    shortTitle: "Open Banking Payments",
    concepts: ["payment-methods"],
    keywords: ["open banking", "bank transfer", "A2A", "instant payment", "direct debit"]
  },
  {
    slug: "credit-card-payments-explained",
    title: "Credit Card Payments: Approval, Risk, and Business Growth",
    shortTitle: "Credit Card Payments Explained",
    concepts: ["payment-methods", "risk"],
    keywords: ["credit card", "card payment", "interchange", "card scheme", "card network"]
  },
  {
    slug: "same-day-settlement-and-instant-payouts",
    title: "Same Day Settlement and Instant Payouts",
    shortTitle: "Same Day Settlement",
    concepts: ["payment-methods"],
    keywords: ["settlement", "payout", "instant payout", "same day", "same day settlement advice", "cash flow"]
  },
  {
    slug: "visa-mastercard-control-card-payments",
    title: "Visa and Mastercard Control Card Payments",
    shortTitle: "Visa and Mastercard Control",
    concepts: ["payment-methods", "provider-behaviour"],
    keywords: ["visa", "mastercard", "visa transaction controls", "card scheme", "network rules", "scheme fees"]
  },
  {
    slug: "what-is-an-acquirer",
    title: "What Is an Acquirer and Why Your Provider Needs One",
    shortTitle: "What Is an Acquirer",
    concepts: ["payment-methods", "provider-behaviour"],
    keywords: ["acquirer", "acquiring bank", "merchant acquirer", "settlement"]
  },
  {
    slug: "payment-provider-vs-acquirer-vs-bank",
    title: "Payment Provider vs Acquirer vs Bank",
    shortTitle: "Provider vs Acquirer vs Bank",
    concepts: ["payment-methods", "provider-behaviour"],
    keywords: ["acquirer", "provider", "bank", "payment flow", "money movement"]
  },

  // === PRICING (spans multiple clusters) ===
  {
    slug: "pricing-models/interchange-plus-plus",
    title: "Interchange++ Pricing Explained",
    shortTitle: "Interchange++ Pricing",
    concepts: ["provider-behaviour"],
    keywords: ["interchange++", "IC++", "pricing", "transparent pricing", "cost plus"]
  },
  {
    slug: "pricing-models/blended-vs-interchange",
    title: "Blended vs Interchange++ Pricing Strategy",
    shortTitle: "Blended vs Interchange++",
    concepts: ["provider-behaviour"],
    keywords: ["blended", "interchange", "pricing strategy", "fixed rate", "variable rate"]
  },

  // === PROVIDER DEEP DIVES ===
  {
    slug: "adyen-enterprise-payments-platform",
    title: "Adyen: The Single Platform Approach",
    shortTitle: "Adyen Platform",
    concepts: ["provider-behaviour"],
    keywords: ["adyen", "adyen payments", "adyen payment gateway", "adyen marketplace", "adyen unified commerce", "enterprise", "single platform", "acquiring"]
  },
  {
    slug: "stripe-payment-platform",
    title: "Stripe: The Modern Internet Economy Engine",
    shortTitle: "Stripe Platform",
    concepts: ["provider-behaviour"],
    keywords: ["stripe", "stripe pricing", "API", "developer", "platform"]
  },
  {
    slug: "checkout-com-enterprise-platform",
    title: "Checkout.com: High Performance for Global Ambition",
    shortTitle: "Checkout.com Platform",
    concepts: ["provider-behaviour"],
    keywords: ["checkout.com", "checkout.com api", "enterprise", "global", "authorization"]
  },
  {
    slug: "shift4-payments-platform",
    title: "Shift4: The Global Payments Giant",
    shortTitle: "Shift4 Platform",
    concepts: ["provider-behaviour"],
    keywords: ["shift4", "shift4 payments", "what does shift4 do", "hospitality", "entertainment", "POS"]
  },
  {
    slug: "fiserv-payments-platform",
    title: "Fiserv and the First Data Legacy",
    shortTitle: "Fiserv Platform",
    concepts: ["provider-behaviour"],
    keywords: ["fiserv", "first data", "fiserv first data", "first data payment processing", "clover", "bank infrastructure"]
  },
  {
    slug: "adyen-vs-first-data",
    title: "Adyen vs First Data: Two Different Payment Models",
    shortTitle: "Adyen vs First Data",
    concepts: ["provider-behaviour", "approval"],
    keywords: ["adyen", "first data", "fiserv", "fiserv first data", "comparison", "platform model", "bank acquiring"]
  },
  {
    slug: "enterprise-provider-comparison",
    title: "Enterprise Payment Providers: Strength Comparison",
    shortTitle: "Enterprise Provider Comparison",
    concepts: ["provider-behaviour", "approval"],
    keywords: ["comparison", "enterprise", "enterprise payment approval platforms comparison", "enterprise payment api global coverage comparison", "adyen", "checkout.com", "shift4"]
  },
  {
    slug: "paypal-payment-platform",
    title: "PayPal: From Online Payments Pioneer to Global Consumer Network",
    shortTitle: "PayPal Platform",
    concepts: ["provider-behaviour"],
    keywords: ["paypal", "paypal payments", "paypal business", "paypal checkout", "paypal wallet", "paypal conversion"]
  },
  {
    slug: "payment-acronyms-explained",
    title: "Payment Acronyms Merchants Need to Understand",
    shortTitle: "Payment Acronyms Explained",
    concepts: ["approval", "risk", "payment-methods"],
    keywords: ["acronyms", "MCC", "SCA", "TRA", "MATCH list", "chargeback ratio", "settlement", "payout", "rolling reserve", "interchange", "PCI DSS", "3DS"]
  },
  {
    slug: "scheme-rules-reserves-monitoring",
    title: "How Scheme Rules Trigger Reserves, Monitoring Programs and Account Reviews",
    shortTitle: "Scheme Rules and Reserves",
    concepts: ["risk", "provider-behaviour"],
    keywords: ["scheme rules", "reserves", "monitoring programs", "chargeback thresholds", "account reviews", "rolling reserves"]
  },
  {
    slug: "payment-provider-risk-models",
    title: "Payment Provider Risk Models Explained",
    shortTitle: "Risk Models Explained",
    concepts: ["risk", "approval", "provider-behaviour"],
    keywords: ["risk model", "risk scoring", "underwriting", "static risk", "behavioural risk", "merchant risk"]
  },
  {
    slug: "scheme-rules-by-payment-method",
    title: "When Scheme Rules Apply Differently: Cards, Wallets, Marketplaces and BNPL",
    shortTitle: "Scheme Rules by Payment Method",
    concepts: ["risk", "payment-methods", "provider-behaviour"],
    keywords: ["scheme rules", "BNPL", "marketplace", "wallet", "stored credentials", "recurring billing", "payment facilitator"]
  },

  // === E-COMMERCE ===
  {
    slug: "ecommerce/high-risk-to-high-growth",
    title: "From High-Risk to High-Growth: A Strategic Guide to eCommerce Payment Processing",
    shortTitle: "High-Risk eCommerce Guide",
    concepts: ["risk", "approval", "provider-behaviour"],
    keywords: ["high risk ecommerce", "ecommerce payment", "high growth", "online business", "ecommerce processor", "high risk merchant"]
  }
];

/**
 * Cluster metadata for display and SEO
 */
export const clusterMeta: Record<ConceptCluster, { title: string; description: string }> = {
  risk: {
    title: "Risk & Account Protection",
    description: "Account freezes, chargebacks, flags, and how to protect your payment setup"
  },
  approval: {
    title: "Approval & Authorisation",
    description: "Getting approved, staying approved, and maximising transaction success rates"
  },
  "provider-behaviour": {
    title: "How Providers Operate",
    description: "Understanding underwriting, reviews, document requests, and provider decisions"
  },
  "payment-methods": {
    title: "Payment Methods & Infrastructure",
    description: "Cards, wallets, open banking, and how different payment methods affect your business"
  }
};

/**
 * Get related articles from the same concept cluster(s)
 * Returns up to `limit` articles that share concepts with the current article
 */
export const getConceptRelatedArticles = (
  currentSlug: string,
  limit: number = 3
): ConceptArticle[] => {
  const currentArticle = conceptArticles.find(a => a.slug === currentSlug);
  if (!currentArticle) return [];

  // Score articles by how many concepts they share
  const scored = conceptArticles
    .filter(a => a.slug !== currentSlug)
    .map(article => {
      const sharedConcepts = article.concepts.filter(c => 
        currentArticle.concepts.includes(c)
      );
      return { article, score: sharedConcepts.length };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ article }) => article);
};

/**
 * Get all articles in a specific concept cluster
 */
export const getArticlesByCluster = (cluster: ConceptCluster): ConceptArticle[] => {
  return conceptArticles.filter(a => a.concepts.includes(cluster));
};

/**
 * Find articles matching a keyword (for inline linking suggestions)
 */
export const findArticleByKeyword = (keyword: string): ConceptArticle | undefined => {
  const lowerKeyword = keyword.toLowerCase();
  return conceptArticles.find(article =>
    article.keywords.some(k => lowerKeyword.includes(k.toLowerCase()))
  );
};

/**
 * Build full URL for an article
 */
export const buildConceptArticleUrl = (slug: string): string => {
  return `/insights/${slug}`;
};

/**
 * Get the primary concept cluster for an article
 */
export const getPrimaryCluster = (slug: string): ConceptCluster | undefined => {
  const article = conceptArticles.find(a => a.slug === slug);
  return article?.concepts[0];
};
