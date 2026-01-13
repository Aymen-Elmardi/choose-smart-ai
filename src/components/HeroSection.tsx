import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-[hsl(220,15%,6%)] pt-24 pb-20 md:pt-32 md:pb-28">
      <div className="section-container">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[hsl(220,10%,88%)] leading-snug tracking-tight">
            Most payment problems start long before money moves.
            <span className="block mt-3 text-[hsl(220,10%,50%)]">They start when the wrong provider approves you.</span>
          </h1>
          <div className="mt-10 space-y-5 text-base md:text-lg text-[hsl(220,10%,45%)] max-w-2xl leading-relaxed">
            <p>
              ChosePayments helps businesses avoid payment providers that look fine at signup but fail under growth, international sales, or scrutiny.
            </p>
            <p>
              We don't rank providers.
              <br />
              We rule out the ones most likely to cause problems later.
            </p>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col items-start">
              <Button 
                size="lg" 
                asChild
                className="bg-[hsl(220,10%,18%)] text-[hsl(220,10%,70%)] hover:bg-[hsl(220,10%,22%)] hover:text-[hsl(220,10%,85%)] border border-[hsl(220,10%,25%)]"
              >
                <Link to="/assessment?start=true" replace>
                  Start Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <span className="text-xs text-[hsl(220,10%,35%)] mt-3">Takes under 1 minute • No spam</span>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-[hsl(220,10%,35%)]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(220,10%,30%)]" />
              Free & unbiased
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(220,10%,30%)]" />
              No signup required
            </div>
          </div>
          <p className="mt-6 text-xs text-[hsl(220,10%,30%)] max-w-xl">
            We're compensated by payment providers when a relevant introduction is made. Your details are only shared for that purpose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
