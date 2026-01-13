import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-[hsl(220,15%,8%)]">
      <div className="section-container">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(220,10%,75%)] leading-snug">
            Find out which providers to avoid before you apply.
          </h2>
          <p className="mt-4 text-sm text-[hsl(220,10%,40%)] max-w-xl">
            Answer a few questions about your business. We'll show you which providers are likely to cause problems — and which ones are worth considering.
          </p>
          <div className="mt-10">
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
            <p className="text-xs text-[hsl(220,10%,30%)] mt-4">
              Takes under 1 minute • No signup required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
