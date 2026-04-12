import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const paymentSchemeRulesSources = [
  { name: "Visa Core Rules and Visa Product and Service Rules", url: "https://usa.visa.com/dam/VCOM/download/about-visa/visa-rules-public.pdf", type: "official" as const },
  { name: "Mastercard Rules Manual", url: "https://www.mastercard.us/en-us/business/overview/support/rules.html", type: "official" as const },
  { name: "PCI Security Standards Council", url: "https://www.pcisecuritystandards.org/", type: "official" as const },
];

const PaymentSchemeRulesExplained = () => {
  return (
    <InsightsArticleLayout
      title="Payment Scheme Rules: What Merchants Must Know"
      description="Learn what payment scheme rules are, how flow down provisions work, and why the rules set by Visa and Mastercard often matter more than your provider contract."
      category={{ name: "Compliance", slug: "compliance" }}
      cluster="hub"
      currentSlug="payment-scheme-rules-explained"
      publishedTime="2026-02-16"
      keywords={["payment scheme rules", "card scheme rules", "flow down provisions", "Visa rules", "Mastercard rules", "chargeback thresholds", "PCI compliance", "merchant compliance", "payment contract"]}
      sources={paymentSchemeRulesSources}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        What Are Payment Scheme Rules and Why They Matter More Than Your Contract
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          Most merchants believe their payment relationship is defined by the contract they sign with Stripe, Adyen, Checkout, Fiserv, or another provider.
        </p>
        <p>
          That is only partly true.
        </p>
        <p>
          Behind every payment provider sits a much larger layer of rules written by Visa, Mastercard, American Express, and other card schemes. These are called scheme rules, and they often matter more than your direct contract.
        </p>
        <p>
          If you want to understand why accounts get frozen, why terms change at scale, or why certain industries are treated differently, you need to understand this layer.
        </p>

        {/* Compliance callout box */}
        <div className="my-8 p-5 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-foreground text-base leading-relaxed">
            Most merchant contracts contain flow down provisions. This means your obligations may change if card network rules change.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          The Payment Stack Most Merchants Never See
        </h2>
        <p>
          When you accept a card payment, several parties are involved:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The customer's bank</li>
          <li>The card network such as Visa or Mastercard</li>
          <li>The acquiring bank</li>
          <li>Your payment provider</li>
          <li>Your business</li>
        </ul>
        <p>
          Your contract is usually with the payment provider.
        </p>
        <p>
          However, your provider has its own contractual obligations to the acquiring bank. The acquiring bank has contractual obligations to the card schemes.
        </p>
        <p>
          Those obligations are passed down to you through something called flow down provisions.
        </p>
        <p>
          This means you are indirectly bound by rules written by Visa, Mastercard, or American Express, even if you never signed a document with them directly.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What Are Scheme Rules
        </h2>
        <p>
          Scheme rules are the operating regulations set by card networks. They cover:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Chargeback thresholds</li>
          <li>Fraud monitoring requirements</li>
          <li>Data security standards</li>
          <li>Brand display rules</li>
          <li>Merchant category classifications</li>
          <li>High risk monitoring programs</li>
          <li>Termination conditions</li>
        </ul>
        <p>
          These rules are not optional for providers.
        </p>
        <p>
          If a payment provider fails to enforce them, the card network can fine the acquirer or remove their access to the network.
        </p>
        <p>
          So when your provider asks for documents, applies reserves, or terminates accounts, they are often responding to scheme level obligations rather than personal discretion.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Why This Matters More Than Your Contract
        </h2>
        <p>
          Most merchant contracts include broad clauses such as:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We may suspend services at our discretion</li>
          <li>We may request additional documentation</li>
          <li>We may hold funds if risk increases</li>
        </ul>
        <p>
          Merchants often interpret this as provider overreach. In reality, these clauses exist because the provider must comply with scheme rules that may require:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Immediate suspension if fraud exceeds thresholds</li>
          <li>Placement into monitoring programs</li>
          <li>Reserve requirements for high chargeback ratios</li>
          <li>Termination if certain risk codes are triggered</li>
        </ul>
        <p>
          In other words, your contract is often a reflection of upstream obligations.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Flow Down Provisions Explained Simply
        </h2>
        <p>
          Flow down provisions are clauses in your agreement that state you must comply with card network rules, even if those rules are updated after you sign your contract.
        </p>
        <p>
          This means if Visa changes its monitoring thresholds next year, your obligations change too. You will not receive a new contract to sign. Your provider is simply required to enforce the updated rules.
        </p>
        <p>
          This is why some merchants experience sudden compliance reviews or new documentation requests without obvious changes in their own business.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          The Hidden Trigger Points Merchants Overlook
        </h2>
        <p>
          There are specific scheme level thresholds that can change your risk profile quickly:
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
          1. Chargeback Ratio Thresholds
        </h3>
        <p>
          Crossing certain percentages can automatically move you into monitoring programs. Learn more about <Link to="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className="text-primary hover:underline">how chargebacks work and how to avoid them</Link>.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
          2. Fraud Rate Limits
        </h3>
        <p>
          Exceeding scheme fraud limits can trigger mandatory remediation plans.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
          3. High Charge Volume Status
        </h3>
        <p>
          In some cases, merchants processing above certain annual volumes are treated differently and may be required to move to direct acquiring relationships. You can learn more about <Link to="/insights/what-is-an-acquirer" className="text-primary hover:underline">what an acquirer is and why it matters</Link>.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
          4. PCI Compliance Status
        </h3>
        <p>
          Failure to maintain proper PCI validation can escalate quickly at scheme level.
        </p>
        <p>
          These are not provider preferences. They are network requirements.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Why Advisory Matters at This Level
        </h2>
        <p>
          Most businesses choose a payment provider based on fees, API quality, brand reputation, and ease of onboarding.
        </p>
        <p>
          Very few assess how scheme rules affect their industry, how their growth trajectory changes risk classification, what thresholds apply to their model, or whether their chargeback exposure is structurally risky.
        </p>
        <p>
          The provider enforces the rules. An advisor helps you understand how those rules apply before you sign. You can explore our <Link to="/insights/visa-mastercard-control-card-payments" className="text-primary hover:underline">guide to how Visa and Mastercard control card payments</Link> for more context.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          A Practical Example
        </h2>
        <p>
          Two businesses can process the same volume. One operates with low refund clarity and unclear billing descriptors. The other has strong communication and structured customer support.
        </p>
        <p>
          If both cross a chargeback threshold, the scheme rules apply equally. However, the business with better internal structure can often correct issues quickly and remain within acceptable limits.
        </p>
        <p>
          The difference is not luck. It is preparation.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          The Bottom Line
        </h2>
        <p>
          Your payment provider is not the top of the hierarchy. The card schemes are.
        </p>
        <p>
          If you want stability, long term approval, and fewer surprises, you need to understand the layer above your provider. Most merchants never look there. That is where risk truly lives.
        </p>
        <p>
          You can also read about <Link to="/insights/why-payment-accounts-get-frozen-without-warning" className="text-primary hover:underline">why payment accounts get frozen without warning</Link> and <Link to="/insights/why-providers-re-underwrite-accounts" className="text-primary hover:underline">why providers re-underwrite existing accounts</Link> for related context.
        </p>

        {/* Advisory CTA */}
        <section className="mt-16 p-8 md:p-10 rounded-2xl border border-border bg-card">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Clarity Before You Sign With a Provider?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-2xl">
            If you are choosing or changing a payment provider and want independent guidance before applying, apply for advisory. We review your business model, risk profile, growth plans, and approval probability before you commit.
          </p>
          <Link
            to="/recommendation"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-150 hover:translate-y-[-1px] active:translate-y-0"
          >
            Apply for Advisory
          </Link>
        </section>
      </div>
    </InsightsArticleLayout>
  );
};

export default PaymentSchemeRulesExplained;
