'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { ShieldAlert, FileText, CreditCard, Scale } from "lucide-react";

const complianceArticles = [
  {
    title: "Why Payment Providers Impose Rolling Reserves",
    description: "Rolling reserves hold back a percentage of your revenue. Learn why providers impose them, how long they last, and how to negotiate their removal.",
    slug: "/insights/why-providers-impose-reserves",
    icon: ShieldAlert,
  },
  {
    title: "Scheme Rules: Reserves & Monitoring",
    description: "Card scheme monitoring programmes can trigger rolling reserves. Learn how Visa and Mastercard monitor merchants and what to do if you're flagged.",
    slug: "/insights/scheme-rules-reserves-monitoring",
    icon: FileText,
  },
  {
    title: "Scheme Rules by Payment Method",
    description: "Different payment methods have different scheme rules. Understand how rules vary for debit, credit, corporate cards, and wallet payments.",
    slug: "/insights/scheme-rules-by-payment-method",
    icon: CreditCard,
  },
  {
    title: "Payment Scheme Rules Explained: Visa & Mastercard",
    description: "Visa and Mastercard scheme rules govern how all card payments work. Understanding these rules explains why providers behave the way they do.",
    slug: "/insights/payment-scheme-rules-explained",
    icon: Scale,
  },
];

const faqs = [
  {
    question: "Who actually sets these rules — the provider or the card schemes?",
    answer:
      "Card schemes (Visa, Mastercard) set the underlying rules; your payment provider and acquirer are contractually required to enforce them. That's why a rule can feel like 'your provider's decision' when it's actually a scheme requirement being passed down — providers have limited discretion to waive it.",
  },
  {
    question: "If I'm flagged by a scheme monitoring programme, is that permanent?",
    answer:
      "No. Monitoring programmes are typically tied to a rolling window of chargeback or fraud ratios. Bringing your ratio back under the threshold for a sustained period generally exits you from the programme, though the exact process varies by scheme and provider.",
  },
  {
    question: "Does this apply the same way to UK and EU merchants?",
    answer:
      "Visa and Mastercard scheme rules are largely global, but the compliance and reporting requirements layered on top (SCA, local regulator obligations) differ between the UK and EU. Each article notes where the regional difference matters.",
  },
];

const ComplianceIndex = () => {
  useSEO({
    title: "Payment Compliance: Scheme Rules, Reserves & Monitoring | ChosePayments",
    description: "How Visa and Mastercard scheme rules, reserve requirements, and monitoring programmes actually work — and what triggers them for merchants.",
    keywords: ["scheme rules", "rolling reserve", "visa mastercard rules", "chargeback monitoring programme", "payment compliance"],
  });

  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/insights" },
          { name: "Compliance" },
        ]}
      />
      <FAQSchema faqs={faqs.map(({ question, answer }) => ({ question, answer }))} />
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/insights" className="hover:text-foreground transition-colors">Insights</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground/70">Compliance</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Payment Compliance
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Reserves, monitoring programmes, and scheme rules can feel arbitrary when you're on the receiving end of them — but they follow specific rules set by Visa and Mastercard that your provider is required to enforce. These guides explain the actual mechanics, so you know what's driving a decision and what levers you have to respond to it.
        </p>
        <p className="text-muted-foreground mb-12">
          If you're dealing with a specific document or verification request rather than reserves or scheme monitoring, see our <Link to="/insights/guides" className="text-primary hover:underline">onboarding guides</Link> instead.
        </p>

        <div className="space-y-6 mb-16">
          {complianceArticles.map((article) => (
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

export default ComplianceIndex;
