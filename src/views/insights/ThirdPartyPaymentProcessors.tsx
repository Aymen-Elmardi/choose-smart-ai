'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQAccordion from "@/components/FAQAccordion";
import { Source } from "@/components/SourcesCitation";

const sources: Source[] = [
  {
    name: "Stripe, Payfacs: A guide to payment facilitation",
    url: "https://stripe.com/guides/payfacs",
    type: "official"
  },
  {
    name: "Stripe, Payment processor vs. payment facilitator (payfac)",
    url: "https://stripe.com/resources/more/payment-processor-vs-payment-facilitator-how-they-are-different-and-how-to-choose-one",
    type: "official"
  },
  {
    name: "Visa, Payment Facilitator and Marketplace Risk Guide",
    url: "https://usa.visa.com/content/dam/VCOM/regional/na/us/partner-with-us/documents/visa-payment-facilitator-and-marketplace-risk-guide.pdf",
    type: "regulatory"
  },
  {
    name: "Helcim, Interchange Plus: Ultimate Guide",
    url: "https://www.helcim.com/guides/interchange-plus-pricing-explained/",
    type: "industry"
  },
  {
    name: "Swipesum, 6 Hidden Processing Fees to Watch Out For",
    url: "https://www.swipesum.com/insights/6-hidden-processing-fees-to-watch-out-for",
    type: "industry"
  },
  {
    name: "Mordor Intelligence, Payment Processor Market Size & Share Analysis",
    url: "https://www.mordorintelligence.com/industry-reports/payment-processor-market",
    type: "industry"
  },
  {
    name: "Forbes Advisor, What Is A Third-Party Payment Processor?",
    url: "https://www.forbes.com/advisor/business/third-party-payment-processor/",
    type: "industry"
  }
];

const faqs = [
  {
    question: "Is Stripe a third-party payment processor?",
    answer: "Yes. Stripe is a payment aggregator that operates as both processor and acquirer, holding a master merchant account under which every Stripe user is a sub-merchant. This is why Stripe accounts can go live in minutes rather than weeks."
  },
  {
    question: "What is the difference between a third-party processor and a payment facilitator?",
    answer: "A payment facilitator (PayFac) is a specific type of third-party processor built to onboard and pay out other businesses under its own umbrella, such as a marketplace paying sellers or a food platform paying restaurants. A standard third-party processor is built for a single business accepting payments for itself, not for redistributing funds to other parties."
  },
  {
    question: "Why do third-party processors freeze accounts without warning?",
    answer: "Because risk is monitored in aggregate across every sub-merchant sharing the master account, automated systems can flag legitimate volume spikes, geography changes, or transaction pattern shifts as risk signals. Holds typically run 5 to 10 percent of volume for 90 to 180 days, and because there is no individual underwriting relationship, the appeal process is often limited."
  },
  {
    question: "At what point should a business move off a third-party processor?",
    answer: "Most businesses see the pricing crossover point around $50,000 to $75,000 in monthly card volume, where interchange-plus pricing from a direct acquirer becomes cheaper than a flat aggregator rate. Businesses experiencing repeated holds or freezes may want to move sooner regardless of volume."
  },
  {
    question: "Do third-party processors work for marketplaces?",
    answer: "Yes, through a payment facilitator product specifically, such as Stripe Connect, Adyen for Platforms, or Braintree Marketplace. A standard third-party processor account is not built to split or forward funds to other parties, so marketplaces need the PayFac-specific version from the start."
  }
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://chosepayments.com/insights/third-party-payment-processors#article",
      "headline": "Third-Party Payment Processors Explained: What They Are and When They Make Sense",
      "description": "A third-party payment processor lets you accept cards without your own merchant account. Here is how they work, what they cost, and when to move on from one.",
      "url": "https://chosepayments.com/insights/third-party-payment-processors",
      "datePublished": "2026-07-21",
      "dateModified": "2026-07-21",
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
          "url": "https://chosepayments.com/favicon.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://chosepayments.com/insights/third-party-payment-processors"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://chosepayments.com/og-default.png",
        "width": 1200,
        "height": 630
      },
      "keywords": [
        "third party payment processors",
        "third party payment processor",
        "payment aggregator",
        "sub-merchant account",
        "payfac vs payment processor",
        "third party processing pros and cons",
        "master merchant account"
      ],
      "articleSection": "Payment Processing"
    },
    {
      "@type": "FAQPage",
      "@id": "https://chosepayments.com/insights/third-party-payment-processors#faq",
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
      "@id": "https://chosepayments.com/insights/third-party-payment-processors#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chosepayments.com" },
        { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://chosepayments.com/insights" },
        { "@type": "ListItem", "position": 3, "name": "Third-Party Payment Processors", "item": "https://chosepayments.com/insights/third-party-payment-processors" }
      ]
    }
  ]
};

