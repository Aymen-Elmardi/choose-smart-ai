'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";

const WhatToDoWhenFundsHeld = () => {
  return (
    <InsightsArticleLayout
      title="What to Do When Your Payment Provider Holds Your Funds"
      description="Funds being held by your payment provider? Learn why holds happen, the difference between a hold and a freeze, and the steps to take to get your money released."
      category={{ name: "Crisis Intervention", slug: "crisis" }}
      cluster="crisis"
      currentSlug="what-to-do-when-funds-held"
      keywords={["funds held", "funds on hold", "payment hold", "money held", "frozen funds", "release funds"]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        What to Do When Your Payment Provider Holds Your Funds
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          Discovering that your payment provider is holding your funds is stressful — especially when you rely on those funds for payroll, suppliers, or day-to-day operations. But fund holds are common, usually temporary, and almost always resolvable if you respond correctly.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Hold vs Freeze vs Reserve: Understanding What's Happening</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>A hold</strong> means your provider has paused payouts while they review something. Your account is still active and may still be processing transactions.</li>
          <li><strong>A freeze</strong> means your provider has suspended your account — no processing, no payouts. This is more severe. Learn about <Link to="/insights/crisis/stripe-account-frozen" className="text-primary hover:underline">why Stripe freezes accounts</Link>.</li>
          <li><strong>A reserve</strong> is a planned withholding — a percentage of your settlements held as security. This is ongoing, not a response to a specific event. Learn about <Link to="/insights/why-providers-impose-reserves" className="text-primary hover:underline">why reserves are imposed</Link>.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Common Reasons Funds Are Held</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Sudden spike in transaction volume or average transaction value</li>
          <li>Increased chargeback or refund activity</li>
          <li>Product or service changes that weren't updated in your application</li>
          <li>Outstanding document requests (identity verification, proof of delivery, bank statements)</li>
          <li>Transactions flagged by automated risk systems</li>
          <li>Regulatory requirements (anti-money laundering checks)</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What to Do Immediately</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <strong>Check your email and provider dashboard.</strong> Most holds come with a notification explaining what's needed. Look for document requests or compliance notices.
          </li>
          <li>
            <strong>Respond quickly and completely.</strong> The single biggest factor in how long a hold lasts is how fast you provide what's requested. Partial responses reset the clock.
          </li>
          <li>
            <strong>Don't escalate emotionally.</strong> Risk teams respond to facts, not urgency. Provide clean documentation: bank statements, delivery confirmations, invoices, and a clear explanation of your business model.
          </li>
          <li>
            <strong>Document everything.</strong> Keep records of all communication, timestamps, and what you submitted. This protects you if the process takes longer than expected.
          </li>
          <li>
            <strong>Consider temporary alternatives.</strong> If cash flow is critical, having a backup provider is the best insurance. Multi-provider setups are standard for businesses processing meaningful volume.
          </li>
        </ol>

        <InlineAssessmentCTA
          context="Funds on hold more than once? It may be a provider mismatch. See which processors fit your risk profile."
          cta="Run your risk profile"
        />

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">How Long Do Holds Last?</h2>
        <p>
          Simple verification holds typically resolve within 1–5 business days once documents are submitted. More complex reviews — especially those involving card network inquiries or regulatory checks — can take 2–8 weeks.
        </p>
        <p>
          If your hold extends beyond 30 days without clear communication, escalate in writing and request a specific timeline and the name of the reviewing team.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">How to Prevent Future Holds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keep your provider informed of business changes <em>before</em> they happen — new products, higher volumes, market expansion</li>
          <li>Monitor your chargeback ratio and address disputes promptly</li>
          <li>Maintain documentation that demonstrates legitimate business activity</li>
          <li>Choose a provider whose <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">risk model</Link> matches your business type from the start</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaway</h2>
        <p>
          Fund holds are a risk management mechanism, not a judgement. Responding quickly with complete documentation is the fastest path to resolution. If holds happen repeatedly, the underlying issue is usually a mismatch between your business and your provider's risk appetite.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default WhatToDoWhenFundsHeld;
