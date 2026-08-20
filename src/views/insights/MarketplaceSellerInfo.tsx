'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import { Source } from "@/components/SourcesCitation";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

const marketplaceSellerSources: Source[] = [
  { name: "Stripe: Know Your Business (KYB) Guide", url: "https://stripe.com/resources/more/know-your-business-kyb", type: "industry" },
  { name: "Stripe Connect: Handle Verification with the API", url: "https://docs.stripe.com/connect/handling-api-verification", type: "industry" },
  { name: "Visa: Payment Facilitator and Marketplace Risk Guide", url: "https://usa.visa.com/content/dam/VCOM/regional/na/us/partner-with-us/documents/visa-payment-facilitator-and-marketplace-risk-guide.pdf", type: "official" },
  { name: "Enigma: KYB for Marketplaces and Platforms", url: "https://www.enigma.com/resources/knowledge/kyb-for-marketplaces", type: "industry" },
  { name: "Middesk: Know Your Seller: Why Marketplaces Need to Verify Identities", url: "https://www.middesk.com/blog/know-your-seller", type: "industry" },
  { name: "Evident ID: INFORM Act: Verifying Seller Information", url: "https://www.evidentid.com/resources/collect-and-verify-information-under-the-inform-consumers-act/", type: "industry" },
];

/**
 * Single source of truth for this article's FAQ: the accordion and the FAQPage
 * JSON-LD both render from this array, so the visible copy and the structured
 * data cannot drift apart.
 */
const faqItems = [
  {
    question: "What's the difference between KYC and KYB for marketplace sellers?",
    answer: "KYC verifies an individual person: ID and proof of address. KYB verifies a business entity: registration documents and beneficial ownership. Marketplaces typically need both: KYC for individual/sole-trader sellers, KYB for registered business sellers.",
  },
  {
    question: "Do small or hobby sellers need the same verification as large business sellers?",
    answer: "Not usually upfront. Most providers support tiered verification: light checks to start selling, with fuller KYB triggered once a seller crosses a volume or payout threshold, such as the $5,000/200-transaction threshold under the US INFORM Consumers Act.",
  },
  {
    question: "What documents does a payment provider need to verify a marketplace seller?",
    answer: "At minimum: legal name, government ID, proof of address, and verified bank account details for individuals. For registered businesses, add company registration documents, tax ID, and beneficial ownership disclosure for anyone owning 25% or more of the business.",
  },
  {
    question: "What happens if a seller doesn't complete verification?",
    answer: "Their payouts are held until verification is complete. If a marketplace repeatedly onboards under-verified sellers, the provider can also impose reserves or increased monitoring on the platform's entire account.",
  },
  {
    question: "How long does marketplace seller verification take?",
    answer: "For straightforward individual sellers with clean documentation, verification is often near-instant to a few hours. Business sellers requiring beneficial ownership and sanctions screening typically take same-day to several business days.",
  },
];

