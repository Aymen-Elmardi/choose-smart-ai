import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, HeadphonesIcon, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const SupportMatters = () => {
  useCanonical();
  
  useEffect(() => {
    document.title = "Payment Provider Support Issues? Why It Matters More Than Fees";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Low fees mean nothing when your account is frozen and no one responds. Learn why support quality should be a top priority when choosing a payment provider."
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
              Why Support Matters More Than Price in Payments
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              The worst time to discover your provider has poor support is when your account gets frozen, a payout doesn't arrive, or a dispute escalates. Too many businesses learn the hard way that cheap fees aren't worth much when you can't reach anyone to help.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              The hidden cost of poor support
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A frozen account, a disputed transaction, or a technical issue can halt your sales entirely. If your provider takes days to respond — or only offers chatbot support — the cost in lost revenue far exceeds any savings on fees.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Common support-related risks</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Account holds with no clear explanation or timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Automated responses that don't address your actual issue</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>Long wait times during critical business hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground">•</span>
                  <span>No dedicated contact when you need escalation</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What good support looks like
            </h2>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Human contact:</strong> Real people who understand your issue, not just scripts</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Fast response times:</strong> Hours, not days, especially for urgent issues</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Clear escalation paths:</strong> A way to reach decision-makers when needed</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Proactive communication:</strong> You're informed before problems escalate</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Questions to ask before signing up
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Before committing to a provider, it's worth understanding their support model:
            </p>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>What are your support hours and channels?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>What's your average response time for urgent issues?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Will I have a dedicated account manager or relationship contact?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>How do you handle account reviews or holds?</span>
              </li>
            </ul>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <HeadphonesIcon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Finding the right balance</h3>
              </div>
              <p className="text-muted-foreground">
                You don't need enterprise-level support for a small business. But you do need confidence that someone will help when it matters. The right provider matches support quality to your business needs without charging unnecessarily for it.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Long-term reliability
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Choosing a provider with strong support is an investment in operational stability. When payments work smoothly, you can focus on growing your business instead of firefighting issues.
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

export default SupportMatters;
