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

// Homepage (/) copy per the content guide.
const ukSteps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell Us About Your Business",
    description: "Answer a short assessment covering your business model, monthly volume, industry, and transaction type. No account needed.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "We Calculate Your Risk Profile",
    description: "Our engine maps your profile against the underwriting criteria of 50+ processors across the US, UK and EU to find the right fit.",
  },
  {
    icon: FileText,
    step: "03",
    title: "See Your Processor Match",
    description: "We show you which processors fit, which are acceptable, and which to avoid, with a clear reason for every recommendation.",
  },
  {
    icon: PhoneCall,
    step: "04",
    title: "Get on a Call With Us",
    description: "I get on a call with you to understand more deeply the type of payment processor you need, and introduce you to your right payment processor.",
  },
];

const HowItWorksSection = ({ market = "UK" }: { market?: "UK" | "US" }) => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  // US (/us) keeps its existing layout untouched.
  if (market === "US") {
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
  }

  return (
    <section id="how-it-works" className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-16 reveal ${isInView ? "visible" : ""}`}>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">The Process</p>
          <h2 className="heading-lg text-foreground">
            How Payment Processor Matching Works
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Four steps. Sixty seconds for the first one. No account needed, no commitment, and free from start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ukSteps.map((step, index) => (
            <div
              key={step.title}
              className={`text-left bg-card border border-border rounded-xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mb-5">
                <step.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div className="text-xs font-bold text-primary mb-2 tracking-widest uppercase">Step {step.step}</div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
