import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
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
      question: "What are Stripe's standard UK card processing fees?",
      answer: "Stripe charges 1.4% + 20p for UK cards, 1.5% + 20p for European cards, and 2.9% + 20p for non-European cards."
    },
    {
      question: "How much does Stripe Connect cost for platforms?",
      answer: "Stripe Connect charges $1 per active connected account per month for Standard and Express accounts, in addition to processing fees."
    },
    {
      question: "Does Stripe charge for chargebacks?",
      answer: "Yes, Stripe charges £15 per chargeback regardless of whether you win or lose the dispute. This fee is not refunded even if you successfully defend the chargeback."
    },
    {
      question: "What are Stripe's currency conversion fees?",
      answer: "Stripe applies a 2% FX conversion fee when you accept payments in currencies different from your settlement currency."
    },
    {
      question: "Is Stripe expensive compared to other payment providers?",
      answer: "Stripe is predictable and easy to start with, but becomes less competitive for marketplaces, high-volume businesses, and those needing frequent payouts or operating internationally."
    }
  ];

  return (
    <InsightsArticleLayout
      title="Stripe Fees Explained: What High-Growth Merchants Actually Pay | ChosePayments"
      description="Stripe's published pricing isn't the full picture. See how fees, reserves, and risk thresholds affect your real cost — and whether Stripe is the right fit for your business."
      category={{ name: "Fees & Costs", slug: "fees" }}
      currentSlug="stripe-fees-explained"
      publishedTime="2026-02-07"
      sources={sources}
      keywords={["Stripe fees", "Stripe pricing", "Stripe pricing UK", "Stripe Connect fees", "payment processing costs", "Stripe chargebacks", "stripe fees explained"]}
    >
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Stripe Fees Explained Clearly: What Businesses Actually Pay
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Stripe is one of the most widely used payment platforms in the world. Its pricing looks simple at first glance, but many businesses discover later that their real costs are higher than expected.
      </p>

      <p className="text-muted-foreground mb-8">
        This guide explains Stripe fees in plain English. Not just the headline rates, but the charges that appear as your business grows, adds features, or runs a platform or marketplace.
      </p>

      <p className="text-muted-foreground mb-12">
        If you are comparing Stripe to other providers, understanding the full cost picture matters more than the advertised rate.
      </p>

      {/* Standard Card Processing Fees */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Stripe's Standard Card Processing Fees
        </h2>
        
        <p className="text-muted-foreground mb-6">
          For most UK businesses, Stripe's core pricing looks like this:
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
            For <Link to="/insights/why-marketplaces-get-extra-scrutiny" className="text-primary hover:underline">marketplaces</Link>, this is one of the most commonly overlooked costs.
          </p>
        </div>

        {/* Payout Fees */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Payout Fees and Accelerated Access to Funds
          </h3>
          
          <p className="text-muted-foreground mb-4">
            Standard payouts are typically included, but Stripe charges extra when you need faster or more flexible access to your money. You may pay up to 1% per payout (capped) when using:
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
            Stripe charges <strong className="text-foreground">£15 per chargeback</strong>, regardless of whether you win or lose the dispute. This fee is not refunded if you successfully defend the chargeback.
          </p>

          <p className="text-muted-foreground">
            For businesses with high transaction volumes or subscription models, this can become a meaningful operational cost. Understanding <Link to="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className="text-primary hover:underline">how chargebacks work and how to avoid them</Link> is essential.
          </p>
        </div>

        {/* Currency Conversion */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Currency Conversion and International Fees
          </h3>
          
          <p className="text-muted-foreground mb-4">
            If you accept payments in currencies different from your settlement currency, Stripe applies:
          </p>

          <div className="bg-muted/30 rounded-lg p-4 mb-4">
            <p className="text-foreground font-medium">
              2% FX conversion fee on top of processing costs
            </p>
          </div>

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
            These tools are valuable, but they increase your effective processing rate beyond the headline number. Understanding <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">how payment provider risk models work</Link> helps you assess whether these tools are necessary.
          </p>
        </div>
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
            "Use of Connect or marketplaces",
            "Payout frequency",
            "International exposure",
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
          A small ecommerce store may stay close to the headline rate. A fast growing platform or SaaS business almost never does.
        </p>
      </section>

      {/* Comparison Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Is Stripe Expensive Compared to Other Providers?
        </h2>
        
        <p className="text-muted-foreground mb-6">
          Stripe is not cheap or expensive by default. It is predictable, easy to start, and feature rich, but it becomes less competitive when:
        </p>

        <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
          <li>You run a marketplace</li>
          <li>You need frequent payouts</li>
          <li>You process high volumes</li>
          <li>You operate internationally</li>
          <li>You want negotiated pricing</li>
        </ul>

        <p className="text-muted-foreground">
          Other providers may offer lower effective rates, especially once volume increases, but often require upfront underwriting and more setup. For a deeper comparison, see our <Link to="/insights/stripe-payment-platform" className="text-primary hover:underline">Stripe platform deep dive</Link> or explore <Link to="/stripe-alternatives-marketplace" className="text-primary hover:underline">Stripe alternatives</Link>.
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

        <p className="text-muted-foreground mb-6">
          This is why many businesses reassess their payment provider after scaling, even if Stripe worked well at the beginning.
        </p>

        <p className="text-muted-foreground">
          If you want to understand whether Stripe is cost effective for your business or whether another provider would be a better fit, you can <Link to="/assessment" className="text-primary hover:underline">start a short assessment</Link>. It looks at how you operate and what providers typically charge for businesses like yours.
        </p>
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
          The headline rate is only part of the picture. Connected accounts, payouts, chargebacks, international sales, and optional tools all affect what you actually pay.
        </p>

        <p className="text-muted-foreground">
          Understanding these costs early helps you avoid surprises and choose the right payment setup before fees start quietly eating into your margins.
        </p>
      </section>
    </InsightsArticleLayout>
  );
};

export default StripeFees;
