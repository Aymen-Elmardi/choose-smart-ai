'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import FAQSchema from "@/components/FAQSchema";
import { Source } from "@/components/SourcesCitation";

const BASE_URL = "https://chosepayments.com";
const SLUG = "square-fees-explained";
const HEADLINE = "Square Fees Explained (2026): What You Actually Pay";
const DESCRIPTION =
  "Every Square fee in 2026: Free, Plus and Premium rates, monthly costs, worked examples, break-even points and when Square gets expensive.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-10-28";
const COVER = `/insights/${SLUG}-cover.jpg`;

const faqs = [
  {
    question: "How much does Square charge per transaction?",
    answer:
      "On the free plan, Square charges 2.6% + 15¢ for in-person card payments and 3.3% + 30¢ online. Manual entry costs 3.5% + 15¢. Plus and Premium lower the in-person and online percentages.",
  },
  {
    question: "Does Square charge a monthly fee?",
    answer:
      "Square Free has no monthly fee. Square Plus costs $49 per location per month and Premium costs $149. Optional apps like kitchen displays and kiosks cost extra per device.",
  },
  {
    question: "Is Square Plus worth it?",
    answer:
      "Plus is worth it above roughly $49,000 a month in in-person sales, or about $12,250 a month online. Below that, the free plan costs less. Many owners upgrade for the software, not the rate.",
  },
  {
    question: "Does Square charge for chargebacks?",
    answer:
      "Square's help center says it charges no fees for chargebacks and dispute management. You still lose the sale amount if you lose the dispute. Stripe and Braintree charge $15 per dispute.",
  },
  {
    question: "Can I pass Square fees to my customers?",
    answer:
      "Sometimes. Card brand rules limit surcharging and some states restrict it. Check Square's policy and your state's law first. Never add a fee without clear disclosure at checkout.",
  },
  {
    question: "Are Square fees tax deductible?",
    answer:
      "Processing fees are generally deductible as a business expense in the United States. Keep your monthly statements and confirm with your accountant, since this is general information and not tax advice.",
  },
];

const sources: Source[] = [
  { name: "Square: Pricing (US)", url: "https://squareup.com/us/en/pricing", type: "official" },
  { name: "Square Support Center (US): disputes and chargebacks", url: "https://squareup.com/help/us/en", type: "official" },
  { name: "Stripe: Pricing", url: "https://stripe.com/pricing", type: "official" },
  { name: "PayPal Braintree: Fees", url: "https://www.paypal.com/us/enterprise/paypal-braintree-fees", type: "official" },
];

