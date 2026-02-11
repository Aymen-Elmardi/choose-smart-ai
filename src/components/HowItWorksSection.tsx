import { ClipboardList, Sparkles, FileText } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Submit Your Business Profile",
    description: "Provide details about your transaction volumes, business model, and current payment stack.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "We Conduct the Review",
    description: "Our team analyses your infrastructure, fees, risk exposure, and acceptance performance.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Receive Your Strategy Report",
    description: "A detailed report with actionable recommendations, benchmarking data, and a clear roadmap.",
  },
];

const HowItWorksSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section id="how-it-works" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-20 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            How the Payment Strategy Review Works
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
