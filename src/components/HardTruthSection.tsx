const truths = [
  {
    strong: "Your rate is based on how risky your business looks to them,",
    rest: " not how well you have actually performed.",
  },
  {
    strong: "When they hold your funds, it is a system flag, not a personal decision.",
    rest: " But it still stops your business cold.",
  },
  {
    strong: "One bad chargeback month can change how every future transaction is treated,",
    rest: " permanently, at that processor.",
  },
  {
    strong: "Fast growth can trigger a freeze.",
    rest: " Sudden volume increases look like a red flag to the wrong provider.",
  },
  {
    strong: "Flat-rate pricing bundles fees together",
    rest: " so you cannot see what you are actually paying per transaction type.",
  },
  {
    strong: "Most merchant account rejections are preventable",
    rest: " if you know which processors match your risk profile before you apply.",
  },
];

const HardTruthSection = () => {
  return (
    <section className="section-padding bg-background border-t border-border">
      <div className="section-container">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">The Reality</p>
        <h2 className="heading-lg text-foreground mb-12">
          What Most Processors Will Not Tell You
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {truths.map((truth) => (
            <div
              key={truth.strong}
              className="flex items-start gap-4 p-5 bg-card border border-border rounded-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50"
            >
              <span className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground font-semibold">{truth.strong}</strong>
                {truth.rest}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HardTruthSection;
