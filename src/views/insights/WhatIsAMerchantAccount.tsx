'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";
import { BOOKING_URL } from "@/lib/booking";

// US explainer: what a merchant account is and whether you need your own.
// Copy, schema and links follow the owner brief
// (what-is-a-merchant-account-instructions.md).

const BASE_URL = "https://chosepayments.com";
const SLUG = "what-is-a-merchant-account";
const PATH = `/insights/${SLUG}`;
const HEADLINE = "What Is a Merchant Account, and Do You Actually Need One?";
const DESCRIPTION =
  "What a merchant account is, how it works, what it costs, and when US businesses need their own instead of Stripe, Square or PayPal.";
// Go-live date. Update here and in the byline if the page ships later.
const PUBLISHED = "2026-11-25";
const IMG = "/insights/what-is-a-merchant-account";

const faqs = [
  {
    question: "What is a merchant account in simple terms?",
    answer:
      "It is a special bank account for card payments. It holds money from card sales for a short time. Then it pays the money out to your business bank account.",
  },
  {
    question: "Do I need a merchant account to accept credit cards?",
    answer:
      "You need merchant account access, but not always your own account. Stripe, Square and PayPal give you a shared one. Higher-risk or high-volume businesses often need a dedicated account.",
  },
  {
    question: "Is Stripe a merchant account?",
    answer:
      "Not in the traditional sense. Stripe is a payment facilitator. It holds a master account with acquiring banks and adds your business under it.",
  },
  {
    question: "How long does it take to get a merchant account?",
    answer:
      "A shared account through Stripe or Square can take minutes. A dedicated merchant account needs underwriting first. That often takes a few business days, sometimes longer.",
  },
  {
    question: "What is the difference between a merchant account and a payment processor?",
    answer:
      "The merchant account holds your card money and sits with an acquiring bank. The processor moves the payment data between you, the card networks and banks. Some companies provide both.",
  },
  {
    question: "Can I get a merchant account with bad credit?",
    answer:
      "Sometimes. Providers may check your personal credit during underwriting. They also review your business, sales volume and industry.",
  },
];

// Article schema as supplied in the brief (layout schema off), with the
// owner's author change.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  image: [
    `${BASE_URL}${IMG}-cover.webp`,
    `${BASE_URL}${IMG}-flow.webp`,
    `${BASE_URL}${IMG}-need.webp`,
  ],
  author: {
    "@type": "Person",
    name: "Aymen Elmardi",
    jobTitle: "Payments Expert",
    url: `${BASE_URL}/about`,
  },
  publisher: {
    "@type": "Organization",
    name: "ChosePayments",
    logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-mark.png` },
  },
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${PATH}` },
  keywords:
    "merchant account, what is a merchant account, do i need a merchant account, merchant account fees, how to get a merchant account, merchant account vs payment processor",
};

const sources = [
  ["Stripe: Merchant accounts 101", "https://stripe.com/resources/more/merchant-accounts-101"],
  ["Stripe: How to get a merchant account", "https://stripe.com/resources/more/how-to-get-a-merchant-account"],
  ["Stripe: Business bank accounts 101", "https://stripe.com/resources/more/business-bank-accounts-101"],
  ["Stripe: Payment processor vs merchant account", "https://stripe.com/resources/more/payment-processor-vs-merchant-account"],
  ["Stripe: Interchange plus pricing explained", "https://stripe.com/resources/more/interchange-plus-pricing-explained"],
  ["Stripe: US pricing", "https://stripe.com/pricing"],
  ["Visa: Visa acceptance entities", "https://usa.visa.com/dam/VCOM/global/support-legal/documents/visa-acceptance-entities.pdf"],
  ["Visa: The Visa payment facilitator model", "https://usa.visa.com/dam/VCOM/global/support-legal/documents/visa-payment-facilitator-model.pdf"],
];

const accountRows = [
  ["Main job", "Receives and settles card payments", "Holds your business money"],
  ["Who runs it", "An acquiring bank or provider", "Your bank"],
  ["What you use it for", "Card sales only", "Bills, payroll, savings and spending"],
  ["How long money stays", "Usually a few days", "As long as you like"],
];

