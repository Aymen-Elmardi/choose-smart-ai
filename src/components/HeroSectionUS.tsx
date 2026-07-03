import { ArrowRight } from "lucide-react";
import { Link } from '@/lib/router-compat';
import { Button } from "@/components/ui/button";

const HeroSectionUS = () => {
  return (
    <section className="bg-background pt-28 pb-20 md:pt-40 md:pb-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Independent Payment Advisory
          </p>
          <h1 className="heading-xl text-foreground text-balance">
            Find the Right USA Payment Processor for Your Business
          </h1>
          <div className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              Many US businesses choose the wrong payment provider and overpay. Tell us about your business and we'll review your situation with independent guidance.
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/statement-review?us=1">
                See if you're overpaying
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground mt-2">Takes under 1 minute • No spam</span>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Independent advisory
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Human-led guidance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionUS;
