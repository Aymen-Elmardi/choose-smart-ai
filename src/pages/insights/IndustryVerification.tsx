import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const IndustryVerification = () => {
  return (
    <InsightsArticleLayout
      title="High-Risk Industry Verification Explained"
      description="Understanding why certain industries face additional verification requirements from payment providers."
      category={{ name: "Payment Risk", slug: "payment-risk" }}
      cluster="hub"
      currentSlug="industry-verification"
      keywords={["high-risk industries", "payment verification", "industry compliance", "payment provider approval"]}
      publishedTime="2026-01-15"
      modifiedTime="2026-04-13"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        High-Risk Industries Face Extra Verification: Is Yours One?
      </h1>
      
      <div className="text-muted-foreground space-y-6">
        <p>
          Some industries trigger additional checks because they historically have higher refund rates or disputes.
        </p>
        
        <p>
          This does not mean your business is doing anything wrong.
        </p>
        
        <p>
          Common examples include:
        </p>
        
        <ul className="list-disc pl-6 space-y-1">
          <li>Subscription services</li>
          <li>Digital products</li>
          <li>Travel and hospitality</li>
          <li>Marketplaces</li>
        </ul>
        
        <p>
          Providers may ask for more documents to understand delivery, refund policies, or customer agreements. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> differ by industry.
        </p>
        
        <p>
          The right provider can make a big difference depending on your industry. Our guide on <Link to="/best-payment-processor-uk" className="text-primary hover:underline">which UK payment processors are likely to approve you</Link> covers industry-specific considerations.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default IndustryVerification;
