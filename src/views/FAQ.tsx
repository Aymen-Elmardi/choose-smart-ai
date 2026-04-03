'use client'
import { useState } from "react";
import { Link } from '@/lib/router-compat';
import { ChevronDown, ArrowRight, HelpCircle, Shield, ClipboardCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSchema from "@/components/FAQSchema";
import { useSEO } from "@/hooks/useSEO";
import { useCanonical } from "@/hooks/useCanonical";

interface FAQItem {
  question: string;
  answer: string;
  excerpt?: string;
  readMoreLink?: string;
  readMoreLabel?: string;
}

interface FAQSection {
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
}

const aboutFAQs: FAQItem[] = [
  {
    question: "What is ChosePayments?",
    answer:
      "ChosePayments is an independent payment provider matching service. We help businesses find the payment processor that fits their industry, risk profile, and transaction volume. We do not process payments ourselves. Instead, we match you to the provider most likely to approve and support your business long term.",
  },
  {
    question: "How does the matching process work?",
    answer:
      "Our diagnostic assessment asks about your industry, average transaction value, monthly volume, chargeback exposure, and business model. We compare your answers against the known underwriting appetite of multiple payment providers and recommend the ones most likely to be a strong fit.",
  },
  {
    question: "Is ChosePayments free to use?",
    answer:
      "Yes. The assessment and recommendation are completely free for merchants. There are no hidden charges, no obligations, and no sales calls unless you want one.",
  },
  {
    question: "How does ChosePayments make money?",
    answer:
      "We earn a referral commission from payment providers when a business we recommend is approved and begins processing. Providers value our referrals because we only recommend businesses that genuinely fit their risk appetite. This means higher approval rates and better long term merchant retention for the provider. The service is completely free for merchants and our recommendations are never influenced by commission rates.",
  },
];

const paymentFAQs: FAQItem[] = [
  {
    question: "Why do payment accounts get frozen?",
    answer:
      "Payment providers freeze accounts when their automated risk systems detect activity that falls outside the expected pattern. This can include sudden volume spikes, changes in average transaction value, or operating in an industry the provider considers higher risk.",
    excerpt:
      "Stripe does not freeze accounts at random. In the UK, freezes usually happen when automated risk systems detect activity that deviates from the merchant's expected profile. A sudden spike in volume, a shift in average transaction value, or a product category the system flags as higher risk can all trigger a review.",
    readMoreLink: "/insights/why-stripe-freezes-accounts-uk",
    readMoreLabel: "Why Stripe freezes accounts in the UK",
  },
  {
    question: "What is a rolling reserve and why has my provider imposed one?",
    answer:
      "A rolling reserve is a percentage of your sales that your payment provider holds back for a set period, typically to cover potential chargebacks or refunds. Providers impose reserves when they assess that your business carries elevated risk.",
    excerpt:
      "A rolling reserve withholds a percentage of each transaction for a defined period, typically 90 to 180 days. Unlike a fixed reserve, the funds cycle back to the merchant as new funds replace them. This approach is common for businesses in industries where chargebacks or refund rates are structurally higher.",
    readMoreLink: "/insights/rolling-vs-fixed-reserve",
    readMoreLabel: "Rolling reserve vs fixed reserve explained",
  },
  {
    question: "Why was my payment provider application rejected?",
    answer:
      "Rejections happen when your business profile does not match the provider's underwriting appetite. Every provider has different risk tolerances based on industry type, transaction volume, chargeback history, and business model. A rejection from one provider does not mean every provider will reject you.",
    excerpt:
      "Each payment provider has a distinct risk appetite shaped by their acquiring bank relationships, regulatory obligations, and commercial strategy. A business that is declined by one provider may be a strong fit for another that specialises in that particular industry or risk profile.",
    readMoreLink: "/insights/provider-appetite-index",
    readMoreLabel: "See the Provider Appetite Index",
  },
  {
    question: "What are chargebacks and how do they affect my account?",
    answer:
      "A chargeback occurs when a customer disputes a transaction with their bank. If your chargeback rate exceeds certain thresholds set by card networks like Visa and Mastercard, your payment provider may impose restrictions, increase reserves, or terminate your account.",
    excerpt:
      "Chargebacks are not just a customer service issue. They are monitored by card networks through formal programmes. Visa's monitoring programme begins flagging merchants at around 0.65% and escalates through multiple tiers. Exceeding these thresholds can result in fines, increased processing costs, or account termination.",
    readMoreLink: "/insights/chargebacks-what-they-are-and-how-to-avoid-them",
    readMoreLabel: "Understanding chargebacks",
  },
  {
    question: "What should I do if my funds are being held?",
    answer:
      "If your provider is holding funds, it usually means a compliance or risk review has been triggered. The most important steps are to respond promptly to any documentation requests, maintain clear records of your transactions, and understand what specifically triggered the hold.",
    excerpt:
      "When a payment provider holds funds, the merchant's first instinct is often to panic or escalate aggressively. In most cases the most effective approach is to respond calmly and promptly with the documentation requested, while understanding the specific compliance or risk concern that triggered the hold.",
    readMoreLink: "/insights/what-to-do-when-funds-held",
    readMoreLabel: "What to do when your funds are held",
  },
];

const assessmentFAQs: FAQItem[] = [
  {
    question: "How long does the assessment take?",
    answer:
      "The assessment takes approximately two to three minutes. It consists of straightforward questions about your business type, transaction patterns, and current payment setup. No financial documents are required.",
  },
  {
    question: "What happens after I complete the assessment?",
    answer:
      "You receive an immediate recommendation showing which payment providers are the best fit for your business profile. You can then choose to proceed with an introduction to the recommended provider, or simply use the information to guide your own search.",
  },
  {
    question: "Do I need to share financial documents or sensitive information?",
    answer:
      "No. The assessment only asks general questions about your business model, industry, and transaction patterns. We do not ask for bank statements, financial records, or any personally identifiable information during the assessment.",
  },
];

const allFAQsFlat = [...aboutFAQs, ...paymentFAQs, ...assessmentFAQs];

const AccordionItem = ({ item }: { item: FAQItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-medium text-foreground text-base">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-4">
          <p className="text-muted-foreground text-base leading-relaxed">{item.answer}</p>
          {item.excerpt && item.readMoreLink && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-3">
              <p className="text-muted-foreground text-sm italic leading-relaxed">
                "{item.excerpt}"
              </p>
              <Link
                to={item.readMoreLink}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                {item.readMoreLabel || "Read more"}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  useSEO({
    title: "Frequently Asked Questions | ChosePayments",
    description:
      "Answers to common questions about how ChosePayments works, how we make money, payment provider matching, and merchant risk assessment.",
  });
  useCanonical();

  const sections: FAQSection[] = [
    {
      title: "About ChosePayments",
      icon: <HelpCircle className="h-5 w-5 text-primary" />,
      items: aboutFAQs,
    },
    {
      title: "Payment Provider Issues",
      icon: <Shield className="h-5 w-5 text-primary" />,
      items: paymentFAQs,
    },
    {
      title: "Using the Assessment",
      icon: <ClipboardCheck className="h-5 w-5 text-primary" />,
      items: assessmentFAQs,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQSchema faqs={allFAQsFlat} />

      <main className="section-container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Everything you need to know about how ChosePayments works, what our recommendations are
            based on, and how we help merchants find the right payment provider.
          </p>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <div className="flex items-center gap-2 mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                </div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <AccordionItem key={item.question} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 text-center border-t border-border pt-10">
            <p className="text-lg text-muted-foreground mb-4">Still have questions?</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
