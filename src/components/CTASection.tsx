import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";

const CTASection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section className="section-padding bg-foreground" ref={ref}>
      <div className="section-container">
        <div className={`max-w-3xl mx-auto text-center reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-background mb-6">
            Ready to Optimise Your Payment Infrastructure?
          </h2>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-10">
            Book a fixed-scope Payment Strategy Review. One engagement. Clear deliverables. Measurable outcomes.
          </p>
          <Button 
            variant="hero"
            size="xl" 
            asChild
          >
            <Link to="/assessment?start=true" replace>
              Book Your Payment Strategy Review
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
