// Insights article data - extracted from Insights.tsx for reusability
// Used by the Insights page, sitemap generation, and search

export type InsightCategory = "all" | "risk" | "guides" | "compliance" | "explainer" | "providers" | "crisis" | "pricing" | "fees" | "provider-fit" | "ecommerce";

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
    title: "The Only Payment Method With a 100% Success Rate (On Part of Your Transactions)",
    slug: "wallet-payments-guaranteed-success",
    description: "Wallet payments are the only method that can reach a 100% success rate. Learn why wallet spend never fails and when wallets make sense for your business.",
    category: "explainer",
    readTime: "7 min read"
  },
  providers: {
    title: "Adyen: The Single Platform That Rewrote the Enterprise Payments Playbook",
    slug: "adyen-enterprise-payments-platform",
    description: "How Adyen's unified approach to acquiring, gateway, and risk management is transforming global commerce for the world's largest brands.",
    category: "providers",
    readTime: "10 min read"
  },
  fees: {
    title: "Stripe Fees Explained Clearly: What Businesses Actually Pay",
    slug: "stripe-fees-explained",
    description: "A complete breakdown of Stripe's pricing for UK businesses. Understand card processing fees, Connect costs, payout charges, and hidden fees that affect your real payment costs.",
    category: "fees",
    readTime: "7 min read"
  },
  "provider-fit": {
    title: "Best Payment Processors for High Chargeback Businesses",
    slug: "best-payment-processors-high-chargebacks",
    description: "Learn why many processors reject high chargeback merchants, how risk tolerance differs between providers, and how to find the right fit.",
    category: "provider-fit",
    readTime: "7 min read"
  },
  ecommerce: {
    title: "From High-Risk to High-Growth: A Strategic Guide to eCommerce Payment Processing",
    slug: "ecommerce/high-risk-to-high-growth",
    description: "Learn why ecommerce businesses get labeled high-risk, what processors actually evaluate during underwriting, and how to build a payments strategy that supports growth.",
    category: "ecommerce",
    readTime: "14 min read",
    isSubfolder: true
  }
};

/**
 * Filter tabs for the Insights page
 */
export const filterTabs: { label: string; value: InsightCategory }[] = [
  { label: "All", value: "all" },
  { label: "Crisis Intervention", value: "crisis" },
  { label: "Pricing Models", value: "pricing" },
  { label: "Fees & Costs", value: "fees" },
  { label: "Provider Deep Dives", value: "providers" },
  { label: "Risk & Freezes", value: "risk" },
  { label: "Guides", value: "guides" },
  { label: "Compliance", value: "compliance" },
  { label: "Explainers", value: "explainer" },
  { label: "Provider Fit Guides", value: "provider-fit" },
  { label: "E-commerce", value: "ecommerce" }
];

/**
 * Category labels for display
 */
export const categoryLabels: Record<InsightCategory, string> = {
  all: "All",
  crisis: "Crisis Intervention",
  pricing: "Pricing Models",
  fees: "Fees & Costs",
  risk: "Risk Alert",
  guides: "Guide",
  compliance: "Compliance",
  explainer: "Explainer",
  providers: "Provider Deep Dive",
  "provider-fit": "Provider Fit Guide",
  ecommerce: "E-commerce"
};

/**
 * All insights articles - the complete content library
 */
