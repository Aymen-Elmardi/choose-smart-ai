import { ArrowRight } from "lucide-react";
import { Link } from '@/lib/router-compat';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Free for merchants. US, UK and EU.
          </div>
          <h1 className="heading-xl text-foreground text-balance">
            Find the Right Payment Processor for Your Business
          </h1>
          <p className="mt-3 text-lg md:text-xl font-medium text-muted-foreground">
            Small business, e-commerce, online gaming, SaaS, and more.
          </p>
          <div className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              We match your business to payment processors that will actually approve you, at the right rate, with the right terms. No frozen accounts. No surprises. No more guessing.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-5">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button variant="hero" size="xl" asChild>
                <Link to="/statement-review">
                  See if you're overpaying
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/#how-it-works">
                  See How It Works
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground tracking-wide">
              Takes 60 seconds. No sales call. <strong className="text-primary font-semibold">Completely free for merchants.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
