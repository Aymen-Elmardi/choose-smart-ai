import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";

const PayoutSettlementExplained = () => {
  return (
    <InsightsArticleLayout
      title="Payout Settlement Timing Explained"
      description="Learn why the amount you receive from your payment provider rarely matches your daily sales, and how fees, reserves, chargebacks, and settlement timing create payout discrepancies."
      category={{ name: "Explainer", slug: "explainer" }}
      cluster="hub"
      currentSlug="payout-settlement-explained"
      keywords={["payout", "settlement", "payout mismatch", "net settlement", "gross settlement", "fees deducted"]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Why Your Payout Doesn't Match Your Sales: Settlement Timing Explained
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          If you've ever compared your daily sales to the amount landing in your bank account and found they don't match, you're not alone. Payout discrepancies are one of the most common sources of confusion for merchants — and they're almost always explainable.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Net Settlement vs Gross Settlement</h2>
        <p>
          Most payment providers use <strong>net settlement</strong>: they deduct processing fees, chargebacks, and reserves before paying you. This means your payout is always less than your gross sales.
        </p>
        <p>
          Some providers offer <strong>gross settlement</strong>, where they pay you the full transaction amount and invoice fees separately. This is more common with enterprise providers and gives better cash flow visibility but requires you to manage fee payments independently.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Gets Deducted From Your Payout</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Processing fees:</strong> Per-transaction charges, percentage fees, and any monthly minimums</li>
          <li><strong>Chargeback deductions:</strong> The full disputed amount plus chargeback fees (typically £15–25 per dispute)</li>
          <li><strong>Reserves:</strong> If you have a <Link to="/insights/rolling-vs-fixed-reserve" className="text-primary hover:underline">rolling or fixed reserve</Link>, a portion of each settlement is withheld</li>
          <li><strong>Refunds:</strong> Refunds issued are deducted from your next settlement, not charged back to the original transaction date</li>
          <li><strong>Currency conversion fees:</strong> If you accept international payments, FX margins are deducted at settlement</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Settlement Timing Creates Confusion</h2>
        <p>
          Most providers batch transactions and settle them T+1 to T+3 (one to three business days after the transaction). But weekends, bank holidays, and provider cut-off times mean your Monday sales might land on Wednesday or Thursday.
        </p>
        <p>
          This batching also means a single payout may include transactions from multiple days — or exclude transactions processed late in the day. Learn more about <Link to="/insights/same-day-settlement-and-instant-payouts" className="text-primary hover:underline">same-day settlement options</Link>.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">How to Reconcile Payouts</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Download settlement reports from your provider dashboard — they break down exactly what was deducted</li>
          <li>Match by settlement date, not transaction date</li>
          <li>Track chargebacks and refunds separately — they create negative entries in future settlements</li>
          <li>If using multiple payment methods, each may settle on different schedules</li>
        </ul>

        <InlineAssessmentCTA
          context="Struggling with payout discrepancies? See which providers offer better settlement transparency for your business."
          cta="Run your risk profile"
        />

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">When Payout Mismatches Signal a Real Problem</h2>
        <p>
          Most discrepancies are normal. But if payouts stop entirely, amounts drop dramatically without explanation, or you notice deductions you can't identify, contact your provider immediately. Unexplained holds may indicate a <Link to="/insights/why-payment-accounts-get-frozen-without-warning" className="text-primary hover:underline">risk review or account freeze</Link>.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaway</h2>
        <p>
          Payout mismatches are normal and almost always explained by fees, reserves, refunds, and settlement timing. Understanding how your provider calculates payouts removes the surprise and helps you manage cash flow effectively.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default PayoutSettlementExplained;
