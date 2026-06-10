import { Link } from '@/lib/router-compat';
import { ShieldAlert, BarChart3, Receipt } from "lucide-react";

const boxes = [
  {
    icon: ShieldAlert,
    title: "Holds and Reviews",
    description: "Why funds get frozen and what triggers it. Your account type, chargeback rate, and volume pattern all feed into this decision automatically.",
    link: "/insights/why-payment-accounts-get-frozen-without-warning",
  },
  {
    icon: BarChart3,
    title: "Reserves and Risk Bands",
    description: "How providers protect themselves and why your pricing tier changed. Reserve requirements are tied directly to your risk classification.",
    link: "/insights/scheme-rules-reserves-monitoring",
  },
  {
    icon: Receipt,
    title: "Fees and Effective Rate",
    description: "Why your 1.4% became 2.3%. Scheme fees, assessment fees, and interchange variations add up in ways your headline rate does not show.",
    link: "/insights/crisis/hidden-fee-crisis",
  },
];

const HowPaymentsWorkSection = () => {
  return (
    <section className="border-t border-border">
      <div className="section-container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-foreground mb-4">
            Payment Providers Don't Act Randomly.
          </h2>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-3 mb-12 max-w-xl">
            <p>
              They act on risk thresholds, scheme rules, and statistical triggers.
              If something changed in your account, there is a specific reason.
            </p>
            <p>Here is how the system actually works.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {boxes.map((box) => (
              <Link
                key={box.title}
                to={box.link}
                className="border border-border rounded-lg bg-secondary/30 p-7 md:p-8 shadow-sm hover:border-primary/40 transition-colors group"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <box.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {box.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {box.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowPaymentsWorkSection;
