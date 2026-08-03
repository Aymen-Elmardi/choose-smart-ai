'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQAccordion from "@/components/FAQAccordion";
import { Source } from "@/components/SourcesCitation";

const sources: Source[] = [
  {
    name: "Stripe, Payment Processors 101",
    url: "https://stripe.com/resources/more/payment-processors-101",
    type: "official"
  },
  {
    name: "Ramp, What Is a Payment Processor",
    url: "https://ramp.com/blog/what-is-a-payment-processor",
    type: "industry"
  },
  {
    name: "FreedomPay, Payment Gateway vs Payment Processor vs Merchant Acquirer",
    url: "https://corporate.freedompay.com/resources/blogs/payment-gateway-vs-payment-processor-vs-merchant-acquirer-understanding-and-choosing-the-right-payment-solutions",
    type: "industry"
  },
  {
    name: "Hyperswitch, Merchant Acquirer vs Payment Processors Explained",
    url: "https://hyperswitch.io/blog/merchant-acquirer-vs-payment-processors-explained",
    type: "industry"
  },
  {
    name: "GR4VY, Card Network vs Payment Processor: Essential Insights",
    url: "https://gr4vy.com/posts/card-network-vs-payment-processor-essential-insights/",
    type: "industry"
  },
  {
    name: "TSG, 2026 Directory Rankings",
    url: "https://tsgpayments.com/global-payments-tops-tsgs-2026-directory-rankings/",
    type: "industry"
  },
  {
    name: "CoinLaw, Visa Statistics 2026",
    url: "https://coinlaw.io/visa-statistics/",
    type: "industry"
  },
  {
    name: "CoinLaw, Global Payment Network Statistics 2026",
    url: "https://coinlaw.io/global-payment-network-statistics/",
    type: "industry"
  }
];

const faqs = [
  {
    question: "What does a payment processor actually do?",
    answer: "A payment processor captures transaction data, formats it into the message structure card networks require, routes the authorization request to the customer's issuing bank, and returns the approval or decline. It handles the technology and messaging layer of a transaction. It does not hold your funds and does not carry the financial risk of the transaction, that role belongs to the merchant acquirer."
  },
  {
    question: "Is a payment processor the same as a payment gateway?",
    answer: "No. The gateway is the checkout layer that captures and encrypts the customer's card data. The processor is the layer that takes that captured data and routes it through the card network to the issuing bank. Many providers, including Stripe and Adyen, offer both functions bundled into a single product, which is why the two terms often get used interchangeably even though they describe different jobs."
  },
  {
    question: "Is a payment processor the same as a merchant acquirer?",
    answer: "No. The processor moves transaction data. The merchant acquirer is the licensed financial institution that holds your merchant account, underwrites your business, settles the actual funds into your bank account, and carries the credit and chargeback risk. Aggregators like Stripe, Square, and PayPal perform both roles simultaneously, which is part of why their onboarding is fast but their account freezes can be abrupt."
  },
  {
    question: "How long does it take for a payment processor to settle funds?",
    answer: "Most processors settle funds to a merchant's bank account within one to three business days after a transaction is batched, though this depends on the acquirer behind the processor and the merchant's account history. New accounts, high-risk classifications, or accounts with elevated chargeback activity may be settled on a delayed schedule or have a portion held in reserve."
  },
  {
    question: "Why did my payment processor freeze my account?",
    answer: "Account freezes are almost always driven by risk monitoring at the acquirer level, not the processor's messaging layer. Common triggers include a spike in chargeback ratio, unusual transaction volume or geography, or a business model that the acquirer's automated risk system flags as elevated-risk regardless of individual account history. Aggregators tend to apply this monitoring more abruptly than traditional acquirers underwriting a dedicated merchant account."
  },
  {
    question: "What is the difference between a payment processor and a bank?",
    answer: "A bank, in this context, plays two possible roles: the issuing bank, which issued the customer's card and approves or declines the transaction, and the acquiring bank, which holds the merchant's account. A payment processor is neither. It is a technology intermediary that formats and routes the transaction between these financial institutions and the card networks. It typically does not hold a banking license itself, though some processors partner directly with banks or hold acquiring licenses of their own."
  },
  {
    question: "Do all payment processors charge the same fees?",
    answer: "No. Pricing structures vary significantly: flat-rate pricing (a single blended percentage plus a fixed fee, common with Stripe and Square), interchange-plus pricing (the actual interchange cost plus a fixed processor margin, common with Adyen and traditional acquirers), and tiered pricing (older, less transparent, still used by some legacy processors). The cheaper option depends heavily on transaction volume, average ticket size, and card mix."
  }
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://chosepayments.com/insights/what-is-a-payment-processor#article",
      "headline": "What Is a Payment Processor? How It Works and Why It Matters",
      "description": "A payment processor moves the transaction data between a merchant, the card networks, and the issuing bank. Here is exactly how that works, who the major players are, and why the choice matters more than the rate on the page.",
      "url": "https://chosepayments.com/insights/what-is-a-payment-processor",
      "datePublished": "2026-07-29",
      "dateModified": "2026-07-29",
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
        "@id": "https://chosepayments.com/insights/what-is-a-payment-processor"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://chosepayments.com/og-default.png",
        "width": 1200,
        "height": 630
      },
      "keywords": [
        "what is a payment processor",
        "what does a payment processor do",
        "how do payment processors work",
        "payment processor definition",
        "types of payment processors",
        "payment processor vs bank"
      ],
      "articleSection": "Payment Processing"
    },
    {
      "@type": "FAQPage",
      "@id": "https://chosepayments.com/insights/what-is-a-payment-processor#faq",
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
      "@id": "https://chosepayments.com/insights/what-is-a-payment-processor#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chosepayments.com" },
        { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://chosepayments.com/insights" },
        { "@type": "ListItem", "position": 3, "name": "What Is a Payment Processor", "item": "https://chosepayments.com/insights/what-is-a-payment-processor" }
      ]
    }
  ]
};

