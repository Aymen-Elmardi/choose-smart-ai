'use client'
import { Link } from '@/lib/router-compat';
import { ArrowRight, Shield, Info } from "lucide-react";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import { Button } from "@/components/ui/button";

const SchemeRulesByPaymentMethod = () => {
  return (
    <InsightsArticleLayout
      title="When Scheme Rules Apply Differently: Cards, Wallets, Marketplaces and BNPL Explained"
      description="Scheme rules do not apply identically across payment methods. Learn how cards, digital wallets, marketplaces and Buy Now Pay Later models each carry different risk, liability and compliance requirements."
      category={{ name: "Compliance", slug: "compliance" }}
      showCTA={false}
      publishedTime="2026-02-20"
      currentSlug="scheme-rules-by-payment-method"
      keywords={[
        "scheme rules",
        "payment methods",
        "digital wallets",
        "marketplace payments",
        "buy now pay later",
        "BNPL",
        "chargeback liability",
        "stored credentials",
        "recurring billing",
        "payment facilitator"
      ]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        When Scheme Rules Apply Differently: Cards, Wallets, Marketplaces and BNPL Explained
      </h1>

      <p className="text-lg text-muted-foreground mb-4">
        Most merchants assume scheme rules apply the same way to every transaction.
      </p>
      <p className="text-lg text-muted-foreground mb-4">
        They do not.
      </p>
      <p className="text-lg text-muted-foreground mb-4">
        The way scheme rules affect your business depends heavily on whether you accept cards directly, whether you use digital wallets, whether you operate a marketplace, whether you offer Buy Now Pay Later, and whether you store credentials for recurring billing.
      </p>
      <p className="text-lg text-muted-foreground mb-6">
        Understanding these differences is not academic. It directly affects your chargeback exposure, your fraud liability, your reserve risk and your approval probability.
      </p>

      {/* Informational callout */}
      <div className="my-10 p-5 rounded-xl border border-primary/20 bg-primary/5 flex gap-4 items-start">
        <Info className="w-6 h-6 text-primary mt-0.5 shrink-0" />
        <p className="text-base text-foreground leading-relaxed">
          Scheme rules apply differently depending on how you structure your payment model.
        </p>
      </div>

      {/* Section 1 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Direct Card Processing: The Full Scheme Burden</h2>
      <p className="mb-4">
        If you process card payments directly under your own merchant account, you carry full scheme exposure.
      </p>
      <p className="mb-2">That means:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Your <Link to="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className="text-primary hover:underline">chargeback ratio</Link> is measured directly</li>
        <li>Your fraud rate is attributed directly</li>
        <li><Link to="/insights/scheme-rules-reserves-monitoring" className="text-primary hover:underline">Monitoring programs</Link> apply directly</li>
        <li>PCI compliance obligations sit with you</li>
      </ul>
      <p className="mb-4">In this structure, there is no buffer.</p>
      <p className="mb-6">
        If thresholds are crossed, enforcement is immediate. For many growing businesses, this is the cleanest but also the most exposed structure.
      </p>

      {/* Section 2 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Digital Wallets: Risk Can Shift, But Not Disappear</h2>
      <p className="mb-4">
        Digital wallets such as <Link to="/insights/apple-pay-google-pay-explained" className="text-primary hover:underline">Apple Pay and Google Pay</Link> still run on underlying card networks.
      </p>
      <p className="mb-4">However, the authentication layer changes.</p>
      <p className="mb-2">Wallets often use:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Tokenization</li>
        <li>Device binding</li>
        <li>Strong customer authentication</li>
        <li>Biometric verification</li>
      </ul>
      <p className="mb-4">This can reduce fraud rates significantly compared to manual card entry.</p>
      <p className="mb-4">Lower fraud can indirectly protect your chargeback ratio.</p>
      <p className="mb-4">
        However, <Link to="/insights/payment-scheme-rules-explained" className="text-primary hover:underline">scheme rules</Link> still apply at the merchant level if disputes occur.
      </p>
      <p className="mb-6">The wallet improves security. It does not eliminate scheme obligations.</p>

      {/* Section 3 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Stored Credentials and Recurring Payments</h2>
      <p className="mb-4">When you store card details for subscriptions or recurring billing, additional scheme rules apply.</p>
      <p className="mb-2">Card networks have specific requirements around:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Customer consent</li>
        <li>Billing descriptors</li>
        <li>Cancellation clarity</li>
        <li>Retry logic</li>
        <li>Authentication triggers</li>
      </ul>
      <p className="mb-4">Failure to comply can increase dispute rates quickly.</p>
      <p className="mb-4">
        Subscription businesses often enter monitoring programs not because the model is flawed, but because billing clarity is weak.
      </p>
      <p className="mb-6">The scheme rules here are precise. Merchants who ignore them usually learn after disputes rise.</p>

      {/* Section 4 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Marketplaces and Platforms</h2>
      <p className="mb-4">
        If you operate a <Link to="/insights/marketplace-payments-guide" className="text-primary hover:underline">marketplace or platform</Link>, scheme rules become more layered.
      </p>
      <p className="mb-2">There are rules governing:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Sub merchant onboarding</li>
        <li>Settlement flows</li>
        <li>Liability allocation</li>
        <li>Payout timing</li>
        <li>Merchant identification</li>
      </ul>
      <p className="mb-2">Some models require:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Payment facilitator registration</li>
        <li>Sponsored merchant structures</li>
        <li>Enhanced reporting</li>
      </ul>
      <p className="mb-4">Improper structuring can lead to compliance reviews at scale.</p>
      <p className="mb-4">Many marketplace founders assume their provider handles everything. In reality, responsibility is shared.</p>
      <p className="mb-6">Understanding that structure early prevents scaling into compliance friction later.</p>

      {/* Section 5 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Buy Now Pay Later and Alternative Methods</h2>
      <p className="mb-4">Buy Now Pay Later providers often assume credit risk themselves.</p>
      <p className="mb-4">From a merchant perspective, this reduces direct chargeback exposure on those transactions.</p>
      <p className="mb-2">However:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Your overall dispute ratios across payment methods can still affect <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">provider risk classification</Link></li>
        <li>Refund handling obligations still apply</li>
        <li>Disclosure and advertising standards may be governed by scheme or regulatory rules</li>
      </ul>
      <p className="mb-6">Alternative methods change the risk profile. They do not remove the compliance layer.</p>

      {/* Section 6 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why This Matters Before Choosing a Provider</h2>
      <p className="mb-4">Two businesses can process the same annual volume.</p>
      <p className="mb-2">One uses:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Manual card entry</li>
        <li>Weak subscription disclosures</li>
        <li>No wallet support</li>
      </ul>
      <p className="mb-2">The other uses:</p>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>Tokenized wallets</li>
        <li>Clear recurring billing language</li>
        <li>Structured marketplace onboarding</li>
      </ul>
      <p className="mb-4">Even with identical revenue, their scheme risk profile is very different.</p>
      <p className="mb-4">Providers evaluate this quietly during underwriting.</p>
      <p className="mb-6">Most merchants do not realize this until approval becomes difficult.</p>

      {/* Section 7 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Bottom Line</h2>
      <p className="mb-4">
        <Link to="/insights/payment-scheme-rules-explained" className="text-primary hover:underline">Scheme rules</Link> do not apply identically across payment methods.
      </p>
      <p className="mb-4">Your structure, authentication model, billing logic and merchant classification all influence how risk is measured.</p>
      <p className="mb-4">Understanding this before you scale gives you leverage.</p>
      <p className="mb-10">Understanding it after a reserve appears is much more expensive.</p>

      {/* Advisory CTA */}
      <section className="mt-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/90 p-6 sm:p-8 md:p-12">
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Independent Payment Advisory
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-2xl">
              Structure Your Payment Model With Clarity
            </h2>
            <p className="text-lg text-white/85 mb-8 max-w-2xl leading-relaxed">
              If you are structuring your payment model and want clarity on how scheme rules apply to your specific setup, apply for advisory before committing to a provider.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto h-auto sm:h-12 py-3 sm:py-0"
            >
              <Link to="/recommendation" className="flex items-center justify-center gap-2">
                Apply for Advisory
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-white/60">
              Takes 2 minutes · Human-reviewed guidance
            </p>
          </div>
        </div>
      </section>
    </InsightsArticleLayout>
  );
};

export default SchemeRulesByPaymentMethod;
