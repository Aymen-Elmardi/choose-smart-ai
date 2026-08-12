'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQAccordion from "@/components/FAQAccordion";
import { Source } from "@/components/SourcesCitation";

const sources: Source[] = [
  {
    name: "Stripe, Payment processor vs. payment gateway",
    url: "https://stripe.com/resources/more/payment-processor-vs-payment-gateway",
    type: "official"
  },
  {
    name: "FreedomPay, Payment Gateway vs. Processor vs. Acquirer: Key Differences Explained",
    url: "https://corporate.freedompay.com/resources/blogs/payment-gateway-vs-payment-processor-vs-merchant-acquirer-understanding-and-choosing-the-right-payment-solutions",
    type: "industry"
  },
  {
    name: "Shopify, Payment Gateway Integration: A Strategic Guide for 2026",
    url: "https://www.shopify.com/ca/blog/payment-gateway-integration",
    type: "industry"
  },
  {
    name: "Corefy, Best Payment Gateway APIs in 2026",
    url: "https://corefy.com/blog/best-payment-gateway-api",
    type: "industry"
  },
  {
    name: "Coastal Pay, Best Payment Methods to Increase E-Commerce Checkout Conversion in 2026",
    url: "https://www.coastalpay.com/best-payment-methods-to-increase-e-commerce-checkout-conversion-in-2026/",
    type: "industry"
  },
  {
    name: "Forbes Advisor, Payment Gateway vs. Payment Processor: What's the Difference?",
    url: "https://www.forbes.com/advisor/business/payment-gateway-vs-payment-processor/",
    type: "industry"
  },
  {
    name: "NerdWallet, Payment Gateway vs. Payment Processor: The Difference",
    url: "https://www.nerdwallet.com/business/software/learn/payment-gateway-vs-payment-processor",
    type: "industry"
  }
];

const faqs = [
  {
    question: "Is Stripe a payment gateway or a payment processor?",
    answer: "Both. Stripe bundles gateway functionality (capturing and tokenizing card data at checkout) with processor functionality (routing authorization requests and settling funds) into a single product, which is why most merchants never need to think about the two as separate."
  },
  {
    question: "Can I use a different gateway and processor from different companies?",
    answer: "Yes, and larger businesses often do, particularly if they have a direct acquiring relationship and want to choose a gateway independently for technical or checkout-experience reasons. Smaller businesses generally use an all-in-one provider because it is faster to set up and easier to manage."
  },
  {
    question: "Why does my payment fail even though the gateway says the card is valid?",
    answer: "The gateway can confirm the card data is correctly formatted and captured, but it does not decide whether the transaction is approved. That decision happens at the processor and issuing bank level, based on available credit, fraud signals, and the issuing bank's own rules, which is why a technically valid card can still be declined after the gateway successfully captures it."
  },
  {
    question: "Does the gateway or the processor handle PCI compliance?",
    answer: "Both play a role. The gateway typically reduces your PCI scope by tokenizing card data immediately, so raw card numbers never touch your servers. The processor separately maintains its own PCI DSS compliance for how it handles and transmits transaction data across the rest of the chain."
  },
  {
    question: "Do I need a different type of gateway if I'm building a marketplace or platform?",
    answer: "Yes. Standard checkout gateways are built for a single merchant collecting payment for itself. A marketplace or platform paying out to multiple sub-merchants needs a purpose-built product like Stripe Connect or Adyen for Platforms that supports split payments and sub-merchant compliance from the start."
  }
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://chosepayments.com/payment-gateway-vs-payment-processor#article",
      "headline": "Payment Gateway vs Payment Processor: The Actual Difference",
      "description": "A payment gateway captures and encrypts card data. A payment processor authorizes the transaction and moves the money. Here is what that split actually means when you're building a checkout.",
      "url": "https://chosepayments.com/payment-gateway-vs-payment-processor",
      "datePublished": "2026-07-23",
      "dateModified": "2026-07-23",
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
        "@id": "https://chosepayments.com/payment-gateway-vs-payment-processor"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://chosepayments.com/images/payment-gateway-vs-payment-processor-cover.jpg",
        "width": 1200,
        "height": 630
      },
      "keywords": [
        "payment gateway vs payment processor",
        "payment processor vs payment gateway",
        "what is a payment gateway",
        "what is a payment processor",
        "payment gateway API",
        "ecommerce payment gateway",
        "gateway vs processor"
      ],
      "articleSection": "Payment Processing"
    },
    {
      "@type": "FAQPage",
      "@id": "https://chosepayments.com/payment-gateway-vs-payment-processor#faq",
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
      "@id": "https://chosepayments.com/payment-gateway-vs-payment-processor#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chosepayments.com" },
        { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://chosepayments.com/insights" },
        { "@type": "ListItem", "position": 3, "name": "Payment Gateway vs Payment Processor", "item": "https://chosepayments.com/payment-gateway-vs-payment-processor" }
      ]
    }
  ]
};

