import { TrendingUp, Target, MapPin, Users, Gift, ShieldCheck, Globe, Zap, Handshake } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const buildValueProps = (market: "UK" | "US") => [
  {
    icon: TrendingUp,
    title: "Born from Real Failures",
    description: "We've seen businesses lose revenue, get frozen, and churn through providers. All because nobody checked the fit before they applied.",
  },
  {
    icon: Target,
    title: "Outcome-Driven Methodology",
    description: "Every recommendation ties to measurable impact: revenue captured, costs reduced, account stability improved.",
  },
  market === "US"
    ? {
        icon: MapPin,
        title: "US Payments Specialists",
        description: "Deep expertise in US payment regulations, card network rules, and acquirer relationships across all merchant categories.",
      }
    : {
        icon: MapPin,
        title: "UK and EU Specialists",
        description: "Deep expertise in UK and EU regulatory frameworks, scheme rules, and acquirer relationships across all merchant categories.",
      },
  {
    icon: Users,
    title: "Independent, Not Affiliated",
    description: "We are not owned by any payment provider. Our recommendations are based on what fits your business, not commission rates.",
  },
];

// Homepage (/) content per the content guide.
const ukValueProps = [
  {
    icon: Gift,
    title: "Always Free for Merchants",
    description: "We are paid by the payment processors when we make a successful introduction. You pay nothing, ever.",
  },
  {
    icon: ShieldCheck,
    title: "Independent, Not Affiliated",
    description: "We are not owned by any processor. Our recommendations are based on what fits your business, not commission rates.",
  },
  {
    icon: Globe,
    title: "US, UK and EU Specialists",
    description: "Deep expertise in US, UK and EU regulatory frameworks, scheme rules, and acquirer relationships across all merchant categories.",
  },
  {
    icon: Zap,
    title: "High-Risk Welcome",
    description: "Gaming, adult, CBD, crypto, travel, subscriptions. High-risk merchants benefit most from proper matching. We cover them all.",
  },
  {
    icon: Target,
    title: "Outcome-Driven",
    description: "Every recommendation ties to measurable impact: revenue captured, costs reduced, account stability improved.",
  },
  {
    icon: Handshake,
    title: "Direct Introduction",
    description: "We do not hand you a list and leave. We introduce you directly to your matched processor and guide the application.",
  },
];

const ValuePropsSection = ({ market = "UK" }: { market?: "UK" | "US" }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  // US (/us) keeps its existing layout untouched.
  if (market === "US") {
    const valueProps = buildValueProps(market);
    return (
      <section id="why-us" className="section-padding bg-secondary" ref={ref}>
        <div className="section-container">
          <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
            <h2 className="heading-lg text-foreground">
              Built by People Who've Seen What the Wrong Provider Does
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
              Frozen accounts. Silent holds on funds. Chargebacks that spiral because the underwriting never fit. We built ChosePayments after watching this happen to businesses of every size, from sole traders to eight-figure operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className={`flex gap-5 p-6 hover-lift rounded-xl reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                  <prop.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{prop.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="why-us" className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why ChosePayments</p>
          <h2 className="heading-lg text-foreground">
            Built by People Who Have Seen What the Wrong Processor Does
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
            Frozen accounts. Silent holds. Chargebacks that spiral because the underwriting never fit. We built ChosePayments after watching this happen to businesses of every size.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ukValueProps.map((prop, index) => (
            <div
              key={prop.title}
              className={`bg-card border border-border rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 reveal stagger-${(index % 3) + 1} ${isInView ? "visible" : ""}`}
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
                <prop.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{prop.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
