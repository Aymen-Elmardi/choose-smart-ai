'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQAccordion from "@/components/FAQAccordion";
import { Source } from "@/components/SourcesCitation";

const sources: Source[] = [
  {
    name: "ResolvePay, 23 Statistics on ACH vs Card Fees in High-Ticket B2B Transactions",
    url: "https://resolvepay.com/blog/23-statistics-on-ach-vs-card-fees-in-high-ticket-b2b-transactions",
    type: "industry"
  },
  {
    name: "Ramp, ACH Processing Fees Explained: Costs & Comparisons",
    url: "https://ramp.com/blog/ach-processing-fees",
    type: "industry"
  },
  {
    name: "TechnologyAdvice, ACH Payment Processing: The Ultimate Guide for Businesses (2026)",
    url: "https://technologyadvice.com/blog/sales/ach-payment-processing-guide/",
    type: "industry"
  },
  {
    name: "Bottomline, 2026 Nacha Compliance: The Rules, the Risks, and How to Prepare",
    url: "https://www.bottomline.com/learning-center/2026-nacha-compliance-rules-risks-and-how-prepare",
    type: "industry"
  },
  {
    name: "Nacha, Summary of Upcoming Rule Changes",
    url: "https://www.nacha.org/content/summary-upcoming-rule-changes",
    type: "regulatory"
  },
  {
    name: "Nacha, Same Day ACH Per Payment Limit to Increase to $10 Million",
    url: "https://www.nacha.org/news/same-day-ach-payment-limit-increase-10-million",
    type: "regulatory"
  }
];

const faqs = [
  {
    question: "Is ACH cheaper than credit card processing?",
    answer: "For most transactions, yes, particularly larger ones. ACH fees are typically $0.25 to $1.50 per transaction or capped percentage fees, while card processing runs 2 to 3 percent of the transaction value, a gap that widens significantly as transaction size grows."
  },
  {
    question: "How long does an ACH payment take to settle?",
    answer: "Standard ACH settles in one to three business days. Same-Day ACH is available for time-sensitive transfers, though it may carry an additional fee depending on the processor."
  },
  {
    question: "Is ACH safe for business payments?",
    answer: "ACH fraud rates are very low, around 0.08 basis points, but unauthorized returns are handled under Nacha rules that require participants to keep unauthorized return rates below 0.5 percent, making account validation at setup important for maintaining compliance."
  },
  {
    question: "What businesses benefit most from ACH over cards?",
    answer: "B2B invoicing, subscription and SaaS billing, marketplace or platform payouts, and vendor payments between known, recurring parties see the clearest savings, since these involve either large transaction sizes or repeat counterparts where the flat ACH fee consistently beats a percentage-based card fee."
  },
  {
    question: "Can I offer both ACH and card payments to customers?",
    answer: "Yes, and most processors that support ACH also support card acceptance through the same integration, allowing a business to route large or recurring payments to ACH while keeping cards available for one-off or consumer checkout."
  }
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://chosepayments.com/ach-payment-processors#article",
      "headline": "ACH Payment Processors: When Bank Transfer Makes More Sense Than Cards",
      "description": "ACH costs cents, cards cost percent. Here is when ACH payment processing makes sense for B2B, SaaS, and marketplace payouts, and which processors do it well.",
      "url": "https://chosepayments.com/ach-payment-processors",
      "datePublished": "2026-07-22",
      "dateModified": "2026-07-22",
      "author": {
        "@type": "Organization",
        "name": "ChosePayments",
        "url": "https://chosepayments.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ChosePayments",
        "url": "https://chosepayments.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://chosepayments.com/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://chosepayments.com/ach-payment-processors"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://chosepayments.com/images/ach-payment-processors-cover.jpg",
        "width": 1200,
        "height": 630
      },
      "keywords": [
        "ach payment processors",
        "ach vs credit card fees",
        "ach payment processing for business",
        "best ach payment processor",
        "ach payment processing b2b",
        "same day ach limit"
      ],
      "articleSection": "Payment Processing"
    },
    {
      "@type": "FAQPage",
      "@id": "https://chosepayments.com/ach-payment-processors#faq",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://chosepayments.com/ach-payment-processors#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chosepayments.com" },
        { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://chosepayments.com/insights" },
        { "@type": "ListItem", "position": 3, "name": "ACH Payment Processors", "item": "https://chosepayments.com/ach-payment-processors" }
      ]
    }
  ]
};

