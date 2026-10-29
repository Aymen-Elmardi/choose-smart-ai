'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import FAQSchema from "@/components/FAQSchema";
import { Source } from "@/components/SourcesCitation";

const BASE_URL = "https://chosepayments.com";
const SLUG = "stripe-alternatives";
const HEADLINE = "6 Best Stripe Alternatives in 2026: Pricing, Fees and Comparison";
const DESCRIPTION =
  "The best Stripe alternatives in 2026, compared on real fees, worked cost examples, account risk and who each one fits.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-10-29";
const COVER = `/insights/${SLUG}-cover.jpg`;

// The brief's schema block has an older version of the second answer (1.8%
// interchange, $280). The visible FAQ uses 2.2% and $120, and the schema must
// match what is on the page, so the visible text is used for both.
const faqs = [
  {
    question: "What is the best alternative to Stripe?",
    answer:
      "It depends on your business. Helcim is best for lower fees, Square for in-person sales, Braintree for PayPal and Venmo checkout, and Adyen or Checkout.com for enterprise scale. Under about $10,000 a month, Stripe is hard to beat.",
  },
  {
    question: "Is there a cheaper alternative to Stripe?",
    answer:
      "Yes, usually at higher volume. Helcim's interchange-plus pricing costs about $120 a month less than Stripe on $40,000 of online sales, assuming 2.2% interchange. Savings shrink to zero at 2.5%, so card mix matters.",
  },
  {
    question: "What are the best Stripe alternatives for small businesses?",
    answer:
      "Helcim suits online and keyed sales, Square suits shops and restaurants, and Braintree suits businesses that want PayPal and Venmo. Under $10,000 a month, the savings are small, so compare support and tools too.",
  },
  {
    question: "Which payment processors besides Stripe handle high-risk businesses?",
    answer:
      "Standard processors often restrict high-risk categories. A specialist processor with experience in your vertical is usually safer. Ask about chargeback limits and reserve terms before you apply, and get the fee schedule in writing.",
  },
  {
    question: "How do I switch from Stripe to another processor?",
    answer:
      "Run both in parallel, ask about card data migration, and keep Stripe open until payouts and disputes clear. Move recurring billing last and test it on a small group first.",
  },
];

const sources: Source[] = [
  { name: "Stripe: Pricing", url: "https://stripe.com/pricing", type: "official" },
  { name: "PayPal Braintree: Fees", url: "https://www.paypal.com/us/enterprise/paypal-braintree-fees", type: "official" },
  { name: "Helcim: Pricing", url: "https://www.helcim.com/pricing/", type: "official" },
  { name: "Stax: Pricing", url: "https://staxpayments.com/pricing/", type: "official" },
  { name: "Square: Pricing (US)", url: "https://squareup.com/us/en/pricing", type: "official" },
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
    "stripe alternatives, best stripe alternative, cheaper stripe alternatives, stripe alternatives for small business, payment processors besides stripe, stripe account alternative",
  citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.name, url: s.url })),
};

const comparison = [
  ["Stripe (baseline)", "Flat rate", "2.9% + 30¢", "$0", "Developers, startups"],
  ["Helcim", "Interchange-plus", "Interchange + 0.50% + 25¢ (first $50K/mo)", "$0", "Small business saving on fees"],
  ["Square", "Flat rate", "3.3% + 30¢ Free, 2.9% + 30¢ Plus", "$0 or $49", "In-person and omnichannel sales"],
  ["Braintree (PayPal)", "Flat rate, custom IC+", "2.89% + 29¢", "$0", "PayPal and Venmo checkout"],
  ["Stax", "Subscription, 0% markup", "Interchange + 15¢", "$99 to $199+", "Steady volume above $10,000/mo"],
  ["Adyen, Checkout.com", "Interchange-plus, custom", "Quote only", "Quote only", "Enterprise and global merchants"],
];

