import { Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote: "Saved 0.4% on every transaction after switching. That's £8,000 a year back in our pocket.",
    businessType: "Ecommerce",
    location: "Manchester",
    result: "12% cost reduction",
  },
  {
    quote: "Finally found a provider that understands subscription billing. No more frozen accounts.",
    businessType: "SaaS Platform",
    location: "London",
    result: "Zero account issues in 18 months",
  },
  {
    quote: "The quiz took 45 seconds. Would've taken me weeks to research this myself.",
    businessType: "Retail Chain",
    location: "Birmingham",
    result: "20+ hours saved",
  },
];

const SocialProofSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-secondary" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="heading-lg text-foreground">
            What Businesses Say
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Real results from businesses who found their perfect match.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-card rounded-2xl p-6 border border-border/50 shadow-card reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground font-medium mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="pt-4 border-t border-border/50">
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.businessType}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.location}
                </p>
                <p className="mt-2 text-xs font-medium text-primary">
                  {testimonial.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
