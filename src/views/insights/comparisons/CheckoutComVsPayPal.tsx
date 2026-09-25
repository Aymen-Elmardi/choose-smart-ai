'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline, { GROWTH_ARTICLE_AUTHOR } from "@/components/ArticleByline";
import FAQAccordion from "@/components/FAQAccordion";
import { BOOKING_URL } from "@/lib/booking";

const sources = [
  { name: "Checkout.com: What Are Interchange Fees? (official)", url: "https://www.checkout.com/blog/cko-explains-interchange-fees", type: "official" as const },
  { name: "PayPal Business Fees (official)", url: "https://www.paypal.com/us/business/fees", type: "official" as const },
  { name: "G2: PayPal Payments vs checkout.com Comparison (verified ratings, pulled 2026-08-31)", url: "https://www.g2.com/compare/paypal-vs-checkout-com", type: "industry" as const },
];

/**
 * FAQ copy as it appears in the article body, word-for-word identical to the
 * FAQPage schema below. The source's body copy of the fourth answer read "at
 * a smaller scale" where its schema read "at smaller scale"; the schema is to
 * be used exactly as supplied, so the body follows it.
 */
const faqs = [
  {
    question: "Is PayPal a good alternative to Checkout.com?",
    answer: "Only below Checkout.com's realistic enterprise volume threshold. For larger merchants, PayPal is more commonly offered as a payment method alongside Checkout.com than a true replacement. They serve different scales and different jobs in the checkout flow.",
  },
  {
    question: "Can I offer PayPal as a payment method through Checkout.com?",
    answer: "Yes. PayPal can run as one of several payment methods within a checkout primarily powered by Checkout.com, letting large merchants capture PayPal's consumer trust benefit without switching their core infrastructure.",
  },
  {
    question: "Which has better customer support, Checkout.com or PayPal?",
    answer: "Checkout.com, according to G2's category data: 9.2 versus PayPal's 8.3 on Quality of Support, with a similar gap on being rated a good business partner (9.2 vs 8.1). PayPal's advantage is scale and accessibility, not measured service quality.",
  },
  {
    question: "Can a small business use Checkout.com instead of PayPal?",
    answer: "Checkout.com's sales-assisted onboarding and enterprise-focused account structure make it a poor fit for most small businesses. PayPal's instant self-serve signup is the more realistic starting point at smaller scale.",
  },
  {
    question: "Does Checkout.com support high-risk industries better than PayPal?",
    answer: "Checkout.com has a notable presence among merchants in categories like travel, gaming, and digital goods that need higher risk tolerance. PayPal's underwriting for its self-serve product tends to be more conservative, though PayPal offers separate enterprise products with different risk profiles.",
  },
];

/**
 * Article + FAQPage graph exactly as supplied with the copy. The author is a
 * named Person rather than the Organization used elsewhere on the comparison
 * hub, per the 2026-09-24 request; the publisher stays the Organization.
 */
const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Checkout.com vs PayPal: Enterprise Rates vs Consumer Trust",
      "description": "Checkout.com quotes custom enterprise pricing. PayPal publishes a flat 2.99% to 3.49% + $0.49. Verified ratings and an honest fit-based verdict.",
      "mainEntityOfPage": "https://chosepayments.com/insights/comparisons/checkout-com-vs-paypal",
      "author": { "@type": "Person", "name": "Madalsa Bhat", "jobTitle": "Growth Expert" },
      "publisher": { "@id": "https://chosepayments.com/#organization" },
      "datePublished": "2026-09-24",
      "dateModified": "2026-09-24",
      "image": "https://chosepayments.com/insights/comparisons/checkout-com-vs-paypal-cover.png",
      "articleSection": "Provider Comparisons",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Is PayPal a good alternative to Checkout.com?", "acceptedAnswer": { "@type": "Answer", "text": "Only below Checkout.com's realistic enterprise volume threshold. For larger merchants, PayPal is more commonly offered as a payment method alongside Checkout.com than a true replacement. They serve different scales and different jobs in the checkout flow." } },
        { "@type": "Question", "name": "Can I offer PayPal as a payment method through Checkout.com?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. PayPal can run as one of several payment methods within a checkout primarily powered by Checkout.com, letting large merchants capture PayPal's consumer trust benefit without switching their core infrastructure." } },
        { "@type": "Question", "name": "Which has better customer support, Checkout.com or PayPal?", "acceptedAnswer": { "@type": "Answer", "text": "Checkout.com, according to G2's category data: 9.2 versus PayPal's 8.3 on Quality of Support, with a similar gap on being rated a good business partner (9.2 vs 8.1). PayPal's advantage is scale and accessibility, not measured service quality." } },
        { "@type": "Question", "name": "Can a small business use Checkout.com instead of PayPal?", "acceptedAnswer": { "@type": "Answer", "text": "Checkout.com's sales-assisted onboarding and enterprise-focused account structure make it a poor fit for most small businesses. PayPal's instant self-serve signup is the more realistic starting point at smaller scale." } },
        { "@type": "Question", "name": "Does Checkout.com support high-risk industries better than PayPal?", "acceptedAnswer": { "@type": "Answer", "text": "Checkout.com has a notable presence among merchants in categories like travel, gaming, and digital goods that need higher risk tolerance. PayPal's underwriting for its self-serve product tends to be more conservative, though PayPal offers separate enterprise products with different risk profiles." } },
      ],
    },
  ],
};

