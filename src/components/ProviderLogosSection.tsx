const providers = ["Stripe", "Square", "PayPal", "Adyen", "Datman"];

const ProviderLogosSection = () => {
  return (
    <section className="py-10 md:py-14 bg-[hsl(220,15%,6%)] border-t border-[hsl(220,10%,12%)]">
      <div className="section-container">
        <p className="text-xs text-[hsl(220,10%,35%)] text-center mb-6 uppercase tracking-wider">
          We help businesses choose between providers like
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 md:gap-14">
          {providers.map((name) => (
            <span 
              key={name}
              className="text-sm sm:text-base font-medium tracking-tight text-[hsl(220,10%,30%)] select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProviderLogosSection;
