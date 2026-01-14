import { HelpCircle, EyeOff, Target } from "lucide-react";

const problems = [
  {
    icon: HelpCircle,
    title: "Too Many Options",
    description: "Stripe, PayPal, Square, acquirers, banks... the choices are overwhelming.",
  },
  {
    icon: EyeOff,
    title: "Hidden Fees",
    description: "The effective rate you pay often differs from the advertised rate.",
  },
  {
    icon: Target,
    title: "Different Needs",
    description: "Each business type requires something different from their payment provider.",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <h2 className="heading-lg text-foreground">
            The Fastest Way to Find Your Perfect Payment Provider
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`text-center p-8 animate-fade-up-delay-${index + 1}`}
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center mb-6">
                <problem.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-16 text-lg text-muted-foreground max-w-2xl mx-auto">
          We simplify the entire decision so you don't pay more than you need to or choose the wrong provider.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
