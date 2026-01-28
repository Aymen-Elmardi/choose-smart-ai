// Insights article data - extracted from Insights.tsx for reusability
// Used by the Insights page, sitemap generation, and search

export type InsightCategory = "all" | "risk" | "guides" | "compliance" | "explainer" | "providers" | "crisis" | "pricing";

export interface Insight {
  title: string;
  slug: string;
  description: string;
  category: InsightCategory;
  readTime: string;
  /** If true, the article uses /insights/crisis/ or /insights/pricing-models/ URL structure */
  isSubfolder?: boolean;
}

/**
 * Featured insights by category - shown prominently on the Insights page
 */
export const featuredInsights: Record<InsightCategory, Insight> = {
  all: {
    title: "Account Flagged Without Changes? Here's What Providers Are Reacting To",
    slug: "why-payment-accounts-get-flagged-without-changes",
    description: "Learn why payment accounts get flagged or reviewed even when nothing changed and how to reduce friction.",
    category: "risk",
    readTime: "6 min read"
  },
  crisis: {
    title: "Stripe Account Frozen? The 5 Hidden Reasons Why & How to Prevent the Next Freeze",
    slug: "crisis/stripe-account-frozen",
    description: "Funds frozen? Learn the 5 hidden triggers that cause account freezes, immediate recovery steps, and how to find a stable long-term provider.",
    category: "crisis",
    readTime: "8 min read",
    isSubfolder: true
  },
  pricing: {
    title: "Interchange++ Pricing Explained (And Why Most Businesses Never Qualify)",
    slug: "pricing-models/interchange-plus-plus",
    description: "The expert guide to Interchange++ pricing: what it really is, why it's an underwriting outcome not a menu option, and how to know if you actually qualify.",
    category: "pricing",
    readTime: "8 min read",
    isSubfolder: true
  },
  risk: {
    title: "Stripe Account Frozen? 5 Hidden Reasons Why & How to Prevent the Next Freeze",
    slug: "stripe-account-frozen-guide",
    description: "Funds held by Stripe? Learn the 5 hidden risk triggers that cause freezes and how to find a stable provider.",
    category: "risk",
    readTime: "8 min read"
  },
  guides: {
    title: "Chargebacks: Why They Happen, How Much They Really Cost, and How Merchants Can Avoid Them",
    slug: "chargebacks-what-they-are-and-how-to-avoid-them",
    description: "Chargebacks cost merchants billions every year and put payment accounts at risk. Learn why they happen and how to reduce them.",
    category: "guides",
    readTime: "8 min read"
  },
  compliance: {
    title: "Understanding Proof of Business Activity Requests",
    slug: "proof-of-business-activity",
    description: "Understanding why payment providers ask for proof of business activity and how to prepare.",
    category: "compliance",
    readTime: "4 min read"
  },
  explainer: {
    title: "What Is an Acquirer and Why Your Payment Provider Needs One",
    slug: "what-is-an-acquirer",
    description: "Understand what an acquirer is, how they connect payment providers to card networks, and why this relationship affects your business.",
    category: "explainer",
    readTime: "6 min read"
  },
  providers: {
    title: "Adyen: The Single Platform That Rewrote the Enterprise Payments Playbook",
    slug: "adyen-enterprise-payments-platform",
    description: "How Adyen's unified approach to acquiring, gateway, and risk management is transforming global commerce for the world's largest brands.",
    category: "providers",
    readTime: "10 min read"
  }
};

/**
 * Filter tabs for the Insights page
 */
export const filterTabs: { label: string; value: InsightCategory }[] = [
  { label: "All", value: "all" },
  { label: "Crisis Intervention", value: "crisis" },
  { label: "Pricing Models", value: "pricing" },
  { label: "Provider Deep Dives", value: "providers" },
  { label: "Risk & Freezes", value: "risk" },
  { label: "Guides", value: "guides" },
  { label: "Compliance", value: "compliance" },
  { label: "Explainers", value: "explainer" }
];

/**
 * Category labels for display
 */
