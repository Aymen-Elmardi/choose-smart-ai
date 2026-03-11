import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="bg-background pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-xl text-foreground text-balance">
            Choose the Right Payment Provider for Your Risk Profile
          </h1>
          <div className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              Most merchants choose payment providers based on price or developer preference.
            </p>
            <p className="mt-3">
              Our engine matches providers to your actual risk profile.
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
              to="/insights"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Just want to understand? Start here →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
