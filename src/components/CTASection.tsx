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
            Your Processor Is Either Right for Your Business or It Isn't.
          </h2>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-10">
            Most UK businesses find out the hard way. Frozen merchant accounts. Unexpected holds. Fees that don't add up. Run your profile now and find out before it costs you.
          </p>
          <Button 
            variant="hero"
            size="xl" 
            asChild
          >
            <Link to="/assessment?start=true" replace>
              See if you're overpaying
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