const WhatIsAPaymentProcessor = () => {
  return (
    <InsightsArticleLayout
      title="What Is a Payment Processor? How It Works and Why It Matters"
      description="A payment processor moves the transaction data between a merchant, the card networks, and the issuing bank. Here is exactly how that works, who the major players are, and why the choice matters more than the rate on the page."
      category={{ name: "Explainer", slug: "explainer" }}
      cluster="hub"
      currentSlug="what-is-a-payment-processor"
      publishedTime="2026-07-29"
      modifiedTime="2026-07-29"
      keywords={[
        "what is a payment processor",
        "what does a payment processor do",
        "how do payment processors work",
        "payment processor definition",
        "types of payment processors",
        "payment processor vs bank"
      ]}
      sources={sources}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        What Is a Payment Processor? How It Works and Why It Matters
      </h1>

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Every time a customer pays with a card, online or in person, a payment processor is the piece of infrastructure that makes the money move. Most business owners never think about it until something goes wrong: a transaction declines for no obvious reason, a payout is delayed, or an account gets frozen mid-growth. At that point, understanding what a payment processor actually does, and what it does not do, becomes suddenly important.
      </p>

      <p className="text-muted-foreground mb-10 leading-relaxed">
        This is a plain explanation of what a payment processor is, how it fits between your business and your customer's bank, who the major processors are, and why picking the right one is a bigger decision than most guides make it sound.
      </p>

      {/* What a Processor Does */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What a Payment Processor Actually Does
        </h2>
        <p className="text-muted-foreground mb-4">
          A payment processor is the technology service that transmits transaction data between a merchant, the card networks (Visa, Mastercard, American Express, Discover), and the customer's issuing bank. It does not hold your money. It does not decide whether your business is allowed to accept cards. Its job is narrower and more specific: capture the payment details, format them into the message structure the card networks expect, send that message down the chain, and return an approval or decline in under two seconds.
        </p>
        <p className="text-muted-foreground mb-4">
          Historically, that message format was{" "}
          <a href="https://gr4vy.com/posts/card-network-vs-payment-processor-essential-insights/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ISO 8583</a>, a decades-old messaging standard still used across most global card rails, with the newer ISO 20022 standard increasingly used for account-to-account and cross-border payments. The processor's core function is translating a checkout form or a card swipe into a message the rest of the payment system can read, and translating the response back into "approved" or "declined" on the merchant's screen.
        </p>
        <p className="text-muted-foreground">
          Stripe describes the processor's role as sitting "between merchants and financial institutions," handling authorization, clearing, and settlement of card transactions ({" "}
          <a href="https://stripe.com/resources/more/payment-processors-101" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe, Payment Processors 101</a>). That is an accurate summary of the mechanical function, but it undersells how much variation exists between processors in practice: fraud tooling, payout speed, API design, and industry risk appetite all differ enormously between providers that technically do the same job.
        </p>
      </section>

      {/* How a Transaction Moves */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How a Transaction Actually Moves
        </h2>
        <p className="text-muted-foreground mb-4">
          A typical card-not-present transaction, the kind that happens on an e-commerce checkout page or a food delivery app, moves through a fixed sequence:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
          <li>The customer enters card details (or taps a saved card, Apple Pay, or Google Pay)</li>
          <li>The payment gateway captures and tokenizes the card data</li>
          <li>The processor formats the authorization request and routes it through the acquiring bank's network connection to Visa or Mastercard</li>
          <li>The card network routes the request to the customer's issuing bank</li>
          <li>The issuing bank checks available balance or credit and runs its own fraud checks, then approves or declines</li>
          <li>The response travels back through the same chain: issuer to network to acquirer to processor to merchant</li>
          <li>The merchant sees "payment successful" or "payment declined," typically in one to three seconds</li>
          <li>At batch settlement, usually once a day, the processor submits all authorized transactions for clearing</li>
          <li>The card network nets interchange (the fee paid to the issuing bank) and settles funds to the acquiring bank</li>
          <li>
            The acquirer deducts its margin and deposits the remainder into the merchant's account, typically one to three business days later ({" "}
            <a href="https://ramp.com/blog/what-is-a-payment-processor" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ramp, What Is a Payment Processor</a>)
          </li>
        </ol>
        <p className="text-muted-foreground">
          The processor is directly responsible for steps 2, 3, and 6. The rest of the chain involves the card network, the issuing bank, and the merchant acquirer, each of which has a different job and a different relationship to your business.{" "}
          <Link to="/insights/merchant-acquirer-vs-payment-processor" className="text-primary hover:underline">Confusing the processor with the merchant acquirer</Link>{" "}
          is one of the most common misunderstandings business owners have, and it matters the moment a dispute or account freeze happens, because the acquirer, not the processor, is usually the party holding your funds.
        </p>
      </section>

      {/* Gateway vs Processor vs Acquirer */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Payment Processor vs Payment Gateway vs Merchant Acquirer
        </h2>
        <p className="text-muted-foreground mb-6">
          These three terms get used interchangeably in casual conversation, and the confusion is understandable because a single company (Stripe, Square, Adyen) often performs all three functions at once. But they are distinct roles:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Role</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">What It Does</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Who Holds the Risk</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Payment gateway</td>
                <td className="py-3 px-3">Captures and encrypts card data at checkout, presents payment options to the customer</td>
                <td className="py-3 px-3">No financial risk; a data capture layer</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Payment processor</td>
                <td className="py-3 px-3">Formats and routes the transaction message between gateway, card network, and issuer</td>
                <td className="py-3 px-3">No financial risk; a messaging and routing layer</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">Merchant acquirer</td>
                <td className="py-3 px-3">Holds the merchant account, underwrites the business, settles funds, absorbs chargeback risk</td>
                <td className="py-3 px-3">Full financial and credit risk</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-muted-foreground mb-4">
          FreedomPay frames the distinction cleanly: the gateway shapes how a transaction is captured, the processor moves the message, and the acquirer is the licensed financial institution that actually settles the money and carries the risk ({" "}
          <a href="https://corporate.freedompay.com/resources/blogs/payment-gateway-vs-payment-processor-vs-merchant-acquirer-understanding-and-choosing-the-right-payment-solutions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">FreedomPay, Payment Gateway vs Payment Processor vs Merchant Acquirer</a>). For a deeper breakdown of the gateway-versus-processor distinction specifically, see our{" "}
          <Link to="/payment-gateway-vs-payment-processor" className="text-primary hover:underline">full comparison of payment gateways and payment processors</Link>.
        </p>

        <p className="text-muted-foreground">
          When a single company like Stripe, Square, or PayPal performs all three roles, it is operating as a payment facilitator or aggregator: your business does not get its own merchant account, it becomes a sub-merchant under the aggregator's master account. That arrangement is why signup takes minutes instead of weeks, and it is also why aggregator account freezes can happen with less warning than a traditionally underwritten merchant account would allow.
        </p>
      </section>

      {/* Major Processors */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Who the Major Payment Processors Are
        </h2>
        <p className="text-muted-foreground mb-4">
          The US processing market is dominated by a small number of large players, each with a different origin and risk appetite:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li><strong className="text-foreground">Stripe</strong>: developer-first, API-driven, processes roughly $902.5 billion annually in the US as of 2026 ({" "}
            <a href="https://tsgpayments.com/global-payments-tops-tsgs-2026-directory-rankings/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TSG 2026 Directory</a>)
          </li>
          <li><strong className="text-foreground">Adyen</strong>: enterprise-focused, publicly traded on Euronext Amsterdam, built around interchange-plus pricing and a single global platform</li>
          <li><strong className="text-foreground">Square (Block)</strong>: strongest in in-person and small business retail</li>
          <li><strong className="text-foreground">PayPal</strong>: broad consumer reach, strong for checkout conversion via brand recognition</li>
          <li><strong className="text-foreground">Checkout.com</strong>: enterprise-focused, commercially flexible with negotiated rates for high-volume merchants</li>
          <li><strong className="text-foreground">Global Payments / Worldpay</strong>: the largest US processor by volume following the January 2026 completion of Global Payments' Worldpay acquisition from FIS, now handling over 20% of US payment volume</li>
          <li><strong className="text-foreground">Fiserv (Clover)</strong>: strong in traditional retail and restaurant point-of-sale</li>
        </ul>
        <p className="text-muted-foreground">
          For a closer look at how these providers actually compare, including architecture, risk appetite, and who each one fits, see our{" "}
          <Link to="/insights/providers" className="text-primary hover:underline">payment provider deep dives</Link>.
        </p>
      </section>

      {/* Why the infrastructure exists */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why Card Payments Need This Infrastructure at All
        </h2>
        <p className="text-muted-foreground mb-4">
          The reason this chain exists, rather than money moving directly from customer to merchant, is risk allocation. Visa alone processed an estimated $14.2 trillion in payments volume and 257.5 billion transactions in a recent year, an 8 to 10% year-over-year increase ({" "}
          <a href="https://coinlaw.io/visa-statistics/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CoinLaw, Visa Statistics 2026</a>). Mastercard processed roughly $10.6 trillion in the same period ({" "}
          <a href="https://coinlaw.io/global-payment-network-statistics/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CoinLaw, Global Payment Network Statistics</a>). At that scale, every participant in the chain, issuer, network, acquirer, and processor, needs a defined, auditable role, because fraud, disputes, and credit risk have to be allocated somewhere specific when something goes wrong.
        </p>
        <p className="text-muted-foreground">
          That is also why PCI DSS (Payment Card Industry Data Security Standard) compliance sits at the processor and gateway layer: the standard governs how card data is captured, transmitted, and stored, and a processor's PCI compliance is part of what a merchant is buying when they choose one over another.
        </p>
      </section>

      {/* Why choice matters more than rate */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why the Choice of Processor Matters More Than the Headline Rate
        </h2>
        <p className="text-muted-foreground mb-4">
          Most comparisons of payment processors start and end with the percentage fee. That is the least useful part of the decision for two reasons.
        </p>
        <p className="text-muted-foreground mb-4">
          First, headline rates are rarely the full cost. Monthly minimums, PCI compliance fees, chargeback fees, and early termination clauses are often not visible until a business is already signed up. See our{" "}
          <Link to="/insights/hidden-payment-processor-fees" className="text-primary hover:underline">full breakdown of hidden payment processor fees</Link>{" "}
          for what gets buried in processor contracts.
        </p>
        <p className="text-muted-foreground">
          Second, and more consequentially, a processor's risk appetite for your specific business model matters more than its rate once you scale past a basic retail profile. A business generating high chargeback volume, operating in a vertical flagged as high-risk, or running a marketplace model with sub-merchant payouts needs a processor (and, underneath it, an acquirer) that has actually underwritten that model before. Hyperswitch describes the acquirer as the party that "assumes credit and chargeback risk" ({" "}
          <a href="https://hyperswitch.io/blog/merchant-acquirer-vs-payment-processors-explained" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Hyperswitch, Merchant Acquirer vs Payment Processors Explained</a>), and mismatched risk profiles are the single most common reason accounts get frozen or terminated with little warning. See our guide on{" "}
          <Link to="/risk-alignment-payment-processor" className="text-primary hover:underline">risk alignment with payment processors</Link>{" "}
          for how that risk-matching actually works in practice.
        </p>
      </section>

      {/* MCC classification */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Payment Processors Assess Your Business
        </h2>
        <p className="text-muted-foreground">
          Every processor and acquirer assigns your business a Merchant Category Code (MCC) at signup, a four-digit classification that determines your baseline risk tier, interchange rate, and how closely your account gets monitored. A restaurant with online ordering gets classified differently than a general retailer, and a marketplace or subscription business gets scrutinized differently again. Understanding this classification step before you apply saves businesses from being declined or mis-priced later. See our guide to{" "}
          <Link to="/insights/payment-processor-business-vertical-classification" className="text-primary hover:underline">how payment processors classify your business vertical</Link>{" "}
          for the full mechanics of how that classification works.
        </p>
      </section>

      {/* Conclusion */}
      <section className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Conclusion
        </h2>
        <p className="text-muted-foreground mb-4">
          A payment processor is the messaging layer that moves your transaction data between your checkout, the card networks, and your customer's bank. It is not the same as the gateway that captures the card data, and it is not the same as the acquirer that holds your funds and your risk. Understanding the difference matters most at the two moments business owners usually get caught out: when comparing pricing across providers, and when an account gets frozen or a chargeback dispute goes wrong.
        </p>
        <p className="text-muted-foreground">
          Choosing the right processor is not a rate-shopping exercise. It is a matching exercise between your business model, your risk profile, and a provider that has actually built for your specific transaction pattern. If you are not sure which type of processor fits your business,{" "}
          <Link to="/assessment" className="text-primary hover:underline font-medium">the free risk assessment</Link>{" "}
          will give you a clear read on where your business sits before you sign anything.
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

export default WhatIsAPaymentProcessor;
