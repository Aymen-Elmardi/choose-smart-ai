'use client'
import Link from 'next/link';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ArticleByline from "@/components/ArticleByline";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";

const RollingVsFixedReserve = () => {
  return (
    <InsightsArticleLayout
      title="Rolling Reserve vs Fixed Reserve: What Merchants Need to Know"
      description="Understand the difference between rolling and fixed reserves, how each affects your cash flow, and which reserve type you're most likely to encounter."
      category={{ name: "Payment Risk", slug: "payment-risk" }}
      cluster="hub"
      currentSlug="rolling-vs-fixed-reserve"
      keywords={["rolling reserve", "fixed reserve", "upfront reserve", "reserve release", "cash flow"]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Rolling Reserve vs Fixed Reserve: What Merchants Need to Know
      </h1>
      <ArticleByline />
      <div className="text-muted-foreground space-y-6">
        <p>
          When a payment provider imposes a reserve on your account, the type of reserve determines how much cash is locked, for how long, and how it affects your day-to-day operations.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is a Rolling Reserve?</h2>
        <p>
          A rolling reserve withholds a fixed percentage of each settlement (typically 5% to 10%) and holds it for a defined period, usually 90 to 180 days. After the holding period, funds are released on a rolling basis.
        </p>
        <p>
          For example, with a 10% rolling reserve on a 180-day hold, funds processed in January become available in July. The reserve balance rises as you process more, then stabilises once the oldest funds begin releasing.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is a Fixed Reserve?</h2>
        <p>
          A fixed reserve (sometimes called an upfront reserve or minimum reserve) requires you to deposit a set amount before processing begins, or the provider withholds settlements until the target is reached.
        </p>
        <p>
          Fixed reserves are more common for businesses with elevated risk profiles, those recovering from compliance issues, or merchants entering <Link href="/insights/scheme-rules-reserves-monitoring" className="text-primary hover:underline">card network monitoring programs</Link>.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">How They Compare</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-semibold text-foreground">Feature</th>
                <th className="text-left p-3 font-semibold text-foreground">Rolling Reserve</th>
                <th className="text-left p-3 font-semibold text-foreground">Fixed Reserve</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3">How it's funded</td>
                <td className="p-3">% of each settlement</td>
                <td className="p-3">Lump sum or withheld settlements</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Release schedule</td>
                <td className="p-3">Rolling (oldest funds first)</td>
                <td className="p-3">On request or after review period</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Cash flow impact</td>
                <td className="p-3">Gradual, predictable</td>
                <td className="p-3">Immediate and significant</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Common for</td>
                <td className="p-3">Most merchant categories</td>
                <td className="p-3">High-risk or compliance recovery</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Which Is Worse for Cash Flow?</h2>
        <p>
          Fixed reserves hit harder upfront but are finite. Rolling reserves feel lighter initially but can accumulate to significant amounts as volume grows. A business processing £100,000/month with a 10% rolling reserve on a 180-day hold will have approximately £60,000 locked at any given time.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Can You Negotiate Reserve Terms?</h2>
        <p>
          Yes. After demonstrating consistent low-risk processing (typically 3 to 6 months), many providers will review reserve terms on request. Learn more about <a href="#negotiate-or-reduce-a-reserve" className="text-primary hover:underline">how to negotiate reserves</a>.
        </p>
        <p>
          If reserve terms are a dealbreaker, consider providers whose <Link href="/insights/payment-provider-risk-models" className="text-primary hover:underline">risk models</Link> align better with your business type, some providers specialise in categories that others over-reserve.
        </p>

        <InlineAssessmentCTA
          context="Want to find providers that won't impose excessive reserves on your business?"
        />

        {/* Merged from /insights/why-providers-impose-reserves (M5b, Section 5).
            Only what this page did not already cover; added before the closing
            Key Takeaway, existing sections unchanged. */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Why Providers Impose Reserves</h2>
        <p>
          A reserve is money your payment provider withholds from your settlements as a safeguard against future chargebacks, refunds, or regulatory action. Providers are financially liable for chargebacks even after funds have been paid out to you. If your business generates disputes that exceed your balance, the provider absorbs the loss. Reserves exist to offset that exposure.
        </p>
        <p>Common triggers include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>High chargeback ratios (approaching or exceeding 1%)</li>
          <li>Rapid volume growth that outpaces your underwriting profile</li>
          <li>Long delivery timescales creating extended refund windows</li>
          <li>Operating in industries classified as higher risk (travel, events, subscriptions)</li>
          <li>Entering <Link href="/insights/scheme-rules-reserves-monitoring" className="text-primary hover:underline">Visa or Mastercard monitoring programs</Link></li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Capped Rolling Reserves</h2>
        <p>
          Some providers also use <strong>capped rolling reserves</strong>, which stop withholding once a target balance is reached. Understanding which type you&apos;re subject to is the first step toward negotiating it down.
        </p>

        <h2 id="negotiate-or-reduce-a-reserve" className="text-2xl font-semibold text-foreground mt-10 mb-4 scroll-mt-28">How to Negotiate or Reduce a Reserve</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Build a clean track record:</strong> 3–6 months of low chargebacks and stable volume gives you leverage to request a review.</li>
          <li><strong>Provide documentation proactively:</strong> Share delivery confirmation data, customer service metrics, and refund policies.</li>
          <li><strong>Request a formal reserve review:</strong> Many providers will reassess reserves quarterly if asked, but rarely volunteer it.</li>
          <li><strong>Compare terms across providers:</strong> If a competitor offers lower reserves, use that as a negotiation tool. Some providers offer <Link href="/insights/pricing-models/interchange-plus-plus" className="text-primary hover:underline">interchange++ pricing</Link> with more favourable reserve terms for established businesses.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">When Reserves Become a Problem</h2>
        <p>
          Reserves strain cash flow, especially for businesses with thin margins or seasonal revenue. If your reserve is absorbing 10% of revenue on a 180-day hold, you&apos;re effectively lending your provider six months of working capital interest-free.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaway</h2>
        <p>
          Understanding which type of reserve you're subject to (and why) is essential for managing cash flow and choosing the right provider. Reserves are negotiable, and the right provider match can eliminate the need for excessive reserves entirely.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default RollingVsFixedReserve;
