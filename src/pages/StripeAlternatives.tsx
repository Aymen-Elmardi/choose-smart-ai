import { Link } from "react-router-dom";
import { ArrowRight, Check, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";

const StripeAlternatives = () => {
  useCanonical();
  
  useSEO({
    title: "Stripe Alternatives for Marketplaces: Risk Assessment & Provider Fit",
    description: "Stripe Connect isn't always the right fit. Understand which marketplace payment providers match your risk profile, onboarding needs, and operational reality.",
    keywords: ["Stripe alternatives", "marketplace payment risk", "Stripe Connect assessment", "platform payment fit"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="section-padding pt-24">
        <div className="section-container max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Stripe Alternatives for Marketplaces & Platforms
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Many platforms start with Stripe, but hit problems as they scale. Seller onboarding becomes friction-heavy, fees eat into margins, and support can feel distant when things go wrong. If you're wondering whether there's a better fit, you're not alone.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              When Stripe stops being the best fit
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Stripe Connect is powerful, but it's not always the right choice. Common pain points include:
            </p>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Complex onboarding for sellers that creates friction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Pricing that doesn't scale well at higher volumes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Limited support for specific regional payment methods</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Developer-heavy setup that requires ongoing maintenance</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What to consider when evaluating alternatives
            </h2>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <Layers className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Key platform requirements</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Split payments:</strong> How easily can you split funds between parties?</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Seller onboarding:</strong> How frictionless is the KYC process?</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Payout flexibility:</strong> Can you pay out in multiple currencies and schedules?</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Compliance support:</strong> Does the provider help with regulatory requirements?</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Types of alternatives to consider
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Different platforms have different needs. Some alternatives focus on faster seller onboarding, others on lower fees at scale, and some specialise in specific verticals like travel or services marketplaces.
            </p>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Payment facilitators:</strong> Handle compliance on your behalf with simpler onboarding</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Banking-as-a-Service providers:</strong> Offer deeper financial infrastructure</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Vertical specialists:</strong> Built specifically for certain marketplace types</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Making the right choice
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The right alternative depends on your platform model, your growth stage, and what matters most to your sellers and buyers. A quick assessment of your specific needs can help narrow down the options significantly.
            </p>
          </article>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Find the right payment provider for your business
              </h2>
              <p className="text-muted-foreground mb-6">
                Answer a few questions and we'll guide you to the right provider for your business.
              </p>
              <Button size="lg" asChild>
                <Link to="/assessment?start=true" replace>
                  Take the quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground/70 mt-3">
                Takes under 2 minutes • No cost • No obligation
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StripeAlternatives;
