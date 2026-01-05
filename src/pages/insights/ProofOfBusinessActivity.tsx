import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";

const ProofOfBusinessActivity = () => {
  useSEO({
    title: "Why Your Payment Provider Asked for Proof of Business Activity | ChosePayments",
    description: "Understanding why payment providers ask for proof of business activity and how to prepare your documentation."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Practical Guides", slug: "guides" }}
            currentTitle="Proof of Business Activity"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Your Payment Provider Asked for Proof of Business Activity
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              When a payment provider asks for proof of business activity, they are trying to confirm that your business is real, active, and operating as described.
            </p>
            
            <p>
              This usually happens during onboarding or when something about your account changes. It does not automatically mean there is a problem.
            </p>
            
            <p>
              Proof of business activity often includes things like:
            </p>
            
            <p>
              A live website that clearly shows what you sell<br />
              Screenshots of your checkout or app<br />
              Recent invoices or customer receipts<br />
              Marketing materials or order confirmations
            </p>
            
            <p>
              Many businesses get stuck because their website is vague, unfinished, or does not clearly explain how money flows. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> vary in how strictly they assess business clarity.
            </p>
            
            <p>
              The safest way to avoid this is to make sure your business model is easy to understand before you apply to a provider. Our guide on <Link to="/best-payment-processor-uk" className="text-primary hover:underline">which UK payment processors are likely to approve you</Link> can help you find the right fit.
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

export default ProofOfBusinessActivity;
