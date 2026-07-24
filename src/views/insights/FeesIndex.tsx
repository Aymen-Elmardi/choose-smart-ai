'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { Receipt, DollarSign, CircleDollarSign } from "lucide-react";

const feesArticles = [
  {
    title: "Stripe Fees UK (2026): What Businesses Actually Pay",
    description: "Stripe's UK card fee is 1.5% + 20p, but that's just the start. This guide covers Connect fees, international charges, European rates, and what you actually pay at scale in 2026.",
    slug: "/insights/stripe-fees-explained",
    icon: Receipt,
  },
  {
    title: "Checkout.com Fees and Pricing (2026): What Businesses Actually Pay",
    description: "Checkout.com does not publish standard pricing. This guide covers what businesses actually pay in 2026, with indicative rates from 0.2% to 1.8%.",
    slug: "/insights/checkout-com-fees-explained",
    icon: Receipt,
  },
  {
    title: "Adyen Pricing Explained: Interchange++ Fees & Processing Costs",
    description: "Adyen charges Interchange++ plus a small processing fee. Learn what that means in practice and how Adyen's pricing compares at different volumes.",
    slug: "/insights/adyen-pricing-explained",
    icon: CircleDollarSign,
  },
  {
    title: "PayPal Fees UK (2026): Complete Breakdown for Businesses and Consumers",
    description: "Full breakdown of PayPal fees for UK users in 2026, covering business transaction rates, instant transfer costs, and currency conversion.",
    slug: "/insights/paypal-fees-explained",
    icon: DollarSign,
  },
  {
    title: "Fiserv Clover Pricing (2026): Hardware, Software and Processing Fees Explained",
    description: "Clover pricing starts at $49 for the Go reader. Full breakdown of hardware costs, monthly software fees, and card processing rates for merchants in 2026.",
    slug: "/insights/fiserv-clover-pricing-explained",
    icon: Receipt,
  },
];

const faqs = [
  {
    question: "Why isn't there a single 'true cost' number for each provider?",
    answer:
      "Because effective rate depends on your card mix, transaction size, country mix, and whether you trigger add-on fees like Connect, chargebacks, or FX. Each article breaks down the components so you can calculate your own effective rate rather than trust a single headline number.",
  },
  {
    question: "What's the difference between blended and interchange++ pricing?",
    answer:
      "Blended pricing charges one flat rate regardless of card type, which is simpler but usually more expensive at volume. Interchange++ passes through the real interchange and scheme fees plus a fixed markup, which is cheaper at scale but requires more scrutiny to compare providers fairly. See our pricing models section for the full breakdown.",
  },
  {
    question: "Do these fee breakdowns include VAT?",
    answer:
      "Processing fees themselves are typically outside the scope of UK VAT, but each article notes where VAT applies to related charges (like hardware or software subscriptions) so you're not caught out on your actual invoice.",
  },
];

const FeesIndex = () => {
  useSEO({
    title: "Payment Provider Fees & Costs Explained (2026) | ChosePayments",
    description: "Real 2026 fee breakdowns for Stripe, Checkout.com, Adyen, PayPal, and Fiserv Clover — what you actually pay beyond the headline rate, including add-ons most guides skip.",
    keywords: ["payment processing fees", "stripe fees", "checkout.com fees", "adyen pricing", "paypal fees", "clover pricing"],
  });

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: "Fees & Costs" },
        ]}
      />
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/70">Fees & Costs</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Payment Provider Fees & Costs
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          The headline rate on a pricing page is rarely what you actually pay. Connect fees, chargeback costs, FX markups, and volume-based add-ons all sit outside the number a provider leads with. These guides break down the full, real cost of the major payment platforms so you can compare them properly.
        </p>
        <p className="text-muted-foreground mb-12">
          If you're comparing pricing models rather than specific providers, see our <Link to="/insights/pricing-models" className="text-primary hover:underline">Pricing Models guide</Link> for how blended and interchange++ pricing actually work.
        </p>

        <div className="space-y-6 mb-16">
          {feesArticles.map((article) => (
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

export default FeesIndex;
