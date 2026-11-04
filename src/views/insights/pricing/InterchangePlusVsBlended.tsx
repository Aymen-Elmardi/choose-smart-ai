'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import FAQSchema from "@/components/FAQSchema";
import { Source } from "@/components/SourcesCitation";

const BASE_URL = "https://chosepayments.com";
const SLUG = "interchange-plus-vs-blended-pricing";
const PATH = `/insights/pricing-models/${SLUG}`;
const HEADLINE = "Interchange plus vs. blended pricing: which credit card processing model saves you money";
const DESCRIPTION =
  "Compare interchange plus and blended credit card processing pricing with real 2026 rate data. See which model cuts costs for your business and when to switch.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-11-04";
const IMG = "/insights/interchange-plus-vs-blended";
const COVER = `${IMG}-hero.jpg`;

const faqs = [
  {
    question: "Is interchange plus always cheaper than blended pricing?",
    answer:
      "Not always. It's usually cheaper on average for businesses with a stable, debit-heavy card mix, but a blended rate can come out ahead in months where your card mix skews toward premium rewards cards or card-not-present transactions, since interchange plus passes that volatility directly to you.",
  },
  {
    question: "Can I switch from blended to interchange plus with my current processor?",
    answer:
      "Sometimes. Many processors offer both models, but switching usually requires re-underwriting, since your approved pricing structure is tied to your risk profile and MCC. Ask your provider directly rather than assuming it's a simple account setting.",
  },
  {
    question: "Why did my blended rate go up even though my sales didn't change?",
    answer:
      "Your card mix likely shifted: more premium rewards cards, more online transactions, or more international cards all cost the processor more in interchange, and a blended rate is re-averaged periodically to reflect that.",
  },
  {
    question: "What's a reasonable markup on interchange plus pricing in 2026?",
    answer:
      "For a stable, mid-volume US business, a markup in the 0.15%–0.40% range plus $0.05–$0.10 per transaction is generally competitive. Markups above that warrant a second quote.",
  },
  {
    question: "Does interchange plus pricing show every fee on my statement?",
    answer:
      "It should. If your \"interchange plus\" statement doesn't clearly separate interchange, assessment, and markup line by line, you're likely not actually on a true interchange plus plan.",
  },
];

const sources: Source[] = [
  { name: "Visa USA Interchange Reimbursement Fees", url: "https://usa.visa.com/content/dam/VCOM/download/merchants/visa-usa-interchange-reimbursement-fees.pdf", type: "official" },
  { name: "Mastercard US Merchant Interchange Rates (April 2026)", url: "https://www.mastercard.com/content/dam/mccom/us/business/documents/merchant-rates-2026-2027-april2026.pdf", type: "official" },
];

