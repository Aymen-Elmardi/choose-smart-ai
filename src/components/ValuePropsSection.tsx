import { Scale, Clock, PiggyBank, MapPin } from "lucide-react";

const valueProps = [
  {
    icon: Scale,
    title: "Unbiased Recommendations",
    description: "We're not tied to any single provider. Our only goal is helping you find the best fit.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "No more digging through endless Stripe vs PayPal comparison guides. Get answers in seconds.",
  },
  {
    icon: PiggyBank,
    title: "Save Money",
    description: "Avoid overpaying for the wrong plan. We help you find transparent pricing that fits your volume.",
  },
  {
    icon: MapPin,
    title: "Made for UK and USA",
    description: "Tailored recommendations for UK and USA businesses. Global support coming soon.",
  },
];

const ValuePropsSection = () => {
  return (
    <section id="why-us" className="section-padding bg-card">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why Businesses Use ChosePayments
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="flex gap-5 p-6 rounded-2xl bg-background border border-border/50 shadow-card hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                <prop.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{prop.title}</h3>
                <p className="text-muted-foreground text-sm">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
