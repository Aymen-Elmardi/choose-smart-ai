import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useCanonical } from "@/hooks/useCanonical";
import { Check } from "lucide-react";

const managedItems = [
  { title: "Approval Probability Analysis", description: "Assessing which providers are most likely to approve your business based on risk profile and sector." },
  { title: "Pricing Structure Review", description: "Benchmarking fee models against industry data to identify the most cost-effective arrangement." },
  { title: "Reserve and Risk Assessment", description: "Evaluating rolling reserve requirements and risk exposure across candidate providers." },
  { title: "Underwriting Oversight", description: "Managing the underwriting process directly, handling requests and clarifications on your behalf." },
  { title: "Application Sequencing", description: "Determining the optimal order and timing of provider applications to maximise approval outcomes." },
  { title: "Written Recommendation", description: "Delivering a clear, documented recommendation with reasoning and next steps." },
];

const forItems = [
  "Businesses processing £1M+ annually",
  "Complex or high-risk merchant categories",
  "Companies that have been declined before",
  "Organisations needing multi-provider setups",
];

const notForItems = [
  "Early-stage startups under £100K volume",
  "Businesses seeking the cheapest option only",
  "Those wanting a self-service comparison tool",
  "Single-product, low-complexity merchants",
];

const steps = [
  { number: "01", title: "Review", description: "We assess your business model, transaction profile, and current payment infrastructure." },
  { number: "02", title: "Strategic Evaluation", description: "We identify the providers best suited to your risk profile, sector, and growth trajectory." },
  { number: "03", title: "Managed Introductions", description: "We submit applications on your behalf, positioning your business for approval." },
  { number: "04", title: "Underwriting Oversight", description: "We manage all provider communication, documentation requests, and follow-ups." },
  { number: "05", title: "Final Recommendation", description: "You receive a clear recommendation with a documented rationale and integration guidance." },
];

const OnboardWithUs = () => {
  useSEO({
    title: "Partner With Us — ChosePayments",
    description: "Independent oversight for high-stakes payment decisions. We manage the entire provider selection and onboarding process on your behalf."
  });
  useCanonical();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero – Minimal & Authoritative */}
        <section className="pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">
              Independent Advisory
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.35] tracking-tight max-w-2xl md:whitespace-nowrap">
              Managed Payment Provider Selection
            </h1>
            <p className="mt-4 text-lg text-muted-foreground font-medium max-w-xl">
              Independent oversight for high-stakes payment decisions.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-xl">
              We manage the entire provider selection and onboarding process on your behalf. One submission, no repetition, no provider influence. You receive a clear recommendation backed by operational analysis.
            </p>
            <div className="mt-10">
              <Button variant="hero" size="lg" asChild>
                <Link to="/assessment?start=true">Apply for Advisory</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Problem Framing – Split Layout */}
        <section className="border-t border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-16">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                  Why This Exists
                </h2>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  The hidden cost of payment provider selection isn't in the rate sheet. It's in what breaks six months later.
                </p>
                <p>
                  Poor provider fit manifests as failed transactions during peak periods, reconciliation gaps that drain finance team bandwidth, and compliance gaps that surface during audits. These aren't theoretical risks. They're patterns I've observed across hundreds of implementations.
                </p>
                <p>
                  Most selection processes rely on surface-level inputs: polished sales presentations, feature matrices that obscure operational realities, and anecdotal recommendations from businesses operating under completely different transaction profiles and risk appetites.
                </p>
                <p>
                  What's actually needed is forensic evaluation. Examining how a provider's infrastructure, underwriting approach, and operational capabilities map to your specific payment flows, dispute patterns, and growth trajectory.
                </p>
                <p>
                  That's the work I do. Not brokering introductions or recycling vendor marketing. Conducting independent technical and commercial assessment so you select based on operational fit, not sales cycles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Manage – Structured Grid */}
        <section className="border-t border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20 md:py-28">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-12">
              What We Manage
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {managedItems.map((item) => (
                <div
                  key={item.title}
                  className="border border-border rounded-lg bg-secondary/30 p-6"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who This Is For – Premium Filter */}
        <section className="border-t border-border bg-secondary/40">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20 md:py-28">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-12">
              Who This Is For
            </h2>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-6">This Is For</p>
                <ul className="space-y-4">
                  {forItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6">This Is Not For</p>
                <ul className="space-y-4">
                  {notForItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Flow – Timeline */}
        <section className="border-t border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-20 md:py-28">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-14">
              How the Engagement Works
            </h2>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={`grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-8 ${i < steps.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-2xl font-bold text-primary/30 tracking-tight">{step.number}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing – Quiet Authority */}
        <section className="border-t border-border">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-24 md:py-32 text-center">
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-10">
              If your payment decision carries operational weight, apply for advisory.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/assessment?start=true">Apply for Advisory</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardWithUs;
