import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const InternationalSales = () => {
  return (
    <InsightsArticleLayout
      title="International Sales and Payment Provider Checks: What to Expect"
      description="Learn why selling internationally can trigger additional verification from payment providers."
      category={{ name: "Payment Risk", slug: "payment-risk" }}
      cluster="hub"
      currentSlug="international-sales"
      keywords={["international sales", "cross-border payments", "payment verification", "global commerce"]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        International Sales and Payment Provider Checks: What to Expect
      </h1>
      
      <div className="text-muted-foreground space-y-6">
        <p>
          Selling internationally adds complexity.
        </p>
        
        <p>
          Payment providers need to understand:
        </p>
        
        <ul className="list-disc pl-6 space-y-1">
          <li>Where customers are located</li>
          <li>Which countries money flows through</li>
          <li>Whether taxes and regulations are followed</li>
        </ul>
        
        <p>
          You may be asked for:
        </p>
        
        <ul className="list-disc pl-6 space-y-1">
          <li>Details about overseas suppliers</li>
          <li>Shipping policies</li>
          <li>Customer locations</li>
        </ul>
        
        <p>
          Even small amounts of international sales can trigger this. Understanding <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">payment provider approval differences</Link> helps you anticipate these requirements.
        </p>
        
        <p>
          Being upfront about international activity avoids surprises later. <Link to="/best-payment-processor-uk" className="text-primary hover:underline">Choosing the right payment processor in the UK</Link> that supports international sales from the start is essential.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default InternationalSales;
