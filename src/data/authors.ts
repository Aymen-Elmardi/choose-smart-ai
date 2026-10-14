// The two named experts and the articles each one is credited on.
//
// The article lists mirror the byline each page shows today. When a byline
// changes, update the list here too, so the profile page and the article
// agree.

export interface AuthorArticle {
  href: string;
  title: string;
}

export interface Author {
  slug: string;
  name: string;
  jobTitle: string;
  /** One line on what the author covers. */
  focus: string;
  articles: AuthorArticle[];
}

export const AUTHORS: Author[] = [
  {
    slug: "aymen-elmardi",
    name: "Aymen Elmardi",
    jobTitle: "Payments Expert",
    focus: "Writes on payment risk, compliance, provider deep dives and marketplace payments.",
    articles: [
      { href: "/insights/why-payment-accounts-get-frozen-without-warning", title: "Account Freezes Without Warning: What Triggers Them" },
      { href: "/ach-payment-processors", title: "ACH Payment Processors: When Bank Transfer Makes More Sense Than Cards" },
      { href: "/insights/adyen-pricing-explained", title: "Adyen Pricing Explained: How Fees Really Work and When Adyen Is Worth It" },
      { href: "/insights/comparisons/adyen-vs-checkout-com", title: "Adyen vs Checkout.com: US Enterprise Payments Compared" },
      { href: "/insights/adyen-vs-first-data", title: "Adyen vs First Data: Which Enterprise Processor Wins?" },
      { href: "/insights/enterprise-provider-comparison", title: "Adyen vs Shift4 vs Checkout.com: Enterprise Pricing Compared 2026" },
      { href: "/insights/comparisons/adyen-vs-trustcommerce", title: "Adyen vs TrustCommerce: Enterprise vs Healthcare Payments" },
      { href: "/insights/adyen-enterprise-payments-platform", title: "Adyen: The Single Platform That Rewrote the Enterprise Payments Playbook" },
      { href: "/insights/apple-pay-google-pay-explained", title: "Apple Pay and Google Pay Explained: Faster Checkout, Lower Risk, Higher Approval Rates" },
      { href: "/best-acquirers-food-delivery", title: "Best Payment Acquirers for Food Delivery Platforms" },
      { href: "/insights/best-payment-processor-ecommerce", title: "Best Payment Processor for E-Commerce (US 2026)" },
      { href: "/best-payment-processors-high-chargebacks", title: "Best Payment Processors for High Chargeback Businesses" },
      { href: "/insights/ecommerce/chargeback-thresholds-high-risk-processors", title: "Beyond the 1%: Navigating Chargeback Thresholds With High Risk Payment Processors" },
      { href: "/insights/pricing-models/blended-vs-interchange", title: "Blended vs Interchange++: The Expert's Guide to Choosing Your Pricing Strategy" },
      { href: "/insights/buy-now-pay-later-uk", title: "Buy Now Pay Later for UK Merchants: The Practical Guide" },
      { href: "/insights/why-card-approval-speed-affects-checkout-abandonment", title: "Card Approval Speed and Checkout Abandonment: The Connection Explained" },
      { href: "/insights/chargebacks-what-they-are-and-how-to-avoid-them", title: "Chargebacks: Why They Happen and How to Avoid Them" },
      { href: "/insights/checkout-com-fees-explained", title: "Checkout.com Pricing and Fees Explained: What Businesses Actually Pay in 2026" },
      { href: "/insights/checkout-com-enterprise-platform", title: "Checkout.com: The High Performance Platform Built for Global Ambition" },
      { href: "/payment-provider-subscription-business", title: "Choosing the Right Payment Provider for Subscription and SaaS Businesses" },
      { href: "/insights/credit-card-payments-explained", title: "Credit Card Payments Explained: How They Affect Approval, Risk, and Business Growth" },
      { href: "/insights/digital-product-chargebacks-refunds-payment-processor", title: "Digital Product Chargebacks and Refunds: What Your Payment Processor Does About It" },
      { href: "/insights/why-payment-providers-ask-for-director-documents", title: "Director ID Verification: What Providers Ask For" },
      { href: "/insights/contracts-invoices", title: "Document Requests Explained: Contracts, Invoices, and Agreements" },
      { href: "/insights/fiserv-payments-platform", title: "Fiserv - the First Data Payment Gateway: What Merchants Need to Know" },
      { href: "/insights/fiserv-clover-pricing-explained", title: "Fiserv Clover Pricing Explained: What Merchants Pay in 2026" },
      { href: "/insights/ecommerce/high-risk-to-high-growth", title: "From High-Risk to High-Growth: A Strategic Guide to eCommerce Payment Processing" },
      { href: "/insights/hidden-payment-processor-fees", title: "Hidden Payment Processor Fees: What to Look For Before You Sign" },
      { href: "/insights/industry-verification", title: "High-Risk Industries Face Extra Verification: Is Yours One?" },
      { href: "/insights/referral-commission-guide", title: "How Businesses Earn Recurring Commission by Referring Payment Providers" },
      { href: "/insights/payment-processor-business-vertical-classification", title: "How Payment Processors Classify Your Business Vertical (and Why It Matters)" },
      { href: "/insights/scheme-rules-reserves-monitoring", title: "How Scheme Rules Trigger Reserves, Monitoring Programs and Account Reviews" },
      { href: "/insights/how-to-choose-a-payment-processor", title: "How to Choose a Payment Processor: The Business Owner's Guide" },
      { href: "/insights/pricing-models/interchange-plus-plus", title: "Interchange++ Pricing: The \"Secret\" to Lower Fees (And Why Most Businesses Never Qualify)" },
      { href: "/insights/international-sales", title: "International Sales and Payment Provider Checks: What to Expect" },
      { href: "/insights/low-value-transaction-exemption", title: "Low Value Transaction (LVT) Exemption: How Small Payments Unlock Higher Approval Rates" },
      { href: "/insights/marketplace-payments-guide", title: "Marketplace Payments Guide: Splits, Risk & Compliance" },
      { href: "/insights/marketplace-seller-info", title: "Marketplace Seller Verification: What Payment Providers Require" },
      { href: "/insights/marketplace-take-rate", title: "Marketplace Take Rate: How Much Should You Actually Charge?" },
      { href: "/insights/mastercard-3ds-authentication-fee-changes-europe", title: "Mastercard's 2026 3DS Authentication Fee Changes in Europe: What Merchants Should Know" },
      { href: "/insights/ecommerce/subscription-revenue-recurring-billing", title: "Maximizing Subscription Revenue: Payment Success Rates and Risk Management for Recurring Billing" },
      { href: "/mcc-5812-payment-gateway-uk", title: "MCC 5812: Payment Gateways for UK Restaurants and Food Businesses" },
      { href: "/insights/merchant-acquirer-vs-payment-processor", title: "Merchant Acquirer vs Payment Processor: What's the Difference?" },
      { href: "/insights/net-vs-gross-settlement", title: "Net vs Gross Settlement: How Payment Providers Calculate Your Payout" },
      { href: "/insights/open-banking-payments-uk", title: "Open Banking Payments in the UK: Faster Settlement, Lower Risk, Fewer Chargebacks" },
      { href: "/insights/payment-acronyms-explained", title: "Payment Acronyms Merchants Actually Need to Understand (And Which Ones You Can Ignore)" },
      { href: "/payment-gateway-vs-payment-processor", title: "Payment Gateway vs Payment Processor: The Actual Difference" },
      { href: "/payment-processors-high-risk-ecommerce", title: "Payment Processors for High-Risk E-commerce Businesses" },
      { href: "/insights/payment-provider-risk-models", title: "Payment Provider Risk Models Explained in Plain English" },
      { href: "/insights/paypal-fees-explained", title: "PayPal Fees Explained: The Complete UK Guide for 2026" },
      { href: "/insights/paypal-payment-platform", title: "PayPal: From Online Payments Pioneer to Global Consumer Network" },
      { href: "/insights/why-providers-re-underwrite-accounts", title: "Re-Underwriting Explained: When Providers Review Existing Accounts" },
      { href: "/insights/crisis/rejected-high-risk-strategy", title: "Rejected by Stripe or Square? Why Your 'High-Risk' Business Needs a Risk-Aligned Payment Strategy" },
      { href: "/risk-alignment-payment-processor", title: "Risk Alignment: Why Your Business Needs the Right Payment Processor, Not Just the Cheapest" },
      { href: "/insights/rolling-vs-fixed-reserve", title: "Rolling Reserve vs Fixed Reserve: What Merchants Need to Know" },
      { href: "/insights/sales-increase", title: "Sales Growth Triggers Document Requests: How to Prepare" },
      { href: "/insights/same-day-settlement-and-instant-payouts", title: "Same-Day Settlement and Instant Payouts: What Businesses Should Know" },
      { href: "/insights/shift4-payments-platform", title: "Shift4 Payments: The Global Payments Giant Most Businesses Have Never Heard Of" },
      { href: "/insights/shift4-vs-stripe-enterprise", title: "Shift4 vs Stripe: Choosing the Right Payment Engine for Your Enterprise" },
      { href: "/insights/why-some-businesses-never-get-approved", title: "Some Businesses Struggle to Get Approved: The Real Reason" },
      { href: "/insights/source-of-funds", title: "Source of Funds Requests: What They Mean and How to Respond" },
      { href: "/insights/why-stripe-freezes-accounts-uk", title: "Stripe Account Freezes in the UK: Common Triggers and Prevention" },
      { href: "/insights/crisis/stripe-account-frozen", title: "Stripe Account Frozen? The 5 Hidden Reasons Why (And How to Prevent the Next Freeze)" },
      { href: "/insights/stripe-fees-explained", title: "Stripe Fees Explained: Real Costs for UK Businesses in 2026" },
      { href: "/insights/stripe-vs-adyen", title: "Stripe vs Adyen: Fees and Features Comparison" },
      { href: "/insights/comparisons/stripe-vs-trustcommerce", title: "Stripe vs TrustCommerce: Which Fits Your Healthcare Business" },
      { href: "/insights/stripe-payment-platform", title: "Stripe: The Engine That Built the Modern Internet Economy" },
      { href: "/insights/marketplace-chicken-and-egg-problem", title: "The Chicken and Egg Problem: How Marketplaces Actually Solve It" },
      { href: "/insights/crisis/hidden-fee-crisis", title: "The Hidden Fee Crisis: How Your 'Low Rate' Payment Processor is Quietly Costing You Thousands" },
      { href: "/insights/wallet-payments-guaranteed-success", title: "The Only Payment Method With a 100% Success Rate (On Part of Your Transactions)" },
      { href: "/insights/provider-appetite-index", title: "The Provider Appetite Index: Why Payment Processors Say \"No\" (And How to Get a \"Yes\")" },
      { href: "/insights/third-party-payment-processors", title: "Third-Party Payment Processors Explained: What They Are and When They Make Sense" },
      { href: "/insights/proof-of-business-activity", title: "Understanding Proof of Business Activity Requests" },
      { href: "/insights/why-payment-providers-ask-for-source-of-funds", title: "Understanding Source of Funds Verification" },
      { href: "/insights/visa-mastercard-control-card-payments", title: "Visa and Mastercard Control Card Payments. What Businesses Can and Cannot Do" },
      { href: "/insights/payment-scheme-rules-explained", title: "What Are Payment Scheme Rules and Why They Matter More Than Your Contract" },
      { href: "/insights/what-is-a-payment-processor", title: "What Is a Payment Processor? How It Works and Why It Matters" },
      { href: "/insights/what-is-an-acquirer", title: "What Is an Acquirer and Why Your Payment Provider Needs One" },
      { href: "/insights/marketplace-liquidity", title: "What Is Marketplace Liquidity? A Founder's Guide" },
      { href: "/insights/tra-exemption-reduces-payment-friction", title: "What Is TRA Exemption and How TRA Exemptions Reduce Payment Friction" },
      { href: "/insights/what-to-do-when-provider-asks-for-documents", title: "What To Do When a Payment Provider Asks for More Documents" },
      { href: "/insights/what-to-do-when-funds-held", title: "What to Do When Your Payment Provider Holds Your Funds" },
      { href: "/insights/scheme-rules-by-payment-method", title: "When Scheme Rules Apply Differently: Cards, Wallets, Marketplaces and BNPL Explained" },
      { href: "/insights/why-accounts-get-flagged-after-growth", title: "Why Payment Accounts Get Flagged After a Business Grows" },
      { href: "/insights/why-providers-impose-reserves", title: "Why Payment Providers Impose Reserves and How to Negotiate Them" },
      { href: "/insights/why-payment-providers-reject-growing-businesses", title: "Why Payment Providers Reject Growing Businesses" },
      { href: "/insights/payout-settlement-explained", title: "Why Your Payout Doesn't Match Your Sales: Settlement Timing Explained" },
      { href: "/insights/chargeback-loss-recovery", title: "You Lost a Chargeback: What Happens Next and How to Recover" },
    ],
  },
  {
    slug: "madalsa-bhat",
    name: "Madalsa Bhat",
    jobTitle: "Growth Expert",
    focus: "Writes on processing fees, pricing and provider comparisons.",
    articles: [
      { href: "/insights/comparisons/adyen-vs-paypal", title: "Adyen vs PayPal: Fees and Features Comparison" },
      { href: "/insights/comparisons/checkout-com-vs-paypal", title: "Checkout.com vs PayPal: Enterprise Rates vs Consumer Trust" },
      { href: "/insights/marketplace-split-payments", title: "Marketplace Split Payments: How They Work and What Actually Goes Wrong" },
      { href: "/insights/stripe-vs-adyen", title: "Stripe vs Adyen: Fees and Features Comparison" },
      { href: "/insights/comparisons/stripe-vs-checkout-com", title: "Stripe vs Checkout.com: Fees and Features Comparison" },
      { href: "/insights/comparisons/stripe-vs-paypal", title: "Stripe vs PayPal: Fees and Features Comparison" },
    ],
  },
];

export const authorUrl = (slug: string) => `https://chosepayments.com/authors/${slug}`;

export const getAuthor = (slug: string) => AUTHORS.find((author) => author.slug === slug);
