import { ClipboardList, Sparkles, Handshake } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell Us About Your Business",
    description: "Answer a few simple questions in our 30-60 second quiz about your business type, volume, and needs.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Get a Personalized Recommendation",
    description: "Our algorithm analyzes your responses and matches you with the best payment providers for your situation.",
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How ChosePayments Helps You Choose Smarter
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center">
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">STEP {step.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
