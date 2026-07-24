'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { Building2, Globe, Layers, Scale3d, Users } from "lucide-react";

const providerArticles = [
  {
    title: "Stripe: The Engine That Built the Modern Internet Economy",
    description: "Stripe revolutionized digital commerce with its developer-first API and unified financial infrastructure. Learn how to optimize your business for Stripe's platform.",
    slug: "/insights/stripe-payment-platform",
    icon: Globe,
  },
  {
    title: "Adyen: The Single Platform That Rewrote the Enterprise Payments Playbook",
    description: "How Adyen's unified approach to acquiring, gateway, and risk management is transforming global commerce for the world's largest brands.",
    slug: "/insights/adyen-enterprise-payments-platform",
    icon: Layers,
  },
  {
    title: "Checkout.com: The High-Performance Platform Built for Global Ambition",
    description: "Discover why Checkout.com's modular architecture delivers superior authorization rates and granular control for high-growth global merchants.",
    slug: "/insights/checkout-com-enterprise-platform",
    icon: Building2,
  },
  {
    title: "Shift4 Payments Platform: Enterprise Features for Hospitality & Retail",
    description: "Shift4 powers large hospitality, restaurant, and retail payment operations. Learn what makes their platform different from standard processors.",
    slug: "/insights/shift4-payments-platform",
    icon: Building2,
  },
  {
    title: "Fiserv and the First Data Payment Gateway: What Merchants Need to Know",
    description: "Fiserv acquired First Data in 2019, creating one of the largest payment gateway and merchant processing networks in the world.",
    slug: "/insights/fiserv-payments-platform",
    icon: Layers,
  },
  {
    title: "PayPal for Business: Platform Overview & When It Fits",
    description: "PayPal remains one of the world's most recognised payment brands. Learn when it's the right choice and when its limitations will cost you.",
    slug: "/insights/paypal-payment-platform",
    icon: Users,
  },
  {
    title: "Enterprise Payment Provider Comparison: Adyen vs Shift4 vs Checkout.com (2026)",
    description: "Comparing enterprise payment providers? We break down Adyen, Shift4, and Checkout.com across pricing, global acquiring, risk appetite, and UK suitability for 2026.",
    slug: "/insights/enterprise-provider-comparison",
    icon: Scale3d,
  },
  {
    title: "Shift4 vs Stripe for Enterprise: Which Is Right for Your Business?",
    description: "Shift4 and Stripe both serve enterprise merchants — but in very different ways. Compare their strengths, pricing, and risk appetites.",
    slug: "/insights/shift4-vs-stripe-enterprise",
    icon: Scale3d,
  },
  {
    title: "Adyen vs First Data (Fiserv): Enterprise Payment Platform Comparison",
    description: "Adyen and First Data (now Fiserv) both serve large merchants. Compare their global acquiring, pricing models, and risk approach.",
    slug: "/insights/adyen-vs-first-data",
    icon: Scale3d,
  },
];

const faqs = [
  {
    question: "How is a provider deep dive different from a fees article?",
    answer:
      "Deep dives cover the platform as a whole — architecture, risk appetite, who it's built for, and where it fits against alternatives. Our Fees & Costs section covers the pricing detail for the same providers if that's specifically what you need.",
  },
  {
    question: "Which provider should I pick for an enterprise business?",
    answer:
      "It depends on your volume, geographic footprint, and risk profile more than any single feature. Adyen and Checkout.com tend to suit high-volume global merchants with clean risk profiles; Shift4 specialises in hospitality and retail; Stripe suits developer-led businesses that value integration speed. The comparison articles above go into the trade-offs in more depth.",
  },
  {
    question: "Do these reviews cover UK-specific considerations?",
    answer:
      "Yes — each review notes UK acquiring, settlement currency, and onboarding considerations specifically, since a platform's US strengths don't always translate directly to UK merchant needs.",
  },
];

const ProvidersIndex = () => {
  useSEO({
    title: "Payment Provider Deep Dives: Stripe, Adyen, Checkout.com & More | ChosePayments",
    description: "In-depth, independent reviews of the major payment platforms — Stripe, Adyen, Checkout.com, Shift4, Fiserv, and PayPal — covering architecture, risk appetite, and who each one actually fits.",
    keywords: ["payment provider review", "stripe review", "adyen review", "checkout.com review", "enterprise payment platform"],
  });

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: "Provider Deep Dives" },
        ]}
      />
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/70">Provider Deep Dives</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Payment Provider Deep Dives
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Marketing pages tell you a provider is "fast" and "trusted." They don't tell you its actual risk appetite, how its architecture affects authorization rates, or which business types it quietly declines. These deep dives cover the major payment platforms the way an underwriter or a payments consultant would — architecture, commercial model, and genuine fit.
        </p>
        <p className="text-muted-foreground mb-12">
          Use the head-to-head comparisons if you're choosing between two specific platforms, or the individual reviews if you want the full picture on one provider.
        </p>

        <div className="space-y-6 mb-16">
          {providerArticles.map((article) => (
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

export default ProvidersIndex;
