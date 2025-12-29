import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const MarketplaceSellerInfo = () => {
  useSEO({
    title: "Why Marketplaces Are Asked for Seller and Payout Information | ChosePayments",
    description: "Understanding why marketplace businesses face additional verification for seller and payout information."
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Marketplaces Are Asked for Seller and Payout Information
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              Marketplaces are considered higher risk because they handle money on behalf of other people.
            </p>
            
            <p>
              Payment providers need to understand:
            </p>
            
            <p>
              Who the sellers are<br />
              How payouts work<br />
              Who is responsible for refunds and disputes
            </p>
            
            <p>
              This often leads to requests for:
            </p>
            
            <p>
              Seller agreements<br />
              Payout schedules<br />
              Platform terms and conditions
            </p>
            
            <p>
              If this information is missing or unclear, accounts can be delayed or restricted.
            </p>
            
            <p>
              Choosing a provider that understands marketplaces from day one reduces this friction.
            </p>
            
            <p className="mt-12 pt-8 border-t border-border">
              If you want to avoid these issues before choosing a payment provider, you can start a{" "}
              <Link to="/quiz?start=true" className="text-primary hover:underline">
                short assessment
              </Link>.
            </p>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketplaceSellerInfo;
