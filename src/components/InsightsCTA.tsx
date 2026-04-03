import { Link } from '@/lib/router-compat';
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsightsCTAProps {
  variant?: "default" | "compact";
}

/**
 * Standardized Call-to-Action block for all /insights articles.
 * Repositioned as risk-profile-led rather than generic advisory.
 */
const InsightsCTA = ({ variant = "default" }: InsightsCTAProps) => {
  if (variant === "compact") {
    return (
      <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Not sure if your setup is right for your business?
            </h3>
            <p className="text-sm text-muted-foreground">
              Most payment problems happen because the provider wasn't a good risk fit.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <Link to="/assessment">
              Run My Risk Profile <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 p-6 sm:p-8 md:p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Independent Risk Analysis
          </div>

          {/* Context line */}
          <p className="text-base text-white/70 mb-4">
            Most payment problems happen because the provider was never a good risk fit.
          </p>
          
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl">
            Run Your Risk Profile to See Which Providers Actually Match Your Business
          </h2>
          
          {/* Body text */}
          <p className="text-lg text-white/85 mb-8 max-w-2xl leading-relaxed">
            Our engine evaluates 21 providers against your industry, volume, and business model —
            then shows you which ones are a strong fit, which are acceptable, and which to avoid.
          </p>
          
          {/* CTA Button */}
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto h-auto sm:h-12 py-3 sm:py-0 whitespace-normal sm:whitespace-nowrap"
          >
            <Link to="/assessment" className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap text-center">
              Run My Risk Profile
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          
          {/* Trust indicator */}
          <p className="mt-6 text-sm text-white/60">
            Takes 2 minutes • Human-reviewed guidance
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsightsCTA;
