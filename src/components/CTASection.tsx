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
            Compare Payment Providers in 60 Seconds
          </h2>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-10">
            We've helped 100s of businesses choose the right payment provider for their business.
          </p>
          <Button 
            variant="hero"
            size="xl" 
            asChild
          >
            <Link to="/assessment?start=true" replace>
              Get My Recommendation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
