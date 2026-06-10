import { Quote } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote: "Saved 0.4% on every transaction after switching. That is £8,000 a year back in our pocket. We had been on the wrong processor for two years without realising it. The risk profile showed us exactly why our fees were higher than they should be.",
    name: "Jamie L.",
    business: "Ecommerce, Manchester",
    result: "12% cost reduction",
  },
  {
    quote: "We had our account flagged three times in a year. It was not fraud. Our billing model just did not match how our provider had classified us. ChosePayments made that obvious straight away. No account issues in 18 months since we switched.",
    name: "Priya M.",
    business: "SaaS Platform, London",
    result: "Zero account issues in 18 months",
  },
  {
    quote: "The assessment took under a minute. I had spent weeks reading comparison sites and still did not know which provider was right for a multi-location setup with mixed online and in-person volume. Got a clear answer in 60 seconds.",
    name: "Tom W.",
    business: "Retail Chain, Birmingham",
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
            Real results from businesses who ran their risk profile and received independent payment advice.
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
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.business}
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
