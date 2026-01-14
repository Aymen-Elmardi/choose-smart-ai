import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
            Most payment problems start long before money moves.
            <span className="block mt-2 text-muted-foreground">They start when the wrong provider approves you.</span>
          </h1>
          <div className="mt-8 space-y-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              ChosePayments helps businesses avoid payment providers that look fine at signup but fail under growth, international sales, or scrutiny.
            </p>
            <p>
              We don't rank providers. We rule out the ones most likely to cause problems later.
            </p>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/assessment?start=true" replace>
                Answer a few quick questions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#how-it-works">How it Works</a>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Free & unbiased
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              No signup required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
