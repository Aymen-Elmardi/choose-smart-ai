import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// US market quiz link with state
const USQuizLink = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Link to="/assessment?start=true" state={{ market: "US" }} className={className} replace>
    {children}
  </Link>
);

const HeroSectionUS = () => {
  return (
    <section className="bg-background pt-28 pb-20 md:pt-40 md:pb-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            Independent Payment Advisor
          </p>
          <h1 className="heading-xl text-foreground text-balance">
            Find the Best Payment Provider for Your Business in{" "}
            <span className="text-primary">60 Seconds</span>
          </h1>
          <div className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              Many US businesses choose the wrong payment provider and overpay. Answer a few questions and get a personalised match based on how you operate.
            </p>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col items-center">
              <Button variant="hero" size="xl" asChild>
                <USQuizLink>
                  Answer a few quick questions
                  <ArrowRight className="w-5 h-5" />
                </USQuizLink>
              </Button>
              <span className="text-sm text-muted-foreground mt-2">Takes under 1 minute • No spam</span>
            </div>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#how-it-works">How it Works</a>
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Free & unbiased
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              No signup required
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            We're compensated by payment providers when a relevant introduction is made. Your details are only shared for that purpose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionUS;
