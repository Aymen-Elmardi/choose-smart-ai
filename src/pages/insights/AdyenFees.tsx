import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
import { Source } from "@/components/SourcesCitation";

const sources: Source[] = [
  {
    name: "Adyen. How Pricing Works",
    url: "https://www.adyen.com/pricing",
    type: "official"
  },
  {
    name: "Adyen Documentation. Interchange and Scheme Fees",
    url: "https://docs.adyen.com/point-of-sale/pricing",
    type: "official"
  },
  {
    name: "Visa. Interchange Rates and Fees",
    url: "https://www.visa.co.uk/about-visa/visa-rules.html",
    type: "regulatory"
  },
  {
    name: "Mastercard. Interchange and Assessment Fees",
    url: "https://www.mastercard.com/global/en/business/support/interchange.html",
    type: "regulatory"
  },
  {
    name: "Adyen Investor Relations",
    url: "https://investors.adyen.com",
    type: "official"
  }
];

const faqs = [
  {
    question: "What are Adyen's fees?",
    answer: "Adyen uses interchange plus pricing. Your total cost is interchange (set by card networks) plus scheme fees plus Adyen's processing fee. Rates are individually negotiated based on volume, risk, geography, and business model. There is no flat published rate."
  },
  {
    question: "Is Adyen expensive?",
    answer: "Adyen is not expensive or cheap by default. For high-volume, multi-country businesses, Adyen's interchange plus model with local acquiring often delivers lower effective costs than blended pricing providers. For low-volume or early-stage businesses, simpler providers may be more cost-effective."
  },
  {
    question: "Does Adyen publish standard pricing?",
    answer: "No. Adyen prices each merchant individually based on processing volume, average transaction value, countries, chargeback history, and business model. Pricing is agreed after underwriting, not before."
  },
  {
    question: "How does Adyen pricing compare to Stripe?",
    answer: "Stripe uses blended flat-rate pricing (e.g. 1.5% + 20p for UK cards). Adyen uses interchange plus pricing negotiated per merchant. At higher volumes, Adyen's model often results in lower effective costs, but Stripe is simpler and faster to set up."
  },
  {
    question: "What is Adyen local acquiring?",
    answer: "Adyen can acquire transactions locally in many markets rather than routing everything through one country. This reduces interchange costs, cross-border fees, and decline rates, making it a key pricing advantage for global businesses."
  }
];

