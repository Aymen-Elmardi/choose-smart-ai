import { ArrowRight } from "lucide-react";
import { Link } from '@/lib/router-compat';
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const CTASection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section className="section-padding bg-foreground" ref={ref}>
      <div className="section-container">
        <div className={`max-w-3xl mx-auto text-center reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-background mb-6">
            Your Processor Is Either Right for Your Business or It Is Not.
          </h2>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-10">
            Most businesses find out the hard way. Run your free profile now and find out before it costs you.
          </p>
          <Button
            variant="hero"
            size="xl"
            asChild
          >
            <Link to="/statement-review">
              See if you're overpaying
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <p className="mt-4 text-xs text-background/60">
            60 seconds. No sales call. Free for merchants.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
