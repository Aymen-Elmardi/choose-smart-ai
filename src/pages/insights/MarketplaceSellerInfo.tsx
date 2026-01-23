import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const MarketplaceSellerInfo = () => {
  return (
    <InsightsArticleLayout
      title="Marketplace Seller Verification: What Providers Need"
      description="Understanding why marketplace businesses face additional verification for seller and payout information."
      category={{ name: "Payment Risk", slug: "payment-risk" }}
      cluster="hub"
      currentSlug="marketplace-seller-info"
      keywords={["marketplace verification", "seller verification", "payment compliance", "payout verification"]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Marketplace Seller Verification: What Providers Need
      </h1>
      
      <div className="text-muted-foreground space-y-6">
        <p>
          Marketplaces are considered higher risk because they handle money on behalf of other people.
        </p>
        
        <p>
          Payment providers need to understand:
        </p>
        
        <ul className="list-disc pl-6 space-y-1">
          <li>Who the sellers are</li>
          <li>How payouts work</li>
          <li>Who is responsible for refunds and disputes</li>
        </ul>
        
        <p>
          This often leads to requests for:
        </p>
        
        <ul className="list-disc pl-6 space-y-1">
          <li>Seller agreements</li>
          <li>Payout schedules</li>
          <li>Platform terms and conditions</li>
        </ul>
        
        <p>
          If this information is missing or unclear, accounts can be delayed or restricted. Understanding <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">payment provider approval differences</Link> for marketplaces can help you prepare.
        </p>
        
        <p>
          <Link to="/best-payment-processor-uk" className="text-primary hover:underline">Choosing a UK payment processor</Link> that understands marketplaces from day one reduces this friction.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default MarketplaceSellerInfo;
