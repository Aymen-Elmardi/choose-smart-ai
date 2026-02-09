import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";

const PayPalFees = () => {
  const sources = [
    { name: "PayPal Merchant Fees (UK)", url: "https://www.paypal.com/uk/webapps/mpp/merchant-fees", type: "official" as const },
    { name: "PayPal Investor Relations – Annual Reports", url: "https://investor.pypl.com/financials/annual-reports-and-proxy-statements/default.aspx", type: "official" as const },
    { name: "Adyen – How Pricing Works", url: "https://www.adyen.com/pricing", type: "official" as const },
    { name: "Baymard Institute – Checkout Usability Research", url: "https://baymard.com/research/checkout-usability", type: "industry" as const },
    { name: "Visa UK – Interchange Rates and Fees", url: "https://www.visa.co.uk/about-visa/visa-rules.html", type: "regulatory" as const },
  ];

  const faqItems = [
    {
      question: "What are PayPal's fees for UK businesses?",
      answer: "PayPal typically charges around 2.9% plus a fixed fee per transaction for UK online card payments. Additional fees apply for international cards, currency conversion, disputes, and payouts. All costs are bundled into a blended rate, so you do not see the underlying interchange or scheme fees."
    },
    {
      question: "Is PayPal more expensive than Adyen?",
      answer: "For most UK businesses processing moderate to high volumes, PayPal's blended pricing results in a higher effective rate than Adyen's interchange-plus model. On £10,000 in monthly card volume, the difference can be £90 to £150 per month. However, PayPal's consumer trust and conversion benefits may justify the higher cost for some businesses."
    },
    {
      question: "Why is PayPal pricing higher than interchange-plus providers?",
      answer: "PayPal bundles interchange, scheme fees, fraud protection, consumer trust, and its own margin into a single flat rate. You are paying for simplicity, fast onboarding, and access to PayPal's consumer network. Interchange-plus providers like Adyen pass card costs through at cost and add a lower margin, rewarding scale and operational maturity."
    },
    {
      question: "Can I use PayPal alongside Adyen?",
      answer: "Yes. Many businesses use PayPal as a conversion layer alongside a primary card processor like Adyen. PayPal captures wallet-preferring consumers while Adyen handles direct card payments at lower cost. This combination balances conversion with cost efficiency."
    },
    {
      question: "Does PayPal offer interchange-plus pricing?",
      answer: "PayPal primarily uses blended pricing for most merchants. While PayPal has introduced some volume-based pricing tiers, it does not offer the same level of interchange transparency as providers like Adyen. Businesses seeking full cost visibility typically need to qualify for an enterprise-grade provider."
    }
  ];

  return (
    <InsightsArticleLayout
      title="PayPal Pricing Explained and How It Compares to Adyen for UK Businesses"
      description="A clear breakdown of PayPal's blended pricing model for UK businesses, how fees compare to Adyen's interchange-plus model, and when each provider makes financial sense."
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug="paypal-fees-explained"
      publishedTime="2026-02-09"
      keywords={[
        "paypal fees", "paypal pricing", "paypal fees uk", "paypal merchant fees",
        "paypal vs adyen", "paypal vs adyen pricing", "paypal transaction fees",
        "paypal cost comparison", "paypal business fees", "paypal blended pricing",
        "paypal interchange", "payment provider fees comparison",
        "paypal processing fees uk", "cheapest payment provider uk"
      ]}
      sources={sources}
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
        PayPal Pricing Explained and How It Compares to Adyen for UK Businesses
      </h1>

      <p className="text-foreground/90 mb-4">
        PayPal is one of the most recognisable payment brands in the world. For many businesses, it feels like a safe default. Customers already trust it, setup is quick, and pricing looks simple on the surface.
      </p>
      <p className="text-foreground/90 mb-4">
        But that simplicity often hides real cost differences when compared to enterprise-focused providers like{" "}
        <Link to="/insights/adyen-pricing-explained" className="text-primary hover:underline">Adyen</Link>.
      </p>
      <p className="text-foreground/90 mb-12">
        This guide explains how PayPal pricing actually works, what you are really paying for, and how it compares to Adyen when processing the same volume.
      </p>

      {/* How PayPal Pricing Works */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">How PayPal Pricing Works in Practice</h2>
      <p className="text-foreground/90 mb-4">
        PayPal uses a{" "}
        <Link to="/insights/pricing-models/blended-vs-interchange" className="text-primary hover:underline">blended pricing model</Link>.
        This means interchange, scheme fees, fraud tools, and PayPal's margin are bundled into a single rate.
      </p>
      <p className="text-foreground/90 mb-4">For UK businesses, PayPal's standard online card pricing is typically:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>Around 2.9 percent per transaction</li>
        <li>Plus a fixed fee per transaction</li>
        <li>Higher rates for international cards and currency conversion</li>
        <li>Additional fees for payouts, disputes, and some platform features</li>
      </ul>
      <p className="text-foreground/90 mb-4">
        You do not see the underlying card costs. You only see the final percentage.
      </p>
      <p className="text-foreground/90 mb-8">
        This makes PayPal easy to understand, but it also makes it hard to optimise costs as your business grows.
      </p>

      {/* Why Many Businesses Still Choose PayPal */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why Many Businesses Still Choose PayPal</h2>
      <p className="text-foreground/90 mb-4">
        PayPal is not popular by accident. It has two major advantages that are easy to underestimate.
      </p>
      <p className="text-foreground/90 mb-4">
        First, PayPal owns one of the largest consumer payment networks in the world. When you add PayPal at checkout, you instantly tap into millions of consumers who already have accounts, stored cards, and trust the brand. That trust alone can lift conversion rates for some businesses.
      </p>
      <p className="text-foreground/90 mb-4">
        Second, PayPal is fast to launch. There is minimal underwriting, predictable approval, and very little upfront friction. For early-stage businesses, marketplaces, and international sellers, this matters.
      </p>
      <p className="text-foreground/90 mb-8">
        Where PayPal becomes expensive is not at the start. It becomes expensive as volume increases.
      </p>

      {/* How Adyen Pricing Is Structured Differently */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">How Adyen Pricing Is Structured Differently</h2>
      <p className="text-foreground/90 mb-4">
        Adyen uses an{" "}
        <Link to="/insights/pricing-models/interchange-plus-plus" className="text-primary hover:underline">interchange-plus pricing model</Link>.
      </p>
      <p className="text-foreground/90 mb-4">
        This means card costs are passed through at cost, and Adyen adds a transparent processing margin on top. The result is more moving parts, but also more control.
      </p>
      <p className="text-foreground/90 mb-4">With Adyen, your total cost depends on:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-8">
        <li>Card type and region</li>
        <li>Interchange set by the card networks</li>
        <li>Scheme fees</li>
        <li>Adyen's processing markup</li>
        <li>Your risk profile and volume</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        This model rewards scale. The more stable and predictable your business is, the more competitive your effective rate becomes.
      </p>

      {/* Cost Comparison Table */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Example Cost Comparison: £10,000 in Monthly Card Volume</h2>
      <p className="text-foreground/90 mb-4">
        The table below shows a realistic example of what processing £10,000 per month might look like for a UK business.
      </p>
      <p className="text-foreground/90 mb-6">
        This is not a quote. It is a directional comparison to help you understand scale.
      </p>

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Provider</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Typical Pricing Model</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Approximate Cost on £10,000</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">What's Driving the Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90 font-medium">PayPal</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Blended pricing</td>
              <td className="border border-border px-4 py-3 text-foreground/90">~£320 to £330</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Flat rate bundles all costs including PayPal margin</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90 font-medium">Adyen</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Interchange plus</td>
              <td className="border border-border px-4 py-3 text-foreground/90">~£180 to £230</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Card costs passed through with lower processor markup</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Why the Difference Exists */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why the Difference Exists</h2>
      <p className="text-foreground/90 mb-4">
        PayPal prices for simplicity and risk coverage. You are paying for:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>Brand trust</li>
        <li>Consumer network access</li>
        <li>Fraud protection</li>
        <li>Fast onboarding</li>
        <li>Predictable approval</li>
      </ul>
      <p className="text-foreground/90 mb-4">
        Adyen prices for efficiency at scale. You are paying for:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>Direct acquiring</li>
        <li>Lower margins</li>
        <li>Advanced optimisation</li>
        <li>Enterprise-grade risk controls</li>
        <li>Long-term cost efficiency</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        Neither model is wrong. They serve different stages of business maturity.
      </p>

      {/* When PayPal Makes Sense */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">When PayPal Makes Sense</h2>
      <p className="text-foreground/90 mb-4">PayPal is often a good fit if:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-8">
        <li>You value speed over optimisation</li>
        <li>Your customers actively choose PayPal</li>
        <li>You operate cross-border without local entities</li>
        <li>You want minimal underwriting friction</li>
        <li>Your monthly volumes are still modest</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        For many businesses, PayPal works best as an additional payment option rather than the primary processor.
      </p>

      {/* When Adyen Becomes the Better Option */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">When Adyen Becomes the Better Option</h2>
      <p className="text-foreground/90 mb-4">Adyen tends to make sense when:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-8">
        <li>Monthly volume is growing steadily</li>
        <li>Card acceptance costs matter</li>
        <li>You want detailed cost visibility</li>
        <li>You operate across multiple regions</li>
        <li>You need advanced approval optimisation</li>
        <li>Your business model is stable and low risk</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        This is where pricing differences compound quietly over time.
      </p>

      {/* The Real Question */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Real Question Is Not Price. It Is Eligibility</h2>
      <p className="text-foreground/90 mb-4">
        The biggest mistake businesses make is assuming they can choose any pricing model they want.
      </p>
      <p className="text-foreground/90 mb-4">
        <Link to="/insights/pricing-models/interchange-plus-plus" className="text-primary hover:underline">Interchange-plus pricing</Link> is not something you simply sign up for. You qualify for it.
      </p>
      <p className="text-foreground/90 mb-8">
        Your industry, chargeback history, fraud profile, settlement flows, and operating geography all affect what providers will offer you.
      </p>
      <p className="text-foreground/90 mb-8">
        This is why pricing pages alone are misleading.
      </p>

      {/* What to Do Before Choosing */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What to Do Before Choosing a Provider</h2>
      <p className="text-foreground/90 mb-4">Before switching or committing long term, it is worth understanding:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>Whether your business qualifies for interchange plus</li>
        <li>How your card mix affects real costs</li>
        <li>Which provider aligns with your growth stage</li>
        <li>What approval friction you might face later</li>
        <li>Whether lower fees today create risk tomorrow</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        If you want to understand which pricing model your business is likely to qualify for before speaking to providers, you can start a{" "}
        <Link to="/assessment" className="text-primary hover:underline">short assessment</Link> on ChosePayments.
        It is designed to surface eligibility, not sell you a rate.
      </p>

      {/* Final Thought */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Final Thought</h2>
      <p className="text-foreground/90 mb-4">
        PayPal and Adyen are not competitors in the traditional sense. They solve different problems.
      </p>
      <p className="text-foreground/90 mb-4">
        PayPal lowers friction for customers.{" "}
        <Link to="/insights/adyen-enterprise-payments-platform" className="text-primary hover:underline">Adyen</Link> lowers cost and improves control for businesses that are ready.
      </p>
      <p className="text-foreground/90 mb-4">
        The right choice depends less on headline fees and more on where your business is today and where it is heading next.
      </p>
      <p className="text-foreground/90 mb-8">
        Understanding that difference early prevents expensive decisions later.
      </p>
    </InsightsArticleLayout>
  );
};

export default PayPalFees;
