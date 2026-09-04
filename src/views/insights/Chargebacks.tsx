'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

const chargebackSources = [
  { name: "Visa Dispute Management Guidelines", url: "https://usa.visa.com/support/small-business/dispute-resolution.html", type: "official" as const },
  { name: "Mastercard: Chargebacks Made Simple Guide", url: "https://www.mastercard.com/content/dam/mccom/shared/business/support/rules-pdfs/chargebacks-made-simple-guide.pdf", type: "official" as const },
  { name: "UK Finance: Fraud Facts", url: "https://www.ukfinance.org.uk/", type: "industry" as const },
  { name: "Chargebacks911: Chargeback Statistics", url: "https://chargebacks911.com/chargeback-stats/", type: "industry" as const },
  { name: "Chargeflow: 100+ Chargeback Statistics for 2026", url: "https://www.chargeflow.io/blog/chargeback-statistics-trends-costs-solutions", type: "industry" as const },
];

/**
 * Single source of truth for the FAQ: the visible accordion and the FAQPage
 * JSON-LD both render from this array, so the two cannot drift apart.
 */
const faqs = [
  {
    question: "What is the difference between a chargeback and a refund?",
    answer: "A refund is agreed directly between you and the customer, and you control the process. A chargeback is initiated by the customer's bank, often without warning, and the bank pulls the funds back from your payment provider while you're asked to prove the transaction was legitimate.",
  },
  {
    question: "How much does a chargeback cost a business?",
    answer: "Beyond losing the transaction amount and the product or service already delivered, most providers charge a dispute fee, typically £15 to £50. Once you include admin time and the increased scrutiny a chargeback adds to your risk profile, businesses often lose an additional £4 to £5 in total impact for every £1 directly disputed.",
  },
  {
    question: "What chargeback ratio triggers a payment provider review?",
    answer: "Thresholds vary by provider, but many treat a chargeback ratio above roughly 1% of total transactions as a trigger for closer monitoring, reserves, or a formal account review.",
  },
  {
    question: "Can I prevent chargebacks caused by customers not recognising a charge?",
    answer: "Yes, this is one of the most fixable causes. Confirm with your payment provider exactly how your business name will appear on customer bank statements, use your trading name rather than your legal entity name if they differ, and keep that name consistent across your website, receipts, and order confirmations.",
  },
  {
    question: "What should I do if I receive a chargeback notice?",
    answer: "Respond within the deadline your provider gives you, gather evidence (order confirmations, delivery proof, customer communications, and the terms agreed at checkout), and submit it through your provider's dispute process. Even if you don't plan to contest every chargeback, responding on time avoids compounding the impact on your account's risk profile.",
  },
];

