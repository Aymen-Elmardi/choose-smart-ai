import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const WhyProvidersReUnderwrite = () => {
  useSEO({
    title: "Why Payment Providers Re-Underwrite Existing Accounts | ChosePayments",
    description: "Approval is not a one-time event. Learn why payment providers periodically re-underwrite accounts and how to prepare for ongoing reviews."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Payment Providers Re-Underwrite Existing Accounts
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Approval is not a one-time event.
            </p>
            
            <p>
              Payment providers periodically re-underwrite accounts to ensure the business still aligns with risk policies. This may happen annually, after growth milestones, or following changes in activity.
            </p>
            
            <p>
              Re-underwriting can involve requests for updated documents, explanations of recent transactions, or confirmation of business operations. Each provider handles this differently — understanding <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">how Stripe, Square, and PayPal assess risk</Link> can help you prepare.
            </p>
            
            <p>
              This process is normal and expected, especially for growing businesses. Problems arise when businesses are unprepared or operating outside the assumptions of their original approval.
            </p>
            
            <p>
              Understanding when re-underwriting occurs helps businesses avoid surprises and downtime. <Link to="/best-payment-processor-uk" className="text-primary hover:underline">Choosing the right payment processor in the UK</Link> upfront can reduce the impact of these reviews.
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

export default WhyProvidersReUnderwrite;
