'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import FAQSchema from "@/components/FAQSchema";

// US Stripe pricing article. Standalone: it does not link to or from the UK
// article at /insights/stripe-fees-explained.

const BASE_URL = "https://chosepayments.com";
const SLUG = "what-does-stripe-charge-us-businesses";
const PATH = `/insights/${SLUG}`;
const HEADLINE = "What Does Stripe Charge US Businesses? Every Fee, Explained (2026)";
const DESCRIPTION =
  "Stripe charges US businesses 2.9% + 30¢ per online card payment. See every other fee, what you really pay by order size, and what users say about Stripe.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-11-21";
const IMG = "/insights/stripe-fees-us";

const faqs = [
  {
    question: "Is Stripe free to use?",
    answer:
      "No setup or monthly fee on standard pricing. You pay only when you take a payment: 2.9% + 30¢ per successful online card payment in the US. Failed payments aren't charged.",
  },
  {
    question: "Does Stripe have a monthly fee?",
    answer:
      "None for standard payments. Some optional products, like paid Radar plans or annual Billing contracts, have monthly pricing.",
  },
  {
    question: "Does Stripe return its fee when you refund a customer?",
    answer:
      "No. Stripe doesn't charge you to send a refund, but on standard pricing it keeps the original processing fee and any currency conversion fee.",
  },
  {
    question: "How much is Stripe's dispute fee?",
    answer: "$15 per dispute. Contesting it costs another $15, which Stripe returns only if you win.",
  },
  {
    question: "Can you negotiate Stripe fees?",
    answer:
      "Yes, if you process large volume. Stripe offers custom pricing to high-volume businesses but doesn't publish the threshold. Smaller businesses usually pay the standard rate.",
  },
  {
    question: "Can you pass Stripe fees on to customers?",
    answer:
      "In most US states, yes, as a surcharge on credit card payments. Card network rules cap the surcharge, it can't be added to debit card payments, and a few states restrict it. Check your state's rules before you add one.",
  },
  {
    question: "Are Stripe fees tax deductible?",
    answer:
      "Generally yes. Payment processing fees are usually treated as an ordinary business expense. Confirm with your accountant how to record them.",
  },
];

