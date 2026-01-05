import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { AlertTriangle, FileText, Building2, ArrowRight } from "lucide-react";

const featuredInsight = {
  title: "Why Payment Accounts Get Flagged Even When Nothing Changed",
  slug: "why-payment-accounts-get-flagged-without-changes",
  description: "Learn why payment accounts get flagged or reviewed even when nothing changed and how to reduce friction."
};

const categories = [
  {
    title: "Payment Risk & Account Freezes",
    slug: "payment-risk",
    description: "Understand why accounts get flagged, frozen, or reviewed. Learn the triggers and how to reduce risk.",
    icon: AlertTriangle,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive"
  },
  {
    title: "Practical Guides",
    slug: "guides",
    description: "Step-by-step explanations of verification requests, documentation requirements, and how to respond.",
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    title: "Case Studies",
    slug: "case-studies",
    description: "Real-world examples of how businesses navigate payment challenges and compliance requirements.",
    icon: Building2,
    iconBg: "bg-secondary/50",
    iconColor: "text-foreground"
  }
];

const allInsights = [
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
    title: "Why Payment Providers Ask for a Director's Passport or Proof of Address",
    slug: "why-payment-providers-ask-for-director-documents",
    description: "Understand why payment providers request director documents and how to respond effectively."
  },
  {
    title: "Why Payment Providers Ask for Source of Funds",
    slug: "why-payment-providers-ask-for-source-of-funds",
    description: "Understand why payment providers request source of funds documentation and how to respond effectively."
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
  },
  {
    title: "Why Payment Accounts Get Flagged Even When Nothing Changed",
    slug: "why-payment-accounts-get-flagged-without-changes",
    description: "Learn why payment accounts get flagged or reviewed even when nothing changed and how to reduce friction."
  }
];

const Insights = () => {
  useSEO({
    title: "Insights | ChosePayments",
    description: "Practical guidance on payment provider requirements, verification processes, account freezes, and risk management for UK and EU businesses."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="section-container max-w-4xl mx-auto">
          {/* Introduction */}
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Insights
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
            Practical guidance for businesses navigating payment provider requirements in the UK and EU.
          </p>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Payment providers operate under strict regulatory requirements. Understanding their processes helps you avoid account freezes, respond effectively to verification requests, and choose the right provider for your business model.
          </p>

          {/* Featured Insight */}
          <div className="mb-12">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Featured Insight
            </h2>
            <Link
              to={`/insights/${featuredInsight.slug}`}
              className="block p-6 rounded-xl border-2 border-primary/30 bg-primary/5 hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {featuredInsight.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {featuredInsight.description}
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-medium">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Categories */}
          <div className="mb-16">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Browse by Category
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.slug}
                    to={`/insights/${category.slug}`}
                    className="block p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg ${category.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${category.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* All Insights */}
          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              All Insights
            </h2>
            <div className="space-y-4">
              {allInsights.map((insight) => (
                <Link
                  key={insight.slug}
                  to={`/insights/${insight.slug}`}
                  className="block p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border text-center">
            <p className="text-muted-foreground mb-4">
              Not sure which payment provider is right for your business?
            </p>
            <Link
              to="/quiz?start=true"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Take our short assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Insights;
