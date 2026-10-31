'use client'

import { Receipt, Briefcase, ShieldCheck, Scale } from "lucide-react";

const REASONS = [
  {
    Icon: Receipt,
    title: "We know the fees",
    body: "Interchange, markups and the line items most people miss on a statement.",
  },
  {
    Icon: Briefcase,
    title: "10 years in payments",
    body: "We've worked inside the industry and know how underwriters think.",
  },
  {
    Icon: ShieldCheck,
    title: "STEP-certified in AML",
    body: "We prepare your application so it gets approved the first time.",
  },
  {
    Icon: Scale,
    title: "Free for you",
    body: "Processors pay us after you're set up, like a mortgage broker. It costs you nothing.",
  },
];

const CpWhyUs = () => (
  <section id="why" className="cp-section">
    <div className="cp-wrap">
      <div className="cp-why-grid">
        <div className="cp-why-lead cp-reveal">
          <span className="cp-section-tag">Why us</span>
          <h2>Independent payment advisors, on your side</h2>
          <p>
            We don&apos;t process payments and we don&apos;t work for one processor. We&apos;re paid the
            same whichever processor you pick, so our only job is finding the right fit.
          </p>
        </div>

        <div className="cp-why-list cp-reveal">
          {REASONS.map(({ Icon, title, body }) => (
            <div className="cp-why-item" key={title}>
              <div className="cp-why-icon" aria-hidden="true">
                <Icon className="w-4 h-4" strokeWidth={2} />
              </div>
              <h4>{title}</h4>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CpWhyUs;
