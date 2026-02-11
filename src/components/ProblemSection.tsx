import { TrendingDown, EyeOff, ShieldAlert } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const problems = [
  {
    icon: TrendingDown,
    title: "Revenue Leaking Through Declines",
    description: "Poor authorisation rates and checkout friction quietly erode margins, undoing marketing and sales effort.",
  },
  {
    icon: EyeOff,
    title: "Hidden Fees Compounding at Scale",
    description: "At high volumes, opaque pricing structures cost six or seven figures annually.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance Exposure Growing Silently",
    description: "PCI, SCA, and scheme rule changes create risk that surfaces without warning.",
  },
];

const ProblemSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            The Hidden Costs of an Unaudited Payment Stack
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
          At scale, your payment gateway is not a backend detail. It is the engine of your revenue.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
