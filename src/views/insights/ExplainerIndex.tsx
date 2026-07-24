'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQAccordion from "@/components/FAQAccordion";
import {
  Wallet,
  CreditCard,
  Landmark,
  Clock,
  ShieldCheck,
  Smartphone,
  Percent,
  BookOpen,
  Scale,
} from "lucide-react";

const explainerArticles = [
  {
    title: "Payment Provider Risk Models Explained",
    description: "Every payment provider has a risk model they use to approve or reject merchants. Understanding their criteria helps you apply to the right provider first time.",
    slug: "/insights/payment-provider-risk-models",
    icon: Scale,
  },
  {
    title: "Provider Appetite Index: Which Providers Accept Which Businesses",
    description: "A comprehensive index of payment provider risk appetites by industry. Find which providers will accept your business before you apply.",
    slug: "/insights/provider-appetite-index",
    icon: BookOpen,
  },
  {
    title: "Why Wallet Payments Have Higher Success Rates",
    description: "Apple Pay and Google Pay consistently outperform card payments on approval rates. Learn why wallets succeed where cards fail.",
    slug: "/insights/wallet-payments-guaranteed-success",
    icon: Wallet,
  },
  {
    title: "Apple Pay & Google Pay Explained for Merchants",
    description: "Digital wallets are now expected by customers. Learn how Apple Pay and Google Pay work for merchants, their costs, and which providers support them.",
    slug: "/insights/apple-pay-google-pay-explained",
    icon: Smartphone,
  },
  {
    title: "Credit Card Payments Explained: How They Work Behind the Scenes",
    description: "What actually happens when a customer pays by credit card? The full journey from tap to settlement — and what it means for your merchant fees.",
    slug: "/insights/credit-card-payments-explained",
    icon: CreditCard,
  },
  {
    title: "Open Banking Payments UK: What Merchants Need to Know",
    description: "Open banking is changing how UK merchants get paid. Learn how account-to-account payments work and when they make sense for your business.",
    slug: "/insights/open-banking-payments-uk",
    icon: Landmark,
  },
  {
    title: "Rolling vs Fixed Reserve: What's the Difference?",
    description: "Payment providers use both rolling and fixed reserves. Learn how each type works, which is better for your cash flow, and how to negotiate.",
    slug: "/insights/rolling-vs-fixed-reserve",
    icon: Clock,
  },
  {
    title: "Payout & Settlement Explained: When Do You Get Paid?",
    description: "Settlement timing affects your cash flow. Learn how payment provider settlement cycles work and how to choose a provider with the right payout speed.",
    slug: "/insights/payout-settlement-explained",
    icon: Clock,
  },
  {
    title: "Net vs Gross Settlement: What It Means for Your Cash Flow",
    description: "Net settlement deducts fees before paying you. Gross settlement pays the full amount then invoices separately. Learn which is better for your business.",
    slug: "/insights/net-vs-gross-settlement",
    icon: Percent,
  },
  {
    title: "Low Value Transaction Exemption: Reduce SCA Friction",
    description: "The low value exemption lets you skip SCA for small transactions. Learn how it works, the thresholds, and how to configure it with your payment provider.",
    slug: "/insights/low-value-transaction-exemption",
    icon: ShieldCheck,
  },
  {
    title: "Payment Acronyms Explained: PSP, MCC, SCA, PCI and More",
    description: "The payments industry runs on acronyms. Learn what PSP, acquirer, MCC, SCA, 3DS, PCI DSS, and 40+ other payment terms actually mean.",
    slug: "/insights/payment-acronyms-explained",
    icon: BookOpen,
  },
];

const faqs = [
  {
    question: "What's the difference between an explainer and a guide?",
    answer:
      "Our explainers break down a single payments concept — a fee structure, a settlement mechanic, a piece of terminology — in plain English. Guides (in a separate section) walk through a process end to end, like switching providers or preparing for underwriting.",
  },
  {
    question: "Why do payment terms matter if I'm not a developer?",
    answer:
      "Because the acronyms and mechanics in this section directly affect your approval odds, your cash flow, and your effective cost per transaction. Knowing the difference between net and gross settlement, or what an SCA exemption does, changes decisions you make when comparing providers.",
  },
  {
    question: "Do these explainers apply to both UK and EU businesses?",
    answer:
      "Most of the mechanics — settlement, reserves, wallet payments, scheme terminology — are the same across UK and EU card schemes. Where a rule is UK-specific (for example, certain SCA thresholds), the individual article calls that out.",
  },
];

const ExplainerIndex = () => {
  useSEO({
    title: "Payment Explainers: Terms & Mechanics Merchants Need to Know | ChosePayments",
    description: "Plain-English explainers on payment settlement, reserves, wallet payments, SCA exemptions, and the acronyms every merchant runs into — without the jargon.",
    keywords: ["payment explainer", "payment terms", "settlement explained", "SCA exemption", "payment acronyms"],
  });

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: "Explainers" },
        ]}
      />
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/70">Explainers</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Payment Explainers
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Payments has its own vocabulary — settlement, reserves, SCA exemptions, scheme rules — and most of it is never explained anywhere a merchant would actually read it. These explainers cover the mechanics behind the terms, in plain English, so you can read a provider's contract or a processing statement and know exactly what you're looking at.
        </p>
        <p className="text-muted-foreground mb-12">
          Start with whichever concept is costing you time right now, or work through them in order if you're new to how payment processing actually works end to end.
        </p>

        <div className="space-y-6 mb-16">
          {explainerArticles.map((article) => (
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

export default ExplainerIndex;
