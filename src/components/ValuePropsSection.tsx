import { TrendingUp, Receipt, Target, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const valueProps = [
  {
    icon: TrendingUp,
    title: "Processing £1M+ Annually",
    description: "Our methodology is designed for merchants where transaction volume justifies a strategic review.",
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
            Built for Businesses Where Payments Are Mission-Critical
          </h2>
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
