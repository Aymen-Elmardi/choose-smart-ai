import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const HiddenFees = () => {
  useCanonical();
  
  useEffect(() => {
    document.title = "Hidden Fees in Payment Processing: What's Not Disclosed";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "The rate you're quoted often isn't the rate you pay. Learn which fees get buried — and how to spot them before you sign up."
    );

    return () => {
      document.title = "Payment Provider Quiz";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="section-padding pt-24">
        <div className="section-container max-w-3xl">
          <article className="prose prose-lg max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hidden Fees in Payment Processing: What You're Not Being Told
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              You compared the rates, picked a provider, and signed up. Then you noticed charges you weren't expecting. A monthly minimum. A PCI fee. A penalty for leaving early. This happens constantly, and it's not always because providers are being dishonest. Payment pricing is genuinely confusing. But the result is the same: you end up paying more than you planned, and switching feels like a headache. If you're still choosing, it's worth understanding what's often left out of the pitch.
            </p>
            
            <p className="text-base text-muted-foreground/80 mb-8">
              Not sure which provider fits? Answer a few quick questions to narrow it down before you commit.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why pricing confusion happens
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Payment providers use different pricing models. Some charge a flat percentage, others use interchange-plus, and many add monthly fees, PCI compliance charges, or terminal rental costs that aren't obvious at first glance.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              This isn't always intentional — payment processing is genuinely complex. But the result is the same: businesses often pay more than expected.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Common hidden fees to watch for</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Monthly minimum fees if you don't hit a transaction threshold</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>PCI non-compliance charges (even if you didn't know you needed to comply)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Early termination fees buried in contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Chargeback fees that vary significantly between providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Terminal rental or software fees not included in the headline rate</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              How to avoid unexpected costs
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The best approach is to understand your business model first, then match it to a provider whose pricing structure works for you. Not just the one with the lowest advertised rate.
            </p>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Ask for a full fee schedule before signing anything</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Check contract length and exit terms</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Compare effective rates, not just headline percentages</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Consider your average transaction size, as it affects which pricing model suits you</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Finding the right fit
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The cheapest provider isn't always the best value. A provider that's transparent, fits your transaction patterns, and doesn't lock you into long contracts is often worth more than saving a fraction of a percent on fees.
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
                <Link to="/quiz?start=true">
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

export default HiddenFees;