// Article schema written here (layout schema off) so the author is a Person,
// as the brief specifies. Headline matches the visible H1.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  image: `${BASE_URL}${COVER}`,
  author: { "@type": "Person", name: "Aymen Elmardi", jobTitle: "Payments Expert" },
  publisher: { "@id": `${BASE_URL}/#organization` },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  articleSection: "Fees & Costs",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/insights/${SLUG}` },
  keywords:
    "square fees, square pricing, square credit card processing fees, square fees per transaction, square fees 2026, does square charge a monthly fee",
  citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })),
};

const pricing = [
  ["Tap, dip or swipe", "2.6% + 15¢", "2.5% + 15¢", "2.4% + 15¢"],
  ["Online and invoices", "3.3% + 30¢", "2.9% + 30¢", "2.9% + 30¢"],
  ["Online API", "2.9% + 30¢", "2.9% + 30¢", "2.9% + 30¢"],
  ["Manual entry or card on file", "3.5% + 15¢", "3.5% + 15¢", "3.5% + 15¢"],
  ["ACH bank transfer (invoice)", "1%, $1 minimum", "1%, $1 minimum", "1%, $1 minimum"],
  ["Afterpay", "6% + 30¢", "6% + 30¢", "6% + 30¢"],
  ["International cards", "+1.5%", "+1.5%", "+1.5%"],
];

const perSale = [
  ["$5 coffee", "28¢", "5.6%", "46.5¢", "9.3%"],
  ["$20 lunch", "67¢", "3.35%", "96¢", "4.8%"],
  ["$50 service", "$1.45", "2.9%", "$1.95", "3.9%"],
  ["$200 order", "$5.35", "2.7%", "$6.90", "3.45%"],
];

const examples = [
  {
    name: "A neighborhood cafe",
    setup: "$20,000 a month in person, 1,000 transactions.",
    lines: ["Free: $520 + $150 = $670", "Plus: $500 + $150 + $49 = $699", "Premium: $480 + $150 + $149 = $779"],
    verdict: "Free wins. Upgrading costs you $29 to $109 more a month.",
  },
  {
    name: "A busy boutique",
    setup: "$60,000 a month in person, 1,500 transactions.",
    lines: ["Free: $1,560 + $225 = $1,785", "Plus: $1,500 + $225 + $49 = $1,774", "Premium: $1,440 + $225 + $149 = $1,814"],
    verdict: "Plus wins, but only by $11. The better software is the real reason to upgrade here, not the rate.",
  },
  {
    name: "A high-volume restaurant",
    setup: "$120,000 a month in person, 3,000 transactions.",
    lines: ["Free: $3,120 + $450 = $3,570", "Plus: $3,000 + $450 + $49 = $3,499", "Premium: $2,880 + $450 + $149 = $3,479"],
    verdict: "Premium wins by about $91 against Free. The savings are real but small.",
  },
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";

const SquareFees = () => {
  return (
    <InsightsArticleLayout
      title={HEADLINE}
      description={DESCRIPTION}
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug={SLUG}
      publishedTime={PUBLISHED}
      sources={sources}
      // The brief's CTA is Write to us (placed in the body); the layout's
      // injected assessment CTA and advisory note stay off.
      showInlineCTA={false}
      showArticleSchema={false}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <FAQSchema faqs={faqs} />

      {/* WebP on the page, JPEG as fallback and for og:image. The cover is the
          largest element on load (LCP), so it is fetched first. */}
      <picture>
        <source srcSet={COVER.replace(/\.jpg$/, ".webp")} type="image/webp" />
        <img
          src={COVER}
          alt="Square fees explained 2026: what you actually pay on the Free, Plus and Premium plans."
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
          <strong className="text-foreground">Quick answer:</strong> Square charges 2.6% + 15¢ for in-person card payments on its free plan, and 3.3% + 30¢ online. Paid plans lower those rates for $49 or $149 a month per location. For most small businesses under about $50,000 a month in in-person sales, the free plan costs the least.
        </p>
        <p>
          Square is easy to start and hard to price. The headline rate looks simple, then three plans, four payment types, and several add-on fees appear.
        </p>
        <p>
          This guide puts every number in one place and shows what each plan costs in real dollars. It is based on Square&apos;s published pricing as of October 2026.
        </p>

        <h2 className={h2}>Does Square charge a monthly fee?</h2>
        <p>
          Not on the free plan. Square Free costs $0 a month and you only pay when you take a payment. That is the main reason it wins with new and seasonal businesses.
        </p>
        <p>
          Plus and Premium add a monthly fee for each location you run. Plus is $49 and Premium is $149. A second location doubles the bill. Many owners forget this when they plan expansion.
        </p>
        {/* TODO(verify): kitchen display ($30 / $20) and kiosk ($50 / $30) app prices are not in the brief's verified-facts list. */}
        <p>
          Optional add-ons stack on top. A kitchen display screen app costs $30 a month per device on Plus and $20 on Premium. A kiosk app costs $50 and $30.
        </p>
        <p>None of these touch your processing rates, so only buy what you will use.</p>

        <h2 className={h2}>Square pricing breakdown</h2>
        <p>
          Square pricing depends on how you accept payments, with different rates for online, in-person, and manually entered transactions.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className={th}>Payment type</th>
                <th className={th}>Square Free ($0)</th>
                <th className={th}>Square Plus ($49/mo)</th>
                <th className={th}>Square Premium ($149/mo)</th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  {row.map((cell, i) => (
                    <td key={i} className={`p-3${i === 0 ? " font-medium text-foreground" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Monthly plan fees apply per location. Cash and check payments cost nothing.</p>

        <h2 className={h2}>Square fees per transaction</h2>
        <p>
          The percentage is only half the story. Every card payment also carries a fixed fee of 15¢ in person or 30¢ online. That fixed piece hurts small tickets most.
        </p>
        <p>Here is what a single sale costs on the free plan:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className={th}>Sale</th>
                <th className={th}>In person (2.6% + 15¢)</th>
                <th className={th}>Effective rate</th>
                <th className={th}>Online (3.3% + 30¢)</th>
                <th className={th}>Effective rate</th>
              </tr>
            </thead>
            <tbody>
              {perSale.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  {row.map((cell, i) => (
                    <td key={i} className={`p-3${i === 0 ? " font-medium text-foreground" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          A $5 coffee online costs you almost 10% in fees. This is why low-ticket sellers should push customers toward in-person or bundle items into larger orders.
        </p>

        <h2 className={h2}>The online rate change you should know about</h2>
        <p>
          Square raised its online rate on the free plan to 3.3% + 30¢ in early 2026. Plus and Premium stayed at 2.9% + 30¢. That gap is now 0.4 percentage points, and it changes the math for web sellers.
        </p>
        <p>
          On $15,000 of monthly online sales across 300 orders, the free plan costs about $585. Plus costs about $574 including its $49 fee.
        </p>
        <p>If you sell online and your volume is steady, Plus now pays for itself at roughly $12,250 a month online.</p>

        <h2 className={h2}>Which plan saves you money: three worked examples</h2>
        <p>
          Each plan lowers the in-person rate by 0.1 percentage points. The fixed 15¢ never changes. So the break-even depends on volume, not ticket size.
        </p>
        {examples.map((ex) => (
          <div key={ex.name}>
            <p>
              <strong className="text-foreground">{ex.name}:</strong> {ex.setup}
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              {ex.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="mt-3">{ex.verdict}</p>
          </div>
        ))}
        <p>The pattern is blunt. Plus breaks even against Free at $49,000 a month in person.</p>
        <p>
          Premium beats Free at $74,500 and beats Plus at $100,000. Below those lines, the upgrade is a software decision, not a savings decision.
        </p>

        <h2 className={h2}>Square fees most guides skip</h2>
        <p>
          <strong className="text-foreground">Chargebacks:</strong> Square&apos;s help center says it charges no fees for chargebacks and dispute management. That is unusual. Stripe and Braintree both charge $15 per dispute. You still lose the sale and the goods if you lose the case.
        </p>
        {/* TODO(verify): "no termination fee" and "no charge for PCI compliance support" are not in the brief's verified-facts list. */}
        <p>
          <strong className="text-foreground">Early termination and PCI:</strong> There are no contracts on Square&apos;s standard plans and no termination fee. Square also does not charge for PCI compliance support.
        </p>
        <p>
          <strong className="text-foreground">International cards:</strong> A card issued outside the United States adds 1.5% on top of your normal rate. A $100 online sale from a foreign card costs $5.10 on the free plan.
        </p>
        <p>
          {/* Draft: "more than double a standard card sale". True against an in-person sale ($5.35), not an online one ($6.90, 1.78x). */}
          <strong className="text-foreground">Afterpay:</strong> Customers pay in four installments and you get paid up front. You pay 6% + 30¢. On a $200 order that is $12.30, more than double the $5.35 an in-person card sale costs. Turn it on only if it lifts basket size enough to justify the cost.
        </p>
        <p>
          <strong className="text-foreground">Instant transfers and refunds:</strong> Square offers faster payouts for a fee and its refund policy on processing fees has details that matter. Check both on Square&apos;s current terms before you rely on them, because they change.
        </p>

        <h2 className={h2}>When Square gets expensive</h2>
        <p>
          Square is a flat-rate processor. You pay one blended price whether the card costs Square 1.5% or 2.5% to process. Interchange is the wholesale fee card issuers charge, and flat pricing hides it.
        </p>
        <p>
          That convenience gets costly as you grow. If you process more than $250,000 a year, Square says you can ask its team about custom pricing. Take that call. Ask for the rate in writing and compare it with an interchange-plus quote from at least one other provider. Our guide to{" "}
          <Link href="/insights/pricing-models/blended-vs-interchange" className={link}>blended versus interchange pricing</Link>{" "}
          shows how to read the two side by side.
        </p>
        <p>Flat rates also punish three kinds of business. Low-ticket sellers pay a high effective rate because of the fixed fee.</p>
        <p>Online-heavy sellers pay more than in-person ones. International sellers pay the 1.5% surcharge every time.</p>

        <h2 className={h2}>Square payment processor and its risk factors</h2>
        <p>
          Fees are the visible cost. Account risk is the hidden one. Like most payment facilitators, Square pools merchants under its own account, so it can review, hold or restrict funds when activity looks unusual.
        </p>
        <p>A sudden jump in sales, a spike in refunds, or a high-risk category can all trigger a review.</p>
        <p>Keep your volume story consistent, answer verification requests quickly, and keep a cash buffer for a slow payout week.</p>
        <p>
          Hidden costs like these are covered in our piece on{" "}
          <Link href="/insights/hidden-payment-processor-fees" className={link}>hidden payment processor fees</Link>.
        </p>

        <h2 className={h2}>Can you pass Square fees to customers?</h2>
        <p>
          Sometimes, but carefully. Card brand rules limit surcharging and some states restrict it. Check Square&apos;s own policy and your state&apos;s rules before adding a surcharge. A cash discount program is a different structure with its own rules.
        </p>

        <h2 className={h2}>Are Square fees tax deductible?</h2>
        <p>
          Processing fees are generally a deductible business expense in the United States. Keep your monthly statements and confirm the treatment with your accountant. This is general information, not tax advice.
        </p>

        <h2 className={h2}>My take: who should use Square</h2>
        <p>
          Square is the best first processor for a physical business under about $50,000 a month. The setup takes minutes, the hardware works, and there is no contract to escape. I would not call it cheap, though. You pay for convenience.
        </p>
        <p>
          Move on when your monthly bill crosses $1,500 and your card mix is mostly in person or high ticket. At that point an interchange-plus quote usually saves real money.
        </p>
        <p>
          Compare it with <Link href="/insights/stripe-fees-explained" className={link}>Stripe&apos;s published pricing</Link> first so you know what each flat rate really costs.
        </p>
        <p>
          Not sure where you land?{" "}
          <Link href="/contact" data-cta="write" data-placement="mid" className={`${link} font-medium`}>Write to us</Link>{" "}
          with your monthly volume and average ticket. We will tell you whether Square is still the right fit.
        </p>

        <h2 className={h2}>Frequently asked questions (FAQs)</h2>
        <div>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className={h3}>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-12 rounded-xl p-8 md:p-10" style={{ background: "#0C141D" }}>
        <h2 className="text-2xl font-semibold mb-3" style={{ color: "#F3F5F7" }}>
          Not sure Square fits your business?
        </h2>
        <p className="mb-6 leading-relaxed" style={{ color: "#C9D1D9" }}>
          Send us your monthly volume, average ticket and business type. We will review your numbers and tell you plainly whether Square, an alternative, or a different pricing model fits.
        </p>
        <Link
          href="/contact"
          data-cta="write"
          data-placement="end"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full font-semibold text-white bg-[#11AC64] hover:bg-[#15D179] transition-colors"
        >
          Write to us
        </Link>
      </section>
    </InsightsArticleLayout>
  );
};

export default SquareFees;
