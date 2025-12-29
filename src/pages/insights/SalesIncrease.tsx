import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const SalesIncrease = () => {
  useCanonical();

  useEffect(() => {
    document.title = "Why Payment Providers Ask for More Documents When Your Sales Increase | ChosePayments";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn why sudden sales growth triggers additional document requests from payment providers.");
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
            Why Payment Providers Ask for More Documents When Your Sales Increase
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              Sudden growth can look risky from a payment provider's point of view.
            </p>
            
            <p>
              If your transaction volume increases quickly, the provider needs to check that:
            </p>
            
            <p>
              The growth is legitimate<br />
              You can handle refunds or chargebacks<br />
              There is no fraud or misuse of the account
            </p>
            
            <p>
              This is common for businesses that go viral, launch ads, or onboard many customers at once.
            </p>
            
            <p>
              Providers may ask for updated bank statements, forecasts, supplier contracts, or explanation of the growth.
            </p>
            
            <p>
              Planning for growth before it happens makes these reviews much smoother.
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

export default SalesIncrease;