const compareRows = [
  ["Examples", "Bank or specialist acquirer", "Stripe, Square, PayPal"],
  ["Setup time", "Often days, sometimes weeks", "Often minutes"],
  ["Approval", "Checked before you go live", "Checked after you start selling"],
  ["Pricing", "Often interchange-plus, negotiable", "Usually one flat rate"],
  ["Monthly fees", "Common", "Usually none"],
  ["Freeze risk", "Lower once approved", "Higher if your risk changes"],
  ["Best for", "Higher volume or higher risk", "New, small or low-risk businesses"],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";
const td = "p-3 align-top";
const strong = "text-foreground";

const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border border-border rounded-lg">
      <thead>
        <tr className="bg-muted">
          <th className={th}></th>
          {head.map((h) => <th key={h} className={th}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]} className="border-t border-border">
            {row.map((cell, i) => (
              <td key={i} className={i === 0 ? `${td} font-semibold text-foreground` : td}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// WebP on the page, PNG as fallback. Width and height are set per image so
// the layout doesn't shift while it loads.
const Figure = ({ name, alt, width, height }: { name: string; alt: string; width: number; height: number }) => (
  <picture>
    <source srcSet={`${IMG}-${name}.webp`} type="image/webp" />
    <img
      src={`${IMG}-${name}.png`}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="w-full h-auto rounded-lg border border-border my-8"
    />
  </picture>
);

const WhatIsAMerchantAccount = () => {
  return (
    <InsightsArticleLayout
      title="What Is a Merchant Account"
      description={DESCRIPTION}
      category={{ name: "Explainers", slug: "explainer" }}
      currentSlug={SLUG}
      publishedTime={PUBLISHED}
      modifiedTime={PUBLISHED}
      showArticleSchema={false}
      showInlineCTA={false}
      breadcrumbSchemaItems={[
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" },
        { name: "What Is a Merchant Account", url: PATH },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{HEADLINE}</h1>
      <div className="mb-8 text-sm text-muted-foreground italic">
        <div>Author: Aymen Elmardi - Payments Expert</div>
        <div>Published date: 25/11/2026</div>
      </div>

      {/* WebP on the page, JPEG as fallback. The cover is the largest element
          on load (LCP), so it is fetched first and not lazy-loaded. */}
      <picture>
        <source srcSet={`${IMG}-cover.webp`} type="image/webp" />
        <img
          src={`${IMG}-cover.jpg`}
          alt="Illustration of a golden retriever in a green hoodie at a laptop, pointing at a whiteboard that shows your business, a merchant account and customer payments, next to the title What Is a Merchant Account?"
          width={1672}
          height={941}
          fetchPriority="high"
          className="w-full h-auto rounded-lg border border-border mb-8"
        />
      </picture>

      <div className="text-muted-foreground space-y-6">
        <p>Every card payment you take has to land somewhere before it reaches your bank. That place is a merchant account.</p>
        <p>
          Most founders never think about it. Stripe, Square and PayPal set it up quietly in the background. Then something goes wrong, like a frozen payout or a rejected application. Suddenly the question matters.
        </p>
        <p>This guide explains what a merchant account is and how it works. It also covers what it costs and when you need your own.</p>
        <p>
          <strong className={strong}>Quick answer:</strong> A merchant account is a special bank account for card payments. It holds money from each sale before it moves to your business bank. You can open your own through an acquiring bank. Or you can use a shared one through Stripe, Square or PayPal. Small, low-risk businesses usually don&apos;t need their own. Larger, high-risk or frequently frozen businesses often do.
        </p>

        <h2 className={h2}>What is a merchant account?</h2>
        <p>
          A merchant account is a bank account built for one job. It receives money from customer card payments. It holds that money for a short time. Then it sends it to your regular business bank account.
        </p>
        <p>You can&apos;t use it like a normal account. You don&apos;t pay bills or payroll from it. It exists only to settle card payments.</p>
        <p>
          The bank that provides it is called an acquiring bank, or acquirer. The acquirer is the bank that &quot;acquires&quot; card payments on your behalf. Our guide on{" "}
          <Link href="/insights/what-is-an-acquirer" className={link}>what an acquirer is</Link> explains that role in more detail.
        </p>

        <h3 className={h3}>Merchant account vs business bank account</h3>
        <Table head={["Merchant account", "Business bank account"]} rows={accountRows} />
        <p>You need both. Card money flows into the merchant account first. Then it is paid out to your business bank account.</p>

        <h2 className={h2}>How a merchant account works</h2>
        <p>Here is what happens when a customer pays you by card.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className={strong}>The customer pays.</strong> They enter card details online or tap at your counter.</li>
          <li><strong className={strong}>The payment is checked.</strong> Your processor sends it to the card network and the customer&apos;s bank.</li>
          <li><strong className={strong}>The bank approves it.</strong> The customer&apos;s bank confirms the money is there.</li>
          <li><strong className={strong}>Money settles to your merchant account.</strong> It usually arrives within a few days.</li>
          <li><strong className={strong}>You get paid out.</strong> The money moves to your business bank account, minus fees.</li>
        </ol>
        <p>
          Your payment processor runs the technical side. Your acquirer holds the merchant account and takes the risk. Sometimes one company does both. Our guide to{" "}
          <Link href="/insights/merchant-acquirer-vs-payment-processor" className={link}>acquirers vs payment processors</Link> breaks this down.
        </p>

        <h2 className={h2}>Your own merchant account vs a shared one</h2>
        <p>This is the part most guides skip. There are two ways to get merchant account access.</p>
        <Figure
          name="flow"
          width={1600}
          height={1000}
          alt="Diagram comparing two ways to accept cards. With your own merchant account, payments go to an acquiring bank in your business's name, then to your bank. With a shared account, payments sit under Stripe, Square or PayPal's master account before reaching your bank."
        />

        <h3 className={h3}>A dedicated merchant account</h3>
        <p>
          An acquiring bank opens a merchant account in your business&apos;s own name. The bank reviews your business before you can take payments. That review is called underwriting.
        </p>
        <p>You agree on rates, reserves and terms up front. Because the bank already knows your risk, surprise freezes are less likely.</p>

        <h3 className={h3}>A shared account through a payment facilitator</h3>
        <p>
          Stripe, Square and PayPal work differently. They are payment facilitators, often called payfacs. Visa calls a payfac a &quot;master merchant.&quot; It signs up sellers for an acquirer.
        </p>
        <p>
          Your business becomes a sub-merchant under their master account. You can sign up in minutes, with no separate application. The trade-off is that much of the checking happens after you start selling. That is when holds and freezes tend to happen.
        </p>
        <p>
          Visa also limits how big a sub-merchant can grow. Past $1 million in yearly Visa sales, the rules usually require a direct agreement. That means the acquirer is added to the merchant agreement. Visa allows some exceptions, so this varies by business.
        </p>

        <h3 className={h3}>Side by side</h3>
        <Table head={["Your own merchant account", "Shared account (payfac)"]} rows={compareRows} />
        <p>
          Our guide to{" "}
          <Link href="/insights/third-party-payment-processors" className={link}>third-party payment processors</Link> goes deeper on the shared model.
        </p>

        <h2 className={h2}>Do you need a merchant account?</h2>
        <p>Every business that takes card payments needs merchant account access. The real question is whether you need your own.</p>
        <Figure
          name="need"
          width={1600}
          height={700}
          alt="Checklist for whether you need your own merchant account. A shared account suits new, small, low-risk businesses that have never been frozen. Your own account suits higher-risk categories, businesses frozen or rejected before, sellers near $1 million a year in Visa sales, and businesses needing written terms."
        />

        <h3 className={h3}>You probably don&apos;t need your own if:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>You are just starting out and want to sell fast.</li>
          <li>Your monthly card sales are still small.</li>
          <li>You sell standard, low-risk products or services.</li>
          <li>You have never had a payout held or an account frozen.</li>
        </ul>
        <p>In that case, Stripe, Square or PayPal is usually the simplest choice. Pay the flat rate and focus on growing.</p>

        <h3 className={h3}>You probably need your own if:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>You sell in a higher-risk category.</strong> Payfacs often reject or freeze these businesses.</li>
          <li><strong className={strong}>You have been frozen or rejected before.</strong> A second freeze can stop your income.</li>
          <li><strong className={strong}>Your card sales are large.</strong> Interchange-plus pricing often beats a flat rate at scale.</li>
          <li><strong className={strong}>You are close to $1 million a year in Visa sales.</strong> The card rules may require it anyway.</li>
          <li><strong className={strong}>You need predictable terms.</strong> You want reserves and limits agreed in writing.</li>
          <li><strong className={strong}>You run a marketplace or platform.</strong> You need more control over how sellers get paid.</li>
        </ul>
        <p>
          Not sure which group you fit?{" "}
          <Link href="/assessment" className={link}>Find my payment processor</Link> takes five quick questions. It matches you to the provider types that fit your business.
        </p>
        <p>
          If you sell in a higher-risk category, read our{" "}
          <Link href="/high-risk-ecommerce-payment-processing" className={link}>high-risk merchant account guide</Link> next.
        </p>

        <h2 className={h2}>How much does a merchant account cost?</h2>
        <p>The biggest cost is the fee on each card payment. But merchant accounts can carry other fees too.</p>

        <h3 className={h3}>The two pricing models</h3>
        <p>
          <strong className={strong}>Flat-rate pricing</strong> charges one rate on every card. Stripe&apos;s standard US rate is 2.9% + 30¢ per domestic card payment. International cards cost an extra 1.5%. It is simple, but you pay the same on cheap and expensive cards.
        </p>
        <p>
          <strong className={strong}>Interchange-plus pricing</strong> splits the fee into its real parts. You pay the card bank&apos;s fee and the network&apos;s fee at cost. Then you pay the provider a fixed markup on top. This is more common with dedicated merchant accounts.
        </p>
        <p>Interchange-plus shows you exactly what you pay. At higher volumes, it often works out cheaper.</p>
        <p>
          See{" "}
          <Link href="/insights/what-does-stripe-charge-us-businesses" className={link}>what Stripe charges US businesses</Link> for a full breakdown of flat-rate fees.
        </p>

        <h3 className={h3}>Other fees to check</h3>
        <p>Dedicated merchant accounts can include extra fees. Not every provider charges all of them.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>Setup fee:</strong> a one-off charge to open the account.</li>
          <li><strong className={strong}>Monthly fee:</strong> a fixed charge to keep the account open.</li>
          <li><strong className={strong}>Monthly minimum:</strong> you pay the difference if your fees fall below a set amount.</li>
          <li><strong className={strong}>Annual fee:</strong> Stripe notes these can range from about $100 to $500.</li>
          <li><strong className={strong}>Chargeback fee:</strong> a charge each time a customer disputes a payment.</li>
          <li><strong className={strong}>PCI non-compliance fee:</strong> a charge if you don&apos;t meet card security rules.</li>
          <li><strong className={strong}>Early termination fee:</strong> a charge for leaving before your contract ends.</li>
        </ul>
        <p>Always ask for every fee in writing before you sign. The rate is only part of the cost.</p>

        <h2 className={h2}>How to get a merchant account</h2>
        <p>Getting your own merchant account takes more work than signing up for Stripe. Here is the usual path.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className={strong}>Register your business</strong> and get an EIN from the IRS.</li>
          <li><strong className={strong}>Open a business bank account</strong> in your business&apos;s legal name.</li>
          <li><strong className={strong}>Get your website ready.</strong> Add clear refund, shipping, privacy and terms pages.</li>
          <li><strong className={strong}>Compare providers.</strong> Look at rates, fees, contract length and reserve terms.</li>
          <li><strong className={strong}>Apply and send your documents.</strong> Make sure every detail matches your records.</li>
          <li><strong className={strong}>Go through underwriting.</strong> The provider reviews your risk and may check your credit.</li>
          <li><strong className={strong}>Connect your checkout.</strong> Once approved, link your website or card reader.</li>
        </ol>

        <h3 className={h3}>Documents you will usually need</h3>
        <p>Every provider asks for slightly different things. Most ask for these:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Business formation documents, like articles of incorporation</li>
          <li>Your EIN confirmation</li>
          <li>Government-issued photo ID for each owner</li>
          <li>A voided check or bank letter for your business account</li>
          <li>Your last three months of business bank statements</li>
          <li>Your last three months of processing statements, if you already take cards</li>
        </ul>
        <p>Underwriters compare everything you send. A name or address that doesn&apos;t match is a common cause of delays.</p>

        <h2 className={h2}>When to talk to someone first</h2>
        <p>A merchant account is a long-term decision. The wrong contract can lock you into high fees or a tight reserve.</p>
        <p>Talk to someone first if any of these sound like you:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your Stripe, Square or PayPal account was frozen or closed.</li>
          <li>You were rejected and don&apos;t know why.</li>
          <li>You sell in a category most processors avoid.</li>
          <li>You process enough volume that a 0.5% saving really matters.</li>
        </ul>
        <p>
          We help US businesses find the right processor for their risk and volume. You can{" "}
          <Link href="/contact" className={link}>write to us</Link> with your situation. Or{" "}
          {/* Same link and attributes as the navigation's "Book a call", so the
              site-wide listeners fire calendar_click and open the booking panel. */}
          <a href={BOOKING_URL} data-cta="call" data-placement="end" target="_blank" rel="noopener noreferrer" className={link}>book a free call</a>{" "}
          and we&apos;ll talk it through.
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

        <h2 className={h2}>Sources and references</h2>
        <ul className="list-disc pl-6 space-y-2">
          {sources.map(([text, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noopener" className={link}>{text}</a>
            </li>
          ))}
        </ul>
        <p>
          <em>Last checked against these sources on 25/11/2026.</em>
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default WhatIsAMerchantAccount;
