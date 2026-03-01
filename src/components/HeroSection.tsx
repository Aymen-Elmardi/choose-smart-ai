import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">Payment Strategy Review</p>
          <h1 className="heading-xl text-foreground text-balance">
            Your Payment Infrastructure Is Either Protecting Revenue or Quietly Losing It
          </h1>
          <div className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              We partner with established merchants processing £1M+ annually to audit, benchmark, and optimise their payment stack. One fixed-scope engagement. Measurable outcomes.
            </p>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/assessment?start=true" replace>
                Book Your Payment Strategy Review
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground justify-center flex-wrap">
            <span>For merchants processing £1M+</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Fixed-scope engagement</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Outcome-driven methodology</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
