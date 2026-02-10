import { Scale, Clock, PiggyBank, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const valueProps = [
  {
    icon: Scale,
    title: "100% Unbiased",
    description: "We're not tied to any provider. No kickbacks, no hidden agendas.",
    value: "Independent advice",
  },
  {
    icon: Clock,
    title: "3+ Hours Saved",
    description: "Skip weeks of research. Get clarity in minutes.",
    value: "Time back",
  },
  {
    icon: PiggyBank,
    title: "Avg 0.3% Saved Per Transaction",
    description: "Avoid hidden fees and overpaying for features you don't need.",
    value: "Real money saved",
  },
  {
    icon: MapPin,
    title: "UK & EU Specialists",
    description: "Tailored for UK and EU regulations, compliance, and pricing.",
    value: "Local expertise",
  },
];

const ValuePropsSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section id="why-us" className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            Everything You Need, Nothing You Don't
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