/** JSON.stringify leaves "<" intact, which would let a literal "</script>" close the tag early. */
const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

const th = "text-left font-semibold text-foreground p-3 border border-border";
const td = "p-3 border border-border align-top";

const CheckoutComVsPayPal = () => {
  return (
    <InsightsArticleLayout
      title="Checkout.com vs PayPal: Enterprise Rates vs Consumer Trust (2026)"
      schemaHeadline="Checkout.com vs PayPal: Enterprise Rates vs Consumer Trust"
      description="Checkout.com quotes custom enterprise pricing. PayPal publishes a flat 2.99% to 3.49% + $0.49. Verified ratings and an honest fit-based verdict."
      category={{ name: "Provider Deep Dives", slug: "providers" }}
      cluster="provider"
      currentSlug="comparisons/checkout-com-vs-paypal"
      publishedTime="2026-09-24"
      modifiedTime="2026-09-24"
      author={GROWTH_ARTICLE_AUTHOR}
      sources={sources}
      // The article carries its own single CTA block, so the layout must not
      // add the inline assessment CTA or the closing advisory note on top.
      showInlineCTA={false}
      // The supplied Article + FAQPage graph is rendered below.
      showArticleSchema={false}
      keywords={[
        "Checkout.com vs PayPal",
        "Checkout.com vs PayPal fees",
        "PayPal vs Checkout.com enterprise",
        "is PayPal a good alternative to Checkout.com",
        "Checkout.com or PayPal for global business",
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaGraph) }}
      />

      <img
        src="/insights/comparisons/checkout-com-vs-paypal-cover.png"
        alt="Checkout.com vs PayPal enterprise pricing and consumer trust comparison"
        width={1132}
        height={590}
        className="w-full rounded-lg border border-border mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Checkout.com vs PayPal: Enterprise Rates vs Consumer Trust
      </h1>

      <ArticleByline />

      <div className="text-muted-foreground space-y-6">
        <p>
          <strong className="text-foreground">Quick answer:</strong> Checkout.com is built for large, global businesses that need a customizable payments setup. PayPal offers a simple way to accept cards and PayPal payments with strong consumer recognition. They can also work together: Checkout.com can power the checkout while PayPal is offered as a payment method.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Checkout.com vs PayPal - Comparison table
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className={th}></th>
                <th className={th}>Checkout.com</th>
                <th className={th}>PayPal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={td}>Best for</td><td className={td}>Enterprise merchants optimizing authorization rate</td><td className={td}>Businesses of any size wanting instant, self-serve setup</td></tr>
              <tr><td className={td}>Pricing model</td><td className={td}>Interchange-plus, custom quote</td><td className={td}>Published flat rate</td></tr>
              <tr><td className={td}>Standard rate</td><td className={td}>Estimated interchange + 0.1% to 0.4% markup</td><td className={td}>2.99% + $0.49 (card), 3.49% + $0.49 (balance/Venmo)</td></tr>
              <tr><td className={td}>Setup time</td><td className={td}>Sales-assisted, underwritten</td><td className={td}>Instant</td></tr>
              <tr><td className={td}>G2 rating</td><td className={td}>4.6 / 5 (71 reviews)</td><td className={td}>4.4 / 5 (2,749 reviews)</td></tr>
              <tr><td className={td}>G2 Quality of Support</td><td className={td}>9.2</td><td className={td}>8.3</td></tr>
              <tr><td className={td}>Works as a payment method inside the other</td><td className={td}>Yes</td><td className={td}>Yes</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What Checkout.com does well
        </h2>

        <p>
          Checkout.com&apos;s strength is enterprise-grade authorization optimization, backed by genuinely strong service quality.
        </p>

        {/* Source read "product direction (9.8% positive)" and "beat PayPal's on
            every measured category". G2 reports Product Direction as a
            percentage (98%, as corrected on Adyen vs Checkout.com), and ease of
            use is a tie, so "beat or match". */}
        <p>
          On G2, it holds a 4.6 out of 5 rating. Reviewers specifically praise customer support (9.2) and product direction (98% positive). Those scores beat or match PayPal&apos;s on every measured category, despite PayPal&apos;s much larger review base.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What PayPal does well
        </h2>

        <p>
          PayPal&apos;s strength isn&apos;t a service metric. It&apos;s reach and recognition. PayPal has 2,749 G2 reviews to Checkout.com&apos;s 71, and 64.8% of its reviewers come from small businesses.
        </p>

        <p>
          That makes PayPal the default choice for accessibility: instant signup, a name every online shopper already trusts, and zero sales process required to start.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Checkout.com vs PayPal fees compared
        </h2>

        <p>
          Checkout.com publishes no rate card. Third-party pricing analyses put its typical markup at roughly 0.1% to 0.4% over interchange for well-qualified enterprise merchants. But that figure isn&apos;t official.
        </p>

        <p>
          You get a real number only after a sales conversation, and smaller businesses generally aren&apos;t the intended customer for that process.
        </p>

        <p>PayPal publishes its rate directly:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">2.99% + $0.49</strong> for card payments through PayPal Checkout</li>
          <li><strong className="text-foreground">3.49% + $0.49</strong> for PayPal balance or Venmo payments</li>
          <li><strong className="text-foreground">1.5% surcharge</strong> on cross-border transactions</li>
        </ul>

        {/* Source read "373 combined mentions". That is G2's High Fees chip
            count (177) plus Expensive (196), the same mix-up corrected on both
            earlier PayPal comparisons on 22 September 2026: all-time, High
            fees is 234 and Expensive is 196. */}
        <p>
          Here&apos;s the wrinkle. Despite PayPal&apos;s rate being fully published and Checkout.com&apos;s being opaque, PayPal draws far more fee complaints on G2: 430 all-time mentions of &quot;High fees&quot; (234) and &quot;Expensive&quot; (196), against 7 for Checkout.com.
        </p>

        <p>
          Review volume explains some of that gap, but not all of it. Published pricing doesn&apos;t guarantee lower perceived cost.
        </p>

        <p>
          Cross-border surcharges and currency conversion tend to surprise PayPal users after the fact, while Checkout.com&apos;s negotiated enterprise rate, though opaque upfront, tends to match what qualified merchants expected once quoted.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Checkout.com vs PayPal for enterprise
        </h2>

        <p>
          At enterprise volume, the comparison changes shape. A PayPal vs Checkout.com enterprise decision rarely comes down to picking one over the other.
        </p>

        <p>
          Large merchants typically run Checkout.com as core infrastructure and offer PayPal as one payment method inside it, capturing PayPal&apos;s consumer trust without switching acquiring relationships.
        </p>

        <p>
          Checkout.com&apos;s modular architecture and direct acquiring relationships exist to reduce false declines at scale, which matters most once transaction volume is high enough for a single percentage point of authorization rate to move real revenue.
        </p>

        <p>
          PayPal&apos;s self-serve product isn&apos;t built for that kind of configuration, and its own enterprise offerings sit in a different product tier with different underwriting.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Checkout.com or PayPal for global business
        </h2>

        <p>
          For a global business weighing Checkout.com or PayPal, the honest split is by transaction pattern rather than geography alone.
        </p>

        <p>
          Checkout.com&apos;s G2 reviewers specifically cite reliability and smoothness on international transactions, consistent with its enterprise cross-border positioning.
        </p>

        {/* Source called this PayPal's "single most-cited strength", but ease
            of use has 474 all-time G2 mentions (see Adyen vs PayPal). */}
        <p>
          PayPal&apos;s international transfers draw 210 all-time G2 mentions, one of its most-cited strengths, and its brand recognition abroad is genuinely hard to match.
        </p>

        <p>
          A business selling globally through its own branded checkout tends to lean Checkout.com; one relying on buyer familiarity and trust at checkout tends to lean PayPal, or use both.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Core functionality</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className={th}></th>
                <th className={th}>Checkout.com</th>
                <th className={th}>PayPal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={td}>Founded</td><td className={td}>2012, London</td><td className={td}>1998, San Jose</td></tr>
              <tr><td className={td}>Business model</td><td className={td}>Direct acquiring relationships, modular architecture for enterprise</td><td className={td}>Self-serve consumer-facing processor with buyer/seller protection</td></tr>
              <tr><td className={td}>Consumer brand recognition</td><td className={td}>Low, operates behind the merchant&apos;s own brand</td><td className={td}>Very high, among the most recognized payment brands globally</td></tr>
              <tr><td className={td}>Can they work together</td><td className={td}>Yes, PayPal can run as a payment method inside a Checkout.com-powered checkout</td><td className={td}>Yes, same relationship from PayPal&apos;s side</td></tr>
              <tr><td className={td}>G2 largest reviewer segment</td><td className={td}>Mid-market (41.4%)</td><td className={td}>Small business (64.8%)</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Ease of use and setup</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className={th}></th>
                <th className={th}>Checkout.com</th>
                <th className={th}>PayPal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={td}>Onboarding</td><td className={td}>Sales-assisted, underwritten, enterprise-focused</td><td className={td}>Instant, self-serve</td></tr>
              <tr><td className={td}>G2 Ease of Use score</td><td className={td}>9.1</td><td className={td}>9.1, exact parity</td></tr>
              <tr><td className={td}>G2 Ease of Setup score</td><td className={td}>9.0</td><td className={td}>8.9, near parity</td></tr>
              <tr><td className={td}>Best fit team</td><td className={td}>Enterprise teams with volume to justify a sales process</td><td className={td}>Anyone, including solo founders and non-technical operators</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Integration and platform fit</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className={th}></th>
                <th className={th}>Checkout.com</th>
                <th className={th}>PayPal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={td}>Best fit</td><td className={td}>High-growth and enterprise merchants prioritizing authorization rate</td><td className={td}>Any business wanting instant setup and a consumer-recognized checkout</td></tr>
              <tr><td className={td}>Risk appetite</td><td className={td}>Notable presence in travel, gaming, and digital goods</td><td className={td}>More conservative underwriting for self-serve accounts</td></tr>
              <tr><td className={td}>International payments</td><td className={td}>Reviewers cite reliability and smoothness on cross-border transactions</td><td className={td}>210 all-time G2 mentions for international transfers</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Support and account management</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className={th}></th>
                <th className={th}>Checkout.com</th>
                <th className={th}>PayPal</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className={td}>G2 Quality of Support score</td><td className={td}>9.2</td><td className={td}>8.3</td></tr>
              <tr><td className={td}>Rated a good business partner</td><td className={td}>9.2</td><td className={td}>8.1</td></tr>
              <tr><td className={td}>G2 product direction (% positive)</td><td className={td}>98%</td><td className={td}>83%</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          The difference between Checkout.com vs PayPal
        </h2>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
          Control: Configurable risk engine vs working checkout button
        </h3>

        <p>
          Checkout.com is built for a large merchant that wants precise control over authorization rate and risk configuration. Its modular architecture and direct acquiring relationships exist specifically to reduce false declines at scale.
        </p>

        <p>
          PayPal starts from a different assumption: most merchants just want a working, familiar checkout button, not a configurable risk engine.
        </p>

        <p>
          <strong className="text-foreground">Why it matters:</strong> that configurability is the entire value proposition for an enterprise merchant losing real revenue to declined transactions. It&apos;s unnecessary complexity for a small business that just needs payments to work.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
          Service model: Dedicated account vs self-serve access
        </h3>

        <p>
          Checkout.com&apos;s enterprise service quality justifies its sales process. Its G2 scores (9.2 support, 98% positive product direction) suggest that trade-off pays off for merchants who go through it.
        </p>

        <p>
          PayPal optimizes for zero-friction self-serve access instead of dedicated account service, and its support score (8.3) trails Checkout.com&apos;s by nearly a full point.
        </p>

        <p>
          <strong className="text-foreground">Why it matters:</strong> if you need a named account contact and fast escalation paths, Checkout.com&apos;s relationship model is built for that. If you need to start processing payments this afternoon with no sales call, PayPal wins by default.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
          Brand visibility: Invisible infrastructure vs visible trust signal
        </h3>

        <p>Checkout.com is built to stay invisible behind the merchant&apos;s own brand.</p>

        <p>
          PayPal does the opposite: visibility at checkout is the point, since that visibility drives the consumer trust it&apos;s known for.
        </p>

        <p>
          <strong className="text-foreground">Why it matters:</strong> a large merchant on Checkout.com loses nothing by also offering &quot;Pay with PayPal&quot; as one option. The two aren&apos;t competing for the same job in the checkout flow.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Verified ratings: Reviews by real users
        </h2>

        <p>We checked G2&apos;s direct comparison page rather than relying on marketing claims.</p>

        <p>
          No substantial Capterra listing exists specifically for Checkout.com. Don&apos;t confuse it with the unrelated 2Checkout/Verifone product.
        </p>

        <p>
          Reddit was checked and excluded. No threads with verifiable authorship and real substance were found.
        </p>

        {/* Source said PayPal "holds the higher overall rating" at 4.4 against
            Checkout.com's 4.6, then that Checkout.com's is higher. 4.6 is. */}
        <p>
          On <a href="https://www.g2.com/compare/paypal-vs-checkout-com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">G2&apos;s direct PayPal vs checkout.com comparison</a> (pulled 31 August 2026), Checkout.com holds the higher headline rating despite the smaller sample: 4.6 out of 5 across 71 reviews, versus PayPal&apos;s 4.4 out of 5 across 2,749 reviews.
        </p>

        <p>The category breakdown makes Checkout.com&apos;s advantage clearer. It beats or ties PayPal on every measured category:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Quality of Support (9.2 vs 8.3)</li>
          <li>Being a good business partner (9.2 vs 8.1)</li>
          <li>Product direction (98% vs 83% positive)</li>
          <li>Ease of use (9.1 each)</li>
        </ul>

        <p>
          PayPal&apos;s real advantage is scale of adoption and small-business accessibility, not measured service quality.
        </p>

        <p>
          G2&apos;s AI-generated summary specifically quotes a reviewer describing Checkout.com as smooth and reliable for international payments, consistent with its enterprise cross-border positioning.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Who should choose Checkout.com
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>You&apos;re a large, high-growth or enterprise merchant where authorization rate and global payment method coverage materially affect revenue</li>
          <li>You have the volume to justify a custom-quoted, sales-assisted relationship</li>
          <li>You want G2-verified support quality (9.2) rather than self-serve access alone</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Who should choose PayPal
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>You want instant, self-serve setup with a published rate</li>
          <li>Your audience trusts and specifically looks for the PayPal option at checkout</li>
          <li>You&apos;re already on Checkout.com or a similar enterprise platform and want PayPal&apos;s brand recognition as a secondary payment method, not a replacement</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">The conclusion</h2>

        <p>
          For most businesses, this decision comes down to scale. Below Checkout.com&apos;s realistic enterprise volume threshold, PayPal, often alongside Stripe, is the realistic starting point.
        </p>

        <p>
          At enterprise scale, the more common pattern is Checkout.com as core infrastructure with PayPal offered as one payment method inside it, not a strict either/or choice.
        </p>

        {/* The inline nudge: plain body-text link, not a card, so it does not
            count against the single CTA. */}
        <p>
          Not sure which side of that line you&apos;re on? <Link href="/contact" className="text-primary hover:underline">Write to us</Link> and we will help you figure out which one&apos;s good for you, in about 15 minutes.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-6">Frequently asked questions (FAQ)</h2>

        <FAQAccordion faqs={faqs} />

        {/* The single CTA for this article. The source asks for a styled card
            near the end but its spec was not included, so this is the card
            used on the other comparison pages. */}
        <section
          className="mt-12 rounded-xl overflow-hidden"
          style={{ background: "#0C141D", border: "1px solid #1F2937", padding: "2.5rem 2.8rem" }}
        >
          <h2 style={{ color: "#F3F5F7", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 1rem 0" }}>
            Don&apos;t guess your processor costs. Ask us for free.
          </h2>
          <p style={{ color: "#67737E", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.75rem 0" }}>
            Book a call or <Link href="/contact" style={{ color: "#11AC64", textDecoration: "underline" }}>write to us</Link>. We&apos;ll understand your business type and transactions. Then tell you what Checkout.com or PayPal would actually cost you, and if there is a better option out there.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cp-cta-btn">
            Book a Call
          </a>
        </section>
      </div>
    </InsightsArticleLayout>
  );
};

export default CheckoutComVsPayPal;
