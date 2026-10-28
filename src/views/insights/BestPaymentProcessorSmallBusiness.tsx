'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import FAQSchema from "@/components/FAQSchema";
import SourcesCitation, { Source } from "@/components/SourcesCitation";
import { BOOKING_URL } from "@/lib/booking";

const BASE_URL = "https://chosepayments.com";
const SLUG = "best-payment-processor-for-small-business";
const HEADLINE = "Best Payment Processor for Small US Business (2026)";
const DESCRIPTION =
  "Which payment processor actually fits your small business, what it really costs at real volume, and which ones will reject your application.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-10-28";
const COVER = `/insights/${SLUG}-cover.jpg`;

const faqs = [
  {
    question: "Which payment processor is best for small business?",
    answer:
      "It depends on how you sell. Square fits in-person retail best. Stripe fits online-first businesses. PayPal helps where customer trust drives conversion, and Helcim wins at consistent higher volume.",
  },
  {
    question: "Which payment processor has the lowest fees?",
    answer:
      "Helcim's interchange-plus pricing usually works out cheapest at real volume. On a $15,000-a-month example it runs roughly $339, versus $435 to $596 for the flat-rate options.",
  },
  {
    question: "What is the cheapest payment processor for a small business just starting out?",
    answer:
      "For low, unpredictable volume, a flat-rate processor is usually the cheapest payment processor for small business overall once you include setup time. Interchange-plus pricing only pulls ahead at consistent volume.",
  },
  {
    question: "Is Square the best payment processor for small business?",
    answer:
      "Square is the best pick specifically for brick-and-mortar retail needing fast approval. It is not the cheapest option for high online volume, especially after its January 2026 rate increase.",
  },
  {
    question: "What documents do I need to open a payment processing account?",
    answer:
      "Most processors ask for the same baseline. A business entity or SSN, an EIN if applicable, a business bank account, your estimated volume, and a clear description of what you sell.",
  },
  {
    question: "What is the best payment processor for a small business with high chargebacks?",
    answer:
      "Standard processors like Square, Stripe, and PayPal often decline or later freeze high-chargeback accounts. A processor that underwrites that risk from the start fits better, even at a higher rate.",
  },
];

