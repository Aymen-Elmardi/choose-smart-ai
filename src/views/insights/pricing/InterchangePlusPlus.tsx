'use client'
import { Link } from '@/lib/router-compat';
import { BOOKING_URL } from "@/lib/booking";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import { Source } from "@/components/SourcesCitation";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

const interchangeSources: Source[] = [
  { name: "Visa USA Interchange Reimbursement Fees", url: "https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf", type: "official" },
  { name: "Mastercard Interchange Fees and Rates", url: "https://www.mastercard.com/us/en/business/support/merchant-interchange-rates.html", type: "official" },
  { name: "Visa Rules and Policy", url: "https://usa.visa.com/support/consumer/visa-rules.html", type: "official" },
  { name: "Mastercard Rules", url: "https://www.mastercard.us/content/dam/public/mastercardcom/na/global-site/documents/mastercard-rules.pdf", type: "official" },
  { name: "Visa Merchant Data Standards Manual", url: "https://usa.visa.com/content/dam/VCOM/download/merchants/visa-merchant-data-standards-manual.pdf", type: "official" },
  { name: "Visa UK Domestic Interchange Fees (Feb 2026)", url: "https://www.visa.co.uk/content/dam/VCOM/regional/ve/unitedkingdom/PDF/fees-and-interchange/uk-interchange-fees-feb26.pdf", type: "official" },
  { name: "Visa Inter-EEA Interchange Fees", url: "https://www.visa.co.uk/content/dam/VCOM/regional/ve/unitedkingdom/PDF/fees-and-interchange/inter-eea-interchange-jun-2021.pdf", type: "official" },
  { name: "Federal Reserve, Regulation II: Average Debit Card Interchange Fee", url: "https://www.federalreserve.gov/paymentsystems/regii-average-interchange-fee.htm", type: "official" },
];

