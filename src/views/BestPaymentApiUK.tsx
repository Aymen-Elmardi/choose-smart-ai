'use client'
import { useEffect } from "react";
import { Link } from '@/lib/router-compat';
import { ArrowRight, Check, X, Code, Webhook, FileText, TestTube, Shield, Clock, Headphones, BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCanonical } from "@/hooks/useCanonical";
import { useSEO } from "@/hooks/useSEO";
import FinancialProductSchema from "@/components/FinancialProductSchema";

const providers = [
  {
    name: "Stripe API",
    description: "Industry-leading payment API with best-in-class documentation and SDKs for all major languages",
    provider: "Stripe",
    fees: "1.4–2.9% + 20p",
  },
  {
    name: "Checkout.com API",
    description: "Enterprise-level payment API with highly configurable webhooks and custom pricing",
    provider: "Checkout.com",
    fees: "Custom",
  },
  {
    name: "Square API",
    description: "Retail-focused payment API with excellent POS integration and mobile SDKs",
    provider: "Square",
    fees: "1.75–2.5%",
  },
  {
    name: "PayPal API",
    description: "Simple payment API for quick integration with limited customisation options",
    provider: "PayPal",
    fees: "2.99% + fixed fee",
  },
  {
    name: "Datman API",
    description: "Marketplace-focused API with split payment capabilities for multi-merchant platforms",
    provider: "Datman",
    fees: "Custom",
  },
];

