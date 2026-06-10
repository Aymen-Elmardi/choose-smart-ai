const truths = [
  "Your rate is based on how risky your business looks to them, not how well you have performed.",
  "When they hold your funds, it is because their system flagged your account type. It is not personal. But it still stops your business.",
  "A spike in chargebacks in even one bad month can change how every future transaction is treated.",
  "If your revenue suddenly grows, your processor may pause your account to review it. Fast growth looks like a red flag to the wrong provider.",
  "Flat-rate pricing bundles fees together so you cannot see what you are actually paying per transaction type.",
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