const InterchangePlusPlus = () => {
  const faqItems = [
    {
      question: "What is Interchange++ pricing?",
      answer: "Interchange++ is a pricing model that breaks your card processing cost into three separate, visible layers: the interchange fee set by the card network, the scheme fee charged by Visa or Mastercard for using their network, and a fixed markup charged by your processor. You see and pay the true cost of each layer rather than a single blended rate."
    },
    {
      question: "What does IC++ mean?",
      answer: "IC++ is shorthand for Interchange++, also written as Interchange Plus or Interchange Plus Plus. All three terms refer to the same three-layer pricing structure: interchange, scheme fee, and processor margin."
    },
    {
      question: "What's the difference between Interchange++ and Blended pricing?",
      answer: "Interchange++ passes through the actual interchange and scheme costs for each transaction plus a transparent markup, so your rate varies by transaction but you can see exactly what you're paying for. Blended pricing charges one fixed rate across every transaction regardless of card type, which is simpler to forecast but hides how much of that rate is markup versus underlying cost."
    },
    {
      question: "What's the difference between Interchange++ and Tiered pricing?",
      answer: "Interchange++ shows you the real interchange rate for every transaction. Tiered pricing instead sorts transactions into processor-defined buckets, usually qualified, mid-qualified, and non-qualified, each with its own rate, without showing you the actual interchange cost underneath. Tiered pricing is often marketed as simple, but it's less transparent than Interchange++, not more."
    },
    {
      question: "How do I know if my business qualifies for Interchange++?",
      answer: "Qualification depends on your risk profile, not a simple menu choice. Providers assess transaction volatility, the gap between payment and delivery, your Merchant Category Code, and your refund and chargeback history before offering true Interchange++. Two businesses with identical turnover can receive different pricing structures based on how predictable and low-risk their transaction pattern looks to an underwriter."
    },
    {
      question: "How are interchange fees actually calculated?",
      answer: "Six factors determine the rate: the card scheme (Visa or Mastercard), whether the transaction is card-present or card-not-present, the card type (debit, credit, or commercial), the merchant's category code, whether the transaction is domestic or cross-border, and whether the card carries a rewards programme. Card-present, debit, domestic transactions sit at the lowest end of the range. Card-not-present, credit, cross-border, or rewards-card transactions sit at the highest."
    },
    {
      question: "What are the current UK and EEA interchange rate caps?",
      answer: "UK domestic consumer cards are capped at 0.20% for debit and 0.30% for credit, per Visa's published rate card. Cross-border transactions between a UK merchant and an EEA-issued card (or the reverse) are priced differently since Brexit: 0.20% card-present and 1.15% card-not-present for debit, 0.30% card-present and 1.50% card-not-present for credit. Business and commercial cards carry higher rates again, up to 0.75% card-present for a standard UK business debit card."
    },
    {
      question: "Can a business reduce its interchange fees?",
      answer: "The rates themselves are set by Visa and Mastercard and aren't negotiable. But a business can influence which rate applies: settling transactions promptly, using card-present technology where the transaction is genuinely in person, supplying Level 2/3 data on commercial card transactions, and encouraging debit over credit can all move transactions into a lower-cost category."
    },
    {
      question: "Is Interchange++ available for dental and healthcare practices?",
      answer: "Yes, and dental and healthcare practices are generally well regarded by underwriters given typically low chargeback rates. The practical issue in this vertical is that a large share of transactions are card-not-present or keyed-in (phone payments, treatment deposits), which carry higher interchange regardless of pricing model. Ask specifically what rate applies to keyed-in and phone payments before assuming a quoted Interchange++ rate applies to all of your volume."
    },
  ];

  return (
    <InsightsArticleLayout
      title='Interchange++ Pricing: The "Secret" to Lower Fees (And Why Most Businesses Never Qualify)'
      description="Interchange++ passes through exact card scheme costs plus a fixed markup. Learn how to read an Interchange++ statement and whether it's right for you."
      category={{ name: "Pricing Models", slug: "pricing-models" }}
      cluster="hub"
      showRelated={false}
      keywords={["interchange plus plus", "IC++ explained", "payment pricing models", "merchant fees", "interchange fees", "tiered pricing", "acquirer"]}
      sources={interchangeSources}
      publishedTime="2026-01-18"
      modifiedTime="2026-08-06"
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Interchange++ Pricing: The "Secret" to Lower Fees (And Why Most Businesses Never Qualify)
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        Interchange++ pricing is often marketed as the ultimate goal for any serious business: the most transparent, the fairest, and the cheapest way to accept card payments.
      </p>

      <p className="mb-4">
        In theory, that's true.
      </p>

      <p className="mb-8">
        In practice, most businesses who believe they are on Interchange++ are not actually receiving its full benefits. Many were never eligible for it in the first place.
      </p>

      <p className="mb-8">
        This guide moves beyond the marketing fluff to explain what Interchange++ really is at a technical level, why it is so widely misunderstood, and why qualification depends far more on your risk profile than on the rate you're quoted.
      </p>

      {/* What Is Interchange++ Pricing */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        What Is Interchange++ Pricing?
      </h2>

      <p className="mb-4">
        Interchange++ (also written as Interchange Plus or IC++) is a pricing model where your total processing cost is broken down into three distinct layers:
      </p>

      <ol className="list-decimal pl-6 mb-6 space-y-3">
        <li>
          <strong>Interchange Fees:</strong> The non-negotiable fees set by the card networks (Visa and Mastercard) and paid to the card issuing bank.
        </li>
        <li>
          <strong>Scheme Fees:</strong> The fees paid to the card networks themselves for using their infrastructure.
        </li>
        <li>
          <strong>Processor Margin (The "++"):</strong> The fixed markup added by your payment provider for their services.
        </li>
      </ol>

      <p className="mb-4">
        Unlike <Link to="/insights/crisis/hidden-fee-crisis" className="text-primary hover:underline">Blended Pricing</Link>, where all transactions are averaged into a single headline rate (e.g., 1.75% + 20p), Interchange++ passes through the true costs of the first two layers and only charges you a transparent margin on top.
      </p>

      {/* The Math of Transparency */}
      <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">The Math of Transparency:</h3>
        <ul className="space-y-2 text-foreground">
          <li>• <strong>Interchange:</strong> 0.30% + £0.05</li>
          <li>• <strong>Scheme Fees:</strong> 0.10%</li>
          <li>• <strong>Provider Margin:</strong> 0.20%</li>
          <li className="pt-2 border-t border-border mt-2">
            • <strong>Total Cost:</strong> 0.60% + £0.05
          </li>
        </ul>
      </div>

      <p className="mb-8">
        For a high-volume business, this transparency is the difference between a healthy margin and thousands of pounds in "hidden" costs.
      </p>

      {/* INSERT 1: How Interchange Rates Are Actually Calculated */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        How Interchange Rates Are Actually Calculated
      </h2>

      <p className="mb-4">
        Interchange isn't one number. Visa and Mastercard set a different rate for nearly every combination of card type, transaction method, and geography, and your effective rate is really an average across whatever mix of these your customers use. Six factors determine which rate applies to a given transaction:
      </p>

      <p className="mb-4">
        <strong>Card scheme.</strong> Visa and Mastercard publish separate, independently set rate cards. A transaction on a Visa card and the equivalent transaction on a Mastercard rarely cost exactly the same.
      </p>

      <p className="mb-4">
        <strong>Card-present vs. card-not-present.</strong> In-person transactions, where the card or device is physically read at the point of sale, carry lower interchange than online or keyed-in transactions. The gap exists because card-not-present transactions carry more fraud risk, and issuing banks price that risk into the rate.
      </p>

      <p className="mb-4">
        <strong>Card type.</strong> Debit cards carry lower interchange than credit cards. Standard consumer cards carry lower interchange than premium, rewards, or commercial (business) cards, because rewards and commercial programmes are funded in part by the higher interchange the issuing bank collects.
      </p>

      <p className="mb-4">
        <strong>Merchant Category Code (MCC).</strong> The card networks assign different rates to different industries. This is one of the more overlooked levers, and it connects directly to how <Link to="/insights/payment-processor-business-vertical-classification" className="text-primary hover:underline">payment processors classify your business</Link>, since your assigned MCC affects both your interchange rate and your underwriting risk profile.
      </p>

      <p className="mb-4">
        <strong>Domestic vs. cross-border.</strong> A transaction where the card was issued in the same country or region as the merchant is domestic and cheaper. A transaction where the cardholder's bank is in a different country or region is cross-border, and card networks apply a higher rate to cover the added complexity and risk.
      </p>

      <p className="mb-4">
        <strong>Whether the card is a rewards card.</strong> Rewards and cashback cards carry a higher interchange rate, since the issuing bank uses part of that revenue to fund the card's rewards programme.
      </p>

      <p className="mb-8">
        Two of these, the card scheme and your MCC, are effectively outside your control. The other four are where your actual processing costs get decided.
      </p>

      {/* INSERT 2: UK and EEA Interchange Rates in 2026 */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        UK and EEA Interchange Rates in 2026
      </h2>

      <p className="mb-6">
        Most pricing pages talk about interchange in the abstract. Here is what it actually costs, taken directly from Visa's own published rate cards, not a third-party estimate.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">UK domestic consumer cards</h3>

      <p className="mb-4">
        For a UK-issued card used at a UK merchant, Visa's current published domestic rates (effective February 2026) are:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-3 text-left font-semibold">Card type</th>
              <th className="border border-border p-3 text-left font-semibold">Rate</th>
              <th className="border border-border p-3 text-left font-semibold">Cap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 font-medium">Visa Consumer Debit</td>
              <td className="border border-border p-3">0.20%</td>
              <td className="border border-border p-3">capped at £0.50 per transaction</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border p-3 font-medium">Visa Consumer Credit</td>
              <td className="border border-border p-3">0.30%</td>
              <td className="border border-border p-3">capped at £1.50 per transaction</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-8">
        These caps exist because of the EU's 2015 Interchange Fee Regulation, which capped consumer card interchange across the EEA at 0.2% for debit and 0.3% for credit. The UK kept these caps in domestic law after Brexit, which is why they still apply to UK-to-UK transactions today. Unlike the US, the UK doesn't split rates by issuer size, the cap applies uniformly regardless of which bank issued the card.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">UK-EEA cross-border consumer cards</h3>

      <p className="mb-4">
        This is the rate that changed after Brexit, and it's the one most UK businesses selling into Europe don't realise applies to them. Once the UK left the EU, transactions between a UK merchant and an EEA-issued card (or the reverse) stopped counting as domestic and started being priced under Visa's cross-border interregional rate instead:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-3 text-left font-semibold">Card type</th>
              <th className="border border-border p-3 text-left font-semibold">Card-present</th>
              <th className="border border-border p-3 text-left font-semibold">Card-not-present</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 font-medium">Consumer Debit / Prepaid</td>
              <td className="border border-border p-3">0.20%</td>
              <td className="border border-border p-3">1.15%</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border p-3 font-medium">Consumer Credit / Deferred Debit</td>
              <td className="border border-border p-3">0.30%</td>
              <td className="border border-border p-3">1.50%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-8">
        Notice the card-not-present rate: 1.15% to 1.50%, up to five times the domestic rate. For any UK ecommerce business with EEA customers, this is one of the largest and least visible cost increases in the post-Brexit payments landscape. It has applied since 19 October 2019 for non-EEA cards generally, and to UK-EEA transactions specifically since the UK's exit from the EEA's interchange framework.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Commercial cards cost more, here's the actual gap</h3>

      <p className="mb-4">
        Business and commercial cards are priced separately, and the difference is significant. Visa's UK domestic rate for a standard Business Debit card, card-present, is 0.75%, capped at £2.50, nearly four times the 0.20% consumer debit rate. Card-not-present business debit runs to 1.20%. This is the concrete reason why a business with a high proportion of B2B or corporate-card customers will never see the same effective rate as a consumer-facing retailer, regardless of which processor or pricing model they use.
      </p>

      <p className="mb-8 text-sm text-muted-foreground italic">
        Sources: Visa UK Domestic Interchange Fees (effective February 2026) and Visa Inter-EEA Interchange Fees (effective 19 October 2019), both published directly by Visa.
      </p>

      {/* The Expert's Secret */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        The Expert's Secret: Interchange++ is an Underwriting Outcome
      </h2>

      <div className="bg-primary/5 border-l-4 border-primary p-4 my-6">
        <p className="text-foreground font-medium">
          Here is the part most comparison sites won't tell you: <strong>Interchange++ is not a menu option you simply "choose." It is an underwriting outcome.</strong>
        </p>
      </div>

      <p className="mb-4">
        Whether a provider offers you true IC++ depends entirely on how their risk team assesses your business across several high-stakes dimensions:
      </p>

      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          <strong>Transaction Volatility:</strong> Do you have sudden spikes in volume that look like "bust out" fraud?
        </li>
        <li>
          <strong>Future Delivery Risk:</strong> How long is the gap between payment and delivery? Longer gaps mean higher risk of chargebacks.
        </li>
        <li>
          <strong>Industry Classification (MCC):</strong> Is your business category considered high risk by the card networks?
        </li>
        <li>
          <strong>Refund Exposure:</strong> What is your historical ratio of refunds to successful sales?
        </li>
      </ul>

      <p className="mb-8">
        Two businesses with the exact same turnover can receive entirely different pricing structures. One might be approved for IC++, while the other is forced onto a Blended rate because their risk profile is too unpredictable for the provider to pass through the raw costs safely.
      </p>

      {/* Why Many Businesses Think They're on IC++ */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        Why Many Businesses Think They're on IC++ (But Aren't)
      </h2>

      <p className="mb-4">
        In our experience at ChosePayments, we frequently see "Interchange++" quotes that aren't what they seem. Common traps include:
      </p>

      <ul className="list-disc pl-6 mb-8 space-y-3">
        <li>
          <strong>The Fallback Rate:</strong> The provider offers IC++ for standard cards but applies a high blended rate for non-qualified cards like international or corporate cards.
        </li>
        <li>
          <strong>Hidden Minimums:</strong> A low margin is advertised, but a minimum monthly fee effectively doubles your rate if your volume dips.
        </li>
        <li>
          <strong>Reporting Gaps:</strong> The fees look transparent on the quote, but the monthly settlement reports are so complex that it's impossible to verify if the pass through costs are actually accurate.
        </li>
      </ul>

      {/* Comparison Table */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        Interchange++ vs. Blended vs. Tiered Pricing
      </h2>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-3 text-left font-semibold">Factor</th>
              <th className="border border-border p-3 text-left font-semibold">Interchange++</th>
              <th className="border border-border p-3 text-left font-semibold">Blended Pricing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 font-medium">Transparency</td>
              <td className="border border-border p-3">High (Total visibility of costs)</td>
              <td className="border border-border p-3">Low (Costs are hidden in the rate)</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border p-3 font-medium">Predictability</td>
              <td className="border border-border p-3">Low (Costs fluctuate by card type)</td>
              <td className="border border-border p-3">High (You always know your cost)</td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-medium">Eligibility</td>
              <td className="border border-border p-3">Limited (Requires strong risk profile)</td>
              <td className="border border-border p-3">Broad (Available to most businesses)</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border p-3 font-medium">Underwriting</td>
              <td className="border border-border p-3">Deep (Intense scrutiny of operations)</td>
              <td className="border border-border p-3">Lighter (Faster, automated approval)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 my-8">
        <p className="text-foreground">
          <strong>The Bottom Line:</strong> Interchange++ is only cheaper if your risk profile supports it consistently. If your business has high chargebacks or long delivery timelines, forcing an IC++ model can actually lead to higher "hidden" costs or sudden <Link to="/insights/crisis/stripe-account-frozen" className="text-primary hover:underline">account freezes</Link>.
        </p>
      </div>

      {/* INSERT 3: Where Tiered Pricing Fits In */}
      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Where Tiered Pricing Fits In</h3>

      <p className="mb-4">
        There's a third model worth knowing about, because some processors will offer it as a middle ground between Blended and Interchange++: Tiered pricing.
      </p>

      <p className="mb-4">
        Under Tiered pricing, the processor sorts every transaction into one of typically three buckets, qualified, mid-qualified, and non-qualified, each with its own rate. A basic consumer debit card usually lands in the cheapest, qualified tier. A premium rewards card or a card-not-present transaction usually gets pushed into mid-qualified or non-qualified, at a meaningfully higher rate.
      </p>

      <p className="mb-6">
        The problem with Tiered pricing is that the criteria for which tier a transaction falls into are set by the processor, not published in the same transparent way interchange rates are. Two processors can call the same transaction "qualified" or "non-qualified" differently. It's marketed as simpler than Interchange++, but it's actually less transparent, you can't see the true interchange cost underneath the tier, only the tier's rate.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-3 text-left font-semibold">Factor</th>
              <th className="border border-border p-3 text-left font-semibold">Interchange++</th>
              <th className="border border-border p-3 text-left font-semibold">Blended</th>
              <th className="border border-border p-3 text-left font-semibold">Tiered</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 font-medium">Transparency</td>
              <td className="border border-border p-3">High</td>
              <td className="border border-border p-3">Low</td>
              <td className="border border-border p-3">Low to medium</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border p-3 font-medium">Predictability</td>
              <td className="border border-border p-3">Low</td>
              <td className="border border-border p-3">High</td>
              <td className="border border-border p-3">Medium</td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-medium">Eligibility</td>
              <td className="border border-border p-3">Requires strong risk profile</td>
              <td className="border border-border p-3">Available to most businesses</td>
              <td className="border border-border p-3">Available to most businesses</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border p-3 font-medium">Risk of overpaying</td>
              <td className="border border-border p-3">Low, if genuinely qualified</td>
              <td className="border border-border p-3">Moderate</td>
              <td className="border border-border p-3">High, tier criteria are processor-defined</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-8">
        If you're comparing quotes and one processor calls its pricing "Tiered" while another offers "Interchange++," you're not comparing like for like. Ask any Tiered-pricing processor for their tier definitions in writing before agreeing.
      </p>

      {/* INSERT 4: How to Reduce Your Effective Interchange Rate */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        How to Reduce Your Effective Interchange Rate
      </h2>

      <p className="mb-4">
        Interchange rates themselves aren't negotiable, Visa and Mastercard set them, not your processor. But the rate that actually applies to a given transaction depends on factors you can influence:
      </p>

      <p className="mb-4">
        <strong>Settle transactions promptly.</strong> Card networks apply higher rates to transactions that aren't settled within their required window, typically 24 hours. Batch and settle daily rather than letting authorisations sit.
      </p>

      <p className="mb-4">
        <strong>Use secure, chip-and-PIN or contactless card-present technology wherever the transaction is genuinely in person.</strong> Card-present transactions on EMV or contactless hardware qualify for materially lower rates than manually keyed-in transactions, which is one reason the UK domestic card-not-present rate (0.30% + higher, business cards) sits well above the card-present rate (0.20% to 0.75%) in the tables above.
      </p>

      <p className="mb-4">
        <strong>Provide Level 2 and Level 3 data on business and corporate card transactions.</strong> For commercial and government cards, supplying additional transaction data, purchase order number, tax amount, line-item detail, can qualify a transaction for a lower interchange tier. Visa's own UK rate card shows dedicated Level 2/3 rates for Purchasing cards specifically because of this.
      </p>

      <p className="mb-4">
        <strong>Encourage debit over credit where you can.</strong> Debit interchange is roughly a third of credit interchange under both the UK domestic and EEA cross-border rate cards above. This isn't always practical to influence customer behaviour on, but for B2B invoicing or subscription billing where you have some control over the payment method offered, it's a real lever.
      </p>

      <p className="mb-4">
        <strong>Reduce your cross-border exposure where possible.</strong> If a meaningful share of your revenue comes from EEA customers, understand that you're paying the 1.15% to 1.50% cross-border card-not-present rate, not the 0.20% to 0.30% domestic rate, on all of it. Local EEA acquiring, where available, can sometimes bring these transactions back under domestic-equivalent pricing.
      </p>

      <p className="mb-8">
        None of this changes what card networks charge. What it changes is which rate on their published rate card actually applies to your transactions, and that's a real, quantifiable saving most businesses aren't actively managing.
      </p>

      {/* INSERT 5: Interchange++ for Dental and Healthcare Practices */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        Interchange++ for Dental and Healthcare Practices
      </h2>

      <p className="mb-4">
        Dental and healthcare practices ask about Interchange++ pricing more often than almost any other vertical, and the reason is specific to how these businesses take payment. Treatment plans are often high-value, card-not-present or keyed-in (phone payments, deposits taken ahead of a procedure), and recurring for ongoing care, all three of which push a transaction toward the higher end of the interchange ranges covered above rather than the cheaper card-present rate.
      </p>

      <p className="mb-4">
        The underwriting question is the same one covered earlier in this guide: qualifying for Interchange++ depends on your risk profile, not your industry alone. Dental and healthcare practices are generally well regarded by processors, low chargeback rates, established, verifiable businesses, which puts many practices in a reasonable position to qualify. But the same traps apply: a quote showing "Interchange++" pricing that reverts to a Blended fallback rate for keyed-in or phone payments specifically is common in this vertical, since so much of a dental practice's volume is exactly that transaction type.
      </p>

      <p className="mb-8">
        If you're a dental or healthcare practice evaluating a quote, ask specifically what rate applies to keyed-in and phone-taken payments, not just the headline card-present rate.
      </p>

      {/* Final Section */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        The Only Way to Know Where You Truly Stand
      </h2>

      <p className="mb-4">
        There is no universal checklist for Interchange++ eligibility. Most providers won't give you a straight answer until you've already submitted a full application, at which point you're already committed.
      </p>

      <p className="mb-4">
        This is why we built the <strong>ChosePayments Assessment</strong>.
      </p>

      <p className="mb-4">
        We don't just compare rates. We perform a <strong>pre underwriting audit</strong> of your business to determine:
      </p>

      <ol className="list-decimal pl-6 mb-8 space-y-2">
        <li>Which providers are structurally comfortable with your specific risk model.</li>
        <li>Whether you genuinely qualify for Interchange++ pricing.</li>
        <li>How to present your business to a provider to ensure you get the best possible margin.</li>
      </ol>

      {/* INSERT 6: Replaced CTA section */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
        Stop Guessing. Get Your Personalised Risk and Pricing Report.
      </h2>

      <p className="mb-4">
        You now know more about how interchange actually works than most of the quotes you'll receive will explain to you. But knowing the mechanics doesn't tell you where your specific business stands, whether your risk profile genuinely supports Interchange++, whether a "Tiered" quote you've received is actually competitive, or how much of your volume is quietly being priced at the higher cross-border or card-not-present rate.
      </p>

      <p className="mb-4">
        That's what the ChosePayments Assessment is for. It's a pre-underwriting audit of your business, not another rate comparison table, that tells you:
      </p>

      <ol className="list-decimal pl-6 mb-6 space-y-2">
        <li>Which providers are structurally comfortable with your specific risk model.</li>
        <li>Whether you genuinely qualify for Interchange++ pricing, or whether a Blended or Tiered model is realistically your best option right now.</li>
        <li>How to present your business to a provider to get the strongest possible margin.</li>
      </ol>

      <p className="mb-2">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Book a 15-Minute Call
        </a>
      </p>

      <p className="mb-8 text-muted-foreground text-sm">
        Free. No sales pitch. No strings attached.
      </p>

      {/* INSERT 7: FAQ */}
      <h2 className="text-2xl font-semibold text-foreground mt-10 mb-6">
        Frequently Asked Questions
      </h2>
      <FAQAccordion faqs={faqItems} />
    </InsightsArticleLayout>
  );
};

export default InterchangePlusPlus;
