import { Scale, Clock, PiggyBank, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const valueProps = [
  {
    icon: Scale,
    title: "Unbiased Recommendations",
    description: "We're not tied to any single provider. Our only goal is helping you find the best fit.",
  },
  {
    icon: Clock,
    title: "Save 3+ Hours",
    description: "Skip the research. Get matched to your ideal provider in 60 seconds.",
  },
  {
    icon: PiggyBank,
    title: "Save Money",
    description: "Avoid overpaying for the wrong plan. We help you find transparent pricing that fits your volume.",
  },
  {
    icon: MapPin,
    title: "Made for UK and EU",
    description: "Tailored recommendations for UK and EU businesses. Global support coming soon.",
  },
];

const ValuePropsSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section id="why-us" className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            Why Businesses Use ChosePayments
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
