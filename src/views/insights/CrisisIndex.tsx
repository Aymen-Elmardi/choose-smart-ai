'use client'
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertTriangle, Clock, DollarSign, ShieldAlert } from "lucide-react";

const crisisArticles = [
  {
    title: "Stripe Account Frozen? 5 Hidden Reasons Why",
    description: "Funds frozen? Learn the 5 hidden triggers that cause account freezes, immediate recovery steps, and how to find a stable long term provider.",
    slug: "/insights/crisis/stripe-account-frozen",
    icon: ShieldAlert,
  },
  {
    title: "Effective Rate Explained: Hidden Processing Fees",
    description: "Your headline rate is not your real cost. Learn how to calculate your effective rate, the 5 fees processors hide, and how to cut your true cost.",
    slug: "/insights/crisis/effective-rate-hidden-fees-credit-card-processing",
    icon: DollarSign,
  },
  {
    title: "Rejected by Stripe or Square? High-Risk Account Guide",
    description: "Why Stripe and Square reject businesses, what the MATCH list means, and how to get approved with a high-risk merchant account provider.",
    slug: "/insights/crisis/rejected-by-stripe-or-square-high-risk-merchant-account",
    icon: AlertTriangle,
  },
  {
    title: "Funds on Hold: Holds, Freezes and Rolling Reserves",
    description: "Payment processor holding your funds? Learn the difference between a hold, freeze, and rolling reserve, how long each lasts, and how to get paid faster.",
    slug: "/insights/crisis/funds-on-hold-rolling-reserve-payment-processor",
    icon: Clock,
  },
];

const CrisisIndex = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Crisis Intervention Guides
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          If your payment account has been frozen, you have been hit with unexpected fees, or your application was rejected, these guides walk you through what happened and what to do next.
        </p>

        <div className="space-y-6">
          {crisisArticles.map((article) => (
            <Link
              key={article.slug}
              href={article.slug}
              className="block p-6 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <article.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">{article.title}</h2>
                  <p className="text-muted-foreground">{article.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CrisisIndex;
