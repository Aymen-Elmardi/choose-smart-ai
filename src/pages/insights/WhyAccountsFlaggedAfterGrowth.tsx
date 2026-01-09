import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const WhyAccountsFlaggedAfterGrowth = () => {
  useSEO({
    title: "Why Your Payment Account Gets Flagged After Sudden Growth | ChosePayments",
    description: "Rapid growth is one of the most common reasons payment accounts are reviewed. Learn why fast-growing businesses get flagged and how to avoid payment freezes."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Your Payment Account Gets Flagged After Sudden Growth
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Rapid growth is one of the most common reasons payment accounts are reviewed.
            </p>
            
            <p>
              When transaction volumes increase faster than expected, payment providers reassess whether the business still fits the original risk profile. This includes checking refund rates, customer disputes, average transaction size, and delivery timelines.
            </p>
            
            <p>
              From a provider's perspective, fast growth can increase exposure if something goes wrong. Even healthy businesses can be flagged if growth outpaces the risk assumptions made at onboarding. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> vary significantly in how they handle scaling businesses.
            </p>
            
            <p>
              This does not mean growth is a problem. It means growth needs to be understood and supported by the right payment setup.
            </p>
            
            <p>
              Businesses that anticipate these checks can often avoid freezes entirely by <Link to="/best-payment-processor-uk" className="text-primary hover:underline">choosing the right payment processor in the UK</Link> aligned with their scale and business model.
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

export default WhyAccountsFlaggedAfterGrowth;
