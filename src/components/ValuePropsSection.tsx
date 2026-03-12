import { TrendingUp, Receipt, Target, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const valueProps = [
  {
    icon: TrendingUp,
    title: "Born from Real Failures",
    description: "We've seen businesses lose revenue, get frozen, or churn providers repeatedly. All because nobody checked the fit before they signed up.",
  },
  {
    icon: Receipt,
    title: "Fixed-Scope, Clear Pricing",
    description: "One flat fee, clearly defined scope. No retainers, no ongoing commitments.",
  },
  {
    icon: Target,
    title: "Outcome-Driven Methodology",
    description: "Every recommendation is tied to measurable impact: revenue captured, costs reduced, risk mitigated.",
  },
  {
    icon: MapPin,
    title: "UK and EU Specialists",
    description: "Deep expertise in UK and EU regulatory frameworks, scheme rules, and acquirer relationships.",
  },
];

const ValuePropsSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section id="why-us" className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            Built by People Who've Seen What the Wrong Provider Does
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
            Frozen accounts. Silent holds on funds. Chargebacks that spiral because the underwriting never fit. We built this tool after watching it happen to businesses of every size, from sole traders to eight-figure operations.
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
};

export default ValuePropsSection;
