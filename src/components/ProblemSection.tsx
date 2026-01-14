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
    <section className="section-padding bg-card">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Payment Processing Doesn't Have to Be Complicated
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`text-center p-8 rounded-2xl bg-background border border-border/50 shadow-card hover:shadow-lg transition-shadow animate-fade-up-delay-${index + 1}`}
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <problem.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-12 text-lg text-muted-foreground max-w-2xl mx-auto">
          We simplify the entire decision so you don't pay more than you need to or choose the wrong provider.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