const costs = [
  ["$8,000 (160 sales)", "$280", "$278", "$329", "$256", "$299"],
  ["$40,000 (800 sales)", "$1,400", "$1,388", "$1,449", "$1,280", "at least $1,199"],
  ["$250,000 (5,000 sales)", "$8,750", "$8,675", "$8,799", "$7,375", "quote required"],
];

const sensitivity = [
  ["1.8%", "$1,120", "$280"],
  ["2.0%", "$1,200", "$200"],
  ["2.2%", "$1,280", "$120"],
  ["2.5%", "$1,400", "$0"],
];

const switchSteps = [
  ["Run both in parallel.", "Add the new processor and route 10% of traffic to it for two weeks."],
  ["Ask about card data migration.", "Helcim lists a card and customer data migration service. Ask any new provider for the same, and ask Stripe about exporting stored card data."],
  ["Keep Stripe open until payouts clear.", "Never close the old account while funds or open disputes remain."],
  ["Check your pricing in writing.", "Ask for the full fee schedule, including chargeback and cancellation terms."],
  ["Move subscriptions last.", "Recurring billing is the riskiest piece to migrate, so test it on a small group first."],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";

const Table = ({ head, rows, center = false }: { head: string[]; rows: string[][]; center?: boolean }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border border-border rounded-lg">
      <thead>
        <tr className="bg-muted">
          {head.map((h) => (
            <th key={h} className={center ? `${th} text-center` : th}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-t border-border">
            {row.map((cell, i) => (
              <td key={i} className={`p-3${center ? " text-center" : ""}${i === 0 ? " font-medium text-foreground" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StripeAlternativesGuide = () => {
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
          alt="Beyond Stripe? Explore better payment options: Checkout.com, Adyen, PayPal and Square."
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
          <strong className="text-foreground">Quick answer:</strong> Helcim is the best Stripe alternative for lower fees, Square for in-person sales, Braintree for a PayPal and Venmo checkout, and Adyen or Checkout.com for enterprise scale. Stripe&apos;s 2.9% + 30¢ is hard to beat under about $10,000 a month. Above that, interchange-plus pricing usually costs less.
        </p>
        <p>
          Stripe is a great product. It is also a flat-rate processor with a strict risk team, and neither fact suits every business.
        </p>
        <p>
          People look for payment processors besides Stripe for three reasons: cost, control, and fear of a frozen account. This guide covers each, with real numbers.
        </p>

        <h2 className={h2}>Stripe alternatives: Pricing and fees compared</h2>
        <p>
          Here&apos;s a side-by-side comparison of Stripe and its top alternatives, including pricing models, online card processing fees, monthly costs, and the businesses each payment processor is best suited for.
        </p>
        <Table head={["Payment processor", "Pricing model", "Online card rate", "Monthly fee", "Best for"]} rows={comparison} />

        <h2 className={h2}>Why businesses are looking for Stripe alternatives</h2>
        <p>
          Stripe is popular, but it may not be the right fit for every business. Some may look for Stripe alternatives when they want lower payment processing fees, more predictable pricing, better support, or features that better match their payment volume and business model.
        </p>
        <p>Here are some of the most common reasons businesses consider switching from Stripe:</p>

        <h3 className={h3}>Fees at volume</h3>
        <p>
          Stripe charges 2.9% + 30¢ on domestic cards. It adds 0.5% for manually entered cards, 1.5% for international cards, and 1% for currency conversion. These add up fast for global sellers.
        </p>
        <p>
          Our breakdown of <Link href="/insights/stripe-fees-explained" className={link}>Stripe&apos;s fees</Link> walks through each one.
        </p>

        <h3 className={h3}>The account holds and freezes</h3>
        <p>
          Stripe pools merchants under its own platform and its risk team can pause payouts when activity changes. If that has happened to you, read our guide on what to do when a{" "}
          <Link href="/insights/crisis/stripe-account-frozen" className={link}>Stripe account is frozen</Link>{" "}
          before you do anything else.
        </p>

        <h3 className={h3}>Category risk</h3>
        <p>
          Stripe restricts some business types. Subscriptions with high churn, travel, and supplements are common trouble spots. A processor that knows your category is safer than one that tolerates it.
        </p>

        <h3 className={h3}>Missing in-person tools</h3>
        <p>
          Stripe has terminals, but Square and Helcim ship simpler hardware and point-of-sale software for shops and clinics.
        </p>

        <h2 className={h2}>The math: What each Stripe alternative costs</h2>
        <p>
          The price on a rate card is not the price you pay. Here is the same sales mix run through each provider. Each example assumes a $50 average online card sale.
        </p>
        <p>
          The interchange-plus examples assume interchange and card network fees average 2.2% of sales. That is an estimate, not a quote.
        </p>
        <p>Standard online consumer credit cards cost less than that, while rewards and corporate cards cost more.</p>
        <p>
          Your real figure depends on your card mix, so treat the results as directional and check the sensitivity table below.
        </p>
        <Table head={["Monthly online volume", "Stripe", "Braintree", "Square Plus", "Helcim", "Stax"]} rows={costs} />
        <p>
          <strong className="text-foreground">How the Helcim figure works at $40,000:</strong> 2.2% interchange is $880, the 0.50% margin is $200, and 25¢ on 800 sales is $200.
        </p>
        <p>
          That totals $1,280, which is $120 a month less than Stripe, or $1,440 a year. At $250,000, Helcim&apos;s volume tier drops the margin to 0.35% + 20¢, which puts the gap near $1,375 a month.
        </p>
        <p>
          The Stax figure is a floor. It adds the $199 plan fee, interchange, and 15¢ per sale, but your quote may add network fees.
        </p>
        <p>
          The result depends heavily on that interchange assumption, because Stripe&apos;s flat rate does not change when your card mix does.
        </p>
        <p>Here is Helcim against Stripe at $40,000 a month:</p>
        <Table head={["Average interchange and network cost", "Helcim monthly cost", "Saving vs Stripe"]} rows={sensitivity} center />
        <p>
          If your customers mostly pay with premium rewards cards, interchange-plus can tie with flat-rate pricing. That is why you should ask any provider to price your actual statement, not an average.
        </p>
        <p>
          What the table shows is a modest picture. At $8,000 a month, Helcim saves about $24, and Stax costs more than Stripe because its $99 plan fee outweighs its lower per-sale cost.
        </p>
        <p>Stax starts beating Stripe at roughly $10,000 a month. Real savings only appear as volume grows.</p>
        <p>
          If you process under $5,000 a month, the gap is too small to justify a migration, so stay on Stripe unless a freeze or category issue pushes you out.
        </p>
        <p>The table leaves out disputes, hardware, international cards and billing add-ons, all of which differ by provider.</p>

        <h2 className={h2}>The best Stripe alternatives, reviewed</h2>

        <h3 className={h3}>Helcim: Best for lower fees</h3>
        <p>
          Helcim charges interchange plus a margin that drops as volume grows. There are no monthly fees, no contracts, no PCI fee and no cancellation fee. A lost chargeback costs $15. That is the cleanest fee sheet in this group.
        </p>
        <p>
          In my opinion, Helcim is the first call for a US or Canadian business doing $10,000 to $100,000 a month. The tradeoff is a slimmer developer ecosystem than Stripe.
        </p>
        <p>If you rely on advanced billing logic or marketplace payouts, you will miss Stripe Connect.</p>

        <h3 className={h3}>Square: Best for in-person and omnichannel sales</h3>
        <p>
          Square suits shops, restaurants and service businesses that sell face to face. The free plan has no monthly fee.
        </p>
        <p>
          Online sales cost more than Stripe on the free plan at 3.3% + 30¢. In-person sales start at 2.6% + 15¢. Its paid plans lower those rates, and the break-even points depend on your volume.
        </p>
        <p>
          Choose Square when most of your sales happen at a counter. Avoid it for online-only businesses, where it costs more than Stripe.
        </p>

        <h3 className={h3}>Braintree: Best for PayPal and Venmo checkout</h3>
        <p>
          Braintree is owned by PayPal. It charges 2.89% + 29¢ on cards, a hair below Stripe. Venmo transactions cost 3.49% + 49¢.
        </p>
        <p>Braintree charges $15 per chargeback, the same as Stripe, and adds 1% for non-US cards or non-USD sales.</p>
        <p>It is the right pick when your customers expect PayPal and Venmo in the same checkout.</p>
        <p>
          Established businesses can ask for custom flat or interchange-plus pricing, according to Braintree&apos;s published terms. Do not expect the rate to be dramatically cheaper than Stripe.
        </p>

        <h3 className={h3}>Stax: Best for steady, higher volume</h3>
        <p>Stax charges a monthly subscription instead of a percentage markup.</p>
        <p>
          Plans start at $99 a month up to $150,000 a year in processing, $139 up to $250,000, and $199 or more above that.
        </p>
        <p>It passes interchange through at 0% markup, and adds 8¢ per in-person sale or 15¢ per online sale.</p>
        <p>The subscription is a fixed cost, so Stax is a poor value for a tiny volume.</p>
        <p>
          In the table above, it only beats Stripe by a meaningful margin past about $10,000 a month. Request a quote because the real price depends on your volume.
        </p>

        <h3 className={h3}>Adyen and Checkout.com: Best for enterprise and global merchants</h3>
        <p>Both quote custom interchange-plus pricing and target larger businesses.</p>
        <p>
          Neither publishes a simple rate for small sellers, and both expect meaningful volume before they onboard you.
        </p>
        <p>The payoff is local acquisition in many countries, which lifts approval rates for international sales.</p>
        <p>
          If you process well over $1 million a month across several countries, get quotes from both. If you do not, they are likely more than you need.
        </p>

        <h2 className={h2}>Which payment processor is best for high-risk businesses?</h2>
        <p>Some businesses are not rejected by Stripe for being bad. They are rejected for being unusual.</p>
        <p>A processor built for your category will quote you realistically and keep your account open.</p>
        <p>
          Standard providers often will not. If you have been turned down or frozen, we cover this in detail in our guides on high-risk e-commerce processing and chargeback-heavy businesses.
        </p>

        <h2 className={h2}>How to switch without losing sales</h2>
        <ol className="list-decimal pl-6 space-y-2">
          {switchSteps.map(([lead, rest]) => (
            <li key={lead}>
              <strong className="text-foreground">{lead}</strong> {rest}
            </li>
          ))}
        </ol>
        <p>
          Interchange-plus is the structure that lowers cost at volume. If the term is new to you, our explainer on{" "}
          <Link href="/insights/pricing-models/interchange-plus-plus" className={link}>interchange-plus pricing</Link>{" "}
          is a good place to start.
        </p>

        <h2 className={h2}>My take: Which one should you pick</h2>
        <p>Under $10,000 a month, stay with Stripe unless a freeze or category issue pushes you out.</p>
        <p>
          From $10,000 to $100,000, get a Helcim quote. In-person businesses should look at Square first. If PayPal and Venmo matter to your buyers, add Braintree.
        </p>
        <p>
          Past $1 million a month, stop comparing rate cards and negotiate. Volume gives you leverage that a small seller does not have.
        </p>
        <p>
          If you are stuck between two options,{" "}
          <Link href="/contact" data-cta="write" data-placement="mid" className={`${link} font-medium`}>write to us</Link>. Tell us your monthly volume, average ticket, and what went wrong with Stripe.
        </p>
        <p>We will tell you which processors to approach and what rate to ask for.</p>

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
          Not sure which alternative fits your business?
        </h2>
        <p className="mb-6 leading-relaxed" style={{ color: "#C9D1D9" }}>
          Send us your monthly volume, average ticket and business type. We will review your numbers, flag the processors that fit, and tell you what rate to ask for.
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

export default StripeAlternativesGuide;
