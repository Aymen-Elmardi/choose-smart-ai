import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import SourcesCitation from "@/components/SourcesCitation";

const visaMastercardSources = [
  { name: "Visa Core Rules and Visa Product and Service Rules", url: "https://usa.visa.com/dam/VCOM/download/about-visa/visa-rules-public.pdf", type: "official" as const },
  { name: "Mastercard Rules Manual", url: "https://www.mastercard.us/en-us/business/overview/support/rules.html", type: "official" as const },
  { name: "Bank of England – Payment Systems", url: "https://www.bankofengland.co.uk/payment-and-settlement", type: "regulatory" as const }
];

const VisaMastercardControl = () => {
  return (
    <InsightsArticleLayout
      title="Visa and Mastercard Control Card Payments. What Businesses Can and Cannot Do"
      description="Learn how Visa and Mastercard control the card payment system, why even large providers must follow their rules, and what UK and EU businesses can realistically do."
      category={{ name: "Payment Risk", slug: "payment-risk" }}
      cluster="hub"
      currentSlug="visa-mastercard-control"
      keywords={["Visa", "Mastercard", "card networks", "payment rules"]}
      sources={visaMastercardSources}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Visa and Mastercard Control Card Payments. What Businesses Can and Cannot Do
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          If you accept card payments, your business operates inside a system you do not control.
        </p>
        <p>
          This often becomes visible only when something changes. A review request appears. An account is restricted. A payment provider asks questions you did not expect.
        </p>
        <p>
          This is not usually about your provider making a sudden decision. It is about how the global card system is structured.
        </p>
        <p>
          This page explains why Visa and Mastercard sit at the centre of card payments, what power they actually have, and what businesses can realistically do within that system.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Visa and Mastercard Are the Rails, Not the Trains
        </h2>
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

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Why Even Large Payment Providers Cannot Override This
        </h2>
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

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          The Only Decision That Actually Changes Outcomes
        </h2>
        <p>
          There are many things businesses cannot influence.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You cannot change Visa and Mastercard rules.</li>
          <li>You cannot stop periodic reviews.</li>
          <li>You cannot prevent risk checks when your profile changes.</li>
        </ul>
        <p>
          What you can influence is alignment.
        </p>
        <p>Specifically:</p>
        <ul className="list-disc pl-6 space-y-2">
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

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Why Problems Appear After Success, Not Before
        </h2>
        <p>
          Most reviews happen after something changes.
        </p>
        <p>Common triggers include:</p>
        <ul className="list-disc pl-6 space-y-2">
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

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Why Switching Providers Does Not Reset the System
        </h2>
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

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What This Means in Practice
        </h2>
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

      <footer className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground italic">
          This content is informational and explains general payment system behaviour. It does not provide legal or financial advice and does not represent any card network or payment provider.
        </p>
      </footer>
    </InsightsArticleLayout>
  );
};

export default VisaMastercardControl;
