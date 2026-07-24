'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { RefreshCw, ShoppingCart, UtensilsCrossed, AlertTriangle, Truck } from "lucide-react";

const providerFitArticles = [
  {
    title: "Best Payment Providers for Subscription & SaaS Businesses",
    description: "Recurring billing needs the right payment infrastructure. Find providers that support subscriptions, handle failed payments, and scale with your MRR.",
    slug: "/payment-provider-subscription-business",
    icon: RefreshCw,
  },
  {
    title: "Payment Processors for High-Risk Ecommerce",
    description: "High-risk ecommerce needs a specialist processor. Compare providers that accept your industry, offer chargeback protection, and won't freeze your account.",
    slug: "/payment-processors-high-risk-ecommerce",
    icon: ShoppingCart,
  },
  {
    title: "Best Payment Processors for High Chargeback Businesses",
    description: "High chargeback rates don't have to mean rejection. Find payment processors that work with your chargeback ratio and won't freeze your funds.",
    slug: "/best-payment-processors-high-chargebacks",
    icon: AlertTriangle,
  },
  {
    title: "MCC 5812 Payment Gateway UK: Best Options for Restaurants",
    description: "Restaurant and food service businesses need payment gateways that understand MCC 5812. Compare UK options that approve your business type.",
    slug: "/mcc-5812-payment-gateway-uk",
    icon: UtensilsCrossed,
  },
  {
    title: "Best Acquirers for Food Delivery Platforms",
    description: "Food delivery platforms face unique payment challenges. Find acquirers that support high volume, split payments, and marketplace structures.",
    slug: "/best-acquirers-food-delivery",
    icon: Truck,
  },
];

const faqs = [
  {
    question: "What makes a business a 'fit' problem rather than a general risk problem?",
    answer:
      "Fit is about your specific business model — subscription billing, high chargeback rates, restaurant MCC codes, marketplace payouts — not just your overall risk score. A business can be low-risk overall and still get declined by a provider that simply doesn't support its model. These guides match business models to providers built to support them.",
  },
  {
    question: "Why do restaurants and food businesses need a specific guide?",
    answer:
      "Because MCC 5812 (eating places and restaurants) carries specific interchange rates, tipping and gratuity handling, and reserve practices that differ from general retail. Providers vary a lot in how well they support this category.",
  },
  {
    question: "If none of these fit my business, what should I do?",
    answer:
      "Take our free assessment — it matches you to providers based on your actual risk profile, volume, and industry rather than a fixed category, which covers business models not listed here.",
  },
];

const ProviderFitIndex = () => {
  useSEO({
    title: "Provider Fit Guides: The Right Payment Processor for Your Business Model | ChosePayments",
    description: "Matching guides for subscription billing, high-risk ecommerce, high chargeback rates, restaurants, and food delivery — find providers built for your specific business model.",
    keywords: ["payment provider for subscription business", "high risk ecommerce processor", "restaurant payment gateway", "food delivery acquirer"],
  });

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: "Provider Fit Guides" },
        ]}
      />
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/70">Provider Fit Guides</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Provider Fit Guides
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Not every payment provider is built for every business model. Subscription businesses need dunning logic and MRR-aware billing. High chargeback merchants need providers that won't freeze funds at the first spike. Restaurants and food delivery platforms need infrastructure suited to their specific MCC codes and payout structures.
        </p>
        <p className="text-muted-foreground mb-12">
          These guides match specific business models to the providers actually built to support them — not just providers with the lowest headline rate.
        </p>

        <div className="space-y-6 mb-16">
          {providerFitArticles.map((article) => (
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

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <FAQAccordion faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderFitIndex;
