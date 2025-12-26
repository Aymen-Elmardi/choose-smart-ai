import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Scale, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const ChooseProvider = () => {
  useCanonical();
  
  useEffect(() => {
    document.title = "How to Choose the Right Payment Provider | UK & EU Guide";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Confused by Stripe, Worldpay, Square or others? Learn how to choose the right payment provider based on your business model, not just price."
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
              How to Choose a Payment Provider (Without Regret)
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              It's easy to pick the first provider that looks reasonable. A friend's recommendation, the one with the lowest rate, or just the name you've heard of. But that's how businesses end up locked into something that doesn't fit. Hidden costs appear. Support is slow or absent. Switching feels like too much hassle. If you're still deciding, this is the right time to slow down and think it through.
            </p>
            
            <p className="text-base text-muted-foreground/80 mb-8">
              Not sure which provider fits? Answer a few quick questions to narrow it down before you commit.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why "cheapest" often costs more
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A provider with low headline fees might have hidden costs, poor support, or features that don't match how your business actually operates. The true cost of a payment provider includes:
            </p>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Transaction fees, monthly fees, and any hidden charges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Time spent dealing with poor support or technical issues</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Lost sales from checkout friction or payment failures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Cost and disruption of switching if it doesn't work out</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              A framework for choosing well
            </h2>
            
            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <Target className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Step 1: Understand your business model</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Different businesses have different needs. Before comparing providers, be clear on:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>How you sell (online, in-person, both)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Your average transaction size and monthly volume</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Whether you need recurring billing, split payments, or multi-currency</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span>Your industry and any specific compliance requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <Scale className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Step 2: Compare on what matters</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Once you know your needs, evaluate providers on:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Fit:</strong> Do they serve businesses like yours?</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Features:</strong> Do they have what you need now and for growth?</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Support:</strong> What happens when something goes wrong?</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Flexibility:</strong> Contract terms, exit clauses, scalability</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Total cost:</strong> All fees considered, not just the headline rate</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Common mistakes to avoid
            </h2>
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Choosing based on a friend's recommendation without checking fit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Focusing only on transaction fees while ignoring other costs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Signing long contracts without understanding exit terms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground">•</span>
                <span>Not considering your future needs and growth plans</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Get matched to the right provider
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Rather than spending hours researching, you can answer a few questions about your business and get matched to providers that actually fit. It takes under two minutes and gives you a clear starting point.
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

export default ChooseProvider;
