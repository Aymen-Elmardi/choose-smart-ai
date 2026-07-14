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
      answer: "Stripe charges 1.5% + 20p for standard UK cards, 1.9% + 20p for premium UK cards (corporate/commercial), 1.4% + 20p for in-person payments via Stripe Terminal, 2.5% + 20p for European (EEA) cards, and 3.25% + 20p for non-European international cards. There is no monthly fee or setup charge."
    },
    {
      question: "Does Stripe charge a fee per chargeback?",
      answer: "Yes. Stripe charges £20 per dispute received, regardless of outcome. If you win the dispute, the £20 fee is not returned. For high-volume businesses or those with elevated dispute rates, this is a significant operating cost."
    },
    {
      question: "What are Stripe Connect fees for marketplaces and platforms?",
      answer: "Stripe charges $2 per active connected account per month for Standard and Express accounts. An active account is one with at least one transaction in the billing period. Custom account pricing varies. On top of this, standard processing fees apply to every transaction through a connected account."
    },
    {
      question: "Does Stripe charge for currency conversion?",
      answer: "Yes. Stripe applies a 2% foreign exchange conversion fee when the payment currency differs from your settlement currency. This is in addition to the card processing fee, meaning international transactions can carry an effective rate of 5%+ for UK businesses accepting non-European card payments in foreign currencies."
    },
    {
      question: "Does Stripe charge for instant payouts?",
      answer: "Yes. Instant payouts cost 1% of the payout amount, with a minimum fee of 50p per payout. Standard bank payouts (1 to 2 business days in the UK) are included at no extra charge."
    },
    {
      question: "How does Stripe compare to PayPal and Square for UK businesses?",
      answer: "For UK card transactions alone, Stripe (1.5% + 20p) is broadly competitive with PayPal (1.2% + 30p) and Square (1.75% flat). The differences become significant when you add FX, Connect, or payout fees. For businesses primarily processing UK cards at low volume, all three are comparable. For platforms, SaaS, or international businesses, Stripe's total cost model is more complex."
    },
    {
      question: "Is Stripe free to use?",
      answer: "Stripe has no monthly fee, no setup fee, and no minimum volume. However, Stripe is not free. It charges a commission on every transaction processed. For UK businesses, this starts at 1.5% + 20p per transaction."
    },
    {
      question: "How much does Stripe charge per transaction in the UK?",
      answer: "For a UK card payment, Stripe's commission is 1.5% + 20p per transaction. On a £100 payment, that is £1.70. On a £50 payment, it is £0.95. The effective percentage falls as average transaction values increase."
    },
    {
      question: "What is Stripe's commission rate?",
      answer: "Stripe does not use the word \"commission\" in its pricing, but the equivalent is the per-transaction processing fee: 1.5% + 20p for UK cards. On top of this, Connect platforms, instant payouts, and add-on products carry their own commission-like fees."
    },
    {
      question: "What are Stripe Billing and Invoicing fees?",
      answer: "Stripe Billing (for recurring subscriptions) costs 0.5% of recurring revenue processed through the product. Stripe Invoicing costs 0.4% of the invoice amount. Both are in addition to card processing fees. For SaaS businesses automating subscription collection, these add-ons typically increase the effective total Stripe cost by 0.5% to 1%."
    }
  ];

  return (
    <InsightsArticleLayout
      title="Stripe Fees UK (2026): What Businesses Actually Pay"
      description="Stripe's UK card fee is 1.5% + 20p, but that's just the start. This guide covers Connect fees, international charges, European rates, and what you actually pay at scale in 2026."
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

      <p className="text-lg text-muted-foreground mb-6">
        Stripe fees explained clearly: what UK businesses actually pay.
      </p>

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
              <span className="text-foreground font-medium">Standard UK cards</span>
              <span className="text-primary font-semibold">1.5% + 20p</span>
            </li>
            <li className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-foreground font-medium">Premium UK cards (corporate/commercial)</span>
              <span className="text-primary font-semibold">1.9% + 20p</span>
            </li>
            <li className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-foreground font-medium">In-person payments (Stripe Terminal)</span>
              <span className="text-primary font-semibold">1.4% + 20p</span>
            </li>
            <li className="flex justify-between items-center border-b border-border pb-3">
              <span className="text-foreground font-medium">European (EEA) cards</span>
              <span className="text-primary font-semibold">2.5% + 20p</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-foreground font-medium">Non-European international cards</span>
              <span className="text-primary font-semibold">3.25% + 20p</span>
            </li>
          </ul>
        </div>

        <p className="text-muted-foreground mb-4">
          These fees cover card acceptance, basic fraud protection, and standard payouts to your bank account.
        </p>

        <p className="text-muted-foreground mb-4">
          The 1.4% + 20p rate for in-person payments only applies when using Stripe Terminal hardware. It does not apply to online transactions. Online UK card payments always use the 1.5% + 20p standard rate, or 1.9% + 20p if the card is a premium corporate or commercial card.
        </p>

        <p className="text-muted-foreground mb-4">
          Stripe does not charge a monthly fee. There is no setup cost and no minimum volume. The commission Stripe takes is purely per transaction.
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
            If you use Stripe Connect to onboard sellers, drivers, creators, or partners onto your platform, the fee structure has several components that are easy to underestimate.
          </p>

          <h4 className="text-base font-semibold text-foreground mb-3">Connected account fees</h4>

          <p className="text-muted-foreground mb-4">
            Stripe charges a monthly commission per active connected account:
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Account Type</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Monthly Fee</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-3 px-3 font-medium text-foreground">Standard accounts</td>
                  <td className="py-3 px-3">$2 per active connected account</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-3 font-medium text-foreground">Express accounts</td>
                  <td className="py-3 px-3">$2 per active connected account</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-foreground">Custom accounts</td>
                  <td className="py-3 px-3">Varies by usage and features</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground mb-4">
            An "active" account is one that processes at least one transaction in the billing period. A platform with 1,000 active sellers pays $2,000 per month before processing a single transaction, and this fee is separate from processing costs.
          </p>

          <h4 className="text-base font-semibold text-foreground mb-3">Stripe application fees</h4>

          <p className="text-muted-foreground mb-4">
            Platforms using Connect also typically charge an application fee. This is the cut the platform takes from each transaction processed through a connected account. Stripe does not charge extra for you to collect an application fee, but the processing cost still applies at the transaction level.
          </p>

          <h4 className="text-base font-semibold text-foreground mb-3">Stripe Connect in Europe</h4>

          <p className="text-muted-foreground mb-4">
            For EU and EEA platforms, Connect pricing follows the same per-account structure. Post-Brexit, UK platforms onboarding EEA merchants may face additional regulatory considerations under PSD2. Stripe handles this automatically, but the underlying account fee applies regardless of merchant geography.
          </p>

          <p className="text-muted-foreground">
            For <Link to="/insights/marketplace-payments-guide" className="text-primary hover:underline">marketplaces</Link>, Stripe Connect fees are one of the most commonly overlooked costs. A platform scaling from 100 to 5,000 active sellers can see its monthly Stripe commission jump by thousands of pounds before any growth in transaction volume.
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
            Standard payouts to your UK bank account are included at no extra charge. Stripe charges extra when you need faster or more flexible access:
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Payout Type</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Fee</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-3 px-3 font-medium text-foreground">Standard (1 to 2 business days)</td>
                  <td className="py-3 px-3">Included</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-3 font-medium text-foreground">Instant payouts</td>
                  <td className="py-3 px-3">1% (minimum 50p)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-3 font-medium text-foreground">Cross-border payouts</td>
                  <td className="py-3 px-3">Varies by route and currency</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-medium text-foreground">Bacs Direct Debit (UK bank payments)</td>
                  <td className="py-3 px-3">1% capped at £4.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-muted-foreground mb-4">
            If your business relies on frequent payouts or faster cash flow, these fees add up quickly. A business moving £50,000/month via instant payouts pays approximately £500/month in payout commission alone. Learn more about <Link to="/insights/same-day-settlement-and-instant-payouts" className="text-primary hover:underline">same-day settlement and instant payouts</Link>.
          </p>

          <p className="text-muted-foreground">
            <strong className="text-foreground">Bacs Direct Debit</strong> is worth noting separately. For UK B2B businesses collecting recurring payments via bank transfer rather than card, Stripe charges 1% capped at £4.00 per transaction, meaningfully cheaper than card processing for higher-value invoices. A £500 monthly invoice collected via Bacs costs £4.00 (0.8% effective), compared to £7.70 via standard UK card (1.5% + 20p).
          </p>
        </div>

        {/* Chargeback Fees */}
        <div className="mb-10">
          <h3 className="text-xl font-medium text-foreground mb-4">
            Chargeback Fees
          </h3>

          <p className="text-muted-foreground mb-4">
            Stripe charges <strong className="text-foreground">£20 per chargeback dispute received</strong>, regardless of whether you win or lose the dispute. This fee is not refunded if you successfully defend the chargeback.
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

      {/* International and Cross-Border Fees */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Stripe International and Cross-Border Fees
        </h2>

        <p className="text-muted-foreground mb-6">
          One of the most common sources of billing surprises for UK businesses is the cost of international transactions. There are two separate charges to understand.
        </p>

        <h3 className="text-xl font-medium text-foreground mb-3">1. Non-UK card surcharges</h3>

        <p className="text-muted-foreground mb-4">
          When a customer pays with a non-UK card, the base processing fee increases:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Card Origin</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Fee</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">UK cards</td>
                <td className="py-3 px-3">1.5% + 20p</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">European (EEA) cards</td>
                <td className="py-3 px-3">2.5% + 20p</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">Non-European cards</td>
                <td className="py-3 px-3">3.25% + 20p</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mb-6">
          Post-Brexit, European cards are no longer treated as domestic for UK merchants. They now carry the same cross-border surcharge structure as other international cards, just at a different rate.
        </p>

        <h3 className="text-xl font-medium text-foreground mb-3">2. Currency conversion fee</h3>

        <p className="text-muted-foreground mb-6">
          If the customer pays in a currency different from your settlement currency, Stripe charges an additional 2% currency conversion fee on top of the card processing fee.
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-6">
          <p className="text-foreground font-semibold mb-3">Combined international cost example</p>
          <p className="text-muted-foreground text-sm mb-2">
            A UK business accepting a £200 payment from a US customer on a USD-denominated card:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>Non-European card fee: 3.25% + 20p = £6.70</li>
            <li>If processed in USD with GBP settlement: additional 2% = £4.00</li>
            <li className="text-foreground font-medium">Total Stripe cost on a single £200 transaction: approximately £10.70 (5.35% effective rate)</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium text-foreground mb-3">Cross-border payouts</h3>

        <p className="text-muted-foreground mb-4">
          If you pay out to sellers or partners in other countries through Stripe Connect, cross-border payout fees apply separately. These vary by destination but can add 0.25% to 1% per payout depending on the route.
        </p>

        <p className="text-muted-foreground">
          For UK businesses with significant international revenue or an international seller base, these fees compound quickly and are the primary reason Stripe becomes less cost-efficient at scale compared to enterprise providers.
        </p>
      </section>

      {/* Stripe Fees for European Businesses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Stripe Fees for European Businesses
        </h2>

        <p className="text-muted-foreground mb-6">
          Stripe is available across Europe, and its fee structure varies by country. European merchants should be aware of the following.
        </p>

        <h3 className="text-xl font-medium text-foreground mb-3">Standard European card rates (non-UK)</h3>

        <p className="text-muted-foreground mb-4">
          For businesses registered in EU countries, Stripe typically charges 1.5% + €0.25 for European cards and higher for non-European cards. The exact rates depend on the country of registration. Stripe publishes country-specific pricing at stripe.com/[country-code]/pricing.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Country</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Standard Card Fee (approx.)</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Notes</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Germany</td><td className="py-3 px-3">1.5% + €0.25</td><td className="py-3 px-3">Standard EU rate</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Netherlands</td><td className="py-3 px-3">1.5% + €0.25</td><td className="py-3 px-3">Standard EU rate</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">France</td><td className="py-3 px-3">1.5% + €0.25</td><td className="py-3 px-3">Standard EU rate</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Spain</td><td className="py-3 px-3">1.5% + €0.25</td><td className="py-3 px-3">Standard EU rate</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Ireland</td><td className="py-3 px-3">1.5% + €0.25</td><td className="py-3 px-3">Standard EU rate</td></tr>
              <tr><td className="py-3 px-3 font-medium text-foreground">Sweden</td><td className="py-3 px-3">1.5% + 1.80 SEK</td><td className="py-3 px-3">Local currency</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-medium text-foreground mb-3">UK vs European rates post-Brexit</h3>

        <p className="text-muted-foreground mb-4">
          UK merchants accepting EEA-issued cards pay 2.5% + 20p per transaction, significantly higher than the 1.5% rate that applied when the UK was inside the EU. European merchants selling to UK customers face the same dynamic in reverse.
        </p>

        <p className="text-muted-foreground">
          For businesses operating across both UK and EU markets, this asymmetry is one of the key cost considerations when choosing a payment processor.
        </p>
      </section>

      {/* Stripe Add-On and Product Fees */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Stripe Add-On and Product Fees
        </h2>

        <p className="text-muted-foreground mb-4">
          Stripe charges separately for several products beyond basic processing:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Product</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Fee</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Stripe Radar (standard)</td><td className="py-3 px-3">Included</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Stripe Radar for Fraud Teams</td><td className="py-3 px-3">+$0.02 per screened transaction</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Stripe Billing (subscriptions)</td><td className="py-3 px-3">0.5% of recurring revenue (capped)</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Stripe Invoicing</td><td className="py-3 px-3">0.4% of invoice amount</td></tr>
              <tr className="border-b border-border"><td className="py-3 px-3 font-medium text-foreground">Stripe Tax</td><td className="py-3 px-3">0.5% of transactions where tax is calculated</td></tr>
              <tr><td className="py-3 px-3 font-medium text-foreground">Stripe Identity (ID verification)</td><td className="py-3 px-3">$1.50 per verification</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground">
          These are not hidden fees. They appear clearly in your Stripe dashboard, but they are rarely factored into early cost estimates. A SaaS business using Stripe Billing for subscriptions, Stripe Radar for Teams, and Stripe Tax can see its effective rate increase by 1% or more on top of card processing.
        </p>
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
              <li>Processing (90% UK cards at 1.5% + 20p): £675 + £150 = £825</li>
              <li>Processing (10% European at 2.5% + 20p): £125 + £17 = £142</li>
            </ul>
            <p className="text-foreground font-semibold text-sm">
              Total: approximately £967/month (effective rate ~1.93%)
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
              <li>Connect fees (500 accounts × $2): ~£780/month</li>
              <li>FX fees on 30% international (2%): ~£300/month</li>
              <li>Instant payout fees (1%): ~£500/month</li>
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
                <td className="py-3 px-3">1.5% + 20p</td>
                <td className="py-3 px-3">£20</td>
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
          The headline rate of 1.5% + 20p for UK cards is only part of the picture. Connected accounts, instant payouts, chargebacks, international sales (including European cards now treated as cross-border post-Brexit), and optional tools like Billing, Invoicing, and Radar all affect what you actually pay in 2026.
        </p>

        <p className="text-muted-foreground">
          For European and international businesses in particular, the cross-border surcharges and currency conversion fees make Stripe materially more expensive than the headline UK domestic rate suggests. Understanding these costs early, including international fees, Connect charges, and add-on product fees, helps you avoid surprises and choose the right payment setup before fees start quietly eating into your margins.
        </p>
      </section>
    </InsightsArticleLayout>
  );
};

export default StripeFees;
