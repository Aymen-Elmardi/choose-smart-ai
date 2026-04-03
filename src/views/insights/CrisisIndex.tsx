'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { AlertTriangle, DollarSign, ShieldAlert } from "lucide-react";

const crisisArticles = [
  {
    title: "Stripe Account Frozen? 5 Hidden Reasons Why",
    description: "Funds frozen? Learn the 5 hidden triggers that cause account freezes, immediate recovery steps, and how to find a stable long term provider.",
    slug: "/insights/crisis/stripe-account-frozen",
    icon: ShieldAlert,
  },
  {
    title: "Hidden Fee Crisis: How Your Low Rate Costs Thousands",
    description: "Your headline rate is not your real cost. Learn how to calculate your Effective Rate and uncover the 5 hidden fees draining your profits.",
    slug: "/insights/crisis/hidden-fee-crisis",
    icon: DollarSign,
  },
  {
    title: "Rejected by Stripe or Square? Recovery Plan",
    description: "Rejected by a major payment provider? Learn why the high risk label is not a judgment and how to find a provider that actually wants your business.",
    slug: "/insights/crisis/rejected-high-risk-strategy",
    icon: AlertTriangle,
  },
];

const CrisisIndex = () => {
  useSEO({
    title: "Crisis Intervention Guides | ChosePayments",
    description: "Urgent guides for merchants dealing with frozen accounts, hidden fees, or provider rejections. Practical steps to recover and find the right payment partner.",
    keywords: ["account frozen", "payment crisis", "provider rejection", "hidden fees", "recovery plan"],
  });

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
              to={article.slug}
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
