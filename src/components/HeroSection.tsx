import { ArrowRight } from "lucide-react";
import { Link } from '@/lib/router-compat';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-xl text-foreground text-balance">
            Find the Right UK Payment Processor for Your Business
          </h1>
          <div className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              We match your business model, volume, and transaction history to UK merchant account providers most likely to approve you. Avoid frozen accounts, rejected applications, and fees that never made sense.
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/statement-review">
                See if you're overpaying
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground tracking-wide">
              Takes 60 seconds. No sales call. You'll see your match immediately.
            </p>
            <p className="text-xs text-muted-foreground tracking-wide">
              Independent. Free for merchants. Trusted by 50+ businesses across the UK and EU.
            </p>
            <Link
              to="/risk-profile-matching"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              See how it works in 60 seconds
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
