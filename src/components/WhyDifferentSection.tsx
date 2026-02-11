import { Shield, TrendingUp, MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const differentiators = [
  {
    icon: Shield,
    title: "No Provider Influence",
    description: "Recommendations based on operational fit and risk profile, not commission.",
  },
  {
    icon: TrendingUp,
    title: "Built for Scale",
    description: "Designed for businesses where even a 0.1% improvement in acceptance rates has six-figure impact.",
  },
  {
    icon: MessageCircle,
    title: "Insider Expertise",
    description: "Built by professionals who have worked inside payment operations and underwriting teams.",
  },
];

const WhyDifferentSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Why ChosePayments
          </p>
          <h2 className="heading-lg text-foreground">Not a Comparison Site. Not a Lead Marketplace.</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            We partner with established merchants to turn payment infrastructure from a cost centre into a competitive advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className={`bg-background rounded-xl p-8 border border-border reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
