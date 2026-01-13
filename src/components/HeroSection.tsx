import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const HeroSection = () => {
  return (
    <section className="bg-[hsl(220,15%,8%)] pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[hsl(220,10%,95%)] leading-tight text-balance">
              Most payment problems start long before money moves.
              <span className="block mt-2 text-[hsl(215,15%,60%)]">They start when the wrong provider approves you.</span>
            </h1>
            <div className="mt-8 space-y-4 text-lg md:text-xl text-[hsl(220,10%,55%)] max-w-xl leading-relaxed">
              <p>
                ChosePayments helps businesses avoid payment providers that look fine at signup but fail under growth, international sales, or scrutiny.
              </p>
              <p>
                We don't rank providers.
                <br />
                We rule out the ones most likely to cause problems later.
              </p>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col items-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/assessment?start=true" replace>
                    Answer a few quick questions
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <span className="text-sm text-[hsl(220,10%,45%)] mt-2">Takes under 1 minute • No spam</span>
              </div>
              <Button variant="hero-outline" size="xl" asChild className="border-[hsl(215,15%,25%)] text-[hsl(220,10%,70%)] hover:bg-[hsl(215,15%,15%)] hover:text-[hsl(220,10%,85%)]">
                <a href="#how-it-works">How it Works</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-[hsl(220,10%,45%)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[hsl(215,20%,40%)]" />
                Free & unbiased
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[hsl(215,20%,40%)]" />
                No signup required
              </div>
            </div>
            <p className="mt-4 text-sm text-[hsl(220,10%,40%)]">
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
