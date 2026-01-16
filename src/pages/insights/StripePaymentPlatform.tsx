import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQSchema from "@/components/FAQSchema";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, AlertTriangle, Zap, Globe, ShieldCheck } from "lucide-react";

const StripePaymentPlatform = () => {
  const faqs = [
    {
      question: "What makes Stripe's API easy to use?",
      answer: "Stripe's documentation is considered the gold standard, with clear examples, sandbox environments, and a logical structure that lets developers get up and running quickly. Their API is designed to abstract complexity while still offering deep customization."
    },
    {
      question: "What is Stripe Connect and who is it for?",
      answer: "Stripe Connect is a platform for building marketplace payment flows. It handles multi-party payments, seller onboarding, compliance, and payouts, making it ideal for businesses connecting buyers and sellers who need to split payments."
    },
    {
      question: "What tools does Stripe offer beyond payments?",
      answer: "Beyond core payments, Stripe offers Radar for fraud detection, Billing for subscriptions, Atlas for company incorporation, Identity for verification, and Treasury for banking-as-a-service. It's designed as a full financial infrastructure stack."
    },
    {
      question: "What type of business is Stripe best suited for?",
      answer: "Stripe is ideal for digital-first businesses, SaaS companies, marketplaces, and tech-savvy teams who can leverage its API. It works best for businesses with predictable, low-risk transaction patterns and in-house technical resources."
    },
    {
      question: "When might a business face issues with Stripe?",
      answer: "Businesses outside Stripe's ideal profile may face challenges. Higher-risk industries, businesses with spiky revenue patterns, or those without technical resources may experience account reviews, holds, or find the self-service model limiting."
    }
  ];

  useEffect(() => {
    document.title = "Stripe: The Perfect Payment Platform for the Right Business | ChoosePayments";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Why Stripe's API simplicity and Connect platform make it the ideal choice for digital-first businesses and marketplaces. Learn if Stripe is right for you.");
    }
    return () => {
      document.title = "ChoosePayments";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQSchema faqs={faqs} />
      
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          <InsightsBreadcrumb 
            category={{ name: "Provider Deep Dives", slug: "providers" }}
            currentTitle="Stripe: The Perfect Payment Platform"
          />

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                Provider Deep Dive
              </span>
              <span>•</span>
              <span>8 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Stripe: The Perfect Payment Platform for the Right Business
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Why Stripe's API-first approach and ecosystem make it the default choice for digital-first companies, and how to know if it's right for you.
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                When it comes to online payments, Stripe has become the default. It's the first name that comes up when a startup needs to accept payments, and for good reason. Their developer experience is unmatched, their documentation is often cited as the gold standard, and their ecosystem has grown to include everything from fraud prevention to company incorporation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                But "default" doesn't always mean "right for everyone." Stripe is exceptional at what it does, and understanding exactly what that is will help you determine whether it's the right fit for your business.
              </p>
            </section>

            {/* What Stripe Does Best */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                What Stripe Does Best
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    Developer Experience
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Stripe's API is clean, logical, and well-documented. Their sandbox environment makes testing straightforward, and their libraries support every major language. For a technical team, getting Stripe running can take hours rather than weeks.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    Stripe Connect for Marketplaces
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    If you're building a marketplace (meaning you connect buyers and sellers and need to split payments), Stripe Connect is purpose-built for this. It handles the complexity of multi-party payments, seller onboarding, compliance, and payouts in a way that would take months to build from scratch.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-500" />
                    The Ecosystem
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Beyond payments, Stripe offers Radar (fraud), Billing (subscriptions), Atlas (company incorporation), Identity (verification), and Treasury (banking-as-a-service). If you want everything in one place and have the technical resources to implement it, this ecosystem is powerful.
                  </p>
                </div>
              </div>
            </section>

            {/* Who Stripe Works Best For */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Who Stripe Works Best For
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Stripe is ideal for:
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Digital-first businesses</strong> selling software, subscriptions, or digital goods</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Marketplaces and platforms</strong> that need to split payments between multiple parties</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Tech-savvy teams</strong> with developers who can integrate and maintain the API</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Predictable, low-risk businesses</strong> with steady transaction patterns</span>
                </li>
              </ul>

              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-lg text-foreground leading-relaxed">
                  If your business fits this profile, Stripe is likely the right choice. Their self-service model works beautifully when you have the technical resources to implement it and your risk profile matches their automated systems.
                </p>
              </div>
            </section>

            {/* When Stripe Might Not Be the Right Fit */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                When Stripe Might Not Be the Right Fit
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Stripe's strengths can become limitations if your business falls outside this ideal profile. For example:
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Higher-risk industries</strong> may find their automated risk systems trigger account reviews or holds without clear communication about why.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Businesses with spiky revenue</strong> (seasonal businesses, viral products, or rapid growth) may trigger risk flags designed for steady-state operations.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Complex compliance requirements</strong> may need more hands-on support than Stripe's self-service model provides.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Non-technical teams</strong> may struggle to get the most out of Stripe's API-first approach without developer resources.
                  </p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                This isn't a criticism of Stripe. It's simply recognition that their model is optimized for a specific type of business. If you fall outside that profile, you might be better served by a more specialized provider, one that uses direct acquiring relationships and offers dedicated account management.
              </p>
            </section>

            {/* The Bottom Line */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                The Bottom Line
              </h2>
              
              <div className="p-6 rounded-xl bg-card border border-border">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Stripe is exceptional at what it does. For digital-first businesses with technical teams and predictable transaction patterns, it's hard to beat. The developer experience, documentation, and ecosystem set the standard for the industry.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  But like any tool, it works best when matched to the right job. Understanding whether your business fits Stripe's ideal customer profile is the first step to making the right choice. Not every business needs the most popular option. Sometimes you need the right option.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Not Sure If Stripe Is Right for You?
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Our provider assessment takes 2 minutes and matches your business profile to the payment providers best suited to your needs.
                </p>
                <Link to="/quiz">
                  <Button size="lg" className="gap-2">
                    Take the Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </section>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default StripePaymentPlatform;
