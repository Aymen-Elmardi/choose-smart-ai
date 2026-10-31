'use client'

import Link from 'next/link';
import { AlertTriangle, Receipt, Puzzle } from "lucide-react";

const PATHS = [
  {
    Icon: Receipt,
    title: "I'm switching processors",
    body: "Fees crept up and you're not sure why. Send us your last processing statement and we'll show you what you're really paying, what's negotiable, and whether switching saves you money.",
    linkText: "Check my statement for free",
    href: "/statement-review",
  },
  {
    Icon: Puzzle,
    title: "I'm comparing payment processors",
    body: "Stripe, Square, PayPal, Authorize.net or a merchant account? We compare real costs for your volume and order size, not the headline rate on a pricing page.",
    linkText: "Compare my options",
    href: "/assessment",
  },
  {
    Icon: AlertTriangle,
    title: "I've been frozen or rejected",
    body: "A hold, a reserve or a rejection usually means a mismatch, not a bad business. We match you with processors that approve your business type and understand how it works.",
    linkText: "Find a processor that says yes",
    href: "/assessment",
  },
];

const CpProblem = () => (
  <section id="problem" className="cp-section">
    <div className="cp-wrap">
      <div className="cp-section-head cp-reveal">
        <span className="cp-section-tag">The problem</span>
        <h2>Where are you right now?</h2>
        <p>Most businesses come to us at one of three moments.</p>
      </div>
      <div className="cp-problem-grid">
        {PATHS.map(({ Icon, title, body, linkText, href }) => (
          <div className="cp-p-card cp-reveal" key={title}>
            <div className="cp-p-icon" aria-hidden="true">
              <Icon className="w-[21px] h-[21px]" strokeWidth={2} />
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
            <Link href={href} className="cp-i-more">
              {linkText} <span className="cp-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CpProblem;
