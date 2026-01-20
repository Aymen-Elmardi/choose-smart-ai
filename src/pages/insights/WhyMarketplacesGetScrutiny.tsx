import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const WhyMarketplacesGetScrutiny = () => {
  useSEO({
    title: "Marketplaces Face Extra Scrutiny: What Providers Look For | ChosePayments",
    description: "Marketplaces introduce additional layers of risk for payment providers. Learn why marketplace businesses face deeper reviews and how to choose the right payment infrastructure."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Marketplaces Face Extra Scrutiny: What Providers Look For
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Marketplaces introduce additional layers of risk for payment providers.
            </p>
            
            <p>
              Unlike single-merchant businesses, marketplaces involve multiple sellers, revenue splits, and delayed fulfilment. This increases the complexity of compliance, refunds, and dispute resolution.
            </p>
            
            <p>
              Providers must understand who is selling, how funds are distributed, and whether sellers meet regulatory requirements. This is why marketplaces are often reviewed more deeply and more frequently. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> differ significantly for marketplace models.
            </p>
            
            <p>
              Using a payment provider without native marketplace support can lead to freezes or forced migrations later.
            </p>
            
            <p>
              If your business involves multiple sellers or revenue sharing, selecting the right payment infrastructure early is critical. Our guide on <Link to="/best-payment-processor-uk" className="text-primary hover:underline">which UK payment processors are likely to approve you</Link> covers marketplace-friendly options.
            </p>
            
            <p className="text-foreground font-medium mt-8">
              If this situation sounds familiar, our assessment helps identify approval risks before you apply or scale.
            </p>
            
            <Link 
              to="/assessment?start=true"
              replace
              className="inline-block mt-4 text-primary hover:text-primary/80 font-medium underline underline-offset-4"
            >
              Take our short assessment →
            </Link>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default WhyMarketplacesGetScrutiny;
