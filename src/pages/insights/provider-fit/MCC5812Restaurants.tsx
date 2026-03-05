import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";

const MCC5812Restaurants = () => {
  const faqs = [
    {
      question: "What is MCC 5812?",
      answer: "MCC 5812 is the Merchant Category Code assigned to restaurants, eating places, and food delivery businesses. It tells card networks and acquirers what type of business is processing the transaction. Certain MCCs carry higher risk profiles, affecting reserve requirements and approval decisions."
    },
    {
      question: "Why do hospitality businesses trigger reserves?",
      answer: "Restaurants and food businesses often have thin margins, seasonal fluctuations, and high refund rates. Providers see these patterns as risk indicators and may impose rolling reserves to protect against potential losses from chargebacks or business failure."
    }
  ];

  return (
    <InsightsArticleLayout
      title="MCC 5812: Payment Gateways for UK Restaurants and Food Businesses"
      description="What MCC 5812 means for your restaurant or food business, why hospitality triggers reserves, and which payment processors support restaurant business models."
      category={{ name: "Provider Fit Guides", slug: "provider-fit" }}
      cluster="hub"
      currentSlug="mcc-5812-payment-gateway-uk"
      publishedTime="2026-03-05"
      keywords={["MCC 5812", "restaurant payment gateway", "food business payment processor", "hospitality merchant account", "restaurant payment provider UK"]}
    >
      <FAQSchema faqs={faqs} />

      <h1 className="heading-lg text-foreground mb-6">
        MCC 5812: Payment Gateways for UK Restaurants and Food Businesses
      </h1>

      <p className="text-lg text-muted-foreground mb-8">
        If you operate a restaurant, takeaway, or food business in the UK, your payment provider classifies you under MCC 5812. This code directly affects your processing rates, reserve requirements, and which providers will approve your application.
      </p>

      <h2 className="heading-md text-foreground mt-10 mb-4">What MCC 5812 Means</h2>
      <p className="text-muted-foreground mb-6">
        Merchant Category Codes are four-digit codes assigned by card networks to classify businesses. MCC 5812 covers eating places, restaurants, and food delivery operations. This code determines your interchange rate tier, your risk classification, and how acquirers evaluate your application. It is not something you choose — your provider assigns it based on your business description.
      </p>

      <h2 className="heading-md text-foreground mt-10 mb-4">Why Hospitality Businesses Trigger Reserves</h2>
      <p className="text-muted-foreground mb-4">
        Payment providers apply reserves to hospitality businesses more frequently than other sectors because of several structural factors:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-6">
        <li><strong className="text-foreground">Thin margins:</strong> Restaurants operate on 3-10% net margins, making providers nervous about financial stability.</li>
        <li><strong className="text-foreground">Seasonal volatility:</strong> Revenue can swing dramatically between seasons, triggering automated risk flags.</li>
        <li><strong className="text-foreground">High refund rates:</strong> Order cancellations, wrong deliveries, and customer complaints generate more refunds than typical retail.</li>
        <li><strong className="text-foreground">Cash flow dependency:</strong> Hospitality businesses rely heavily on daily settlement. Any processing interruption can cause cascading operational problems.</li>
      </ul>

      <h2 className="heading-md text-foreground mt-10 mb-4">Which Processors Support Restaurant Models</h2>
      <p className="text-muted-foreground mb-4">
        The right processor for a restaurant depends on whether you are a single-location business, a chain, or a delivery platform:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-muted-foreground mb-6">
        <li><strong className="text-foreground">Single-location restaurants</strong> typically work well with integrated POS providers like Fiserv/Clover or Square, which bundle hardware and processing.</li>
        <li><strong className="text-foreground">Multi-location chains</strong> benefit from enterprise acquirers like Adyen that offer unified commerce across in-store and online channels.</li>
        <li><strong className="text-foreground">Delivery platforms</strong> need marketplace payout capabilities and higher risk tolerance for refund patterns.</li>
      </ul>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 mt-10">
        <h3 className="font-semibold text-foreground mb-2">See which providers fit your food business</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Our engine evaluates MCC-specific risk signals to match you with the right processor.
        </p>
        <Link to="/assessment" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          Run My Risk Profile <span aria-hidden>→</span>
        </Link>
      </div>
    </InsightsArticleLayout>
  );
};

export default MCC5812Restaurants;
