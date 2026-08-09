'use client'

import { AlertTriangle, Receipt, Puzzle } from "lucide-react";

const PROBLEMS = [
  {
    Icon: AlertTriangle,
    title: "Your account gets frozen without warning",
    body: "One Friday afternoon, payments stop. No explanation, no timeline. You chose a provider that was never built for your business model.",
  },
  {
    Icon: Receipt,
    title: "You're paying more than you should",
    body: "Fees buried in blended rates, charges that appear months in. Most businesses overpay by thousands a year and never know it.",
  },
  {
    Icon: Puzzle,
    title: "Your processor doesn't understand your business",
    body: "Generic processors treat every business the same. If yours sits in a complex category, subscriptions, marketplaces, high volume, you're one review away from a hold.",
  },
];

const CpProblem = () => (
  <section id="problem" className="cp-section">
    <div className="cp-wrap">
      <div className="cp-section-head cp-reveal">
        <span className="cp-section-tag">The problem</span>
        <h2>Most businesses are on the wrong processor</h2>
      </div>
      <div className="cp-problem-grid">
        {PROBLEMS.map(({ Icon, title, body }) => (
          <div className="cp-p-card cp-reveal" key={title}>
            <div className="cp-p-icon" aria-hidden="true">
              <Icon className="w-[21px] h-[21px]" strokeWidth={2} />
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CpProblem;
