import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-xl text-foreground text-balance">
            Find the Payment Processor That Won't Freeze Your Account.
          </h1>
          <div className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              We match your industry, volume, and risk signals to the right provider's appetite. Before you apply.
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/assessment">
                Run My Risk Profile
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Link
              to="/risk-profile-matching"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              See how it works in 60 seconds
            </Link>
          </div>
          <p className="mt-10 text-xs text-muted-foreground tracking-wide">
            Independent. Free for merchants. Trusted by businesses across the UK and EU.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
