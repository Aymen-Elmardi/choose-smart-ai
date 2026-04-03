'use client'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { useCanonical } from "@/hooks/useCanonical";
import { Link } from '@/lib/router-compat';
import { ArrowRight } from "lucide-react";

const clusters = [
  {
    heading: "Funds Held or Frozen",
    articles: [
      { title: "Why Payment Accounts Get Frozen Without Warning", slug: "why-payment-accounts-get-frozen-without-warning" },
      { title: "Stripe Account Freezes in the UK: Common Triggers", slug: "why-stripe-freezes-accounts-uk" },
      { title: "Stripe Account Frozen? 5 Hidden Reasons Why", slug: "crisis/stripe-account-frozen" },
    ],
  },
  {
    heading: "Reserves and Risk Reviews",
    articles: [
      { title: "How Scheme Rules Trigger Reserves and Monitoring Programs", slug: "scheme-rules-reserves-monitoring" },
      { title: "Re-Underwriting Explained: When Providers Review Existing Accounts", slug: "why-providers-re-underwrite-accounts" },
      { title: "Account Flagged Without Changes? Here's What Providers Are Reacting To", slug: "why-payment-accounts-get-flagged-without-changes" },
    ],
  },
  {
    heading: "Fees Higher Than Expected",
    articles: [
      { title: "The Hidden Fee Crisis: How Your 'Low Rate' Is Costing You Thousands", slug: "crisis/hidden-fee-crisis" },
      { title: "Blended vs Interchange++: Choosing Your Pricing Strategy", slug: "pricing-models/blended-vs-interchange" },
      { title: "Interchange++ Pricing Explained", slug: "pricing-models/interchange-plus-plus" },
    ],
  },
  {
    heading: "Chargebacks and Disputes",
    articles: [
      { title: "Chargebacks: Why They Happen and How to Avoid Them", slug: "chargebacks-what-they-are-and-how-to-avoid-them" },
      { title: "Payment Scheme Rules Explained", slug: "payment-scheme-rules-explained" },
    ],
  },
  {
    heading: "Growth Triggering Problems",
    articles: [
      { title: "Sudden Growth Can Trigger Account Reviews", slug: "why-accounts-get-flagged-after-growth" },
      { title: "Why Payment Providers Reject Growing Businesses", slug: "why-payment-providers-reject-growing-businesses" },
      { title: "Sales Growth Triggers Document Requests", slug: "sales-increase" },
    ],
  },
];

const MerchantAccountProblems = () => {
  useSEO({
    title: "Merchant Account Problems Explained | ChosePayments",
    description:
      "Funds withheld, reserves imposed, fees higher than expected. Understand what your payment provider is doing and why, clearly explained.",
  });
  useCanonical();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-32 pb-16 md:pt-44 md:pb-24">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">
              Distress Hub
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-[1.35] tracking-tight max-w-2xl">
              Merchant Account Problems Explained
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Something went wrong with your payment account. Here's what's actually happening and why.
            </p>
          </div>
        </section>

        {clusters.map((cluster) => (
          <section key={cluster.heading} className="border-t border-border">
            <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-12 md:py-16">
              <h2 className="text-lg font-semibold text-foreground tracking-tight mb-6">
                {cluster.heading}
              </h2>
              <div className="space-y-3">
                {cluster.articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/insights/${article.slug}`}
                    className="flex items-center justify-between gap-4 px-5 py-4 rounded-lg border border-border bg-secondary/30 hover:border-primary/40 transition-colors group"
                  >
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default MerchantAccountProblems;