export const allInsights: Insight[] = [
  // Fees & Costs articles
  {
    title: "Stripe Fees Explained Clearly: What Businesses Actually Pay",
    slug: "stripe-fees-explained",
    description: "A complete breakdown of Stripe's pricing for UK businesses. Understand card processing fees, Connect costs, payout charges, and hidden fees that affect your real payment costs.",
    category: "fees",
    readTime: "7 min read"
  },
  {
    title: "Checkout.com Fees Explained: What Businesses Actually Pay",
    slug: "checkout-com-fees-explained",
    description: "A clear breakdown of Checkout.com's negotiated pricing model, including card processing fees, international costs, chargebacks, and when this enterprise platform makes financial sense.",
    category: "fees",
    readTime: "8 min read"
  },
  {
    title: "Fiserv and Clover Pricing Explained: Why It Works for Resellers and Multi Location Businesses",
    slug: "fiserv-clover-pricing-explained",
    description: "A clear breakdown of Fiserv and Clover pricing for resellers, ISVs, and multi-location businesses. Understand how negotiated fees, hardware bundles, and value added services create real business value.",
    category: "fees",
    readTime: "9 min read"
  },
  {
    title: "Adyen Pricing Explained: How Fees Really Work and When Adyen Is Worth It",
    slug: "adyen-pricing-explained",
    description: "A clear breakdown of Adyen's interchange plus pricing model, how fees are structured, what affects your rate, and when Adyen pricing makes sense compared to Stripe and other providers.",
    category: "fees",
    readTime: "9 min read"
  },
  {
    title: "PayPal Pricing Explained and How It Compares to Adyen for UK Businesses",
    slug: "paypal-fees-explained",
    description: "A clear breakdown of PayPal's blended pricing model for UK businesses, how fees compare to Adyen's interchange-plus model, and when each provider makes financial sense.",
    category: "fees",
    readTime: "8 min read"
  },
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
  {
    title: "What to Do When Your Payment Provider Holds Your Funds",
    slug: "what-to-do-when-funds-held",
    description: "Funds being held by your payment provider? Learn why holds happen, the difference between a hold and a freeze, and the steps to take to get your money released.",
    category: "crisis",
    readTime: "7 min read"
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
    title: "The Marketplace Founder's Guide to Payment Processing",
    slug: "marketplace-payments-guide",
    description: "What payment providers don't tell marketplace founders about split payments, seller verification, chargeback risk, and how to secure the right payment partnership.",
    category: "guides",
    readTime: "12 min read"
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
  {
    title: "What Are Payment Scheme Rules and Why They Matter More Than Your Contract",
    slug: "payment-scheme-rules-explained",
    description: "Learn what payment scheme rules are, how flow down provisions work, and why the rules set by Visa and Mastercard often matter more than your provider contract.",
    category: "compliance",
    readTime: "8 min read"
  },
  {
    title: "How Scheme Rules Trigger Reserves, Monitoring Programs and Account Reviews",
    slug: "scheme-rules-reserves-monitoring",
    description: "Learn how card network thresholds from Visa and Mastercard trigger reserves, monitoring programs, and account reviews, and what growing businesses can do to prevent them.",
    category: "compliance",
    readTime: "9 min read"
  },
  {
    title: "Why Payment Providers Impose Reserves and How to Negotiate Them",
    slug: "why-providers-impose-reserves",
    description: "Reserves protect providers from future losses. Learn why they're imposed, how rolling and fixed reserves work, and what you can do to reduce or release them.",
    category: "compliance",
    readTime: "7 min read"
  },
  {
    title: "When Scheme Rules Apply Differently: Cards, Wallets, Marketplaces and BNPL Explained",
    slug: "scheme-rules-by-payment-method",
    description: "Scheme rules do not apply identically across payment methods. Learn how cards, digital wallets, marketplaces and Buy Now Pay Later models each carry different risk, liability and compliance requirements.",
    category: "compliance",
    readTime: "9 min read"
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
    title: "Rolling Reserve vs Fixed Reserve: What Merchants Need to Know",
    slug: "rolling-vs-fixed-reserve",
    description: "Understand the difference between rolling and fixed reserves, how each affects your cash flow, and which reserve type you're most likely to encounter.",
    category: "explainer",
    readTime: "6 min read"
  },
  {
    title: "Why Your Payout Doesn't Match Your Sales: Settlement Timing Explained",
    slug: "payout-settlement-explained",
    description: "Learn why the amount you receive from your payment provider rarely matches your daily sales, and how fees, reserves, chargebacks, and settlement timing create payout discrepancies.",
    category: "explainer",
    readTime: "7 min read"
  },
  {
    title: "Net vs Gross Settlement: How Payment Providers Calculate Your Payout",
    slug: "net-vs-gross-settlement",
    description: "Understand the difference between net and gross settlement, how each model affects your cash flow, and which providers offer which approach.",
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
  {
    title: "Credit Card Payments Explained: How They Affect Approval, Risk, and Business Growth",
    slug: "credit-card-payments-explained",
    description: "Credit card payments carry more risk and scrutiny than any other payment method. Learn how providers judge card-heavy businesses and how to avoid account freezes.",
    category: "explainer",
    readTime: "9 min read"
  },
  {
    title: "Open Banking Payments in the UK: Faster Settlement, Lower Risk, Fewer Chargebacks",
    slug: "open-banking-payments-uk",
    description: "Learn how Open Banking payments work in the UK, why providers see them as lower risk than cards, and where they can improve payment performance for growing businesses.",
    category: "explainer",
    readTime: "8 min read"
  },
  {
    title: "Apple Pay and Google Pay Explained: Faster Checkout, Lower Risk, Higher Approval Rates",
    slug: "apple-pay-google-pay-explained",
    description: "Learn how Apple Pay and Google Pay improve transaction security, reduce chargebacks, and increase conversion rates. Understand why payment providers trust wallet payments more.",
    category: "explainer",
    readTime: "7 min read"
  },
  {
    title: "Payment Provider Risk Models Explained in Plain English",
    slug: "payment-provider-risk-models",
    description: "Learn why two similar businesses get very different outcomes from payment providers. Understand how risk models work and how to position your business for approval.",
    category: "explainer",
    readTime: "10 min read"
  },
  {
    title: "Low Value Transaction (LVT) Exemption: How Small Payments Unlock Higher Approval Rates",
    slug: "low-value-transaction-exemption",
    description: "Learn how the Low Value Transaction exemption under SCA rules can improve card approval rates, reduce checkout friction, and boost conversion for small purchases.",
    category: "explainer",
    readTime: "8 min read"
  },
  {
    title: "Payment Acronyms Merchants Actually Need to Understand (And Which Ones You Can Ignore)",
    slug: "payment-acronyms-explained",
    description: "A clear guide to the payment acronyms that affect approval, cash flow, and costs. Learn which terms matter for your business and which ones you can safely ignore.",
    category: "explainer",
    readTime: "10 min read"
  },
  {
    title: "The Only Payment Method With a 100% Success Rate (On Part of Your Transactions)",
    slug: "wallet-payments-guaranteed-success",
    description: "Wallet payments are the only method that can reach a 100% success rate. Learn why wallet spend never fails, how refund-to-wallet strategies reduce chargebacks, and when wallets make sense for your business.",
    category: "explainer",
    readTime: "8 min read"
  },
  {
    title: "The Provider Appetite Index: Why Payment Processors Say No (And How to Get a Yes)",
    slug: "provider-appetite-index",
    description: "Payment processors don't randomly accept or decline merchants. Learn how underwriting appetite works, why applications get rejected, and how to match your business to the right provider.",
    category: "explainer",
    readTime: "12 min read"
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
  {
    title: "You Lost a Chargeback: What Happens Next and How to Recover",
    slug: "chargeback-loss-recovery",
    description: "Lost a chargeback dispute? Learn what happens to your account, how it affects your standing with providers and card networks, and what steps to take next.",
    category: "guides",
    readTime: "8 min read"
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
  },
  {
    title: "Fiserv and the First Data Legacy: Who It Actually Fits, and Where It Doesn't",
    slug: "fiserv-payments-platform",
    description: "Fiserv operates across acquiring, issuing, bank infrastructure, and Clover POS. Learn where it performs well, where friction appears, and which business profiles benefit most.",
    category: "providers",
    readTime: "9 min read"
  },
  {
    title: "Shift4 vs Stripe: Choosing the Right Payment Engine for Your Enterprise",
    slug: "shift4-vs-stripe-enterprise",
    description: "A strategic comparison of Shift4 and Stripe for enterprise payments. Learn how their pricing, risk models, and commerce capabilities differ to find the right fit.",
    category: "providers",
    readTime: "9 min read"
  },
  {
    title: "Adyen vs First Data: Two Very Different Ways to Process Payments",
    slug: "adyen-vs-first-data",
    description: "A strategic comparison of Adyen's unified global platform versus First Data's bank led acquiring infrastructure. Learn which payment model fits your business.",
    category: "providers",
    readTime: "9 min read"
  },
  {
    title: "PayPal: From Online Payments Pioneer to Global Consumer Network",
    slug: "paypal-payment-platform",
    description: "Understand where PayPal fits in the payments landscape, how its consumer trust drives conversion, and which businesses benefit most from adding PayPal to their payment stack.",
    category: "providers",
    readTime: "10 min read"
  },
  // Provider Fit Guides
  {
    title: "Best Payment Processors for High Chargeback Businesses",
    slug: "best-payment-processors-high-chargebacks",
    description: "Learn why many processors reject high chargeback merchants, how risk tolerance differs between providers, and how to find the right fit for your business.",
    category: "provider-fit",
    readTime: "7 min read"
  },
  {
    title: "Payment Processors for High-Risk E-commerce Businesses",
    slug: "payment-processors-high-risk-ecommerce",
    description: "Learn why high-risk ecommerce struggles with Stripe or Square, which processors tolerate high risk industries, and how risk appetite differs across providers.",
    category: "provider-fit",
    readTime: "8 min read"
  },
  {
    title: "Choosing the Right Payment Provider for Subscription and SaaS Businesses",
    slug: "payment-provider-subscription-business",
    description: "Learn what subscription and SaaS businesses need from a payment provider, including recurring billing, dunning logic, and fraud exposure.",
    category: "provider-fit",
    readTime: "7 min read"
  },
  {
    title: "MCC 5812: Payment Gateways for UK Restaurants and Food Businesses",
    slug: "mcc-5812-payment-gateway-uk",
    description: "What MCC 5812 means for your restaurant or food business, why hospitality triggers reserves, and which payment processors support restaurant models.",
    category: "provider-fit",
    readTime: "7 min read"
  },
  {
    title: "Best Payment Acquirers for Food Delivery Platforms",
    slug: "best-acquirers-food-delivery",
    description: "Why food delivery platforms face unique payment challenges and which acquirers can handle high transaction velocity, refund patterns, and marketplace payouts.",
    category: "provider-fit",
    readTime: "8 min read"
  },
  // E-commerce
  {
    title: "From High-Risk to High-Growth: A Strategic Guide to eCommerce Payment Processing",
    slug: "ecommerce/high-risk-to-high-growth",
    description: "Learn why ecommerce businesses get labeled high-risk, what processors actually evaluate during underwriting, and how to build a payments strategy that supports growth.",
    category: "ecommerce",
    readTime: "14 min read",
    isSubfolder: true
  },
  {
    title: "Maximizing Subscription Revenue: Payment Success Rates and Risk Management for Recurring Billing",
    slug: "ecommerce/subscription-revenue-recurring-billing",
    description: "Learn how subscription businesses can improve payment success rates, reduce involuntary churn, and choose the right payment infrastructure for recurring billing.",
    category: "ecommerce",
    readTime: "12 min read",
    isSubfolder: true
  },
  {
    title: "Beyond the 1%: Navigating Chargeback Thresholds With High Risk Payment Processors",
    slug: "ecommerce/chargeback-thresholds-high-risk-processors",
    description: "Learn how chargeback thresholds work, why standard processors reject high dispute businesses, and how to find a payment provider that supports your risk profile.",
    category: "ecommerce",
    readTime: "11 min read",
    isSubfolder: true
  }
];

/**
 * Get the URL for an insight article
 */
export const getInsightUrl = (insight: Insight): string => {
  // Provider fit guides use root-level URLs
  if (insight.category === "provider-fit") {
    return `/${insight.slug}`;
  }
  // Subfolder articles already have their path in the slug
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
    const text = `${insight.title} ${insight.description}`.toLowerCase();
    // Split query on spaces — match if ANY word is found (OR logic)
    const words = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const matchesSearch = words.length === 0 || words.some((word) => text.includes(word));
    const matchesFilter = category === "all" || insight.category === category;
    return matchesSearch && matchesFilter;
  });
};
