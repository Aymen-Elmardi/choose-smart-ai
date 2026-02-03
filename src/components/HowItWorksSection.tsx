import { ClipboardList, Sparkles, Handshake } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell Us About Your Business",
    description: "Answer a few quick questions about your business type, volume, and operational reality — we need the full picture.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "See Your Risk Assessment",
    description: "We analyze your profile against provider underwriting criteria and risk appetites — not just features and fees.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Get Strategic Guidance",
    description: "Connect with providers that actually fit your business — or understand why now isn't the right time.",
  },
];

const HowItWorksSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section id="how-it-works" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-20 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            How ChosePayments Assesses Your Provider Fit
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`text-center reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
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
