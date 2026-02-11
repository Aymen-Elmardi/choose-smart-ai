import { ShoppingCart, RefreshCw, Store, Building2 } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const examples = [
  {
    icon: ShoppingCart,
    businessType: "High-Volume Ecommerce",
    advisory: "Gateway audit and acceptance optimisation",
    color: "bg-indigo-500",
  },
  {
    icon: RefreshCw,
    businessType: "SaaS and Subscription Platforms",
    advisory: "Recurring billing and churn reduction strategy",
    color: "bg-emerald-500",
  },
  {
    icon: Store,
    businessType: "Marketplace Operators",
    advisory: "Multi-seller payout and compliance review",
    color: "bg-blue-500",
  },
  {
    icon: Building2,
    businessType: "Omnichannel Retailers",
    advisory: "Unified payment infrastructure advisory",
    color: "bg-amber-500",
  },
];

const ExamplesSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Who We Work With
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examples.map((example, index) => (
            <div
              key={example.businessType}
              className={`p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-lg transition-all hover:-translate-y-1 text-center reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
            >
              <div className={`w-14 h-14 mx-auto rounded-xl ${example.color} flex items-center justify-center mb-4`}>
                <example.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-lg font-bold text-foreground mb-1">{example.businessType}</p>
              <p className="text-sm text-muted-foreground">{example.advisory}</p>
            </div>
          ))}
        </div>

        <p className={`text-center mt-10 text-muted-foreground reveal stagger-4 ${isInView ? "visible" : ""}`}>
          We work with organisations processing substantial volumes. If you are an early-stage startup or processing under £1M, our premium review may not be the right fit.
        </p>
      </div>
    </section>
  );
};

export default ExamplesSection;
