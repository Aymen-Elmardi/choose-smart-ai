'use client'
import { Link } from '@/lib/router-compat';
import { BOOKING_URL } from "@/lib/booking";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

const PaymentProcessorBusinessVerticalClassification = () => {
  const sources = [
    { name: "Stripe – Merchant Category Codes Reference Guide", url: "https://stripe.com/guides/merchant-category-codes", type: "official" as const },
    { name: "Visa – Merchant Data Standards Manual (VIRP)", url: "https://usa.visa.com/content/dam/VCOM/download/merchants/visa-merchant-data-standards-manual.pdf", type: "regulatory" as const },
  ];

  const faqItems = [
    {
      question: "What is a merchant category code (MCC)?",
      answer: "An MCC is a four-digit number defined by ISO 18245 that classifies the type of goods or services a business provides. Visa and Mastercard use MCCs to determine interchange rates, apply risk classification, and enforce compliance requirements. The code is assigned by the acquirer or payment processor during merchant account setup, not chosen by the merchant."
    },
    {
      question: "Can I choose my own MCC?",
      answer: "No. MCCs are assigned by the acquiring bank or payment processor based on the business type described during onboarding. Merchants can request a review if they believe the assigned code is incorrect, but the processor makes the final determination. Deliberately misrepresenting a business to obtain a more favorable MCC is a violation of card network rules and can result in account termination and network-level banning (MATCH listing)."
    },
    {
      question: "What makes a business vertical \"high risk\" for payment processing?",
      answer: "High-risk classification stems from one or more of: elevated industry-wide chargeback rates, regulatory complexity (gambling laws, pharmaceutical regulations, age verification requirements), reputational risk to the card network, high rates of fraud, or negative option billing models that generate disputes. The designation reflects the industry pattern, not the individual business's conduct. A cleanly run CBD business is still classified as high risk because the broader category has patterns that the card networks treat as elevated risk."
    },
    {
      question: "Will Stripe or PayPal process payments for a high-risk MCC?",
      answer: "Stripe and PayPal both maintain prohibited business lists that exclude specific high-risk categories including adult content, certain firearms products, some pharmaceutical and supplement verticals, and online gambling. Businesses in prohibited categories are declined at sign-up or terminated after onboarding once automated monitoring identifies the mismatch. Both platforms can also terminate accounts in elevated-risk categories that are technically permitted but generate dispute patterns their risk models flag. If your MCC is in a high-risk tier, you need a specialist acquirer, not an aggregator."
    },
    {
      question: "How does an MCC affect my interchange rate?",
      answer: "Visa and Mastercard publish interchange rates that vary by MCC, card type, and transaction method. Some MCCs qualify for preferred interchange categories (like utilities or fuel, which have lower rates), while others face higher-than-standard rates. High-risk MCCs may be ineligible for certain interchange programs entirely. On a flat-rate plan like Stripe's 2.9% + 30¢, this doesn't matter - you pay the same rate regardless. On interchange-plus pricing, your MCC directly affects what you pay on every transaction."
    },
    {
      question: "What is the difference between an MCC and an SIC code?",
      answer: "SIC (Standard Industrial Classification) codes are a US government classification system used for statistical and regulatory purposes, maintained by the SEC and IRS. MCCs are a payment industry classification used by card networks. They are not the same system, and the codes do not map directly to each other. A business may have one SIC code for tax filing purposes and a different MCC for payment processing purposes. The MCC is what matters for card acceptance and interchange rates."
    },
    {
      question: "What is Visa's VIRP and does it affect my business?",
      answer: "Visa's Integrity Risk Program (VIRP) replaced the Global Brand Protection Program in May 2023. It requires acquirers to register merchants operating in specific high-risk categories directly with Visa, conduct enhanced due diligence, and maintain ongoing compliance monitoring. Businesses in VIRP-registered categories (primarily gambling, adult content, and certain pharmaceutical MCCs) need a Visa-approved acquirer that is set up to handle VIRP compliance - most mainstream processors are not. Operating in a VIRP category without proper registration exposes the acquirer to fines, which is why most acquirers simply refuse these merchants."
    },
    {
      question: "Can my MCC change after I open a merchant account?",
      answer: "Yes, and it can happen in either direction. If a processor's risk team reviews your account and determines the assigned code does not match your actual products or business model, they can reclassify you - which may increase your risk tier, change your interchange rates, and trigger reserve requirements. This often happens when a business expands into new product categories or when automated monitoring picks up transaction patterns inconsistent with the assigned MCC. It can also happen when you request a correction. Periodic review of your MCC, particularly after material business changes, is good practice."
    },
  ];

  return (
    <InsightsArticleLayout
      title="How Payment Processors Classify Your Business Vertical (and Why It Matters)"
      description="Payment processors assign a four-digit MCC code to every merchant that determines your interchange rate, whether you can get approved, and how much risk scrutiny your account receives. Here is how the classification works."
      category={{ name: "Compliance", slug: "compliance" }}
      cluster="hub"
      currentSlug="payment-processor-business-vertical-classification"
      publishedTime="2026-06-01"
      modifiedTime="2026-06-01"
      keywords={[
        "payment processor business vertical classification", "business vertical payments", "merchant category code",
        "mcc codes", "high risk business vertical", "payment processor risk classification",
        "what is a business vertical", "merchant category codes list", "sic code payments",
      ]}
      sources={sources}
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        How Payment Processors Classify Your Business Vertical (and Why It Matters)
      </h1>

      <p className="text-foreground/90 mb-4">
        When a business applies for a merchant account or signs up with a payment processor, one of the first things that happens is classification. The processor assigns a four-digit Merchant Category Code (MCC) to the business, and that code determines almost everything that follows: the interchange rate applied to every transaction, whether specific processors will accept the business at all, the level of compliance scrutiny from the card networks, and the reserve requirements the processor will impose.
      </p>
      <p className="text-foreground/90 mb-12">
        Most business owners never see their MCC and don't know what it is. That's a problem, because an incorrect classification can cost real money, and a classification in the wrong risk tier can result in the processor closing an account entirely.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What a Merchant Category Code Is</h2>
      <p className="text-foreground/90 mb-4">
        MCCs are four-digit codes defined by ISO 18245, adopted by Visa and Mastercard as the standard way to classify merchant business type. The ISO standard was introduced in 1987. Visa and Mastercard maintain their own versions of the code set, with some minor differences in specific categories.
      </p>
      <p className="text-foreground/90 mb-6">
        There are approximately 600 MCC codes in active use. Each one corresponds to a specific type of business.{" "}
        <a href="https://stripe.com/guides/merchant-category-codes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe's MCC reference guide</a>{" "}
        is one of the more readable public databases of active codes. A garden centre and a pharmaceutical retailer both accept card payments, but they operate under different MCCs with different interchange rates and different risk profiles. When a cardholder pays a garden centre on a Visa Signature Rewards card, the interchange rate might be 1.65% + 10¢. The same card at a pharmaceutical retailer may carry a different rate. Across millions of transactions, these differences are material.
      </p>

      <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">How MCCs are assigned</h3>
      <p className="text-foreground/90 mb-4">
        The acquirer or payment processor assigns the MCC at the point of underwriting. For direct merchant accounts (traditional acquiring relationships), the underwriter reviews the application, understands the business model, and assigns the appropriate code. For payment aggregators like Stripe, Square, or PayPal, MCC assignment happens through automated systems based on the business description provided during sign-up.
      </p>
      <p className="text-foreground/90 mb-8">
        Businesses do not choose their own MCC. If you describe your business as software-as-a-service, you may be classified under 7372 (Computer Programming, Data Processing). If you describe it as an online game, you may be classified under 5816. The difference between those two codes is significant in terms of risk classification and processing fees.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Standard MCCs vs High-Risk MCCs</h2>
      <p className="text-foreground/90 mb-6">
        Card networks and processors segment MCCs into risk tiers. The specific names vary by network, but the structure is broadly consistent.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Standard MCCs</strong> cover the majority of retail, service, restaurant, hotel, and business-to-business categories. These carry normal interchange rates and receive no additional compliance scrutiny. Examples: 5411 (Grocery stores), 5812 (Restaurants), 7372 (Computer Programming), 4900 (Utilities).
      </p>
      <p className="text-foreground/90 mb-6">
        <strong>High-risk MCCs</strong> are codes that card networks have designated as carrying elevated fraud, chargeback, or regulatory risk. Merchants in these categories face:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-8">
        <li>Higher interchange rates on some card types</li>
        <li>Additional compliance requirements under network programs (Visa's VIRP, Mastercard's High-Risk Merchant programs)</li>
        <li>Refusal from many mainstream processors</li>
        <li>Mandatory reserve requirements from acquirers willing to underwrite them</li>
      </ul>

      <p className="text-foreground/90 mb-4">Specific high-risk MCCs and their Visa/Mastercard tier classifications:</p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">MCC</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Category</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Visa/MC Risk Tier</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Typical Concern</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["5816", "Games of skill (card-not-present)", "Tier 2", "Elevated chargebacks, regulatory"],
              ["5967", "Direct marketing - inbound teleservices / adult content", "Tier 1 (highest)", "Fraud, regulatory, reputational"],
              ["7801", "Government-licensed online casinos (US only)", "Tier 1", "Regulatory, gambling laws"],
              ["7995", "Betting, lottery, casino gaming chips, race track wagers", "Tier 1", "Regulatory, gambling laws"],
              ["5912", "Drug stores and pharmacies (used for CBD/supplements)", "Elevated", "Regulatory, controlled substance adjacency"],
              ["5993", "Cigar stores and stands (tobacco/vaping)", "Elevated", "Age verification, regulatory"],
              ["7994", "Video game arcades (used for some gaming platforms)", "Elevated", "Chargeback patterns"],
              ["5999", "Miscellaneous and specialty retail", "Processor-defined", "Catch-all, used when no specific code fits"],
              ["6211", "Security brokers and dealers", "Elevated", "Regulatory, financial services"],
              ["7841", "Video tape rental (used for some streaming services)", "Standard-to-elevated", "Subscription dispute patterns"],
            ].map(([mcc, cat, tier, concern], i) => (
              <tr key={mcc} className={i % 2 === 1 ? "bg-muted/30" : ""}>
                <td className="border border-border px-4 py-3 text-foreground/90">{mcc}</td>
                <td className="border border-border px-4 py-3 text-foreground/90">{cat}</td>
                <td className="border border-border px-4 py-3 text-foreground/90">{tier}</td>
                <td className="border border-border px-4 py-3 text-foreground/90">{concern}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-foreground/90 mb-8">
        Tier 1 under Visa's Integrity Risk Program (VIRP) - which replaced the Global Brand Protection Program in May 2023 - represents the highest compliance obligation. Acquirers accepting Tier 1 merchants must conduct enhanced due diligence, submit merchant information to Visa for registration, and maintain ongoing monitoring reports. This compliance overhead is why most mainstream processors refuse Tier 1 verticals entirely.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What Visa's VIRP and Mastercard's High-Risk Programs Mean for Merchants</h2>
      <p className="text-foreground/90 mb-4">
        <strong>
          <a href="https://usa.visa.com/content/dam/VCOM/download/merchants/visa-merchant-data-standards-manual.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visa Integrity Risk Program (VIRP)</a>:
        </strong>{" "}
        Since May 2023, Visa requires acquirers to register merchants operating in specific high-risk categories with Visa directly. Unregistered high-risk merchants are a compliance liability for the acquirer. If discovered, the acquirer faces fines. The result is that acquirers either refuse high-risk merchants or apply rigorous due diligence processes that many high-risk businesses cannot pass with a standard application.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Mastercard High-Risk Merchant Registration:</strong> Mastercard maintains a similar registration framework. Merchants in gambling, adult content, and certain pharmaceutical categories must be registered with Mastercard through their acquirer. The acquirer takes on compliance responsibility for those merchants' conduct.
      </p>
      <p className="text-foreground/90 mb-8">
        <strong>Practical effect:</strong> Any business in a Tier 1 or VIRP-registered category applying to Stripe, Square, or PayPal will typically be declined at sign-up, or accepted initially and then terminated when automated systems flag the MCC or transaction patterns. These aggregators operate on a model of automated onboarding that cannot accommodate the compliance requirements of registered high-risk merchants.
      </p>

      {/* Dark CTA */}
      <div style={{ background: "#0D1117", border: "1px solid #1F2937", borderRadius: "14px", padding: "2.5rem 2.8rem", margin: "3rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#10B981,#059669)" }} />
        <p style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem 0" }}>
          Free Consultation
        </p>
        <p style={{ color: "#F9FAFB", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
          Not sure what MCC your business will be assigned?
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.75rem 0" }}>
          Book a free 15-minute call with our team. We will help you understand how your business is likely to be classified and which processors are actually built to underwrite that category. No sales pitch. No strings attached.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#10B981", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", textDecoration: "none", letterSpacing: "0.02em" }}>
          Book a Free 15-Minute Call
        </a>
      </div>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">How Business Vertical Classification Affects Your Costs</h2>
      <p className="text-foreground/90 mb-4">
        <strong>Interchange rates:</strong> MCCs directly influence interchange rates because Visa and Mastercard set different rates for different merchant types. A business classified as a standard grocery store on a Visa credit card transaction pays interchange of around 1.22% + 5¢. A business classified under a high-risk MCC may pay elevated rates, and on some card types may be ineligible for preferred interchange programs.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Processing fees:</strong> High-risk processors charge significantly more than standard-rate processors, reflecting the underwriting risk they're taking on. A standard ecommerce merchant might pay 2.9% + 30¢ on Stripe. A comparable business in a high-risk vertical with a specialist acquirer might pay 3.5-5% + various per-transaction fees, depending on the specific category, chargeback history, and processing volume.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>Reserve requirements:</strong> High-risk merchant accounts routinely include rolling reserves of 5-10% of monthly volume, held for 90-180 days. An upfront reserve of 1-3 months' estimated processing volume is also common for new high-risk accounts. On $100,000/month in processing, a 10% rolling 180-day reserve means $60,000 in held funds at steady state.
      </p>
      <p className="text-foreground/90 mb-8">
        <strong>Application acceptance rates:</strong> Many processors maintain a prohibited business list. Stripe's list explicitly includes certain firearms dealers, drug paraphernalia, certain subscription services with negative option billing, adult content, and regulated financial services. PayPal prohibits a similar list. An MCC in these categories results in application rejection or account termination regardless of the individual business's conduct.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">How to Find Your MCC</h2>
      <p className="text-foreground/90 mb-4">
        <strong>For businesses on Stripe:</strong> MCCs are available in the Stripe Dashboard under Business settings. Stripe allows merchants to request a review of their assigned MCC if they believe it is incorrect.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>For businesses on Square:</strong> MCCs are not displayed directly in the Square dashboard, but Square's support team can provide the assigned code on request.
      </p>
      <p className="text-foreground/90 mb-4">
        <strong>For businesses with a traditional acquiring bank:</strong> The MCC appears on merchant account statements and in the merchant agreement paperwork. It can also be retrieved from the acquirer's support team.
      </p>
      <p className="text-foreground/90 mb-8">
        <strong>For any business:</strong> the MCC can also be inferred by running a test transaction through a tool like Visa's Merchant Category Code Lookup tool or by checking a card statement - the descriptor and merchant category are often visible in the transaction detail.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What to Do If Your MCC Is Wrong</h2>
      <p className="text-foreground/90 mb-4">Incorrect MCC assignment happens, particularly on automated platforms. Common errors:</p>
      <ul className="list-disc pl-6 space-y-2 text-foreground/90 mb-6">
        <li>A SaaS company classified as a direct marketing company (5967) instead of software (7372), placing them in a Tier 1 risk category</li>
        <li>A fitness coaching business classified as a gym (7941) instead of professional services, affecting interchange rates</li>
        <li>An ecommerce business selling CBD-adjacent wellness products classified under a standard health/beauty code, then re-classified as 5912 when product descriptions were reviewed</li>
      </ul>
      <p className="text-foreground/90 mb-4">If the assigned MCC is incorrect, the process to correct it is:</p>
      <ol className="list-decimal pl-6 space-y-2 text-foreground/90 mb-6">
        <li>Contact the payment processor or acquirer's underwriting or risk team directly</li>
        <li>Provide documentation of the actual business model: website, product descriptions, sample invoices</li>
        <li>Request formal reclassification with the correct MCC</li>
        <li>On aggregator platforms, expect this process to take 5-20 business days and to require direct communication with a risk analyst</li>
      </ol>
      <p className="text-foreground/90 mb-8">
        If the MCC is correct and it is placing the business in a high-risk category, the solution is not to dispute the classification but to find a processor that is set up to handle that specific vertical. Operating in a high-risk MCC with a processor that doesn't support that category is not stable - the account will eventually be terminated when the mismatch is identified.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Relationship Between MCCs, Business Verticals, and Processor Selection</h2>
      <p className="text-foreground/90 mb-4">
        The most common mistake businesses in elevated-risk verticals make is choosing a processor based on price and simplicity, ignoring whether that processor's underwriting model can actually sustain their business category. Stripe is cheap and fast to set up. It is not set up to underwrite nutraceutical subscription businesses, online gambling adjacent platforms, or adult content. A business in those categories will be terminated, and the process of getting funds released can take 90-180 days.
      </p>
      <p className="text-foreground/90 mb-8">
        The right processor selection for a high-risk MCC starts with identifying who actually underwrites that vertical, what their reserve requirements are, what compliance documentation they require, and what contractual protection exists if the account is reviewed. That's a different evaluation than comparing flat transaction rates. If your business is in the digital goods space, also read about{" "}
        <Link to="/insights/digital-product-chargebacks-refunds-payment-processor" className="text-primary hover:underline">digital product chargeback rates and what processors do about them</Link>{" "}
        - chargeback history is a second underwriting variable on top of the MCC.
      </p>

      <InlineAssessmentCTA
        context="Not sure which MCC your business will be assigned, or whether your current processor actually supports your vertical?"
      />

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Frequently Asked Questions</h2>
      <FAQAccordion faqs={faqItems} />
    </InsightsArticleLayout>
  );
};

export default PaymentProcessorBusinessVerticalClassification;
