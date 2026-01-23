import { HelpCircle, EyeOff, Target } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const problems = [
  {
    icon: HelpCircle,
    title: "Paralyzed by 50+ Options",
    description: "Stripe, PayPal, Square, acquirers, banks... you're expected to become a payments expert overnight.",
  },
  {
    icon: EyeOff,
    title: "Surprise Charges Eating Margins",
    description: "The advertised rate is never what you actually pay. Hidden fees add up fast.",
  },
  {
    icon: Target,
    title: "Generic Advice That Doesn't Fit",
    description: "Every 'best provider' list ignores that your business is unique.",
  },
];

const ProblemSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            The Fastest Way to Find Your Perfect Payment Provider
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`text-center p-8 reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center mb-6">
                <problem.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>

        <p className={`text-center mt-16 text-lg text-muted-foreground max-w-2xl mx-auto reveal stagger-4 ${isInView ? "visible" : ""}`}>
          Most businesses pick too fast and regret it within 6 months. You don't have to.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
