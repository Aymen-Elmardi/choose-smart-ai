import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Network, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MarketplacePlatforms = () => {
  useEffect(() => {
    document.title = "Best Payment Providers for Marketplaces & Platforms | UK & EU";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute(
      "content",
      "Running a marketplace or platform? Discover payment providers that support split payments, payouts, and scale across the UK and EU."
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
              Payment Providers for Marketplaces and Platforms
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              If you're building a marketplace, franchise, or multi-vendor platform, you've probably already discovered that most payment providers aren't built for what you're doing. You need to split funds between parties, manage payouts on different schedules, and handle compliance for sellers you don't fully control. Standard tools make this harder than it should be. That friction isn't your fault. It's a mismatch. Choosing the wrong provider here creates real problems later: blocked funds, compliance issues, or having to rebuild your payments layer from scratch. This page is here to help you understand what actually matters for platform payments before you commit.
            </p>
            
            <p className="text-base text-muted-foreground/80 mb-8">
              Not sure which provider fits? Answer a few quick questions to narrow it down before you commit.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What makes platform payments different
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Unlike simple e-commerce, platforms need to collect money from buyers, take a cut, and distribute funds to multiple recipients. This often involves different timing, currencies, and compliance requirements.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <Network className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Core platform requirements</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Split payments:</strong> Divide transactions between platform and sellers automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Multi-party payouts:</strong> Pay different parties on different schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Seller onboarding:</strong> KYC and verification for each connected account</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Compliance handling:</strong> Managing regulatory requirements across jurisdictions</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Compliance and regulatory considerations
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Platforms that handle money on behalf of others may need to consider payment services regulations. The right provider can either handle this complexity for you (as a payment facilitator) or provide the infrastructure for you to become regulated yourself.
            </p>

            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <h3 className="text-lg font-semibold text-foreground">Compliance options</h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Payment facilitator model:</strong> Provider handles compliance; faster to market</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Own licensing:</strong> More control but significant regulatory burden</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <span><strong>Hybrid approaches:</strong> Start facilitated, move to own licensing as you scale</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Scaling considerations
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              As your platform grows, your payment needs will evolve. Consider providers that can support:
            </p>
            
            <ul className="space-y-3 text-muted-foreground mb-8">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Volume-based pricing that improves as you grow</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>International expansion with multi-currency support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Advanced features like instant payouts or embedded financial services</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Robust APIs and developer tools for customisation</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Choosing the right fit
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The best provider for your platform depends on your business model, growth stage, and how much complexity you want to own versus outsource. Taking time to understand these trade-offs early can save significant headaches later.
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

export default MarketplacePlatforms;
