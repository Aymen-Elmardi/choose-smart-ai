import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";

const VisaMastercardControl = () => {
  useSEO({
    title: "Visa and Mastercard Control Card Payments. What Businesses Can and Cannot Do | ChosePayments",
    description: "Learn how Visa and Mastercard control the card payment system, why even large providers must follow their rules, and what UK and EU businesses can realistically do."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Payment Risk", slug: "payment-risk" }}
            currentTitle="Visa and Mastercard Control Card Payments"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Visa and Mastercard Control Card Payments. What Businesses Can and Cannot Do
          </h1>

          {/* Introduction */}
          <div className="prose prose-gray dark:prose-invert max-w-none mb-10">
            <p className="text-lg text-muted-foreground">
              If you accept card payments, your business operates inside a system you do not control.
            </p>
            <p className="text-muted-foreground">
              This often becomes visible only when something changes. A review request appears. An account is restricted. A payment provider asks questions you did not expect.
            </p>
            <p className="text-muted-foreground">
              This is not usually about your provider making a sudden decision. It is about how the global card system is structured.
            </p>
            <p className="text-muted-foreground">
              This page explains why Visa and Mastercard sit at the centre of card payments, what power they actually have, and what businesses can realistically do within that system.
            </p>
          </div>

          {/* Section: Visa and Mastercard Are the Rails */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Visa and Mastercard Are the Rails, Not the Trains
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Visa and Mastercard do not approve or reject businesses directly.
              </p>
              <p>
                They do not onboard merchants. They do not provide customer support. They do not manage your account day to day.
              </p>
              <p>
                What they control are the rules of the card networks.
              </p>
              <p>
                Every card transaction travels across their networks. Payment providers, banks, and acquirers must follow those rules to remain connected to the system.
              </p>
              <p>
                If a provider does not comply, they risk penalties or removal from the network entirely.
              </p>
              <p>
                This is why even very large payment providers operate within strict limits. They do not have freedom to ignore risk signals or documentation requirements.
              </p>
            </div>
          </section>

          {/* Section: Why Even Large Payment Providers Cannot Override This */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Why Even Large Payment Providers Cannot Override This
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                When a provider asks for documents or reviews your account, it is often responding to network level obligations.
              </p>
              <p>
                These obligations include anti money laundering requirements, fraud prevention thresholds, and ongoing merchant monitoring. This includes{" "}
                <Link to="/insights/why-payment-providers-ask-for-source-of-funds" className="text-primary hover:underline">
                  source of funds checks
                </Link>{" "}
                that may seem intrusive but are required by the system.
              </p>
              <p>
                A provider can disagree internally. They can sometimes advocate on your behalf. But they cannot simply bypass the system.
              </p>
              <p>
                Complaints, escalation tickets, or switching providers rarely change this reality. In fact,{" "}
                <Link to="/insights/why-payment-accounts-get-flagged-without-changes" className="text-primary hover:underline">
                  accounts can be flagged even when nothing changes
                </Link>.
              </p>
              <p className="font-medium text-foreground">
                The rules are upstream.
              </p>
            </div>
          </section>

          {/* Section: The Only Decision That Actually Changes Outcomes */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The Only Decision That Actually Changes Outcomes
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                There are many things businesses cannot influence.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>You cannot change Visa and Mastercard rules.</li>
                <li>You cannot stop periodic reviews.</li>
                <li>You cannot prevent risk checks when your profile changes.</li>
              </ul>
              <p>
                What you can influence is alignment.
              </p>
              <p>Specifically:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  Whether your business model fits your provider's risk appetite — especially for{" "}
                  <Link to="/insights/why-marketplaces-get-extra-scrutiny" className="text-primary hover:underline">
                    marketplace and platform models
                  </Link>
                </li>
                <li>Whether your growth pattern matches their expectations</li>
                <li>Whether your documentation profile is compatible with their processes</li>
              </ul>
              <p className="font-medium text-foreground">
                This is why the right provider matters more than the cheapest one or the most popular one.
              </p>
            </div>
          </section>

          {/* Section: Why Problems Appear After Success */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Why Problems Appear After Success, Not Before
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Most reviews happen after something changes.
              </p>
              <p>Common triggers include:</p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>Rapid increase in volume</li>
                <li>
                  Expansion into new countries —{" "}
                  <Link to="/insights/why-international-sales-trigger-reviews" className="text-primary hover:underline">
                    international sales often trigger reviews
                  </Link>
                </li>
                <li>New product or service lines</li>
                <li>Higher average transaction values</li>
                <li>Increased chargeback exposure</li>
              </ul>
              <p>
                From the outside, this can feel like punishment for growth.
              </p>
              <p>
                From the system's perspective, it is recalibration. This process is known as{" "}
                <Link to="/insights/why-providers-re-underwrite-accounts" className="text-primary hover:underline">
                  re-underwriting after growth
                </Link>.
              </p>
              <p className="font-medium text-foreground">
                The system is designed to reassess risk when behaviour changes, not when everything is static.
              </p>
            </div>
          </section>

          {/* Section: Why Switching Providers Does Not Reset */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Why Switching Providers Does Not Reset the System
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Many businesses assume switching providers will remove scrutiny.
              </p>
              <p>
                In reality, the underlying risk signals often follow the business, not the provider.
              </p>
              <p>
                New providers still rely on the same networks, similar banks, and shared compliance frameworks.
              </p>
              <p>
                If the root mismatch remains, the outcome often repeats.
              </p>
              <p className="font-medium text-foreground">
                This is why switching without understanding alignment frequently leads to more friction, not less.
              </p>
            </div>
          </section>

          {/* Section: What This Means in Practice */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              What This Means in Practice
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="font-medium text-foreground">
                You are not choosing freedom. You are choosing compatibility.
              </p>
              <p>
                Businesses that experience fewer issues are not invisible to the system. They are simply well matched to their provider's tolerance and infrastructure.
              </p>
              <p>
                This is not about gaming the system. It is about choosing a provider designed for your reality.
              </p>
            </div>
          </section>

          {/* Section: A Practical Next Step */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              A Practical Next Step
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you are unsure whether your current provider is aligned with your business profile, it is usually better to identify that early.
              </p>
              <p>
                A short assessment can surface potential mismatches before they turn into account issues.
              </p>
              <p>
                For more context, explore our{" "}
                <Link to="/insights" className="text-primary hover:underline">
                  related payment system explanations
                </Link>.
              </p>
              <p>
                <Link 
                  to="/assessment?start=true"
                  replace 
                  className="text-primary hover:underline font-medium"
                >
                  Start a short assessment →
                </Link>
              </p>
            </div>
          </section>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground italic">
              This content is informational and explains general payment system behaviour. It does not provide legal or financial advice and does not represent any card network or payment provider.
            </p>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default VisaMastercardControl;
