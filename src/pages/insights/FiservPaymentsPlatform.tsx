import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import { Source } from "@/components/SourcesCitation";
import { Shield, Globe, Building2, Zap, CreditCard, BarChart3, CheckCircle, AlertTriangle } from "lucide-react";

const fiservSources: Source[] = [
  {
    name: "Fiserv Official Website",
    url: "https://www.fiserv.com",
    type: "official"
  },
  {
    name: "Fiserv Merchant Services Overview",
    url: "https://www.fiserv.com/en/solutions/merchant-acquiring-and-processing.html",
    type: "official"
  },
  {
    name: "Clover POS by Fiserv",
    url: "https://www.clover.com",
    type: "official"
  },
  {
    name: "Fiserv First Data Acquisition",
    url: "https://en.wikipedia.org/wiki/Fiserv",
    type: "educational"
  }
];

const FiservPaymentsPlatform = () => {
  const coreServices = [
    {
      name: "Global Acquiring and Gateway",
      icon: Globe,
      description: "Card processing, settlement, reconciliation, and chargeback handling delivered directly or through banking and reseller partners."
    },
    {
      name: "Clover Point-of-Sale",
      icon: CreditCard,
      description: "Widely used by small and mid-sized businesses in retail and hospitality, often bundled through banks or ISOs."
    },
    {
      name: "Enterprise Infrastructure",
      icon: Building2,
      description: "Issuer connectivity, tokenisation, fraud tooling, and large-scale integrations for banks, fintechs, and high-volume merchants."
    }
  ];

  const strengthsItems = [
    {
      title: "Scale and reliability",
      description: "Built for volume. For businesses processing large transaction counts, operating across regions, or requiring stable settlement at scale, its infrastructure is proven and resilient."
    },
    {
      title: "Vendor consolidation",
      description: "POS, acquiring, settlement, reporting, and chargeback tooling can be handled within one ecosystem, reducing integration and vendor management overhead."
    },
    {
      title: "Bank and issuer connectivity",
      description: "Businesses with complex payment flows, stored credentials, or recurring billing benefit from deep issuer relationships and mature tokenisation and fraud tooling."
    },
    {
      title: "Packaged vertical solutions",
      description: "Frequently bundled into industry-specific offerings for retail, hospitality, and franchises through its reseller network."
    }
  ];

  const cautionItems = [
    {
      title: "Pricing opacity",
      description: "The same underlying services can be priced very differently depending on the reseller, contract structure, and negotiation. Without a full line-item breakdown, it is difficult to benchmark costs accurately."
    },
    {
      title: "Not optimised for very small merchants",
      description: "Single-location businesses that prioritise low friction, simple onboarding, and clear month-to-month pricing often find newer payment providers easier to work with."
    },
    {
      title: "Product complexity",
      description: "The 'everything under one roof' approach works well at scale, but introduces dependencies. A more focused provider may be simpler and cheaper for lightweight gateway needs."
    },
    {
      title: "Slower change cycles",
      description: "Product changes and custom integrations tend to move more slowly than with cloud-native providers. Factor this in if you need rapid iteration or experimental payment flows."
    }
  ];

  return (
    <InsightsArticleLayout
      title="Fiserv and the First Data Legacy: Who It Actually Fits, and Where It Doesn't"
      description="Fiserv operates across acquiring, issuing, bank infrastructure, and Clover POS. Learn where it performs well, where friction appears, and which business profiles benefit most."
      category={{ name: "Provider Deep Dive", slug: "providers" }}
      cluster="provider"
      currentSlug="fiserv-payments-platform"
      publishedTime="2026-02-02"
      keywords={["fiserv", "first data", "fiserv first data", "first data payment processing", "first data services", "first data platforms", "first data systems", "what is first data payment gateway", "clover", "enterprise", "acquiring", "POS", "merchant services"]}
      sources={fiservSources}
    >
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          Fiserv and the First Data Legacy: Who It Actually Fits, and Where It Doesn't
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Fiserv sits very high up the payments stack. It is not just a payment processor. It operates across acquiring, issuing technology, bank infrastructure, and point-of-sale through Clover. When Fiserv acquired First Data in 2019, it absorbed one of the largest global merchant acquirers into an already bank-centric technology business. Today, Fiserv First Data represents one of the largest first data payment processing networks in the world.
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-12">
        <p className="text-lg text-muted-foreground mb-6">
          On paper, that creates a single organisation capable of handling issuing, acquiring, terminals, reconciliation, and settlement at scale.
        </p>
        <p className="text-lg text-muted-foreground">
          In practice, whether that is a strength or a liability depends heavily on the type of business you are running. This guide explains what Fiserv actually offers today, where it performs well, where friction tends to appear, and which business profiles usually benefit from choosing it.
        </p>
      </section>

      {/* What Fiserv Provides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          What Fiserv Actually Provides
        </h2>
        <p className="text-muted-foreground mb-6">
          At a high level, Fiserv's merchant-facing services fall into three broad areas:
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {coreServices.map((service) => (
            <div key={service.name} className="bg-muted/50 rounded-lg p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <service.icon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{service.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground">
          The appeal is obvious: one provider can cover a large portion of the payment lifecycle. The trade-off is complexity, especially because pricing, contracts, and support often depend on which reseller or banking partner you sign through rather than a single standardised commercial model.
        </p>
      </section>

      {/* Where Fiserv Performs Well */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-primary" />
          Where Fiserv Tends to Perform Well
        </h2>
        
        <div className="space-y-6">
          {strengthsItems.map((item) => (
            <div key={item.title} className="border-l-4 border-primary/50 pl-4">
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Where to Pause and Evaluate */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          Where Businesses Should Pause and Evaluate
        </h2>
        
        <div className="space-y-6">
          {cautionItems.map((item) => (
            <div key={item.title} className="border-l-4 border-destructive/50 pl-4">
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Businesses That Fit */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Businesses That Typically Fit Fiserv Well
        </h2>
        <p className="text-muted-foreground mb-4">
          Fiserv tends to work best for organisations that value stability, scale, and consolidation over speed and simplicity.
        </p>
        <ul className="list-disc list-inside space-y-3 text-muted-foreground">
          <li>Multi-location retailers and franchise groups that need consistent settlement, reporting, and support across many sites</li>
          <li>Banks, fintechs, and platforms that want a full-stack partner covering issuing, acquiring, and infrastructure</li>
          <li>High-volume e-commerce businesses and marketplaces with complex settlement and payout requirements</li>
          <li>Regulated or risk-sensitive sectors such as healthcare, education, and travel that prioritise bank-grade compliance and vendor consolidation</li>
        </ul>
      </section>

      {/* Businesses That Do Better Elsewhere */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Businesses That Often Do Better Elsewhere
        </h2>
        <ul className="list-disc list-inside space-y-3 text-muted-foreground">
          <li>Very small or price-sensitive businesses usually prefer providers with transparent, published pricing and minimal contract complexity</li>
          <li>Early-stage startups that need fast onboarding, rapid iteration, and developer-first tooling often find specialist API-driven providers easier to work with</li>
          <li>Businesses that expect low, non-negotiable fees without contract review should be cautious: Fiserv can be competitive, but only when commercial terms are understood and negotiated properly</li>
        </ul>
      </section>

      {/* How to Evaluate */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          How to Evaluate Fiserv Before Committing
        </h2>
        <p className="text-muted-foreground mb-4">
          If you are considering Fiserv, treat the evaluation like a procurement exercise rather than a simple signup:
        </p>
        <ul className="list-disc list-inside space-y-3 text-muted-foreground">
          <li>Request the full merchant statement with all fees broken down</li>
          <li>Confirm whether you are contracting directly or through a reseller, and which entity holds settlement funds</li>
          <li>Test reconciliation and reporting outputs with your finance team, as this is where operational friction often shows up later</li>
          <li>Negotiate exit terms and chargeback liability upfront</li>
          <li>If POS is involved, review Clover integrations carefully and ensure the app ecosystem supports your specific workflows</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">What is First Data?</h3>
            <p className="text-muted-foreground">First Data was one of the world's largest merchant acquirers and payment processing companies before being acquired by Fiserv in 2019 for $22 billion. The First Data brand now operates as part of Fiserv's merchant services division, powering first data payment processing for millions of merchants through banks and resellers globally.</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">Is Fiserv the same as First Data?</h3>
            <p className="text-muted-foreground">Yes and no. Fiserv acquired First Data in 2019 and merged the two companies. First Data's merchant acquiring and payment gateway services now operate under the Fiserv brand, but many businesses and banks still refer to the first data systems and infrastructure by the original name. The underlying technology and services remain largely the same.</p>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-3">What is First Data payment gateway?</h3>
            <p className="text-muted-foreground">The First Data payment gateway (now part of Fiserv) provides card processing, settlement, and reconciliation services to merchants. It is typically accessed through banks, ISOs, or resellers rather than directly. The first data platforms support both in-person payments through Clover POS and online transactions through API integrations.</p>
          </div>
        </div>
      </section>

      {/* Pricing Deep Dive Link */}
      <section className="mb-12 p-5 rounded-xl border border-primary/20 bg-primary/5">
        <h3 className="text-lg font-semibold text-foreground mb-2">Want to understand Fiserv and Clover pricing in detail?</h3>
        <p className="text-muted-foreground mb-3">
          Our dedicated pricing guide breaks down how negotiated fees, hardware bundles, and value added services create real business value for resellers and multi-location businesses.
        </p>
        <Link to="/insights/fiserv-clover-pricing-explained" className="inline-flex items-center gap-1.5 text-primary font-medium hover:underline">
          Read: Fiserv and Clover Pricing Explained <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Bottom Line */}
      <section className="mb-12 bg-muted/50 rounded-lg p-6 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Bottom Line
        </h2>
        <p className="text-muted-foreground mb-4">
          Fiserv is not a default choice, but it is a strong one for the right type of business.
        </p>
        <p className="text-muted-foreground mb-4">
          If you operate at scale, across multiple locations, or within regulated environments where stability and consolidation matter, Fiserv's breadth and infrastructure can justify the complexity. If you are small, cost-sensitive, or need rapid experimentation, you should compare newer payment providers first and only proceed with Fiserv once the commercial and operational details are clear.
        </p>
        <p className="text-muted-foreground">
          If you want help assessing whether Fiserv fits your business profile, or comparing it against alternatives based on your transaction volume, geography, and risk profile, you can{" "}
          <Link to="/assessment" className="text-primary hover:underline font-medium">
            start a short assessment
          </Link>{" "}
          and we will guide you through the trade-offs before you commit.
        </p>
      </section>

      {/* Related Articles */}
      <section className="mb-12 pt-8 border-t border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Related Insights</h2>
        <p className="text-muted-foreground mb-4">
          If you are evaluating providers like Fiserv, these guides may also help:
        </p>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/insights/enterprise-provider-comparison" 
              className="text-primary hover:underline"
            >
              Enterprise Payment Providers: Strength Comparison
            </Link>
          </li>
          <li>
            <Link 
              to="/insights/crisis/hidden-fee-crisis" 
              className="text-primary hover:underline"
            >
              The Hidden Fee Crisis: How Your 'Low Rate' Processor is Costing You Thousands
            </Link>
          </li>
          <li>
            <Link 
              to="/insights/pricing-models/blended-vs-interchange" 
              className="text-primary hover:underline"
            >
              Blended vs Interchange++: The Expert's Guide to Choosing Your Pricing Strategy
            </Link>
          </li>
        </ul>
      </section>
    </InsightsArticleLayout>
  );
};

export default FiservPaymentsPlatform;
