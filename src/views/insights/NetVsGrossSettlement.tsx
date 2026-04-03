'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const NetVsGrossSettlement = () => {
  return (
    <InsightsArticleLayout
      title="Net vs Gross Settlement: How Payment Providers Calculate Your Payout"
      description="Understand the difference between net and gross settlement, how each model affects your cash flow, and which providers offer which approach."
      category={{ name: "Explainer", slug: "explainer" }}
      cluster="hub"
      currentSlug="net-vs-gross-settlement"
      keywords={["net settlement", "gross settlement", "payout", "settlement model", "fees deducted"]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Net vs Gross Settlement: How Payment Providers Calculate Your Payout
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          How your payment provider settles funds to your bank account is one of the most important operational details in your payment setup — and one of the least discussed.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is Net Settlement?</h2>
        <p>
          With net settlement, your provider deducts all fees, chargebacks, refunds, and reserves before transferring funds to your bank account. The amount you receive is the "net" — what's left after all deductions.
        </p>
        <p>
          This is the default model for most providers including Stripe, PayPal, and Square. It's simpler because you receive a single deposit with everything already accounted for.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is Gross Settlement?</h2>
        <p>
          With gross settlement, the provider pays you the full transaction amount and invoices fees separately — typically monthly. This gives you access to 100% of your sales revenue upfront, with fees paid as a separate line item.
        </p>
        <p>
          Enterprise providers like <Link to="/insights/adyen-enterprise-payments-platform" className="text-primary hover:underline">Adyen</Link> and <Link to="/insights/checkout-com-enterprise-platform" className="text-primary hover:underline">Checkout.com</Link> commonly offer gross settlement for qualified merchants.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">How They Compare</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-semibold text-foreground">Feature</th>
                <th className="text-left p-3 font-semibold text-foreground">Net Settlement</th>
                <th className="text-left p-3 font-semibold text-foreground">Gross Settlement</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3">What you receive</td>
                <td className="p-3">Sales minus all deductions</td>
                <td className="p-3">Full transaction amount</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Fee payment</td>
                <td className="p-3">Deducted automatically</td>
                <td className="p-3">Invoiced separately</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Cash flow</td>
                <td className="p-3">Lower daily deposits</td>
                <td className="p-3">Higher daily deposits, separate fee liability</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Reconciliation</td>
                <td className="p-3">More complex (deductions embedded)</td>
                <td className="p-3">Cleaner (fees separated)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Typical providers</td>
                <td className="p-3">Stripe, PayPal, Square</td>
                <td className="p-3">Adyen, Checkout.com, traditional acquirers</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Which Is Better for Your Business?</h2>
        <p>
          <strong>Net settlement</strong> works well for smaller businesses that want simplicity. Everything is handled in one deposit, and your accounting only needs to track incoming payments.
        </p>
        <p>
          <strong>Gross settlement</strong> benefits larger businesses that need maximum cash flow flexibility and have the finance team to manage separate fee invoices. It's also easier to audit because you can see exactly what you're being charged without reverse-engineering deductions.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Why This Matters for Payout Reconciliation</h2>
        <p>
          If you're using net settlement and your <Link to="/insights/payout-settlement-explained" className="text-primary hover:underline">payouts don't match your sales</Link>, the gap is almost certainly fees, reserves, and timing — not an error. Understanding your settlement model is the first step to eliminating confusion about where your money is.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaway</h2>
        <p>
          Your settlement model directly affects cash flow visibility and reconciliation complexity. Choose the model that matches your operational capacity — and if your current provider only offers net settlement, that's worth considering when evaluating alternatives.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default NetVsGrossSettlement;
