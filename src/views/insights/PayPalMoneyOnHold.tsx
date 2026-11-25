'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";

// US article for sellers whose money PayPal is holding. Copy, schema and
// links follow the owner brief (paypal-money-on-hold-instructions.md).

const BASE_URL = "https://chosepayments.com";
const SLUG = "paypal-money-on-hold";
const PATH = `/insights/${SLUG}`;
const HEADLINE = "PayPal Money on Hold? Why It Happens and How to Get It Released";
const DESCRIPTION =
  "PayPal holding your money? Learn why holds, reserves and limitations happen, how long PayPal can hold funds, and how US sellers get money released.";
// Go-live date. Update here and in the byline if the page ships later.
const PUBLISHED = "2026-11-25";
const IMG = "/insights/paypal-money-on-hold";
const COVER = `${IMG}-cover.jpg`;

const faqs = [
  {
    question: "Why is PayPal holding my money for 21 days?",
    answer:
      "PayPal holds payments for up to 21 days when it sees extra risk. Common reasons are being a new seller, a sales spike or buyer complaints. Adding tracking can release the money about 24 hours after delivery.",
  },
  {
    question: "How long can PayPal legally hold your money?",
    answer:
      "Most payment holds last up to 21 days. Disputed payments can be held until resolved, up to 180 days. PayPal can also hold funds up to 180 days after restricted activity.",
  },
  {
    question: "How do I get PayPal to release my money?",
    answer:
      "Log in and select Know your options under your balance. Add tracking for shipped items, or mark services as Completed. Finish identity checks and resolve any open disputes.",
  },
  {
    question: "Can PayPal keep my money forever?",
    answer:
      "PayPal's terms set time limits on holds, usually 21 or 180 days. Money can be used to cover refunds, chargebacks or reversals you owe. Court orders can extend some holds.",
  },
  {
    question: "What is the difference between a PayPal hold and a reserve?",
    answer:
      "A payment hold delays specific payments, usually for up to 21 days. A reserve keeps a share of your money aside to cover future chargebacks. Reserves are reviewed over months, not days.",
  },
  {
    question: "Will calling PayPal remove a limitation?",
    answer:
      "Usually not. PayPal says phone support can't remove most limitations. Complete the steps in the Resolution Center and wait for the email review.",
  },
];

// Article schema as supplied in the brief (layout schema off). The cover is
// listed first, ahead of the two in-article images.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: HEADLINE,
  description: DESCRIPTION,
  image: [
    `${BASE_URL}${COVER}`,
    `${BASE_URL}${IMG}-types.webp`,
    `${BASE_URL}${IMG}-release.webp`,
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
    "paypal money on hold, paypal holding money, how long can paypal hold funds, paypal reserve, paypal account limited",
};

const sources = [
  ["PayPal User Agreement (US), last updated November 4, 2026", "https://www.paypal.com/us/legalhub/paypal/useragreement-full"],
  ["PayPal: Why is your PayPal money on hold? A guide for merchants", "https://www.paypal.com/us/brc/article/funds-availability"],
  ["PayPal Help: How can I release my payment(s) on hold?", "https://www.paypal.com/us/cshelp/article/how-can-i-release-my-payments-on-hold-help129"],
  ["PayPal Help: New PayPal account, payments on hold", "https://www.paypal.com/us/cshelp/article/new-paypal-account-%E2%80%93-payments-on-hold-and-accessing-your-money-quicker-help848"],
  ["PayPal: The why and what of account reserves", "https://www.paypal.com/us/brc/article/account-reserves"],
  ["PayPal Help: What are reserves?", "https://www.paypal.com/us/cshelp/article/what-are-reserves-help393"],
  ["PayPal Help: How do I remove a limitation from my account?", "https://www.paypal.com/us/cshelp/article/how-do-i-remove-a-limitation-from-my-account-help535"],
  ["PayPal Help: How long will it take to lift my account limitation?", "https://www.paypal.com/us/cshelp/article/how-long-will-it-take-to-lift-my-paypal-account-limitation-help531"],
  ["PayPal Help: Dispute filing timeframes", "https://www.paypal.com/us/cshelp/article/dispute-filing-timeframes-help1173"],
];

const link = "text-primary hover:underline";
const h2 = "text-2xl font-semibold text-foreground mt-10 mb-4";
const h3 = "text-lg font-semibold text-foreground mt-6 mb-2";
const th = "text-left p-3 font-semibold text-foreground";
const td = "p-3 align-top";
const strong = "text-foreground";

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

