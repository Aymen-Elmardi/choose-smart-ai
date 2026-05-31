import { TrendingDown, EyeOff, ShieldAlert } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const problems = [
  {
    icon: TrendingDown,
    title: "Your Account Gets Frozen Without Warning",
    description: "One Friday afternoon, payments stop. No explanation, no timeline. You chose a provider that was never built for your business model.",
  },
  {
    icon: EyeOff,
    title: "You're Paying More Than You Should",
    description: "Fees buried in blended rates, charges that appear months in. Most businesses overpay by thousands a year and never know it.",
  },
  {
    icon: ShieldAlert,
    title: "Your Provider Doesn't Understand Your Business",
    description: "Generic processors treat every business the same. If yours is in a complex category — subscriptions, marketplaces, high-volume — you're one review away from a hold.",
  },
];

const ProblemSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            Most Businesses Are on the Wrong Processor
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
          None of this happens because you did something wrong. It happens because you picked a processor that wasn't built for a business like yours.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
