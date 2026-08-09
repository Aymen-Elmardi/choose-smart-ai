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
    question: "Is ChosePayments a payment processor?",
    answer: "No. We don't process payments ourselves. We're an independent advisory that matches your business with the right processor from 50+ options across the US, UK, and EU.",
  },
  {
    question: "How does ChosePayments make money?",
    answer: "We're paid by the processor once you're matched and onboarded, similar to how a mortgage broker is paid by a lender. It costs you nothing, and it doesn't change who we recommend, we're not owned by or tied to any processor.",
  },
  {
    question: "Is the assessment actually free?",
    answer: "Yes. The review, the call, and the match are free, regardless of what we find or whether you go ahead with a new processor.",
  },
  {
    question: "Why did my payment processor freeze or hold my account?",
    answer: "Usually a chargeback spike, an unexpected jump in volume, or a mismatch between what your business actually does and how it was classified at signup. We can walk through your specific case on a call.",
  },
  {
    question: "What makes a business high-risk?",
    answer: "Chargeback exposure, card-not-present sales, and certain categories like restaurants, subscriptions, and marketplaces. High-risk isn't a judgment, it just means you need a processor actually built to underwrite it.",
  },
  {
    question: "Do you work with small or early-stage businesses?",
    answer: "Yes, from around $30k a month in volume up. If you've started receiving payments, we can tell you where you stand.",
  },
  {
    question: "Do you only work with US businesses?",
    answer: "No. We cover the US, UK, and EU, and match across processors in all three.",
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
          <h2>Questions we get asked a lot</h2>
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
