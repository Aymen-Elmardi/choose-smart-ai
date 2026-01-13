const valueProps = [
  {
    title: "Unbiased",
    description: "We're not tied to any single provider. We surface risk, not sales pitches.",
  },
  {
    title: "Experience-based",
    description: "Our recommendations come from patterns we've seen across hundreds of businesses.",
  },
  {
    title: "UK & US focused",
    description: "Tailored for businesses operating in the UK and United States.",
  },
  {
    title: "No signup required",
    description: "Get useful information before you share anything personal.",
  },
];

const ValuePropsSection = () => {
  return (
    <section id="why-us" className="py-20 md:py-28 bg-[hsl(220,15%,8%)]">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl md:text-3xl font-semibold text-[hsl(220,10%,75%)] leading-snug">
            Why businesses use ChosePayments
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="border-l border-[hsl(220,10%,18%)] pl-6"
            >
              <h3 className="text-base font-medium text-[hsl(220,10%,60%)] mb-2">{prop.title}</h3>
              <p className="text-sm text-[hsl(220,10%,40%)] leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
