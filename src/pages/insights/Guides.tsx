import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { ArrowLeft, FileText } from "lucide-react";

const guideArticles = [
  {
    title: "Why Your Payment Provider Asked for Proof of Business Activity",
    slug: "proof-of-business-activity",
    description: "Understanding why payment providers ask for proof of business activity and how to prepare."
  },
  {
    title: "Why Payment Providers Ask for More Documents When Your Sales Increase",
    slug: "sales-increase",
    description: "Learn why sudden sales growth triggers additional document requests."
  },
  {
    title: "Why Marketplaces Are Asked for Seller and Payout Information",
    slug: "marketplace-seller-info",
    description: "Why marketplace businesses face additional verification for seller and payout information."
  },
  {
    title: "Why Payment Providers Ask for Bank Statements or Source of Funds",
    slug: "source-of-funds",
    description: "Learn why providers request bank statements and source of funds documentation."
  },
  {
    title: "Why Some Industries Are Asked for Extra Verification",
    slug: "industry-verification",
    description: "Understanding why certain industries face additional verification requirements."
  },
  {
    title: "Why International Sales Trigger Additional Checks",
    slug: "international-sales",
    description: "Learn why selling internationally can trigger additional verification."
  },
  {
    title: "Why Providers Ask for Contracts, Invoices, or Customer Agreements",
    slug: "contracts-invoices",
    description: "Understanding why payment providers request contracts and customer agreements."
  },
  {
    title: "Why Payment Providers Ask for a Director's Passport or Proof of Address",
    slug: "why-payment-providers-ask-for-director-documents",
    description: "Understand why payment providers request director documents and how to respond effectively."
  },
  {
    title: "Why Payment Providers Ask for Source of Funds",
    slug: "why-payment-providers-ask-for-source-of-funds",
    description: "Understand why payment providers request source of funds documentation and how to respond effectively."
  }
];

const Guides = () => {
  useSEO({
    title: "Practical Guides | ChosePayments Insights",
    description: "Step-by-step guides on payment provider verification, documentation requirements, and how to respond to compliance requests."
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
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Practical Guides
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Payment providers request documentation for specific reasons. These guides explain what they are looking for, why they need it, and how to respond effectively to verification requests.
          </p>
          
          <div className="space-y-6">
            {guideArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/insights/${article.slug}`}
                className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {article.title}
                </h2>
                <p className="text-muted-foreground">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
            <p className="text-muted-foreground">
              Not sure which provider is right for your business? Take our{" "}
              <Link to="/quiz?start=true" className="text-primary hover:underline">
                short assessment
              </Link>{" "}
              to get a personalised recommendation.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Guides;
