// Content Architecture: Hub-and-Spoke Model for /insights
// This file defines the content clusters, linking rules, and article metadata

export type ContentCluster = "hub" | "crisis" | "provider" | "pricing";

export interface ArticleMetadata {
  slug: string;
  title: string;
  cluster: ContentCluster;
  category: string;
  keywords: string[]; // For internal linking automation
}

// Pricing Models articles (technical authority content)
export const pricingArticles: ArticleMetadata[] = [
  {
    slug: "interchange-plus-plus",
    title: "Interchange++ Pricing Explained (And Why Most Businesses Never Qualify)",
    cluster: "pricing",
    category: "Pricing Models",
    keywords: ["interchange++", "interchange plus", "IC++", "pricing", "blended", "fees", "transparent", "stripe pricing"]
  },
  {
    slug: "blended-vs-interchange",
    title: "Blended vs Interchange++: The Expert's Guide to Choosing Your Pricing Strategy",
    cluster: "pricing",
    category: "Pricing Models",
    keywords: ["blended", "interchange++", "IC++", "pricing strategy", "predictability", "optimization", "underwriting"]
  }
];

// Crisis Intervention articles (high-intent, urgent problem solving)
export const crisisArticles: ArticleMetadata[] = [
  {
    slug: "rejected-high-risk-strategy",
    title: "Rejected by Stripe or Square? A Strategic Recovery Plan for High-Risk Merchants",
    cluster: "crisis",
    category: "Crisis Intervention",
    keywords: ["rejected", "declined", "high-risk", "stripe", "square", "approval"]
  },
  {
    slug: "stripe-account-frozen",
    title: "Stripe Account Frozen? The 5 Hidden Reasons Why & How to Prevent the Next Freeze",
    cluster: "crisis",
    category: "Crisis Intervention",
    keywords: ["frozen", "funds held", "stripe", "reserve", "emergency", "freeze"]
  },
  {
    slug: "hidden-fee-crisis",
    title: "The Hidden Fee Crisis: How Your 'Low Rate' Payment Processor is Costing You Thousands",
    cluster: "crisis",
    category: "Crisis Intervention",
    keywords: ["hidden fees", "interchange", "rolling reserve", "fees", "pricing", "effective rate"]
  }
];

// Provider Deep-Dive articles (expert reviews, authority building)
export const providerArticles: ArticleMetadata[] = [
  {
    slug: "adyen-enterprise-payments-platform",
    title: "Adyen: The Single Platform That Rewrote the Enterprise Payments Playbook",
    cluster: "provider",
    category: "Provider Deep Dive",
    keywords: ["adyen", "enterprise", "platform", "acquiring", "adyen payments", "adyen payment gateway", "adyen marketplace", "adyen unified commerce"]
  },
  {
    slug: "stripe-payment-platform",
    title: "Stripe: The Engine That Built the Modern Internet Economy",
    cluster: "provider",
    category: "Provider Deep Dive",
    keywords: ["stripe", "api", "developer", "platform"]
  },
  {
    slug: "checkout-com-enterprise-platform",
    title: "Checkout.com: The High Performance Platform Built for Global Ambition",
    cluster: "provider",
    category: "Provider Deep Dive",
    keywords: ["checkout.com", "checkout.com api", "enterprise", "authorization", "global"]
  },
  {
    slug: "shift4-payments-platform",
    title: "Shift4 Payments: The Global Payments Giant Most Businesses Have Never Heard Of",
    cluster: "provider",
    category: "Provider Deep Dive",
    keywords: ["shift4", "shift4 payments", "what does shift4 do", "hospitality", "gaming", "entertainment", "enterprise", "POS"]
  },
  {
    slug: "enterprise-provider-comparison",
    title: "Enterprise Payment Providers: Strength Comparison",
    cluster: "provider",
    category: "Provider Deep Dive",
    keywords: ["comparison", "adyen", "shift4", "checkout.com", "enterprise", "enterprise payment approval platforms comparison", "risk appetite", "underwriting"]
  },
  {
    slug: "fiserv-payments-platform",
    title: "Fiserv and the First Data Legacy: Who It Actually Fits, and Where It Doesn't",
    cluster: "provider",
    category: "Provider Deep Dive",
    keywords: ["fiserv", "first data", "clover", "enterprise", "acquiring", "POS", "bank infrastructure"]
  }
];

// Hub articles (existing educational content)
export const hubArticles: ArticleMetadata[] = [
  {
    slug: "stripe-account-frozen-guide",
    title: "Stripe Account Frozen? 5 Hidden Reasons Why & How to Prevent the Next Freeze",
    cluster: "hub",
    category: "Risk",
    keywords: ["stripe", "frozen", "freeze", "account", "prevention"]
  },
  {
    slug: "chargebacks-what-they-are-and-how-to-avoid-them",
    title: "Chargebacks: Why They Happen, How Much They Really Cost, and How Merchants Can Avoid Them",
    cluster: "hub",
    category: "Guide",
    keywords: ["chargeback", "dispute", "fraud", "prevention"]
  },
  {
    slug: "source-of-funds",
    title: "Source of Funds Requests: What They Mean and How to Respond",
    cluster: "hub",
    category: "Compliance",
    keywords: ["source of funds", "documentation", "verification", "compliance"]
  }
];

// Get related articles for a given cluster (for Related Articles section)
export const getRelatedArticles = (currentSlug: string, cluster: ContentCluster): ArticleMetadata[] => {
  let articles: ArticleMetadata[];
  
  switch (cluster) {
    case "crisis":
      articles = crisisArticles;
      break;
    case "provider":
      articles = providerArticles;
      break;
    case "pricing":
      articles = pricingArticles;
      break;
    default:
      articles = hubArticles;
  }
  
  return articles.filter(article => article.slug !== currentSlug).slice(0, 2);
};

// Find articles that match keywords for internal linking
export const findRelatedByKeyword = (keyword: string): ArticleMetadata[] => {
  const allArticles = [...hubArticles, ...crisisArticles, ...providerArticles, ...pricingArticles];
  
  return allArticles.filter(article => 
    article.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
  );
};

// URL builders
export const buildInsightUrl = (slug: string, cluster: ContentCluster): string => {
  switch (cluster) {
    case "crisis":
      return `/insights/crisis/${slug}`;
    case "provider":
      return `/insights/provider/${slug}`;
    case "pricing":
      return `/insights/pricing-models/${slug}`;
    default:
      return `/insights/${slug}`;
  }
};
