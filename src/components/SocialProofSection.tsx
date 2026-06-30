import { Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    quote: "Saved 0.4% on every transaction after switching. That is $9,600 a year back in our pocket. We had been on the wrong processor for two years without realising it. The risk profile showed us exactly why our fees were higher than they should be.",
    name: "Jamie L.",
    business: "Ecommerce, New York",
    result: "12% cost reduction",
  },
  {
    quote: "Our account was flagged three times in a year. Not fraud. Our billing model just did not match how our provider had classified us. ChosePayments made that obvious straight away. Zero account issues in 18 months since we switched.",
    name: "Priya M.",
    business: "SaaS Platform, London",
    result: "Zero account issues in 18 months",
  },
  {
    quote: "The assessment took under a minute. I had spent weeks reading comparison sites and still had no idea which processor was right for a multi-location setup. Got a clear answer in 60 seconds and an intro the same day.",
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
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">What Businesses Say</p>
          <h2 className="heading-lg text-foreground">
            Real Results from Real Merchants
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Businesses that ran their risk profile and found the right processor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-card rounded-2xl p-6 border border-border/50 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
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
                <p className="mt-2 inline-block text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
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