const AchPaymentProcessors = () => {
  return (
    <InsightsArticleLayout
      title="ACH Payment Processors: When Bank Transfer Makes More Sense Than Cards"
      description="ACH costs cents, cards cost percent. Here is when ACH payment processing makes sense for B2B, SaaS, and marketplace payouts, and which processors do it well."
      category={{ name: "Fees & Costs", slug: "fees" }}
      cluster="pricing"
      currentSlug="ach-payment-processors"
      publishedTime="2026-07-22"
      modifiedTime="2026-07-22"
      keywords={[
        "ach payment processors",
        "ach vs credit card fees",
        "ach payment processing for business",
        "best ach payment processor",
        "ach payment processing b2b",
        "same day ach limit"
      ]}
      sources={sources}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        ACH Payment Processors: When Bank Transfer Makes More Sense Than Cards
      </h1>

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Card processing charges a percentage of every transaction. ACH charges a flat fee that barely moves regardless of transaction size. For a $30 order, that difference is trivial. For a $10,000 invoice, it is the difference between paying $250 in card fees and paying less than a dollar. Once your average transaction size climbs, the case for ACH stops being a minor optimization and starts being one of the more consequential decisions in how you accept payment.
      </p>

      <p className="text-muted-foreground mb-10 leading-relaxed">
        This is a practical breakdown of when ACH beats cards, what the trade-offs actually are, and which processors handle it well.
      </p>

      {/* What ACH Actually Is */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What ACH Actually Is
        </h2>
        <p className="text-muted-foreground mb-4">
          ACH (Automated Clearing House) moves money directly between bank accounts through the US banking network, rather than through the Visa or Mastercard rails that card payments use. There is no card number, no card network, and no interchange fee. Instead, a payment processor initiates a transfer that settles between banks, typically in one to three business days, though same-day options now exist for time-sensitive payments.
        </p>
        <p className="text-muted-foreground">
          Because ACH skips the card networks entirely, it also skips the fee structure built around them. That is the entire reason it is worth understanding: the cost model is fundamentally different, not just cheaper.
        </p>
      </section>

      {/* Cost Difference */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          The Cost Difference: Cents vs Percent
        </h2>
        <p className="text-muted-foreground mb-6">
          Credit card processing typically runs 2 to 3 percent of the transaction value, sometimes more for B2B interchange, which commonly falls between 1.5 and 3.5 percent ({" "}
          <a href="https://resolvepay.com/blog/23-statistics-on-ach-vs-card-fees-in-high-ticket-b2b-transactions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ResolvePay, ACH vs card fees in high-ticket B2B transactions</a>). ACH fees, by contrast, typically run $0.25 to $1.50 per transaction regardless of the amount moved, with many processors capping the fee outright.
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Transaction Size</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Card Fee (2.5% avg)</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Typical ACH Fee</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Savings</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">$100</td>
                <td className="py-3 px-3">$2.50</td>
                <td className="py-3 px-3">$0.25-$1.00</td>
                <td className="py-3 px-3">$1.50-$2.25</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">$1,000</td>
                <td className="py-3 px-3">$25.00</td>
                <td className="py-3 px-3">$0.25-$5.00</td>
                <td className="py-3 px-3">$20-$24.75</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">$10,000</td>
                <td className="py-3 px-3">$250.00</td>
                <td className="py-3 px-3">$0.25-$6.00 (capped)</td>
                <td className="py-3 px-3">$244-$249.75</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">$50,000</td>
                <td className="py-3 px-3">$1,250.00</td>
                <td className="py-3 px-3">$0.25-$6.00 (capped)</td>
                <td className="py-3 px-3">$1,244-$1,249.75</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground">
          The gap widens as the transaction size grows because card fees scale with volume while most ACH pricing is flat or capped. A $10,000 card sale at 2.5 percent costs $250 in fees; the equivalent ACH transfer commonly costs under $6 ({" "}
          <a href="https://ramp.com/blog/ach-processing-fees" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ramp, ACH processing fees explained</a>).
        </p>
      </section>

      {/* Where ACH Makes Sense */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Where ACH Makes the Most Sense
        </h2>

        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">B2B invoicing and high-ticket payments.</strong> Businesses processing large or frequent payments see the clearest savings, since ACH's flat-fee model doesn't scale with transaction size the way card fees do. Retail and manufacturing businesses paying large supplier invoices are a common example of where the switch pays off quickly.
        </p>

        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">SaaS and subscription billing.</strong> Recurring charges on established customer relationships are a natural fit for ACH, since the fraud risk on a known, recurring counterpart is lower than on a first-time card transaction, and the flat fee compounds in your favor across every billing cycle.
        </p>

        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Marketplace and platform payouts.</strong> Paying out sellers, drivers, or restaurant partners in bulk is exactly the use case ACH's flat-fee structure was built for: moving a large volume of payments where card network fees would erode margin on every single payout.
        </p>

        <p className="text-muted-foreground">
          <strong className="text-foreground">Vendor and payroll-adjacent payments.</strong> Any recurring, pre-authorized payment between known parties (rent, supplier payments, contractor payouts) tends to favor ACH over cards by default.
        </p>
      </section>

      {/* Trade-offs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          The Trade-offs: Speed and Risk
        </h2>
        <p className="text-muted-foreground mb-4">
          ACH is not free of downsides. Standard settlement takes one to three business days, materially slower than the near-instant authorization of a card transaction. For a business that needs funds available immediately, that lag is a real cost even if the fee is lower.
        </p>
        <p className="text-muted-foreground">
          Fraud risk is also different in kind, not just in degree. ACH fraud rates are low, roughly 0.08 basis points, meaning for every $10,000 sent, ACH sees about $0.08 in fraud ({" "}
          <a href="https://technologyadvice.com/blog/sales/ach-payment-processing-guide/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TechnologyAdvice, ACH payment processing ultimate guide</a>), but unauthorized ACH returns are handled differently than card chargebacks, with the Nacha network requiring participants to keep unauthorized return rates below a 0.5 percent threshold as a compliance requirement ({" "}
          <a href="https://www.bottomline.com/learning-center/2026-nacha-compliance-rules-risks-and-how-prepare" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bottomline, 2026 Nacha compliance</a>).
        </p>
      </section>

      {/* Same-Day ACH */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What Changed with Same-Day ACH in 2026
        </h2>
        <p className="text-muted-foreground">
          Same-Day ACH has expanded steadily since its introduction, with the per-payment limit raised from $1 million to $100,000 in 2020 and up to the current level in the years since. Nacha's most recent risk management rule package, effective June 2026, requires more robust monitoring of outgoing ACH entries specifically to combat fraud, and underwriters are now expected to review how merchants validate account identities before initiating transfers ({" "}
          <a href="https://www.nacha.org/content/summary-upcoming-rule-changes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Nacha, summary of upcoming rule changes</a>). If you are processing ACH at any real volume, account validation at the point of setup is no longer optional, it is becoming a compliance expectation.
        </p>
      </section>

      {/* Which processors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Which Processors Handle ACH Well
        </h2>
        <p className="text-muted-foreground mb-4">
          Pricing and structure vary meaningfully between providers. A few consistently come up for business use:
        </p>

        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">Stripe</strong> charges 0.8 percent per ACH transaction with a $5 cap, and its documentation and integration ecosystem make it a common default for platforms already using Stripe for cards. For more on how ACH-friendly processors differ from traditional card acquirers, see our guide to{" "}
          <Link to="/insights/merchant-acquirer-vs-payment-processor" className="text-primary hover:underline">the difference between a merchant acquirer and a payment processor</Link>.
        </p>

        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">Helcim</strong> prices ACH at 0.5 percent plus $0.25 per transaction, capped at $6, with no monthly or setup fees, which makes it competitive for small to mid-size businesses processing a steady volume of transfers.
        </p>

        <p className="text-muted-foreground mb-6">
          <strong className="text-foreground">PayPal</strong> charges roughly 0.8 percent plus additional processing fees for ACH, with verified business accounts able to process up to $60,000 per transaction, useful for businesses already inside the PayPal ecosystem.
        </p>

        <p className="text-muted-foreground">
          Rates and caps change, so confirm current pricing directly with any processor before committing, but the pattern holds across providers: ACH pricing is capped or flat, card pricing is not.
        </p>
      </section>

      {/* How to Decide */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How to Decide
        </h2>
        <p className="text-muted-foreground">
          Ask three questions before defaulting to cards for a given payment type: Is the transaction with a known, recurring counterpart rather than a first-time anonymous buyer? Is the transaction size large enough that a percentage-based fee meaningfully outweighs a flat fee? Can the business tolerate a one to three day settlement delay for this specific payment? If the answer to all three is yes, ACH is very likely the cheaper and often the more appropriate rail. For a fuller picture of what processors charge beyond the headline rate, see{" "}
          <Link to="/insights/hidden-payment-processor-fees" className="text-primary hover:underline">hidden payment processor fees to look for before you sign</Link>.
        </p>
      </section>

      {/* Key Takeaways */}
      <section className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Key Takeaways
        </h2>
        <p className="text-muted-foreground mb-4">
          ACH is not a replacement for card acceptance, most consumer-facing checkout still needs cards. But for B2B invoicing, subscription billing, marketplace payouts, and vendor payments, the flat-fee structure of ACH generates savings that scale with transaction size in exactly the way card fees do not. The trade-off is speed and a different fraud profile, both manageable with the account validation practices Nacha now expects, the same kind of aggregate-risk oversight that shapes how{" "}
          <Link to="/insights/third-party-payment-processors" className="text-primary hover:underline">third-party payment processors</Link>{" "}
          monitor every payment rail they support, not just ACH.
        </p>
        <p className="text-muted-foreground">
          Not sure which mix of ACH and card processing fits your payment flows?{" "}
          <Link to="/assessment" className="text-primary hover:underline font-medium">The free risk assessment</Link>{" "}
          maps your transaction types against processors that handle both well.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </InsightsArticleLayout>
  );
};

export default AchPaymentProcessors;