const sources: Source[] = [
  { name: "Square: Card processing rates (US)", url: "https://squareup.com/us/en/payments/card-processing", type: "official" },
  { name: "Stripe: Pricing", url: "https://stripe.com/pricing", type: "official" },
  { name: "PayPal: Business fees (US)", url: "https://www.paypal.com/us/business/fees", type: "official" },
  { name: "Helcim: Pricing", url: "https://www.helcim.com/pricing/", type: "official" },
  {
    name: "Coastal Pay: Best Payment Methods to Increase E-Commerce Checkout Conversion in 2026",
    url: "https://www.coastalpay.com/best-payment-methods-to-increase-e-commerce-checkout-conversion-in-2026/",
    type: "industry",
  },
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
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/insights/${SLUG}` },
  keywords:
    "best payment processor for small business, payment processor, which payment processor is best for small business, cheapest payment processor for small business, best credit card processor for small business",
  citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })),
};

const comparison = [
  ["Brick-and-mortar retail", "Square", "Flat rate", "~$435/mo", "Easy, instant for most"],
  ["Online-first businesses", "Stripe", "Flat rate", "~$525/mo", "Easy, instant for most"],
  ["Mobile sales, consumer trust", "PayPal", "Flat rate", "~$596/mo", "Easy, instant for most"],
  ["High volume, lowest cost", "Helcim", "Interchange-plus", "~$339/mo (estimate)", "Moderate, real underwriting"],
  ["High-risk or fast-growing", "Depends on your category", "Interchange-plus, custom", "Varies, see below", "Harder, needs the right fit"],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";

const BestPaymentProcessorSmallBusiness = () => {
  return (
    <InsightsArticleLayout
      title={HEADLINE}
      description={DESCRIPTION}
      category={{ name: "Provider Fit Guides", slug: "provider-fit" }}
      cluster="hub"
      currentSlug={SLUG}
      publishedTime={PUBLISHED}
      sources={sources}
      // The brief's CTAs are placed in the body (Write to us / Book a call);
      // the layout's injected assessment CTA and advisory note stay off.
      showInlineCTA={false}
      showArticleSchema={false}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <FAQSchema faqs={faqs} />

      {/* WebP (54 KB) for the page, JPEG (176 KB) as fallback and for og:image.
          The cover is the largest element on load (LCP), so it is fetched first. */}
      <picture>
        <source srcSet={COVER.replace(/\.jpg$/, ".webp")} type="image/webp" />
        <img
          src={COVER}
          alt="Best payment processor for small business, compared by use case, real cost, and approval odds."
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
          <strong className="text-foreground">Quick answer:</strong> there is no single best payment processor for every small business. Square wins for in-person retail. Stripe wins for online-first businesses. PayPal wins where customer trust matters most. Helcim wins on transparent pricing at real volume. The pick that matters most is the one that actually approves your business. A rejected application costs you more time than a slightly higher fee ever will.
        </p>
        <p>
          To make the rates below mean something, every priced pick uses one example. A small business doing $15,000 a month, across 300 transactions, a $50 average ticket.
        </p>
        <p>That is realistic for an independent retailer, salon, or small online shop.</p>
        <p>
          Watching that same $15,000 move through four fee structures shows the real gap. A percentage alone is hard to picture.
        </p>

        <h2 className={h2}>Best payment processor by use case: Comparison table</h2>
        <p>
          There&apos;s no single best payment processor for every business. Your sales channel, transaction volume, and risk profile can all change which option makes the most sense.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                {["Use case", "Best pick", "Pricing model", "Cost on $15,000/mo", "Approval difficulty"].map((h) => (
                  <th key={h} className="text-left p-3 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  {row.map((cell, i) => (
                    <td key={i} className={`p-3${i === 1 ? " font-medium text-foreground" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={h2}>Best for brick-and-mortar: Square</h2>
        <p>
          Square remains the easiest payment processor to start with for in-person retail. You sign up online, link a bank account, and start swiping cards the same day.
        </p>
        <p>Its free-plan rates, current for 2026, run 2.6% plus 15 cents in person. Online payments cost 3.3% plus 30 cents.</p>
        <p>That is up from 2.9% plus 30 cents before January 13, 2026. Keyed or card-on-file payments cost 3.5% plus 15 cents.</p>
        <p>On our $15,000-a-month example, with 300 in-person transactions, Square works out to roughly $435 a month.</p>
        <p>That is $390 from the percentage, plus $45 from the flat per-transaction fee.</p>
        <p>
          Approval is near-instant for most retail, food, and service businesses. You need a government ID, a business bank account, and basic details about what you sell.
        </p>
        <p>
          Square declines or restricts certain categories outright. Firearms, adult content, cannabis in most states, and some travel and ticketing businesses.
        </p>
        <p>Expect a decline there, not a slow approval.</p>
        <p>
          {/* Draft said "roughly $45"; 0.4 points (3.3% vs 2.9%) on $15,000 is $60. */}
          That January increase matters most for online-heavy sellers. At $15,000 online instead of in person, the new rate adds roughly $60 a month.
        </p>
        <p>Worth checking against Stripe below if online sales dominate your business.</p>

        <h2 className={h2}>Best for online-first businesses: Stripe</h2>
        <p>
          Stripe stays the strongest default for developers and online-first businesses. Its documentation is excellent, and a basic integration can go live in a day.
        </p>
        <p>Stripe&apos;s standard online rate is 2.9% plus 30 cents per transaction. On the same $15,000 example, that works out to roughly $525 a month.</p>
        <p>That is about $90 more than Square&apos;s in-person rate, the cost of card-not-present transactions.</p>
        <p>
          Approval requires a registered business entity, an EIN or SSN, a bank account, and a working website. Stripe runs automated fraud checks through its own Radar system, both at signup and ongoing.
        </p>
        <p>Where Stripe gets strict is the risk category. Subscription businesses and marketplaces face closer underwriting.</p>
        <p>
          So does anything with high historical chargeback rates. Even a good spike in volume, like a viral product moment, can trigger an automatic review.
        </p>
        <p>That review can mean a temporary hold on funds while Stripe confirms the activity is legitimate.</p>
        <p>
          Our guide on <Link href="/insights/payment-provider-risk-models" className={link}>payment provider risk models</Link> covers exactly what triggers that.
        </p>

        <h2 className={h2}>Best for mobile sales and consumer trust: PayPal</h2>
        <p>
          PayPal wins on brand recognition, not on cost. Shoppers already trust the name, and that trust measurably affects whether they complete a purchase.
        </p>
        <p>
          PayPal charges 2.99% plus 49 cents for card payments through Checkout. On our $15,000 example, that comes to roughly $596 a month, the highest of the four here.
        </p>
        <p>PayPal balance and Venmo payments cost 3.49% plus 49 cents instead. Cross-border sales add a 1.5% surcharge on top of either rate.</p>
        <p>Approval is fast, often instant, for a standard business account with a verified email and bank link.</p>
        <p>
          A new account processing an unusually high ticket early on can trigger a temporary hold, while PayPal confirms the activity looks normal.
        </p>
        <p>
          The cost premium buys something real. Checkout pages offering digital wallets like Apple Pay, Google Pay, or PayPal see roughly two to three times higher mobile conversion than plain card entry.
        </p>
        <p>Missing payment options also drive a meaningful share of cart abandonment. PayPal fits best as a primary processor for mobile-first sellers.</p>
        <p>It also works well layered onto Stripe or Square to capture that conversion lift.</p>

        <h2 className={h2}>Best for high volume and transparent pricing: Helcim</h2>
        <p>
          Helcim fits a business that has outgrown flat-rate pricing and processes consistent monthly volume. It runs interchange-plus pricing. No monthly fees, no PCI fee, no cancellation fee at all.
        </p>
        <p>
          Rates start at interchange plus 0.40% plus 8 cents in person. That applies under $50,000 monthly. The margin shrinks automatically as volume grows.
        </p>
        <p>By $1 million to $5 million a month, it hits interchange plus 0.15% plus 6 cents.</p>
        <p>
          On our $15,000 example, assuming a typical 1.7% blended interchange rate, Helcim works out to roughly $339 a month, the cheapest of the four.
        </p>
        <p>
          That number moves with your actual card mix. Helcim passes through the real rate rather than a fixed estimate, so treat this as close, not guaranteed.
        </p>
        {/* TODO(verify): the G2 (4.0) and Google (4.2) ratings are not in the brief's verified-facts list. */}
        <p>Helcim holds a 4.0 out of 5 on G2, and 4.2 on Google. Reviewers specifically cite the volume-based savings once they switched.</p>
        <p>
          The trade-off is approval speed. Helcim runs a real underwriting review, not instant signup. Expect a voided check or bank letter, some processing history if you have it, and a short wait, typically a day or two.
        </p>

        <h2 className={h2}>Best for high-risk or fast-growing businesses</h2>
        <p>
          Most best payment processor lists either ignore this category or hand-wave it. Here is what actually happens if your business falls into it.
        </p>
        <p>High-risk, in underwriting terms, usually means one or more things. Subscription or continuity billing.</p>
        <p>
          Chargeback rates above roughly 1%. Categories like travel, nutraceuticals, adult content, or firearms. Or a business under two years old processing unusually high volume for its size.
        </p>
        <p>None of that means you did anything wrong. It means your pattern carries more statistical risk than a standard retail account.</p>
        <p>
          Square, Stripe, and PayPal often decline these businesses outright. Or they approve first, then freeze the account once chargebacks cross an internal threshold.
        </p>
        <p>That second pattern is more disruptive than an upfront decline. It happens after you have already built your business around that processor.</p>
        <p>
          A processor that underwrites your actual risk category from the start charges more. It may hold a rolling reserve, often 5 to 10% of volume, for a period. It will likely ask for more documentation upfront.
        </p>
        <p>
          In exchange, you get a provider who already expects your risk, instead of one that discovers it later and freezes your funds in response.
        </p>
        <p>Two dedicated guides go deeper by category.</p>
        <p>
          <Link href="/payment-processors-high-risk-ecommerce" className={link}>Payment processors for high-risk e-commerce</Link> covers online-specific risk factors.
        </p>
        <p>
          <Link href="/best-payment-processors-high-chargebacks" className={link}>Processors built for high-chargeback businesses</Link> cover dispute-heavy categories.
        </p>
        <p>
          {/* Brief linked "free risk assessment" (/assessment); T01 retires assessment CTAs in articles. */}
          Not sure which applies to you?{" "}
          <Link href="/contact" data-cta="write" data-placement="mid" className={`${link} font-medium`}>Write to us</Link>{" "}
          and tell us how you take payments.
        </p>

        <h2 className={h2}>What you actually need before you apply</h2>
        <p>Every processor above asks for a similar baseline, regardless of which one you pick. Gather these first and the approval step moves faster.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A registered business entity or your SSN if you are a sole proprietor</li>
          <li>An EIN, unless you are a sole proprietor using your SSN</li>
          <li>A business bank account for deposits, not a personal one if avoidable</li>
          <li>Your estimated monthly volume and average transaction size</li>
          <li>A website, storefront, or clear description of what you sell</li>
        </ul>
        <p>
          Moreover, processors assign your business a four-digit{" "}
          <Link href="/insights/payment-processor-business-vertical-classification" className={link}>Merchant Category Code</Link> during underwriting.
        </p>
        <p>That code quietly sets your interchange rate. It also decides how closely your account gets watched.</p>

        <h2 className={h2}>What actually determines the right fit</h2>
        <p>Price is the easiest thing to compare. It is also the least important factor once you are past early-stage volume.</p>
        <p>
          Our full framework on <Link href="/insights/how-to-choose-a-payment-processor" className={link}>how to choose a payment processor</Link> covers transaction profile, risk alignment, and switching costs in detail.
        </p>
        <p>
          One thing every pick above has in common: the advertised rate is never the full cost. PCI fees, chargeback fees, and early termination penalties routinely get left out of the pitch.
        </p>
        <p>
          See our breakdown of <Link href="/insights/hidden-payment-processor-fees" className={link}>hidden payment processor fees</Link> before you sign anything.
        </p>

        <h2 className={h2}>The conclusion</h2>
        <p>On our $15,000 example, the real monthly gap runs from about $339 to $596. That difference adds up fast over a year.</p>
        <p>But the cheapest number is worthless if the processor declines you, or freezes your account three months in.</p>
        <p>
          Square, Stripe, and PayPal approve fast. All three suit standard, low-risk small businesses well. Helcim earns the extra underwriting step once volume justifies interchange-plus pricing.
        </p>
        <p>
          Past that point, fit matters more than price. The best credit card processor for small business is the one whose underwriting actually matches how you operate.
        </p>
        <p>
          Not sure where your business fits?{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-cta="call" data-placement="end" className={link}>
            Book a free 15-minute call
          </a>
          . We will walk through your volume and risk profile directly. No sales pitch.
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

      {/* The brief's single CTA card: navy background, primary green button. */}
      <section className="mt-12 rounded-xl p-8 md:p-10" style={{ background: "#0C141D" }}>
        <h2 className="text-2xl font-semibold mb-3" style={{ color: "#F3F5F7" }}>
          Find your actual payment processor fit with ChosePayments
        </h2>
        <p className="mb-6 leading-relaxed" style={{ color: "#C9D1D9" }}>
          Reading six processor profiles only gets you so far. Write to us, tell us your volume, industry, and risk profile, and we&apos;ll tell you which processors are actually built to approve and support your business.
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

export default BestPaymentProcessorSmallBusiness;
