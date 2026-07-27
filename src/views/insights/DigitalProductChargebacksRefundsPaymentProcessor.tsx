'use client'
import { Link } from '@/lib/router-compat';
import { BOOKING_URL } from "@/lib/booking";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

const DigitalProductChargebacksRefundsPaymentProcessor = () => {
  const sources = [
    { name: "Chargebacks911 – Visa Acquirer Monitoring Program (VAMP) Breakdown", url: "https://chargebacks911.com/visa-acquirer-monitoring-program/", type: "industry" as const },
    { name: "Checkout.com – What Is the Mastercard Excessive Chargeback Program?", url: "https://www.checkout.com/blog/what-is-the-mastercard-excessive-chargeback-program", type: "official" as const },
  ];

  const faqItems = [
    {
      question: "What is the average chargeback rate for digital products?",
      answer: "The global average chargeback rate for digital goods is approximately 1.8%, compared to 0.5% for physical product ecommerce. This is driven by the absence of physical delivery confirmation, high rates of friendly fraud (customers disputing charges they actually authorised), and subscription billing disputes. Individual digital businesses can run well below this average with proper dispute prevention practices, but the category baseline is significantly higher than physical retail."
    },
    {
      question: "What is friendly fraud and why does it affect digital businesses more?",
      answer: "Friendly fraud is when a customer disputes a transaction they legitimately authorised - they received the product or service but file a chargeback claiming they did not. It accounts for approximately 75% of ecommerce chargebacks. Digital businesses are more exposed because there is no physical item to return, making the fraud lower risk for the customer. A customer who disputes a downloaded ebook or a SaaS subscription faces no consequence for the dispute beyond the processor's dispute investigation, whereas disputing a physical purchase they want to keep requires fabricating a return or damage claim."
    },
    {
      question: "At what chargeback rate will Stripe or PayPal suspend my account?",
      answer: "Stripe and PayPal do not publish their exact internal thresholds, but based on reported merchant experience, Stripe typically issues warnings at dispute rates approaching 1-2% and can initiate fund holds or account terminations above that range. Visa's card network excessive threshold is 1.5% as of April 2026. The practical advice is to treat 0.5% as your target and 1% as the point at which you need to take active remediation measures, before the processor takes action."
    },
    {
      question: "What is the Mastercard Excessive Chargeback Program?",
      answer: "Mastercard's ECP monitors merchant chargeback ratios. A merchant is designated an Excessive Chargeback Merchant (ECM) when they have 100 or more chargebacks per month and a ratio above 1.5% for two consecutive months. Fines begin in month 2 at $1,000/month, escalate to $5,000/month in months 4-6, and reach $25,000/month from month 7 onward. An additional Issuer Recovery Assessment of $5 per chargeback above the first 300 applies from month 4. The only exit from the program is three consecutive months below the threshold."
    },
    {
      question: "Should I offer refunds on digital products to avoid chargebacks?",
      answer: "For most digital products, a reasonable refund window (7-14 days, before the product has been substantially used) reduces chargebacks more than it costs in refunds. A customer who cannot get a refund from you will dispute the charge with their bank. A chargeback costs the transaction amount, a $15-25 dispute fee, and counts against your dispute ratio. A refund costs only the transaction amount (plus the lost processing fee on some platforms). The maths favours refunding unhappy customers. The risk to manage is customers who access the product fully and then request a refund - handle through download-tracking evidence and clear policy disclosure at checkout."
    },
    {
      question: "What evidence should I submit when disputing a chargeback on a digital product?",
      answer: "Effective chargeback response evidence for digital products includes: the original transaction receipt with timestamp and IP address, the email receipt sent to the customer, server access logs showing the product was downloaded or the account was logged into after purchase, any customer support communications related to the product, your refund and cancellation policy as displayed at checkout, and records showing the billing descriptor matches what the customer would have seen on their statement. Submit all of this as a single organized PDF through your processor's dispute response interface within the response window (typically 20-30 days from the chargeback notification)."
    },
    {
      question: "Does 3DS2 protect digital merchants from chargebacks?",
      answer: "3DS2 (3D Secure 2) shifts liability for fraudulent chargebacks from the merchant to the issuing bank when authentication is successful. If a cardholder's bank authenticated the transaction using 3DS2 and the customer then disputes it as unauthorised, the issuer bears the chargeback cost, not the merchant. This is called liability shift. 3DS2 does not protect against friendly fraud where the customer claims they did not receive the product - liability shift only applies to unauthorised transaction disputes. For digital businesses with high fraud exposure, 3DS2 is meaningful protection for the genuine fraud portion of their disputes."
    },
    {
      question: "What is the MATCH list and can it affect my business?",
      answer: "The MATCH list (Member Alert to Control High-Risk Merchants) is a Mastercard-maintained database of merchants terminated by acquirers for serious violations including excessive chargebacks beyond card network thresholds, fraud, and illegal activity. A MATCH listing remains active for five years and is checked by virtually every acquirer during underwriting. A listed business will be refused by most acquirers and has severely limited options for obtaining new merchant services. MATCH is not triggered by elevated but manageable dispute rates - it applies when an acquirer terminates a merchant for cause after the situation has escalated beyond network thresholds."
    },
  ];

  return (
    <InsightsArticleLayout
      title="Digital Product Chargebacks and Refunds: What Your Payment Processor Does About It"
      description="Digital goods have a 1.8% average chargeback rate - more than triple the rate for physical goods. Here is exactly what happens when disputes hit, what processors do, and what the fines look like at scale."
      category={{ name: "E-commerce", slug: "ecommerce" }}
      cluster="hub"
      currentSlug="digital-product-chargebacks-refunds-payment-processor"
      publishedTime="2026-06-01"
      modifiedTime="2026-06-01"
      keywords={[
        "digital product business risks chargebacks refunds payment processor", "digital product chargebacks",
        "chargeback prevention digital products", "digital goods payment processor",
        "chargeback rate digital products", "how to prevent chargebacks",
        "digital product merchant account", "refund policy digital products", "subscription chargeback",
      ]}
      sources={sources}
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        Digital Product Chargebacks and Refunds: What Your Payment Processor Does About It
      </h1>

      <p className="text-foreground/90 mb-4">
        Digital products - software, SaaS subscriptions, ebooks, online courses, downloadable templates, gaming items - have a chargeback rate that is more than triple the rate for physical goods. The global average for digital goods is 1.8%, compared to 0.5% for physical product ecommerce. That gap is not accidental. It reflects structural features of digital transactions: no physical delivery to confirm, no shipping signature, easier anonymity for bad actors, and a customer behaviour pattern called friendly fraud that accounts for approximately 75% of all ecommerce disputes.
      </p>
      <p className="text-foreground/90 mb-12">
        Payment processors are aware of this pattern. How they respond to it - through automated account risk models, reserve requirements, account suspensions, and card network fine passthrough - directly affects the financial stability of any digital product business. Understanding the mechanics before it becomes a problem is the whole point.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why Digital Products Generate More Chargebacks</h2>
      <p className="text-foreground/90 mb-4">
        <strong>No physical confirmation of delivery.</strong> When a physical product is disputed, the merchant can provide carrier tracking, delivery confirmation, and photos. For a digital download or SaaS subscription, the evidence of delivery is a server log, an email receipt, and access records - documentation that cardholders and their banks discount heavily because it cannot be independently verified by the cardholder the way a physical shipment can.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Friendly fraud is dominant.</strong> Friendly fraud is when a legitimate customer disputes a charge they actually authorised, with no intention of returning value. The cardholder received the digital product, used it, and then disputed the charge with their bank claiming they did not authorise it or did not receive it. Industry data places friendly fraud at around 75% of total ecommerce disputes, with digital goods disproportionately affected because there is no physical item to return, making the fraud lower risk for the perpetrator.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Subscription billing patterns.</strong> Recurring billing generates disputes when customers forget they subscribed, lose interest and dispute instead of cancelling, or dispute because they couldn't easily find the cancellation link. Subscription businesses are specifically monitored by card networks under programs designed to catch negative option billing abuses, and disputes on subscription charges are treated with additional scrutiny.
      </p>
      <p className="text-foreground/90 mb-8">
        <strong>High average ticket values in some categories.</strong> Software licenses, annual SaaS plans, and premium course fees can carry ticket values of $200-$2,000+. A single high-value dispute has more financial impact than multiple low-value ones, and large-ticket transactions on digital goods trigger fraud scoring more frequently.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Visa and Mastercard Dispute Thresholds in 2026</h2>
      <p className="text-foreground/90 mb-6">
        Card networks monitor merchant dispute ratios through formal compliance programs. Exceeding these thresholds triggers fines, mandatory dispute remediation plans, and ultimately account termination if the situation is not resolved.{" "}
        <a href="https://chargebacks911.com/visa-acquirer-monitoring-program/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chargebacks911's breakdown of the Visa VAMP program</a>{" "}
        covers the acquirer-side mechanics in detail.
      </p>
      <p className="text-foreground/90 mb-2">
        <strong>Visa - VAMP (Visa Acquirer Monitoring Program), effective January 2026:</strong>
      </p>
      <p className="text-foreground/90 mb-4">
        Visa consolidated its dispute and fraud monitoring into VAMP. The excessive threshold for merchants in North America, EU, and Asia-Pacific dropped from 2.2% to 1.5% as of April 2026.
      </p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>Excessive threshold (merchants): 1.5% of transactions</li>
        <li>Fine for excessive merchants: $8 per fraudulent or disputed transaction</li>
        <li>Fines are assessed against the acquirer and passed to the merchant</li>
      </ul>

      <p className="text-foreground/90 mb-4">
        <strong>
          <a href="https://www.checkout.com/blog/what-is-the-mastercard-excessive-chargeback-program" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mastercard - Excessive Chargeback Program (ECP)</a>:
        </strong>
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Designation</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Threshold</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Timeline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">Excessive Chargeback Merchant (ECM)</td>
              <td className="border border-border px-4 py-3 text-foreground/90">100+ chargebacks/month AND ratio above 1.5%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Two consecutive months</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">High Excessive Chargeback Merchant (HECM)</td>
              <td className="border border-border px-4 py-3 text-foreground/90">300+ chargebacks/month AND ratio above 3%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">As above</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-foreground/90 mb-2">Fine structure for ECM:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-4">
        <li>Month 1: Grace period (no fines, but counting begins)</li>
        <li>Months 2-3: $1,000/month</li>
        <li>Months 4-6: $5,000/month</li>
        <li>Month 7+: $25,000/month</li>
        <li>Additional Issuer Recovery Assessment from month 4: $5 per chargeback above the first 300</li>
        <li>Monthly reporting fee: $100</li>
      </ul>
      <p className="text-foreground/90 mb-6">
        HECM fines escalate faster: months 4-6 at $10,000/month, month 7+ at $50,000/month.
      </p>
      <p className="text-foreground/90 mb-8">
        For a digital subscription business processing $500,000/month with a 2% chargeback rate on Mastercard transactions, the exposure by month 7 is $25,000 in monthly fines plus the direct chargeback losses. At that point, the processor has almost certainly already suspended the account.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What Payment Processors Do When Chargeback Rates Rise</h2>
      <p className="text-foreground/90 mb-6">
        Processors do not wait for card network fines to arrive before acting. Their internal risk monitoring runs continuously, and the thresholds for internal action are lower than the card network thresholds.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Stripe:</strong> Stripe monitors dispute rates in real time. At elevated rates (the specific internal threshold is not published, but anecdotal evidence from suspended merchants puts it at 1-2%), Stripe sends a dispute rate warning. If the rate does not improve, Stripe can initiate a payout hold, freeze the account entirely, or begin a 90-180 day winding-down period during which new transactions are declined and existing balances are held. Fund release after Stripe terminates an account typically takes 90-180 days, covering potential chargeback windows.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>PayPal:</strong> PayPal implements a similar approach. A seller above PayPal's dispute threshold (1% for most categories) receives a warning. Continued elevated dispute rates result in limitations on the account - restricted withdrawals, declined payments, or full suspension. PayPal's limited account status can persist for extended periods, with fund holds timed to the dispute resolution window on existing transactions.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Square:</strong> Square's system monitors dispute rates and can hold payouts for up to 30 days in the first instance, escalating to account deactivation if dispute patterns continue. Square's Seller Protection program provides some coverage for qualifying transactions, but digital goods merchants often do not meet the eligibility criteria.
      </p>
      <p className="text-foreground/90 mb-8">
        <strong>Traditional acquirers with direct merchant accounts:</strong> Banks and specialist high-risk acquirers typically provide advance notice (30-90 days) before account termination, a formal dispute remediation plan process, and defined contractual procedures. This is a meaningful difference from aggregator platforms in terms of business continuity - not because they are more lenient, but because the contractual relationship is more formal.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Real Cost of a Chargeback</h2>
      <p className="text-foreground/90 mb-6">
        The visible cost of a chargeback is the transaction amount refunded to the cardholder. The full cost is considerably higher.
      </p>
      <p className="text-foreground/90 mb-4">Per-chargeback costs for a typical digital merchant:</p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Cost Component</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Typical Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Transaction amount refunded", "$20-$500 (varies by product)"],
              ["Processor dispute fee", "$15-$25 per chargeback"],
              ["Lost product/service", "Full cost of delivery"],
              ["Dispute management time", "30-60 minutes per dispute"],
              ["Network monitoring program fees (if threshold exceeded)", "$8-$25 per dispute + flat fees"],
              ["Reserve held by processor", "5-10% of monthly volume"],
            ].map(([item, amt], i) => (
              <tr key={item} className={i % 2 === 1 ? "bg-muted/30" : ""}>
                <td className="border border-border px-4 py-3 text-foreground/90">{item}</td>
                <td className="border border-border px-4 py-3 text-foreground/90">{amt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-foreground/90 mb-2">For a SaaS business with a $99/month subscription and 50 chargebacks in a month:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>$4,950 in refunded transactions</li>
        <li>$1,000-$1,250 in processor dispute fees</li>
        <li>Network program risk if the ratio exceeds threshold</li>
        <li>Account review triggered</li>
      </ul>
      <p className="text-foreground/90 mb-8">
        The dispute fee alone - $15-$25 per chargeback charged by most processors regardless of whether the merchant wins the dispute - makes high chargeback rates expensive even when the merchant successfully disputes each one.
      </p>

      {/* Dark CTA */}
      <div style={{ background: "#0D1117", border: "1px solid #1F2937", borderRadius: "14px", padding: "2.5rem 2.8rem", margin: "3rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#10B981,#059669)" }} />
        <p style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem 0" }}>
          Free Consultation
        </p>
        <p style={{ color: "#F9FAFB", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
          Running a digital product business with elevated chargebacks?
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.75rem 0" }}>
          Book a free 15-minute call with our team. We will help you understand where your dispute rate actually stands and which processors are built to support digital goods at your volume. No sales pitch. No strings attached.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#10B981", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", textDecoration: "none", letterSpacing: "0.02em" }}>
          Book a Free 15-Minute Call
        </a>
      </div>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Refunds vs Chargebacks: The Practical Calculation</h2>
      <p className="text-foreground/90 mb-4">
        A refund issued by the merchant costs only the lost revenue and any payment processing fee that may or may not be returned depending on the processor's refund policy. A chargeback costs the revenue, the dispute fee, counts against the dispute ratio, and consumes staff time in evidence gathering and response.
      </p>
      <p className="text-foreground/90 mb-4">
        For digital products, the refund vs chargeback maths is often simple: issue the refund. A $99 software refund costs $99 (plus the lost acquisition cost). The same transaction becoming a chargeback costs $99 + $15-25 dispute fee + the ratio impact. At scale, a generous refund policy for unhappy customers reduces chargeback exposure materially.
      </p>
      <p className="text-foreground/90 mb-4">
        The complication is abuse of generous refund policies: customers who purchase, download, and then request a refund, receiving both the product and their money. Digital product merchants handle this through download tracking (has the file been accessed?), licence revocation on refund (software keys), and explicit no-refund policies for accessed or activated products with clear pre-purchase disclosure.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Stripe's refund fee policy:</strong> Stripe does not return the original processing fee on refunds. On a $99 transaction with 2.9% + 30¢ = $3.17 in fees, the merchant refunds $99 to the customer but loses $3.17 to Stripe regardless. Full cost of a friendly refund: $99 + $3.17.
      </p>
      <p className="text-foreground/90 mb-8">
        <strong>PayPal's refund fee policy:</strong> PayPal does not return processing fees on refunds for US merchants as of 2023. The same calculation applies.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Chargeback Prevention for Digital Products</h2>
      <p className="text-foreground/90 mb-4">
        <strong>Transaction descriptors:</strong> The single highest-ROI change for most digital businesses with elevated chargebacks is the billing descriptor. When a customer sees an unfamiliar name on their card statement, they dispute it. The descriptor should be recognisable: the business name as it appears in marketing materials, optionally with a support phone number (Stripe and PayPal both allow a phone number to be appended to the descriptor). A descriptor like "CHOSEPAYMENTS.COM +1555000000" gives the customer a path to contact before disputing.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Email receipts with cancellation instructions:</strong> For subscriptions, the receipt email sent at the time of each billing should include the cancellation link or instructions. Removing ambiguity about how to cancel reduces "I didn't know how to stop it" disputes - a meaningful category of friendly fraud that is more effectively treated as a customer service failure than deliberate abuse.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>3DS2 for card-not-present transactions:</strong> 3D Secure 2 (3DS2) is a cardholder authentication protocol that shifts liability for fraudulent disputes from the merchant to the issuer. When a transaction passes 3DS2 authentication successfully, a fraudulent chargeback becomes the issuer's liability, not the merchant's. 3DS2 adds friction to checkout for a subset of transactions (those the issuer flags for challenge), but it eliminates merchant liability on confirmed fraud disputes. Stripe Radar, Adyen's authentication management, and Checkout.com's 3DS implementation all support 3DS2 with configurable exemption rules.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Purchase documentation and access logs:</strong> For every digital transaction, log the IP address, timestamp, email address used, and access events (logins, downloads, activations). When responding to a chargeback, this evidence demonstrates the product was accessed by the cardholder's device after purchase. Card network dispute resolution includes an evidence submission window (typically 20-30 days) in which the merchant can upload this documentation.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Subscription reminder emails:</strong> An email sent 7 days before each subscription renewal, clearly stating the amount and date of the upcoming charge, reduces disputes from customers who forgot they were subscribed. For annual subscriptions especially, customers often dispute the renewal charge simply because they forgot. A reminder email is a cheap intervention.
      </p>
      <p className="text-foreground/90 mb-8">
        <strong>Clear refund policy disclosure at checkout:</strong> If your digital products are non-refundable after access (a reasonable policy for most downloadable content), that policy must be clearly visible at the point of purchase and confirmed by checkbox or equivalent. A refund policy buried in terms of service that the customer has to actively find provides weak evidence in a dispute. A refund policy displayed at checkout with explicit acknowledgement provides strong evidence.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">How Processors Evaluate Your Chargeback History When Underwriting</h2>
      <p className="text-foreground/90 mb-4">
        When applying for a new merchant account - either after being terminated by an aggregator or when seeking better rates from a direct acquirer - your dispute history is part of the underwriting process. Processors request up to 12 months of processing statements and dispute records. A prior chargeback ratio above 1% will result in higher reserve requirements or outright refusal from most acquirers.
      </p>
      <p className="text-foreground/90 mb-4">
        The MATCH list (Member Alert to Control High-Risk Merchants), maintained by Mastercard, flags businesses that were terminated for cause by an acquirer. A MATCH listing is serious: virtually every acquirer checks the MATCH list at underwriting, and a listing makes obtaining a new merchant account extremely difficult for 5 years. MATCH is reserved for the most serious violations (fraud, excessive chargebacks beyond the network thresholds, illegal activity), but understanding it exists is important context for any digital business managing dispute exposure.
      </p>
      <p className="text-foreground/90 mb-8">
        The practical implication: managing chargebacks proactively, before they trigger processor action, is less expensive and less disruptive than managing the consequences after a processor takes action. Understanding{" "}
        <Link to="/insights/payment-processor-business-vertical-classification" className="text-primary hover:underline">how your business vertical is classified by payment processors</Link>{" "}
        is the related question - your MCC and your chargeback history are evaluated together when a processor decides whether to keep your account. A chargeback rate of 0.5-0.7% is manageable for most processors. A rate above 1% starts generating intervention. A rate above 1.5% generates network-level fines and account terminations.
      </p>

      <InlineAssessmentCTA
        context="Managing elevated chargebacks on digital products? Find out which processors are actually built to support your dispute profile."
        cta="Get your risk profile"
      />

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Frequently Asked Questions</h2>
      <FAQAccordion faqs={faqItems} />
    </InsightsArticleLayout>
  );
};

export default DigitalProductChargebacksRefundsPaymentProcessor;
