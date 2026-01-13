import { ShoppingCart, Coffee, RefreshCw, Store } from "lucide-react";

const examples = [
  {
    icon: ShoppingCart,
    businessType: "Ecommerce Store",
    recommendation: "Stripe",
    color: "bg-indigo-500",
  },
  {
    icon: Coffee,
    businessType: "Coffee Shop",
    recommendation: "Square",
    color: "bg-emerald-500",
  },
  {
    icon: RefreshCw,
    businessType: "Subscription Platform",
    recommendation: "Braintree",
    color: "bg-blue-500",
  },
  {
    icon: Store,
    businessType: "Marketplace",
    recommendation: "Adyen",
    color: "bg-amber-500",
  },
];

const ExamplesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Get the Right Provider for YOUR Business
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examples.map((example) => (
            <div
              key={example.businessType}
              className="p-6 rounded-2xl bg-card border border-border/50 shadow-card hover:shadow-lg transition-all hover:-translate-y-1 text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl ${example.color} flex items-center justify-center mb-4`}>
                <example.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">{example.businessType}</p>
              <p className="text-xl font-bold text-foreground">→ {example.recommendation}</p>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-muted-foreground">
          Your results are personalized based on your business profile.
        </p>
      </div>
    </section>
  );
};

export default ExamplesSection;
