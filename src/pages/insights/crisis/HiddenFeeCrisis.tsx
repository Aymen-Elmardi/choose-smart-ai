import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const HiddenFeeCrisis = () => {
  useSEO({
    title: "The Hidden Fee Crisis: How Your 'Low Rate' Payment Processor is Costing You Thousands | ChosePayments",
    description: "Your headline rate isn't your real cost. Learn how to calculate your Effective Rate and uncover the 5 hidden fees quietly draining your profits."
  });

  return (
    <InsightsArticleLayout
      title="The Hidden Fee Crisis"
      category={{ name: "Crisis Intervention", slug: "crisis" }}
      cluster="crisis"
      currentSlug="hidden-fee-crisis"
      ctaVariant="default"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        The Hidden Fee Crisis: How Your 'Low Rate' Payment Processor is Quietly Costing You Thousands
      </h1>
      
      <div className="text-muted-foreground space-y-6">
        <p className="text-lg">
          You signed up for a payment processor advertising a competitive rate—perhaps "1.4% + 20p" or a flat 2.9%. Yet, when your monthly statement arrives, the total fees deducted are significantly higher than you calculated. This is the <strong className="text-foreground">Hidden Fee Crisis</strong>, and it is costing businesses thousands every year.
        </p>
        
        <p>
          The problem is the fundamental difference between the <strong className="text-foreground">Headline Rate</strong> and your business's <strong className="text-foreground">Effective Rate</strong>.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          The Illusion of the Headline Rate
        </h2>
        
        <p>
          The rate advertised by most providers is the best-case scenario, often applying only to specific card types (e.g., domestic debit cards) or specific transaction volumes.
        </p>
        
        <p>
          The reality is that payment processing is a complex ecosystem with multiple layers of cost, and the headline rate rarely covers them all.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Calculating Your True Cost: The Effective Rate
        </h2>
        
        <p>
          The only metric that matters is your <strong className="text-foreground">Effective Rate</strong>. This is the true percentage of your total sales that goes toward payment processing fees.
        </p>
        
        <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
          <p className="text-center font-mono text-foreground">
            Effective Rate = (Total Fees Paid ÷ Total Transaction Volume) × 100
          </p>
        </div>
        
        <p>
          If your headline rate is 1.4% but your Effective Rate is 2.5%, you are overpaying by 1.1% on every transaction. For a business processing £100,000 annually, that is an extra <strong className="text-foreground">£1,100 in hidden costs</strong>.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          5 Fees That Quietly Inflate Your Effective Rate
        </h2>
        
        <p>
          The following fees are often excluded from the headline rate and are the primary culprits behind the financial shock on your monthly statement:
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          1. Interchange and Assessment Fees
        </h3>
        <p>
          These are the fees charged by the card-issuing bank (Interchange) and the card scheme (Assessment, e.g., Visa/Mastercard).
        </p>
        <div className="bg-primary/5 border-l-4 border-primary p-4 my-4">
          <p className="text-foreground">
            <strong>The Insight:</strong> These fees are non-negotiable and vary based on the card type (e.g., premium credit cards cost more than standard debit cards) and how the card was taken (e.g., online transactions cost more than in-person transactions). Processors that offer a "blended" rate often hide these fluctuations, charging you a high average even when a cheaper card is used.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          2. Cross-Border and Currency Conversion Fees
        </h3>
        <p>
          If you sell to customers outside your home country (even within the EU), you will incur these fees.
        </p>
        <div className="bg-primary/5 border-l-4 border-primary p-4 my-4">
          <p className="text-foreground">
            <strong>The Insight:</strong> A transaction is considered "cross-border" if the cardholder's bank is in a different country than your acquiring bank. These fees can add 0.5% to 1.5% to the transaction cost, significantly inflating your Effective Rate if you have a global customer base. Learn more about <Link to="/insights/international-sales" className="text-primary hover:underline">international sales verification</Link>.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          3. PCI Compliance Fees
        </h3>
        <p>
          The Payment Card Industry Data Security Standard (PCI DSS) is mandatory. Many processors charge a monthly or annual fee for "PCI Compliance" or "Non-Compliance."
        </p>
        <div className="bg-primary/5 border-l-4 border-primary p-4 my-4">
          <p className="text-foreground">
            <strong>The Insight:</strong> This is often a pure profit center for the processor. While compliance is necessary, the fee itself is a hidden administrative cost that has nothing to do with the transaction rate.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          4. Refund and Chargeback Fees
        </h3>
        <p>
          While a <Link to="/insights/chargebacks-what-they-are-and-how-to-avoid-them" className="text-primary hover:underline">chargeback</Link> is a crisis in itself, the fees associated with them are a hidden cost.
        </p>
        <div className="bg-primary/5 border-l-4 border-primary p-4 my-4">
          <p className="text-foreground">
            <strong>The Insight:</strong> Most processors charge a flat fee (e.g., £15-£25) for every chargeback, regardless of whether you win or lose the dispute. Crucially, many also charge a small fee for processing a simple refund, which can add up quickly for businesses with high return rates.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          5. Statement and Gateway Fees
        </h3>
        <p>
          These are recurring administrative fees for providing the service, such as a monthly statement fee, a gateway fee, or a minimum monthly processing fee.
        </p>
        <div className="bg-primary/5 border-l-4 border-primary p-4 my-4">
          <p className="text-foreground">
            <strong>The Insight:</strong> These flat fees disproportionately affect smaller businesses. If you process £1,000 a month and pay a £20 monthly fee, that single fee adds 2% to your Effective Rate before any transaction costs are even applied.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          End the Crisis: Demand True Cost Transparency
        </h2>
        
        <p>
          The only way to avoid the Hidden Fee Crisis is to get a comparison that is tailored to your business's specific operational profile—not a generic, one-size-fits-all headline rate.
        </p>
        
        <p>You need a partner who can analyze:</p>
        
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li>Your typical card mix (debit vs. credit, domestic vs. international).</li>
          <li>Your average transaction value (to optimize the percentage vs. per-transaction fee split).</li>
          <li>Your refund and chargeback history (to factor in associated costs).</li>
        </ol>
        
        <p className="mt-6">
          A provider that is a perfect fit for a coffee shop will be a financial disaster for an e-commerce subscription service. The difference is in the Effective Rate.
        </p>
        
        <p className="text-foreground font-semibold mt-8 text-lg">
          Stop paying more than you should. Your current processor is optimized for their profit, not yours.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default HiddenFeeCrisis;
