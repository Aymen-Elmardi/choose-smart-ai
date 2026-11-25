'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import FAQSchema from "@/components/FAQSchema";
import { Source } from "@/components/SourcesCitation";

const BASE_URL = "https://chosepayments.com";
const SLUG = "funds-on-hold-rolling-reserve-payment-processor";
const PATH = `/insights/crisis/${SLUG}`;
const HEADLINE = "What does funds on hold mean? Rolling reserves, holds, and freezes explained";
const DESCRIPTION =
  "Payment processor holding your funds? Learn the difference between a hold, freeze, and rolling reserve, how long each lasts, and how to get paid faster.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-11-20";
const IMG = "/insights/funds-on-hold";
const COVER = `${IMG}-hero.jpg`;

const faqs = [
  {
    question: "What does \"funds on hold\" mean on a payment processor account?",
    answer:
      "It means your processor has paused your payouts, usually to review a document request, a risk flag, or an unusual transaction pattern. Your account typically stays active and may still process new sales while the held funds are reviewed.",
  },
  {
    question: "What is a rolling reserve?",
    answer:
      "A rolling reserve is an ongoing hold where a percentage of each settlement, commonly 10% to 25%, is withheld for a set window, typically 30 to 90 days, then released on a rolling basis as that window passes. It's a standing risk buffer, not a one-time review.",
  },
  {
    question: "How long can a payment processor legally hold my funds?",
    answer:
      "There's no single fixed legal limit in the US; hold duration is governed by your processor's terms of service. In practice, simple verification holds resolve in 1 to 5 business days, while complex reviews can run 2 to 8 weeks. If a hold runs past 30 days with no update, escalate in writing and request a specific timeline.",
  },
  {
    question: "Why is my payment processor holding a percentage of every sale?",
    answer:
      "That's a rolling reserve, not a one-time hold. Processors use it as ongoing security against future chargebacks and refunds, usually because your account is considered higher risk based on your industry, delivery timeline, or chargeback history.",
  },
  {
    question: "Can I get my rolling reserve reduced or removed?",
    answer:
      "Often, yes, after you've built a clean processing history with low chargebacks over several months. Ask your processor directly what track record they require to reduce or remove the reserve, since policies vary significantly by provider and risk category.",
  },
];

