import { ArrowRight } from "lucide-react";
import { Link } from '@/lib/router-compat';
import { Button } from "@/components/ui/button";

const CTASectionUS = () => {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              See if you're overpaying
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Upload your latest statement and we'll work out your all-in effective rate and how it compares.
            </p>
            <div className="flex flex-col items-center">
              <Button 
                variant="secondary" 
                size="xl" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                asChild
              >
                <Link to="/statement-review?us=1">
                  See if you're overpaying
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <span className="text-sm text-primary-foreground/70 mt-3">Takes under 1 minute • No spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASectionUS;
