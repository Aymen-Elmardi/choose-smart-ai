const examples = [
  {
    businessType: "Ecommerce",
    note: "High chargeback exposure requires specific provider capabilities",
  },
  {
    businessType: "Subscription",
    note: "Recurring billing triggers different underwriting criteria",
  },
  {
    businessType: "Marketplace",
    note: "Split payments and seller payouts add compliance complexity",
  },
  {
    businessType: "High-volume retail",
    note: "Growth patterns often trigger re-underwriting reviews",
  },
];

const ExamplesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[hsl(220,15%,6%)] border-t border-[hsl(220,10%,12%)]">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(220,10%,75%)] leading-snug">
            Different businesses, different risks
          </h2>
          <p className="mt-4 text-sm text-[hsl(220,10%,40%)]">
            Your business model determines which providers will work long-term.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examples.map((example) => (
            <div
              key={example.businessType}
              className="p-5 border-l border-[hsl(220,10%,18%)]"
            >
              <p className="text-base font-medium text-[hsl(220,10%,55%)] mb-2">{example.businessType}</p>
              <p className="text-xs text-[hsl(220,10%,35%)] leading-relaxed">{example.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