const sources: Source[] = [
  { name: "Stripe: Reserves", url: "https://support.stripe.com/topics/reserves", type: "official" },
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
  articleSection: "Crisis Intervention",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${PATH}` },
  keywords: "funds on hold, what does funds on hold mean, rolling reserve, what is a rolling reserve, payment processor holding funds",
  citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })),
};

const reserveRows = [
  ["1", "$1,000", "$0", "$1,000"],
  ["2", "$1,000", "$0", "$2,000"],
  ["3", "$1,000", "$0", "$3,000"],
  ["4", "$1,000", "$1,000", "$3,000"],
  ["5 and onward", "$1,000", "$1,000", "$3,000 (steady state)"],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";

// WebP on the page, JPEG as fallback. All images are 1600 x 900.
const Figure = ({ name, alt, priority = false }: { name: string; alt: string; priority?: boolean }) => (
  <picture>
    <source srcSet={`${IMG}-${name}.webp`} type="image/webp" />
    <img
      src={`${IMG}-${name}.jpg`}
      alt={alt}
      width={1600}
      height={900}
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const, decoding: "async" as const })}
      className="w-full h-auto rounded-lg border border-border my-8"
    />
  </picture>
);

const FundsOnHold = () => {
  return (
    <InsightsArticleLayout
      title="Funds on hold: what it means and how rolling reserves work"
      description={DESCRIPTION}
      category={{ name: "Crisis Intervention", slug: "crisis" }}
      cluster="crisis"
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
        priority
        alt="Three labeled states of a merchant account: hold (paused, temporary), freeze (suspended, no processing), and rolling reserve (ongoing, a percentage withheld)"
      />

      <div className="text-muted-foreground space-y-6">
        <p>
          Logging into your payment dashboard and seeing &quot;funds on hold&quot; is one of the most stressful moments in running a business, especially when that money covers payroll, rent, or a supplier invoice due this week. The good news: holds are common, usually temporary, and almost always resolvable once you understand exactly what&apos;s happening and respond the right way.
        </p>
        <p>
          The bad news: &quot;funds on hold,&quot; &quot;account freeze,&quot; and &quot;rolling reserve&quot; get used interchangeably online, and they are three very different things with three very different timelines.
        </p>

        <h2 className={h2}>Hold vs. freeze vs. reserve: what&apos;s actually happening</h2>
        <p>
          <strong className="text-foreground">A hold</strong> means your processor has paused payouts while reviewing something specific, usually a document request, a risk flag, or an unusual transaction. Your account is typically still active and may keep processing new transactions even while the hold is in place.
        </p>
        <p>
          <strong className="text-foreground">A freeze</strong> is more severe: your processor has suspended the account entirely. No new processing, no payouts, until the freeze is lifted. Freezes usually follow a serious compliance issue, a sustained spike in chargebacks, or a determination that the account violates the processor&apos;s terms of service. If this is what you&apos;re facing, see our guide on{" "}
          <Link href="/insights/why-accounts-get-flagged-after-growth" className={link}>why accounts get flagged after growth</Link>{" "}
          and{" "}
          <Link href="/insights/why-payment-accounts-get-frozen-without-warning" className={link}>why payment accounts get frozen without warning</Link>.
        </p>
        <p>
          <strong className="text-foreground">A rolling reserve</strong> is different again: it&apos;s a planned, ongoing withholding, not a response to a single event. A percentage of every settlement is held back for a set window (commonly 30 to 90 days) as security against future chargebacks and refunds, then released on a rolling basis as that window passes.{" "}
          <a href={sources[0].url} target="_blank" rel="noopener noreferrer" className={link}>Stripe&apos;s own documentation on reserves</a>{" "}
          describes a representative example of a 25% rolling reserve with a 30-day hold window, though the exact percentage and duration vary by account risk.
        </p>
        <p>
          Confusing these three matters because the fix for each is completely different. You can&apos;t negotiate your way out of a one-time hold the same way you negotiate a standing rolling reserve, and a freeze requires a different response entirely than either.
        </p>

        <h2 className={h2}>Why payment processors hold or reserve funds</h2>
        <p>
          Processors aren&apos;t holding your money to be difficult. From their perspective, every transaction they fund before settlement is a loan against a sale that could still be disputed, refunded, or reversed. Holds and reserves exist to manage that risk. Common triggers include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A sudden spike in transaction volume or average ticket size relative to your account history</li>
          <li>Increased chargeback or refund activity, especially if it&apos;s trending upward</li>
          <li>A product or service change that wasn&apos;t reflected in your original application</li>
          <li>Outstanding document requests: identity verification, proof of delivery, bank statements</li>
          <li>Transactions flagged by automated fraud and risk systems</li>
          <li>Regulatory requirements, including anti-money laundering checks on larger or unusual transfers</li>
        </ul>

        <h2 className={h2}>What a rolling reserve actually costs you</h2>
        <Figure
          name="reserve-example"
          alt="Example showing $10,000 in monthly sales with a 10% rolling reserve: $1,000 held back each month, with the running held balance growing over the first 90 days before reaching a steady state of $3,000"
        />
        <p>
          A rolling reserve doesn&apos;t take money from you permanently, but it does tie up real cash flow, and the effect compounds in your first few months on a new account. Take a business settling $10,000 a month under a 10% rolling reserve with a 90-day hold:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className={th}>Month</th>
                <th className={th}>New reserve withheld</th>
                <th className={th}>Reserve released from 90 days prior</th>
                <th className={th}>Running held balance</th>
              </tr>
            </thead>
            <tbody>
              {reserveRows.map((row) => (
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
          By month four, this business has a permanent $3,000 buffer locked up at any given time, money it never fully gets back until the account closes and the final reserve period lapses. For a business running on thin margins, that&apos;s a real cash flow hit, not just a technicality, which is exactly why a backup processor or a cash buffer matters in your first 90 days on any new high-risk-adjacent account.
        </p>

        <h2 className={h2}>What to do immediately if your funds are held</h2>
        <Figure
          name="action-checklist"
          alt="Five-step checklist for responding to a funds hold: check your dashboard, respond completely, stay factual, document every interaction, and have a backup processor ready"
        />
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className="text-foreground">Check your email and provider dashboard first.</strong> Most holds arrive with a notification explaining exactly what&apos;s needed. Look specifically for document requests or compliance notices before assuming the worst.</li>
          <li><strong className="text-foreground">Respond completely, not partially.</strong> The single biggest factor in how long a hold lasts is how fast and how thoroughly you provide what&apos;s requested. A partial response often resets the review clock back to day one.</li>
          <li><strong className="text-foreground">Keep it factual, not urgent.</strong> Risk and compliance teams respond to clean documentation, not escalation. Submit bank statements, delivery confirmations, invoices, and a clear written explanation of your business model.</li>
          <li><strong className="text-foreground">Document every interaction.</strong> Save timestamps, ticket numbers, and copies of everything you submit. If the review runs long, this record protects you and speeds up any escalation.</li>
          <li><strong className="text-foreground">Have a backup processor ready.</strong> If the held funds are critical to near-term cash flow, a second processor already set up is the cheapest insurance you can buy. Multi-provider setups are standard practice once a business is processing meaningful volume, precisely so one provider&apos;s review never becomes a full stop on revenue.</li>
        </ol>
        <p>
          If this isn&apos;t your first hold with this provider, it&apos;s worth asking whether the real issue is a mismatch between your business model and their risk appetite. See{" "}
          <Link href="/insights/why-some-businesses-never-get-approved" className={link}>why some businesses struggle to get approved</Link>{" "}
          and, if you&apos;ve already been rejected outright, our guide on{" "}
          <Link href="/insights/crisis/rejected-by-stripe-or-square-high-risk-merchant-account" className={link}>getting approved after a Stripe or Square rejection</Link>.
        </p>
        <p>
          If PayPal is the one holding your money, read our guide to{" "}
          <Link href="/insights/paypal-money-on-hold" className={link}>PayPal money on hold</Link>.
        </p>

        <h2 className={h2}>How long do holds and reserves actually last?</h2>
        <Figure
          name="duration-chart"
          alt="Horizontal comparison chart: simple verification hold at 1 to 5 days, complex compliance review at 2 to 8 weeks, and rolling reserve window at 30 to 90 days, ongoing"
        />
        <p>
          Simple verification holds, the kind triggered by a document request, typically resolve in <strong className="text-foreground">1 to 5 business days</strong> once you submit what&apos;s asked for. More complex reviews, especially ones involving card network inquiries or anti-money-laundering checks, can run <strong className="text-foreground">2 to 8 weeks</strong>.
        </p>
        <p>
          Rolling reserves are different by design: they&apos;re not meant to resolve quickly, since the whole point is an ongoing buffer. Most run on a <strong className="text-foreground">30 to 90 day rolling window</strong>, meaning funds held today are released that many days later, continuously, for as long as the reserve policy is in place on your account.
        </p>
        <p>
          If a one-time hold extends past 30 days with no clear communication, escalate in writing. Ask for a specific timeline and the name of the team handling the review. A processor unwilling to give you either of those after 30 days is a signal worth taking seriously.
        </p>

        <h2 className={h2}>How to prevent future holds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Tell your provider about changes before they happen</strong>: new product lines, a jump in average order value, or expansion into new markets. Surprises are what trigger automated flags.</li>
          <li><strong className="text-foreground">Monitor your chargeback ratio proactively</strong> and respond to disputes quickly rather than letting them accumulate.</li>
          <li><strong className="text-foreground">Keep standing documentation on hand</strong>: recent bank statements, proof-of-delivery records, and a current description of your business model, so a request doesn&apos;t catch you flat-footed.</li>
          <li>
            <strong className="text-foreground">Choose a provider whose risk appetite matches your business from the start.</strong> A business with international sales, high average tickets, or deferred delivery timelines will see far fewer holds with a provider built for that risk profile than with a generic low-risk PayFac. Our guide on{" "}
            <Link href="/insights/payment-provider-risk-models" className={link}>payment provider risk models</Link>{" "}
            explains how that matching actually works.
          </li>
          <li><strong className="text-foreground">Understand your reserve terms in writing</strong> before you sign with any new processor, including the exact percentage, the hold window, and the conditions under which it can be increased or extended.</li>
        </ul>

        <h2 className={h2}>Key takeaway</h2>
        <p>
          A fund hold is a risk management mechanism, not a verdict on your business. Responding quickly with complete, factual documentation is the fastest path through almost any hold. A rolling reserve is a different animal entirely: a standing cost of doing business with that provider, priced into your cash flow from day one. If you&apos;re seeing repeated holds rather than a one-off review, the real problem usually isn&apos;t any single transaction. It&apos;s a mismatch between your business and that processor&apos;s risk appetite, and the fix is a provider built for your actual risk profile, not another appeal.
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

export default FundsOnHold;
