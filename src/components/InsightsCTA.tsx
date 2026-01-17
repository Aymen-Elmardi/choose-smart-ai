import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsightsCTAProps {
  variant?: "default" | "compact";
}

/**
 * Standardized Call-to-Action block for all /insights articles.
 * High-contrast design with compelling copy to drive assessment conversions.
 * 
 * Usage: Add to the end of every article in the insights section.
 */
const InsightsCTA = ({ variant = "default" }: InsightsCTAProps) => {
  if (variant === "compact") {
    return (
      <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Not sure if your setup is optimized?
            </h3>
            <p className="text-sm text-muted-foreground">
              Get a personalized risk and pricing analysis in 2 minutes.
            </p>
          </div>
          <Button asChild className="shrink-0">
            <Link to="/assessment">
              Take Assessment <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-16 -mx-4 sm:mx-0">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 p-8 md:p-12">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Free Risk Assessment
          </div>
          
          {/* Headline */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl">
            Stop Gambling with Your Revenue. Get the Expert Hand-Hold.
          </h2>
          
          {/* Body text */}
          <p className="text-lg text-white/85 mb-8 max-w-2xl leading-relaxed">
            Your payment setup is too critical to leave to chance. Our Personalized Risk & Pricing 
            Report analyzes your business's unique risk profile and matches you with a provider 
            built for your success.
          </p>
          
          {/* CTA Button */}
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/assessment" className="flex items-center gap-2">
              Get Your Personalized Risk & Pricing Report
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          
          {/* Trust indicator */}
          <p className="mt-6 text-sm text-white/60">
            Takes 2 minutes • No payment required • Instant results
          </p>
        </div>
      </div>
    </section>
  );
};

export default InsightsCTA;
