'use client'
import { Link } from '@/lib/router-compat';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import HowToSchema from "@/components/HowToSchema";
import SourcesCitation, { Source } from "@/components/SourcesCitation";
import ArticleActions from "@/components/ArticleActions";

const proofOfBusinessSources: Source[] = [
  { name: "FCA Payment Services Regulations", url: "https://www.fca.org.uk/firms/", type: "regulatory" },
  { name: "Know Your Customer Laws (KYC)", url: "https://remedypayments.com/know-your-customer-laws-kyc-for-merchant-accounts/", type: "industry" },
  { name: "KYC Requirements for Banks", url: "https://resources.fenergo.com/blogs/understanding-kyc-requirements-for-banks", type: "industry" },
  { name: "What KYC is and Why It Matters", url: "https://plaid.com/resources/banking/what-is-kyc/", type: "educational" },
];

const howToSteps = [
  {
    name: "Understand what proof of business activity means",
    text: "Payment providers request this to confirm your business is real, active, and operating as described. It usually happens during onboarding or when account activity changes.",
  },
  {
    name: "Prepare your website and checkout",
    text: "Ensure you have a live website that clearly shows what you sell, along with screenshots of your checkout or app.",
  },
  {
    name: "Gather transaction evidence",
    text: "Collect recent invoices, customer receipts, marketing materials, or order confirmations to demonstrate active business operations.",
  },
  {
    name: "Make your business model clear",
    text: "Ensure your business model is easy to understand before applying to a provider. Vague or unfinished websites often cause problems.",
  },
];

const ProofOfBusinessActivity = () => {
  useSEO({
    title: "Understanding Proof of Business Activity Requests | ChosePayments",
    description: "Understanding why payment providers ask for proof of business activity and how to prepare your documentation."
  });

  return (
    <div className="min-h-screen bg-background">
      <HowToSchema
        name="How to Prepare Proof of Business Activity Documentation"
        description="Step-by-step guide to preparing and submitting proof of business activity to payment providers."
        steps={howToSteps}
        totalTime="PT15M"
      />
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Practical Guides", slug: "guides" }}
            currentTitle="Proof of Business Activity"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Understanding Proof of Business Activity Requests
          </h1>
          
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              When a payment provider asks for proof of business activity, they are trying to confirm that your business is real, active, and operating as described.
            </p>
            
            <p>
              This usually happens during onboarding or when something about your account changes. It does not automatically mean there is a problem.
            </p>
            
            <p>
              Proof of business activity often includes things like:
            </p>
            
            <p>
              A live website that clearly shows what you sell<br />
              Screenshots of your checkout or app<br />
              Recent invoices or customer receipts<br />
              Marketing materials or order confirmations
            </p>
            
            <p>
              Many businesses get stuck because their website is vague, unfinished, or does not clearly explain how money flows. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> vary in how strictly they assess business clarity.
            </p>
            
            <p>
              The safest way to avoid this is to make sure your business model is easy to understand before you apply to a provider. Our guide on <Link to="/best-payment-processor-uk" className="text-primary hover:underline">which UK payment processors are likely to approve you</Link> can help you find the right fit.
            </p>
            
            <p className="mt-12 pt-8 border-t border-border">
              If you want to avoid these issues before choosing a payment provider, you can start a{" "}
              <Link to="/assessment?start=true" replace className="text-primary hover:underline">
                short assessment
              </Link>.
            </p>
          </div>
          
          <SourcesCitation sources={proofOfBusinessSources} />

          {/* Share & Like Actions */}
          <ArticleActions
            slug="proof-of-business-activity"
            title="Proof of Business Activity: What It Means and How to Respond"
            className="mt-8 pt-6 border-t border-border"
          />
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProofOfBusinessActivity;
