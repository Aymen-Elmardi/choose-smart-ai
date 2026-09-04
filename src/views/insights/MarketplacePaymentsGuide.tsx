'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

const sources = [
  { name: "Checkout.com: A Guide to Marketplace Payments", url: "https://www.checkout.com/blog/a-guide-to-marketplace-payments", type: "industry" as const },
  { name: "Rapyd: What Causes Marketplace Chargebacks and How to Prevent Them", url: "https://www.rapyd.net/blog/8-marketplace-chargeback-reasons-how-to-reduce/", type: "industry" as const },
  { name: "Stripe: Know Your Business (KYB) Guide", url: "https://stripe.com/resources/more/know-your-business-kyb", type: "industry" as const },
  { name: "Visa: Payment Facilitator and Marketplace Risk Guide", url: "https://usa.visa.com/content/dam/VCOM/regional/na/us/partner-with-us/documents/visa-payment-facilitator-and-marketplace-risk-guide.pdf", type: "official" as const },
  { name: "SVB: How to Tackle Top Challenges in E-Commerce Payments", url: "https://www.svb.com/payment-management-insights/merchant-services/tackle-top-challenges-ecommerce-payments/", type: "industry" as const },
];

/**
 * Single source of truth for the FAQ: the visible section and the FAQPage
 * JSON-LD both render from this array, so the two cannot drift apart.
 *
 * The phrasing is deliberate. These near-verbatim questions already rank in
 * positions 1 to 5 in Search Console for this page; rewording them risks
 * losing rankings that are already working.
 */
const faqs = [
  {
    question: "How do marketplace payments work for platforms and sellers?",
    answer: "A buyer pays once, the marketplace's payment provider splits that payment between the marketplace's commission and each seller involved, then pays sellers out on a schedule the marketplace sets, sometimes immediately, sometimes held until the sale is confirmed complete.",
  },
  {
    question: "What is a marketplace payment and how does it work?",
    answer: "A marketplace payment is a single transaction that gets divided among multiple recipients, the platform and one or more sellers, rather than paid entirely to one merchant. It requires split-payment routing and seller-level verification that standard merchant accounts don't need.",
  },
  {
    question: "How do marketplaces manage multiparty payment compliance?",
    answer: "By pushing KYC/KYB verification down to every seller before they can be paid, screening sellers against sanctions lists, and holding or delaying payouts until disputes are resolved. The marketplace is compliant on behalf of every seller at once, not just its own transactions.",
  },
  {
    question: "How do merchant payment solutions handle split payments?",
    answer: "Payment providers built for marketplaces (rather than standard merchants) support split-payment APIs that divide one transaction across multiple destination accounts automatically, calculating commission and routing the remainder to each seller's verified bank account.",
  },
  {
    question: "How do I handle disputes and refunds across multiple sellers?",
    answer: "Route disputes to the specific seller involved, not the whole platform, using clear billing descriptors so buyers recognise charges. Delay payouts until a sale is confirmed, so disputed funds haven't already left the marketplace when a chargeback lands.",
  },
  {
    question: "Do marketplaces need a payment facilitator license?",
    answer: "It depends on how funds are held and moved. Marketplaces holding funds on behalf of sellers, rather than passing payments straight through, may need a payment institution license or a partnership with a licensed provider, particularly under EU rules like PSD2. Requirements vary by jurisdiction and business model.",
  },
];

const toc = [
  { id: "why-different", label: "Why Marketplace Payments Work Differently" },
  { id: "risk-assessment", label: "How Providers Assess Marketplace Risk" },
  { id: "real-cost", label: "The Real Cost of the Wrong Provider" },
  { id: "compliance", label: "Compliance: AML, KYB, and PSD2/PSD3" },
  { id: "positioning", label: "How to Position Your Marketplace for the Right Partner" },
  { id: "one-or-several", label: "One Provider or Several?" },
  { id: "faq", label: "FAQ" },
];

