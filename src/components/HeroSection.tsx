import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="gradient-hero pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <p className="text-muted-foreground mb-4">
              Most businesses overpay on card fees without realising it.
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Find the Best Payment Provider for Your Business in{" "}
              <span className="text-primary">60 Seconds</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              Most businesses choose the wrong provider and overpay. Tell us a bit about your business and get a personalised match.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col items-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/assessment?start=true" replace>
                    Answer a few quick questions
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground mt-2">Takes under 1 minute • No spam</span>
              </div>
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
            <p className="mt-4 text-sm text-muted-foreground">
              We're compensated by payment providers when a relevant introduction is made. Your details are only shared for that purpose.
            </p>
          </div>
          
          <div className="animate-fade-up-delay-1 lg:pl-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Payment processing illustration showing connected payment cards and networks"
                className="relative w-full h-auto rounded-2xl shadow-card"
                width={600}
                height={400}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