// Article schema written here (layout schema off) so the author is a Person,
// as the brief specifies. Headline matches the visible H1; the publisher is
// the site-wide Organization node rather than the brief's /logo.png URL.
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
  articleSection: "Pricing Models",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${PATH}` },
  keywords: "interchange plus vs blended pricing, interchange plus pricing explained, credit card processing pricing models",
  citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })),
};

const interchangeRates = [
  ["Traditional rewards credit, card-present", "1.43%–1.51% + $0.10"],
  ["Signature/Infinite rewards credit", "1.65%–2.10% + $0.10"],
  ["Card-not-present (online, standard)", "1.80%–2.60% + $0.10"],
  ["Non-qualified / downgraded transaction", "3.15% + $0.10"],
];

const costComparison = [
  ["Interchange Plus", "1.55% blended interchange average + 0.30% markup + $0.08/transaction (500 transactions)", "$925 + $40 = $965"],
  ["Blended/Flat-Rate", "2.75% + $0.10/transaction (500 transactions)", "$1,375 + $50 = $1,425"],
];

// Visa moved VAMP from 2.2% to 1.5% in April 2026. The brief was written
// before that date ("2.2% today, tightening to 1.5%"), so the copy states the
// current threshold.
const underwriting = [
  ["High-risk MCC (Merchant Category Code)", "Providers often restrict you to blended pricing to buffer against loss exposure"],
  ["Future-delivery business model (pre-orders, subscriptions, travel)", "Processors price in the extended liability window, often through higher markups on either model"],
  ["Elevated chargeback ratio", "Can trigger surcharges that erase any theoretical interchange plus savings. Visa's VAMP program flags merchants at a 1.5% dispute-and-fraud ratio (down from 2.2% before April 2026); Mastercard's ECM enrolls merchants at 100 chargebacks per month or a 1.5% ratio"],
];

const checklist = [
  ["Pull your last 3 months of statements", "and calculate your actual card mix (debit vs. credit, rewards vs. standard, card-present vs. online)."],
  ["Check your chargeback ratio", "against current network thresholds (1.5% for Visa VAMP since April 2026; 1.5% for Mastercard ECM)."],
  ["Ask directly whether your MCC qualifies for interchange plus.", "Don't assume it's offered by default."],
  ["Model both scenarios", "using your real transaction data, not a sales rep's example."],
  ["Factor in switching costs", "(new hardware, integration time, potential processing downtime) against the projected annual savings."],
];

const redFlags = [
  ["Downgrade fees that don't match your actual card mix.", "If a large share of your transactions are hitting the 3.15% non-qualified rate, something in your payment flow (missing AVS data, delayed batch settlement, keyed-in entry) is triggering downgrades that shouldn't be happening."],
  ["A markup that increased after your first few months.", "Some processors quote an aggressive introductory markup on interchange plus, then raise it once you're past the point of easily switching."],
  ["PCI compliance fees stacked on top of your quoted rate.", "These are often legitimate, but should be disclosed upfront, not buried as a surprise line item."],
  ["\"Blended\" language on a statement that should be interchange plus.", "If you were sold interchange plus pricing but your statement shows one flat rate with no interchange/assessment/markup breakdown, you're not actually getting what you were promised."],
  ["Batch or monthly minimum fees that scale with switching providers.", "Some contracts include early termination fees steep enough to erase a year or more of projected savings. Read this clause before signing, not after."],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";

const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border border-border rounded-lg">
      <thead>
        <tr className="bg-muted">
          {head.map((h) => (
            <th key={h} className={th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-t border-border">
            {row.map((cell, i) => (
              <td key={i} className={`p-3${i === 0 ? " font-medium text-foreground" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// WebP on the page, JPEG as fallback. All images are 1600 px wide.
const Figure = ({ name, alt, height, priority = false }: { name: string; alt: string; height: number; priority?: boolean }) => (
  <picture>
    <source srcSet={`${IMG}-${name}.webp`} type="image/webp" />
    <img
      src={`${IMG}-${name}.jpg`}
      alt={alt}
      width={1600}
      height={height}
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const })}
      className="w-full h-auto rounded-lg border border-border my-8"
    />
  </picture>
);

const NumberedList = ({ items }: { items: string[][] }) => (
  <ol className="list-decimal pl-6 space-y-2">
    {items.map(([lead, rest]) => (
      <li key={lead}>
        <strong className="text-foreground">{lead}</strong> {rest}
      </li>
    ))}
  </ol>
);