export const categoryLabels: Record<InsightCategory, string> = {
  all: "All",
  crisis: "Crisis Intervention",
  pricing: "Pricing Models",
  risk: "Risk Alert",
  guides: "Guide",
  compliance: "Compliance",
  explainer: "Explainer",
  providers: "Provider Deep Dive"
};

/**
 * All insights articles - the complete content library
 */
export const allInsights: Insight[] = [
  // Pricing Models articles
  {
    title: "Interchange++ Pricing Explained (And Why Most Businesses Never Qualify)",
    slug: "pricing-models/interchange-plus-plus",
    description: "The expert guide to Interchange++ pricing: what it really is, why it's an underwriting outcome not a menu option, and how to know if you actually qualify.",
    category: "pricing",
    readTime: "8 min read",
    isSubfolder: true
  },
  {
    title: "Blended vs Interchange++: The Expert's Guide to Choosing Your Pricing Strategy",
    slug: "pricing-models/blended-vs-interchange",
    description: "Discover the strategic trade off between blended pricing and Interchange++. Learn which model fits your business and why the wrong choice costs more than a higher rate.",
    category: "pricing",
    readTime: "9 min read",
    isSubfolder: true
  },
  // Crisis Intervention articles
  {
    title: "Stripe Account Frozen? The 5 Hidden Reasons Why & How to Prevent the Next Freeze",
    slug: "crisis/stripe-account-frozen",
    description: "Funds frozen? Learn the 5 hidden triggers that cause account freezes, immediate recovery steps, and how to find a stable long-term provider.",
    category: "crisis",
    readTime: "8 min read",
    isSubfolder: true
  },
  {
    title: "Rejected by Stripe or Square? A Strategic Recovery Plan for High-Risk Merchants",
    slug: "crisis/rejected-high-risk-strategy",
    description: "Rejected by a major payment provider? Learn why the 'high-risk' label is not a judgment and how to find a provider that actually wants your business.",
    category: "crisis",
    readTime: "7 min read",
    isSubfolder: true
  },
  {
    title: "The Hidden Fee Crisis: How Your 'Low Rate' Processor is Costing You Thousands",
    slug: "crisis/hidden-fee-crisis",
    description: "Your headline rate isn't your real cost. Learn how to calculate your Effective Rate and uncover the 5 hidden fees quietly draining your profits.",
    category: "crisis",
    readTime: "6 min read",
    isSubfolder: true
  },
  // Compliance articles
  {
    title: "Understanding Proof of Business Activity Requests",
    slug: "proof-of-business-activity",
    description: "Understanding why payment providers ask for proof of business activity and how to prepare.",
    category: "compliance",
    readTime: "4 min read"
  },
  {
    title: "Sales Growth Triggers Document Requests: How to Prepare",
    slug: "sales-increase",
    description: "Learn why sudden sales growth triggers additional document requests.",
    category: "compliance",
    readTime: "5 min read"
  },
  {
    title: "Marketplace Seller Verification: What Providers Need",
    slug: "marketplace-seller-info",
    description: "Why marketplace businesses face additional verification for seller and payout information.",
    category: "compliance",
    readTime: "4 min read"
  },
  {
    title: "Source of Funds Requests: What They Mean and How to Respond",
    slug: "source-of-funds",
    description: "Learn why providers request bank statements and source of funds documentation.",
    category: "compliance",
    readTime: "5 min read"
  },
  {
    title: "High-Risk Industries Face Extra Verification: Is Yours One?",
    slug: "industry-verification",
    description: "Understanding why certain industries face additional verification requirements.",
    category: "compliance",
    readTime: "4 min read"
  },
  {
    title: "International Sales and Payment Provider Checks: What to Expect",
    slug: "international-sales",
    description: "Learn why selling internationally can trigger additional verification.",
    category: "compliance",
    readTime: "4 min read"
  },
  {
    title: "Document Requests Explained: Contracts, Invoices, and Agreements",
    slug: "contracts-invoices",
    description: "Understanding why payment providers request contracts and customer agreements.",
    category: "compliance",
    readTime: "5 min read"
  },
  {
    title: "Director ID Verification: What Providers Ask For",
    slug: "why-payment-providers-ask-for-director-documents",
    description: "Understand why payment providers request director documents and how to respond effectively.",
    category: "compliance",
    readTime: "4 min read"
  },
  {
    title: "Understanding Source of Funds Verification",
    slug: "why-payment-providers-ask-for-source-of-funds",
    description: "Understand why payment providers request source of funds documentation and how to respond effectively.",
    category: "compliance",
    readTime: "5 min read"
  },
  // Risk articles
  {
    title: "Stripe Account Freezes in the UK: Common Triggers and Prevention",
    slug: "why-stripe-freezes-accounts-uk",
    description: "Stripe does not freeze accounts at random. Learn the common triggers and how to prevent them.",
    category: "risk",
    readTime: "7 min read"
  },
  {
    title: "Sudden Growth Can Trigger Account Reviews: How to Handle It",
    slug: "why-accounts-get-flagged-after-growth",
    description: "Rapid growth is one of the most common reasons payment accounts are reviewed.",
    category: "risk",
    readTime: "5 min read"
  },
  {
    title: "Account Freezes Without Warning: What Triggers Them",
    slug: "why-payment-accounts-get-frozen-without-warning",
    description: "Payment providers are not always able to warn merchants before taking action.",
    category: "risk",
    readTime: "6 min read"
  },
  {
    title: "Marketplaces Face Extra Scrutiny: What Providers Look For",
    slug: "why-marketplaces-get-extra-scrutiny",
    description: "Marketplaces introduce additional layers of risk for payment providers.",
    category: "risk",
    readTime: "5 min read"
  },
  {
    title: "Re-Underwriting Explained: When Providers Review Existing Accounts",
    slug: "why-providers-re-underwrite-accounts",
    description: "Approval is not a one-time event. Learn why providers periodically re-underwrite accounts.",
    category: "risk",
    readTime: "5 min read"
  },
  {
    title: "Some Businesses Struggle to Get Approved: The Real Reason",
    slug: "why-some-businesses-never-get-approved",
    description: "Not all businesses are declined because they are doing something wrong.",
    category: "risk",
    readTime: "6 min read"
  },
  {
    title: "Growth-Related Account Flags: What Triggers Them",
    slug: "why-payment-accounts-get-flagged-after-growth",
    description: "Understand why sudden business growth triggers payment account reviews and how to handle them.",
    category: "risk",
    readTime: "5 min read"
  },
  {
    title: "When Providers Re-Underwrite Existing Accounts",
    slug: "why-providers-re-underwrite-existing-accounts",
    description: "Understand why payment providers re-underwrite existing accounts and how to handle these reviews.",
    category: "risk",
    readTime: "5 min read"
  },
  {
    title: "Account Flagged Without Changes? Here's What Providers Are Reacting To",
    slug: "why-payment-accounts-get-flagged-without-changes",
    description: "Learn why payment accounts get flagged or reviewed even when nothing changed and how to reduce friction.",
    category: "risk",
    readTime: "6 min read"
  },
  {
    title: "Why Payment Providers Reject Growing Businesses",
    slug: "why-payment-providers-reject-growing-businesses",
    description: "Understand why payment providers reject growing businesses and what you can fix before applying to improve your chances of approval.",
    category: "risk",
    readTime: "7 min read"
  },
  // Explainer articles
  {
    title: "Visa and Mastercard Control Card Payments. What Businesses Can and Cannot Do",
    slug: "visa-mastercard-control-card-payments",
    description: "Learn how Visa and Mastercard control the card payment system and what UK and EU businesses can realistically do.",
    category: "explainer",
    readTime: "8 min read"
  },
  {
    title: "What Is an Acquirer and Why Your Payment Provider Needs One",
    slug: "what-is-an-acquirer",
    description: "Understand what an acquirer is, how they connect payment providers to card networks, and why this relationship affects your business.",
    category: "explainer",
    readTime: "6 min read"
  },
  {
    title: "Payment Provider vs Acquirer vs Bank. What Actually Happens to Your Money",
    slug: "payment-provider-vs-acquirer-vs-bank",
    description: "Learn who does what in card payments, how long each step takes, and why money moves slower than transactions.",
    category: "explainer",
    readTime: "7 min read"
  },
  {
    title: "Card Approval Speed and Checkout Abandonment: The Connection Explained",
    slug: "why-card-approval-speed-affects-checkout-abandonment",
    description: "Learn why card approval speed matters for conversion rates and how delays cause checkout abandonment and lost revenue.",
    category: "explainer",
    readTime: "5 min read"
  },
  {
    title: "Same-Day Settlement and Instant Payouts. What Businesses Should Know",
    slug: "same-day-settlement-and-instant-payouts",
    description: "Learn how same-day settlement and instant payouts work, when they help businesses, and the trade-offs involved.",
    category: "explainer",
    readTime: "6 min read"
  },
  {
    title: "What Is TRA Exemption and How It Reduces Payment Friction",
    slug: "tra-exemption-reduces-payment-friction",
    description: "Learn how TRA Exemption reduces checkout friction, improves approval rates, and affects conversion for UK and EU businesses.",
    category: "explainer",
    readTime: "7 min read"
  },
  // Guides
  {
    title: "What To Do When a Payment Provider Asks for More Documents",
    slug: "what-to-do-when-provider-asks-for-documents",
    description: "Learn why document requests happen, what they usually mean, and how to respond with confidence.",
    category: "guides",
    readTime: "6 min read"
  },
  {
    title: "Chargebacks: Why They Happen, How Much They Really Cost, and How Merchants Can Avoid Them",
    slug: "chargebacks-what-they-are-and-how-to-avoid-them",
    description: "Chargebacks cost merchants billions every year and put payment accounts at risk. Learn why they happen, how much they really cost, and how to reduce them.",
    category: "guides",
    readTime: "8 min read"
  },
  {
    title: "How Businesses Earn Recurring Commission by Referring Payment Providers",
    slug: "referral-commission-guide",
    description: "Learn how platforms, agencies, and consultants can earn ongoing revenue share by making qualified payment provider introductions.",
    category: "guides",
    readTime: "7 min read"
  },
  // Provider Deep Dives
  {
    title: "Adyen: The Single Platform That Rewrote the Enterprise Payments Playbook",
    slug: "adyen-enterprise-payments-platform",
    description: "How Adyen's unified approach to acquiring, gateway, and risk management is transforming global commerce for the world's largest brands.",
    category: "providers",
    readTime: "10 min read"
  },
  {
    title: "Stripe: The Engine That Built the Modern Internet Economy",
    slug: "stripe-payment-platform",
    description: "How Stripe's API-first approach and unified financial infrastructure revolutionized digital commerce.",
    category: "providers",
    readTime: "10 min read"
  },
  {
    title: "Checkout.com: The High Performance Platform Built for Global Ambition",
    slug: "checkout-com-enterprise-platform",
    description: "How Checkout.com's modular architecture delivers superior authorization rates and granular control for high growth global merchants.",
    category: "providers",
    readTime: "8 min read"
  },
  {
    title: "Shift4 Payments: The Global Payments Giant Most Businesses Have Never Heard Of",
    slug: "shift4-payments-platform",
    description: "Learn what Shift4 offers, who they serve best, and why they matter for businesses choosing a long term payment partner.",
    category: "providers",
    readTime: "9 min read"
  },
  {
    title: "Enterprise Payment Providers: Strength Comparison",
    slug: "enterprise-provider-comparison",
    description: "A founder-level comparison of Adyen, Shift4, and Checkout.com. No marketing fluff, just real differences in risk appetite, underwriting, and operational fit.",
    category: "providers",
    readTime: "5 min read"
  }
];

/**
 * Get the URL for an insight article
 */
export const getInsightUrl = (insight: Insight): string => {
  return `/insights/${insight.slug}`;
};

/**
 * Filter insights by category and optional search query
 */
export const filterInsights = (
  insights: Insight[],
  category: InsightCategory,
  searchQuery: string = ""
): Insight[] => {
  return insights.filter((insight) => {
    const matchesSearch = 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = category === "all" || insight.category === category;
    return matchesSearch && matchesFilter;
  });
};
