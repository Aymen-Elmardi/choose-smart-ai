const providers = ["Square", "PayPal", "Adyen", "Datman", "SumUp"];

const ProviderLogosSection = () => {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="section-container">
        <p className="text-sm text-muted-foreground text-center mb-6">
          We help businesses choose between payment providers like:
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12">
          {providers.map((name) => (
            <span 
              key={name}
              className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-muted-foreground/60 select-none"
            >
              {name}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-muted-foreground/60 text-center mt-6">
          Logos shown for identification purposes only.
        </p>
      </div>
    </section>
  );
};

export default ProviderLogosSection;
