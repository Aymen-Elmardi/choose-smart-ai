'use client'
import Link from 'next/link';
import type { ReactNode } from "react";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";

const BASE_URL = "https://chosepayments.com";
const SLUG = "high-risk-ecommerce-payment-processing";
const PAGE_URL = `${BASE_URL}/${SLUG}`;
const HEADLINE = "High-Risk Ecommerce Payment Processing: How Merchant Accounts, Reserves and Approval Work";
const DESCRIPTION =
  "What makes ecommerce high risk, 2026 Visa chargeback thresholds, reserves and costs, how underwriting works, and how to get approved and stay stable.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-10-30";
const COVER = `/insights/${SLUG}-cover.jpg`;
const AUTHORS = "Aymen Elmardi (Payments Expert) and Madalsa Bhat (Growth Expert)";

// One list for the visible FAQ and the FAQPage schema, so the two always match.
const faqs = [
  {
    question: "What is a high-risk merchant account?",
    answer:
      "A merchant account for businesses that card networks and acquiring banks expect to produce more chargebacks, fraud or regulatory trouble than average. It usually comes with individual underwriting, higher rates and a reserve. It describes how a provider scores your exposure, not whether your business is legitimate.",
  },
  {
    question: "What makes an ecommerce business high risk?",
    answer:
      "Five things: the industry, the business model, your chargeback and refund history, unusual sales patterns, and where your customers are. Pre-orders, recurring billing, high-ticket items, cross-border sales and fast growth all raise a provider's exposure. A business in a normal category can still be treated as high risk after a dispute spike.",
  },
  {
    question: "What chargeback rate is too high?",
    answer:
      "For Visa, the merchant threshold is a VAMP ratio of 1.5% with at least 1,500 fraud reports and disputes in a month, in force in the US since 1 April 2026. Many acquirers act much earlier, often around 0.6% to 0.75%, so your provider's limit is usually the one that matters. Mastercard's program figures should be confirmed with your acquirer.",
  },
  {
    question: "How much does a high-risk merchant account cost?",
    answer:
      "Vendor sources quote roughly 3.49% to 3.95% plus $0.25 per transaction, $10 to $50 in base monthly fees and $25 to $60 more in PCI, gateway and statement fees. A blended cost under 4% is often called good, and 4.5% to 6% is called overpaying. These are provider-published ranges, not a benchmark, so compare real quotes.",
  },
  {
    question: "How much is a rolling reserve?",
    answer:
      "Commonly 5% to 10% of processing volume, held for 90 to 180 days, and higher for riskier profiles. At 10% held for 180 days on $50,000 a month, about $30,000 of your cash is tied up at any time. Your category, volume, history and principals' credit set the real figure, and it can often be negotiated.",
  },
  {
    question: "Can I get a high-risk merchant account with bad credit?",
    answer:
      "Often yes, but expect a reserve. Underwriters usually review the principals' personal credit, and weak credit or a past MATCH listing commonly leads to higher reserves or pricing. A clean website, clear policies and good documents help offset it.",
  },
  {
    question: "What is the MATCH list and how long does a listing last?",
    answer:
      "MATCH is Mastercard's database of terminated merchants, and a listing lasts five years. Acquirers add a merchant after terminating it for reasons such as excessive chargebacks, excessive fraud, laundering or PCI non-compliance. Being listed does not bar you from every account, but it narrows your options and usually brings a reserve.",
  },
  {
    question: "Do I need a high-risk account for CBD, supplements or subscriptions?",
    answer:
      "It depends on the category and how you sell. Stripe prohibits some categories outright and requires approval for others, such as CBD, tobacco and vape, and travel reservations. Subscription businesses are often accepted when pricing, trials and cancellation are clear. Check your provider's published list before applying.",
  },
  {
    question: "Why did Stripe, Square or PayPal reject or freeze my account?",
    answer:
      "Their approval is automated and built on category codes, transaction patterns and dispute levels, so a flagged category or a spike can trigger a rejection or hold. It is a risk-model decision, not a judgment of your business. Providers that underwrite merchants individually are the usual alternative.",
  },
  {
    question: "How do I move from high risk to a standard account?",
    answer:
      "Process cleanly for 6 to 12 months, keep disputes low, hold volume steady and keep records tidy. Then ask your provider for repricing, a lower reserve or a shorter hold, or apply to a standard provider with your processing history as evidence.",
  },
];

