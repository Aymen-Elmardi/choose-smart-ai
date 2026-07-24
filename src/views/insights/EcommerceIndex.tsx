'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { TrendingUp, Repeat, AlertTriangle } from "lucide-react";

const ecommerceArticles = [
  {
    title: "From High-Risk to High-Growth: Payment Strategy for Scaling Ecommerce",
    description: "High-risk labels don't have to hold you back. Learn how to reposition your ecommerce business and access better payment infrastructure as you scale.",
    slug: "/insights/ecommerce/high-risk-to-high-growth",
    icon: TrendingUp,
  },
  {
    title: "Subscription Revenue & Recurring Billing: Payment Infrastructure Guide",
    description: "Subscription businesses need specialised payment infrastructure. Learn which providers handle recurring billing, failed payment recovery, and dunning management.",
    slug: "/insights/ecommerce/subscription-revenue-recurring-billing",
    icon: Repeat,
  },
  {
    title: "Chargeback Thresholds & High-Risk Processors: What to Know",
    description: "Visa and Mastercard set chargeback thresholds that trigger monitoring programmes. Learn the limits, consequences, and which processors work above standard thresholds.",
    slug: "/insights/ecommerce/chargeback-thresholds-high-risk-processors",
    icon: AlertTriangle,
  },
];

const faqs = [
  {
    question: "How is this different from the Provider Fit Guides section?",
    answer:
      "Provider Fit Guides match a business model to specific providers worth applying to. This section covers the underlying ecommerce payment strategy — scaling past a high-risk label, structuring recurring billing, managing chargeback thresholds — that applies regardless of which provider you eventually choose.",
  },
  {
    question: "What counts as 'high-risk' ecommerce?",
    answer:
      "It's usually a combination of industry (subscriptions, digital goods, high-ticket items), chargeback ratio, and processing history rather than any one factor. Our high-risk to high-growth guide breaks down exactly what underwriters look at.",
  },
  {
    question: "Do chargeback thresholds apply the same way to every processor?",
    answer:
      "No — the Visa and Mastercard scheme thresholds are consistent, but how quickly a processor acts on them (reserves, account review, or termination) varies significantly. Some processors specialise in supporting merchants above standard thresholds; the chargeback thresholds guide covers which ones.",
  },
];

const EcommerceIndex = () => {
  useSEO({
    title: "Ecommerce Payment Strategy: Growth, Recurring Billing & Chargebacks | ChosePayments",
    description: "Payment strategy guides for scaling ecommerce businesses — moving past a high-risk label, structuring recurring billing, and managing chargeback thresholds.",
    keywords: ["high risk ecommerce", "recurring billing payments", "chargeback thresholds", "ecommerce payment strategy"],
  });

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: "E-commerce" },
        ]}
      />
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/70">E-commerce</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Ecommerce Payment Strategy
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Fast-growing ecommerce businesses run into the same handful of payment problems — a high-risk label that won't shift, recurring billing that leaks revenue through failed payments, or a chargeback ratio creeping toward a scheme threshold. These guides cover the strategy behind each one, not just which provider to switch to.
        </p>
        <p className="text-muted-foreground mb-12">
          For providers built specifically for your business model, see our <Link to="/insights/provider-fit" className="text-primary hover:underline">Provider Fit Guides</Link>.
        </p>

        <div className="space-y-6 mb-16">
          {ecommerceArticles.map((article) => (
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

export default EcommerceIndex;
