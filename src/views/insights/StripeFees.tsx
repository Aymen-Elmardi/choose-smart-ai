'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { Source } from "@/components/SourcesCitation";

const StripeFees = () => {
  const sources: Source[] = [
    {
      name: "Stripe – UK Pricing",
      url: "https://stripe.com/gb/pricing",
      type: "official"
    },
    {
      name: "Stripe – Connect Pricing",
      url: "https://stripe.com/gb/connect/pricing",
      type: "official"
    },
    {
      name: "Stripe – Instant Payouts",
      url: "https://stripe.com/docs/payouts/instant-payouts",
      type: "official"
    },
    {
      name: "Stripe – Disputes and Fraud Protection",
      url: "https://stripe.com/docs/disputes",
      type: "official"
    }
  ];

  const faqs = [
    {
      question: "What are Stripe's card processing fees in the UK in 2026?",
      answer: "Stripe charges 1.4% + 20p for UK cards, 1.5% + 20p for European cards, and 2.9% + 20p for non-European cards. These are the standard rates as of 2026 for businesses on Stripe's default pricing."
    },
    {
      question: "Does Stripe charge a fee per chargeback?",
      answer: "Yes. Stripe charges 15 GBP per chargeback, regardless of whether you win or lose the dispute. The fee is not refunded even if you successfully defend the chargeback."
    },
    {
      question: "What are Stripe Connect fees for marketplaces and platforms?",
      answer: "Stripe charges $1 per active connected account per month for Standard and Express accounts. A platform with 1,000 active sellers pays $1,000 per month in Connect fees before any processing fees are counted."
    },
    {
      question: "Does Stripe charge for currency conversion?",
      answer: "Yes. Stripe applies a 2% foreign exchange conversion fee on top of processing costs when the card currency differs from your settlement currency. This applies to many international ecommerce and SaaS businesses."
    },
    {
      question: "Does Stripe charge for instant payouts?",
      answer: "Yes. Stripe charges up to 1% per payout (with a minimum and maximum cap) for instant payouts and certain international payout routes. Standard payouts are included at no extra charge."
    },
    {
      question: "How does Stripe compare to PayPal and Square for UK businesses?",
      answer: "Stripe (1.4% + 20p for UK cards) is typically cheaper than PayPal (1.2% + 30p for standard checkout) and Square (1.75% flat for card present) for most UK merchants. However, Stripe becomes more expensive than alternatives at scale when Connect fees, FX charges, and chargeback costs are added."
    }
  ];

  return (
    <InsightsArticleLayout
      title="Stripe Fees UK (2026): What Businesses Actually Pay"
      description="Stripe charges 1.4% + 20p for UK cards. See the full breakdown of Connect fees, chargebacks, FX, and instant payouts, updated for 2026."
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug="stripe-fees-explained"
      publishedTime="2026-02-07"
      modifiedTime="2026-06-12"
      sources={sources}
      keywords={["Stripe fees UK", "Stripe pricing 2026", "Stripe UK processing fees", "Stripe fees explained", "Stripe Connect fees", "Stripe chargeback fee"]}
      breadcrumbSchemaItems={[
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" },
        { name: "Stripe Fees Explained", url: "/insights/stripe-fees-explained" },
      ]}
    >
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Stripe Fees Explained: Real Costs for UK Businesses in 2026
      </h1>

      <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-6">
        Stripe Fees Explained Clearly: What UK Businesses Actually Pay
      </h2>

      <p className="text-lg text-muted-foreground mb-8">
        Stripe is one of the most widely used payment platforms in the world. Its pricing looks simple at first glance, but many businesses discover later that their real costs are higher than expected.
      </p>

      <p className="text-muted-foreground mb-4">
        This guide explains Stripe fees in plain English for 2026. Not just the headline rates, but the charges that appear as your business grows, adds features, or runs a platform or marketplace.
      </p>

      <p className="text-sm text-muted-foreground italic mb-12">
        Last updated: June 2026
      </p>

      {/* Standard Card Processing Fees */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Stripe's Standard UK Card Processing Fees in 2026
        </h2>

        <p className="text-muted-foreground mb-6">
          For most UK businesses, Stripe's core pricing in 2026 looks like this:
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-6">
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-foreground font-medium">UK cards</span>
              <span className="text-primary font-semibold">1.4% + 20p</span>
            </li>
            <li className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-foreground font-medium">European cards</span>
              <span className="text-primary font-semibold">1.5% + 20p</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-foreground font-medium">Non-European cards</span>
              <span className="text-primary font-semibold">2.9% + 20p</span>
            </li>
          </ul>
        </div>

        <p className="text-muted-foreground mb-4">
          These fees cover card acceptance, basic fraud protection, and standard payouts to your bank account.
        </p>

        <p className="text-muted-foreground">
          For simple ecommerce or early stage businesses, this is often acceptable and easy to work with. But this is only the starting point.
        </p>
      </section>

      {/* Fees That Apply as Business Grows */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Stripe Fees That Apply as Your Business Grows
        </h2>

        <p className="text-muted-foreground mb-8">
          As soon as your setup becomes more complex, additional Stripe fees usually come into play.
        </p>

        {/* Connect Fees */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Stripe Connect Fees for Platforms and Marketplaces
          </h3>

          <p className="text-muted-foreground mb-4">
            If you use Stripe Connect to onboard sellers, drivers, creators, or partners, Stripe charges:
          </p>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
            <p className="text-foreground font-medium">
              $1 per active connected account per month for Standard and Express accounts
            </p>
          </div>

          <p className="text-muted-foreground mb-4">
            This fee scales directly with your seller base. A platform with 1,000 active sellers pays $1,000 per month before processing a single transaction.
          </p>

          <p className="text-muted-foreground">
            For <Link to="/insights/marketplace-payments-guide" className="text-primary hover:underline">marketplaces</Link>, this is one of the most commonly overlooked costs.
           </p>
         </div>

         <InlineAssessmentCTA
           context="Find out if Stripe Connect fees will work for your marketplace or platform model."
           cta="Get your risk profile"
         />

        {/* Payout Fees */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Payout Fees and Accelerated Access to Funds
          </h3>

          <p className="text-muted-foreground mb-4">
            Standard payouts are included, but Stripe charges extra when you need faster or more flexible access to your money. You may pay up to 1% per payout (capped) when using:
          </p>

          <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
            <li>Instant payouts</li>
            <li>Certain international payout routes</li>
            <li>Non-standard payout schedules</li>
          </ul>

          <p className="text-muted-foreground">
            If your business relies on frequent payouts or faster cash flow, these fees add up quickly. Learn more about <Link to="/insights/same-day-settlement-and-instant-payouts" className="text-primary hover:underline">same-day settlement and instant payouts</Link>.
          </p>
        </div>

        {/* Chargeback Fees */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Chargeback Fees
          </h3>

          <p className="text-muted-foreground mb-4">
            Stripe charges <strong className="text-foreground">15 GBP per chargeback</strong>, regardless of whether you win or lose the dispute. This fee is not refunded if you successfully defend the chargeback.
          </p>

          <p className="text-muted-foreground">
            For businesses with high transaction volumes or subscription models, this can become a meaningful operational cost. Understanding <Link to="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className="text-primary hover:underline">how chargebacks work and how to avoid them</Link> is essential.
          </p>

          <InlineAssessmentCTA
            context="See which providers have better chargeback policies for your industry."
            cta="Run your risk profile"
          />
        </div>

        {/* Currency Conversion */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Currency Conversion and International Fees
          </h3>

          <p className="text-muted-foreground mb-4">
            If you accept payments in currencies different from your settlement currency, Stripe applies a <strong className="text-foreground">2% foreign exchange conversion fee</strong> on top of processing costs.
          </p>

          <p className="text-muted-foreground">
            This applies to many international ecommerce and SaaS businesses, especially those selling globally from the UK.
          </p>
        </div>

        {/* Fraud Prevention */}
        <div>
          <h3 className="text-xl font-medium text-foreground mb-4">
            Fraud Prevention and Optional Tools
          </h3>

          <p className="text-muted-foreground mb-4">
            Stripe includes basic fraud protection, but more advanced tools come at a cost. Common paid features include:
          </p>

          <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
            <li>Stripe Radar for Fraud Teams</li>
            <li>Advanced reporting and billing features</li>
            <li>Usage-based fees for invoicing and subscriptions</li>
          </ul>

          <p className="text-muted-foreground">
            These tools are valuable but they increase your effective processing rate beyond the headline number. Understanding <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">how payment provider risk models work</Link> helps you assess whether these tools are necessary.
          </p>
        </div>
      </section>

      {/* Worked Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          What Will Stripe Cost You Per Month? A Worked Example
        </h2>

        <p className="text-muted-foreground mb-6">
          Two businesses both using Stripe's UK standard rates can end up with very different monthly bills.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Example A: Simple UK ecommerce store
            </h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1 text-sm">
              <li>Monthly volume: 50,000 GBP</li>
              <li>Average transaction: 60 GBP (around 833 transactions)</li>
              <li>Card mix: 90% UK cards</li>
              <li>No Connect, no FX, standard payouts</li>
            </ul>
            <p className="text-sm text-muted-foreground mb-1">Approximate monthly cost:</p>
            <ul className="text-sm text-muted-foreground space-y-1 mb-3">
              <li>Processing (90% at 1.4% + 20p): 700 GBP + 150 GBP = 850 GBP</li>
              <li>Processing (10% European): 75 GBP + 17 GBP = 92 GBP</li>
            </ul>
            <p className="text-foreground font-semibold text-sm">
              Total: approximately 942 GBP per month (effective rate ~1.88%)
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Example B: SaaS platform with connected sellers
            </h3>
            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1 text-sm">
              <li>Monthly volume: 50,000 GBP</li>
              <li>500 active connected accounts</li>
              <li>30% international transactions</li>
              <li>Regular instant payouts</li>
            </ul>
            <p className="text-sm text-muted-foreground mb-1">Additional costs on top of processing:</p>
            <ul className="text-sm text-muted-foreground space-y-1 mb-3">
              <li>Connect fees: 500 USD (~390 GBP) per month</li>
              <li>FX fees on 30% international (2%): ~300 GBP</li>
              <li>Instant payout fees (1%): ~500 GBP</li>
            </ul>
            <p className="text-foreground font-semibold text-sm">
              Total: significantly higher effective rate, often 3% to 5% or more.
            </p>
          </div>
        </div>

        <p className="text-muted-foreground">
          This is why many businesses reassess their payment provider after scaling, even if Stripe worked well at the beginning.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          How Stripe Compares to Other UK Payment Providers in 2026
        </h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Provider</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">UK Card Rate</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Chargeback Fee</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">FX Fee</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Best For</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Stripe</td>
                <td className="py-3 px-3">1.4% + 20p</td>
                <td className="py-3 px-3">15 GBP</td>
                <td className="py-3 px-3">2%</td>
                <td className="py-3 px-3">Developers, SaaS, flexible setup</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">PayPal</td>
                <td className="py-3 px-3">1.2% + 30p</td>
                <td className="py-3 px-3">14 GBP</td>
                <td className="py-3 px-3">2.5%</td>
                <td className="py-3 px-3">Buyer trust, consumer checkout</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Square</td>
                <td className="py-3 px-3">1.75% flat</td>
                <td className="py-3 px-3">No fee</td>
                <td className="py-3 px-3">2.5%</td>
                <td className="py-3 px-3">In-person retail, simple setup</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Checkout.com</td>
                <td className="py-3 px-3">Negotiated</td>
                <td className="py-3 px-3">Negotiated</td>
                <td className="py-3 px-3">Negotiated</td>
                <td className="py-3 px-3">Enterprise, high volume, global</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">Adyen</td>
                <td className="py-3 px-3">Interchange+</td>
                <td className="py-3 px-3">Negotiated</td>
                <td className="py-3 px-3">Negotiated</td>
                <td className="py-3 px-3">Enterprise, omnichannel</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground">
          Stripe is competitive at low to medium volumes for UK card transactions. It becomes less competitive when you add Connect, high FX exposure, or frequent payouts. For a deeper comparison, see our <Link to="/insights/stripe-payment-platform" className="text-primary hover:underline">Stripe platform deep dive</Link> or explore <Link to="/stripe-alternatives-marketplace" className="text-primary hover:underline">Stripe alternatives</Link>.
        </p>
      </section>

      {/* Why Different Users Pay Different Fees */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Why Two Stripe Users Often Pay Very Different Fees
        </h2>

        <p className="text-muted-foreground mb-6">
          Two businesses both using Stripe can have very different costs. That is because Stripe pricing depends on:
        </p>

        <ul className="grid md:grid-cols-2 gap-3 mb-6">
          {[
            "Transaction volume",
            "Average transaction size",
            "Use of Connect or marketplace features",
            "Payout frequency and speed",
            "International exposure and FX volume",
            "Chargeback levels",
            "Optional tools enabled"
          ].map((factor, index) => (
            <li key={index} className="flex items-center gap-2 text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              {factor}
            </li>
          ))}
        </ul>

        <p className="text-muted-foreground">
          A small ecommerce store may stay close to the headline rate. A fast-growing platform or SaaS business almost never does.
        </p>
      </section>

      {/* Is Stripe Expensive */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Is Stripe Expensive Compared to Other Providers?
        </h2>

        <p className="text-muted-foreground mb-6">
          Stripe is not cheap or expensive by default. It is predictable, easy to start, and feature-rich, but it becomes less competitive when:
        </p>

        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>You run a marketplace</li>
          <li>You need frequent payouts</li>
          <li>You process high volumes</li>
          <li>You operate internationally</li>
          <li>You want negotiated pricing</li>
        </ul>

        <p className="text-muted-foreground">
          Other providers may offer lower effective rates, especially once volume increases, but often require upfront underwriting and more setup.
        </p>
      </section>

      {/* How to Know Real Costs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          How to Know What Stripe Will Really Cost Your Business
        </h2>

        <p className="text-muted-foreground mb-6">
          There is no universal Stripe fee. The only accurate way to estimate your real cost is to look at:
        </p>

        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>Your business model</li>
          <li>Your growth plans</li>
          <li>How you move money</li>
          <li>Whether you operate a platform or marketplace</li>
        </ul>

        <p className="text-muted-foreground">
          If you want to understand whether Stripe is cost effective for your business or whether another provider would be a better fit, you can <Link to="/assessment" className="text-primary hover:underline">start a short assessment</Link>. It looks at how you operate and what providers typically charge for businesses like yours.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Frequently Asked Questions About Stripe Fees
        </h2>

        <FAQAccordion faqs={faqs} />
      </section>

      {/* Key Takeaway */}
      <section className="bg-primary/5 border border-primary/20 rounded-xl p-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Key Takeaway
        </h2>

        <p className="text-muted-foreground mb-4">
          Stripe's pricing is simple to start with, but not simple at scale.
        </p>

        <p className="text-muted-foreground mb-4">
          The headline rate of 1.4% + 20p for UK cards is only part of the picture. Connected accounts, instant payouts, chargebacks, international sales, and optional tools all affect what you actually pay in 2026.
        </p>

        <p className="text-muted-foreground">
          Understanding these costs early helps you avoid surprises and choose the right payment setup before fees start quietly eating into your margins.
        </p>
      </section>
    </InsightsArticleLayout>
  );
};

export default StripeFees;
