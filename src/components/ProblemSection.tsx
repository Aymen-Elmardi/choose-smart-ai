const problems = [
  {
    title: "Too Many Options",
    description: "Stripe, PayPal, Square, acquirers, banks... the choices are overwhelming and the differences unclear.",
  },
  {
    title: "Hidden Risk",
    description: "The provider that approves you fastest isn't always the one that supports you when volume grows.",
  },
  {
    title: "Wrong Fit",
    description: "Each business model triggers different compliance requirements. A mismatch causes problems later.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[hsl(220,15%,8%)]">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(220,10%,75%)] leading-snug">
            Choosing a payment provider shouldn't feel like guessing.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="p-6 border-l border-[hsl(220,10%,18%)]"
            >
              <h3 className="text-base font-medium text-[hsl(220,10%,60%)] mb-3">{problem.title}</h3>
              <p className="text-sm text-[hsl(220,10%,40%)] leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
