'use client'
import Link from 'next/link';
import { BOOKING_URL } from "@/lib/booking";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import FAQSchema from "@/components/FAQSchema";
import { Source } from "@/components/SourcesCitation";

const BASE_URL = "https://chosepayments.com";
const SLUG = "rejected-by-stripe-or-square-high-risk-merchant-account";
const PATH = `/insights/crisis/${SLUG}`;
const HEADLINE = "Rejected by Stripe or Square? Why your business needs a high-risk merchant account strategy";
// The schema description from the brief: the meta description without "Book a free call."
const SCHEMA_DESCRIPTION =
  "Stripe or Square rejected your business? Learn why, what high-risk means, and how to get approved with a high-risk merchant account provider.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-11-04";
const IMG = "/insights/rejected-stripe-square";
const COVER = `${IMG}-hero.jpg`;

const faqs = [
  {
    question: "Why did Stripe or Square reject my account without a clear reason?",
    answer:
      "Both platforms rely heavily on automated underwriting designed for standardized, low-risk businesses. A vague rejection usually means your business model, MCC, ticket size, or delivery timeline triggered an automated risk flag rather than a manual review, so the email rarely cites specifics.",
  },
  {
    question: "What is the MATCH list and how do I know if I'm on it?",
    answer:
      "MATCH (Mastercard Alert to Control High-risk Merchants) is a shared database acquirers use to flag merchants terminated for cause. You typically find out you're on it when applications from unrelated processors are all declined; you can also ask a prospective high-risk provider to check on your behalf before you apply elsewhere.",
  },
  {
    question: "Will a high-risk merchant account cost more than Stripe or Square?",
    answer:
      "Usually yes. Expect processing rates roughly 3.5%–6%+ depending on your MCC, plus a rolling reserve of 5%–10% of volume. That cost reflects manual underwriting and specialized risk management, and it's typically far cheaper than the cost of repeated rejections or a frozen account.",
  },
  {
    question: "Can I ever go back to Stripe or Square after being rejected?",
    answer:
      "Sometimes, once your business has a stable processing history with a specialized provider and your chargeback ratio is clean, you may qualify for standard PayFacs again. It's not guaranteed, and many high-risk businesses find the specialized provider relationship works better long-term anyway.",
  },
  {
    question: "How long does it take to get approved with a high-risk provider?",
    answer:
      "Typically 3–10 business days for a complete application with full documentation, compared to the near-instant automated approval (or rejection) from Stripe or Square. Manual underwriting takes longer but results in a far more stable account relationship.",
  },
];

const sources: Source[] = [
  { name: "Stripe: The MATCH list", url: "https://docs.stripe.com/disputes/match", type: "official" },
];

