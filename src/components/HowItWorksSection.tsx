import { ClipboardList, Sparkles, Handshake } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell Us About Your Business",
    description: "Answer a few quick questions (under 60 seconds) about your business type, volume, and needs.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "See Your Top 3 Matches",
    description: "Our engine analyzes 25+ providers and ranks your best matches based on your specific needs.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Connect With Your Provider",
    description: "Connect directly with the provider that fits your needs — no middlemen, no pushy sales calls.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="heading-lg text-foreground">
            How ChosePayments Helps You Choose Smarter
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="w-14 h-14 mx-auto flex items-center justify-center mb-6">
                <step.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-sm font-bold text-primary mb-3 tracking-wide">STEP {step.step}</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
