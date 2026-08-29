import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { BOOKING_URL } from '@/lib/booking';

const HeroSection = () => {
  return (
    <section className="bg-background pt-28 pb-12 md:pt-40 md:pb-20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Free for merchants. US, UK and EU.
          </div>
          <h1 className="heading-xl text-foreground text-balance">
            Find the Right Payment Processor for Your Business
          </h1>
          <p className="mt-3 text-lg md:text-xl font-medium text-muted-foreground">
            For all business types — ecommerce, marketplaces, small businesses, SaaS, online gaming, and more.
          </p>
          <div className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            <p>
              We match your business to payment processors that will actually approve you, at the right rate, with the right terms. No frozen accounts. No surprises. No more guessing.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center gap-5">
            <Button variant="hero" size="xl" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book a 15-Minute Call
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="link" asChild>
              <Link href="/statement-review">
                See if you're overpaying
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground tracking-wide">
              Takes 60 seconds. No sales call. <strong className="text-primary font-semibold">Completely free for merchants.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
