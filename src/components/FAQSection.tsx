'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FAQSchema from "@/components/FAQSchema";
import { useInView } from "@/hooks/useInView";

const faqs = [
  {
    question: "Is ChosePayments really free for merchants?",
    answer:
      "Yes, completely free. We are paid by the payment processors when we make a successful introduction. You never pay us a fee, a commission, or anything else. Our incentive is to find you the right fit, because that is how we get paid.",
  },
  {
    question: "What is a payment processor risk profile?",
    answer:
      "A risk profile is how payment providers assess your business before approving a merchant account. It covers your industry, monthly volume, chargeback history, business model, and transaction type. Providers use it to decide whether to approve you, at what rate, and under what terms. Running yours before applying prevents rejections and account freezes.",
  },
  {
    question: "Why do payment processors freeze accounts?",
    answer:
      "Account freezes are triggered by automated risk thresholds. A spike in chargebacks, a sudden increase in volume, or a business model that no longer fits the processor's risk appetite. The freeze is rarely personal. It is a system flag. Knowing your risk profile before you apply puts you with a processor whose thresholds match your business.",
  },
  {
    question: "Do you work with high-risk businesses?",
    answer:
      "Yes. We work with businesses across all risk categories including gaming, adult content, CBD, crypto, travel, and subscription businesses with recurring billing. High-risk merchants often benefit most from our matching service because the cost of being on the wrong processor is highest for them.",
  },
  {
    question: "What if I have already been declined by a processor?",
    answer:
      "A decline from one processor does not mean you will be declined by all of them. Each processor has different underwriting criteria. We match you to ones whose criteria fit your specific risk profile, including businesses that have been declined elsewhere.",
  },
  {
    question: "How is this different from a comparison website?",
    answer:
      "Comparison sites show you a list of processors. We show you which processors will actually approve your specific business, at what rate, and why, based on your risk profile. Then we introduce you directly and guide the application. It is the difference between a search result and a specialist.",
  },
  {
    question: "Do you cover US businesses?",
    answer:
      "Yes. We work with businesses in the United States, United Kingdom, and across the EU. We have processor relationships and expertise across all three markets, including high-risk categories in each.",
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
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">FAQ</p>
          <h2 className="heading-lg text-foreground">
            Common Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="border border-border rounded-lg overflow-hidden bg-card transition-colors hover:border-primary/40">
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