const BestPaymentApiUK = () => {
  useCanonical();
  
  useSEO({
    title: "Best Payment APIs for UK Developers & High-Growth Apps",
    description: "Compare payment APIs for UK developers: Stripe, Adyen, Checkout.com. Pricing, integration speed, approval rates. Find the API that fits your tech stack.",
    keywords: ["payment API UK", "best payment gateway API", "Stripe API alternatives", "checkout.com api", "developer payment integration", "payment API comparison"],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FinancialProductSchema 
        products={providers}
        listName="Best Payment APIs UK 2026"
      />
      <Header />
      
      <main>
        {/* SECTION 1 — Hero Section */}
        <section className="section-padding pt-24 md:pt-32">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted-foreground mb-4">
                Picking a payment API is easy. Switching later isn't.
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Best Payment APIs in the UK — and Which Ones Will Actually Approve You
              </h1>
              <div className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto space-y-4 text-left">
                <p>
                  Most developers pick Stripe by default. It's well-documented, widely supported, and works well for a lot of use cases. But it's not always the right choice, and switching later can be painful.
                </p>
                <p>
                  Some projects need faster activation, simpler pricing, better marketplace support, or a provider with actual human support when things go wrong. The marketing materials don't always make these trade-offs clear.
                </p>
                <p>
                  This guide compares the leading payment APIs honestly — so you can choose well the first time.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Button size="xl" asChild>
                  <Link to="/assessment?start=true" replace>
                    Answer a few quick questions
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground mt-2">Takes under 1 minute • No spam</span>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Independent guidance. We're paid by providers — not by you.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2 — Quick API Comparison Table */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Top UK Payment APIs (Developer Snapshot)
              </h2>
              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Provider</TableHead>
                      <TableHead className="font-semibold">API Quality</TableHead>
                      <TableHead className="font-semibold">Docs</TableHead>
                      <TableHead className="font-semibold">Webhooks</TableHead>
                      <TableHead className="font-semibold">SDKs</TableHead>
                      <TableHead className="font-semibold">Best Use Case</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Stripe</TableCell>
                      <TableCell>Excellent</TableCell>
                      <TableCell>Best in class</TableCell>
                      <TableCell>Reliable</TableCell>
                      <TableCell>All major languages</TableCell>
                      <TableCell>Online-first products</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Checkout.com</TableCell>
                      <TableCell>Enterprise-level</TableCell>
                      <TableCell>Strong</TableCell>
                      <TableCell>Highly configurable</TableCell>
                      <TableCell>SDK available</TableCell>
                      <TableCell>Scale-ready apps</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Square</TableCell>
                      <TableCell>Good</TableCell>
                      <TableCell>Clean</TableCell>
                      <TableCell>POS-focused</TableCell>
                      <TableCell>JS, iOS, Android</TableCell>
                      <TableCell>Retail & POS apps</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">PayPal</TableCell>
                      <TableCell>Basic</TableCell>
                      <TableCell>Simple</TableCell>
                      <TableCell>Limited</TableCell>
                      <TableCell>SDKs available</TableCell>
                      <TableCell>Low-volume add-on</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Datman</TableCell>
                      <TableCell>Focused</TableCell>
                      <TableCell>Good</TableCell>
                      <TableCell>Simple</TableCell>
                      <TableCell>API available</TableCell>
                      <TableCell>Marketplaces (split payments)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Deep-Dive: Stripe */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Stripe — The Developer Favourite
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Pros</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Best documentation in the industry</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Extensive SDKs (Node, Python, PHP, Ruby, Go, .NET, Java)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Excellent test mode</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Strong webhook system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Supports global payments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Fast setup for online businesses</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Cons</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Can be overkill for simple products</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Fees increase with international cards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Not ideal for UK-heavy in-person businesses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Requires configuration and upfront thinking</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Marketplace split payments require Connect (complex)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — Deep-Dive: Checkout.com */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                Checkout.com — API-First at Scale
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Pros</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Extremely flexible API</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Excellent for enterprise or scale-up builds</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Great international routing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Strong fraud tooling (risk engine)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Custom pricing available</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4">Cons</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Not ideal for very small businesses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Integration takes longer</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Requires volume or business case for activation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — Square & PayPal */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Square */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  Square API — Best for Retail Apps
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-bold text-foreground mb-4">Pros</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Great POS integration</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Hardware-ready</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">SDKs for web + mobile</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-bold text-foreground mb-4">Cons</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Limited advanced online tooling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Not ideal for global-first apps</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* PayPal */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
                  PayPal API — Simple, but Limited
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-bold text-foreground mb-4">Pros</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Easy to bolt on</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Fast activation</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-xl font-bold text-foreground mb-4">Cons</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">High fees</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Not scalable long-term</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <X className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">Limited control</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6 — Marketplaces */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Building a Marketplace or Multi-Seller Platform?
              </h2>
              <p className="text-lg text-muted-foreground">
                If you're building a UK marketplace, split payments and fee routing are the biggest challenges. Stripe Connect is powerful but complex. Datman offers a much simpler split-payments model with UK support and low overhead, especially for delivery apps and multi-merchant platforms.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 — Core Developer Criteria */}
        <section className="section-padding bg-muted/30">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
                How to Choose a Payment API as a Developer
              </h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Code, label: "API quality" },
                  { icon: Webhook, label: "Webhook reliability" },
                  { icon: FileText, label: "SDK maturity" },
                  { icon: TestTube, label: "Sandbox + test cards" },
                  { icon: Shield, label: "Fraud tools" },
                  { icon: Clock, label: "Integration speed" },
                  { icon: Headphones, label: "Support response time" },
                  { icon: BookOpen, label: "Documentation clarity" },
                  { icon: Lock, label: "UK compliance (SCA, PSD2)" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-card rounded-lg p-4 border border-border">
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8 — CTA for Developers */}
        <section className="section-padding">
          <div className="section-container">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16 text-center">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl" />
              </div>
              
              <div className="relative z-10">
                <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                  Not sure which payment API fits your build? Tell us a bit about your project and we'll match you with the right provider based on developer needs, UK requirements, and your business model.
                </p>
                <div className="flex flex-col items-center">
                  <Button 
                    variant="secondary" 
                    size="xl" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    asChild
                  >
                    <Link to="/assessment?start=true" replace>
                      Answer a few quick questions
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <span className="text-sm text-primary-foreground/70 mt-3">Takes under 1 minute • No spam</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9 — Final Note */}
        <section className="section-padding">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                Developers often default to Stripe because it's familiar, but the best payment API depends on the specifics of your project. A retail POS app, a marketplace, and a subscription SaaS all have different requirements. We help you choose the right provider from day one.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BestPaymentApiUK;