// Listed in the body (not the layout's sources block) so the brief's note can
// sit directly under them.
const sources = [
  {
    name: "Visa Acquirer Monitoring Program fact sheet",
    url: "https://corporate.visa.com/content/dam/VCOM/corporate/visa-perspectives/security-and-trust/documents/visa-acquirer-monitoring-program-fact-sheet-2025.pdf",
  },
  { name: "Stripe: Prohibited and Restricted Businesses", url: "https://stripe.com/legal/restricted-businesses" },
  {
    name: "Mastercard Security Rules and Procedures, Merchant Edition (section 8.3, Excessive Chargeback Program)",
    url: "https://www.mastercard.com/content/dam/mccom/shared/business/support/rules-pdfs/SPME-Manual.pdf",
  },
  {
    name: "Visa Acceptance Risk Standards",
    url: "https://usa.visa.com/dam/VCOM/download/merchants/visa-acceptance-risk-standards.pdf",
  },
];

// The brief's schema, with both authors (its author list had only one, and a
// trailing comma), the real publish date and the cover image, which now exists.
// Rendered in the page HTML, not injected after load.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: HEADLINE,
      description: DESCRIPTION,
      mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      author: [
        { "@type": "Person", name: "Aymen Elmardi", jobTitle: "Payments Expert" },
        { "@type": "Person", name: "Madalsa Bhat", jobTitle: "Growth Expert" },
      ],
      publisher: {
        "@type": "Organization",
        name: "ChosePayments",
        url: BASE_URL,
        logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-mark.png` },
      },
      image: `${BASE_URL}${COVER}`,
      inLanguage: "en-US",
      about: ["High-risk merchant accounts", "Ecommerce payment processing"],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

const toc = [
  ["what-is-high-risk-ecommerce-payment-processing", "What high-risk ecommerce payment processing is"],
  ["what-makes-an-ecommerce-business-high-risk", "What makes a business high risk"],
  ["which-ecommerce-categories-are-treated-as-high-risk", "Which categories are treated as high risk"],
  ["why-do-stripe-square-and-paypal-reject-or-freeze-high-risk-merchants", "Why Stripe, Square and PayPal reject or freeze merchants"],
  ["what-chargeback-rate-is-too-high-in-2026", "Chargeback thresholds in 2026"],
  ["what-is-the-match-list", "The MATCH list"],
  ["how-does-high-risk-underwriting-work", "How underwriting works"],
  ["which-type-of-provider-accepts-high-risk-merchants", "Types of providers compared"],
  ["how-much-does-a-high-risk-merchant-account-cost", "What it costs"],
  ["how-do-you-get-approved-for-a-high-risk-merchant-account", "How to get approved"],
  ["contract-red-flags-to-check-before-you-sign", "Contract red flags"],
  ["what-to-do-if-your-account-is-frozen-or-terminated", "If you were frozen or terminated"],
  ["how-to-move-from-high-risk-to-a-standard-account", "Moving to a standard account"],
  ["your-situation-your-next-step", "Your situation, your next step"],
  ["frequently-asked-questions", "FAQ"],
];

const signals = [
  ["Money taken weeks before delivery", "Longer window for disputes and non-delivery claims"],
  ["Recurring billing with hard-to-find cancellation", "Higher dispute and complaint risk"],
  ["Average order value far above your category norm", "Fraud or laundering concern"],
  ["Volume jumps 5x in a month", "Possible card testing or unstable operations"],
  ["Refund rate above category norm", "Product or fulfillment problems"],
  ["Website without refund policy, contact details or clear product descriptions", "Hard to verify, higher consumer-complaint risk"],
  ["Processing history from a prior provider shows disputes", "Likely to repeat, so price and reserve it"],
];

const stripeCategories = [
  [
    "Prohibited",
    "Adult content and services, gambling and contests with prizes, cannabis products, debt relief, counterfeit goods, pyramid and multilevel marketing schemes, negative option marketing and reduced-price trials with unclear pricing, supplements that are unsafe or make harmful claims, timeshares",
  ],
  [
    "Restricted (needs approval)",
    "CBD with negligible THC, tobacco and e-cigarettes, online pharmacies and telemedicine, cryptocurrency exchanges, lending and investment services, buy now pay later, high-value goods and precious metals, gift cards and stored value, in-game currency, payment facilitation, travel reservation services",
  ],
];

const vampLevels = [
  [
    "Excessive merchant (US, Canada, EU, Asia Pacific)",
    "Merchants",
    "Ratio of 1.5% or more (220 basis points before 1 April 2026) and at least 1,500 fraud reports plus disputes in the month",
  ],
  ["Excessive merchant (Latin America and Caribbean)", "Merchants", "Ratio of 1.5% or more and at least 1,500 events in the month"],
  ["Excessive merchant (Central Europe, Middle East, Africa)", "Merchants", "Ratio of 2.2% or more and at least 150 events and USD 75,000"],
  ["Above standard / Excessive", "Acquirers", "0.5% / 0.7% VAMP ratio"],
  [
    "Enumeration",
    "Merchants",
    "Enumeration ratio of 20% or more and 300,000 or more enumerated authorizations (Visa lists both)",
  ],
];

const providerTypes = [
  [
    "Blended-risk platforms (Stripe, Square, PayPal)",
    "Automated model on category and patterns",
    "Flat headline pricing, but holds and freezes can appear after approval",
    "Low-risk, standard merchants",
    "Prohibited and restricted lists, sudden holds",
  ],
  [
    "Underwritten providers (Adyen, Checkout.com and similar)",
    "Reviews financials, compliance and fraud controls per merchant",
    "Negotiated pricing, reserves built into the agreement",
    "Established or scaling merchants with clean documents",
    "Higher volume minimums and slower onboarding",
  ],
  [
    "Specialist high-risk acquirers and ISOs",
    "Built for elevated-risk verticals, manual review",
    "Higher rates, reserves common, stable once approved",
    "Prohibited or restricted categories on mainstream platforms",
    "Long contracts, termination fees, junk fees",
  ],
  [
    "High-risk gateways and brokers",
    "Place you with a partner acquirer",
    "Varies widely",
    "Merchants who need help finding a fit",
    "Broker markups, sales pressure, unclear who holds your funds",
  ],
  [
    "Offshore or cross-border acquiring",
    "Foreign bank acquires your transactions",
    "Often costly, with weaker recourse",
    "Rarely the right answer",
    "Network rules (Stripe, for one, bars cross-border acquiring outside its jurisdiction), funds held abroad",
  ],
];

const costs = [
  [
    "Processing rate",
    "About 3.49% to 3.95% plus $0.25 per transaction (quotes as wide as 2.9% to 14% appear)",
    "Under 4% blended is often called good, 4.5% to 6% overpaying",
  ],
  ["Base monthly fees", "$10 to $50", "Rarely the full monthly bill"],
  ["PCI, gateway and statement fees", "$25 to $60 more per month", "Easy to miss in a quote"],
  ["Rolling reserve", "5% to 10% of volume, higher for riskier profiles", "Held for 90 to 180 days"],
  ["Chargeback fee", "Around $20 per dispute", "Often increases if disputes rise"],
  ["Early termination fee", "Contract-specific", "Check before signing"],
];

const nextSteps = [
  ["Declined by Stripe, Square or PayPal", "Check their restricted list, then match to an underwritten or specialist provider before applying again"],
  ["Frozen with funds held", "Follow the frozen-account steps, gather evidence, ask for reserve terms in writing"],
  ["Disputes rising toward your provider's limit", "Cut disputes now: descriptors, alerts, faster replies, fraud screening"],
  ["New business with no history", "Expect a reserve, apply with a clear model and documents, and plan a 6 to 12 month review"],
  ["On the MATCH list", "Confirm the reason code, fix the cause, and use a specialist who checks MATCH"],
  ["Subscription or pre-order model", "Make pricing, trial and cancellation terms clear and show fulfillment evidence"],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4 scroll-mt-28";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground align-top";

const Table = ({ caption, head, rows }: { caption?: string; head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border border-border rounded-lg">
      {caption && <caption className="sr-only">{caption}</caption>}
      <thead>
        <tr className="bg-muted">
          {head.map((h) => (
            <th key={h} scope="col" className={th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-t border-border">
            {row.map((cell, i) => (
              <td key={i} className={`p-3 align-top${i === 0 ? " font-medium text-foreground" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className={h2}>{children}</h2>
);

const HighRiskEcommercePaymentProcessing = () => {
  return (
    <InsightsArticleLayout
      title={HEADLINE}
      description={DESCRIPTION}
      category={{ name: "Provider Fit Guides", slug: "provider-fit" }}
      cluster="hub"
      currentSlug={SLUG}
      publishedTime={PUBLISHED}
      author={AUTHORS}
      // The brief allows exactly one CTA (the risk analysis block in the body),
      // so the layout's injected assessment CTA and advisory note stay off.
      showInlineCTA={false}
      showArticleSchema={false}
      breadcrumbSchemaItems={[
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" },
        { name: "Provider Fit Guides", url: "/insights/provider-fit" },
        { name: "High-Risk Ecommerce Payment Processing" },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />

      {/* WebP on the page, JPEG as fallback and for og:image. The cover is the
          largest element on load (LCP), so it is fetched first. */}
      <picture>
        <source srcSet={COVER.replace(/\.jpg$/, ".webp")} type="image/webp" />
        <img
          src={COVER}
          alt="High-risk ecommerce payments: merchant accounts, reserves and approvals explained."
          width={1200}
          height={630}
          fetchPriority="high"
          className="w-full h-auto rounded-lg border border-border mb-8"
        />
      </picture>

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">{HEADLINE}</h1>
      <ArticleByline />

      <div className="text-muted-foreground space-y-6">
        <p>
          <strong className="text-foreground">Quick answer:</strong> High-risk ecommerce payment processing is card acceptance for businesses that banks and card networks expect to generate more chargebacks, fraud or regulatory exposure than average. In practice it means individual underwriting instead of instant approval, higher rates than a standard account, and often a rolling reserve. Approval depends on your category, chargeback history and documents, and most merchants can improve all three.
        </p>

        <div className="rounded-lg border border-border p-6">
          <p className="font-semibold text-foreground mb-3">Key takeaways</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>High risk is a risk score, not a verdict on your business, and it can change.</li>
            <li>Visa&apos;s merchant threshold is a VAMP ratio of 1.5% (with at least 1,500 events a month) since 1 April 2026, but acquirers often act at 0.6% to 0.75%.</li>
            <li>Expect higher rates, extra fees and a reserve of roughly 5% to 10% held for 90 to 180 days.</li>
            <li>A blind application spree hurts you. Match your profile to the right type of provider first.</li>
            <li>Contract terms (length, termination fees, reserve release) cost more over time than the headline rate.</li>
          </ul>
        </div>

        <nav aria-label="In this guide" className="rounded-lg bg-muted/50 p-6">
          <p className="font-semibold text-foreground mb-3">In this guide</p>
          <ol className="list-decimal pl-6 space-y-1">
            {toc.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className={link}>{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <p className="text-sm">
          <em>How we researched this:</em> card-network figures come from Visa&apos;s published VAMP fact sheet, category restrictions from Stripe&apos;s published Prohibited and Restricted Businesses list (updated 22 September 2026), and cost figures from provider and industry publications, which we flag as ranges rather than benchmarks. Check any number against your acquirer before you rely on it.
        </p>

        <H2 id="what-is-high-risk-ecommerce-payment-processing">What is high-risk ecommerce payment processing?</H2>
        <p>
          High-risk ecommerce payment processing is card acceptance set up for merchants whose exposure is above what a standard, automated account will accept.
        </p>
        <p>
          When you sell online, your payment provider and its acquiring bank are liable if a customer disputes a charge, if an order is never delivered, or if the card was stolen.
        </p>
        <p>
          The more of that liability your business creates, the more control the provider applies: manual underwriting, higher pricing, reserves, slower payouts, or a refusal.
        </p>
        <p>
          A high-risk merchant account is simply the account that results. It is usually offered by a provider that reviews each business individually instead of approving it from a category code. The label is about the provider&apos;s risk, not your integrity. Plenty of honest, fast-growing stores start here.
        </p>

        <H2 id="what-makes-an-ecommerce-business-high-risk">What makes an ecommerce business high risk?</H2>
        <p>Underwriters score five things, and you can improve most of them.</p>
        <p>
          <strong className="text-foreground">Industry:</strong> Some categories have higher refund and dispute rates or more regulatory scrutiny. Examples: subscriptions, travel, nutraceuticals, digital goods, electronics resale, CBD.
        </p>
        <p>
          <strong className="text-foreground">Business model:</strong> Anything that takes money before delivering creates future liability: pre-orders, delayed shipping, recurring billing, dropshipping with uncertain fulfillment, and marketplaces that hold funds for other sellers.
        </p>
        <p>
          <strong className="text-foreground">History:</strong> Past chargebacks, previous terminations, a MATCH listing, or weak credit for the owners all raise the score.
        </p>
        <p>
          <strong className="text-foreground">Operations:</strong> Sudden volume spikes, large average orders, rising refunds, and weak fraud controls can move a normal merchant into the high-risk bucket.
        </p>
        <p>
          <strong className="text-foreground">Geography:</strong> Cross-border sales bring higher fraud and dispute rates and more compliance work.
        </p>
        <p>What an underwriter reads into common signals:</p>
        <Table
          caption="What an underwriter reads into common signals"
          head={["Signal", "What the underwriter concludes"]}
          rows={signals}
        />

        <H2 id="which-ecommerce-categories-are-treated-as-high-risk">Which ecommerce categories are treated as high risk?</H2>
        <p>
          Risk appetite varies by provider, so there is no single official list. Stripe publishes the clearest one for a mainstream platform, and it shows the pattern.
        </p>
        <p>Stripe states its list is representative, not exhaustive, so check the current page.</p>
        <Table
          caption="How Stripe treats common high-risk categories"
          head={["Treatment on Stripe", "Examples from its published list"]}
          rows={stripeCategories}
        />
        <p>
          Outside those lists, merchants are also treated as high risk because of how they sell: heavy subscriptions, pre-orders, high-ticket goods, or a recent run of disputes.
        </p>
        <p>
          If your category is on a prohibited list, a specialist provider is the only route. If it is restricted, expect extra documents and a longer review.
        </p>

        <H2 id="why-do-stripe-square-and-paypal-reject-or-freeze-high-risk-merchants">Why do Stripe, Square and PayPal reject or freeze high-risk merchants?</H2>
        <p>
          Their onboarding is automated. Risk models score category codes, transaction patterns and dispute levels, then approve, restrict or reject in minutes.
        </p>
        <p>
          That is why setup is instant for low-risk sellers, and why a flagged category, a dispute spike or fast growth can trigger a rejection, a payout hold or a freeze with little warning.
        </p>
        <p>It is a model decision, not a judgment on your business.</p>
        <p>
          Their own rules also include provisions merchants overlook. Stripe&apos;s list, for example, bars evading card-network chargeback monitoring programs and processing for undisclosed merchants.
        </p>
        <p>
          If this has already happened to you, read{" "}
          <Link href="/insights/why-stripe-freezes-accounts-uk" className={link}>why Stripe freezes accounts</Link> and the{" "}
          <Link href="/insights/crisis/stripe-account-frozen" className={link}>Stripe account frozen action plan</Link>.
        </p>

        <H2 id="what-chargeback-rate-is-too-high-in-2026">What chargeback rate is too high in 2026?</H2>
        <p>
          The old rule of thumb, &quot;stay under 1%&quot;, is out of date. Visa now runs a single program, VAMP, and the numbers below come from Visa&apos;s published fact sheet.
        </p>
        <p>
          <strong className="text-foreground">How the Visa VAMP ratio works.</strong> The ratio is the count of fraud reports (TC40) plus disputes (TC15), divided by the count of settled transactions (TC05) in the month, for card-not-present transactions.
        </p>
        <p>Disputes resolved through pre-dispute tools and fraud covered by Compelling Evidence 3.0 are excluded.</p>
        <Table caption="Visa VAMP thresholds" head={["Level", "Applies to", "Threshold"]} rows={vampLevels} />
        <p>Both parts of the merchant test must be met. Two examples:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            2,000 transactions a month with 40 fraud reports and disputes is a 2.0% ratio, but only 40 events. It is under the 1,500 minimum, so you are not in the formal Visa program. Your acquirer will still treat 2.0% as an emergency.
          </li>
          <li>100,000 transactions with 1,600 events is a 1.6% ratio and 1,600 events. You meet both tests and enter the program.</li>
        </ul>
        <p>
          <strong className="text-foreground">Mastercard:</strong> Industry sources describe the Excessive Chargeback Merchant (ECM) tier at 100 chargebacks and a 1.5% ratio in a month, and the High Excessive tier (HECM) at 300 chargebacks and 3%. Mastercard&apos;s own text is in section 8.3 of its Security Rules and Procedures, Merchant Edition. Confirm the current figures there or with your acquirer.
        </p>
        <p>
          <strong className="text-foreground">Your provider&apos;s limit comes first:</strong> Many acquirers set internal limits well below the network lines, often around 0.6% to 0.75%, and will add a reserve, raise pricing or terminate before a network program starts.
        </p>
        <p>Treat the lowest number that applies to you as your real ceiling.</p>
        <p>
          The{" "}
          <Link href="/insights/ecommerce/chargeback-thresholds-high-risk-processors" className={link}>chargeback thresholds guide</Link> and the{" "}
          <Link href="/insights/scheme-rules-reserves-monitoring" className={link}>scheme rules explainer</Link> go deeper, and{" "}
          <Link href="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className={link}>what chargebacks are and how to avoid them</Link>{" "}
          covers prevention.
        </p>

        <H2 id="what-is-the-match-list">What is the MATCH list?</H2>
        <p>MATCH (Member Alert to Control High-risk Merchants) is Mastercard&apos;s database of terminated merchants.</p>
        <p>
          An acquirer that ends a relationship for specified reasons must add the merchant, and the listing stays for five years. Industry sources list reasons including excessive chargebacks, excessive fraud, laundering, account data compromise and PCI non-compliance.
        </p>
        <p>What it means for you:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A listing does not bar you from every account, but it narrows your options and usually brings a reserve and higher pricing.</li>
          <li>Some listings relate to data breaches where the merchant was the victim. If that applies, document it.</li>
          <li>
            Ask any new provider whether they will check MATCH, and ask your previous acquirer, in writing, whether you were reported and under which reason code.
          </li>
        </ul>
        <p>These details come from industry publications. Confirm them with your acquirer or Mastercard&apos;s published rules.</p>

        <H2 id="how-does-high-risk-underwriting-work">How does high-risk underwriting work?</H2>
        <p>
          Underwriting is the review that decides whether you get an account and on what terms. The steps are broadly the same across providers:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Application:</strong> Business details, products, volumes, average ticket, refund policy, fulfillment time, and your markets.
          </li>
          <li>
            <strong className="text-foreground">Identity and ownership checks (KYC and KYB):</strong> Registration documents, beneficial owners, and ID for the principals.
          </li>
          <li>
            <strong className="text-foreground">Financial review:</strong> Bank statements, recent processing statements, and often the principals&apos; personal credit.
          </li>
          <li>
            <strong className="text-foreground">Website and policy review:</strong> Product descriptions, refund and shipping terms, contact details, and cancellation flow for subscriptions.
          </li>
          <li>
            <strong className="text-foreground">Risk scoring:</strong> Category, history, volume, ticket size and geography become a risk tier.
          </li>
          <li>
            <strong className="text-foreground">Terms:</strong> Pricing, reserve, contract length, termination fee and payout schedule.
          </li>
          <li>
            <strong className="text-foreground">Ongoing monitoring:</strong> Disputes, refunds and volume are watched after approval. Sudden changes trigger a review. See{" "}
            <Link href="/insights/why-providers-re-underwrite-accounts" className={link}>why providers re-underwrite accounts</Link>.
          </li>
        </ol>
        <p>Have these ready before you apply:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Business registration and ownership details</li>
          <li>Three to six months of business bank statements</li>
          <li>Recent processing statements from your current or previous provider</li>
          <li>Refund, shipping and cancellation policies live on your website</li>
          <li>Proof of fulfillment (supplier contracts, shipping times)</li>
          <li>
            Owner ID and a clear explanation of where funds come from (see{" "}
            <Link href="/insights/source-of-funds" className={link}>source of funds</Link>)
          </li>
        </ul>

        <H2 id="which-type-of-provider-accepts-high-risk-merchants">Which type of provider accepts high-risk merchants?</H2>
        <p>
          Not all providers treat risk the same way. This comparison is qualitative, because pricing and speed vary by provider.
        </p>
        <Table
          caption="Types of providers for high-risk merchants compared"
          head={["Provider type", "How it approves", "Pricing and reserves", "Best for", "Watch out for"]}
          rows={providerTypes}
        />
        <p>
          Every provider has a risk appetite shaped by its acquiring bank, its reserve capital and its regulators, so a provider comfortable with travel may still decline supplements.
        </p>
        <p>
          Our <Link href="/insights/provider-appetite-index" className={link}>provider appetite index</Link> and{" "}
          <Link href="/insights/payment-provider-risk-models" className={link}>risk models guide</Link> explain how those appetites differ.
        </p>
      </div>

      {/* The article's one call to action (brief: no other CTA in the body and
          no closing CTA). */}
      <section className="my-10 rounded-xl p-8 md:p-10" style={{ background: "#0C141D" }}>
        <h3 className="text-2xl font-semibold mb-3" style={{ color: "#F3F5F7" }}>
          Not sure which type fits your business?
        </h3>
        <p className="mb-6 leading-relaxed" style={{ color: "#C9D1D9" }}>
          We are an independent payment advisory. Answer a few questions about your industry, volume, model and chargeback exposure, and the risk analysis shows which provider types are likely to approve you and keep you stable.
        </p>
        <Link
          href="/assessment"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full font-semibold text-white bg-[#11AC64] hover:bg-[#15D179] transition-colors"
        >
          Run the free risk analysis
        </Link>
      </section>

      <div className="text-muted-foreground space-y-6">
        <H2 id="how-much-does-a-high-risk-merchant-account-cost">How much does a high-risk merchant account cost?</H2>
        <p>
          Pricing is the part most merchants get wrong, because the headline rate is only one line. These are provider-published ranges from industry sources, not a benchmark, and quotes vary a lot.
        </p>
        <Table
          caption="High-risk merchant account costs"
          head={["Cost item", "Commonly quoted range", "Notes"]}
          rows={costs}
        />
        <p>
          <strong className="text-foreground">Working example:</strong> You process $50,000 a month at 4%. Fees are about $2,000 a month.
        </p>
        <p>
          If a 10% reserve is held for 180 days, each month adds $5,000 to the reserve, so after six months about $30,000 of your own cash sits with the provider at any time.
        </p>
        <p>
          Model your cash flow with the reserve before you compare rates. For how reserves work and what to negotiate, see{" "}
          <Link href="/insights/rolling-vs-fixed-reserve" className={link}>rolling vs fixed reserve</Link>.
        </p>
        <p>
          To find out what you really pay today, use a <Link href="/statement-review" className={link}>free statement review</Link>.
        </p>

        <H2 id="how-do-you-get-approved-for-a-high-risk-merchant-account">How do you get approved for a high-risk merchant account?</H2>
        <p>Underwriters approve businesses they can understand. Preparation beats shopping around.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Write your profile first.</strong> Industry, fulfillment time, monthly volume, average order value, chargeback history, markets and subscription terms. These are the questions every underwriter asks.
          </li>
          <li>
            <strong className="text-foreground">Match the provider type to the profile before you apply.</strong> Blind applications leave multiple declines on your record and waste weeks.
          </li>
          <li>
            <strong className="text-foreground">Fix the website.</strong> Clear product descriptions, visible refund, return and shipping policies, working contact details, and a simple cancellation flow for subscriptions.
          </li>
          <li>
            <strong className="text-foreground">Clean up disputes before applying.</strong> Use recognizable billing descriptors, answer customers fast, add fraud screening (AVS, CVV and device checks) and chargeback alerts. A falling dispute trend helps.
          </li>
          <li>
            <strong className="text-foreground">Bring complete documents.</strong> Missing paperwork is the most common cause of delay.
          </li>
          <li>
            <strong className="text-foreground">Show realistic projections.</strong> Back your volume with sales history or marketing plans. Inflated numbers cost credibility.
          </li>
          <li>
            <strong className="text-foreground">Negotiate terms.</strong> Ask for a capped or shorter reserve, a clear release schedule, no early termination fee, and written notice before any account change.
          </li>
        </ol>
        <p>
          If you were declined,{" "}
          <Link href="/insights/crisis/rejected-high-risk-strategy" className={link}>this rejection recovery guide</Link>{" "}
          covers what to fix before reapplying.
        </p>

        <H2 id="contract-red-flags-to-check-before-you-sign">Contract red flags to check before you sign</H2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Terms longer than 12 months or an early termination fee that is hard to find</li>
          <li>A reserve with no stated release date or no cap</li>
          <li>Rates that look low but come with long fee schedules</li>
          <li>&quot;Guaranteed approval&quot; before any underwriting</li>
          <li>A broker who cannot say which acquiring bank holds your funds</li>
          <li>Equipment leases or non-cancellable add-ons</li>
          <li>Clauses that let the provider change fees or hold funds without notice</li>
        </ul>

        <H2 id="what-to-do-if-your-account-is-frozen-or-terminated">What to do if your account is frozen or terminated</H2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Do not open a duplicate account with the same business details.</strong> Providers match identities, and this can look like evasion.
          </li>
          <li>
            <strong className="text-foreground">Ask in writing for the reason and the reserve terms.</strong> Get the reason code if you were terminated, and ask whether you were added to MATCH.
          </li>
          <li>
            <strong className="text-foreground">Collect evidence.</strong> Shipping proof, customer communication and refund records for the disputed orders.
          </li>
          <li>
            <strong className="text-foreground">Fix the root cause.</strong> Disputes, fulfillment delays or unclear billing, whichever triggered the hold.
          </li>
          <li>
            <strong className="text-foreground">Apply to an underwritten or specialist provider with a clear explanation.</strong> Underwriters accept a documented cause better than silence.
          </li>
        </ol>
        <p>
          The full walkthrough is in the{" "}
          <Link href="/insights/crisis/stripe-account-frozen" className={link}>Stripe account frozen action plan</Link>.
        </p>

        <H2 id="how-to-move-from-high-risk-to-a-standard-account">How to move from high-risk to a standard account</H2>
        <p>
          High risk is a status, not a sentence. Many providers review accounts after 6 to 12 months of clean processing. Keep disputes low, volume steady and records tidy, then ask for repricing, a lower reserve or a shorter hold, or apply to a standard provider with your history as proof.
        </p>
        <p>
          When you choose a provider, plan for where you will be in two years, not just for approval today: flexible underwriting, strong fraud tools, multi-currency support and good dispute data matter more as you grow.
        </p>

        <H2 id="your-situation-your-next-step">Your situation, your next step</H2>
        <Table caption="Your situation and your next step" head={["Your situation", "Do this next"]} rows={nextSteps} />

        <H2 id="frequently-asked-questions">Frequently asked questions (FAQs)</H2>
        <div>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className={h3}>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>

        <H2 id="sources-and-references">Sources and references</H2>
        <ul className="list-disc pl-6 space-y-2">
          {sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className={link}>{s.name}</a>
            </li>
          ))}
        </ul>
        <p className="text-sm">External links open in a new tab. ChosePayments is not affiliated with these sources.</p>
      </div>
    </InsightsArticleLayout>
  );
};

export default HighRiskEcommercePaymentProcessing;
