import { Shield, Ban, MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const differentiators = [
  {
    icon: Shield,
    title: "Independent Advisory",
    description: "No provider can pay to influence our assessments. We recommend based on fit, not commission.",
  },
  {
    icon: Ban,
    title: "We Say 'Not Yet' When Appropriate",
    description: "Sometimes the right answer is to wait, restructure, or address risk factors first. We'll tell you.",
  },
  {
    icon: MessageCircle,
    title: "Insider Knowledge",
    description: "Built by people who've worked inside payment operations — we know what providers actually look for.",
  },
];

const WhyDifferentSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-muted/30" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Why ChosePayments is Different
          </p>
          <h2 className="heading-lg text-foreground">
            Not a Comparison Site. Not a Lead Marketplace.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            We're the strategic layer between your business and payment providers — helping you understand fit before you commit.
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
