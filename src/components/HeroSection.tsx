import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background pt-28 pb-20 md:pt-40 md:pb-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">Independent Payment Advisory</p>
          <h1 className="heading-xl text-foreground text-balance">
            Independent Payment Advice for Your Business
          </h1>
          <div className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              Most businesses choose a payment provider too quickly and regret it. We review your situation independently
              and advise on which options are most likely to work.
            </p>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/assessment?start=true" replace>
                Apply for Payment Advisory
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#how-it-works">How it Works</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground justify-center flex-wrap">
            <span>Independent advisory</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Human-led guidance</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>No provider influence</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
