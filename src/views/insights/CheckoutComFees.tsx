'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
import { Source } from "@/components/SourcesCitation";

const faqs = [
  {
    question: "Does Checkout.com publish standard pricing?",
    answer: "No. Checkout.com uses negotiated pricing based on your business model, transaction volume, countries supported, industry risk profile, and chargeback history. Rates are agreed during onboarding."
  },
  {
    question: "What are Checkout.com's typical card processing fees?",
    answer: "Checkout.com fees include three components: interchange fees set by card networks, scheme fees charged by Visa and Mastercard, and a negotiated Checkout.com markup. Effective rates depend on your volume and profile."
  },
  {
    question: "Does Checkout.com charge for chargebacks?",
    answer: "Yes. Like all card processors, Checkout.com charges a fee per chargeback. The exact amount is part of your negotiated agreement and typically aligns with industry norms."
  },
  {
    question: "Is Checkout.com more expensive than Stripe?",
    answer: "At low volumes, Checkout.com may appear more expensive than flat-rate providers like Stripe. However, for medium and large enterprises with global transactions, Checkout.com's negotiated pricing often results in lower effective costs."
  },
  {
    question: "Who is Checkout.com best suited for?",
    answer: "Checkout.com is ideal for businesses with substantial monthly volumes, international transactions, complex business models like marketplaces or subscriptions, and those needing local acquiring in multiple regions."
  }
];

const sources: Source[] = [
  {
    name: "Checkout.com and Spotify Strategic Partnership Announcement",
    url: "https://www.checkout.com/newsroom/checkout-com-announces-strategic-partnership-with-spotify-to-power-efficient-scalable-payments-globally",
    type: "official"
  },
  {
    name: "Checkout.com Documentation and Pricing Approach",
    url: "https://www.checkout.com/docs",
    type: "official"
  },
  {
    name: "Modern Payments Institute: Enterprise Payment Pricing Report",
    url: "https://www.modernpaymentsinstitute.org/reports/enterprise-payment-pricing",
    type: "industry"
  }
];