const Chargebacks = () => {
  return (
    <InsightsArticleLayout
      title="Chargebacks: Why They Happen and How to Avoid Them"
      description="Too many chargebacks can freeze your payment account. See what actually triggers a dispute, what it costs, and how to reduce them before providers notice."
      category={{ name: "Practical Guides", slug: "guides" }}
      cluster="hub"
      currentSlug="chargebacks-what-they-are-and-how-to-avoid-them"
      publishedTime="2026-08-27"
      modifiedTime="2026-08-27"
      image="https://chosepayments.com/insights/chargebacks-guide-cover.png"
      sources={chargebackSources}
      // The layout's own assessment block is the single closing CTA this page
      // is allowed. showCTA={false} suppresses the second one the layout would
      // otherwise add, and there is deliberately no in-body CTA.
      showCTA={false}
      keywords={[
        "chargebacks and account freezes",
        "how chargebacks affect your payment account",
        "how to reduce chargebacks",
        "chargeback fees UK",
        "chargeback ratio",
      ]}
    >
      <FAQSchema faqs={faqs} />

      <img
        src="/insights/chargebacks-guide-cover.png"
        alt="A circular arrow reversing direction around a pound sign, representing a chargeback pulling a payment back"
        width={1200}
        height={630}
        className="w-full rounded-lg border border-border mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Chargebacks: Why They Happen and How to Avoid Them
      </h1>

      <p className="text-sm text-muted-foreground italic mb-8">
        Last updated 27 August 2026 by the ChosePayments Editorial Team.
      </p>

      <div className="text-muted-foreground space-y-6">
        <p>
          This guide is for business owners who&apos;ve either just received a chargeback notice or want to understand why disputes happen before one shows up. By the end, you&apos;ll know what a chargeback actually is, why it&apos;s different from a refund, the three real reasons they happen, what you can do to reduce them, and why they matter to your payment provider far beyond the transaction itself.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What Is a Chargeback?
        </h2>

        <p>
          A chargeback happens when a customer contacts their bank, not you, and disputes a charge. Common reasons include &quot;I don&apos;t recognise this payment,&quot; &quot;I didn&apos;t receive what I paid for,&quot; or &quot;this charge shouldn&apos;t be there.&quot;
        </p>

        <p>
          The bank pulls the money back from your payment provider and asks you to prove the transaction was legitimate.
        </p>

        <p>
          This is different from a refund in one important way. A refund is a conversation between you and the customer. A chargeback is a decision made by the bank, often without warning to you first.
        </p>

        <p>
          Even if you eventually win the dispute, a chargeback still costs you time, money, and trust in the meantime.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Why Chargebacks Are a Bigger Problem Than Most Businesses Realise
        </h2>

        <p>
          A single chargeback usually means the transaction amount is removed from your balance, you pay a dispute fee (often £15 to £50, sometimes more), you lose the product or service you already delivered, and your account&apos;s internal risk score ticks up.
        </p>

        <p>
          The real danger isn&apos;t one chargeback. It&apos;s a pattern. If disputes happen too often, payment providers can delay your payouts, hold a reserve from your funds, raise your processing fees, or suspend your account entirely.
        </p>

        <p>
          For every £1 lost directly to a chargeback, businesses often lose another £4 to £5 in total impact once fees, admin time, and future risk exposure are factored in.
        </p>

        <p>
          Card-not-present fraud, the kind that drives many chargebacks, is projected to cost businesses globally over $28 billion by 2026, up roughly 40% from 2023. That&apos;s the fraud-driven slice of the problem specifically; poor customer experience and unrecognised charges add substantially more disputes on top of it.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          The Three Main Reasons Chargebacks Happen
        </h2>

        <p>Most chargebacks fall into one of three categories.</p>

        <p>
          <strong className="text-foreground">1. Stolen card details (real fraud).</strong> Someone uses card details without the cardholder&apos;s permission. You have very little control here individually, but strong checkout security checks reduce your exposure.
        </p>

        <p>
          <strong className="text-foreground">2. Business mistakes.</strong> More common than most businesses expect. Customers charged twice, payments taken earlier than agreed, long delivery delays, confusing refund processes, or slow customer support all push customers to their bank instead of to you, because it feels faster.
        </p>

        <p>
          <strong className="text-foreground">3. Customers don&apos;t recognise the charge.</strong> Often overlooked, and often avoidable. A customer checks their bank app, sees a name they don&apos;t recognise, and assumes something&apos;s wrong. This happens when your company&apos;s legal name differs from the trading name customers actually know. If customers know you as &quot;Heathrow Kebab&quot; but their bank statement shows &quot;Heathrow UK Limited,&quot; the payment is legitimate, but the customer doesn&apos;t connect the two, and disputes it.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          How to Reduce Chargebacks
        </h2>

        <p>
          <strong className="text-foreground">Make your name familiar, before and after payment.</strong> Give your payment provider the trading name customers actually know you by, not just your legal entity name, and confirm how it will appear on bank statements. Keep that name consistent across your website, receipts, and confirmations. Businesses that regularly show up in a customer&apos;s inbox (order confirmations, shipping updates) are far less likely to get disputed later.
        </p>

        <p>
          <strong className="text-foreground">Make refunds easier than chargebacks.</strong> Many customers file a chargeback simply because a refund feels slow or unclear. A clear refund policy, an easy way to contact you, and a fast response when something goes wrong all remove the reason to go straight to the bank.
        </p>

        <p>
          <strong className="text-foreground">Reduce fraud at checkout.</strong> Extra verification for online payments, stronger authentication on higher-value transactions, and tools that flag suspicious behaviour automatically cut stolen-card disputes and protect your standing with your payment provider at the same time.
        </p>

        <p>
          <strong className="text-foreground">Keep proof, even if you never need it.</strong> Order confirmations, delivery confirmations, customer messages, and terms agreed at checkout all count as evidence if a dispute happens. Even if you never plan to formally contest a chargeback, this documentation protects you if your provider reviews the account.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Why Chargebacks Often Lead to Account Reviews or Freezes
        </h2>

        <p>
          Payment providers track dispute levels closely, not just per transaction but as a trend. If chargebacks rise suddenly or stay elevated, providers may ask for more documentation, change your payout schedule, <Link href="/insights/why-providers-impose-reserves" className="text-primary hover:underline">impose a reserve on your funds</Link>, or flag the account for review.
        </p>

        <p>
          This is the same underlying risk monitoring that causes <Link href="/insights/why-accounts-get-flagged-after-growth" className="text-primary hover:underline">payment accounts to get flagged after unrelated growth spikes</Link>, and it&apos;s frequently what triggers a provider to <Link href="/insights/why-providers-re-underwrite-accounts" className="text-primary hover:underline">re-underwrite an existing account</Link>. A rising chargeback ratio is one of the clearest, earliest signals a provider watches, understanding that link lets you act before funds are already held, instead of reacting after.
        </p>

        <p>
          Marketplaces face a version of this problem that&apos;s even harder to manage, since a single seller&apos;s disputes can put the whole platform&apos;s account at risk. <Link href="/insights/marketplace-payments-guide" className="text-primary hover:underline">See how chargeback liability works differently for marketplaces →</Link>
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-6">
          FAQ
        </h2>

        <FAQAccordion faqs={faqs} />

        <p className="mt-10">
          Chargebacks are a trust problem as much as a payments one, and providers read a rising dispute rate as a risk signal well before it becomes a frozen account.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default Chargebacks;
