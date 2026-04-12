import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import { Source } from "@/components/SourcesCitation";

const sources: Source[] = [
  {
    name: "Apple Pay Security and Privacy Overview",
    url: "https://support.apple.com/en-gb/HT203027",
    type: "official",
  },
  {
    name: "Google Pay Security and Tokenisation",
    url: "https://payments.google.com/payments/apis-secure/u/0/docs/overview",
    type: "official",
  },
  {
    name: "Visa Token Service",
    url: "https://www.visa.co.uk/pay-with-visa/visa-token-service.html",
    type: "industry",
  },
  {
    name: "Mastercard Digital Enablement Service",
    url: "https://www.mastercard.co.uk/en-gb/business/overview/digital-payments.html",
    type: "industry",
  },
  {
    name: "UK Finance Card and Wallet Payments Overview",
    url: "https://www.ukfinance.org.uk",
    type: "industry",
  },
];

const ApplePayGooglePayExplained = () => {
  return (
    <InsightsArticleLayout
      title="Apple Pay & Google Pay: Merchant Guide 2026"
      description="Apple Pay and Google Pay reduce chargebacks and improve payment provider approval. See how digital wallets help merchants get approved and increase conversion."
      category={{ name: "Explainers", slug: "explainer" }}
      cluster="hub"
      currentSlug="apple-pay-google-pay-explained"
      publishedTime="2026-02-04"
      modifiedTime="2026-02-04"
      keywords={[
        "Apple Pay",
        "Google Pay",
        "digital wallets",
        "mobile payments",
        "tokenisation",
        "checkout conversion",
        "payment security",
        "chargeback reduction",
        "UK payments",
      ]}
      sources={sources}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Apple Pay and Google Pay Explained: Faster Checkout, Lower Risk, Higher Approval Rates
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Apple Pay and Google Pay are often treated as simple convenience features. A nice to have. A logo at checkout.
      </p>

      <p className="mb-6">
        In reality, they change how transactions are authenticated, how fraud is assessed, and how payment providers view your business.
      </p>

      <p className="mb-8">
        For growing businesses, especially those facing approval reviews, chargebacks, or declining conversion rates, Apple Pay and Google Pay can materially improve outcomes when used correctly.
      </p>

      <p className="mb-12">
        This article explains what they actually do behind the scenes, why providers like them, and when they make sense as part of a serious payment strategy.
      </p>

      {/* What Apple Pay and Google Pay really are */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What Apple Pay and Google Pay really are
        </h2>

        <p className="mb-4">
          Despite the branding, Apple Pay and Google Pay are not separate payment networks.
        </p>

        <p className="mb-4">
          They are digital wallets that sit on top of existing card schemes like Visa and Mastercard, but with a very different security and authentication model.
        </p>

        <p className="mb-4">When a customer pays using Apple Pay or Google Pay:</p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>The real card number is never shared with the merchant</li>
          <li>A device specific token is used instead of card details</li>
          <li>The customer authenticates using biometrics or device security</li>
          <li>The transaction is cryptographically signed by the device</li>
        </ul>

        <p className="mb-4">
          From a fraud and risk perspective, this is a fundamentally stronger transaction than a standard card payment.
        </p>
      </section>

      {/* Why payment providers trust wallet payments more */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why payment providers trust wallet payments more
        </h2>

        <p className="mb-6">
          Payment providers care about three things above all else: fraud, disputes, and predictability.
        </p>

        <p className="mb-6">Apple Pay and Google Pay score well on all three.</p>

        <h3 className="text-xl font-medium text-foreground mb-3">
          1. Tokenisation removes card exposure
        </h3>

        <p className="mb-4">
          With wallet payments, merchants never see or store the actual card number. This removes entire classes of card data compromise risk.
        </p>

        <p className="mb-4">
          If your systems are breached, there is no usable card data to steal.
        </p>

        <p className="mb-6">
          This dramatically reduces fraud exposure for both the merchant and the provider.
        </p>

        <h3 className="text-xl font-medium text-foreground mb-3">
          2. Strong customer authentication is built in
        </h3>

        <p className="mb-4">
          Apple Pay and Google Pay require the customer to authenticate using Face ID, Touch ID, fingerprint, PIN, or device unlock.
        </p>

        <p className="mb-4">
          This is stronger than most card transactions and often stronger than basic 3D Secure flows.
        </p>

        <p className="mb-6">
          From the provider's point of view, this reduces disputed transactions where customers claim they did not authorise the payment.
        </p>

        <h3 className="text-xl font-medium text-foreground mb-3">
          3. Lower chargeback rates in practice
        </h3>

        <p className="mb-4">
          Wallet based transactions consistently show lower chargeback rates than manual card entry.
        </p>

        <p className="mb-4">
          Customers recognise the payment, remember approving it on their device, and are less likely to dispute it later.
        </p>

        <p className="mb-4">
          For providers monitoring chargeback thresholds, this matters.
        </p>
      </section>

      {/* The impact on checkout conversion */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          The impact on checkout conversion
        </h2>

        <p className="mb-4">
          Beyond risk, Apple Pay and Google Pay also improve conversion, especially on mobile.
        </p>

        <p className="mb-4">They reduce friction by:</p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Removing manual card entry</li>
          <li>Skipping billing address typing</li>
          <li>Using familiar device flows</li>
          <li>Completing checkout in seconds</li>
        </ul>

        <p className="mb-4">
          For mobile first businesses, the difference is often measurable.
        </p>

        <p className="mb-4">
          Faster checkout leads to fewer abandoned carts and higher completed transactions, which also improves how providers view your processing stability over time.
        </p>
      </section>

      {/* How Apple Pay and Google Pay affect approval decisions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Apple Pay and Google Pay affect approval decisions
        </h2>

        <p className="mb-4">
          While wallets do not guarantee approval, they influence how your risk profile is assessed.
        </p>

        <p className="mb-4">Businesses that offer Apple Pay or Google Pay often show:</p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Lower fraud rates</li>
          <li>Lower dispute rates</li>
          <li>More consistent transaction patterns</li>
          <li>Better customer authentication</li>
        </ul>

        <p className="mb-4">
          This can make reviews smoother, especially during growth or volume increases.
        </p>

        <p className="mb-4">
          For some businesses that struggle with card only setups, adding wallet payments helps stabilise metrics enough to avoid restrictions or reserves.
        </p>
      </section>

      {/* Where Apple Pay and Google Pay work best */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Where Apple Pay and Google Pay work best
        </h2>

        <p className="mb-4">Wallet payments tend to perform best when:</p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Your customers are mobile heavy</li>
          <li>Your audience uses modern smartphones</li>
          <li>You sell digital or instant delivery products</li>
          <li>You operate in the UK, EU, US, or Australia</li>
          <li>You want to reduce chargebacks without adding friction</li>
        </ul>

        <p className="mb-4">
          They are particularly effective for ecommerce, subscriptions at signup, marketplaces, and services where customers pay themselves rather than delegating payments.
        </p>
      </section>

      {/* Where they add less value */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Where they add less value
        </h2>

        <p className="mb-4">Wallets are not universal solutions.</p>

        <p className="mb-4">They are less impactful when:</p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Your customers are primarily desktop based</li>
          <li>You operate in regions with low wallet adoption</li>
          <li>Your average order value is extremely high and requires manual review</li>
          <li>You rely on recurring off session billing without reauthentication</li>
        </ul>

        <p className="mb-4">
          In those cases, wallets still help, but they are not the primary driver.
        </p>
      </section>

      {/* Apple Pay and Google Pay vs traditional card payments */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Apple Pay and Google Pay vs traditional card payments
        </h2>

        <p className="mb-4">
          From the outside, they look similar. Under the hood, they are not.
        </p>

        <p className="mb-4">
          Traditional card payments rely heavily on static data and post transaction dispute processes.
        </p>

        <p className="mb-4">
          Wallet payments rely on real time device authentication and tokenisation.
        </p>

        <p className="mb-4">
          This is why providers often see wallet heavy merchants as safer, even when transaction volume grows quickly.
        </p>
      </section>

      {/* A note on fees and cost */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          A note on fees and cost
        </h2>

        <p className="mb-4">
          Apple Pay and Google Pay do not usually add extra fees on top of card processing.
        </p>

        <p className="mb-4">
          They run at standard card rates, but often reduce indirect costs by lowering fraud losses, chargeback fees, and support overhead.
        </p>

        <p className="mb-4">
          For many businesses, the net cost is lower even if the headline rate is the same.
        </p>
      </section>

      {/* How to think about wallets as part of your setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How to think about wallets as part of your setup
        </h2>

        <p className="mb-4">
          Apple Pay and Google Pay are not cosmetic features.
        </p>

        <p className="mb-4">
          They are risk control tools disguised as convenience.
        </p>

        <p className="mb-4">For growing businesses, they help with:</p>

        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Approval stability</li>
          <li>Chargeback reduction</li>
          <li>Mobile conversion</li>
          <li>Provider confidence</li>
        </ul>

        <p className="mb-4">
          They work best when combined with the right underlying payment provider and risk posture.
        </p>

        <p className="mb-4">
          If you are choosing a payment provider or reassessing your current setup, understanding how wallet payments fit your business model can materially change the outcome.
        </p>

        <p className="mb-4">
          If you want to see which providers support Apple Pay and Google Pay properly for your business type, you can start a short assessment. It helps surface options that align with your risk profile rather than just brand recognition.
        </p>
      </section>
    </InsightsArticleLayout>
  );
};

export default ApplePayGooglePayExplained;
