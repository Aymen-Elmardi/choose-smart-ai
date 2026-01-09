import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const paymentRiskArticles = [
  {
    title: "Why Stripe Freezes Accounts in the UK",
    slug: "why-stripe-freezes-accounts-uk",
    description: "Stripe does not freeze accounts at random. Learn the common triggers and how to prevent them."
  },
  {
    title: "Why Your Payment Account Gets Flagged After Sudden Growth",
    slug: "why-accounts-get-flagged-after-growth",
    description: "Rapid growth is one of the most common reasons payment accounts are reviewed."
  },
  {
    title: "Why PayPal and Stripe Freeze Accounts Without Warning",
    slug: "why-payment-accounts-get-frozen-without-warning",
    description: "Payment providers are not always able to warn merchants before taking action."
  },
  {
    title: "Why Marketplaces Get Extra Scrutiny From Payment Providers",
    slug: "why-marketplaces-get-extra-scrutiny",
    description: "Marketplaces introduce additional layers of risk for payment providers."
  },
  {
    title: "Why Payment Providers Re-Underwrite Existing Accounts",
    slug: "why-providers-re-underwrite-accounts",
    description: "Approval is not a one-time event. Learn why providers periodically re-underwrite accounts."
  },
  {
    title: "Why Some Businesses Never Get Approved for Payments",
    slug: "why-some-businesses-never-get-approved",
    description: "Not all businesses are declined because they are doing something wrong."
  },
  {
    title: "Why Payment Accounts Get Flagged Even When Nothing Changed",
    slug: "why-payment-accounts-get-flagged-without-changes",
    description: "Learn why payment accounts get flagged or reviewed even when nothing changed and how to reduce friction."
  },
  {
    title: "Why Payment Accounts Get Flagged After Sudden Growth",
    slug: "why-payment-accounts-get-flagged-after-growth",
    description: "Understand why sudden business growth triggers payment account reviews and how to handle them."
  },
  {
    title: "Why Payment Providers Re-Underwrite Existing Accounts",
    slug: "why-providers-re-underwrite-existing-accounts",
    description: "Understand why payment providers re-underwrite existing accounts and how to handle these reviews."
  }
];

const PaymentRisk = () => {
  useSEO({
    title: "Payment Risk & Account Freezes | ChosePayments Insights",
    description: "Understand why payment accounts get flagged, frozen, or reviewed. Learn about account freezes, re-underwriting, and how to reduce payment risk."
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
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Payment Risk & Account Freezes
            </h1>
          </div>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Payment accounts can be flagged, frozen, or reviewed for many reasons. This collection explains the most common triggers, why providers take action, and how to reduce your risk exposure.
          </p>
          
          <div className="space-y-6">
            {paymentRiskArticles.map((article) => (
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
              Want to assess your current payment risk? Take our{" "}
              <Link to="/assessment?start=true" className="text-primary hover:underline">
                short assessment
              </Link>{" "}
              to identify potential issues before they become problems.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentRisk;