const MarketplaceSellerInfo = () => {
  return (
    <InsightsArticleLayout
      title="Marketplace Seller Verification: What Providers Require"
      schemaHeadline="Marketplace Seller Verification: What Payment Providers Require"
      description="Marketplaces face KYB/KYC checks payment providers rarely explain clearly. See exactly what seller documents are required and how to avoid payout delays."
      category={{ name: "Payment Risk", slug: "payment-risk" }}
      cluster="hub"
      currentSlug="marketplace-seller-info"
      publishedTime="2025-12-29"
      modifiedTime="2026-08-13"
      keywords={[
        "marketplace seller verification", "marketplace seller KYC", "KYB for marketplaces",
        "payment provider seller documents", "marketplace seller onboarding requirements",
        "INFORM Consumers Act marketplace", "EU DSA trader verification",
      ]}
      sources={marketplaceSellerSources}
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Marketplace Seller Verification: What Payment Providers Require
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p className="text-lg text-foreground font-medium">
          Every seller you onboard is a liability your payment provider has to underwrite.
        </p>

        <p>
          If you run a marketplace, payment providers ask more questions of you than they would of a normal e-commerce store. What&apos;s rarely explained clearly is why, exactly what they&apos;re checking, and how much of it lands on you to collect before a seller gets paid. Get this wrong and the cost is concrete: held payouts, frustrated sellers, and sometimes the whole platform&apos;s account under review.
        </p>

        <p>
          This guide covers what marketplace seller verification involves, the documents providers actually request, and how to structure onboarding so it doesn&apos;t become a bottleneck.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Why Marketplaces Face Extra Seller Verification
        </h2>

        <p>
          A standard merchant takes payment for its own goods or services. A marketplace does something structurally different: it collects money on behalf of other people and routes it to them, minus a commission. That difference is why marketplaces sit in a higher-scrutiny category with every acquirer and payment provider.
        </p>

        <p>
          Anti-money laundering (AML) and counter-terrorist financing (CTF) regulations require financial institutions to know who they&apos;re moving money for. Your payment provider carries that obligation. Because you sit between the provider and your sellers, the obligation flows down to you: your provider requires you to verify sellers so it can demonstrate to regulators that the money moving through its rails goes to real, accountable people and businesses.
        </p>

        <p>
          If a seller on your platform is using it for fraud or laundering, the regulatory and financial exposure lands on your payment provider first. That&apos;s why they push the verification requirement onto you before you go live.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          KYC vs. KYB: What&apos;s Actually Being Checked
        </h2>

        <p>
          Providers use two related but distinct verification frameworks, and most explanations of &quot;seller verification&quot; blur them together.
        </p>

        <p>
          <strong className="text-foreground">KYC (Know Your Customer)</strong> verifies an <em>individual</em>. It involves a government-issued ID, proof of address, and sometimes a liveness or selfie check to confirm the person is who they claim to be.
        </p>

        <p>
          <strong className="text-foreground">KYB (Know Your Business)</strong> verifies a <em>business entity</em>. It covers company registration documents, the registered business address, and the identity of the business&apos;s beneficial owners (anyone who owns roughly 25% or more of it), screened against sanctions and politically exposed person (PEP) watchlists.
        </p>

        <p>Most marketplaces need both, applied differently depending on the seller:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Individual or sole-trader sellers</strong> go through KYC: ID and address verification, the same checks a bank runs when you open a personal account.
          </li>
          <li>
            <strong className="text-foreground">Registered business sellers</strong> go through KYB: company documents and beneficial ownership checks, plus ID checks for the directors involved.
          </li>
        </ul>

        <p>
          If your marketplace hosts both individual creators and registered companies, common for platforms spanning gig work, handmade goods, and larger merchants, you need both flows built into onboarding, not a one-size-fits-all form.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          The Documents Payment Providers Typically Request
        </h2>

        <p>
          Exact requirements vary by provider and jurisdiction. The checklist below covers what you should expect to collect, in some form, for nearly every seller.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          For individual / sole-trader sellers
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Full legal name and date of birth</li>
          <li>Government-issued photo ID (passport, driving licence, national ID)</li>
          <li>Proof of address dated within the last three months (utility bill, bank statement)</li>
          <li>Bank account details verified as belonging to the named individual (payouts to a third-party account are a common rejection trigger)</li>
          <li>Contact details: working email address and phone number</li>
          <li>A description of what they sell</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          For registered business sellers
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Legal business name, trading name, and registered address</li>
          <li>Business registration or certificate of incorporation</li>
          <li>Tax identification number (VAT number in the UK/EU, EIN in the US)</li>
          <li>Identification for directors and for any beneficial owner holding 25% or more of the business</li>
          <li>Business bank account details, verified as belonging to the registered entity</li>
          <li>Sanctions and PEP screening results for the business and its owners</li>
        </ul>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          Ongoing checks: it doesn&apos;t stop at onboarding
        </h3>
        <p>
          Verification isn&apos;t a one-time gate. Most providers re-check sellers as they cross volume or payout thresholds, and expect platforms to monitor for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sudden spikes in a seller&apos;s transaction volume</li>
          <li>Rising dispute or refund rates tied to a specific seller</li>
          <li>Changes to bank account details or business ownership</li>
          <li>
            Sellers approaching or crossing regulatory thresholds. In the US, the <strong className="text-foreground">INFORM Consumers Act</strong> requires additional verification once a third-party seller passes roughly 200 transactions and $5,000 in sales within a year
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What Happens If Seller Verification Is Missing or Incomplete
        </h2>

        <p>
          <strong className="text-foreground">Payouts get held or delayed.</strong> If a seller&apos;s verification is incomplete, providers typically hold their funds rather than release them, regardless of how the sale went.
        </p>

        <p>
          <strong className="text-foreground">Your whole platform can face restrictions.</strong> Providers don&apos;t only penalize the individual seller. A marketplace that repeatedly onboards under-verified sellers signals weak risk controls, which can lead the provider to impose reserves or tighten monitoring on the entire account, not just the seller in question.
        </p>

        <p>
          <strong className="text-foreground">Sellers churn.</strong> Verification requests that show up mid-transaction, with no warning and no clear reasoning, read as bureaucratic friction to sellers who just want to get paid.
        </p>

        <p>
          <strong className="text-foreground">In the worst case, providers terminate the relationship.</strong> If a provider concludes a platform isn&apos;t enforcing verification consistently, the platform&apos;s own account is at risk of review or termination, not just individual sellers.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          How to Structure Seller Onboarding to Avoid Delays
        </h2>

        <p>
          The platforms that avoid these problems don&apos;t front-load every check on day one. They use a <strong className="text-foreground">tiered verification model</strong>, the same approach Stripe Connect and Adyen for Platforms use:
        </p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong className="text-foreground">Light-touch verification to start selling.</strong> Collect the basics (name, contact details, bank account) so a new seller can list and make their first few sales without a heavy onboarding form standing between them and revenue.
          </li>
          <li>
            <strong className="text-foreground">Fuller KYB triggered by thresholds.</strong> As a seller&apos;s volume or payout total crosses a defined threshold, automatically require the fuller document set: business registration, beneficial ownership, tax ID.
          </li>
          <li>
            <strong className="text-foreground">Explain why, not just what.</strong> Sellers who understand that document requests come from regulatory requirements, not platform policy, complete them faster. See our guide on <Link to="/insights/what-to-do-when-provider-asks-for-documents" className="text-primary hover:underline">how to respond to provider document requests</Link>.
          </li>
          <li>
            <strong className="text-foreground">Build monitoring into ongoing operations, not just onboarding.</strong> Track dispute rates, sudden volume changes, and payout-detail changes per seller, since providers expect platforms to catch these signals before they escalate. This is closely tied to <Link to="/insights/why-providers-impose-reserves" className="text-primary hover:underline">why providers impose reserves</Link>.
          </li>
        </ol>

        <p>
          Get this sequencing wrong, for example asking for full KYB before a seller has made a single sale, and you&apos;ll lose sellers to friction before you see any risk benefit. Get it right, and verification stays close to invisible for the sellers who are exactly who they say they are.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Regional Differences: UK/EU vs. US Requirements
        </h2>

        <p>
          Verification requirements aren&apos;t identical everywhere, and it matters where your sellers and your provider operate.
        </p>

        <p>
          <strong className="text-foreground">UK/EU:</strong> The <strong className="text-foreground">Digital Services Act (DSA)</strong> requires marketplaces to collect and verify trader name, address, phone number, email, an ID document, payment account details, and, where applicable, the trade register number, before a trader can sell. This sits on top of PSD2 and AML5-driven KYC/KYB obligations your payment provider already enforces contractually. For the wider context, see <Link to="/insights/payment-scheme-rules-explained" className="text-primary hover:underline">how scheme rules apply to marketplaces</Link>.
        </p>

        <p>
          <strong className="text-foreground">United States:</strong> The <strong className="text-foreground">INFORM Consumers Act</strong> targets &quot;high-volume third-party sellers&quot;, generally those with 200+ transactions and $5,000+ in sales in a 12-month period, requiring platforms to collect and verify bank account details, tax ID, and contact information for those sellers.
        </p>

        <p>
          If you operate across both regions, design your onboarding flow to the stricter rule set, usually the EU/DSA standard, and apply it as the baseline for any seller who could fall under either.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Choosing a Provider That Understands Marketplace Verification
        </h2>

        <p>
          Not every payment provider handles split payments, staged payouts, and marketplace-specific KYB well. <Link to="/insights/marketplace-payments-guide" className="text-primary hover:underline">Our full marketplace payments guide</Link> covers the broader payment infrastructure question if you&apos;re still choosing a provider; this page is specifically about the verification layer once you have one.
        </p>

        <p>
          If you&apos;re not sure whether your current or prospective provider&apos;s verification requirements fit how your marketplace operates, that mismatch is exactly what <Link to="/assessment" className="text-primary hover:underline">our free risk assessment</Link> is built to catch before it costs you a frozen payout.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-6">
          Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqItems} />
      </div>
    </InsightsArticleLayout>
  );
};

export default MarketplaceSellerInfo;