const InterchangePlusVsBlended = () => {
  return (
    <InsightsArticleLayout
      title="Interchange Plus vs. Blended Pricing"
      description={DESCRIPTION}
      category={{ name: "Pricing Models", slug: "pricing-models" }}
      cluster="pricing"
      showRelated={true}
      currentSlug={SLUG}
      publishedTime={PUBLISHED}
      sources={sources}
      showArticleSchema={false}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{HEADLINE}</h1>
      <ArticleByline />

      {/* The cover is the largest element on load (LCP), so it is fetched first. */}
      <Figure
        name="hero"
        height={900}
        priority
        alt="Two pricing models compared side by side: interchange plus broken into interchange, assessment, and markup, versus a single flat blended rate"
      />

      <div className="text-muted-foreground space-y-6">
        <p>Every US payment processor quotes a rate. Almost none of them explain what that rate is actually built from.</p>
        <p>
          That gap is where businesses overpay by thousands of dollars a year, and it is also where &quot;cheaper&quot; providers quietly become the most expensive ones once your transaction mix changes.
        </p>
        <p>
          The real decision isn&apos;t &quot;interchange plus or blended, which is cheaper.&quot; It&apos;s which pricing structure matches how your business actually processes cards, how predictable you need your costs to be, and what a processor&apos;s underwriting team will even let you have.
        </p>
        <p>
          This guide breaks down both models with current 2026 interchange data, shows the real math side by side, and gives you a framework for choosing or switching.
        </p>

        <h2 className={h2}>What is interchange plus pricing vs. blended pricing?</h2>
        <p>
          <strong className="text-foreground">Interchange plus pricing</strong> (sometimes called &quot;cost-plus&quot; or &quot;pass-through&quot; pricing) separates your processing cost into two visible parts: the interchange fee set by Visa, Mastercard, or Discover for that specific card and transaction type, plus a fixed markup your processor keeps. You see every component of your statement.
        </p>
        <p>
          <strong className="text-foreground">Blended pricing</strong> (also called &quot;flat-rate&quot; pricing) charges one flat percentage, like 2.75%, regardless of which card the customer used. The processor absorbs the variation between a cheap debit card and an expensive rewards card, and prices the average into your single rate.
        </p>
        <p>
          Neither is inherently better. They solve different problems: interchange plus optimizes for cost, blended optimizes for predictability.
        </p>

        <h2 className={h2}>How interchange plus pricing actually works</h2>
        <p>Every card transaction generates three separate costs:</p>
        <NumberedList
          items={[
            ["Interchange fee:", "paid to the cardholder's issuing bank, set by the card networks twice a year (April and October), not by your processor."],
            ["Assessment fee:", "paid to the network itself (Visa, Mastercard, Discover), typically 0.13% to 0.165% of the transaction regardless of card type."],
            ["Processor markup:", "the only negotiable part. This is where your processor makes money."],
          ]}
        />
        <p>
          You can check the source numbers yourself in{" "}
          <a href={sources[0].url} target="_blank" rel="noopener noreferrer" className={link}>Visa&apos;s official US interchange reimbursement fee schedule</a>{" "}
          and{" "}
          <a href={sources[1].url} target="_blank" rel="noopener noreferrer" className={link}>Mastercard&apos;s published US merchant interchange rate guide</a>.
        </p>
        <p>Based on current published 2026 Visa rate schedules, here&apos;s what interchange alone looks like for common US transaction types:</p>
        <Table head={["Card Type / Scenario", "Visa Interchange Rate (approx.)"]} rows={interchangeRates} />
        <p>
          On top of whichever interchange tier applies, add the network assessment fee (roughly 0.13%–0.165%) and your processor&apos;s markup.
        </p>
        <p>
          A well-negotiated interchange plus markup for a stable, mid-volume business typically runs 0.15%–0.40% + $0.05–$0.10 per transaction on top of interchange and assessment.
        </p>
        <p>
          The result: your effective rate moves with your card mix. A business that processes mostly debit and standard rewards cards might average 1.7%–2.0% all-in.
        </p>
        <p>
          A business with a lot of premium rewards cards or card-not-present transactions might average 2.3%–2.8%, even on the exact same markup.
        </p>

        <h2 className={h2}>How blended pricing actually works</h2>
        <p>
          Blended pricing takes all of that variability and compresses it into one number. A typical blended quote for a US small business runs 2.6%–2.9% + $0.10–$0.30 per transaction for in-person sales, and often higher, around 2.9% to 3.5%, for online or keyed transactions.
        </p>
        <p>
          That rate already has interchange, assessment, and the processor&apos;s margin baked in. The processor is effectively selling you insurance against cost volatility: if your customers start using more premium rewards cards next quarter, your rate doesn&apos;t move.
        </p>
        <p>
          The processor absorbs that risk and prices for it accordingly, which is why blended rates almost always sit above the <em>average</em> interchange plus effective rate, not below it.
        </p>

        <h2 className={h2}>Real-world cost comparison</h2>
        <p>
          Take a business processing $50,000/month in card-present sales, with a typical US card mix (mostly debit and standard rewards credit).
        </p>
        <Table head={["Model", "Rate Structure", "Estimated Monthly Cost"]} rows={costComparison} />
        <Figure
          name="cost-chart"
          height={900}
          alt="Bar chart comparing monthly processing cost on $50,000 in card-present sales: $965 under interchange plus versus $1,425 under a blended rate"
        />
        <p>
          That&apos;s roughly a $460/month, or $5,500/year, difference for a business with a stable, favorable card mix. This is the scenario processors use to sell interchange plus as the obvious winner, and for this type of business, it usually is.
        </p>
        <p>
          But run the same math for a business with heavy card-not-present volume, frequent premium rewards cards, or inconsistent ticket sizes, and the gap narrows or reverses.
        </p>
        <p>
          Interchange plus exposes you to every spike: a run of premium cards or a batch of international transactions can push your <em>effective</em> rate above a comparable blended quote in a given month, even though your long-run average is usually lower.
        </p>

        <h2 className={h2}>When blended pricing is the safer choice</h2>
        <p>
          Blended pricing is routinely dismissed as &quot;the expensive option,&quot; but that framing misses its actual function: cost insurance, not cost minimization. It tends to make sense when:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Your card mix is unpredictable.</strong> Seasonal businesses, B2B sellers with corporate and international cards, or marketplaces with wide customer variety benefit from a rate that doesn&apos;t swing month to month.</li>
          <li><strong className="text-foreground">Cash flow predictability matters more than marginal savings.</strong> A fixed percentage is easier to model into pricing and budgets than a rate that moves with network updates twice a year.</li>
          <li><strong className="text-foreground">You don&apos;t have the bandwidth to audit statements.</strong> Interchange plus savings only materialize if someone is checking for downgrades, surcharges, and markup creep. If no one on your team is doing that, the &quot;savings&quot; often don&apos;t show up in practice.</li>
        </ul>

        <h2 className={h2}>When interchange plus actually delivers savings</h2>
        <p>Interchange plus tends to outperform blended pricing when:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Debit cards dominate your transaction mix.</strong> Debit interchange is substantially lower than credit, and interchange plus passes that savings straight through. Blended pricing does not.</li>
          <li><strong className="text-foreground">Your ticket sizes and card types are consistent.</strong> Predictability on your end means the &quot;exposure&quot; risk of interchange plus is low in practice.</li>
          <li><strong className="text-foreground">You (or your processor relationship) can monitor the statement.</strong> Interchange plus only pays off if markup creep, junk fees, and downgrades get caught.</li>
        </ul>

        <h2 className={h2}>The factor most businesses miss: underwriting decides your options</h2>
        <p>
          Here&apos;s the part most pricing comparisons skip entirely: providers don&apos;t always let you choose. Pricing structure is downstream of risk underwriting.
        </p>
        <p>
          A processor&apos;s risk team decides how much cost unpredictability they&apos;re willing to carry for your specific business, and that decision shapes which pricing model they&apos;ll even offer you.
        </p>
        <Table head={["Underwriting Factor", "Effect on Pricing Options"]} rows={underwriting} />
        <p>
          Two businesses with identical monthly volume can be offered completely different pricing structures because their underlying risk profiles differ.
        </p>
        <p>This is why comparing rate cards before understanding your own risk profile is often a wasted exercise.</p>

        <h2 className={h2}>How to decide: a practical checklist</h2>
        <p>Before signing with a new processor or switching pricing models, work through this:</p>
        <NumberedList items={checklist} />
        <Figure
          name="decision-flow"
          height={746}
          alt="Simple decision flowchart: stable debit-heavy card mix leads to interchange plus, otherwise a question about predictable costs leads to either blended rate or interchange plus with monitoring"
        />
        <p>
          For a deeper look at the mechanics behind these numbers, read our guide to{" "}
          <Link href="/insights/pricing-models/interchange-plus-plus" className={link}>interchange++ pricing</Link>. And if your business has grown quickly and your pricing options suddenly changed, see{" "}
          <Link href="/insights/why-payment-providers-reject-growing-businesses" className={link}>why payment providers reject growing businesses</Link>.
        </p>

        <h2 className={h2}>Five red flags to check on your current statement</h2>
        <p>
          Whichever model you&apos;re on, these are the most common ways processors quietly inflate your effective rate, and they&apos;re worth checking regardless of which pricing structure you choose.
        </p>
        <NumberedList items={redFlags} />
        <p>
          Running this check once a quarter, on either pricing model, catches most of the &quot;hidden fee creep&quot; that erodes savings over time.
        </p>

        <h2 className={h2}>FAQ</h2>
        <div>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className={h3}>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </InsightsArticleLayout>
  );
};

export default InterchangePlusVsBlended;
