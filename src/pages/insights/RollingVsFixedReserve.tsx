import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";

const RollingVsFixedReserve = () => {
  return (
    <InsightsArticleLayout
      title="Rolling vs Fixed Reserve: Merchant Guide"
      description="Understand the difference between rolling and fixed reserves, how each affects your cash flow, and which reserve type you're most likely to encounter."
      category={{ name: "Explainer", slug: "explainer" }}
      cluster="hub"
      currentSlug="rolling-vs-fixed-reserve"
      keywords={["rolling reserve", "fixed reserve", "upfront reserve", "reserve release", "cash flow"]}
      publishedTime="2026-01-15"
      modifiedTime="2026-04-13"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Rolling Reserve vs Fixed Reserve: What Merchants Need to Know
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          When a payment provider imposes a reserve on your account, the type of reserve determines how much cash is locked, for how long, and how it affects your day-to-day operations.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is a Rolling Reserve?</h2>
        <p>
          A rolling reserve withholds a fixed percentage of each settlement — typically 5% to 10% — and holds it for a defined period, usually 90 to 180 days. After the holding period, funds are released on a rolling basis.
        </p>
        <p>
          For example, with a 10% rolling reserve on a 180-day hold, funds processed in January become available in July. The reserve balance rises as you process more, then stabilises once the oldest funds begin releasing.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">What Is a Fixed Reserve?</h2>
        <p>
          A fixed reserve (sometimes called an upfront reserve or minimum reserve) requires you to deposit a set amount before processing begins — or the provider withholds settlements until the target is reached.
        </p>
        <p>
          Fixed reserves are more common for businesses with elevated risk profiles, those recovering from compliance issues, or merchants entering <Link to="/insights/scheme-rules-reserves-monitoring" className="text-primary hover:underline">card network monitoring programs</Link>.
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
          Yes. After demonstrating consistent low-risk processing — typically 3 to 6 months — many providers will review reserve terms on request. Learn more about <Link to="/insights/why-providers-impose-reserves" className="text-primary hover:underline">how to negotiate reserves</Link>.
        </p>
        <p>
          If reserve terms are a dealbreaker, consider providers whose <Link to="/insights/payment-provider-risk-models" className="text-primary hover:underline">risk models</Link> align better with your business type — some providers specialise in categories that others over-reserve.
        </p>

        <InlineAssessmentCTA
          context="Want to find providers that won't impose excessive reserves on your business?"
          cta="Get your risk profile"
        />

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Key Takeaway</h2>
        <p>
          Understanding which type of reserve you're subject to — and why — is essential for managing cash flow and choosing the right provider. Reserves are negotiable, and the right provider match can eliminate the need for excessive reserves entirely.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default RollingVsFixedReserve;
