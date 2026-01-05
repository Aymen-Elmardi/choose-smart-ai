import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { ArrowLeft, Building2 } from "lucide-react";

const CaseStudies = () => {
  useSEO({
    title: "Case Studies | ChosePayments Insights",
    description: "Real-world examples of how businesses navigate payment provider challenges, account reviews, and compliance requirements."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="section-container max-w-4xl mx-auto">
          <Link 
            to="/insights" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Case Studies
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Real-world examples of how businesses navigate payment provider challenges, account reviews, and compliance requirements. Learn from practical scenarios.
          </p>
          
          <div className="p-8 rounded-xl border border-border bg-card text-center">
            <p className="text-muted-foreground mb-4">
              Case studies are coming soon. We are documenting real scenarios to help you understand how different situations unfold.
            </p>
            <p className="text-sm text-muted-foreground">
              In the meantime, explore our{" "}
              <Link to="/insights/payment-risk" className="text-primary hover:underline">
                Payment Risk
              </Link>{" "}
              and{" "}
              <Link to="/insights/guides" className="text-primary hover:underline">
                Practical Guides
              </Link>{" "}
              sections.
            </p>
          </div>

          <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
            <p className="text-muted-foreground">
              Want to understand your payment risk profile? Take our{" "}
              <Link to="/quiz?start=true" className="text-primary hover:underline">
                short assessment
              </Link>{" "}
              to get started.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;
