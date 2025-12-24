import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SwitchProvider = () => {
  useEffect(() => {
    document.title = "Stuck With Your Payment Provider? How to Switch Without Penalties";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Worried about exit fees or contract lock-ins? Learn how UK & EU businesses switch payment providers safely — without disruption or hidden cancellation charges."
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
              How to Switch Payment Providers Safely (UK & EU)
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Many businesses feel trapped by their current provider — locked into long contracts, facing steep exit fees, or worried about funds being held during a transition. These are real concerns, and they stop a lot of merchants from making a change even when they know they should.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why businesses switch providers
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Common reasons include rising fees, poor customer support, outdated technology, or simply outgrowing the provider you started with. As your business evolves, your payment needs often change too.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Before you switch: what to check
            </h2>
            
            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Key things to review first</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Contract terms:</strong> Check your notice period and any early termination fees</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Equipment ownership:</strong> Do you own your terminals or are they leased?</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Settlement timing:</strong> Ensure no funds are held during the transition</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Integration dependencies:</strong> Check what systems connect to your current provider</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Avoiding cancellation fees
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Many providers include early exit fees in their contracts. Before switching, calculate whether the savings from a new provider outweigh the cost of leaving early — or whether it makes sense to wait until your contract ends.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Some newer providers offer no-contract terms, making future switches easier. This is worth considering when choosing your next provider.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Making the switch smoothly
            </h2>
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Set up your new provider before cancelling the old one</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Run both in parallel for a short period if possible</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Update any recurring billing or subscription integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Notify your team and train them on the new system</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Keep records of your final statements from the old provider</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Choosing the right new provider
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Take the opportunity to find a provider that truly fits your business now — not just one that's cheaper. Consider contract flexibility, support quality, and whether they can grow with you.
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

export default SwitchProvider;
