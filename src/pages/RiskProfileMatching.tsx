import { Link } from "react-router-dom";
import { ArrowRight, Shield, CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { useInView } from "@/hooks/useInView";

const RiskProfileMatching = () => {
  const { ref: diagramRef, isInView: diagramVisible } = useInView<HTMLElement>({ threshold: 0.15 });
  const { ref: exampleRef, isInView: exampleVisible } = useInView<HTMLElement>({ threshold: 0.15 });
  const { ref: factorsRef, isInView: factorsVisible } = useInView<HTMLElement>({ threshold: 0.15 });

  useSEO({
    title: "Risk-Profile Matching: Never Choose the Wrong Payment Processor | ChosePayments",
    description:
      "Our engine matches payment providers to your business risk profile. Stop choosing processors based on marketing. Find the one that actually fits your industry, volume, and model.",
    keywords: [
      "payment processor matching",
      "risk profile payment provider",
      "best payment processor for my business",
      "payment provider risk fit",
      "merchant risk profile",
    ],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-background pt-28 pb-12 md:pt-40 md:pb-20">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-medium text-muted-foreground mb-6 tracking-wide">
                The Risk-Profile Matching System
              </p>
              <h1 className="heading-xl text-foreground text-balance">
                Choose a Payment Provider Based on Risk — Not Marketing
              </h1>
              <div className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                <p>
                  Most merchant account problems happen because the provider was never built for the business model.
                </p>
                <p className="mt-3">
                  Our engine analyzes your business risk profile and matches you with payment providers that actually fit.
                </p>
              </div>
              <div className="mt-12 flex flex-col items-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/assessment">
                    Run My Risk Profile
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Link
                  to="/insights"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Already having payment issues? Learn why →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Diagram */}
        <section ref={diagramRef} className="section-padding bg-secondary/30">
          <div className="section-container max-w-3xl mx-auto">
            <div className={`text-center mb-12 reveal ${diagramVisible ? "visible" : ""}`}>
              <h2 className="heading-lg text-foreground">How the Matching Engine Works</h2>
            </div>

            <div className={`reveal stagger-1 ${diagramVisible ? "visible" : ""}`}>
              <div className="space-y-0">
                {[
                  {
                    label: "Business Inputs",
                    desc: "Industry, volume, model, geography",
                    color: "bg-primary/10 border-primary/20 text-primary",
                  },
                  {
                    label: "Risk Profile Calculation",
                    desc: "Chargeback exposure, fraud signals, growth pattern",
                    color: "bg-primary/10 border-primary/20 text-primary",
                  },
                  {
                    label: "Provider Risk Appetite Matching",
                    desc: "Each provider's tolerance mapped to your profile",
                    color: "bg-primary/10 border-primary/20 text-primary",
                  },
                  {
                    label: "Compatibility Score",
                    desc: "Best Fit, Acceptable, or Not Suited",
                    color: "bg-primary/15 border-primary/30 text-primary",
                  },
                ].map((step, i) => (
                  <div key={step.label} className="flex flex-col items-center">
                    {i > 0 && (
                      <ChevronDown className="w-5 h-5 text-muted-foreground my-2" />
                    )}
                    <div
                      className={`w-full rounded-xl border p-5 text-center ${step.color}`}
                    >
                      <div className="font-semibold text-foreground">{step.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What the Engine Evaluates */}
        <section ref={factorsRef} className="section-padding bg-background">
          <div className="section-container max-w-4xl mx-auto">
            <div className={`text-center mb-12 reveal ${factorsVisible ? "visible" : ""}`}>
              <h2 className="heading-lg text-foreground">What the Engine Evaluates</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We score providers against six dimensions of your business risk profile.
              </p>
            </div>

            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal stagger-1 ${factorsVisible ? "visible" : ""}`}>
              {[
                { title: "Industry Risk", desc: "How providers classify your sector and whether it triggers enhanced scrutiny." },
                { title: "Monthly Volume", desc: "Processing volume determines which providers will underwrite you and at what tier." },
                { title: "Chargeback Exposure", desc: "Your expected dispute rate determines which providers can tolerate your model." },
                { title: "Fraud Exposure", desc: "Card-not-present, international, and high-ticket transactions all affect risk scoring." },
                { title: "Geographic Reach", desc: "Where your customers are changes which acquirers and payment methods are available." },
                { title: "Business Model", desc: "SaaS, marketplace, ecommerce, and subscription models each carry different risk profiles." },
              ].map((factor) => (
                <div
                  key={factor.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-semibold text-foreground mb-2">{factor.title}</h3>
                  <p className="text-sm text-muted-foreground">{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Output */}
        <section ref={exampleRef} className="section-padding bg-secondary/30">
          <div className="section-container max-w-3xl mx-auto">
            <div className={`text-center mb-12 reveal ${exampleVisible ? "visible" : ""}`}>
              <h2 className="heading-lg text-foreground">Example Output</h2>
              <p className="mt-4 text-muted-foreground">
                Here is what a real result looks like for a moderate-risk ecommerce business.
              </p>
            </div>

            <div className={`reveal stagger-1 ${exampleVisible ? "visible" : ""}`}>
              {/* Profile */}
              <div className="rounded-xl border border-border bg-card p-5 mb-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Risk Profile</div>
                <div className="text-lg font-semibold text-foreground">Moderate Growth / Medium Chargeback</div>
              </div>

              {/* Results */}
              <div className="rounded-xl border-2 border-primary/20 bg-card overflow-hidden">
                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs uppercase tracking-wider font-bold text-primary">Best Fit</span>
                  </div>
                  <div className="font-semibold text-foreground text-lg">Adyen</div>
                </div>

                <div className="p-5 border-b border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Acceptable</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-foreground">Checkout.com</div>
                    <div className="text-sm font-medium text-foreground">Stripe</div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground">Not Suited for This Profile</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Square</div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 text-center">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/assessment">
                    Run My Risk Profile
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">Takes less than 2 minutes</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RiskProfileMatching;
