'use client'
import Link from 'next/link';
import ArticleByline from "@/components/ArticleByline";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import HowToSchema from "@/components/HowToSchema";
import SourcesCitation, { Source } from "@/components/SourcesCitation";
import ArticleActions from "@/components/ArticleActions";

const sourceOfFundsSources: Source[] = [
  { name: "FCA Payment Services Regulations", url: "https://www.fca.org.uk/firms/payment-services-regulations-e-money-regulations", type: "regulatory" },
  { name: "AML Requirements for Payment Processors", url: "https://amlsquare.com/blog/aml-requirements-for-payment-processors-complete-guide/", type: "industry" },
  { name: "FINRA Anti-Money Laundering (AML)", url: "https://www.finra.org/rules-guidance/key-topics/aml", type: "regulatory" },
  { name: "FDIC Bank Secrecy Act (BSA/AML)", url: "https://www.fdic.gov/banker-resource-center/anti-money-laundering-countering-financing-terrorism-amlcft", type: "regulatory" },
];

const howToSteps = [
  {
    name: "Understand what source of funds means",
    text: "Source of funds refers to where the money in your account comes from. Providers ask for this to comply with financial regulations and prevent money laundering.",
  },
  {
    name: "Prepare your documentation",
    text: "Gather business bank statements, personal statements for new businesses, and explanations for any large deposits.",
  },
  {
    name: "Separate personal and business finances",
    text: "Having clean separation between personal and business finances significantly reduces friction during source of funds reviews.",
  },
];

const SourceOfFunds = () => {

  return (
    <div className="min-h-screen bg-background">
      <HowToSchema
        name="How to Respond to Source of Funds Requests"
        description="Understanding and preparing for payment provider source of funds documentation requirements."
        steps={howToSteps}
        totalTime="PT10M"
      />
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Guides", slug: "guides" }}
            currentTitle="Source of Funds"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Source of Funds Requests: What They Mean and How to Respond
          </h1>
          

          
          <ArticleByline />
          <div className="prose prose-lg text-foreground/80 space-y-6">
            <p>
              "Source of funds" simply means where the money in your account comes from.
            </p>
            
            <p>
              Providers ask for this to comply with financial regulations and prevent money laundering.
            </p>
            
            <p>
              They may request:
            </p>
            
            <p>
              Business bank statements<br />
              Personal statements for new businesses<br />
              Explanation of large deposits
            </p>
            
            <p>
              This usually happens for new businesses or when volumes change. Different providers have varying requirements, so understanding <Link href="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">how Stripe, Square, and PayPal assess risk</Link> can help you prepare.
            </p>
            
            <p>
              Having clean separation between personal and business finances helps a lot here. <Link href="/best-payment-processor-uk" className="text-primary hover:underline">Choosing the right payment processor in the UK</Link> from the start can reduce these friction points.
            </p>

            {/* Merged from /insights/why-payment-providers-ask-for-source-of-funds (M5a,
                Section 5). Only sections this page did not already cover. */}
            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why this request often appears after growth
            </h2>

            <p>
              Many businesses first encounter source of funds checks after a positive change, such as:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>A sudden increase in monthly processing</li>
              <li>Larger than usual transactions</li>
              <li>New customer types or markets</li>
              <li>A shift from low volume testing to real commercial activity</li>
            </ul>

            <p>
              From a provider&apos;s perspective, growth increases exposure. That means deeper checks are required.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why providers cannot rely on your original application
            </h2>

            <p>
              When you first applied for a payment account, your expected volumes and business model were estimates.
            </p>

            <p>
              Once real money starts moving, providers are required to confirm that reality matches those expectations.
              Source of funds checks help them verify that your activity aligns with what was originally approved.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Other evidence providers may ask for
            </h2>

            <p>
              Beyond bank statements, requests commonly include:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Contracts or invoices with customers</li>
              <li>Proof of business income or investment</li>
              <li>Explanations of how the business was funded initially</li>
            </ul>

            <p>
              These requests are standard and usually proportional to the level of activity.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What this does and does not indicate
            </h2>

            <p>
              This does indicate that your provider is monitoring activity as required by regulation.
            </p>

            <p>
              This does not automatically mean your account is at risk. Most accounts continue operating normally once
              the information is reviewed.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Common mistakes that cause delays
            </h2>

            <p>
              Problems usually arise when:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Responses are incomplete or vague</li>
              <li>Documents do not match transaction patterns</li>
              <li>Information conflicts with earlier disclosures</li>
            </ul>

            <p>
              Clear and consistent explanations matter more than volume of documentation.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              How to respond calmly and effectively
            </h2>

            <p>
              The best approach is to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Explain the business model in simple terms</li>
              <li>Match documents to actual activity</li>
              <li>Respond within the requested timeframe</li>
            </ul>

            <p>
              If growth or behaviour has changed, transparency helps more than silence.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why this check protects both sides
            </h2>

            <p>
              Source of funds reviews protect payment providers from regulatory risk, but they also protect businesses
              from sudden account restrictions caused by unanswered questions.
            </p>

            <p className="mt-12 pt-8 border-t border-border">
              If you want to avoid these issues before choosing a payment provider, you can start a{" "}
              <Link href="/assessment?start=true" replace className="text-primary hover:underline">
                short assessment
              </Link>.
            </p>
          </div>
          
          <SourcesCitation sources={sourceOfFundsSources} />

          {/* Share & Like Actions */}
          <ArticleActions
            slug="source-of-funds"
            title="Source of Funds: What It Means and How to Respond"
            className="mt-8 pt-6 border-t border-border"
          />
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default SourceOfFunds;
