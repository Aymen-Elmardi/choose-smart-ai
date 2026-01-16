import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import FAQSchema from "@/components/FAQSchema";
import heroImage from "@/assets/stripe-frozen-account-guide.jpg";

const StripeAccountFrozenGuide = () => {
  useSEO({
    title: "Stripe Account Frozen? 5 Hidden Reasons Why & How to Prevent the Next Freeze",
    description: "Funds held by Stripe? Learn the 5 hidden risk triggers (volume spikes, chargeback ratio) that cause freezes and how to find a stable provider."
  });

  const faqs = [
    {
      question: "Why was my Stripe account frozen?",
      answer: "Stripe freezes accounts when automated risk systems detect activity that exceeds their tolerance thresholds. Common triggers include sudden volume spikes, high chargeback ratios, business model changes, future delivery risk, or insufficient business transparency."
    },
    {
      question: "What should I do immediately when my Stripe account is frozen?",
      answer: "Check your email and Stripe dashboard for the freeze notification, gather documentation (invoices, shipping info, business registration, bank statements), and respond calmly and factually to all requests from the underwriting team."
    },
    {
      question: "What is a chargeback ratio and why does it matter?",
      answer: "Your chargeback ratio is the number of chargebacks divided by total transactions. When it exceeds 0.9% to 1.0%, it signals potential fraud or customer service issues and can trigger freezes initiated by Visa/Mastercard, not just Stripe."
    },
    {
      question: "How can I prevent my Stripe account from being frozen in the future?",
      answer: "Choose a payment provider whose risk appetite matches your business model. If your business has high ticket sizes, volume fluctuations, or involves future delivery, you need a provider with dedicated underwriting support rather than automated risk systems."
    },
    {
      question: "Can I get my funds back after a Stripe freeze?",
      answer: "Yes, by providing clear documentation proving legitimate business activity. However, a successful appeal only solves the immediate problem—you should also address the underlying risk mismatch to prevent future freezes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQSchema faqs={faqs} />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Risk & Freezes", slug: "payment-risk" }}
            currentTitle="Stripe Account Frozen Guide"
          />
          
          {/* Featured Image */}
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={heroImage} 
              alt="Frozen credit card representing a Stripe account freeze" 
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Stripe Account Frozen? The 5 Hidden Reasons Why (And How to Prevent the Next Freeze)
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              When your Stripe account is frozen, the immediate feeling is panic. Your revenue stream is cut off, and your funds are inaccessible. This is a business crisis, and your first priority is to stabilize the situation.
            </p>
            
            <p>
              While Stripe's communication often cites a breach of the Acceptable Use Policy or a "high-risk review," the underlying cause is almost always a predictable mismatch between your business's operational reality and Stripe's automated risk tolerance.
            </p>
            
            {/* Immediate Action Section */}
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-6">
              Immediate Action: What to Do When Funds are Frozen
            </h2>
            
            <p>Before you can address the root cause, you must initiate the recovery process.</p>
            
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong className="text-foreground">Check Your Email and Dashboard:</strong> Stripe will send a notification detailing the reason for the freeze (e.g., "account review," "funds hold," or "policy violation"). This is your only official communication.
              </li>
              <li>
                <strong className="text-foreground">Prepare Documentation:</strong> Proactively gather the documents they will inevitably request:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Invoices or contracts proving legitimate sales</li>
                  <li>Shipping or tracking information for recent high-value orders</li>
                  <li>Proof of business registration and director identity</li>
                  <li>Bank statements showing business activity</li>
                </ul>
              </li>
              <li>
                <strong className="text-foreground">Respond Calmly and Factually:</strong> Do not argue or express frustration. Provide clear, concise, and factual answers to every request. The goal is to satisfy the underwriter's need for information to release the funds.
              </li>
            </ol>
            
            {/* The 5 Hidden Reasons Section */}
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-6">
              The 5 Hidden Reasons Your Account Was Flagged
            </h2>
            
            <p>
              A freeze is rarely random. It is triggered by an automated system designed to protect the payment ecosystem from financial loss. Here are the five most common triggers that catch legitimate businesses off guard:
            </p>
            
            {/* Reason 1 */}
            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              1. The Sudden Volume Spike (The Growth Trap)
            </h3>
            <p>
              You had a successful marketing campaign or a viral product launch, leading to a sudden, massive increase in transaction volume.
            </p>
            <div className="bg-muted/50 border-l-4 border-primary p-4 my-4">
              <p className="text-foreground font-medium mb-2">The Insight:</p>
              <p>
                Stripe's risk model establishes a baseline for your business. A spike of 200% or more in a short period (e.g., 7 days) is flagged as a potential "bust-out fraud" attempt, where a fraudster processes a large volume of stolen cards before disappearing.
              </p>
            </div>
            
            {/* Reason 2 */}
            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              2. Mismatch Between Description and Reality (The Stealth Pivot)
            </h3>
            <p>
              You started selling one product (e.g., T-shirts) but gradually pivoted to another (e.g., high-ticket online courses or supplements) without updating your Merchant Category Code (MCC) or business description.
            </p>
            <div className="bg-muted/50 border-l-4 border-primary p-4 my-4">
              <p className="text-foreground font-medium mb-2">The Insight:</p>
              <p>
                Payment facilitators like Stripe operate within strict risk verticals. Moving into a higher-risk category (e.g., future delivery, regulated goods) without notifying them violates their terms and instantly triggers a manual review and potential freeze.
              </p>
            </div>
            
            {/* Reason 3 */}
            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              3. The Chargeback Ratio Creep (The Silent Killer)
            </h3>
            <p>
              Your chargeback ratio (the number of chargebacks divided by the number of transactions) has exceeded the acceptable threshold, typically 0.9% to 1.0% of total transactions.
            </p>
            <div className="bg-muted/50 border-l-4 border-primary p-4 my-4">
              <p className="text-foreground font-medium mb-2">The Insight:</p>
              <p>
                This is the most serious trigger. High chargebacks signal poor customer service, product quality issues, or, worst of all, fraud. The freeze is often initiated by the Card Schemes (Visa/Mastercard), not just Stripe, to protect the entire network.
              </p>
            </div>
            
            {/* Reason 4 */}
            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              4. Future Delivery Risk (The Subscription Liability)
            </h3>
            <p>
              Your business model involves collecting payment now for a service or product delivered far in the future (e.g., annual subscriptions, pre-orders, travel packages).
            </p>
            <div className="bg-muted/50 border-l-4 border-primary p-4 my-4">
              <p className="text-foreground font-medium mb-2">The Insight:</p>
              <p>
                This creates a significant financial liability. If your business fails before delivering the service, the payment provider is liable for all future refunds. Stripe's system will often hold a rolling reserve or freeze funds to cover this potential liability, especially if your business is new or rapidly growing.
              </p>
            </div>
            
            {/* Reason 5 */}
            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              5. Insufficient Business Transparency (The Underwriting Red Flag)
            </h3>
            <p>
              Your website lacks clear Terms & Conditions, a Refund Policy, or easily accessible contact information.
            </p>
            <div className="bg-muted/50 border-l-4 border-primary p-4 my-4">
              <p className="text-foreground font-medium mb-2">The Insight:</p>
              <p>
                Underwriters view transparency as a key indicator of a legitimate, stable business. Missing or poorly written policies are red flags that suggest a business is trying to obscure its operations, leading to a manual review and freeze.
              </p>
            </div>
            
            {/* Long-Term Solution Section */}
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-6">
              The Long-Term Solution: Preventing the Next Crisis
            </h2>
            
            <p>
              A successful appeal only solves the immediate problem. To prevent the next freeze, you must address the underlying{" "}
              <Link to="/insights/why-payment-accounts-get-frozen-without-warning" className="text-primary hover:underline">
                risk mismatch
              </Link>.
            </p>
            
            <p>
              Stripe and Square are excellent for low-risk, high-volume, standardised businesses. If your business falls into a niche, has high average ticket sizes, or involves future delivery, you are operating outside their ideal risk profile.
            </p>
            
            <p>
              The only way to ensure long-term stability is to be matched with a payment provider whose risk appetite is aligned with your business model. This means finding a provider that:
            </p>
            
            <ol className="list-decimal pl-6 space-y-2">
              <li>Understands your specific industry and its unique risk factors.</li>
              <li>Has a higher tolerance for your volume spikes or chargeback ratio.</li>
              <li>Offers a dedicated underwriting team that you can communicate with proactively.</li>
            </ol>
            
            {/* CTA Block */}
            <div className="mt-12 p-8 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-foreground font-semibold text-lg mb-4">
                Stop gambling with your revenue.
              </p>
              <p className="text-foreground mb-6">
                A freeze is a sign that your current provider is not a long-term fit. Find a provider that wants your business and can handle your growth without panic.
              </p>
              <Link 
                to="/assessment"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Use the ChosePayments 60-second assessment →
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Find a provider whose risk appetite actually matches your business.
              </p>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default StripeAccountFrozenGuide;
