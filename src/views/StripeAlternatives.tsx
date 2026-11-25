'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";

// Stripe Connect alternatives for US marketplaces. Lives at the root-level URL
// /stripe-alternatives-marketplace (kept from the original page), using the
// insight article layout.

const BASE_URL = "https://chosepayments.com";
const PATH = "/stripe-alternatives-marketplace";
const HEADLINE = "Stripe Connect Alternatives for US Marketplaces: What They Cost and Who Each Fits";
const DESCRIPTION =
  "Compare Stripe Connect alternatives for US marketplaces: Adyen for Platforms, Finix, PayPal and more. Real 2026 costs, risks, and which one fits your stage.";
// Go-live date. Update to the merge date if the page ships later than this.
const PUBLISHED = "2026-11-25";
const PUBLISHED_DISPLAY = "November 25, 2026";
const AUTHOR = "Aymen Elmardi";
const IMG = "/insights/stripe-connect-alternatives";
const COVER = `${IMG}-cover.jpg`;

const faqs = [
  {
    question: "Is Stripe Connect free?",
    answer:
      "It can be. When Stripe handles pricing, there's no platform fee and your sellers pay Stripe's standard rates. When your platform handles pricing, Stripe charges $2 per monthly active account plus 0.25% + 25¢ per payout.",
  },
  {
    question: "Who pays when a seller gets a chargeback on Stripe Connect?",
    answer:
      "It depends on your setup. On some Connect setups, the platform is responsible for covering a connected account's negative balance, so check which applies to your account before you scale.",
  },
  {
    question: "Can a marketplace use more than one payment provider?",
    answer:
      "Yes. Many marketplaces run a main processor and a second one for certain sellers, regions or payment methods. It adds some work, but it means one account review can't stop every payout.",
  },
  {
    question: "What is PayFac-as-a-service?",
    answer:
      "A way for a platform to act like a payment facilitator without becoming one. The provider handles licensing, compliance and settlement, and you onboard sellers, set their pricing and earn a margin on payments.",
  },
  {
    question: "What is the cheapest Stripe Connect alternative?",
    answer:
      "There isn't one answer. Flat-rate platform plans are easy to compare, but interchange-plus pricing is often cheapest at volume, especially if many of your buyers pay by debit card. Model your own card mix, seller count and payout count before you decide.",
  },
];

