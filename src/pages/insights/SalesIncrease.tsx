import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const SalesIncrease = () => {
  return (
    <InsightsArticleLayout
      title="Sales Growth Triggers: Prepare for Reviews"
      description="Learn why sudden sales growth triggers additional document requests from payment providers."
      category={{ name: "Payment Risk", slug: "payment-risk" }}
      cluster="hub"
      currentSlug="sales-increase"
      keywords={["sales growth", "document requests", "payment verification", "scaling business"]}
      publishedTime="2026-01-15"
      modifiedTime="2026-04-13"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Sales Growth Triggers Document Requests: How to Prepare
      </h1>
      
      <div className="text-muted-foreground space-y-6">
        <p>
          Sudden growth can look risky from a payment provider's point of view.
        </p>
        
        <p>
          If your transaction volume increases quickly, the provider needs to check that:
        </p>
        
        <ul className="list-disc pl-6 space-y-1">
          <li>The growth is legitimate</li>
          <li>You can handle refunds or chargebacks</li>
          <li>There is no fraud or misuse of the account</li>
        </ul>
        
        <p>
          This is common for businesses that go viral, launch ads, or onboard many customers at once. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> vary in how they handle rapid scaling.
        </p>
        
        <p>
          Providers may ask for updated bank statements, forecasts, supplier contracts, or explanation of the growth.
        </p>
        
        <p>
          Planning for growth before it happens makes these reviews much smoother. <Link to="/best-payment-processor-uk" className="text-primary hover:underline">Choosing the right payment processor in the UK</Link> upfront helps you scale without interruption.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default SalesIncrease;
