import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const ContractsInvoices = () => {
  useSEO({
    title: "Why Providers Ask for Contracts, Invoices, or Customer Agreements | ChosePayments",
    description: "Understanding why payment providers request contracts, invoices, and customer agreements."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Providers Ask for Contracts, Invoices, or Customer Agreements
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              Providers want to understand your relationship with your customers.
            </p>
            
            <p>
              This is especially important for:
            </p>
            
            <p>
              Subscriptions<br />
              Large transactions<br />
              B2B services
            </p>
            
            <p>
              They may ask for:
            </p>
            
            <p>
              Customer contracts<br />
              Invoices<br />
              Terms of service
            </p>
            
            <p>
              This helps them assess refund risk and chargeback exposure. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> vary in how strictly they enforce documentation.
            </p>
            
            <p>
              Clear documentation protects both you and the provider. Understanding <Link to="/best-payment-processor-uk" className="text-primary hover:underline">UK payment processor approval criteria</Link> helps you prepare the right documents upfront.
            </p>
            
            <p className="mt-12 pt-8 border-t border-border">
              If you want to avoid these issues before choosing a payment provider, you can start a{" "}
              <Link to="/assessment?start=true" replace className="text-primary hover:underline">
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

export default ContractsInvoices;
