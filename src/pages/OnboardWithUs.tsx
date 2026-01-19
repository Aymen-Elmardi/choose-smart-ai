import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { useCanonical } from "@/hooks/useCanonical";
import { CheckCircle2 } from "lucide-react";

const OnboardWithUs = () => {
  useSEO({
    title: "Onboard With Us | Managed Payment Provider Selection",
    description: "Let ChosePayments handle the entire payment provider selection and onboarding process on your behalf. One submission, no repetition, clear recommendations."
  });
  useCanonical();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="section-container mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Onboard with us. We'll handle the payment providers for you.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              If you'd rather not deal with multiple providers, forms, or back-and-forth, we can manage the entire process on your behalf.
            </p>
          </div>
        </section>

        {/* What This Option Means */}
        <section className="section-container mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              What this option means
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              This option allows you to submit your details once.
            </p>
            <div className="bg-muted/30 rounded-xl p-8 border border-border">
              <p className="text-foreground font-medium mb-6">We will:</p>
              <ul className="space-y-4">
                {[
                  "Review your business and payment setup in more depth",
                  "Identify which providers are most likely to approve you and perform well",
                  "Submit your details to those providers directly",
                  "Handle questions, follow-ups, and clarification requests",
                  "Come back to you with a clear recommendation"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-muted-foreground mt-8 text-lg">
              You don't need to speak to multiple providers or repeat yourself.
            </p>
          </div>
        </section>

        {/* How This Differs */}
        <section className="section-container mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              How this differs from the assessment
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg">
              <p>
                The assessment stays exactly the same.
              </p>
              <p>
                The difference is what happens next.
              </p>
              <div className="bg-muted/30 rounded-xl p-8 border border-border space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-semibold">→</span>
                  <span>The assessment helps us understand your situation</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-semibold">→</span>
                  <span>Onboarding with us means we take responsibility for the process after that</span>
                </div>
              </div>
              <p>
                We may ask for additional information or documents only if required.
              </p>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="section-container mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Who this is for
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              This is typically useful if:
            </p>
            <ul className="space-y-4">
              {[
                "You've been rejected before",
                "Your business is complex or growing quickly",
                "You want a second pair of experienced eyes",
                "You'd prefer someone to manage the process end-to-end"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-muted/30 rounded-2xl p-10 border border-border">
              <Button variant="hero" size="lg" asChild className="mb-4">
                <Link to="/assessment?start=true">
                  Start with the assessment
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                You can choose to onboard with us after completing the assessment.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OnboardWithUs;
