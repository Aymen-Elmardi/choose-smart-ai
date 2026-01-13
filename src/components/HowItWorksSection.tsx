const steps = [
  {
    step: "01",
    title: "Describe your business",
    description: "Answer a few questions about your model, volume, and where you operate.",
  },
  {
    step: "02",
    title: "See which providers to avoid",
    description: "We identify providers likely to cause friction based on your profile.",
  },
  {
    step: "03",
    title: "Get matched",
    description: "Connect with a provider suited to your business — no middlemen.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[hsl(220,15%,6%)] border-t border-[hsl(220,10%,12%)]">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(220,10%,75%)] leading-snug">
            How it works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.title} className="relative">
              <div className="text-xs font-medium text-[hsl(220,10%,30%)] mb-3 uppercase tracking-wider">
                Step {step.step}
              </div>
              <h3 className="text-base font-medium text-[hsl(220,10%,60%)] mb-3">{step.title}</h3>
              <p className="text-sm text-[hsl(220,10%,40%)] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
