'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Calculator, BarChart3 } from "lucide-react";

const pricingArticles = [
  {
    title: "Interchange++ Pricing Explained",
    description: "The expert guide to Interchange++ pricing: what it really is, why it is an underwriting outcome not a menu option, and how to know if you qualify.",
    slug: "/insights/pricing-models/interchange-plus-plus",
    icon: Calculator,
  },
  {
    title: "Blended vs Interchange++: Expert Pricing Guide",
    description: "Discover the strategic trade off between blended pricing and Interchange++. Learn which model fits your business based on volume, risk, and growth stage.",
    slug: "/insights/pricing-models/blended-vs-interchange",
    icon: BarChart3,
  },
];

const PricingModelsIndex = () => {
  useSEO({
    title: "Payment Pricing Models Explained | ChosePayments",
    description: "Understand the difference between Interchange++, blended pricing, and other payment processing fee structures. Learn which pricing model saves you the most.",
    keywords: ["interchange plus plus", "blended pricing", "payment fees", "pricing models"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Payment Pricing Models
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Understanding how payment processors structure their fees is one of the most important decisions for any growing business. These guides break down the two most common pricing models so you can make an informed choice.
        </p>

        <div className="space-y-6">
          {pricingArticles.map((article) => (
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

export default PricingModelsIndex;