// Article schema written here (layout schema off), with the values from the brief.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  image: `${BASE_URL}${IMG}-hero.webp`,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: "en-US",
  mainEntityOfPage: `${BASE_URL}${PATH}`,
  author: { "@type": "Person", name: "Aymen Elmardi" },
  publisher: {
    "@type": "Organization",
    name: "ChosePayments",
    url: `${BASE_URL}/`,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png` },
  },
  about: { "@type": "Organization", name: "Stripe", url: "https://stripe.com" },
};

const feeRows = [
  ["Online card or wallet (Apple Pay, Google Pay)", "2.9% + 30¢"],
  ["In-person card (Stripe Terminal)", "2.7% + 5¢"],
  ["Manually entered card", "Extra 0.5%"],
  ["International card", "Extra 1.5%"],
  ["Currency conversion", "Extra 1%"],
  ["ACH Direct Debit", "0.8%, capped at $5"],
  ["Instant Payouts", "1.5% of the payout, 50¢ minimum"],
  ["Dispute received", "$15"],
  ["Dispute you contest", "Another $15, returned if you win"],
  ["Monthly or setup fee", "None on standard pricing"],
];

const orderRows = [
  ["$10", "$0.59", "5.9%"],
  ["$25", "$1.03", "4.1%"],
  ["$60", "$2.04", "3.4%"],
  ["$150", "$4.65", "3.1%"],
  ["$500", "$14.80", "3.0%"],
];

const monthRows = [
  ["2.9% on $85,000 of US card sales", "$2,465"],
  ["5.4% on $15,000 of international sales with conversion", "$810"],
  ["30¢ on about 1,667 orders", "$500"],
  ["5 disputes at $15", "$75"],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";

const Table = ({ head, rows, total }: { head: string[]; rows: string[][]; total?: string[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border border-border rounded-lg">
      <thead>
        <tr className="bg-muted">
          {head.map((h) => <th key={h} className={th}>{h}</th>)}
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
        {total && (
          <tr className="border-t border-border">
            {total.map((cell, i) => <td key={i} className="p-3 font-bold text-foreground">{cell}</td>)}
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// WebP on the page, PNG as fallback. Width and height are set per image so
// the layout doesn't shift while it loads.
const Figure = ({ name, alt, width, height, priority = false }: { name: string; alt: string; width: number; height: number; priority?: boolean }) => (
  <picture>
    <source srcSet={`${IMG}-${name}.webp`} type="image/webp" />
    <img
      src={`${IMG}-${name}.png`}
      alt={alt}
      width={width}
      height={height}
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const })}
      className="w-full h-auto rounded-lg border border-border my-8"
    />
  </picture>
);

const ext = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={link}>{text}</a>
);

const StripeFeesUS = () => {
  return (
    <InsightsArticleLayout
      title="What Does Stripe Charge US Businesses?"
      description={DESCRIPTION}
      category={{ name: "Fees & Costs", slug: "fees" }}
      currentSlug={SLUG}
      publishedTime={PUBLISHED}
      modifiedTime={PUBLISHED}
      showArticleSchema={false}
      showInlineCTA={false}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{HEADLINE}</h1>
      <ArticleByline />

      {/* The hero is the largest element on load (LCP), so it is fetched first. */}
      <Figure
        name="hero"
        width={1600}
        height={900}
        priority
        alt="Stripe fees for US businesses in 2026: 2.9% + 30¢ per online card payment, 2.7% + 5¢ in person, 1.5% extra for international cards, 1% for currency conversion, 0.8% for ACH capped at $5, a $15 dispute fee and no monthly fee."
      />

      <div className="text-muted-foreground space-y-6">
        <p>
          Stripe charges US businesses <strong className="text-foreground">2.9% + 30¢</strong> for each successful online card payment. International cards add 1.5%, currency conversion adds 1%, and in-person payments cost 2.7% + 5¢. There&apos;s no monthly fee and no setup fee on standard pricing.
        </p>
        <p>
          That headline rate is only part of what you pay. Small orders, international customers, refunds and disputes all push your real cost higher, and the fee is only one part of choosing a processor. This guide covers every Stripe fee a US business pays, what you actually pay at different order sizes, and what US businesses say about using Stripe.
        </p>
        <p>
          <em>Prices checked against {ext("https://stripe.com/pricing", "Stripe's US pricing page")} in November 2026.</em>
        </p>

        <h2 className={h2}>Stripe&apos;s fees for US businesses at a glance</h2>
        <Table head={["Payment type", "Stripe fee (US)"]} rows={feeRows} />

        <h2 className={h2}>How much does Stripe charge per transaction?</h2>
        <p>
          On a standard US card payment, Stripe takes 2.9% of the sale plus a flat 30¢. That 30¢ matters more than most people expect. On small orders it can double your real rate.
        </p>
        <Figure
          name="order-size"
          width={1600}
          height={1000}
          alt="Bar chart of Stripe's real fee rate by order size: 5.9% on a $10 order, 4.1% on $25, 3.4% on $60, 3.1% on $150 and 3.0% on $500, compared with the advertised 2.9%."
        />
        <Table head={["Order value", "Stripe fee", "Real rate"]} rows={orderRows} />
        <p>
          If your average order is under $30, you&apos;re paying well over 4%, not 2.9%. Stores with small baskets feel Stripe&apos;s pricing the most.
        </p>

        <h2 className={h2}>Stripe international fees</h2>
        <p>
          Stripe adds 1.5% when your customer pays with a card issued outside the US, and another 1% if the payment needs converting from a different currency. Both are added on top of the standard rate.
        </p>
        <Figure
          name="international"
          width={1600}
          height={820}
          alt="Stripe fees on a $60 order: $2.04 from a US customer, $2.94 from a foreign card charged in US dollars, and $3.54 from a foreign card converted from another currency."
        />
        <p>
          If a meaningful share of your sales comes from outside the US, this is often the biggest gap between the rate you expect and the rate you pay.
        </p>

        <h2 className={h2}>Stripe fees most businesses miss</h2>

        <h3 className={h3}>Refunds don&apos;t return the fee</h3>
        <p>
          Stripe doesn&apos;t charge you to send a refund, but on standard pricing it keeps the original processing fee. Refund a $60 order and you&apos;re still out the $2.04 you paid to take it. Any currency conversion fee isn&apos;t returned either.
        </p>

        <h3 className={h3}>Disputes cost $15, and contesting costs $15 more</h3>
        <p>
          When a customer disputes a charge with their bank, Stripe charges $15. If you contest it, Stripe charges another $15, which you get back only if you win. This second fee has applied to disputes contested since June 2025.
        </p>
        <Figure
          name="dispute-cost"
          width={1600}
          height={900}
          alt="Breakdown of a lost $60 Stripe dispute costing $92.04: the $60 sale, the $2.04 original fee, the $15 dispute fee and the $15 fee to contest it."
        />
        <p>
          Disputes also affect how Stripe sees your account. A rising dispute rate is one of the most common reasons Stripe reviews accounts, holds payouts or sets a reserve.{" "}
          <Link href="/insights/crisis/stripe-account-frozen" className={link}>Why Stripe freezes accounts</Link>
        </p>

        <h3 className={h3}>Manually entered cards cost 0.5% more</h3>
        <p>
          Typing a card number in by hand, for phone orders for example, adds 0.5%.
        </p>

        <h3 className={h3}>Instant Payouts cost 1.5%</h3>
        <p>
          Standard payouts to your bank account are free. If you want your money the same day, Instant Payouts cost 1.5% of the amount, with a 50¢ minimum.
        </p>

        <h3 className={h3}>Add-on products</h3>
        <p>These are optional, but many growing businesses use at least one:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Radar fraud screening:</strong> paid plans with extra controls start at $10 a month or 5¢ per screened transaction.</li>
          <li><strong className="text-foreground">Billing (subscriptions):</strong> 0.7% of billing volume on pay as you go.</li>
          <li><strong className="text-foreground">Invoicing:</strong> 0.4% per paid invoice.</li>
          <li><strong className="text-foreground">Tax:</strong> 0.5% per transaction on Tax Basic.</li>
          <li><strong className="text-foreground">Connect (marketplaces and platforms):</strong> included at no extra cost on standard pricing. Platforms that set their own pricing start at 0.25%.</li>
        </ul>

        <h2 className={h2}>What Stripe really costs: a monthly example</h2>
        <p>
          Here&apos;s a realistic month for a US online store doing $100,000 in sales with a $60 average order, where 15% of sales come from international customers.
        </p>
        <Figure
          name="monthly-cost"
          width={1600}
          height={820}
          alt="Example month for a US store with $100,000 in sales paying $3,850 in Stripe fees, a real rate of 3.9%: $2,465 on US card sales, $810 on international sales, $500 in 30¢ fees and $75 in dispute fees."
        />
        <Table head={["Cost", "Amount"]} rows={monthRows} total={["Total", "$3,850"]} />
        <p>
          That&apos;s about <strong className="text-foreground">3.9% of sales</strong>, a full point above the 2.9% headline, and it&apos;s before any fees kept on refunds or lost disputes.
        </p>
        <p>
          To find your own number, add up last month&apos;s Stripe fees and divide by your total sales. That&apos;s your real rate. If it&apos;s well above 3%, it&apos;s worth seeing whether you can{" "}
          <Link href="/assessment" className={link}>find a processor that costs less for your business</Link>. It takes 5 quick questions.
        </p>

        <h2 className={h2}>What US businesses say about Stripe: the good and the bad</h2>
        <p>
          Fees are only part of the picture. A processor that&apos;s slightly cheaper isn&apos;t worth much if it holds your payouts or you can&apos;t reach anyone when something goes wrong. Here&apos;s how Stripe rates on three major review sites, and what reviewers praise and complain about most.
        </p>
        <Figure
          name="review-scores"
          width={1600}
          height={820}
          alt="Stripe review ratings in November 2026: 4.2 out of 5 on G2 from 467 reviews, 4.6 out of 5 on Capterra from 3,386 reviews, and 1.6 out of 5 on Trustpilot from 17,562 reviews."
        />
        <p><strong className="text-foreground">What users like</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Fast setup.</strong> Most businesses can sign up and take payments the same day.</li>
          <li><strong className="text-foreground">Easy integrations.</strong> Stripe connects with most ecommerce platforms, invoicing and accounting tools, and its developer tools are widely praised.</li>
          <li><strong className="text-foreground">A clean dashboard.</strong> Reporting is clear and easy to use.</li>
          <li><strong className="text-foreground">Many ways to get paid.</strong> Cards, wallets, ACH, tap to pay and payment links all run from one account.</li>
        </ul>
        <p><strong className="text-foreground">What users don&apos;t like</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Fees that feel high.</strong> Especially for small businesses, small orders and manually entered cards.</li>
          <li><strong className="text-foreground">Support that&apos;s hard to reach.</strong> A common complaint, particularly during disputes and account reviews.</li>
          <li><strong className="text-foreground">Holds, reserves and closures.</strong> Some reviewers describe funds held for long periods or accounts closed with little explanation.</li>
          <li><strong className="text-foreground">A confusing dispute process.</strong> Reviewers say outcomes and the evidence needed aren&apos;t always clear.</li>
        </ul>
        <p>
          <strong className="text-foreground">How to read the scores.</strong>{" "}
          {ext("https://www.g2.com/products/stripe-stripe-payments/reviews", "G2")} and{" "}
          {ext("https://www.capterra.com/p/123889/Stripe/reviews/", "Capterra")} collect reviews from business software users.{" "}
          {ext("https://www.trustpilot.com/review/stripe.com", "Trustpilot")} is open to anyone, including shoppers, and people with a problem are more likely to post there. The pattern across all three is the same: Stripe works well for most businesses while the account is in good standing. The frustration comes when it isn&apos;t.
        </p>
        <p>
          That&apos;s why the fee shouldn&apos;t be your only test. Ask too whether a processor approves your type of business, how it handles payout holds, and whether you can reach a person when you need one.
        </p>

        <h2 className={h2}>Can you lower your Stripe fees?</h2>
        <p>Yes, in four ways. Some work inside Stripe and some mean looking beyond it.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-foreground">Ask Stripe for custom pricing.</strong> Stripe offers custom rates to businesses with large payment volume or unusual business models. It doesn&apos;t publish a threshold, so it&apos;s worth asking once your volume is steady.</li>
          <li>
            <strong className="text-foreground">Move large payments to ACH.</strong> ACH Direct Debit costs 0.8%, capped at $5. A $2,000 invoice costs $58.30 by card and $5 by ACH, which makes ACH a strong option for B2B invoices and large orders.{" "}
            <Link href="/ach-payment-processors" className={link}>When bank transfer beats cards</Link>
          </li>
          <li><strong className="text-foreground">Pass some of the cost to customers.</strong> Adding a surcharge to credit card payments is allowed in most US states, but card network rules cap it and it&apos;s never allowed on debit cards. A few states restrict it, so check your state&apos;s rules first.</li>
          <li>
            <strong className="text-foreground">Switch to interchange-plus pricing.</strong> Stripe&apos;s flat rate charges every card the same, whether it&apos;s a premium rewards card or a debit card. With interchange-plus, you pay what the card network charges for each card, plus a fixed markup you can see. For businesses with steady volume and plenty of debit card payments, this often costs less.{" "}
            <Link href="/insights/pricing-models/interchange-plus-plus" className={link}>How interchange-plus pricing works</Link>
          </li>
        </ol>

        <h2 className={h2}>When Stripe stops being the right fit</h2>
        <p>
          Stripe is a good choice for many US businesses, especially early on. Its pricing is simple, setup takes minutes and there&apos;s no monthly fee. It&apos;s often not your best option when:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You process steady, high volume and haven&apos;t negotiated your rate.</li>
          <li>Your average order is high, where interchange-plus pricing usually saves more.</li>
          <li>Many of your customers pay by debit card, which costs far less at the card network level than Stripe charges for it.</li>
          <li>You invoice other businesses, where ACH or lower-cost B2B card pricing makes more sense.</li>
          <li>
            You sell in a category Stripe treats as higher risk, where holds and reserves cost you more than any fee.{" "}
            <Link href="/insights/rolling-vs-fixed-reserve" className={link}>How reserves work</Link>
          </li>
        </ul>
        <p>
          None of this means you have to leave Stripe. Many businesses keep it for some payments and add a second processor for the rest, which also gives them a backup if Stripe ever holds their payouts.
        </p>
        <p>
          If Stripe has already frozen your account, held your payouts or turned you down,{" "}
          <Link href="/contact" data-cta="write" data-placement="end" className={link}>write to us</Link>{" "}
          and tell us what happened. We&apos;ll tell you which US processors would approve your business.
        </p>
        <p>
          To see how Stripe compares with specific providers, read{" "}
          <Link href="/insights/comparisons/stripe-vs-paypal" className={link}>Stripe vs PayPal</Link> and{" "}
          <Link href="/insights/stripe-vs-adyen" className={link}>Stripe vs Adyen</Link>.
        </p>

        <h2 className={h2}>Frequently asked questions about Stripe fees</h2>
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

export default StripeFeesUS;
