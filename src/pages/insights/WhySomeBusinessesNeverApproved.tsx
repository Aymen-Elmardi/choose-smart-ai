import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const WhySomeBusinessesNeverApproved = () => {
  useSEO({
    title: "Why Some Businesses Never Get Approved for Payments | ChosePayments",
    description: "Not all businesses are declined because they are doing something wrong. Learn why approval failures happen and how to apply correctly the first time."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Some Businesses Never Get Approved for Payments
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Not all businesses are declined because they are doing something wrong.
            </p>
            
            <p>
              Some business models carry higher inherent risk. Others lack operational clarity, clear customer flows, or sufficient documentation at the time of application.
            </p>
            
            <p>
              Approval failures often result from misalignment between the business model and the provider's risk appetite. Applying to the wrong provider repeatedly can actually make approval harder over time.
            </p>
            
            <p>
              The key is not applying everywhere, but applying correctly.
            </p>
            
            <p>
              Businesses that understand approval logic early save time, reduce friction, and avoid unnecessary rejections.
            </p>
            
            <p className="text-foreground font-medium mt-8">
              If this situation sounds familiar, our assessment helps identify approval risks before you apply or scale.
            </p>
            
            <Link 
              to="/quiz" 
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

export default WhySomeBusinessesNeverApproved;
