'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { BOOKING_URL } from "@/lib/booking";
import { Source } from "@/components/SourcesCitation";

const faqs = [
  {
    question: "Does Checkout.com publish its pricing publicly?",
    answer: "No. Checkout.com does not publish standard pricing. All fees are negotiated during onboarding based on your processing volume, geography, industry risk profile, and chargeback history. You will not find a public rate card on their website. The only way to get accurate pricing is to speak directly with their sales team."
  },
  {
    question: "How does Checkout.com pricing work?",
    answer: "Checkout.com uses an interchange-plus-plus (IC++) model. You pay three separate components: interchange fees set by card networks like Visa and Mastercard, scheme fees charged by those same networks, and a negotiated Checkout.com markup on top. The markup is what varies by merchant and is the component you negotiate during onboarding."
  },
  {
    question: "Is Checkout.com more expensive than Stripe?",
    answer: "It depends on your volume and business model. At low volumes, Stripe's transparent flat rate is typically simpler and appears cheaper. At scale, particularly for merchants processing over 1 million GBP per month with significant international volume, Checkout.com's negotiated IC++ rates can result in a lower effective cost. The comparison depends on your card mix, geography, and transaction profile."
  },
  {
    question: "What types of businesses does Checkout.com work best for?",
    answer: "Checkout.com is designed for enterprise and high-growth merchants in fintech, ecommerce, travel, and SaaS. It works best for businesses with meaningful monthly processing volume, significant international transactions, or complex settlement requirements. It is not the right fit for small businesses or those looking for a simple, plug-and-play solution."
  },
  {
    question: "Can small businesses use Checkout.com?",
    answer: "Checkout.com does not typically onboard early-stage or low-volume businesses. The platform's value of negotiated pricing, global acquiring, and enterprise tooling only becomes cost-effective at scale. Small businesses are generally better served by flat-rate providers like Stripe, Square, or Revolut Business, which offer simple pricing and fast setup without complex underwriting requirements."
  },
  {
    question: "What payment methods does Checkout.com support?",
    answer: "Checkout.com supports Visa, Mastercard, American Express, Maestro, Apple Pay, Google Pay, SEPA Direct Debit (EU), Bacs Direct Debit (UK), and a wide range of local payment methods including iDEAL, Bancontact, Giropay, Klarna, and others depending on your contracted markets. Specific checkout payment options are agreed during onboarding."
  },
  {
    question: "What are ECOMM_SMALL_EEA or ECOMM_MEDIUM_EEA charges on my statement?",
    answer: "These are Visa scheme fee billing categories, not Checkout.com charges. ECOMM_SMALL_EEA and ECOMM_MEDIUM_EEA classify your e-commerce transactions by volume tier within the European Economic Area. They appear on your statement because Checkout.com passes through scheme fees transparently under the IC++ model. All processors operating in the EEA apply these categories. Checkout.com simply makes them visible."
  },
  {
    question: "What does \"oversized\" mean on a Checkout.com invoice?",
    answer: "An oversized fee is a scheme-level surcharge triggered when a transaction or transaction batch exceeds the standard size threshold for its billing category. These are Visa or Mastercard charges, not Checkout.com charges, passed through transparently. Common causes include a high average transaction value relative to your MCC category norm, or a billing category mismatch."
  },
  {
    question: "What is the Checkout.com payment gateway pricing model?",
    answer: "Checkout.com's payment gateway pricing uses an interchange-plus-plus (IC++) structure. You pay interchange fees set by card networks, scheme fees charged by those networks directly, and a negotiated Checkout.com markup on top. The markup is the only component you negotiate. For high-volume merchants, this model typically delivers lower effective rates than flat-rate providers because you benefit when cheaper card types such as debit cards make up a larger share of your transaction mix."
  },
  {
    question: "What does an oversized checkout.com EEA charge mean on my statement?",
    answer: "An oversized checkout.com EEA charge is a scheme-level surcharge applied by Visa or Mastercard when a transaction or batch exceeds a size threshold for its EEA billing category. These surcharges are set by the card networks and passed through transparently under interchange-plus-plus pricing. They are most common when your average transaction value is high relative to your category norm. This applies equally to Visa, Mastercard, and American Express transactions processed within the EEA."
  },
  {
    question: "Does Checkout.com pricing differ for UK merchants versus EEA merchants after Brexit?",
    answer: "Yes. Since Brexit, UK-issued cards are no longer classified as EEA cards. When UK-issued cards are used in EEA transactions, or EEA-issued cards in UK transactions, these are treated as cross-border transactions and attract higher scheme and interchange fees. Checkout.com offers local acquiring in both the UK and EU, which can substantially reduce these costs for merchants with significant cross-border customer volumes. This is a material cost point worth raising explicitly during contract negotiation."
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
      title="Checkout.com Fees and Pricing (2026): What Businesses Actually Pay"
      description="Checkout.com does not publish standard pricing. This guide covers what businesses actually pay in 2026, with indicative rates from 0.2% to 1.8%, payment gateway pricing, EEA billing codes, oversized charges, and UK post-Brexit costs explained."
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug="checkout-com-fees-explained"
      publishedTime="2026-02-09"
      modifiedTime="2026-06-12"
      keywords={[
        "Checkout.com fees",
        "Checkout.com pricing",
        "checkout.com processing fees",
        "checkout payment gateway pricing",
        "checkout.com vs Stripe",
        "interchange plus plus pricing"
      ]}
      sources={sources}
      breadcrumbSchemaItems={[
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" },
        { name: "Checkout.com Fees Explained", url: "/insights/checkout-com-fees-explained" },
      ]}
    >
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Checkout.com Pricing and Fees Explained: What Businesses Actually Pay in 2026
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Checkout.com is widely regarded as one of the most capable payment infrastructure providers for fast-growing and enterprise businesses. Unlike providers that publish clear pricing on their websites, Checkout.com uses negotiated pricing, meaning fees depend on your business model, transaction volume, and global footprint.
      </p>

      <p className="text-muted-foreground mb-4">
        This guide explains Checkout.com fees in plain English for 2026, including indicative cost ranges, how pricing compares with Stripe and Adyen, and when this platform makes financial sense for your business.
      </p>

      <p className="text-sm text-muted-foreground italic mb-12">
        Last updated: June 2026
      </p>

      {/* Does Checkout.com publish standard pricing? */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Does Checkout.com Publish Standard Pricing?
        </h2>
        <p className="text-muted-foreground mb-4">
          No. Checkout.com does not display flat-rate pricing publicly like Stripe, PayPal, or some smaller processors.
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

      {/* How pricing works: IC++ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Checkout.com Pricing Works: The Interchange-Plus-Plus Model
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com's payment gateway pricing follows an interchange-plus-plus structure. Rather than a flat rate, the checkout.com pricing model breaks down into three separate components that appear on your statement:
        </p>
        <div className="bg-muted/50 rounded-lg p-6 mb-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground">Interchange</h4>
              <p className="text-muted-foreground text-sm">Fees set by card networks like Visa and Mastercard. These vary by card type, region, and merchant category code.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Scheme fees</h4>
              <p className="text-muted-foreground text-sm">Fees charged directly by the card networks themselves, separate from interchange.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Checkout.com markup</h4>
              <p className="text-muted-foreground text-sm">The negotiated margin that applies on top of interchange and scheme costs. This is the component that varies by merchant.</p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground">
          This structure is known as interchange-plus-plus (IC++) pricing. It separates each cost component for transparency, which means merchants can see exactly what they are paying and to whom. For established businesses with meaningful volume, this pricing approach often results in effective rates that are lower than flat-rate competitors when looked at holistically. This is similar to{" "}
          <Link to="/insights/pricing-models/interchange-plus-plus" className="text-primary hover:underline">interchange plus plus pricing</Link>.
        </p>
      </section>

      {/* What payment methods does Checkout.com accept? */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What Payment Methods Does Checkout.com Accept?
        </h2>
        <p className="text-muted-foreground mb-6">
          One of Checkout.com's core strengths is the breadth of checkout payment options it supports across global markets. The checkout payment methods available to your customers depend on your merchant agreement and the countries you operate in.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-2">Card payments</h3>
        <p className="text-muted-foreground mb-3">Checkout.com accepts all major card networks:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Visa (credit and debit)</li>
          <li>Mastercard (credit and debit)</li>
          <li>American Express</li>
          <li>Maestro and domestic debit schemes</li>
          <li>JCB (select markets)</li>
          <li>Diners Club / Discover (select markets)</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mb-2">Digital wallets</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Apple Pay</li>
          <li>Google Pay</li>
          <li>PayPal (via integration, select markets)</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mb-2">Bank payments and direct debit</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>SEPA Direct Debit (EU and EEA merchants)</li>
          <li>Bacs Direct Debit (UK merchants)</li>
          <li>Open banking / account-to-account payments (select markets)</li>
        </ul>

        <h3 className="text-lg font-semibold text-foreground mb-2">Local payment methods</h3>
        <p className="text-muted-foreground mb-3">
          Checkout.com supports a wide range of local checkout payment options, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>iDEAL (Netherlands)</li>
          <li>Bancontact (Belgium)</li>
          <li>Giropay (Germany)</li>
          <li>Sofort (select EU markets)</li>
          <li>Klarna (BNPL, select markets)</li>
          <li>OXXO (Mexico)</li>
          <li>Boleto Bancário (Brazil)</li>
          <li>And others depending on your contracted geographies</li>
        </ul>
        <p className="text-muted-foreground">
          For businesses asking which checkout payment options to enable, the answer is typically determined during onboarding. Checkout.com activates the methods relevant to your primary customer geographies and business model. If you need a specific local method, confirm availability before signing.
        </p>
      </section>

      {/* Indicative pricing ranges */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Indicative Checkout.com Pricing Ranges
        </h2>
        <p className="text-muted-foreground mb-6">
          Checkout.com does not publish rates, but based on industry reporting and typical enterprise payment agreements, merchants can expect:
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Merchant Profile</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Indicative Effective Rate</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Growth stage (100K to 1M GBP/month)</td>
                <td className="py-3 px-3">0.8% to 1.8% + scheme fees</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Mid-market (1M to 10M GBP/month)</td>
                <td className="py-3 px-3">0.5% to 1.2% + scheme fees</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Large enterprise (10M GBP+/month)</td>
                <td className="py-3 px-3">0.2% to 0.7% + scheme fees</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">High-risk or high-chargeback</td>
                <td className="py-3 px-3">Higher, varies significantly</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground italic mb-4">
          These are indicative ranges only. Actual fees depend on your specific agreement and are subject to negotiation. Always obtain a direct quote from Checkout.com.
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-4">
          <p className="text-foreground font-semibold mb-2">Volume example: 500,000 transactions per year</p>
          <p className="text-muted-foreground text-sm">
            For a business processing 500,000 transactions annually at an average value of £50, roughly £25M in annual volume, you would likely qualify for mid-market or enterprise rates. At 0.5% to 1.2% effective, total payment processing costs would fall in approximately the £125,000 to £300,000/year range, depending on card mix, geography, and your negotiated markup. Checkout.com's payment gateway pricing at this volume is often more efficient than flat-rate processors.
          </p>
        </div>

        <p className="text-muted-foreground">
          The markup component alone is typically in the range of 0.1% to 0.4% for well-qualified merchants, applied on top of the underlying interchange and scheme costs.
        </p>
      </section>

      {/* UK and EEA billing codes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Checkout.com Fees for UK and EEA Merchants: Billing Codes Explained
        </h2>
        <p className="text-muted-foreground mb-6">
          If you review your Checkout.com invoice or statement and see line items such as <strong className="text-foreground">ECOMM_SMALL_EEA</strong> or <strong className="text-foreground">ECOMM_MEDIUM_EEA</strong>, these are Visa and Mastercard scheme fee billing categories, not arbitrary charges created by Checkout.com.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">What these EEA billing codes mean</h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Billing Code</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">What it means</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">ECOMM_SMALL_EEA</td>
                <td className="py-3 px-3">Visa scheme fee for small-volume e-commerce merchants processing within the EEA</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">ECOMM_MEDIUM_EEA</td>
                <td className="py-3 px-3">Visa scheme fee for medium-volume EEA e-commerce merchants</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground mb-6">
          These categories are defined by Visa and applied uniformly across all processors operating in the European Economic Area. The classification is based on your transaction volume tier and has nothing to do with how Checkout.com structures its own fees. It is a Visa-defined category passed through to your statement.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">What are "oversized" fees on Checkout.com?</h3>
        <p className="text-muted-foreground mb-4">
          An "oversized" fee, such as an "oversized checkout com UK charge" or "oversized checkout com EEA" line on your statement, is a scheme-level surcharge triggered when a transaction or transaction batch exceeds a standard size threshold for its billing category. These surcharges are set by Visa or Mastercard, not Checkout.com, and are passed through transparently on the interchange-plus-plus model.
        </p>
        <p className="text-muted-foreground mb-6">
          If you are seeing unexpectedly high oversized charges, the most common cause is a high average transaction value relative to the category norm, or a mismatch between your merchant category code and your actual business type.
        </p>
        <p className="text-muted-foreground mb-6">
          Oversized surcharges can apply across all card schemes including American Express. An oversized checkout.com Amex charge on your EEA statement follows the same trigger logic as Visa and Mastercard oversized fees, but under American Express's own scheme fee schedule. If you are seeing this charge appear consistently, it is worth reviewing whether your average Amex transaction size has increased relative to your normal profile, or whether your merchant category classification is still accurate.
        </p>

        <h3 className="text-lg font-semibold text-foreground mb-3">Post-Brexit implications for UK merchants</h3>
        <p className="text-muted-foreground mb-4">
          Following Brexit, UK-issued cards are no longer classified as EEA cards. This has direct cost implications:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li><strong className="text-foreground">EEA-issued cards used in UK transactions:</strong> Now treated as cross-border transactions, attracting higher scheme and interchange fees</li>
          <li><strong className="text-foreground">UK-issued cards used in EEA transactions:</strong> Equally subject to cross-border surcharges</li>
          <li><strong className="text-foreground">Local acquiring reduces this cost:</strong> Checkout.com's local acquiring capability in both the UK and EU enables a UK merchant with significant EU customers to route transactions through a European acquiring entity, substantially reducing cross-border scheme fees</li>
        </ul>
        <p className="text-muted-foreground">
          For UK businesses with 20%+ EU customer bases, confirming whether your Checkout.com agreement includes EU local acquiring is a material cost consideration, and worth raising explicitly in your contract negotiation.
        </p>
      </section>

      {/* International and multi-currency fees */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          International and Multi-Currency Fees
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com was built for global commerce. It offers:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Card acceptance in many countries without requiring a local entity</li>
          <li>Multi-currency settlement</li>
          <li>Local acquiring in select regions to reduce cross-border charges</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          Currency conversion and cross-border transactions still incur costs, but these are typically negotiated into the overall commercial agreement rather than charged as separate visible line items.
        </p>
        <p className="text-muted-foreground">
          For businesses expanding internationally, local acquiring is a key advantage. Processing a card locally, rather than routing it cross-border, reduces scheme fees and improves authorisation rates. Understanding{" "}
          <Link to="/insights/international-sales" className="text-primary hover:underline">how international sales affect payment costs</Link>{" "}
          is essential.
        </p>
      </section>

      {/* Payout and settlement structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Payout and Settlement Structure
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com provides flexible settlement options, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Daily settlement</li>
          <li>Local currency settlement in supported countries</li>
          <li>Multiple payout destinations</li>
        </ul>
        <p className="text-muted-foreground">
          Unlike some payment platforms that charge visible per-payout fees, Checkout.com often bundles payout flexibility into the broader commercial agreement. This tends to be more cost-effective for medium and large enterprises, but it requires serious underwriting upfront. Learn more about{" "}
          <Link to="/insights/same-day-settlement-and-instant-payouts" className="text-primary hover:underline">same day settlement and instant payouts</Link>.
        </p>
      </section>

      {/* Chargebacks and dispute handling */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Chargebacks and Dispute Handling
        </h2>
        <p className="text-muted-foreground mb-4">
          Like all card processors, Checkout.com charges a fee per chargeback. The exact fee is part of your negotiated agreement and typically aligns with industry norms.
        </p>
        <p className="text-muted-foreground">
          What sets Checkout.com apart is the tooling and insight it provides around disputes. Larger merchants benefit from detailed chargeback analytics, which can help reduce total dispute costs over time. See our{" "}
          <Link to="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className="text-primary hover:underline">complete guide to chargebacks</Link>{" "}
          for strategies to reduce dispute rates.
        </p>
      </section>

      {/* Advanced tools and optional features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Advanced Tools and Optional Features
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com includes basic fraud detection, but many merchants opt for upgraded features:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Enhanced fraud rulesets and machine learning models</li>
          <li>Tokenisation and secure data storage</li>
          <li>3D Secure optimisation tools</li>
          <li>Custom reporting and reconciliation dashboards</li>
        </ul>
        <p className="text-muted-foreground">
          These features are usually priced separately or folded into higher-tier commercial terms. For businesses that process high volumes or operate in regulated markets, these tools can improve authorisation rates and reduce fraud losses. Understanding{" "}
          <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">how payment providers assess risk</Link>{" "}
          helps you evaluate which features matter most.
        </p>
      </section>

      {/* Comparison table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Checkout.com vs Stripe vs Adyen: Which Is Right for You?
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground"></th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Checkout.com</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Stripe</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Adyen</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Pricing model</td>
                <td className="py-3 px-3">Negotiated IC++</td>
                <td className="py-3 px-3">Flat rate / blended</td>
                <td className="py-3 px-3">Negotiated IC++</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Pricing transparency</td>
                <td className="py-3 px-3">Low</td>
                <td className="py-3 px-3">High</td>
                <td className="py-3 px-3">Low</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Best volume</td>
                <td className="py-3 px-3">1M GBP+/month</td>
                <td className="py-3 px-3">Any</td>
                <td className="py-3 px-3">5M GBP+/month</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Setup complexity</td>
                <td className="py-3 px-3">High</td>
                <td className="py-3 px-3">Low</td>
                <td className="py-3 px-3">High</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">International acquiring</td>
                <td className="py-3 px-3">Strong</td>
                <td className="py-3 px-3">Moderate</td>
                <td className="py-3 px-3">Very strong</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Developer experience</td>
                <td className="py-3 px-3">Good</td>
                <td className="py-3 px-3">Excellent</td>
                <td className="py-3 px-3">Good</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">SME-friendly</td>
                <td className="py-3 px-3">No</td>
                <td className="py-3 px-3">Yes</td>
                <td className="py-3 px-3">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">UK local acquiring</td>
                <td className="py-3 px-3">Yes</td>
                <td className="py-3 px-3">Yes</td>
                <td className="py-3 px-3">Yes</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">Payment methods breadth</td>
                <td className="py-3 px-3">Very broad</td>
                <td className="py-3 px-3">Broad</td>
                <td className="py-3 px-3">Very broad</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-1">Choose Checkout.com when:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You process significant monthly volume (typically above 1M GBP)</li>
              <li>International transactions are a major part of your business</li>
              <li>You need flexible multi-currency settlement</li>
              <li>You have a dedicated payments or finance team to manage the relationship</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Choose Stripe when:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are early stage or growing toward scale</li>
              <li>You need fast setup and developer flexibility</li>
              <li>Transparent, predictable pricing matters more than optimised rates</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Choose Adyen when:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You need true global acquiring across many markets</li>
              <li>You run omnichannel operations (online + in-store)</li>
              <li>Volume is very high and complexity is welcome</li>
            </ul>
          </div>
        </div>

        <p className="text-muted-foreground mt-4">
          Compare this with{" "}
          <Link to="/insights/stripe-fees-explained" className="text-primary hover:underline">Stripe's transparent pricing model</Link>{" "}
          to understand the tradeoffs.
        </p>
      </section>

      {/* Mid-article CTA (Change 7) */}
      <div style={{ background: "#0D1117", border: "1px solid #1F2937", borderRadius: "14px", padding: "2.5rem 2.8rem", margin: "3rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#10B981,#059669)" }} />
        <p style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem 0" }}>
          Free Consultation
        </p>
        <p style={{ color: "#F9FAFB", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
          Not sure which processor is right for your business?
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.75rem 0" }}>
          Book a free 15-minute call with our team. We will help you work out whether Checkout.com, Stripe, or a different provider is actually the right fit for your volume, geography, and risk profile. No sales pitch. No strings attached.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#10B981", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", textDecoration: "none", letterSpacing: "0.02em" }}>
          Book a Free 15-Minute Call
        </a>
      </div>

      {/* Why Checkout.com can feel expensive early */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why Checkout.com Can Feel Expensive Early
        </h2>
        <p className="text-muted-foreground mb-4">
          Because pricing is negotiated, initial conversations can make Checkout.com appear more expensive than fixed-rate providers.
        </p>
        <p className="text-muted-foreground mb-4">
          There are a few reasons for this:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Checkout.com prices based on long-term volume and risk, not early-stage simplicity</li>
          <li>It assumes high service expectations and enterprise-grade support</li>
          <li>It targets merchants who need scale and global reach</li>
        </ul>
        <p className="text-muted-foreground">
          For smaller businesses just starting out, a flat-rate provider may look cheaper and be easier to get started with. But once your business grows or goes global, Checkout.com's model can deliver a more efficient cost structure in practice.
        </p>
      </section>

      {/* Checkout.com at scale */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Checkout.com at Scale: Real-World Proof
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com's ability to handle very high volumes and complex global requirements is demonstrated by its partnership with Spotify, which selected Checkout.com to power payments for over 700 million monthly active users and more than 280 million paying subscribers across 180+ countries.
        </p>
        <p className="text-muted-foreground mb-4">
          This partnership demonstrates real-world capability at enterprise scale, handling massive subscription volumes, multi-currency settlement, and optimisation across global card networks.
        </p>
        <p className="text-muted-foreground">
          For merchants with international ambitions, this kind of demonstrated scale and performance is part of why providers like Checkout.com are considered seriously. For a deeper look at enterprise platforms, see our{" "}
          <Link to="/insights/checkout-com-enterprise-platform" className="text-primary hover:underline">Checkout.com enterprise platform analysis</Link>.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Frequently Asked Questions About Checkout.com Fees
        </h2>

        <FAQAccordion faqs={faqs} />
      </section>

      {/* Key takeaway */}
      <section className="bg-primary/5 border border-primary/20 rounded-xl p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Key Takeaway
        </h2>
        <p className="text-muted-foreground mb-4">
          Checkout.com does not compete on simplicity. It competes on scale, performance, and global capability.
        </p>
        <p className="text-muted-foreground mb-4">
          For small businesses, flat-rate or more transparent pricing will feel easier and be cheaper to start with. For medium and large enterprises processing globally, Checkout.com's negotiated pricing and enterprise tools can deliver lower real costs and better performance over time.
        </p>
        <p className="text-muted-foreground">
          Understanding not just the fees but the context behind them, including how EEA billing categories, UK cross-border costs, and scheme fee pass-through work, is critical to choosing the right payments partner, for where your business is now and where it plans to be.
        </p>
      </section>
    </InsightsArticleLayout>
  );
};

export default CheckoutComFees;
