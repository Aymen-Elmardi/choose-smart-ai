import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SmallBusiness = () => {
  useEffect(() => {
    document.title = "Best Payment Providers for Small Businesses | UK & EU";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Compare payment providers for small businesses across the UK and EU. Find the best fit for online, in-person, or growing businesses."
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
              Payment Providers for Small Businesses (UK & EU)
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              When you're running a small business, choosing a payment provider often happens in a hurry. You go with what a friend uses, or what shows up first in a search, or whatever lets you start accepting payments fastest. That's understandable — but it's also how many businesses end up with a provider that doesn't quite fit. Fees turn out to be higher than expected. Support is hard to reach. And by the time you realise, switching feels like more trouble than it's worth. If you're still choosing, it's worth taking a bit more time to get this right.
            </p>
            
            <p className="text-base text-muted-foreground/80 mb-8">
              Not sure which provider fits? Answer a few quick questions to narrow it down before you commit.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What small businesses actually need
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Most small businesses need simplicity, fair pricing, and reliable support. Features that matter to enterprise companies — like complex reporting or multi-currency treasury — often aren't relevant yet.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Key priorities for small businesses</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Simple setup:</strong> Get started quickly without technical complexity</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Transparent pricing:</strong> Know what you'll pay without surprises</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>No long contracts:</strong> Flexibility to change as your business evolves</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Responsive support:</strong> Help when you need it, not just a help centre</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Matching provider to business stage
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              A provider that works brilliantly for a market stall may not suit a growing e-commerce business. Similarly, a developer-focused API platform might be overkill for a local service business.
            </p>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Just starting out:</strong> Look for low fixed costs and pay-as-you-go pricing</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Growing steadily:</strong> Consider providers with volume discounts and better tools</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Scaling fast:</strong> Prioritise providers that can handle growth without friction</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Common mistakes to avoid
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Many small businesses choose based on a recommendation from another business — without considering whether their needs are actually similar. What works for a café won't necessarily work for an online retailer.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Another common mistake is focusing purely on transaction fees while ignoring other costs like terminal rental, monthly fees, or chargeback charges that can add up quickly.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Finding the right fit
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The best payment provider for your small business depends on how you sell, what you sell, and where you're headed. Taking a few minutes to understand your own needs makes the choice much clearer.
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

export default SmallBusiness;