// Article schema written here (layout schema off) so the author is a Person,
// as the brief specifies. Headline matches the visible H1; the publisher is
// the site-wide Organization node rather than the brief's /logo.png URL.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: SCHEMA_DESCRIPTION,
  image: `${BASE_URL}${COVER}`,
  author: { "@type": "Person", name: "Aymen Elmardi", jobTitle: "Payments Expert" },
  publisher: { "@id": `${BASE_URL}/#organization` },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  articleSection: "Crisis Intervention",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${PATH}` },
  keywords: "rejected by stripe or square, high risk merchant account, stripe account rejected, merchant account for high risk business",
  citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })),
};

const riskFactors = [
  ["Future delivery / deferred fulfillment", "Annual subscriptions, pre-orders, event tickets, travel bookings", "Risk of non-delivery triggering mass chargebacks if the business can't fulfill"],
  ["High average ticket size", "Luxury goods, high-ticket coaching, B2B consulting, expensive equipment", "Higher potential loss per fraudulent or disputed transaction"],
  ["Regulated or restricted industries", "CBD, supplements, nutraceuticals, gambling, adult content, debt services, firearms accessories", "Elevated compliance burden and regulatory exposure for the PayFac"],
  ["Elevated chargeback history", "Any business with a documented history of disputes", "Risk of being enrolled in Visa or Mastercard's chargeback monitoring programs"],
  ["Significant international or cross-border sales", "High volume from non-US customers or high-fraud regions", "Harder to verify, higher fraud rates, more complex compliance"],
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

const RejectedByStripeOrSquare = () => {
  return (
    <InsightsArticleLayout
      title="Rejected by Stripe or Square? High-Risk Account Guide"
      description={SCHEMA_DESCRIPTION}
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
        height={900}
        priority
        alt="A vague rejection email next to a checklist of what's actually being evaluated: MCC, ticket size, delivery model, and chargeback history"
      />

      <div className="text-muted-foreground space-y-6">
        <p>
          An email lands in your inbox: your Stripe or Square application has been rejected, or your account has been flagged for closure. The message is usually vague (&quot;risk,&quot; &quot;policy violation,&quot; &quot;unable to support your business&quot;) with no specifics and no appeal path that actually works.
        </p>
        <p>
          It feels personal. It isn&apos;t. A rejection from Stripe or Square is a technical mismatch between your business model and an automated underwriting system, not a judgment on whether your business is legitimate. Understanding why that mismatch happens is the first step to actually fixing it, and the fix is rarely &quot;apply again and hope.&quot;
        </p>

        <h2 className={h2}>What &quot;high-risk&quot; actually means (it&apos;s not what you think)</h2>
        <p>
          &quot;High-risk&quot; is an underwriting classification, not a moral or legal judgment. It means the payments industry has determined your business carries a statistically higher probability of chargebacks, fraud, or regulatory exposure than a standard retail transaction.
        </p>
        <p>
          Stripe and Square are Payment Facilitators (PayFacs): they aggregate thousands of small merchants under one master merchant account and lean almost entirely on automated underwriting to keep onboarding fast and costs low. That automation is efficient for low-risk, high-volume, standardized businesses. It is also why it rejects or shuts down businesses that don&apos;t fit a predictable pattern, often without a human ever reviewing the file.
        </p>

        <h3 className={h3}>Common triggers for Stripe and Square rejections</h3>
        <Table head={["High-Risk Factor", "Example Business Models", "Why PayFacs Flag It"]} rows={riskFactors} />

        <h2 className={h2}>Why &quot;just apply to another PayFac&quot; backfires</h2>
        <p>
          After a rejection, the instinct is to try Stripe, then Square, then PayPal, hoping one approves. This rarely works, and it can actively hurt your long-term chances.
        </p>
        <p>
          Payment processors share fraud and risk data through industry consortiums and internal blacklists, the most consequential being MATCH (the Mastercard Alert to Control High-risk Merchants list). You can read{" "}
          <a href={sources[0].url} target="_blank" rel="noopener noreferrer" className={link}>Stripe&apos;s own documentation on MATCH</a>{" "}
          for how seriously processors treat it. A pattern of rejections, or worse, a terminated merchant account, creates a record that follows your business EIN and, in some cases, your personal SSN as a principal.
        </p>
        <p>
          <strong className="text-foreground">If you&apos;ve been placed on the MATCH list</strong>, most mainstream PayFacs and acquirers will auto-decline your application before a human ever sees it. This is the single most important thing to find out before applying anywhere else. Ask any prospective provider to run a MATCH check, or request it directly if you suspect you were terminated for cause.
        </p>
        <p>
          Repeated rejections don&apos;t just waste time. They build a pattern that makes each subsequent application look worse, not better.
        </p>

        <h2 className={h2}>The real fix: a risk-aligned payment strategy</h2>
        <p>
          If Stripe or Square has rejected or closed your account, the solution isn&apos;t a better Stripe application. It&apos;s a different category of provider entirely: a <strong className="text-foreground">high-risk merchant account provider</strong>, working through a specialized acquiring bank rather than a one-size-fits-all PayFac.
        </p>
        <p>These providers operate on a fundamentally different model:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Manual underwriting.</strong> A human underwriter reviews your actual business model, financials, and risk mitigation steps, rather than relying solely on an automated rules engine.</li>
          <li><strong className="text-foreground">Industry-specific risk tools.</strong> Specialized fraud scoring, reserve structures, and compliance processes built for your specific Merchant Category Code (MCC): CBD, travel, nutraceuticals, adult content, and high-ticket B2B all have dedicated acquiring relationships in the US market.</li>
          <li><strong className="text-foreground">Priced-in stability.</strong> Because these providers underwrite you based on your actual risk profile upfront (often with a rolling reserve or slightly higher processing rate), they are far less likely to freeze or terminate your account later. The risk is priced in from day one instead of discovered after the fact.</li>
        </ul>
        <Figure
          name="underwriting-compare"
          height={900}
          alt="Side-by-side comparison of automated PayFac underwriting versus manual high-risk underwriting"
        />
        <p>
          The trade-off is real: expect higher processing rates (often 3.5%–6%+ depending on MCC), rolling reserves (typically 5%–10% of volume held for a set period), and more documentation upfront. For a business that&apos;s been rejected by standard PayFacs, this is usually a far better trade than repeated terminations and frozen funds.
        </p>

        <h2 className={h2}>How to actually get approved after a rejection</h2>
        <Figure
          name="risk-factor-table"
          height={1093}
          alt="Infographic listing five factors that trigger a high-risk flag: future delivery, high ticket size, regulated industries, chargeback history, and international sales"
        />

        <h3 className={h3}>1. Get a precise reason for the rejection</h3>
        <p>
          Stripe and Square rejection emails are deliberately vague, but you can often get more specifics by contacting support directly and asking for the exact reason code or policy section cited. Was it your MCC, your ticket size, your delivery model, or a chargeback pattern? The fix depends entirely on the cause.
        </p>

        <h3 className={h3}>2. Check the MATCH list before applying anywhere else</h3>
        <p>
          If your account was terminated (not just an application rejected), assume you may be on MATCH until you confirm otherwise. Applying to a dozen more mainstream processors while on MATCH guarantees a dozen more rejections.
        </p>

        <h3 className={h3}>3. Build a complete application package proactively</h3>
        <p>High-risk underwriters want to see what a PayFac&apos;s algorithm can&apos;t evaluate:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>3–6 months of processing statements (if you have prior history)</li>
          <li>Clear refund, delivery, and customer service policies</li>
          <li>Business licenses and any industry-specific compliance documentation</li>
          <li>A plain-language explanation of your fulfillment timeline and chargeback mitigation steps</li>
        </ul>
        <Figure
          name="application-checklist"
          height={900}
          alt="Checklist of four documents a high-risk application package should include"
        />

        <h3 className={h3}>4. Target the right category of provider, not a marketplace</h3>
        <p>
          Specialized high-risk acquirers generally don&apos;t advertise on the same comparison sites as Stripe and Square. Finding the two or three providers that actually specialize in your exact MCC and risk profile matters more than requesting quotes from a dozen generic &quot;high risk merchant services&quot; sites. If you want to understand the pattern behind repeated declines first, read{" "}
          <Link href="/insights/why-some-businesses-never-get-approved" className={link}>why some businesses struggle to get approved</Link>{" "}
          and{" "}
          <Link href="/insights/provider-appetite-index" className={link}>the provider appetite index on why processors say no</Link>.
        </p>

        <h3 className={h3}>5. Expect and negotiate the reserve structure</h3>
        <p>
          Rolling reserves aren&apos;t negotiable in principle for most high-risk MCCs, but the percentage and release schedule often are. A provider holding back 15% for 180 days is a materially different deal than one holding 5% for 90 days. Get multiple quotes before accepting the first offer.
        </p>

        <h2 className={h2}>Your first 48 hours after a rejection: a practical timeline</h2>
        <p>
          <strong className="text-foreground">Within the first few hours:</strong> Stop re-applying to other mainstream PayFacs. Each additional rejection on file makes the next one harder, and panic-applying rarely produces a different result from a similar automated system.
        </p>
        <p>
          <strong className="text-foreground">Day 1:</strong> Contact Stripe or Square support directly and request the specific reason code behind the rejection, in writing if possible. Separately, determine whether this was an application decline (no prior account) or a termination (an existing account was closed). The second is far more likely to involve a MATCH listing.
        </p>
        <p>
          <strong className="text-foreground">Day 1–2:</strong> Pull together your last 3–6 months of processing statements if you have them, your business formation documents, and a one-page written explanation of your fulfillment process, refund policy, and any steps you&apos;ve already taken to reduce chargebacks.
        </p>
        <p>
          <strong className="text-foreground">Day 2 onward:</strong> Approach two or three providers that specifically advertise underwriting for your MCC, not generic &quot;high risk payments&quot; lead-gen sites, and ask each one to confirm, before you submit a full application, whether your business model and risk profile fit what they actually underwrite. This single question saves weeks of back-and-forth with providers that were never a fit.
        </p>

        <h2 className={h2}>A rejection is information, not a dead end</h2>
        <p>
          The businesses that recover fastest from a Stripe or Square rejection are the ones that stop treating it as a one-off problem to route around, and start treating it as a signal about where their business actually fits in the payments ecosystem. A rejection tells you something real: you&apos;re targeting the wrong category of provider. The fix is matching your business to a provider built for your actual risk profile, not finding a PayFac willing to overlook it, because in most cases, none will.
        </p>
        {/* Not in the brief's body; its meta description promises "Book a free call". */}
        <p>
          Not sure which providers fit your business?{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="call" data-placement="end" className={link}>
            Book a free 15-minute call
          </a>
          . We will walk through your rejection, your MCC and your risk profile directly.
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

export default RejectedByStripeOrSquare;
