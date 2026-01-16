import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";

const SourceOfFunds = () => {
  useSEO({
    title: "Source of Funds Requests: What They Mean and How to Respond | ChosePayments",
    description: "Learn why payment providers request bank statements and source of funds documentation."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Practical Guides", slug: "guides" }}
            currentTitle="Source of Funds"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Source of Funds Requests: What They Mean and How to Respond
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              "Source of funds" simply means where the money in your account comes from.
            </p>
            
            <p>
              Providers ask for this to comply with financial regulations and prevent money laundering.
            </p>
            
            <p>
              They may request:
            </p>
            
            <p>
              Business bank statements<br />
              Personal statements for new businesses<br />
              Explanation of large deposits
            </p>
            
            <p>
              This usually happens for new businesses or when volumes change. Different providers have varying requirements — understanding <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">how Stripe, Square, and PayPal assess risk</Link> can help you prepare.
            </p>
            
            <p>
              Having clean separation between personal and business finances helps a lot here. <Link to="/best-payment-processor-uk" className="text-primary hover:underline">Choosing the right payment processor in the UK</Link> from the start can reduce these friction points.
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

export default SourceOfFunds;