const ThirdPartyPaymentProcessors = () => {
  return (
    <InsightsArticleLayout
      title="Third-Party Payment Processors Explained: What They Are and When They Make Sense"
      description="A third-party payment processor lets you accept cards without your own merchant account. Here is how they work, what they cost, and when to move on from one."
      category={{ name: "Explainer", slug: "explainer" }}
      cluster="hub"
      currentSlug="third-party-payment-processors"
      publishedTime="2026-07-21"
      modifiedTime="2026-07-21"
      keywords={[
        "third party payment processors",
        "third party payment processor",
        "payment aggregator",
        "sub-merchant account",
        "payfac vs payment processor",
        "third party processing pros and cons",
        "master merchant account"
      ]}
      sources={sources}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        Third-Party Payment Processors Explained: What They Are and When They Make Sense
      </h1>

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Most businesses that take their first card payment never apply for a merchant account. They sign up for Stripe, Square, or PayPal, enter a bank account number, and start processing within the hour. That speed is the entire product. It is also the reason a business owner can wake up one morning to find their account frozen with no phone number to call.
      </p>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        Both things are true at once, and understanding why is the difference between choosing a third-party processor because it is genuinely the right fit and choosing it because it was the only option you knew about.
      </p>

      <p className="text-muted-foreground mb-10 leading-relaxed">
        This is a practical breakdown of what a third-party payment processor actually does, how it differs from a direct merchant account, where it consistently causes problems for growing businesses, and how to know when it is time to move on from one.
      </p>

      {/* What it is */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What a Third-Party Payment Processor Actually Is
        </h2>
        <p className="text-muted-foreground mb-4">
          A third-party payment processor (sometimes called a payment aggregator or payment facilitator, or PayFac) lets your business accept card payments without opening your own merchant account with a bank. Instead, you operate as a sub-merchant under the processor's master merchant account. Stripe, Square, PayPal, and Braintree all work this way.
        </p>
        <p className="text-muted-foreground mb-4">
          The processor has already done the underwriting work with an acquiring bank at the aggregate level. When you sign up, you are not being individually underwritten in the traditional sense. You are being screened against an automated risk model and then folded into a pool of thousands of other businesses sharing the same master account.
        </p>
        <p className="text-muted-foreground">
          That structure is what makes onboarding fast. According to Stripe's own guide to payment facilitation, a PayFac model exists specifically to remove the weeks-long underwriting process a business would otherwise face with a traditional acquirer, replacing it with instant or near-instant approval ({" "}
          <a href="https://stripe.com/guides/payfacs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe, Payfacs: A guide to payment facilitation</a>). The trade-off for that speed is that risk is now managed collectively, not individually, and that changes how the relationship behaves once your business is live.
        </p>
      </section>

      {/* How it works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Third-Party Processing Actually Works
        </h2>
        <p className="text-muted-foreground mb-4">
          A transaction under a third-party processor moves through the same card network rails as any other payment, but your business is invisible to the acquiring bank as an individual entity. Here is the practical flow for an online order:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Your customer enters card details on your checkout page</li>
          <li>The processor's gateway tokenizes the card and sends an authorization request</li>
          <li>The request routes through the processor's own acquiring relationship (or a bank partner) to Visa or Mastercard</li>
          <li>The card network routes to the customer's issuing bank for approval or decline</li>
          <li>The response returns through the same chain, typically in under two seconds</li>
          <li>At settlement, funds move into the processor's master account first</li>
          <li>The processor allocates your share and deposits it into your bank account, usually on a one- to two-day rolling basis</li>
        </ol>
        <p className="text-muted-foreground">
          Your business never touches an acquiring bank directly. Every step of that chain is between the processor and the network. That is convenient until step six or seven gets interrupted, which is the part most new merchants never think about until it happens to them.
        </p>
      </section>

      {/* Comparison table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Third-Party Processing vs a Direct Merchant Account
        </h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground"></th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Third-Party Processor</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Direct Merchant Account</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Setup time</td>
                <td className="py-3 px-3">Minutes to same-day</td>
                <td className="py-3 px-3">Days to several weeks</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Underwriting</td>
                <td className="py-3 px-3">Automated, aggregate risk model</td>
                <td className="py-3 px-3">Individual, business-specific</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Pricing</td>
                <td className="py-3 px-3">Flat rate (e.g. 2.9% + $0.30)</td>
                <td className="py-3 px-3">Interchange-plus, negotiable</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Account stability</td>
                <td className="py-3 px-3">Risk-based holds/freezes possible</td>
                <td className="py-3 px-3">Formal review process before termination</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Dedicated support</td>
                <td className="py-3 px-3">Limited, ticket-based</td>
                <td className="py-3 px-3">Account manager in most cases</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">Best for</td>
                <td className="py-3 px-3">New, low-volume, or unpredictable-volume businesses</td>
                <td className="py-3 px-3">Established businesses with $50k+/month volume</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          The pricing gap matters more than most first-time business owners expect. Flat-rate pricing bakes in a blended average across every card type your business will ever see, including premium rewards cards with the highest interchange. Businesses with a lot of debit card volume, common in restaurant and food delivery transactions, end up subsidizing the rewards-card transactions of other merchants inside the same blended rate ({" "}
          <a href="https://www.helcim.com/guides/interchange-plus-pricing-explained/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Helcim, interchange-plus pricing guide</a>).
        </p>
      </section>

      {/* Aggregator squeeze */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Where Third-Party Processing Breaks Down for Growing Businesses
        </h2>
        <p className="text-muted-foreground mb-8">
          The failure mode is consistent enough that it has a name in the industry: the aggregator squeeze. It shows up in three specific ways.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          Sudden Holds and Freezes
        </h3>
        <p className="text-muted-foreground mb-8">
          Because risk is monitored in aggregate, a legitimate volume spike, a shift in average transaction size, or a change in customer geography can trip an automated fraud model even when nothing fraudulent is happening. A subscription software company or a fast-growing food ordering platform is especially exposed here because both experience the exact volume and geography changes that automated risk models are built to flag. When that happens, processors can hold 5 to 10 percent of processing volume for 90 to 180 days with limited immediate explanation, a pattern well documented across payment industry forums and merchant advisory firms alike ({" "}
          <a href="https://www.swipesum.com/insights/6-hidden-processing-fees-to-watch-out-for" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Swipesum, hidden processing fees and risk practices</a>).
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          Pricing That Stops Making Sense at Volume
        </h3>
        <p className="text-muted-foreground mb-8">
          The crossover point where interchange-plus pricing from a direct acquirer becomes cheaper than a flat-rate aggregator is typically around $50,000 to $75,000 in monthly card volume. Below that, the simplicity of a flat rate usually wins. Above it, a business is paying a real premium every month for a convenience it no longer needs.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          No Formal Recourse
        </h3>
        <p className="text-muted-foreground">
          Traditional acquirers operate under a contractual relationship with defined dispute and termination procedures. Aggregators can suspend accounts under their own terms of service, and because a business is one of thousands of sub-merchants, individual escalation paths are limited. This is not a flaw specific to any one processor. It is a structural consequence of the sub-merchant model itself.
        </p>
      </section>

      {/* Marketplaces and platforms */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Third-Party Processing for Marketplaces and Platforms
        </h2>
        <p className="text-muted-foreground mb-4">
          This is where the distinction between a payment processor and a payment facilitator actually matters in practice, and it is where most explainers stop short.
        </p>
        <p className="text-muted-foreground mb-4">
          A payment facilitator (like Stripe Connect or Adyen for Platforms) is a specific type of third-party processor built for businesses that need to accept and then redistribute funds to other parties, such as a food ordering platform paying out restaurants, or a marketplace paying out individual sellers. The PayFac model lets the platform onboard its own sub-merchants under its umbrella, rather than sending every restaurant or seller to open an individual merchant account.
        </p>
        <p className="text-muted-foreground mb-4">
          This is functionally different from a marketplace operating model, and the two get confused constantly. Visa's own risk guidance for payment facilitators and marketplaces draws the distinction on the basis of who holds settlement responsibility and who carries KYC obligations for the underlying sub-merchants ({" "}
          <a href="https://usa.visa.com/content/dam/VCOM/regional/na/us/partner-with-us/documents/visa-payment-facilitator-and-marketplace-risk-guide.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visa, Payment Facilitator and Marketplace Risk Guide</a>). Get this wrong at the architecture stage and a platform can end up non-compliant with card network rules well before it has any indication something is wrong.
        </p>
        <p className="text-muted-foreground">
          For classification purposes, marketplaces that handle multiple, unrelated lines of business are typically assigned MCC 5262, a category built specifically because a marketplace's transaction mix does not fit neatly under any single merchant category code. A restaurant delivery platform, by contrast, is usually classified under a single MCC tied to its dominant business line, which carries its own interchange and risk implications. See our guide to{" "}
          <Link to="/insights/payment-processor-business-vertical-classification" className="text-primary hover:underline">how payment processors classify your business vertical</Link>{" "}
          for the full mechanics.
        </p>
      </section>

      {/* How to decide */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How to Decide Between Third-Party and Direct Processing
        </h2>
        <p className="text-muted-foreground mb-4">
          Three questions determine the right answer for most businesses:
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">What is your monthly card volume?</strong> Below roughly $50,000 a month, the operational simplicity of a third-party processor usually outweighs the pricing gap. Above that, run the numbers on interchange-plus.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">How predictable is your transaction pattern?</strong> A business with steady, familiar volume rarely trips risk models. A business with seasonal spikes, rapid growth, or high average transaction values is more exposed to holds under an aggregate risk model, regardless of how legitimate the business is.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">Do you need to pay out other parties?</strong> If your business model involves splitting or forwarding funds to restaurants, sellers, or contractors, you need a payment facilitator architecture from day one, not a standard third-party processor bolted on later. Retrofitting this after launch is a much harder engineering and compliance problem than building it in from the start. Our{" "}
          <Link to="/insights/marketplace-payments-guide" className="text-primary hover:underline">marketplace founder's guide to payment processing</Link>{" "}
          covers this in more depth.
        </p>
      </section>

      {/* Comparison table 2 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          The Major Third-Party Processors Compared
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Processor</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Model</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Standard US Rate</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Notable For</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Stripe</td>
                <td className="py-3 px-3">Processor + PayFac (Connect)</td>
                <td className="py-3 px-3">2.9% + $0.30</td>
                <td className="py-3 px-3">Developer-first API, strong platform/marketplace tooling</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">PayPal</td>
                <td className="py-3 px-3">Processor + acquirer</td>
                <td className="py-3 px-3">3.49% + $0.49 (varies by product)</td>
                <td className="py-3 px-3">Consumer trust, high buyer-side adoption</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Square</td>
                <td className="py-3 px-3">Processor + acquirer</td>
                <td className="py-3 px-3">2.6% + $0.10 (in-person)</td>
                <td className="py-3 px-3">Point-of-sale and small retail/restaurant hardware</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Braintree</td>
                <td className="py-3 px-3">Processor + PayFac (owned by PayPal)</td>
                <td className="py-3 px-3">2.59% + $0.49</td>
                <td className="py-3 px-3">Marketplace split payments, subscription billing</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">Adyen</td>
                <td className="py-3 px-3">Processor + acquirer + PayFac (for Platforms)</td>
                <td className="py-3 px-3">Interchange-plus, custom</td>
                <td className="py-3 px-3">Enterprise volume, global card coverage</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted-foreground italic">
          Rates change often and vary by industry, so treat this as a starting point for a conversation with each provider rather than a final number.
        </p>
      </section>

      {/* Key Takeaways */}
      <section className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Key Takeaways
        </h2>
        <p className="text-muted-foreground mb-4">
          A third-party payment processor is the right starting point for almost every new business, and it stays the right choice for a large share of them permanently. The problem is never the model itself. It is staying on it past the point where your volume, growth pattern, or payout structure has outgrown what an aggregate risk model and a flat rate were built to handle.
        </p>
        <p className="text-muted-foreground mb-4">
          If your business pays out to other parties, get the payment facilitator architecture right from the start. If your monthly volume is approaching $50,000 or more, it is worth running the actual numbers on interchange-plus pricing rather than assuming the switch isn't worth the effort. See our{" "}
          <Link to="/insights/hidden-payment-processor-fees" className="text-primary hover:underline">full breakdown of hidden payment processor fees</Link>{" "}
          for what to check before you sign.
        </p>
        <p className="text-muted-foreground">
          Not sure whether your business has outgrown its current processor, or whether a marketplace payout structure needs a payment facilitator instead of a standard setup?{" "}
          <Link to="/assessment" className="text-primary hover:underline font-medium">Run the free risk assessment</Link>{" "}
          and get matched to a processor built for how your business actually operates.
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

export default ThirdPartyPaymentProcessors;
