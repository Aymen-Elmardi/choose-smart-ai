'use client'

import { Link } from '@/lib/router-compat';
import { ShoppingCart, Repeat, Network, Store, UtensilsCrossed } from "lucide-react";

const USE_CASES = [
  { Icon: ShoppingCart, title: "High-volume ecommerce", body: "Gateway audit and acceptance optimisation." },
  { Icon: Repeat, title: "SaaS and subscription platforms", body: "Recurring billing and churn reduction strategy." },
  { Icon: Network, title: "Marketplace operators", body: "Multi-seller payout and compliance review." },
  { Icon: Store, title: "Omnichannel retailers", body: "Unified payment infrastructure advisory." },
  { Icon: UtensilsCrossed, title: "F&B and online ordering platforms", body: "Restaurant and delivery-specific risk and payout review." },
];

const CpUseCases = () => (
  <section id="use-cases" className="cp-section">
    <div className="cp-wrap">
      <div className="cp-section-head cp-reveal">
        <span className="cp-section-tag">Use cases</span>
        <h2>Built for businesses that outgrow generic processors</h2>
      </div>

      <div className="cp-who-grid">
        {USE_CASES.map(({ Icon, title, body }) => (
          <div className="cp-w-card cp-reveal" key={title}>
            <div className="cp-w-icon" aria-hidden="true">
              <Icon className="w-[19px] h-[19px]" strokeWidth={2} />
            </div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <div className="cp-fit-banner cp-reveal">
        <p>
          We work with businesses at every stage, from <b>$30k a month to eight figures</b>.
          If you&apos;ve started receiving payments, we can tell you where you stand.
        </p>
        <Link to="/#book" className="cp-btn cp-btn-ghost">Let&apos;s talk</Link>
      </div>
    </div>
  </section>
);

export default CpUseCases;
