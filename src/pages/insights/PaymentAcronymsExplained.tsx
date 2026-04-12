import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";

const PaymentAcronymsExplained = () => {
  const faqs = [
    {
      question: "What does MCC mean in payments?",
      answer: "MCC stands for Merchant Category Code. It is a four digit code assigned by card networks to classify what your business sells. Your MCC affects which providers will accept you, how your transactions are risk scored, and what interchange rate you pay."
    },
    {
      question: "What is the MATCH list in payment processing?",
      answer: "The MATCH list (Member Alert to Control High-risk merchants) is a shared database used by acquiring banks and payment providers. If a merchant is placed on the MATCH list after a previous termination, most mainstream providers will decline their application."
    },
    {
      question: "What is a rolling reserve in payment processing?",
      answer: "A rolling reserve is when a provider withholds a percentage of your revenue for a set period, typically 6 to 12 months, as protection against chargebacks and disputes. It directly affects your available cash flow even though the money is eventually released."
    },
    {
      question: "What is the difference between settlement and payout?",
      answer: "Settlement is when card networks confirm a transaction is complete and funds are transferred to your provider. Payout is when your provider sends those funds to your bank account. The gap between settlement and payout is where cash flow friction often occurs."
    },
    {
      question: "What does SCA mean for UK businesses?",
      answer: "SCA stands for Strong Customer Authentication. It is a regulatory requirement under PSD2 that requires two-factor verification for most online card payments in the UK and EU. It affects checkout friction and approval rates, especially when exemptions like TRA or LVT are not applied."
    }
  ];

  return (
    <InsightsArticleLayout
      title="Payment Acronyms: Essential Merchant Glossary"
      description="A clear guide to the payment acronyms that affect approval, cash flow, and costs. Learn which terms matter for your business and which ones you can safely ignore."
      category={{ name: "Explainers", slug: "explainer" }}
      currentSlug="payment-acronyms-explained"
      publishedTime="2026-02-09"
      keywords={[
        "payment acronyms",
        "MCC meaning",
        "SCA explained",
        "TRA exemption",
        "what is a rolling reserve",
        "MATCH list",
        "payment settlement vs payout",
        "interchange explained",
        "PSD2 for merchants",
        "chargeback ratio",
        "soft decline vs hard decline",
        "payment terms explained"
      ]}
    >
      <FAQSchema faqs={faqs} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        Payment Acronyms Merchants Actually Need to Understand (And Which Ones You Can Ignore)
      </h1>

      <p className="text-lg text-muted-foreground mb-6">
        The payments industry has more acronyms than most businesses know what to do with. Every provider pitch, every pricing page, and every compliance document introduces another set of letters that sound important but rarely get explained clearly.
      </p>

      <p className="text-lg text-muted-foreground mb-6">
        The truth is, most of these acronyms do not affect whether your payments go through, whether your account stays open, or how much you actually pay.
      </p>

      <p className="text-lg text-muted-foreground mb-10">
        This guide separates the terms that genuinely affect your business from the ones that are safe to leave to your provider. If you understand the first group, you are already ahead of most merchants.
      </p>


      {/* Section 1 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
        Acronyms That Directly Affect Approval and Revenue
      </h2>

      <p className="text-muted-foreground mb-6">
        These are the terms that can decide whether your payments are approved, your account stays active, or your application is accepted in the first place.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">MCC (Merchant Category Code)</h3>
      <p className="text-muted-foreground mb-2">
        A four digit code assigned by card networks that classifies what your business sells.
      </p>
      <p className="text-muted-foreground mb-6">
        Your MCC determines which providers will work with you, how your transactions are risk scored, and what interchange rates apply. If your MCC is wrong, it can trigger reviews, flags, or outright rejection. Most merchants never check theirs.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">SCA (Strong Customer Authentication)</h3>
      <p className="text-muted-foreground mb-2">
        A regulatory requirement under PSD2 that demands two factor verification for most online card payments in the UK and EU.
      </p>
      <p className="text-muted-foreground mb-6">
        SCA adds friction to checkout. If your provider does not apply exemptions properly, your{" "}
        <Link to="/insights/tra-exemption-reduces-payment-friction" className="text-primary hover:underline">approval rates drop and abandonment rises</Link>.
        The acronym itself is less important than whether your provider handles it well.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">TRA (Transaction Risk Analysis)</h3>
      <p className="text-muted-foreground mb-2">
        An exemption under SCA that allows low risk transactions to skip additional authentication.
      </p>
      <p className="text-muted-foreground mb-6">
        When applied correctly, TRA lets trusted customers complete purchases without extra steps. This directly improves conversion. Not all providers enable it by default, and{" "}
        <Link to="/insights/tra-exemption-reduces-payment-friction" className="text-primary hover:underline">qualifying for TRA depends on your fraud and chargeback profile</Link>.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Authorisation Rate</h3>
      <p className="text-muted-foreground mb-2">
        The percentage of payment attempts that are successfully approved by the issuing bank.
      </p>
      <p className="text-muted-foreground mb-6">
        This is arguably the most important metric for any merchant accepting card payments. A low authorisation rate means lost revenue on every transaction that fails. Different providers achieve different rates depending on their{" "}
        <Link to="/insights/why-card-approval-speed-affects-checkout-abandonment" className="text-primary hover:underline">routing, retry logic, and exemption handling</Link>.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Soft Decline vs Hard Decline</h3>
      <p className="text-muted-foreground mb-2">
        A soft decline is a temporary rejection that can be retried. A hard decline is a permanent refusal from the issuing bank.
      </p>
      <p className="text-muted-foreground mb-6">
        The distinction matters because soft declines are recoverable. Providers that automatically retry soft declines can recover significant revenue that would otherwise be lost. If your provider does not distinguish between the two, you are leaving money on the table.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Chargeback Ratio</h3>
      <p className="text-muted-foreground mb-2">
        The percentage of your transactions that result in a{" "}
        <Link to="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className="text-primary hover:underline">chargeback dispute</Link>.
      </p>
      <p className="text-muted-foreground mb-6">
        Card networks like Visa and Mastercard monitor this ratio closely. If it exceeds their thresholds (typically around 1 percent), your account can be placed into a monitoring programme, fined, or terminated. This is one of the most common reasons{" "}
        <Link to="/insights/why-payment-accounts-get-frozen-without-warning" className="text-primary hover:underline">accounts are frozen without warning</Link>.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">MATCH List</h3>
      <p className="text-muted-foreground mb-2">
        A shared industry database of merchants whose accounts have been terminated by a previous provider.
      </p>
      <p className="text-muted-foreground mb-6">
        Being placed on the MATCH list makes it extremely difficult to get approved by mainstream providers. It is one of the most serious consequences of account termination and can{" "}
        <Link to="/insights/why-some-businesses-never-get-approved" className="text-primary hover:underline">block approval for years</Link>.
      </p>


      {/* Section 2 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
        Acronyms That Affect Cash Flow and Payouts
      </h2>

      <p className="text-muted-foreground mb-6">
        Taking a payment and receiving the money are two different events. The gap between them is where many merchants feel frustrated, and understanding these terms explains why.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Settlement</h3>
      <p className="text-muted-foreground mb-2">
        The process where card networks confirm a transaction is complete and transfer funds to your provider.
      </p>
      <p className="text-muted-foreground mb-6">
        Settlement typically happens within one to two business days after the transaction. But settlement to your provider does not mean the money is in your bank account yet.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Payout</h3>
      <p className="text-muted-foreground mb-2">
        When your provider sends settled funds to your bank account.
      </p>
      <p className="text-muted-foreground mb-6">
        Payout schedules vary widely between providers. Some pay daily, some weekly, and some hold funds for longer during onboarding or high risk periods. Understanding your payout schedule is essential for{" "}
        <Link to="/insights/same-day-settlement-and-instant-payouts" className="text-primary hover:underline">managing cash flow</Link>.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Rolling Reserve</h3>
      <p className="text-muted-foreground mb-2">
        A percentage of your revenue that a provider withholds for a set period, typically 6 to 12 months.
      </p>
      <p className="text-muted-foreground mb-6">
        Rolling reserves are common for businesses that providers consider higher risk. The withheld funds act as insurance against future chargebacks. While the money is eventually released, it directly reduces your available working capital. This is one of the most common reasons merchants feel their money is "stuck."
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Faster Payments (UK)</h3>
      <p className="text-muted-foreground mb-2">
        The UK's real time bank transfer system that allows near instant transfers between bank accounts.
      </p>
      <p className="text-muted-foreground mb-6">
        Some providers use Faster Payments for merchant payouts, which means funds can arrive in your account within hours rather than days. Not all providers support this, and it is worth asking during onboarding.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">SEPA</h3>
      <p className="text-muted-foreground mb-2">
        The Single Euro Payments Area, a system for transferring euros across participating European countries.
      </p>
      <p className="text-muted-foreground mb-6">
        If you sell in euro markets, SEPA determines how quickly you receive payouts. Transfers are typically completed within one business day. For UK businesses selling to European customers, SEPA matters for payout efficiency.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Instant Payouts</h3>
      <p className="text-muted-foreground mb-2">
        A feature offered by some providers that allows you to receive funds immediately rather than waiting for standard payout schedules.
      </p>
      <p className="text-muted-foreground mb-6">
        Instant payouts usually come with an additional fee. They can be valuable for businesses with tight cash flow requirements, but the cost needs to be weighed against the benefit.
      </p>


      {/* Section 3 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
        Acronyms Providers Talk About More Than Merchants Need To
      </h2>

      <p className="text-muted-foreground mb-6">
        These terms appear in almost every provider conversation, but they are structural concepts that rarely change whether you are approved, declined, or charged more. Understanding them at a high level is useful, but they are not the terms that should keep you up at night.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Interchange</h3>
      <p className="text-muted-foreground mb-2">
        The fee paid by your provider to the card issuing bank on every transaction.
      </p>
      <p className="text-muted-foreground mb-6">
        Interchange is set by Visa and Mastercard and varies by card type, region, and transaction method. You cannot negotiate interchange directly. What you can influence is the margin your provider charges on top. Unless you are on an interchange plus pricing model, you will never see this fee broken out.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Scheme Fees</h3>
      <p className="text-muted-foreground mb-2">
        Fees charged by{" "}
        <Link to="/insights/visa-mastercard-control-card-payments" className="text-primary hover:underline">Visa and Mastercard</Link>{" "}
        for using their network.
      </p>
      <p className="text-muted-foreground mb-6">
        Like interchange, scheme fees are non-negotiable. They are a small but unavoidable component of every card transaction. Most merchants on blended pricing never see them separately.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Tokenisation</h3>
      <p className="text-muted-foreground mb-2">
        The process of replacing sensitive card data with a unique token that can be stored and reused safely.
      </p>
      <p className="text-muted-foreground mb-6">
        Tokenisation is what allows one click payments, saved cards, and{" "}
        <Link to="/insights/apple-pay-google-pay-explained" className="text-primary hover:underline">wallet payments</Link>{" "}
        to work securely. It is important infrastructure, but it is handled entirely by your provider. Merchants do not need to manage it directly.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">PCI DSS</h3>
      <p className="text-muted-foreground mb-2">
        The Payment Card Industry Data Security Standard, a set of security requirements for handling card data.
      </p>
      <p className="text-muted-foreground mb-6">
        PCI compliance sounds intimidating, but most modern providers handle the heavy lifting for you. If you use a hosted checkout or payment form, your PCI scope is minimal. It is worth understanding your level of compliance, but it is rarely the reason a business succeeds or fails with payments.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Issuer vs Acquirer</h3>
      <p className="text-muted-foreground mb-2">
        The issuer is the bank that gave your customer their card. The{" "}
        <Link to="/insights/what-is-an-acquirer" className="text-primary hover:underline">acquirer</Link>{" "}
        is the bank or provider that processes the payment on your behalf.
      </p>
      <p className="text-muted-foreground mb-6">
        This distinction helps explain why payments are approved or declined. The issuer makes the final decision. But as a merchant, you interact only with your acquirer or payment provider. Knowing the difference is useful context, but it does not change how you operate day to day.
      </p>


      {/* Section 4 */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
        Acronyms That Matter Only as You Scale
      </h2>

      <p className="text-muted-foreground mb-6">
        These terms become important once your transaction volume, growth rate, or risk profile starts to increase. Early stage businesses rarely need to worry about them, but growing businesses should understand what they mean and when to act.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">PSD2 (Payment Services Directive 2)</h3>
      <p className="text-muted-foreground mb-2">
        The EU regulation that introduced SCA and opened the door for open banking.
      </p>
      <p className="text-muted-foreground mb-6">
        PSD2 is the regulatory framework behind most of the authentication rules that affect UK and EU merchants today. You do not need to read the regulation, but you should understand that SCA, TRA, and{" "}
        <Link to="/insights/low-value-transaction-exemption" className="text-primary hover:underline">low value exemptions</Link>{" "}
        all flow from it.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Low Value Exemption (LVT)</h3>
      <p className="text-muted-foreground mb-2">
        An SCA exemption that allows transactions under a certain threshold to bypass additional authentication.
      </p>
      <p className="text-muted-foreground mb-6">
        For businesses processing many small transactions, LVT exemptions can meaningfully improve approval rates. But not all providers request this exemption from issuers. If your average transaction value is low, it is worth asking whether your provider applies it.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">LTV Exemption (Low Transaction Value)</h3>
      <p className="text-muted-foreground mb-2">
        Often used interchangeably with LVT, this refers to the same{" "}
        <Link to="/insights/low-value-transaction-exemption" className="text-primary hover:underline">SCA exemption for small value payments</Link>.
      </p>
      <p className="text-muted-foreground mb-6">
        The terminology varies between providers, but the principle is the same. Payments below the threshold can be processed without full authentication, reducing friction for the buyer.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3DS Friction</h3>
      <p className="text-muted-foreground mb-2">
        The additional authentication step (3D Secure) that asks customers to verify their identity during checkout.
      </p>
      <p className="text-muted-foreground mb-6">
        3DS is how SCA is enforced in practice. While it improves security, every extra step at checkout increases the chance of abandonment. The best providers optimise 3DS by applying exemptions where possible and using the latest 3DS2 protocol for a smoother experience.
      </p>

      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Velocity Rules</h3>
      <p className="text-muted-foreground mb-2">
        Automated rules that flag or block transactions when activity exceeds expected patterns.
      </p>
      <p className="text-muted-foreground mb-6">
        Velocity rules are part of your provider's fraud and risk management. They can trigger temporary blocks on your account if your{" "}
        <Link to="/insights/why-accounts-get-flagged-after-growth" className="text-primary hover:underline">volume spikes suddenly</Link>{" "}
        or if transaction patterns change. As you grow, understanding how your provider sets these thresholds helps you avoid unnecessary disruption.
      </p>


      {/* Section 5: Mental Model */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
        A Simple Mental Model for Payment Acronyms
      </h2>

      <p className="text-muted-foreground mb-6">
        If you want to remember what matters without memorising a glossary, use this three bucket framework.
      </p>

      <div className="bg-muted/50 border border-border rounded-xl p-6 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Affects whether payments go through</h3>
        <p className="text-muted-foreground">
          MCC, SCA, TRA, Authorisation Rate, Soft vs Hard Decline, Chargeback Ratio, MATCH List
        </p>
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-6 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Affects when you get paid</h3>
        <p className="text-muted-foreground">
          Settlement, Payout, Rolling Reserve, Faster Payments, SEPA, Instant Payouts
        </p>
      </div>

      <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-2">Sounds important but rarely changes outcomes</h3>
        <p className="text-muted-foreground">
          Interchange, Scheme Fees, Tokenisation, PCI DSS, Issuer vs Acquirer
        </p>
      </div>

      <p className="text-muted-foreground mb-10">
        If you stay focused on the first two buckets, you are already better informed than most businesses navigating payments.
      </p>


      {/* Conclusion */}
      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">
        What to Do Next
      </h2>

      <p className="text-muted-foreground mb-6">
        Understanding which acronyms matter is a good starting point. But which ones apply to your business depends on your industry, volume, risk profile, and growth stage.
      </p>

      <p className="text-muted-foreground mb-6">
        A business processing 500 transactions a month has very different priorities from one processing 50,000. The terms that matter to a marketplace are not the same as those that matter to a subscription business.
      </p>

      <p className="text-muted-foreground mb-10">
        If you want to translate these concepts into a personalised provider recommendation, you can{" "}
        <Link to="/assessment" className="text-primary hover:underline font-medium">start a short assessment</Link>{" "}
        on ChosePayments. It is designed to surface which of these factors are most relevant to your business and match you with providers that align.
      </p>
    </InsightsArticleLayout>
  );
};

export default PaymentAcronymsExplained;