const CheckoutComFees = () => {
  return (
    <InsightsArticleLayout
      title="Checkout.com Fees: Is It Worth It for Your Business?"
      description="Checkout.com pricing breakdown: processing fees, international costs, chargebacks. See how it compares to Stripe and Adyen for enterprise rates."
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug="checkout-com-fees-explained"
      publishedTime="2026-02-09"
      modifiedTime="2026-02-09"
      keywords={[
        "Checkout.com fees",
        "Checkout.com pricing",
        "Checkout.com vs Stripe",
        "enterprise payment processing fees",
        "negotiated payment rates",
        "Checkout.com UK",
        "payment processing costs",
        "interchange plus pricing"
      ]}
      sources={sources}
    >
      <FAQSchema faqs={faqs} />
      
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Checkout.com Fees Explained: What Businesses Actually Pay
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Checkout.com is widely regarded as one of the most capable payment infrastructure providers for fast growing and enterprise businesses. Unlike providers that publish clear pricing on their websites, Checkout.com uses negotiated pricing, meaning fees depend on your business model, transaction volume, and global footprint.
      </p>

      <p className="text-muted-foreground mb-10">
        This guide explains Checkout.com's fees in plain English, including how they compare with other providers and when this platform makes financial sense for your business.
      </p>

      {/* Does Checkout.com publish standard pricing? */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Does Checkout.com publish standard pricing?
        </h2>
        <p className="text-muted-foreground mb-4">
          No. Checkout.com does not display flat rate pricing publicly like Stripe, PayPal, or some smaller processors.
        </p>
        <p className="text-muted-foreground mb-4">
          Instead, pricing is agreed during onboarding based on factors that include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Monthly processing volume</li>
          <li>Average transaction size</li>
          <li>Countries and currencies supported</li>
          <li>Industry risk profile</li>
          <li>Chargeback and fraud history</li>
          <li>Payout requirements</li>
        </ul>
        <p className="text-muted-foreground">
          Because rates are negotiated, it can be hard for a merchant to know what they will pay before talking to a sales representative. That is both a strength and a challenge.
        </p>
      </section>

      {/* Typical card processing fees */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Typical card processing fees
        </h2>
        <p className="text-muted-foreground mb-4">
          Although Checkout.com does not list standard fees, most agreements include these three components:
        </p>
        <div className="bg-muted/50 rounded-lg p-6 mb-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground">Interchange</h4>
              <p className="text-muted-foreground text-sm">These are fees set by card networks like Visa and Mastercard and vary by card type and region.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Scheme fees</h4>
              <p className="text-muted-foreground text-sm">Fees charged by the card networks themselves.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Checkout.com markup</h4>
              <p className="text-muted-foreground text-sm">The negotiated margin that applies on top of interchange and scheme costs.</p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">
          For established businesses with meaningful volume, this pricing approach often results in effective rates that are lower than flat rate competitors when looked at holistically. This structure is similar to{" "}
          <Link to="/insights/pricing/interchange-plus-plus" className="text-primary hover:underline">
            interchange plus plus pricing
          </Link>, which separates each cost component for transparency.
        </p>

        <InlineAssessmentCTA
          context="Find out if Checkout.com's pricing model would work for your business volume and geography."
          cta="Get your risk profile"
        />
      </section>

      {/* International and multi-currency fees */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          International and multi currency fees
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com was built for global commerce.
        </p>
        <p className="text-muted-foreground mb-4">
          It offers:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Accepting cards in many countries without local entity setup</li>
          <li>Multi currency settlement</li>
          <li>Local acquiring in select regions to reduce cross border charges</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          However, currency conversion and cross border transactions still incur costs, especially if your settlement currency is different from the card currency.
        </p>
        <p className="text-muted-foreground">
          These fees are typically included in the negotiated rate, not visible as simple line item costs. For businesses expanding internationally, understanding{" "}
          <Link to="/insights/international-sales" className="text-primary hover:underline">
            how international sales affect payment costs
          </Link>{" "}
          is essential.
        </p>
      </section>

      {/* Payout and settlement structure */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Payout and settlement structure
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com provides flexible settlement options, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Daily settlement</li>
          <li>Local currency settlement in supported countries</li>
          <li>Multiple payout destinations</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Unlike some payment platforms that charge visible per payout fees when using instant or accelerated payout features, Checkout.com often bundles payout flexibility into the broader commercial agreement rather than charging a simple per payout percentage.
        </p>
        <p className="text-muted-foreground">
          This tends to be more cost effective for medium and large enterprises, but it does require serious underwriting upfront. Learn more about{" "}
          <Link to="/insights/same-day-settlement-instant-payouts" className="text-primary hover:underline">
            same day settlement and instant payouts
          </Link>{" "}
          to understand how payout speed affects your cash flow.
        </p>
      </section>

      {/* Chargebacks and dispute handling */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Chargebacks and dispute handling
        </h2>
        <p className="text-muted-foreground mb-4">
          Like all card processors, Checkout.com charges a fee per chargeback, usually aligned with industry norms. The exact fee will be part of your negotiated agreement.
        </p>
        <p className="text-muted-foreground mb-4">
          What sets Checkout.com apart is the tooling and insight they provide around disputes, which can help larger merchants reduce total chargeback costs over time.
        </p>
        <p className="text-muted-foreground">
          Good dispute management and visibility into trends matter when chargebacks become a repeat operational cost. See our{" "}
          <Link to="/insights/chargebacks" className="text-primary hover:underline">
            complete guide to chargebacks
          </Link>{" "}
          for strategies to reduce dispute rates.
        </p>
      </section>

      {/* Advanced tools and optional features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Advanced tools and optional features
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com includes basic fraud detection, but many merchants opt for upgraded features such as:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Enhanced fraud rulesets</li>
          <li>Tokenization and secure data storage</li>
          <li>3D Secure optimization tools</li>
          <li>Custom reporting and reconciliation dashboards</li>
        </ul>
        <p className="text-muted-foreground">
          These features are usually priced separately or folded into higher tier commercial terms. For businesses that process high volumes or operate in regulated markets, these tools can improve authorization rates and reduce fraud losses, even if they add to nominal processing costs. Understanding{" "}
          <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">
            how payment providers assess risk
          </Link>{" "}
          helps you evaluate which features matter most.
        </p>
      </section>

      {/* Why Checkout.com can feel expensive early */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why Checkout.com can feel expensive early
        </h2>
        <p className="text-muted-foreground mb-4">
          Because pricing is negotiated, initial conversations can make Checkout.com appear more expensive than fixed rate providers.
        </p>
        <p className="text-muted-foreground mb-4">
          There are a few reasons for that:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Checkout.com assumes high service expectations</li>
          <li>It targets merchants who need scale and global reach</li>
          <li>It prices based on long term volume and risk, not early stage simplicity</li>
        </ul>
        <p className="text-muted-foreground">
          For smaller businesses just starting out, a flat rate provider may look cheaper. But once your business grows or goes global, Checkout.com's model can deliver a more efficient cost structure in practice.
        </p>
      </section>

      {/* Checkout.com's global credibility in action */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Checkout.com's global credibility in action
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com's ability to handle very high volumes and complex global requirements is not theoretical. In a major strategic move, Checkout.com was chosen by Spotify to power payments for a global user base of over 700 million monthly active users and more than 280 million paying subscribers across more than 180 countries.
        </p>
        <p className="text-muted-foreground mb-4">
          This partnership demonstrates Checkout.com's real world capabilities at enterprise scale, including handling massive subscription volumes, multi currency settlement, and optimization across global card networks.
        </p>
        <p className="text-muted-foreground">
          For merchants with international ambitions, this kind of scale and performance is a key part of why providers like Checkout.com are considered. For a deeper look at enterprise platforms, see our{" "}
          <Link to="/insights/provider/checkout-com-enterprise-platform" className="text-primary hover:underline">
            Checkout.com enterprise platform analysis
          </Link>.
        </p>
      </section>

      {/* Checkout.com vs flat-rate providers */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Checkout.com vs flat rate providers
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com is usually more expensive than flat rate pricing at low volumes.
        </p>
        <p className="text-muted-foreground mb-4">
          It becomes more cost effective when:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Monthly volumes are substantial</li>
          <li>International transactions are a big part of the business</li>
          <li>Chargebacks and fraud costs matter</li>
          <li>You need strong settlement flexibility</li>
          <li>You want local acquiring in multiple regions</li>
        </ul>
        <p className="text-muted-foreground">
          In these scenarios, the effective rate paid after negotiation can be lower than alternative providers, even if the headline price is not visible up front. Compare this with{" "}
          <Link to="/insights/stripe-fees-explained" className="text-primary hover:underline">
            Stripe's transparent pricing model
          </Link>{" "}
          to understand the tradeoffs.
        </p>
      </section>

      {/* How to determine if Checkout.com pricing fits your business */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How to determine if Checkout.com pricing fits your business
        </h2>
        <p className="text-muted-foreground mb-4">
          There is no universal answer. To know whether Checkout.com makes sense for you, you need to consider:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Your monthly processing volume today and in the next 12 months</li>
          <li>Whether your customers are global or local</li>
          <li>How important local acquiring or multi currency settlement is</li>
          <li>Whether payouts and settlement timing matter to your cash flow</li>
          <li>Your chargeback and dispute history</li>
          <li>The complexity of your business model (marketplace, subscription, travel, etc.)</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Comparing pricing without understanding your business profile is misleading. The same merchant could pay very different effective costs with different providers because pricing depends on how likely the provider thinks you are to succeed without fraud, disputes, or risk.
        </p>
        <p className="text-muted-foreground">
          If you want clarity before committing, a{" "}
          <Link to="/assessment" className="text-primary hover:underline">
            short assessment
          </Link>{" "}
          can help identify which providers and pricing models are most likely to suit your business and minimize your effective processing costs.
        </p>
      </section>

      {/* Key takeaway */}
      <section className="mb-10 bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          Key takeaway
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com does not compete on simplicity. It competes on scale, performance, and global capability.
        </p>
        <p className="text-muted-foreground mb-4">
          For small businesses, flat rate or more transparent pricing might feel easier and cheaper. For medium and large enterprises processing globally, Checkout.com's negotiated pricing and enterprise tools can deliver lower real costs and better performance over time.
        </p>
        <p className="text-muted-foreground">
          Understanding not just the fees but the context behind them is critical to choosing the right payments partner for where your business is now and where it plans to be.
        </p>
      </section>
    </InsightsArticleLayout>
  );
};

export default CheckoutComFees;
