'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FAQSchema from "@/components/FAQSchema";
import { useInView } from "@/hooks/useInView";

const faqs = [
  {
    question: "What is a payment processor risk profile?",
    answer:
      "A risk profile is how payment providers assess your business before approving a merchant account. It covers your industry, monthly volume, chargeback history, business model, and transaction type. Providers use it to decide whether to approve you, at what rate, and under what terms. Running your profile before applying prevents rejections and account freezes.",
  },
  {
    question: "Why do payment processors freeze accounts?",
    answer:
      "Account freezes happen when a processor's system flags your account based on risk triggers. Common causes include a sudden volume spike, a chargeback rate above threshold, a business model that does not match how you were originally onboarded, or industry reclassification. Running your risk profile before applying helps you avoid processors likely to freeze your account.",
  },
  {
    question: "Is ChosePayments free for merchants?",
    answer:
      "Yes. Completely free for merchants. ChosePayments is funded through partnerships with payment providers, not through merchant fees or commissions. You pay nothing and have no obligation to apply to any provider we recommend.",
  },
  {
    question: "What if I have already been declined by a payment processor?",
    answer:
      "Previous declines do not disqualify you. Most merchants who use ChosePayments have already been rejected by at least one provider. A decline usually means you applied to the wrong processor for your risk profile, not that approval is impossible. We identify the processors that are the correct fit for your business.",
  },
  {
    question: "Do you cover high-risk industries?",
    answer:
      "Yes. ChosePayments covers all merchant categories including high-risk industries such as gambling, supplements, forex, subscription services, adult content, and e-cigarettes. Our matching engine includes specialist acquirers who understand these business models and are set up to approve them.",
  },
  {
    question: "How is this different from a payment processor comparison site?",
    answer:
      "Comparison sites list providers side by side. ChosePayments identifies which specific providers are likely to approve your business based on your actual risk profile. The output tells you which to apply to and which to avoid, with specific reasons for each. You apply once, to the right provider, with a high probability of approval.",
  },
];

const FAQSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="section-padding bg-secondary" ref={ref}>
      <FAQSchema faqs={faqs} />
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            Common Questions About UK Merchant Accounts and Payment Processors
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Everything UK merchants ask before running their risk profile.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="border border-border rounded-lg overflow-hidden bg-card">
                <button
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                  aria-expanded={open}
                >
                  <span className="font-medium text-foreground text-base">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground text-base leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
