import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import { Link } from "react-router-dom";
import { Source } from "@/components/SourcesCitation";

const sources: Source[] = [
  {
    title: "European Banking Authority: Strong Customer Authentication",
    url: "https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/strong-customer-authentication-and-common-and-secure-open-standards-communication",
    publisher: "European Banking Authority"
  },
  {
    title: "UK Financial Conduct Authority: Strong Customer Authentication",
    url: "https://www.fca.org.uk/firms/strong-customer-authentication",
    publisher: "Financial Conduct Authority"
  },
  {
    title: "Visa: Strong Customer Authentication",
    url: "https://www.visa.co.uk/support/consumer/security/sca.html",
    publisher: "Visa"
  },
  {
    title: "Mastercard: SCA Guidance",
    url: "https://www.mastercard.co.uk/en-gb/business/overview/safety-and-security/strong-customer-authentication.html",
    publisher: "Mastercard"
  },
  {
    title: "Stripe: SCA and Exemptions",
    url: "https://stripe.com/docs/strong-customer-authentication",
    publisher: "Stripe"
  }
];

const LowValueTransactionExemption = () => {
  return (
    <InsightsArticleLayout
      title="Low Value Transaction (LVT) Exemption: How Small Payments Unlock Higher Approval Rates"
      description="Learn how the Low Value Transaction exemption under SCA rules can improve card approval rates, reduce checkout friction, and boost conversion for small purchases."
      category={{ name: "Explainers", slug: "explainer" }}
      cluster="hub"
      currentSlug="low-value-transaction-exemption"
      publishedTime="2026-02-04"
      keywords={[
        "low value transaction exemption",
        "LVT exemption",
        "SCA exemptions",
        "strong customer authentication",
        "payment approval rates",
        "checkout friction",
        "card authorisation",
        "PSD2 exemptions",
        "small payments",
        "mobile payments UK"
      ]}
      sources={sources}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Low Value Transaction (LVT) Exemption: How Small Payments Unlock Higher Approval Rates
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Most merchants focus on pricing, fraud tools, and checkout design when trying to improve payment performance. Very few look at something simpler and often more powerful: how small transactions are treated by banks under SCA rules.
      </p>

      <p className="mb-6">
        The Low Value Transaction exemption, usually shortened to LVT, is one of the most overlooked tools for improving card approval rates, especially for mobile, repeat, and impulse purchases.
      </p>

      <p className="mb-8">
        When used correctly, it can reduce checkout friction, increase authorisation rates, and quietly improve conversion without changing your product or pricing.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        What is the Low Value Transaction exemption?
      </h2>

      <p className="mb-6">
        Under Strong Customer Authentication rules in the UK and EU, most card payments require extra verification. This could be a banking app approval, a one time passcode, or biometric confirmation.
      </p>

      <p className="mb-6">
        The Low Value Transaction exemption allows banks to approve transactions of €30 or less without requiring that extra step.
      </p>

      <p className="mb-4">In practice, this means:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Faster checkouts</li>
        <li>Fewer interruptions</li>
        <li>Higher completion rates</li>
      </ul>

      <p className="mb-8">
        For merchants, it means fewer dropped payments and better approval outcomes, especially on mobile.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        The limits merchants need to understand
      </h2>

      <p className="mb-6">
        The exemption does not apply forever.
      </p>

      <p className="mb-4">
        Banks will allow low value transactions without authentication until one of the following happens:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Five consecutive low value transactions, or</li>
        <li>A total of €100 in cumulative spend since the last authenticated payment</li>
      </ul>

      <p className="mb-8">
        Once either limit is reached, the next transaction will require strong customer authentication. This reset happens automatically after the customer completes a fully authenticated payment.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        Why LVT matters for approval rates
      </h2>

      <p className="mb-6">
        From a bank's perspective, low value payments carry lower financial risk. From a customer's perspective, they feel instant.
      </p>

      <p className="mb-4">That combination leads to:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Higher approval rates on small purchases</li>
        <li>Less friction at checkout</li>
        <li>Better conversion on mobile and in app flows</li>
        <li>Fewer abandoned carts caused by authentication steps</li>
      </ul>

      <p className="mb-8">
        This is why digital goods, subscriptions with small entry prices, food delivery, transport apps, and gaming platforms often feel smoother than larger one off purchases.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        The problem most merchants do not realise
      </h2>

      <p className="mb-6">
        Many payment providers do not enable the Low Value Transaction exemption by default.
      </p>

      <p className="mb-4">In some cases:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>The provider applies SCA on every transaction regardless of amount</li>
        <li>The exemption is available but not activated in the account settings</li>
        <li>The provider routes transactions in a way that prevents the bank from applying LVT</li>
        <li>Fraud rules override the exemption even when risk is low</li>
      </ul>

      <p className="mb-8">
        This means merchants unknowingly lose approvals they should have received. Two businesses selling the same product at the same price can see very different approval rates purely because of how their provider handles exemptions.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        When LVT delivers the biggest gains
      </h2>

      <p className="mb-4">The exemption is especially valuable for:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Mobile first businesses</li>
        <li>Digital products and downloads</li>
        <li>Food delivery and quick commerce</li>
        <li>In app purchases</li>
        <li>Entry level subscriptions</li>
        <li>Repeat customers making small payments</li>
        <li>International cardholders unfamiliar with your brand</li>
      </ul>

      <p className="mb-8">
        If your average transaction value sits under or near €30, this exemption can materially affect your revenue.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        LVT vs TRA and wallets
      </h2>

      <p className="mb-6">
        Low Value Transaction is not the only way to reduce authentication friction.
      </p>

      <p className="mb-4">Banks may also approve payments using:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Transaction Risk Analysis, based on fraud rates</li>
        <li>Wallet based authentication such as Apple Pay or Google Pay</li>
      </ul>

      <p className="mb-4">The difference is important:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>LVT is amount based</li>
        <li>TRA is risk and provider performance based</li>
        <li>Wallets rely on device level authentication</li>
      </ul>

      <p className="mb-8">
        Good payment providers combine these intelligently instead of forcing one rule across all payments.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        What merchants should ask their provider
      </h2>

      <p className="mb-4">If you want to benefit from LVT, ask direct questions:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Is the Low Value Transaction exemption enabled on my account?</li>
        <li>Do you automatically pass exemption requests to the issuing bank?</li>
        <li>Are exemptions overridden by default fraud rules?</li>
        <li>How do you handle cumulative limits and resets?</li>
        <li>Can you show approval rates split by transaction amount?</li>
      </ul>

      <p className="mb-8">
        If a provider cannot answer these clearly, that is already a signal.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        Why this affects provider choice
      </h2>

      <p className="mb-6">
        Some providers are conservative by default. Others optimise for approval and conversion.
      </p>

      <p className="mb-4">Choosing a provider that understands how exemptions work in practice can:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Improve authorisation rates without increasing fraud</li>
        <li>Reduce checkout friction without extra development</li>
        <li>Help you scale small transactions more profitably</li>
      </ul>

      <p className="mb-8">
        This is especially important for growing businesses where small improvements compound quickly.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        How to know if this applies to your business
      </h2>

      <p className="mb-4">The only way to know whether LVT is helping or hurting you is to look at:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Transaction sizes</li>
        <li>Approval rates by amount</li>
        <li>Drop off points at checkout</li>
        <li>How your provider applies SCA exemptions</li>
      </ul>

      <p className="mb-8">
        If you are unsure how your current setup handles low value transactions, or whether your provider is optimising exemptions correctly, a short{" "}
        <Link to="/quiz" className="text-primary hover:underline font-medium">
          payment assessment
        </Link>{" "}
        can help you understand which providers are more likely to support your business model.
      </p>

      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        Final thought
      </h2>

      <p className="mb-6">
        Low value payments are not low impact.
      </p>

      <p className="mb-8">
        For many businesses, they are the difference between a smooth checkout and a lost customer. The Low Value Transaction exemption exists to reduce friction, but it only works when your payment provider uses it correctly.
      </p>

      <p className="mb-8">
        Understanding this is not about compliance. It is about choosing infrastructure that works with banks, not against them.
      </p>
    </InsightsArticleLayout>
  );
};

export default LowValueTransactionExemption;
