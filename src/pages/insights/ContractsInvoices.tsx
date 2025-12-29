import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const ContractsInvoices = () => {
  useCanonical();

  useEffect(() => {
    document.title = "Why Providers Ask for Contracts, Invoices, or Customer Agreements | ChosePayments";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Understanding why payment providers request contracts, invoices, and customer agreements.");
    }
    return () => {
      document.title = "ChosePayments";
    };
  }, []);

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
              This helps them assess refund risk and chargeback exposure.
            </p>
            
            <p>
              Clear documentation protects both you and the provider.
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

export default ContractsInvoices;
