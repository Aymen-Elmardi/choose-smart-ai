'use client'

import { Store, Calculator, Wallet, LogOut } from "lucide-react";

// Same layout and classes as the "Why us" grid (CpWhyUs).
const CRITERIA = [
  {
    Icon: Store,
    title: "Fit for your business type",
    body: "Every processor has a list of businesses it won't take. Picking one that accepts yours avoids rejections and surprise holds.",
  },
  {
    Icon: Calculator,
    title: "Your real rate, not the advertised one",
    body: "Add up last month's fees and divide by sales. That number, not 2.9% + 30¢, is what you're paying.",
  },
  {
    Icon: Wallet,
    title: "How you get paid",
    body: "Payout speed, reserves and holds matter as much as fees, especially when sales spike.",
  },
  {
    Icon: LogOut,
    title: "What leaving costs",
    body: "Check for termination fees, contract length, and whether you can take your saved customer cards with you.",
  },
];

const CpChoose = () => (
  <section id="choose" className="cp-section">
    <div className="cp-wrap">
      <div className="cp-why-grid">
        <div className="cp-why-lead cp-reveal">
          <h2>How to choose a payment processor</h2>
          <p>The cheapest rate rarely wins. These four things decide whether a processor works for you.</p>
        </div>

        <div className="cp-why-list cp-reveal">
          {CRITERIA.map(({ Icon, title, body }) => (
            <div className="cp-why-item" key={title}>
              <div className="cp-why-icon" aria-hidden="true">
                <Icon className="w-4 h-4" strokeWidth={2} />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CpChoose;
