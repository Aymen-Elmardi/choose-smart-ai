import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const IndustryVerification = () => {
  useSEO({
    title: "Why Some Industries Are Asked for Extra Verification | ChosePayments",
    description: "Understanding why certain industries face additional verification requirements from payment providers."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Some Industries Are Asked for Extra Verification
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              Some industries trigger additional checks because they historically have higher refund rates or disputes.
            </p>
            
            <p>
              This does not mean your business is doing anything wrong.
            </p>
            
            <p>
              Common examples include:
            </p>
            
            <p>
              Subscription services<br />
              Digital products<br />
              Travel and hospitality<br />
              Marketplaces
            </p>
            
            <p>
              Providers may ask for more documents to understand delivery, refund policies, or customer agreements. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> differ by industry.
            </p>
            
            <p>
              The right provider can make a big difference depending on your industry. Our guide on <Link to="/best-payment-processor-uk" className="text-primary hover:underline">which UK payment processors are likely to approve you</Link> covers industry-specific considerations.
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

export default IndustryVerification;
