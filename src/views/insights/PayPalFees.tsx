'use client'
import { BOOKING_URL } from "@/lib/booking";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

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
      question: "Does PayPal charge a fee?",
      answer: "PayPal is free for most personal UK transactions between friends and family using a PayPal balance or linked bank account. It charges fees for commercial transactions (goods and services), international personal transfers, and currency conversions. Business accounts pay a processing fee on every commercial transaction received."
    },
    {
      question: "What is the PayPal G&S fee?",
      answer: "The PayPal goods and services (G&S) fee for UK domestic transactions is 2.9% + 0.30 GBP per transaction for most standard commercial payments. Card-funded commercial transactions carry a lower rate of 1.2% + fixed fee. The fee is paid entirely by the seller. Buyers do not pay a separate fee when sending a G&S payment via their PayPal balance or bank account."
    },
    {
      question: "What is the PayPal fee for goods and services?",
      answer: "For UK domestic commercial transactions, PayPal charges the seller 2.9% + 0.30 GBP per transaction at the standard rate. Transactions funded by a Visa or Mastercard debit or credit card carry a rate of 1.2% + fixed fee. American Express transactions processed through PayPal's Advanced Card Payments attract a 3.5% rate."
    },
    {
      question: "How much does PayPal charge per transaction for UK businesses?",
      answer: "UK business accounts pay between 1.2% and 2.9% plus a GBP fixed fee for domestic commercial transactions, depending on the payment method. International transactions add a further 1.29% for EEA payments or 1.99% for payments from other markets. Micropayments pricing is available at 5% + reduced fixed fee for eligible low-value sellers who apply separately."
    },
    {
      question: "What is the PayPal instant transfer fee?",
      answer: "Standard transfers to a UK bank account are free and typically clear within one to three business days. PayPal charges a separate fee for instant transfers to an eligible UK debit card. This rate is subject to change, so check PayPal's current UK fee schedule before relying on a specific figure."
    },
    {
      question: "Does PayPal charge a fee for international transfers?",
      answer: "Yes. Sending money personally to someone abroad from the UK costs 5% of the transaction amount. Merchants receiving international commercial payments pay their standard domestic rate plus 1.29% for EEA transactions or 1.99% for transactions from other markets. Since Brexit, cross-border transactions between the UK and EU now attract the EEA additional fee in both directions."
    },
    {
      question: "Is PayPal free for businesses?",
      answer: "Opening and maintaining a PayPal business account is free. Every commercial transaction you receive attracts a processing fee. The standard domestic rate is 2.9% + 0.30 GBP per transaction. There are no monthly account fees unless you use Website Payments Pro or the Recurring Payments tool, both of which cost 20.00 GBP per month."
    },
    {
      question: "What is the PayPal currency conversion fee?",
      answer: "PayPal charges 3% above the base exchange rate for all currency conversions. This applies when you receive funds in a different currency to your account's primary currency, or when you withdraw funds that need to be converted to GBP. The 3% margin makes PayPal a relatively expensive option for currency conversion compared to specialist FX providers."
    },
    {
      question: "What is the PayPal invoice fee?",
      answer: "PayPal invoice payments are processed at the standard commercial transaction rate. For UK domestic payments, this is 2.9% + 0.30 GBP per transaction. There is no separate invoicing fee. The cost of receiving payment via a PayPal invoice is the same as receiving payment through a checkout button."
    },
    {
      question: "What happens to fees if my PayPal account is classed as high-risk?",
      answer: "PayPal can apply a surcharge of up to 5% per transaction on top of your standard rate if it classifies your account as high-risk. This classification can result from elevated chargeback rates, your business category, or other factors. For merchants in industries that any processor might consider elevated-risk, understanding your risk classification before committing to a payment solution matters."
    }
  ];

  return (
    <InsightsArticleLayout
      title="PayPal Fees UK (2026): Complete Breakdown for Businesses and Consumers"
      description="Full breakdown of PayPal fees for UK users in 2026. Covers goods and services fees, business transaction rates, instant transfer costs, currency conversion, and when PayPal starts costing more than you expect."
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug="paypal-fees-explained"
      publishedTime="2026-02-09"
      modifiedTime="2026-07-10"
      keywords={[
        "paypal fees", "paypal fees uk", "paypal g&s fee", "paypal goods and services fee",
        "paypal business fees", "paypal transaction fees", "paypal currency conversion fee",
        "paypal instant transfer fee", "paypal invoice fee", "paypal micropayments",
        "paypal international fees", "paypal merchant fees uk"
      ]}
      sources={sources}
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        PayPal Fees Explained: The Complete UK Guide for 2026
      </h1>

      <p className="text-foreground/90 mb-4">
        PayPal does not charge a fee for most personal transactions between UK users. But the moment money moves in a commercial context, the fees kick in, and they can range from 1.2% to 5% depending on what you are doing and where the money is coming from.
      </p>
      <p className="text-foreground/90 mb-12">
        This guide covers every PayPal fee that matters to UK consumers and businesses in 2026: goods and services fees, business transaction rates, instant transfer costs, currency conversion charges, and the less visible fees that catch merchants off guard.
      </p>

      {/* Is PayPal Free? */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Is PayPal Free?</h2>
      <p className="text-foreground/90 mb-4">It depends on the transaction type. PayPal is free in these situations:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>Buying from a seller using your PayPal balance or linked bank account (with no currency conversion needed)</li>
        <li>Sending money to friends and family in the UK from your PayPal balance or bank account</li>
        <li>Receiving personal payments from another UK user</li>
        <li>Withdrawing funds to a UK bank account (standard transfer)</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        PayPal charges fees when money moves commercially. If you receive payment for goods or services, send money abroad, convert currencies, or process payments through a business account, fees apply.
      </p>

      {/* Goods and Services */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">PayPal Goods and Services Fees (G&S)</h2>
      <p className="text-foreground/90 mb-4">
        This is the most-searched PayPal fee category for good reason. Goods and services (G&S) is the payment type that triggers buyer protection on PayPal, and it costs the recipient a fee.
      </p>
      <p className="text-foreground/90 mb-4">
        G&S is the correct option for any commercial transaction. Selling a product, running a service, accepting payment as a freelancer, or collecting money through a business account all fall under this category. Using the "friends and family" option to avoid fees for commercial sales is a violation of PayPal's user agreement and removes buyer protection.
      </p>
      <p className="text-foreground/90 mb-6">The UK PayPal G&S fee structure for domestic transactions:</p>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Transaction Type</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">Standard commercial transactions</td>
              <td className="border border-border px-4 py-3 text-foreground/90">2.9% + 0.30 GBP fixed fee</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">Card-funded transactions (Visa/Mastercard)</td>
              <td className="border border-border px-4 py-3 text-foreground/90">1.2% + 0.30 GBP fixed fee</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">Alternative Payment Methods (APM)</td>
              <td className="border border-border px-4 py-3 text-foreground/90">1.29% + fixed fee</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">QR Code (above 10.01 GBP)</td>
              <td className="border border-border px-4 py-3 text-foreground/90">1.5% + fixed fee</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">QR Code (10.00 GBP and below)</td>
              <td className="border border-border px-4 py-3 text-foreground/90">2% + fixed fee</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90 mb-4">
        The fixed fee per transaction varies by currency. For GBP transactions, it is 0.30 GBP.
      </p>
      <p className="text-foreground/90 mb-4">
        The default rate most sellers encounter is 2.9% + 0.30 GBP. The card-funded rate of 1.2% is lower because the transaction is funded directly from a card, and PayPal prices this type separately. Alternative Payment Methods such as Apple Pay or Google Pay carry the 1.29% APM rate.
      </p>
      <p className="text-foreground/90 mb-4">
        Who pays the G&S fee? The seller pays. Buyers do not pay a PayPal fee when sending a G&S payment from their PayPal balance or bank account. If a buyer pays using a credit card, there is no additional buyer-side charge, but it does affect which seller rate applies.
      </p>
      <p className="text-foreground/90 mb-8">
        What this costs in practice: on a 50 GBP sale at the standard rate, the seller pays 1.45 GBP + 0.30 GBP = 1.75 GBP. On a 200 GBP sale, the cost is 5.80 GBP + 0.30 GBP = 6.10 GBP. For sellers operating on platforms like eBay, Depop, or Vinted, these costs compound quickly.
      </p>

      {/* Business Transaction Fees */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">PayPal Business Transaction Fees for UK Merchants</h2>
      <p className="text-foreground/90 mb-4">
        If you operate a business account and accept payments from customers, these are the rates you will see.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Standard Commercial Transaction Rate</h3>
      <p className="text-foreground/90 mb-4">
        The default rate for receiving commercial payments through online checkout, invoices, or payment links is 2.9% + 0.30 GBP per transaction for standard domestic UK payments.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Card Payment Fees</h3>
      <p className="text-foreground/90 mb-4">
        Merchants using PayPal's Advanced Credit and Debit Card Payments product see the following rates:
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Card Type</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Pricing Model</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">Visa and Mastercard</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Blended pricing</td>
              <td className="border border-border px-4 py-3 text-foreground/90">1.2% + fixed fee</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">Visa and Mastercard</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Interchange plus</td>
              <td className="border border-border px-4 py-3 text-foreground/90">1.2% + fixed fee + interchange</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">American Express</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Standard</td>
              <td className="border border-border px-4 py-3 text-foreground/90">3.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-foreground/90 mb-4">
        American Express sits materially higher than Visa and Mastercard. If a significant share of your customer base pays with Amex, this is worth building into your margin assumptions. The 3.5% rate applies to Amex transactions processed through PayPal's card payment products.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">PayPal Invoice Fee</h3>
      <p className="text-foreground/90 mb-4">
        Payments made in response to a PayPal invoice are charged at the standard commercial transaction rate. For UK domestic payments, that is 2.9% + 0.30 GBP per transaction. There is no separate invoicing fee layered on top of this. The cost of getting paid via invoice is the same as the cost of getting paid through checkout.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">QR Code Payments</h3>
      <p className="text-foreground/90 mb-4">
        Merchants using PayPal QR codes for in-person transactions pay 1.5% + fixed fee for transactions above 10.01 GBP, and 2% + fixed fee for transactions at or below 10.00 GBP. QR code payments are designed for market stalls, pop-ups, and similar settings where card readers are not in use.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Charity and Donation Rates</h3>
      <p className="text-foreground/90 mb-8">
        Registered charities receive a reduced domestic rate of 1.4% + fixed fee for commercial transactions. QR code transactions and listed fundraisers use commercial transaction rates. Unlisted PayPal fundraisers carry no fee to receive donations.
      </p>

      {/* International Transaction Fees */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">PayPal International Transaction Fees</h2>
      <p className="text-foreground/90 mb-6">
        International transactions carry an additional percentage on top of the standard domestic rate.
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Transaction Origin</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Additional Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">European Economic Area (EEA)</td>
              <td className="border border-border px-4 py-3 text-foreground/90">+1.29%</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">All other markets</td>
              <td className="border border-border px-4 py-3 text-foreground/90">+1.99%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-foreground/90 mb-6">
        A UK merchant receiving a standard payment from a French buyer, for example, would pay 2.9% + 1.29% + 0.30 GBP fixed fee. The additional percentage is applied on top of whichever domestic rate applies to the transaction type.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Post-Brexit cross-border considerations</h3>
      <p className="text-foreground/90 mb-6">
        Since the UK left the EU, UK-issued cards are no longer classified as EEA cards by card networks or by PayPal. A UK buyer paying a merchant based in Germany is now a cross-border transaction, attracting the additional 1.29% EEA fee. The same logic applies in reverse: a French buyer paying a UK merchant triggers cross-border charges. If you process meaningful volumes across the UK and Europe, this post-Brexit reclassification has a real cost impact that was not present before 2021.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">Sending personal payments internationally</h3>
      <p className="text-foreground/90 mb-8">
        UK users sending personal payments to someone abroad pay 5% of the transaction amount. There is no fee for receiving personal payments from abroad unless a currency conversion is required.
      </p>

      {/* Instant Transfer and Withdrawal */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">PayPal Instant Transfer and Withdrawal Fees</h2>
      <p className="text-foreground/90 mb-4">
        Standard withdrawal from your PayPal account to a UK bank account is free. Standard bank transfers typically clear within one to three business days. PayPal does not charge for this.
      </p>
      <p className="text-foreground/90 mb-4">
        If you need funds faster, PayPal offers an instant transfer option to an eligible UK debit card. This option carries a separate fee. PayPal updates this rate periodically, so check the current fee schedule in your PayPal account settings or at paypal.com/uk before relying on a specific figure.
      </p>
      <p className="text-foreground/90 mb-8">
        Currency conversion is charged separately from the transfer itself. If your PayPal balance is held in a foreign currency and you withdraw to a GBP account, PayPal applies its currency conversion charge before releasing funds to your bank.
      </p>

      {/* Currency Conversion */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">PayPal Currency Conversion Fees</h2>
      <p className="text-foreground/90 mb-4">PayPal charges 3% above the base exchange rate for all currency conversions. This applies when:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>You receive a payment in a currency different from your account's primary currency</li>
        <li>You withdraw funds that require conversion to GBP</li>
        <li>You send or spend in a currency you do not hold</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        A 3% margin above the interbank rate is substantially more expensive than specialist FX providers. For merchants regularly receiving payments in USD, EUR, or other currencies, holding balances in the received currency and converting via a lower-cost FX service when rates are favourable can reduce this cost meaningfully over time.
      </p>

      {/* Micropayments */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">PayPal Micropayments Pricing</h2>
      <p className="text-foreground/90 mb-4">
        For merchants selling low-value items where the standard 0.30 GBP fixed fee would take a disproportionate share of each sale, PayPal offers a Micropayments pricing option by application.
      </p>
      <p className="text-foreground/90 mb-2">Micropayments rates:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
        <li>Domestic: 5% + reduced fixed fee</li>
        <li>International: 6% + reduced fixed fee</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        The percentage rate is higher than the standard rate, but the fixed fee per transaction is lower. This structure benefits sellers with average transaction values below approximately 10 GBP, such as those selling digital downloads, individual articles, or in-game items. You need to apply to PayPal separately to access this pricing tier.
      </p>

      {/* Dark CTA */}
      <div style={{ background: "#0D1117", border: "1px solid #1F2937", borderRadius: "14px", padding: "2.5rem 2.8rem", margin: "3rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#10B981,#059669)" }} />
        <p style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem 0" }}>
          Free Consultation
        </p>
        <p style={{ color: "#F9FAFB", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
          Not sure if PayPal is the right fit for your business?
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.75rem 0" }}>
          Book a free 15-minute call with our team. We will help you work out whether PayPal, a dedicated payment gateway, or a different solution is actually the right fit for your volume, industry, and risk profile. No sales pitch. No strings attached.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#10B981", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", textDecoration: "none", letterSpacing: "0.02em" }}>
          Book a Free 15-Minute Call
        </a>
      </div>

      {/* Additional Fees */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Additional PayPal Fees UK Merchants Should Know</h2>
      <p className="text-foreground/90 mb-6">
        A number of less visible fees can appear on UK business accounts. The table below covers the ones most likely to catch merchants off guard.
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Fee Type</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["High-risk account surcharge", "Up to 5% additional per transaction"],
              ["Chargeback Protection Tool", "0.59% per transaction"],
              ["PayPal Payouts (mass payments)", "2% of transaction amount"],
              ["Website Payments Pro monthly fee", "20.00 GBP per month"],
              ["Recurring Payments Tool", "20.00 GBP per month"],
              ["Inactive account fee", "9.00 GBP"],
              ["PayPal Business Payments", "2.00 GBP per transaction"],
              ["Records Request", "10.00 GBP"],
              ["Account Verification Request", "0.20 GBP"],
              ["UK Business Debit Card Withdrawal", "1.00 GBP"],
              ["Bank return on withdrawal", "0.50 GBP"],
            ].map(([fee, amount], i) => (
              <tr key={fee} className={i % 2 === 1 ? "bg-muted/30" : ""}>
                <td className="border border-border px-4 py-3 text-foreground/90">{fee}</td>
                <td className="border border-border px-4 py-3 text-foreground/90">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-foreground/90 mb-8">
        The high-risk account surcharge is the one that surprises merchants most. If PayPal classifies your account as high-risk due to elevated chargeback rates, your business category, or other factors, it can add up to 5% per transaction on top of your standard rate. In that scenario, PayPal's effective cost can exceed any other mainstream payment provider. If your business operates in a category that any processor might consider elevated-risk, knowing your risk classification before choosing your payment stack is essential.
      </p>

      {/* Is PayPal the Right Payment Solution? */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Is PayPal the Right Payment Solution for Your Business?</h2>
      <p className="text-foreground/90 mb-4">
        PayPal works well for businesses in the early stages, for markets where PayPal has strong consumer trust, and for merchants who benefit from PayPal's name recognition at checkout. Its standard rates are competitive at low volumes, and setup requires no underwriting in most cases.
      </p>
      <p className="text-foreground/90 mb-4">
        At higher processing volumes, the economics shift. A dedicated merchant account through a mainstream payment processor typically offers lower effective rates, a cleaner integration, and better access to your own data. PayPal also classifies certain business types differently, which can mean restricted accounts or unexpected surcharges with little warning.
      </p>
      <p className="text-foreground/90 mb-8">
        If you are growing past the stage where a default payment button was enough, the question of whether PayPal, a dedicated gateway, or a blended setup makes more sense is worth answering properly.
      </p>

      <InlineAssessmentCTA
        context="Outgrowing PayPal's pricing? See which providers offer better rates for your volume."
        cta="Get your risk profile"
      />

      {/* FAQ */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Frequently Asked Questions</h2>
      <FAQAccordion faqs={faqItems} />
    </InsightsArticleLayout>
  );
};

export default PayPalFees;
