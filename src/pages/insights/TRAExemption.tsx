import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import { Link } from "react-router-dom";
import SourcesCitation from "@/components/SourcesCitation";
import ArticleActions from "@/components/ArticleActions";

const traSources = [
  { name: "European Banking Authority – Strong Customer Authentication", url: "https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/regulatory-technical-standards-on-strong-customer-authentication-and-secure-communication-under-psd2", type: "regulatory" as const },
  { name: "FCA – Payment Services Regulations", url: "https://www.fca.org.uk/firms/strong-customer-authentication", type: "regulatory" as const },
  { name: "PSD2 Directive (EU) 2015/2366", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L2366", type: "regulatory" as const }
];

const TRAExemption = () => {
  useSEO({
    title: "What Is TRA Exemption and How It Reduces Payment Friction | ChosePayments",
    description: "Learn how TRA Exemption reduces checkout friction, improves approval rates, and affects conversion for UK and EU businesses accepting card payments."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Practical Guides", slug: "guides" }}
            currentTitle="TRA Exemption"
          />
          
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              What Is TRA Exemption and How It Reduces Payment Friction
            </h1>

            <p className="text-lg text-muted-foreground mb-6">
              When customers abandon a checkout, it is rarely because they changed their mind.
            </p>

            <p className="text-muted-foreground mb-6">
              In most cases, something introduced friction at the wrong moment. An extra authentication step. A payment that should have gone through but did not. A process that felt unnecessary.
            </p>

            <p className="text-muted-foreground mb-6">
              One of the most common causes is Strong Customer Authentication. One of the least understood ways to reduce that friction is TRA Exemption.
            </p>

            <p className="text-muted-foreground mb-8">
              This article explains what TRA Exemption is, when it applies, and how it quietly affects approval rates and completed orders.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              The problem TRA Exemption tries to solve
            </h2>

            <p className="text-muted-foreground mb-6">
              Under UK and EU regulations, many card payments require Strong Customer Authentication. This usually means an extra step such as approving the payment in a banking app, entering a one-time passcode, or confirming a biometric prompt.
            </p>

            <p className="text-muted-foreground mb-8">
              While this improves security, it also introduces friction. Every extra step increases checkout time and raises the risk of abandonment.
            </p>

            <p className="text-muted-foreground mb-8">
              TRA Exemption exists to reduce unnecessary authentication without weakening security.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What TRA Exemption actually means
            </h2>

            <p className="text-muted-foreground mb-6">
              TRA stands for Transaction Risk Analysis.
            </p>

            <p className="text-muted-foreground mb-6">
              Instead of forcing authentication on every payment, the payment provider evaluates the risk of each transaction in real time. If the transaction is considered low risk, authentication can be skipped.
            </p>

            <p className="text-muted-foreground mb-8">
              This decision is based on factors such as transaction value, fraud rates on the account, customer behaviour patterns, device signals, location consistency, and the merchant's historical performance.
            </p>

            <p className="text-muted-foreground mb-8">
              When applied correctly, TRA Exemption allows payments to complete smoothly while remaining compliant.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why some businesses benefit more than others
            </h2>

            <p className="text-muted-foreground mb-6">
              TRA Exemption is not a simple switch. It depends heavily on how the provider's risk engine works and how the business behaves over time.
            </p>

            <p className="text-muted-foreground mb-8">
              Lower value transactions are more likely to qualify. Accounts with clean fraud records benefit more. Established businesses typically see higher exemption rates than new accounts.
            </p>

            <p className="text-muted-foreground mb-8">
              This is why two businesses using the same provider can experience very different checkout behaviour.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              The hidden impact on conversion
            </h2>

            <p className="text-muted-foreground mb-6">
              From a customer's perspective, TRA Exemption is invisible. From a business perspective, it affects payment success rates, checkout completion, and repeat behaviour.
            </p>

            <p className="text-muted-foreground mb-8">
              Fewer interruptions lead to faster checkouts, higher completion rates, and less customer frustration. Over time, this compounds into meaningful revenue differences.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why providers handle TRA differently
            </h2>

            <p className="text-muted-foreground mb-6">
              Not all providers apply TRA Exemption in the same way. Differences come from how conservative their risk models are, how they balance fraud exposure, their industry appetite, and their experience with certain business models.
            </p>

            <p className="text-muted-foreground mb-8">
              Some providers trigger authentication more often by default. Others invest heavily in risk analysis and allow more exemptions. This is one reason switching providers can change conversion performance even when pricing stays the same.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Common misunderstandings
            </h2>

            <p className="text-muted-foreground mb-6">
              Many businesses assume TRA Exemption is automatic or applies to all transactions. In reality, it evolves over time, improves with good account behaviour, and may be restricted for certain industries.
            </p>

            <p className="text-muted-foreground mb-8">
              TRA Exemption is not a checkbox. It is an outcome of the relationship between your business and your provider.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What you can do as a business owner
            </h2>

            <p className="text-muted-foreground mb-6">
              You cannot control every risk decision, but you can influence outcomes. Keeping fraud low, avoiding sudden behavioural changes, and choosing providers aligned with your business model all matter.
            </p>

            <p className="text-muted-foreground mb-8">
              Understanding how your provider handles transaction risk is often more important than pricing alone.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why this matters when choosing a payment provider
            </h2>

            <p className="text-muted-foreground mb-6">
              TRA Exemption sits at the intersection of compliance, risk management, customer experience, and revenue. Two providers can look identical on paper yet perform very differently at checkout.
            </p>

            <p className="text-muted-foreground mb-8">
              If payments feel more complicated than they should, it is often not your checkout design. It is how risk is being handled behind the scenes.
            </p>

            <SourcesCitation sources={traSources} />

            {/* Share & Like Actions */}
            <ArticleActions
              slug="tra-exemption"
              title="What Is TRA Exemption and How It Reduces Payment Friction"
              className="mt-8 mb-12 pt-6 border-t border-border"
            />

            <div className="mt-12 p-6 rounded-xl bg-muted/50 border border-border">
              <p className="text-muted-foreground mb-4">
                <Link to="/assessment?start=true" replace className="text-primary hover:underline font-medium">
                  Understand how different providers handle risk and friction for your business.
                </Link>
              </p>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TRAExemption;