const PayPalMoneyOnHold = () => {
  return (
    <InsightsArticleLayout
      title="PayPal Money on Hold"
      description={DESCRIPTION}
      category={{ name: "Crisis Intervention", slug: "crisis" }}
      cluster="crisis"
      currentSlug={SLUG}
      publishedTime={PUBLISHED}
      modifiedTime={PUBLISHED}
      showArticleSchema={false}
      showInlineCTA={false}
      breadcrumbSchemaItems={[
        { name: "Home", url: "/" },
        { name: "Insights", url: "/insights" },
        { name: "PayPal Money on Hold", url: PATH },
      ]}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{HEADLINE}</h1>
      <div className="mb-8 text-sm text-muted-foreground italic">
        <div>Author: Aymen Elmardi - Payments Expert</div>
        <div>Published date: 25/11/2026</div>
      </div>

      {/* WebP on the page, JPEG as fallback and for og:image. The cover is the
          largest element on load (LCP), so it is fetched first. */}
      <picture>
        <source srcSet={`${IMG}-cover.webp`} type="image/webp" />
        <img
          src={COVER}
          alt="PayPal money on hold? Here is how to release it fast."
          width={1672}
          height={941}
          fetchPriority="high"
          className="w-full h-auto rounded-lg border border-border mb-8"
        />
      </picture>

      <div className="text-muted-foreground space-y-6">
        <p>You made the sale. The buyer paid. But the money sits in PayPal, and you can&apos;t touch it.</p>
        <p>
          That is frustrating when you have stock to buy and bills to pay. The good news is that most PayPal holds end. Many can end faster if you take the right steps.
        </p>
        <p>
          This guide is for US business sellers. It covers why PayPal is holding your money and how long it can last. It also shows what to do today to get it released.
        </p>
        <p>
          <strong className={strong}>Quick answer:</strong> PayPal usually holds a payment for up to 21 days. Adding tracking can release it about 24 hours after delivery is confirmed. Disputed payments can be held until resolved, for up to 180 days. Reserves and account limitations follow their own rules, covered below.
        </p>

        <h2 className={h2}>Why is PayPal holding my money?</h2>
        <p>
          PayPal holds money when it sees more risk than usual. It wants funds on hand in case a buyer asks for a refund. PayPal reviews account age, sales activity, past disputes and customer satisfaction.
        </p>
        <p>These are the most common reasons PayPal gives:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>You are a new seller.</strong> You have not built a selling history with PayPal yet.</li>
          <li><strong className={strong}>You have not sold in a while.</strong> A dormant account has to rebuild its track record.</li>
          <li><strong className={strong}>Your sales suddenly jumped.</strong> A spike, or a change in price or items, looks unusual.</li>
          <li><strong className={strong}>Buyers complained.</strong> Several refund requests, disputes or chargebacks raise your risk score.</li>
          <li><strong className={strong}>You sell higher-risk items.</strong> PayPal names tickets, gift cards, electronics, computers and travel packages.</li>
          <li><strong className={strong}>Your identity checks are not finished.</strong> PayPal can hold payments until verification is complete.</li>
        </ul>
        <p>
          A hold is not a judgment on your business. It is an automated risk decision. That matters, because you can usually change the inputs.
        </p>

        <h2 className={h2}>Hold, reserve or limitation: which one do you have?</h2>
        <p>
          PayPal uses three different tools. Each one works differently, so first check which one you have. Log in and select <strong className={strong}>Know your options</strong> under your PayPal balance. Also check your email and the Resolution Center.
        </p>
        <Figure
          name="types"
          width={1600}
          height={900}
          alt="Comparison of three PayPal tools: a payment hold lasts up to 21 days, a reserve sets aside part of your money for a period such as 90 days, and an account limitation lasts until PayPal reviews your steps."
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className={th}></th>
                <th className={th}>Payment hold</th>
                <th className={th}>Reserve</th>
                <th className={th}>Account limitation</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className={`${td} font-semibold text-foreground`}>What it is</td>
                <td className={td}>One payment held for a short time</td>
                <td className={td}>A share of your money set aside</td>
                <td className={td}>Restricted access to your account</td>
              </tr>
              <tr className="border-t border-border">
                <td className={`${td} font-semibold text-foreground`}>Usual length</td>
                <td className={td}>Up to 21 days</td>
                <td className={td}>Set by PayPal, such as 90 days per payment</td>
                <td className={td}>Until you complete the steps and PayPal reviews them</td>
              </tr>
              <tr className="border-t border-border">
                <td className={`${td} font-semibold text-foreground`}>What you can do</td>
                <td className={td}>Add tracking or mark the order Completed</td>
                <td className={td}>Keep disputes low and ask for a review</td>
                <td className={td}>Upload what PayPal asks for</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={h3}>Payment hold</h3>
        <p>
          A payment hold affects specific payments, not your whole account. The money is still yours. You just can&apos;t withdraw it until PayPal is sure the buyer got their order.
        </p>

        <h3 className={h3}>Reserve</h3>
        <p>
          A reserve is money PayPal keeps aside from your business account. It covers chargebacks, claims and reversals that your balance can&apos;t cover. The money is still yours. You just can&apos;t withdraw it yet.
        </p>
        <p>There are two types:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>Rolling reserve.</strong> PayPal holds a percentage of each day&apos;s payments. It releases each amount on a schedule.</li>
          <li><strong className={strong}>Minimum reserve.</strong> You must keep a set amount of money in your account.</li>
        </ul>
        <p>
          PayPal gives an example of a 10% rolling reserve held for 90 days. Money you receive on day 1 is released on day 91. Money from day 2 is released on day 92, and so on.
        </p>
        <p>
          See how <Link href="/insights/rolling-vs-fixed-reserve" className={link}>rolling and fixed reserves</Link> affect your cash flow.
        </p>

        <h3 className={h3}>Account limitation</h3>
        <p>A limitation restricts what you can do with your account. You might not be able to send or withdraw money.</p>
        <p>
          PayPal says limitations can follow suspected fraud or a high dispute rate. Breaking its Acceptable Use Policy can trigger one too. Some are placed for regulatory reasons.
        </p>

        <h2 className={h2}>How long can PayPal hold funds?</h2>
        <p>It depends on which tool PayPal is using. Here are the timelines from PayPal&apos;s own terms and help pages.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>Payment holds:</strong> usually up to 21 days from the date you received the payment.</li>
          <li><strong className={strong}>Holds while a payment is disputed:</strong> until the dispute is resolved, but no longer than 180 days.</li>
          <li><strong className={strong}>Holds after restricted activity:</strong> up to 180 days if PayPal sees a risk of liability.</li>
          <li><strong className={strong}>Rolling reserves:</strong> each amount is held for the period PayPal sets, such as 90 days.</li>
          <li><strong className={strong}>Minimum reserves:</strong> PayPal says it reviews these within 180 days.</li>
          <li><strong className={strong}>Limitations:</strong> once you complete the steps, the review usually takes 3 business days.</li>
        </ul>
        <p>
          Why 180 days? Buyers can open an Item Not Received dispute up to 180 days after paying. It is the same window you see in PayPal&apos;s hold rules.
        </p>
        <p>Court orders and other legal processes can stretch some holds past 180 days. That is rare for ordinary sellers.</p>

        <h2 className={h2}>How to get a PayPal hold released faster</h2>
        <p>
          Start by finding the reason. Log in and select <strong className={strong}>Know your options</strong> under your PayPal balance. PayPal also sends an email that explains the hold.
        </p>
        <p>Then take the step that matches your order.</p>
        <Figure
          name="release"
          width={1600}
          height={1100}
          alt="How to release a PayPal payment hold: physical goods with tracking release about 24 hours after delivery, services marked Completed release 7 days later, and orders without tracking usually wait up to 21 days."
        />
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className={strong}>Add tracking for physical goods.</strong> Use one of PayPal&apos;s approved carriers. PayPal releases the hold about 24 hours after delivery is confirmed.</li>
          <li><strong className={strong}>Print your shipping label through PayPal.</strong> PayPal tracks the package and releases the hold the same way.</li>
          <li><strong className={strong}>Mark services and digital goods as Completed.</strong> PayPal releases the hold 7 days after you update the order status.</li>
          <li><strong className={strong}>Finish identity verification.</strong> Holds tied to verification stay until every step is done.</li>
          <li><strong className={strong}>Resolve open disputes quickly.</strong> Reply in the Resolution Center and offer a fair fix early.</li>
        </ol>
        <p>PayPal notes that some holds still run the full 21 days. That can happen after an unusual change in your selling pattern.</p>
        <p>Without tracking, expect the full hold, usually up to 21 days. It can run longer if the buyer challenges the payment.</p>

        <h2 className={h2}>What to do if your PayPal account is limited</h2>
        <p>A limitation is more serious than a hold. Work through it in this order.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong className={strong}>Read the email from PayPal.</strong> It explains the reason for the limitation.</li>
          <li><strong className={strong}>Open the Resolution Center.</strong> You can also select the bell icon on your dashboard.</li>
          <li><strong className={strong}>Complete every step listed.</strong> This might be proof of identity, invoices or proof of delivery.</li>
          <li><strong className={strong}>Wait for the review.</strong> It usually takes 3 business days after you finish the steps.</li>
        </ol>
        <p>In most cases, phone support can&apos;t remove a limitation. The review team handles it by email.</p>

        <h2 className={h2}>What to do about a PayPal reserve</h2>
        <p>A reserve is harder to remove than a hold. It is tied to your risk profile, not one payment.</p>
        <p>PayPal looks at several factors when setting a reserve:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>How long you have had your PayPal account</li>
          <li>How long you have been in business</li>
          <li>Your processing history with PayPal and other providers</li>
          <li>Whether your industry has more chargebacks or refunds</li>
          <li>How many claims and disputes your account gets</li>
          <li>Your business and personal credit history</li>
        </ul>
        <p>PayPal says it reviews reserves and can adjust or remove them. Better business performance is what moves that decision.</p>
        <p>
          Plan your cash flow as if the reserve will stay for months. Our{" "}
          <Link href="/insights/crisis/funds-on-hold-rolling-reserve-payment-processor" className={link}>funds on hold guide</Link> shows how to plan around one.
        </p>

        <h2 className={h2}>How to stop PayPal holding your money again</h2>
        <p>Holds come from risk signals. Send fewer of them and you get fewer holds.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className={strong}>Describe items accurately.</strong> Use clear photos and honest descriptions.</li>
          <li><strong className={strong}>State your shipping times clearly.</strong> Then ship on time, every time.</li>
          <li><strong className={strong}>Upload tracking for every order.</strong> It is the fastest way to release held payments.</li>
          <li><strong className={strong}>Publish a clear return policy.</strong> Buyers who can return easily rarely file disputes.</li>
          <li><strong className={strong}>Answer buyers fast.</strong> Solve problems before they turn into disputes.</li>
          <li><strong className={strong}>Keep complaints low.</strong> PayPal suggests keeping them below 1% of your sales.</li>
        </ul>
        <p>
          Disputes and chargebacks hurt more than most sellers expect. This guide on{" "}
          <Link href="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className={link}>chargebacks and how to avoid them</Link> covers the basics.
        </p>

        <h2 className={h2}>When PayPal is the wrong fit for your business</h2>
        <p>Sometimes the holds are not a one-off. They keep coming back because of what you sell or how you grow.</p>
        <p>
          PayPal works well for many sellers. It is built for broad, low-risk volume. If you sell higher-risk products, holds may never fully stop. The same applies if your sales swing hard month to month.
        </p>
        <p>These are signs it is time to look beyond PayPal:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Holds or reserves have lasted more than a few months.</li>
          <li>Your category is on PayPal&apos;s higher-risk list.</li>
          <li>One frozen account would stop your whole business.</li>
          <li>You are planning a big launch or seasonal spike.</li>
        </ul>
        <p>
          You don&apos;t have to leave PayPal. Many businesses keep it at checkout and add a second processor. That way, one hold never stops all your income. Our{" "}
          <Link href="/insights/comparisons/stripe-vs-paypal" className={link}>Stripe vs PayPal comparison</Link> is a good place to start.
        </p>
        <p>
          Some providers check your risk before you go live. They agree the terms up front, so there are fewer surprises later. Our{" "}
          <Link href="/high-risk-ecommerce-payment-processing" className={link}>high-risk merchant account guide</Link> explains how that works.
        </p>
        <p>
          If you want a shortcut,{" "}
          <Link href="/assessment" className={link}>find a processor that won&apos;t hold your payouts</Link>. It takes five quick questions. Already stuck with money on hold?{" "}
          <Link href="/contact" className={link}>Write to us</Link> and we&apos;ll tell you your options.
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
          <em>Last checked against PayPal&apos;s US pages on November 25, 2026.</em>
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default PayPalMoneyOnHold;
