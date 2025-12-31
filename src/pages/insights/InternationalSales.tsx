import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const InternationalSales = () => {
  useSEO({
    title: "Why International Sales Trigger Additional Checks | ChosePayments",
    description: "Learn why selling internationally can trigger additional verification from payment providers."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why International Sales Trigger Additional Checks
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              Selling internationally adds complexity.
            </p>
            
            <p>
              Payment providers need to understand:
            </p>
            
            <p>
              Where customers are located<br />
              Which countries money flows through<br />
              Whether taxes and regulations are followed
            </p>
            
            <p>
              You may be asked for:
            </p>
            
            <p>
              Details about overseas suppliers<br />
              Shipping policies<br />
              Customer locations
            </p>
            
            <p>
              Even small amounts of international sales can trigger this. Understanding <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">payment provider approval differences</Link> helps you anticipate these requirements.
            </p>
            
            <p>
              Being upfront about international activity avoids surprises later. <Link to="/best-payment-processor-uk" className="text-primary hover:underline">Choosing the right payment processor in the UK</Link> that supports international sales from the start is essential.
            </p>
            
            <p className="mt-12 pt-8 border-t border-border">
              If you want to avoid these issues before choosing a payment provider, you can start a{" "}
              <Link to="/quiz?start=true" className="text-primary hover:underline">
                short assessment
              </Link>.
            </p>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default InternationalSales;
