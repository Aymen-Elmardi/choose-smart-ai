import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="gradient-hero pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Find the Best Payment Provider for Your Business in{" "}
              <span className="text-primary">60 Seconds</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Most businesses choose the wrong provider and overpay. Answer a few simple questions and get a personalized recommendation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="/quiz" target="_blank" rel="noopener noreferrer">
                  Take the Quiz
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="#how-it-works">How it Works</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Free & unbiased
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                No signup required
              </div>
            </div>
          </div>
          
          <div className="animate-fade-up-delay-1 lg:pl-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Payment processing illustration showing connected payment cards and networks"
                className="relative w-full h-auto rounded-2xl shadow-card"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