// Article schema written here (layout schema off), with the values from the brief.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  image: `${BASE_URL}${COVER}`,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  inLanguage: "en-US",
  mainEntityOfPage: `${BASE_URL}${PATH}`,
  author: { "@type": "Person", name: AUTHOR },
  publisher: {
    "@type": "Organization",
    name: "ChosePayments",
    url: `${BASE_URL}/`,
    logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.png` },
  },
};

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";
const td = "p-3 align-top";
const strong = "text-foreground";

// WebP on the page, PNG as fallback. Width and height are set per image so
// the layout doesn't shift while it loads. Caption in small text underneath.
const Figure = ({ name, alt, width, height, caption }: { name: string; alt: string; width: number; height: number; caption: string }) => (
  <figure className="my-8">
    <picture>
      <source srcSet={`${IMG}-${name}.webp`} type="image/webp" />
      <img
        src={`${IMG}-${name}.png`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-lg border border-border"
      />
    </picture>
    <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>
  </figure>
);

const ext = (href: string, text: string) => (
  <a href={href} target="_blank" rel="noopener" className={link}>{text}</a>
);

const StripeAlternatives = () => {
  return (
    <InsightsArticleLayout
      title="Stripe Connect Alternatives for US Marketplaces"
      description={DESCRIPTION}
      category={{ name: "Guides", slug: "guides" }}
      publishedTime={PUBLISHED}
      modifiedTime={PUBLISHED}
      showArticleSchema={false}
      showInlineCTA={false}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{HEADLINE}</h1>
      <div className="mb-8 text-sm text-muted-foreground italic">
        <div>Author: {AUTHOR}</div>
        <div>Published: {PUBLISHED_DISPLAY}</div>
      </div>

      {/* WebP on the page, JPEG as fallback and for og:image. The cover is the
          largest element on load (LCP), so it is fetched first. */}
      <picture>
        <source srcSet={`${IMG}-cover.webp`} type="image/webp" />
        <img
          src={COVER}
          alt="Stripe Connect alternatives for US ecommerce: compare top alternatives."
          width={1671}
          height={941}
          fetchPriority="high"
          className="w-full h-auto rounded-lg border border-border mb-8"
        />
      </picture>

      <div className="text-muted-foreground space-y-6">
        <p>
          The main Stripe Connect alternatives for US marketplaces are <strong className={strong}>Adyen for Platforms</strong>, <strong className={strong}>PayFac-as-a-service providers such as Finix and Payrix</strong>, and <strong className={strong}>PayPal&apos;s platform products</strong>. A merchant of record is a fourth option for digital products. Which one fits depends on your monthly volume, whether you want to earn on payments, and who you want carrying the risk when a seller gets a chargeback.
        </p>
        <p>
          Stripe Connect is the default for good reasons: it&apos;s quick to launch and well documented. But as a marketplace grows, platform fees add up, and one account review can pause payouts for every seller at once. This guide covers what Stripe Connect really costs, where the alternatives are cheaper or safer, and how to choose.
        </p>
        <p>
          <em>Prices checked against {ext("https://stripe.com/connect/pricing", "each provider's US pricing page")} in November 2026.</em>
        </p>

        <h2 className={h2}>What Stripe Connect costs in the US</h2>
        <p>Stripe Connect has two pricing setups, and the one you pick changes your bill.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className={th}>Setup</th>
                <th className={th}>What you pay Stripe</th>
                <th className={th}>What your sellers pay</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className={`${td} font-medium text-foreground`}>Stripe handles pricing</td>
                <td className={td}>No platform fee</td>
                <td className={td}>Stripe&apos;s standard rates, such as 2.9% + 30¢ per card payment</td>
              </tr>
              <tr className="border-t border-border">
                <td className={`${td} font-medium text-foreground`}>You handle pricing</td>
                <td className={td}>$2 per monthly active account, plus 0.25% + 25¢ per payout</td>
                <td className={td}>Whatever you set. You pay Stripe&apos;s processing fees</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Extras apply on top: Instant Payouts cost 1% of the payout, and cross-border payouts start at 0.25%.</p>
        <p>
          &quot;You handle pricing&quot; is the setup most marketplaces want, because it lets you set your own fees and earn on payments. It&apos;s also where costs climb fastest as your seller count grows.
        </p>

        <Figure
          name="cost"
          width={1600}
          height={720}
          alt="Monthly payment costs for a US marketplace with $500,000 in sales: $18,750 on Stripe Connect when the platform sets pricing, or 3.75% of sales, versus $17,000 on a Finix flat-rate platform plan, or 3.40%."
          caption="Example month: 500 active sellers, 5,000 orders at $100, 2,000 payouts. Published US pricing, November 2026."
        />

        <p>
          For a marketplace doing $500,000 a month with 500 active sellers, 5,000 orders at $100 and 2,000 seller payouts, that comes to about <strong className={strong}>$18,750 a month, or 3.75% of sales</strong>. A flat-rate platform plan from a PayFac-as-a-service provider comes in around $17,000 for the same month, and interchange-plus pricing can go lower, depending on your card mix.
        </p>
        <p>
          If your Connect bill keeps climbing with your seller count, it&apos;s worth seeing whether you can{" "}
          <Link href="/assessment" className={link}>find a processor that fits your marketplace better</Link>. It takes 5 quick questions.
        </p>

        <h2 className={h2}>Why marketplaces look beyond Stripe Connect</h2>
        <p>Cost is one reason. These are the others we hear most from founders.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>Payout freezes hit every seller at once.</strong> When Stripe reviews or closes a platform account, payouts can stop across the whole marketplace, not just one seller. Founders building on Connect regularly report account closures during review, sometimes before launch.</li>
          <li><strong className={strong}>You may be liable for your sellers&apos; losses.</strong> On Connect setups where the platform handles pricing, the platform can be responsible for covering a connected account&apos;s negative balance, for example after a seller&apos;s refund or chargeback. Stripe can hold a reserve on your platform account until it&apos;s cleared.</li>
          <li><strong className={strong}>Flat rates hide what cards really cost.</strong> Stripe&apos;s standard pricing charges the same rate for a cheap debit card and a premium rewards card. Interchange-plus pricing passes through the real card cost, which often saves money at volume.</li>
          <li><strong className={strong}>One provider is a single point of failure.</strong> If all your sellers sit on one processor, any problem with that processor stops your whole marketplace.</li>
        </ul>

        <h2 className={h2}>The best Stripe Connect alternatives, compared</h2>

        <Figure
          name="fit"
          width={1600}
          height={820}
          alt="Which Stripe Connect alternative fits: Stripe Connect when launching, PayFac-as-a-service for growing US platforms, Adyen for Platforms for high volume or global sales, PayPal for platforms when buyers expect PayPal, and a merchant of record for digital products."
          caption="Match the option to your stage, not just the rate."
        />

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className={th}>Option</th>
                <th className={th}>Pricing model (US)</th>
                <th className={th}>Best for</th>
                <th className={th}>Watch out for</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className={td}><strong className={strong}>{ext("https://www.adyen.com/pricing", "Adyen for Platforms")}</strong></td>
                <td className={td}>Interchange++: $0.13 + interchange + 0.60% for Visa and Mastercard</td>
                <td className={td}>High-volume marketplaces, global sellers, online and in-person sales</td>
                <td className={td}>Built for larger businesses; onboarding is sales-led and a minimum invoice amount applies</td>
              </tr>
              <tr className="border-t border-border">
                <td className={td}><strong className={strong}>{ext("https://finix.com/pricing/platforms/details", "Finix")}</strong> (PayFac-as-a-service)</td>
                <td className={td}>Flat 2.75% + 30¢, or interchange + card brand fees + 0.3% + 30¢. $2.50 per active seller a month, 25¢ per payout</td>
                <td className={td}>Growing US platforms that want to earn on payments with published pricing</td>
                <td className={td}>Per-seller fees add up with many small sellers; confirm current rates with Finix</td>
              </tr>
              <tr className="border-t border-border">
                <td className={td}><strong className={strong}>Payrix and similar PayFac-as-a-service providers</strong></td>
                <td className={td}>Custom pricing</td>
                <td className={td}>Vertical software platforms embedding payments</td>
                <td className={td}>Pricing isn&apos;t published, so compare quotes carefully</td>
              </tr>
              <tr className="border-t border-border">
                <td className={td}><strong className={strong}>{ext("https://pep.paypal.com/us/enterprise/paypal-braintree-fees", "PayPal (Braintree and its platform products)")}</strong></td>
                <td className={td}>Braintree: 2.89% + 29¢ per card payment, plus 1% for international cards. Platform pricing is custom</td>
                <td className={td}>Marketplaces whose buyers expect PayPal or Venmo at checkout</td>
                <td className={td}>Marketplace pricing isn&apos;t published</td>
              </tr>
              <tr className="border-t border-border">
                <td className={td}><strong className={strong}>Merchant of record</strong> (Paddle and similar)</td>
                <td className={td}>A higher all-in percentage</td>
                <td className={td}>Digital products and software</td>
                <td className={td}>The provider becomes the seller, so it&apos;s not a fit for most physical-goods marketplaces</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          European-first providers such as Mangopay and Ryft come up often in this search, but they&apos;re built mainly for the UK and EU. A US marketplace is usually better served by the options above.
        </p>

        <h3 className={h3}>Adyen for Platforms</h3>
        <p>
          Adyen prices each transaction as a fixed processing fee plus a payment method fee, with no setup or monthly fees. For Visa and Mastercard, that&apos;s $0.13 plus interchange plus 0.60%. It suits marketplaces that sell in several countries or both online and in person, and want one provider for all of it. Smaller platforms often find the onboarding and minimums a poor fit.
        </p>

        <h3 className={h3}>Finix and PayFac-as-a-service</h3>
        <p>
          PayFac-as-a-service providers let your platform act like a payment facilitator: you onboard sellers, set their pricing and earn a margin, without building the compliance and banking setup yourself. Finix publishes its US platform pricing, which makes it easy to model. Payrix, Tilled and Rainforest work in a similar way, with custom pricing.
        </p>

        <h3 className={h3}>PayPal for marketplaces</h3>
        <p>
          PayPal&apos;s platform products let you onboard sellers, add your own fees and handle payouts, with PayPal and Venmo built into checkout. That matters if a large share of your buyers already pay with PayPal. Braintree&apos;s standard US card rate is 2.89% + 29¢, and platform pricing is set by quote.
        </p>

        <h3 className={h3}>Merchant of record</h3>
        <p>
          A merchant of record becomes the legal seller of each product. It handles sales tax, fraud and chargebacks, and charges a higher all-in rate for it. It works well for software and digital products, and rarely for marketplaces selling physical goods or services.
        </p>

        <h2 className={h2}>How to choose</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>Launching, or still small:</strong> stay on Stripe Connect and let Stripe handle pricing. There&apos;s no platform fee, and Stripe carries more of the risk.</li>
          <li><strong className={strong}>Growing US platform that wants payments revenue:</strong> look at PayFac-as-a-service. You set the pricing and keep more control.</li>
          <li><strong className={strong}>High volume, global, or in person:</strong> Adyen for Platforms.</li>
          <li><strong className={strong}>Buyers expect PayPal:</strong> PayPal&apos;s platform products, alone or next to another processor.</li>
          <li><strong className={strong}>Selling digital products:</strong> consider a merchant of record.</li>
        </ul>
        <p>
          Many marketplaces end up with two providers: one main processor and a second for specific sellers, regions or payment methods. That also keeps sellers paid if one provider pauses your account.
        </p>

        <h2 className={h2}>Before you switch away from Stripe Connect</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className={strong}>Plan seller re-onboarding.</strong> Every seller will need to complete identity checks with the new provider. Ask how much of that can be done without the seller lifting a finger.</li>
          <li><strong className={strong}>Ask about moving saved cards.</strong> If buyers have cards saved, ask Stripe and the new provider how card data can be moved securely, so customers don&apos;t have to re-enter their details.</li>
          <li><strong className={strong}>Check who carries chargeback losses.</strong> Get it in writing: when a seller can&apos;t cover a chargeback, does the provider absorb it, or does your platform?</li>
          <li><strong className={strong}>Model the full cost.</strong> Include per-seller fees, payout fees, instant payouts and disputes, not just the card rate.</li>
          <li><strong className={strong}>Run both in parallel.</strong> Move a small group of sellers first, check payouts land on time, then move the rest.</li>
        </ol>
        <p>
          If Stripe has already paused payouts across your marketplace, or closed your platform account,{" "}
          <Link href="/contact" className={link}>write to us</Link>{" "}
          and tell us what happened. We&apos;ll tell you which US providers would take your marketplace and how fast they can get sellers paid.
        </p>
        <p>
          For more on how marketplace payments work, read our{" "}
          <Link href="/insights/marketplace-payments-guide" className={link}>marketplace payments guide</Link>, how{" "}
          <Link href="/insights/marketplace-split-payments" className={link}>split payments</Link> work, and how to set your{" "}
          <Link href="/insights/marketplace-take-rate" className={link}>marketplace take rate</Link>.
        </p>

        <h2 className={h2}>Frequently asked questions</h2>
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

export default StripeAlternatives;
