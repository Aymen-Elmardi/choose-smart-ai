'use client'

import Link from 'next/link';
import { ShoppingCart, Repeat, Network, Store, UtensilsCrossed } from "lucide-react";

const USE_CASES = [
  { Icon: ShoppingCart, title: "Ecommerce and Shopify stores", body: "Find the best payment processor for ecommerce, with backup options ready before peak season." },
  { Icon: Repeat, title: "SaaS and subscriptions", body: "Recurring billing, card updates and fewer failed payments." },
  { Icon: Network, title: "Marketplaces and platforms", body: "Split payouts, seller checks and processors built for multi-seller businesses." },
  { Icon: Store, title: "Retail, online and in store", body: "One setup for online and in-person payments, with one set of reports." },
  { Icon: UtensilsCrossed, title: "Restaurants and online ordering", body: "Processors that understand delivery, tips and high order volume." },
];

const CpUseCases = () => (
  <section id="use-cases" className="cp-section">
    <div className="cp-wrap">
      <div className="cp-section-head cp-reveal">
        <span className="cp-section-tag">Use cases</span>
        <h2>Payment processors for growing US businesses</h2>
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
          We work with businesses processing <b>$30k a month and up</b>.
        </p>
        <Link href="/assessment" className="cp-btn cp-btn-ghost">Find my processor</Link>
      </div>
    </div>
  </section>
);

export default CpUseCases;
