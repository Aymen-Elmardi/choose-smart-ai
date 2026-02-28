const truths = [
  "Your rate is risk-adjusted.",
  "Reserves are statistical, not personal.",
  "Chargebacks change your risk tier instantly.",
  "Growth spikes trigger reviews.",
  "Blended pricing hides interchange shifts.",
];

const HardTruthSection = () => {
  return (
    <section className="border-t border-border bg-foreground">
      <div className="section-container py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-background tracking-tight mb-10">
            The Truth Most Providers Won't Explain Clearly
          </h2>
          <ul className="space-y-4">
            {truths.map((truth) => (
              <li
                key={truth}
                className="flex items-start gap-3 text-background/80 text-sm leading-relaxed"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                {truth}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HardTruthSection;