const PaymentGatewayVsPaymentProcessor = () => {
  return (
    <InsightsArticleLayout
      title="Payment Gateway vs Payment Processor: The Actual Difference"
      description="A payment gateway captures and encrypts card data. A payment processor authorizes the transaction and moves the money. Here is what that split actually means when you're building a checkout."
      category={{ name: "Explainer", slug: "explainer" }}
      cluster="hub"
      currentSlug="payment-gateway-vs-payment-processor"
      publishedTime="2026-07-23"
      modifiedTime="2026-07-23"
      keywords={[
        "payment gateway vs payment processor",
        "payment processor vs payment gateway",
        "what is a payment gateway",
        "what is a payment processor",
        "payment gateway API",
        "ecommerce payment gateway",
        "gateway vs processor"
      ]}
      sources={sources}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        Payment Gateway vs Payment Processor: The Actual Difference
      </h1>

      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
        Ask three vendors what they sell and you will get three different answers to the same question. One calls itself a payment gateway. Another calls itself a payment processor. A third calls itself both. The confusion is not accidental: many providers, including Stripe and Square, sell both functions bundled into a single product, so the distinction disappears from the sales pitch even though it still matters technically and, for some businesses, financially.
      </p>

      <p className="text-muted-foreground mb-10 leading-relaxed">
        This is a practical explanation of what each layer actually does, using the lens of what a food ordering platform, restaurant group, or e-commerce store experiences when they are actually choosing between providers, not a diagram of abstract data flow.
      </p>

      {/* The Short Answer */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          The Short Answer
        </h2>
        <p className="text-muted-foreground mb-4">
          A payment gateway is the customer-facing layer. It captures card details at checkout, encrypts them, and passes them along for authorization. A payment processor is the back-end layer. It takes that authorization request, routes it through the card networks to the customer's bank, and manages the transfer of funds ({" "}
          <a href="https://stripe.com/resources/more/payment-processor-vs-payment-gateway" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Stripe, payment processor vs payment gateway</a>). The gateway hands off the data. The processor decides whether the money moves and makes sure it actually does.
        </p>
        <p className="text-muted-foreground">
          Most modern providers sell both under one contract, which is why the terms get used interchangeably in casual conversation. The distinction still matters when you are evaluating vendors, debugging a declined transaction, or deciding whether to use different providers for different parts of your payment stack.
        </p>
      </section>

      {/* What a Gateway Does */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What a Payment Gateway Actually Does
        </h2>
        <p className="text-muted-foreground mb-8">
          The gateway is the piece your customer's browser or app actually talks to. When someone enters their card number on your checkout page, the gateway captures that data, encrypts it immediately, and either tokenizes it (replacing the raw card number with a reference token so your servers never store sensitive card data) or forwards it directly for authorization.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          Hosted vs API-Based Gateways
        </h3>
        <p className="text-muted-foreground mb-4">
          A hosted gateway redirects the customer to a page controlled by the gateway provider to enter payment details, then redirects them back once the transaction completes. It is faster to implement and shifts most of the PCI compliance burden onto the gateway provider. A self-hosted or API-based gateway keeps the customer on your own checkout page throughout, giving you full control over branding and user experience, but it means more of your own infrastructure sits inside PCI scope, and self-hosted checkouts generally convert faster because the customer never leaves the page ({" "}
          <a href="https://www.shopify.com/ca/blog/payment-gateway-integration" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shopify, payment gateway integration strategic guide</a>).
        </p>
        <p className="text-muted-foreground mb-8">
          For a food ordering platform building a native checkout inside its app, API-based is usually the right call, because a redirect mid-order on a mobile app creates exactly the kind of friction that kills conversion. For a smaller restaurant group running a simple online ordering page, a hosted gateway is often the faster, cheaper path to launch.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          What the Gateway Does Not Do
        </h3>
        <p className="text-muted-foreground">
          A gateway does not decide whether a transaction is approved. It does not hold funds. It does not manage your relationship with a card network or a bank. Its job ends once the payment data has been securely captured and handed off.
        </p>
      </section>

      {/* What a Processor Does */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What a Payment Processor Actually Does
        </h2>
        <p className="text-muted-foreground mb-8">
          The processor is the layer that turns a captured card number into an actual decision and, eventually, actual money in your bank account.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          Authorization Routing
        </h3>
        <p className="text-muted-foreground mb-8">
          Once the gateway hands off the transaction, the processor formats it into the messaging standard used by card networks, sends it through to Visa or Mastercard, who route it to the customer's issuing bank for approval or decline. This round trip typically completes in under two seconds.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          Fraud Tooling and Compliance
        </h3>
        <p className="text-muted-foreground mb-8">
          Processors run real-time fraud scoring on every transaction (Stripe's Radar and Adyen's equivalent tools are processor-layer functions), handle PCI DSS compliance obligations tied to the transaction itself, and implement 3D Secure authentication for card-not-present payments where required. Fraud prevention and compliance tooling live at the processor layer, not the gateway layer, even though the two are often marketed together.
        </p>

        <h3 className="text-xl font-semibold text-foreground mb-3">
          Settlement
        </h3>
        <p className="text-muted-foreground">
          After a transaction is authorized, the processor batches it with other approved transactions and initiates settlement, typically landing funds in your bank account one to two business days later, minus interchange, network fees, and the processor's own margin.
        </p>
      </section>

      {/* How They Work Together */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How They Work Together in a Real Transaction
        </h2>
        <p className="text-muted-foreground mb-4">
          For a typical online order, in this example a customer ordering food through a delivery app, the sequence looks like this:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
          <li>The customer enters card details in the app's checkout</li>
          <li>The gateway captures and encrypts the data, tokenizing it before it ever touches the platform's own servers</li>
          <li>The gateway sends an authorization request to the processor</li>
          <li>The processor routes the request through the card network to the customer's issuing bank</li>
          <li>The issuing bank approves or declines based on available credit and fraud signals</li>
          <li>The response returns through the same chain: bank to network to processor to gateway to app</li>
          <li>The customer sees "Order confirmed" within one to two seconds</li>
          <li>At batch settlement, the processor submits all authorized transactions for the day</li>
          <li>Funds settle to the platform's account, typically one to two business days later, net of fees</li>
        </ol>
        <p className="text-muted-foreground">
          The gateway owns steps one, two, three, and the customer-facing part of step seven. The processor owns everything else. Both are present in every single transaction, whether or not the business ever thinks about them as separate.
        </p>
      </section>

      {/* Why it matters for platforms */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why This Distinction Matters for a Food Ordering Platform or Marketplace
        </h2>
        <p className="text-muted-foreground mb-4">
          For a platform routing payouts to individual restaurants rather than collecting payment for itself, the gateway and processor questions compound. The platform needs a gateway that can handle a checkout experience embedded in someone else's app or website, and a processor built for split payments, meaning it can hold funds temporarily and disburse a portion to the platform and a portion to the restaurant on each order, with correct tax and compliance handling for every sub-merchant. This is a fundamentally different technical requirement than a single merchant taking payment for itself, and it is why marketplace-specific tools like Stripe Connect, Adyen for Platforms, and Braintree Marketplace exist as distinct products from their standard checkout offerings.
        </p>
        <p className="text-muted-foreground mb-4">
          Getting this wrong at the platform level is expensive to unwind later. A platform that launches on a standard single-merchant processor and later needs to add restaurant payouts often has to rebuild its entire payment integration from scratch. Understanding how processors classify different business models by risk and structure before you build is worth doing early, as covered in our guide to{" "}
          <Link to="/insights/payment-processor-business-vertical-classification" className="text-primary hover:underline">how payment processors classify your business vertical</Link>.
        </p>
        <p className="text-muted-foreground">
          It is also worth understanding how the processor relates to the merchant acquirer, the institution that actually holds the underlying merchant account and carries the financial risk, since that is a separate relationship again from both the gateway and the processor. Our guide on{" "}
          <Link to="/insights/merchant-acquirer-vs-payment-processor" className="text-primary hover:underline">merchant acquirer vs payment processor</Link>{" "}
          covers that distinction in full.
        </p>
      </section>

      {/* When to choose separately */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          When You Need to Choose Them Separately vs When One Company Does Both
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Scenario</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Recommended Approach</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Why</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Small business, standard checkout, fast launch</td>
                <td className="py-3 px-3">All-in-one provider (Stripe, Square)</td>
                <td className="py-3 px-3">Gateway and processor bundled, minutes to set up, no separate contracts</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">High-volume enterprise with existing acquirer relationship</td>
                <td className="py-3 px-3">Separate gateway and processor</td>
                <td className="py-3 px-3">Interchange-plus pricing through a direct acquirer, gateway chosen independently for technical fit</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Marketplace or platform with sub-merchant payouts</td>
                <td className="py-3 px-3">Purpose-built platform product (Stripe Connect, Adyen for Platforms)</td>
                <td className="py-3 px-3">Standard bundled checkout products do not support split payments or sub-merchant onboarding</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">International or multi-currency business</td>
                <td className="py-3 px-3">Gateway with strong multi-currency support, processor evaluated separately for settlement speed by region</td>
                <td className="py-3 px-3">Not every processor settles every currency at the same speed or cost</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          Global ecommerce sales are projected to reach $3.88 trillion in 2026, and the payment gateway market alone is projected to grow from roughly $34.5 billion to $90.3 billion by 2034, which reflects how much specialization is happening at the gateway layer specifically as checkout experience becomes a competitive differentiator in its own right ({" "}
          <a href="https://corefy.com/blog/best-payment-gateway-api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Corefy, best payment gateway APIs in 2026</a>).
        </p>
      </section>

      {/* Common mistakes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Common Mistakes When Evaluating "Payment Processors" That Are Actually Gateways
        </h2>
        <p className="text-muted-foreground mb-4">
          A recurring problem: a business shops for a "payment processor," gets pitched by a sales rep whose product is technically a gateway reselling processing from a separate back-end provider, and signs a contract without understanding that a third party actually holds the financial risk and sets the real terms. This matters because contractual protections, dispute handling, and account stability ultimately trace back to whoever is acting as processor and acquirer, not whoever built the checkout page.
        </p>
        <p className="text-muted-foreground mb-4">
          Before signing with any provider, ask directly: who processes the transaction once it leaves your checkout, and who actually holds the merchant account? If the sales rep cannot answer clearly, that is worth treating as a warning sign rather than a technicality.
        </p>
        <p className="text-muted-foreground">
          Not enough payment methods offered at checkout accounts for roughly 10% of cart abandonment, and sites offering digital wallets like Apple Pay see two to three times higher mobile conversion than standard card entry ({" "}
          <a href="https://www.coastalpay.com/best-payment-methods-to-increase-e-commerce-checkout-conversion-in-2026/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Coastal Pay, best payment methods to increase checkout conversion</a>). Confirm the gateway supports the payment methods your specific customers actually use before evaluating processor pricing at all, since a technically cheaper processor behind a gateway that cannot offer Apple Pay or the wallet your customers prefer is a net loss.
        </p>
      </section>

      {/* Bottom Line */}
      <section className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          The Bottom Line
        </h2>
        <p className="text-muted-foreground mb-4">
          The gateway captures and moves the data. The processor decides whether the money moves and gets it into your account. Most businesses will use a single provider that bundles both, and that is a perfectly reasonable choice for most standard use cases. What matters is knowing which layer you are actually evaluating when a sales rep describes their product, so you are comparing gateway features to gateway features and processor risk terms to processor risk terms, rather than treating every vendor conversation as the same decision. Our guide on{" "}
          <Link to="/insights/how-to-choose-a-payment-processor" className="text-primary hover:underline">how to choose a payment processor</Link>{" "}
          walks through that comparison in more depth.
        </p>
        <p className="text-muted-foreground">
          If you are not sure whether your current setup, or a provider you are evaluating, actually fits how your business processes payments,{" "}
          <Link to="/assessment" className="text-primary hover:underline font-medium">the free risk assessment</Link>{" "}
          compares your transaction profile against processors and gateways that have already been matched to businesses like yours.
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

export default PaymentGatewayVsPaymentProcessor;
