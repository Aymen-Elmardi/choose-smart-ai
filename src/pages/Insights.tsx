import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCanonical } from "@/hooks/useCanonical";

const insights = [
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
  }
];

const Insights = () => {
  useCanonical();

  useEffect(() => {
    document.title = "Insights | ChosePayments";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Insights on payment provider requirements, verification processes, and what to expect when setting up payments for your business.");
    }
    return () => {
      document.title = "ChosePayments";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="section-container max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Insights
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Practical guidance on payment provider requirements and verification processes.
          </p>
          
          <div className="space-y-6">
            {insights.map((insight) => (
              <Link
                key={insight.slug}
                to={`/insights/${insight.slug}`}
                className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {insight.title}
                </h2>
                <p className="text-muted-foreground">
                  {insight.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Insights;