const MarketplacePaymentsGuide = () => {
  return (
    <InsightsArticleLayout
      title="Marketplace Payments Guide: Splits, Risk & Compliance"
      description="A complete guide to marketplace payments: how split payments, seller compliance, chargebacks, and risk reviews work, and how to avoid a frozen account."
      category={{ name: "Guides", slug: "guides" }}
      cluster="hub"
      currentSlug="marketplace-payments-guide"
      publishedTime="2026-08-26"
      modifiedTime="2026-08-26"
      image="https://chosepayments.com/insights/marketplace-payments-guide-cover.png"
      sources={sources}
      // The layout's own assessment CTA serves as the closing call to action,
      // which keeps this page at the two CTA blocks its brief allows.
      showCTA={false}
      keywords={[
        "marketplace payments",
        "marketplace payments guide",
        "marketplace payment processing",
        "marketplace split payments",
        "marketplace compliance chargebacks",
        "multiparty payment compliance",
      ]}
    >
      <FAQSchema faqs={faqs} />

      <img
        src="/insights/marketplace-payments-guide-cover.png"
        alt="One buyer payment branching to three sellers, illustrating how a marketplace splits a single transaction"
        width={1200}
        height={630}
        className="w-full rounded-lg border border-border mb-8"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
        Marketplace Payments Guide: Splits, Risk &amp; Compliance
      </h1>

      <p className="text-sm text-muted-foreground italic mb-8">
        Last updated 26 August 2026 by the ChosePayments Editorial Team.
      </p>

      <div className="text-muted-foreground space-y-6">
        <p>
          Running a marketplace is not the same as running a store, and payment providers know it before you do. This guide is for marketplace founders, operators, and finance leads who need to understand how marketplace payments actually work before choosing, or fixing, a payment setup.
        </p>

        <p>
          By the end, you&apos;ll know: why marketplaces get treated as higher risk, what payment providers actually monitor, what a mismatched provider costs you, and how to position your platform for a stable setup that survives growth.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          In This Guide
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-primary hover:underline">{item.label}</a>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Key Takeaways
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>A marketplace collects one payment and splits it between itself and multiple sellers, often holding funds until a sale is confirmed complete. That structure alone is why providers treat marketplaces as higher risk than a normal store.</li>
          <li>Providers watch four things continuously after approval: chargeback ratio, growth rate, cross-border activity, and payout timing.</li>
          <li>The most expensive mistake is picking a provider on rate alone. A frozen marketplace account doesn&apos;t just cost you, it stops every seller on your platform from getting paid at once.</li>
          <li>Seller verification (KYB/KYC) is a regulatory requirement that flows down to you from your payment provider, not an optional extra step.</li>
        </ul>

        <h2 id="why-different" className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
          Why Marketplace Payments Work Differently
        </h2>

        <p>
          A standard retailer accepts money for its own goods. A marketplace accepts money, holds it, splits it between itself and its sellers, and pays each one out on its own schedule, often across different countries and currencies. That&apos;s what makes marketplace payments structurally harder than standard e-commerce, and it&apos;s why payment providers treat marketplaces as higher risk from day one.
        </p>

        <p>
          A single customer order might involve three different sellers. The provider has to take the full payment, calculate the marketplace&apos;s commission, split the rest between three separate bank accounts, and get it right every time. That&apos;s split payments, and it needs routing logic most standard payment processors were never built for.
        </p>

        <p>
          Many marketplaces also delay payouts on purpose, holding funds in escrow until a buyer confirms delivery. This builds buyer trust, but it also means the marketplace is holding money on behalf of other people, exactly the kind of activity that draws regulatory scrutiny and can require a specific license or a licensed partner.
        </p>

        <p>
          Chargebacks compound the problem. A buyer who doesn&apos;t recognise a charge (because it shows the marketplace&apos;s name instead of the seller&apos;s) is more likely to dispute it. When a dispute happens, the seller may be unreachable, and the marketplace is often left liable for a chargeback on money it already paid out.
        </p>

        <p>
          Then there&apos;s seller verification. Every seller who can receive a payout has to be checked under Know Your Business (KYB) and Know Your Customer (KYC) rules: identity, business registration, beneficial ownership, sanctions screening. Marketplaces carry the operational burden of collecting this, even though it&apos;s the provider&apos;s regulatory requirement, not the marketplace&apos;s choice. <Link href="/insights/marketplace-seller-info" className="text-primary hover:underline">See exactly what documents seller verification requires →</Link>
        </p>

        <h2 id="risk-assessment" className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
          How Providers Assess Marketplace Risk
        </h2>

        <p>
          Providers don&apos;t reject or freeze accounts at random. Underwriting for a marketplace goes beyond a standard merchant application, and it continues after approval as ongoing monitoring.
        </p>

        <p>
          At application, providers look at how rigorously you vet sellers before letting them list or get paid, whether your dispute resolution process is clear and enforceable, and how you structure payouts.
        </p>

        <p>After approval, four signals get watched on an ongoing basis:</p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong className="text-foreground">Chargeback ratio.</strong> Most providers flag accounts once chargebacks cross roughly 1% of transactions. For marketplaces, a spike often points to one compromised seller or a systemic product issue, not the whole platform.
          </li>
          <li>
            <strong className="text-foreground">Growth rate.</strong> A sudden, unexplained volume increase can look identical to fraud from a risk system&apos;s point of view, even when the growth is entirely legitimate. <Link href="/insights/why-accounts-get-flagged-after-growth" className="text-primary hover:underline">How sudden growth triggers account reviews →</Link>
          </li>
          <li>
            <strong className="text-foreground">Cross-border activity.</strong> International buyers and sellers introduce currency risk, inconsistent consumer protection law, and more exposure to fraud, all of which raise scrutiny.
          </li>
          <li>
            <strong className="text-foreground">Payout timing.</strong> Paying sellers out immediately shifts chargeback risk onto the provider. Delayed payouts, held until the transaction is confirmed complete, are what most providers prefer.
          </li>
        </ol>

        <h2 id="real-cost" className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
          The Real Cost of the Wrong Provider
        </h2>

        <p>
          Picking a processor on advertised rate alone is a common, expensive mistake for marketplaces specifically.
        </p>

        <p>
          Blended pricing hides your real cost. A single flat rate looks simple, but it means low-risk transactions subsidise the provider&apos;s exposure to riskier ones. At real marketplace volume, <Link href="/insights/pricing-models/interchange-plus-plus" className="text-primary hover:underline">Interchange++ pricing</Link> is usually more transparent and cheaper, though it takes a stronger risk profile and higher volume to qualify.
        </p>

        <p>
          An account freeze is the worst-case outcome, and it&apos;s a marketplace-specific catastrophe. You lose the ability to accept new orders, and you can&apos;t pay sellers who are already owed money. That breaks trust across your entire seller base at once, not just one transaction, and the reputational damage tends to outlast the freeze itself.
        </p>

        <p className="italic">
          If you&apos;d like a second pair of eyes on your current setup before it becomes a problem, our <Link href="/assessment" className="text-primary hover:underline not-italic">free risk assessment</Link> takes about a minute and tells you where the mismatch is, if there is one.
        </p>

        <h2 id="compliance" className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
          Compliance: AML, KYB, and PSD2/PSD3
        </h2>

        <p>
          Payment providers are regulated financial gatekeepers, and they won&apos;t work with platforms that can&apos;t meet the same standards.
        </p>

        <p>
          <strong className="text-foreground">AML and KYC/KYB.</strong> Anti-money laundering rules require providers to know who they&apos;re moving money for. Because a marketplace sits between the provider and its sellers, that obligation flows down to the marketplace: collecting government IDs, business registration documents, and sanctions-list screening before a seller can be paid.
        </p>

        <p>
          <strong className="text-foreground">PSD2 and PSD3 in Europe.</strong> Marketplaces operating in the EU face Strong Customer Authentication requirements under PSD2, plus stricter rules on holding funds for sellers. Depending on your model, you may need a payment institution license or a partnership with a licensed provider to hold funds legally. <Link href="/insights/payment-scheme-rules-explained" className="text-primary hover:underline">How scheme rules apply across payment methods →</Link>
        </p>

        <p>
          This is also where &quot;multiparty payment compliance&quot; gets genuinely complicated: a marketplace isn&apos;t just complying with rules for its own transactions, it&apos;s enforcing compliance on behalf of every seller on the platform, at the same time, continuously.
        </p>

        <h2 id="positioning" className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
          How to Position Your Marketplace for the Right Partner
        </h2>

        <p>A stable payment setup gets built before you apply, not fixed after a freeze.</p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong className="text-foreground">Verify sellers properly from day one.</strong> Collect registration documents, confirm bank ownership, and screen against watchlists. A marketplace that visibly manages seller quality looks like a lower-risk business to underwrite.
          </li>
          <li>
            <strong className="text-foreground">Make disputes easy to resolve before they become chargebacks.</strong> Use billing descriptors buyers recognise, and give sellers a fast, clear process for responding to complaints.
          </li>
          <li>
            <strong className="text-foreground">Delay payouts until a transaction is confirmed.</strong> This protects both your marketplace and your provider from paying out on funds that get disputed later.
          </li>
          <li>
            <strong className="text-foreground">Build a real risk process, not just a policy document.</strong> Monitor your own chargeback and dispute trends, and fix the root causes, not just the symptoms.
          </li>
        </ol>

        <h2 id="one-or-several" className="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">
          One Provider or Several?
        </h2>

        <p>
          Most marketplaces default to a single payment provider and stay there, which works fine until that provider&apos;s risk appetite no longer matches your business as it grows or diversifies. At that point, you&apos;re stuck: renegotiating from a weak position, or migrating everything at the worst possible time.
        </p>

        <p>
          Marketplaces with meaningful volume increasingly work with more than one provider, routing different sellers to whichever provider&apos;s risk appetite fits them best. A new seller with no track record might sit with a provider that tolerates more risk; an established seller with a clean history can move to a provider offering better rates. This also gives you real negotiating leverage, since providers compete for your volume instead of assuming they&apos;re your only option.
        </p>

        <p>
          This isn&apos;t the right setup for every marketplace, especially smaller ones where the overhead of managing multiple provider relationships outweighs the benefit. But if you&apos;re processing meaningful volume and haven&apos;t reviewed whether a single-provider setup still fits, it&apos;s worth checking before a mismatch becomes a frozen account.
        </p>

        <h2 id="faq" className="text-2xl font-bold text-foreground mt-10 mb-6 scroll-mt-24">
          FAQ
        </h2>

        <FAQAccordion faqs={faqs} />

        <p className="mt-10">
          Every marketplace&apos;s risk profile is different, and there&apos;s no substitute for checking your specific setup against real provider criteria rather than general advice.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default MarketplacePaymentsGuide;
