'use client'

import { useRef, useState } from "react";
import FAQSchema from "@/components/FAQSchema";

/**
 * Single source of truth for the homepage FAQ: the accordion below and the
 * FAQPage JSON-LD are both generated from this array, so the rendered copy
 * and the structured data cannot drift apart.
 */
export const HOME_FAQS = [
  {
    question: "How do I find the right payment processor for my business?",
    answer: "Start with what your business needs, not the lowest rate. Your business type, monthly volume, average order size and how you sell decide which processors will approve you and what you'll really pay. Our 5-question match does this comparison for you in about 30 seconds.",
  },
  {
    question: "How do I switch payment processors without losing sales?",
    answer: "Get the new account approved and tested before you leave the old one. Check your current contract for termination fees, ask whether your saved customer cards can be moved, and switch your checkout only once test payments have gone through. We plan each step with you.",
  },
  {
    question: "Can you have more than one payment processor?",
    answer: "Yes, and many growing businesses should. A second processor keeps you selling if your main one holds payouts or goes down. It usually costs little or nothing until you use it.",
  },
  {
    question: "Which payment processor has the lowest fees?",
    answer: "It depends on your volume and order size. Flat-rate processors like Stripe and Square are simple, but businesses with steady volume often pay less on interchange-plus pricing. We compare your real costs across processors before you choose.",
  },
  {
    question: "What's a good alternative to Stripe, PayPal or Square?",
    answer: "The right alternative depends on why you're leaving. If it's fees, an interchange-plus merchant account often costs less. If it's a freeze or a rejection, you need a processor that accepts your business type. Tell us what happened and we'll name the processors that fit.",
  },
  {
    question: "How do I change the payment processor on Shopify?",
    answer: "In Shopify, go to Settings, then Payments, and add a third-party provider. You need an approved account with that provider first, and Shopify charges an extra fee when you don't use Shopify Payments. We can tell you whether the switch is worth it at your volume.",
  },
  {
    question: "Why did my payment processor freeze my account or reject me?",
    answer: "Usually a mismatch, not a bad business. Sudden sales spikes, rising refunds or disputes, and business types the processor doesn't support are the common triggers. We match you with processors that understand your business so it doesn't happen again.",
  },
  {
    question: "Are you a payment processor? How do you get paid?",
    answer: "No. ChosePayments is an independent payment advisory, a bit like a mortgage broker for card processing. The processor you choose pays us after you're set up. It costs you nothing and doesn't change who we recommend.",
  },
];

const CpFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="faq" className="cp-section">
      <FAQSchema faqs={HOME_FAQS} />
      <div className="cp-wrap">
        <div className="cp-section-head cp-reveal">
          <span className="cp-section-tag">FAQ</span>
          <h2>Questions about finding a payment processor</h2>
          <p>Straight answers, no sales pitch. Ask us anything else on the call.</p>
        </div>

        <div className="cp-faq-list cp-reveal">
          {HOME_FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div className={`cp-faq-item${open ? " cp-open" : ""}`} key={faq.question}>
                <button
                  type="button"
                  className="cp-faq-q"
                  aria-expanded={open}
                  aria-controls={`cp-faq-a-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span>{faq.question}</span>
                  <span className="cp-faq-icon" aria-hidden="true">+</span>
                </button>
                <div
                  className="cp-faq-a"
                  id={`cp-faq-a-${i}`}
                  ref={(el) => { answerRefs.current[i] = el; }}
                  style={{ maxHeight: open ? answerRefs.current[i]?.scrollHeight ?? 400 : 0 }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CpFaq;
