import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding bg-foreground">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg text-background mb-6">
            Ready to Find the Right Payment Provider?
          </h2>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto mb-10">
            Tell us a bit about your business and get a tailored match in under 60 seconds.
          </p>
          <Button 
            variant="hero"
            size="xl" 
            asChild
          >
            <Link to="/assessment?start=true" replace>
              Answer a few quick questions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