const AdyenFees = () => {
  return (
    <InsightsArticleLayout
      title="Adyen Pricing Explained: How Fees Really Work and When Adyen Is Worth It"
      description="A clear breakdown of Adyen's interchange plus pricing model, how fees are structured, what affects your rate, and when Adyen pricing makes sense compared to Stripe and other providers."
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug="adyen-pricing-explained"
      publishedTime="2026-02-09"
      modifiedTime="2026-02-09"
      keywords={[
        "adyen pricing",
        "adyen fees",
        "adyen costs",
        "adyen interchange plus",
        "adyen vs stripe pricing",
        "adyen local acquiring",
        "adyen processing fees",
        "enterprise payment pricing",
        "adyen payment gateway fees",
        "how much does adyen cost"
      ]}
      sources={sources}
    >
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        Adyen Pricing Explained: How Fees Really Work and When Adyen Is Worth It
      </h1>

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Adyen does not publish a simple price list. That is not an accident, and it does not mean Adyen is expensive.
      </p>

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Adyen prices payments very differently from providers like Stripe or PayPal. If you are evaluating Adyen, the real question is not "What are Adyen's fees?" but whether your business profile qualifies for Adyen's pricing model at all.
      </p>

      <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
        This guide explains how Adyen charges, what actually affects your fees, and when Adyen pricing makes sense compared to other enterprise payment providers.
      </p>

      {/* How Adyen Pricing Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Adyen pricing works at a high level
        </h2>
        <p className="mb-4">
          Adyen primarily uses an{" "}
          <Link to="/insights/pricing-models/interchange-plus-plus" className="text-primary hover:underline">interchange plus pricing model</Link>, not blended rates.
        </p>
        <p className="mb-4">
          That means your total cost per transaction is made up of three parts:
        </p>
        <div className="bg-muted/50 rounded-lg p-6 mb-4 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground">Interchange</h4>
            <p className="text-muted-foreground text-sm">The fee set by Visa or Mastercard and paid to the issuing bank.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Scheme fees</h4>
            <p className="text-muted-foreground text-sm">Network fees charged by Visa, Mastercard, or local card schemes.</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Adyen's processing fee</h4>
            <p className="text-muted-foreground text-sm">Adyen's margin for processing, risk management, and platform services.</p>
          </div>
        </div>
        <p className="mb-4">
          Adyen charges interchange and scheme fees at cost, then adds its own processing fee on top. There is no flat "2.9% + 30p" style rate.
        </p>
      </section>

      {/* Why Adyen Does Not Publish Fixed Rates */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why Adyen does not publish fixed rates
        </h2>
        <p className="mb-4">
          Adyen prices each merchant individually based on risk, volume, geography, and complexity.
        </p>
        <p className="mb-4">Factors that influence your Adyen pricing include:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Monthly and annual processing volume</li>
          <li>Average transaction value</li>
          <li>Countries where you acquire transactions</li>
          <li>Chargeback and fraud history</li>
          <li>Business model and industry</li>
          <li>Settlement currency requirements</li>
          <li>Whether you need local acquiring in multiple regions</li>
        </ul>
        <p className="mb-4">
          Two merchants using Adyen can pay very different effective rates even if they process similar volumes. This is why Adyen pricing discussions usually happen after underwriting, not before. Understanding how{" "}
          <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">payment provider risk models</Link> work helps explain why rates vary so widely.
        </p>

        <InlineAssessmentCTA
          context="Not sure what Adyen would actually charge your business? See how your risk profile affects pricing."
          cta="Get your risk profile"
        />
      </section>

      {/* Typical Fee Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Typical Adyen fee components you should expect
        </h2>
        <p className="mb-4">
          While Adyen does not publish fixed pricing, most merchants will see the following components on their statements:
        </p>

        <h3 className="text-xl font-medium text-foreground mt-6 mb-3">Processing fee</h3>
        <p className="mb-4">
          A per-transaction fee charged by Adyen, often expressed as a small percentage plus a fixed amount. This varies significantly by volume and risk profile.
        </p>

        <h3 className="text-xl font-medium text-foreground mt-6 mb-3">Interchange and scheme fees</h3>
        <p className="mb-4">
          Passed through at cost. These can fluctuate based on card type, region, and transaction method.
        </p>

        <h3 className="text-xl font-medium text-foreground mt-6 mb-3">Additional costs that often surprise merchants</h3>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Cross-border fees when cards are issued outside the acquiring region</li>
          <li>Currency conversion fees if settlement differs from transaction currency</li>
          <li>Risk and revenue optimisation tools if enabled</li>
          <li>Chargeback handling fees</li>
          <li>Optional local payment methods integration</li>
        </ul>
        <p>
          These are not hidden fees, but they are not always obvious during early sales conversations. For a broader look at how costs stack up, see our guide on the{" "}
          <Link to="/insights/crisis/hidden-fee-crisis" className="text-primary hover:underline">hidden fee crisis</Link> that affects many merchants.
        </p>
      </section>

      {/* Local Acquiring */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Local acquiring and why it matters for pricing
        </h2>
        <p className="mb-4">
          One of Adyen's biggest pricing advantages is local acquiring.
        </p>
        <p className="mb-4">
          Instead of routing all transactions through one country, Adyen can acquire transactions locally in many markets. This often reduces:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Interchange costs</li>
          <li>Cross-border fees</li>
          <li>Decline rates</li>
        </ul>
        <p className="mb-4">
          For global businesses, this can lower effective processing costs and improve authorisation rates at the same time. This is one of the main reasons large international brands choose Adyen even when the platform fee appears higher at first glance.
        </p>
        <p>
          To understand how Adyen's acquiring model compares to traditional bank-led infrastructure, see our comparison of{" "}
          <Link to="/insights/adyen-vs-first-data" className="text-primary hover:underline">Adyen vs First Data</Link>.
        </p>
      </section>

      {/* Volume Impact */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How volume impacts Adyen pricing
        </h2>
        <p className="mb-4">
          Adyen pricing becomes more attractive as volume increases. For lower volumes, the cost difference between Adyen and modern PSPs is often negligible or even higher. As volume scales, interchange plus pricing combined with local acquiring can become materially cheaper than{" "}
          <Link to="/insights/pricing-models/blended-vs-interchange" className="text-primary hover:underline">blended pricing</Link>.
        </p>
        <p className="mb-4">This is why Adyen is typically a better fit for:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Enterprise and upper mid-market merchants</li>
          <li>Multi-country businesses</li>
          <li>Platforms with high transaction counts</li>
          <li>Merchants sensitive to authorisation rates</li>
        </ul>
        <p>
          For small or early-stage businesses, Adyen pricing rarely delivers a clear advantage.
        </p>
      </section>

      {/* Comparison with Stripe and Checkout.com */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Adyen compares to Stripe and Checkout.com on pricing
        </h2>
        <p className="mb-4">
          Adyen, Stripe, and Checkout.com all serve large merchants, but their pricing philosophy differs.
        </p>
        <p className="mb-4">
          <Link to="/insights/stripe-fees-explained" className="text-primary hover:underline">Stripe</Link> defaults to blended pricing and adds platform fees for many features.{" "}
          <Link to="/insights/checkout-com-fees-explained" className="text-primary hover:underline">Checkout.com</Link> also negotiates pricing but operates more like a modern PSP with less infrastructure depth than Adyen.
        </p>
        <p className="mb-4">
          Adyen sits closer to the acquiring layer. Its pricing reflects that. The key difference is not "who is cheaper," but how fees scale as your business grows.
        </p>
        <p>
          Adyen rewards scale and operational maturity. Stripe rewards speed and ease of setup. For a full comparison of enterprise providers, see our{" "}
          <Link to="/insights/enterprise-provider-comparison" className="text-primary hover:underline">enterprise provider comparison</Link>.
        </p>
      </section>

      {/* When Adyen Makes Sense */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          When Adyen pricing makes sense
        </h2>
        <p className="mb-4">Adyen pricing usually makes sense if:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>You process high volumes consistently</li>
          <li>You operate across multiple countries</li>
          <li>You care about authorisation rates as much as fees</li>
          <li>You want interchange visibility rather than blended rates</li>
          <li>You have the operational capacity to manage enterprise onboarding</li>
        </ul>
        <p>
          If your business fits this profile, Adyen pricing can outperform simpler models over time.
        </p>
      </section>

      {/* When Adyen Is the Wrong Fit */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          When Adyen pricing is the wrong fit
        </h2>
        <p className="mb-4">Adyen is usually not the right choice if:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>You want transparent, published pricing</li>
          <li>You process low or inconsistent volumes</li>
          <li>You are early-stage or still experimenting</li>
          <li>You want fast self-serve onboarding</li>
          <li>You do not need local acquiring</li>
        </ul>
        <p>
          In these cases, blended pricing providers are often more predictable and easier to manage.
        </p>
      </section>

      {/* Negotiation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          The reality of negotiation with Adyen
        </h2>
        <p className="mb-4">
          Pricing with Adyen is always negotiated. That negotiation is influenced by your business profile, not just your bargaining skills. Presenting clean data, realistic forecasts, and a clear processing model matters more than pushing for headline rates.
        </p>
        <p>
          Many merchants approach Adyen too early or without understanding what drives pricing. That often leads to disappointing offers or rejection.
        </p>
      </section>

      {/* How to Know */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          The only reliable way to know your Adyen fees
        </h2>
        <p className="mb-4">
          There is no generic Adyen pricing calculator that will give you a meaningful answer. The only way to understand whether Adyen pricing works for your business is to go through pre-underwriting with the right context.
        </p>
        <p className="mb-4">
          That includes your volume, markets, risk profile, and operational setup.
        </p>
        <p>
          If you want to understand whether Adyen is likely to be cost-effective for your business,{" "}
          <Link to="/assessment" className="text-primary hover:underline font-medium">start with a short assessment</Link>. It helps identify whether Adyen pricing will work for you or whether another provider would be a better fit.
        </p>
      </section>

      {/* Key Takeaway */}
      <section className="mb-8 p-6 bg-muted/50 rounded-xl border border-border">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Key takeaway
        </h2>
        <p className="mb-4">
          Adyen pricing is not cheap or expensive by default. It is conditional.
        </p>
        <p className="mb-4">
          For the right businesses, it can deliver lower long-term costs and higher approval rates than blended pricing providers. For others, it adds complexity without clear benefit.
        </p>
        <p>
          Understanding that difference before you apply saves time, money, and unnecessary provider churn.
        </p>
      </section>
    </InsightsArticleLayout>
  );
};

export default AdyenFees;
