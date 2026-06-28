import { ClipboardList, Sparkles, FileText, PhoneCall } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const buildSteps = (country: string) => [
  {
    icon: ClipboardList,
    step: "01",
    title: "Enter Your Business Details",
    description: "Answer a short assessment about your business model, monthly volume, and industry. No account needed.",
    dark: false,
  },
  {
    icon: Sparkles,
    step: "02",
    title: "We Calculate Your Risk Profile",
    description: `Our engine maps your profile against the underwriting criteria of 50+ ${country} processors to find the right fit.`,
    dark: false,
  },
  {
    icon: FileText,
    step: "03",
    title: "See Your Provider Match",
    description: "View which providers fit, which are acceptable, and which to avoid. Every recommendation includes a clear reason why.",
    dark: false,
  },
  {
    icon: PhoneCall,
    step: "04",
    title: "Get on a Call. Get Introduced.",
    description: "Book a 15-minute call with us. We introduce you directly to your matched processor and guide you through the application.",
    dark: true,
  },
];

const HowItWorksSection = ({ market = "UK" }: { market?: "UK" | "US" }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const steps = buildSteps(market);

  return (
    <section id="how-it-works" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-20 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            How {market} Payment Processor Matching Works
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`text-center reveal stagger-${index + 1} ${isInView ? "visible" : ""} ${step.dark ? "bg-foreground rounded-xl p-6" : ""}`}
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center mb-6">
                <step.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-sm font-bold text-primary mb-3 tracking-wide">STEP {step.step}</div>
              <h3 className={`text-lg font-semibold mb-3 ${step.dark ? "text-background" : "text-foreground"}`}>{step.title}</h3>
              <p className={step.dark ? "text-background/60" : "text-muted-foreground"}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
