'use client'

import { Receipt, Briefcase, ShieldCheck, Scale } from "lucide-react";

const REASONS = [
  {
    Icon: Receipt,
    title: "In-depth fee & interchange knowledge",
    body: "We read processor pricing the way processors hope you won't.",
  },
  {
    Icon: Briefcase,
    title: "10 years in payments",
    body: "A decade advising businesses on payment stack decisions.",
  },
  {
    Icon: ShieldCheck,
    title: "STEP-certified in AML",
    body: "Formally certified in anti-money laundering and compliance.",
  },
  {
    Icon: Scale,
    title: "Independent, always",
    body: "No commissions. No processor owns us.",
  },
];

const CpWhyUs = () => (
  <section id="why" className="cp-section">
    <div className="cp-wrap">
      <div className="cp-why-grid">
        <div className="cp-why-lead cp-reveal">
          <span className="cp-section-tag">Why us</span>
          <h2>Built on a decade of payments expertise</h2>
          <p>
            We&apos;ve spent 10 years inside the payments industry, advising businesses on the
            processor fees, interchange rates, and fine print most owners never get shown.
            Independent, STEP-certified in AML, and paid the same no matter which processor you choose.
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
