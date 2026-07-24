import { ClipboardList, Sparkles, FileText, PhoneCall, ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from "@/lib/booking";

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
    description: "Complete a short assessment covering your business model, transaction volume, countries served, average order value, and industry — including whether you're considered a high-risk merchant.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "We Analyse Your Risk Profile",
    description: "Our matching engine compares your business against the underwriting requirements of 50+ payment processors and payment providers across the UK, US and Europe.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Receive Your Best Payment Processor Matches",
    description: "We recommend the payment processors most likely to approve your business, explain why each one fits, and highlight any risks or potential savings on your payment processing costs.",
  },
  {
    icon: PhoneCall,
    step: "04",
    title: "Book a Free Strategy Call",
    description: "Meet with one of our payment specialists to review your matches, ask questions, and get introduced to the payment gateway or merchant account provider that best fits your business.",
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
            We compare payment processors and merchant account providers across the UK, US and EU, matching ecommerce, SaaS, marketplaces and other online businesses with the right payment gateway. Free from start to finish, no commitment required.
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

        <div className="mt-16 text-center">
          <Button variant="hero" size="xl" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a Free 15-Minute Call
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            A payment setup review never hurts — your current processor certainly isn't offering one.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
