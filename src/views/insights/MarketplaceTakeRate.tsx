'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

/**
 * Single source of truth for this article's FAQ: the accordion and the FAQPage
 * JSON-LD both render from this array, so the visible copy and the structured
 * data cannot drift apart.
 */
const faqItems = [
  {
    question: "What is a good take rate for a new marketplace?",
    answer: "Most established multi-vendor marketplaces land somewhere between 10% and 20%, but the right number depends heavily on your specific category. It's generally easier to start conservative and raise your rate gradually than to launch high and have to walk it back.",
  },
  {
    question: "Should I charge the buyer, the seller, or both?",
    answer: "Most marketplaces charge the side that needs the platform more. Since most marketplaces are demand-constrained, meaning sellers show up once there are enough buyers, sellers typically absorb the fee. Marketplaces that are supply-constrained sometimes shift more of the cost to buyers instead.",
  },
  {
    question: "Why do take rates vary so much between industries?",
    answer: "Mainly seller margins and transaction size. Categories where sellers already operate on thin margins, like ride-sharing or food delivery, tend to have lower take rates. Categories with high seller margins and low marginal costs, like digital goods or stock photography, can sustain much higher ones.",
  },
  {
    question: "Does payment processing cost actually affect my take rate?",
    answer: "Yes, and it's the part most take rate guidance skips. Processing fees come out of every transaction before your take rate becomes real revenue, and the impact is proportionally larger on smaller transactions because of the fixed per-transaction fee most processors charge on top of a percentage.",
  },
  {
    question: "Can I change my take rate after launch?",
    answer: "Yes, and most successful marketplaces do adjust it as they grow. It's considerably easier to lower a take rate than to raise one later, since sellers who've already priced around your current rate will notice and push back on an increase.",
  },
];

const MarketplaceTakeRate = () => {
  return (
    <InsightsArticleLayout
      title="Marketplace Take Rate: What to Actually Charge in 2026"
      schemaHeadline="Marketplace Take Rate: How Much Should You Actually Charge?"
      description="Marketplace take rate benchmarks by industry, the real formula, and the payment processing cost most founders forget to subtract first."
      category={{ name: "Guides", slug: "guides" }}
      cluster="hub"
      currentSlug="marketplace-take-rate"
      publishedTime="PASTE ACTUAL PUBLISH DATE HERE, DO NOT GUESS"
      modifiedTime="PASTE TODAY'S PUBLISH DATE HERE WHEN THIS GOES LIVE"
      keywords={[
        "marketplace take rate", "marketplace commission rate",
        "average marketplace take rate", "how much should a marketplace charge",
        "take rate formula", "marketplace commission by industry",
      ]}
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Marketplace Take Rate: How Much Should You Actually Charge?
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          Every marketplace founder eventually asks the same question: what percentage should we actually keep?
        </p>

        <p>
          Take rate looks like a simple number, but get it wrong in either direction and it can quietly cap how big your marketplace ever gets.
        </p>

        <p>
          Charge too much and your sellers price themselves out of the market, or leave for a cheaper platform the moment one shows up.
        </p>

        <p>
          Charge too little and you can&apos;t cover the cost of actually running the thing, <Link to="/insights/marketplace-payments-guide" className="text-primary hover:underline">payment processing included</Link>, which is the part most take rate advice leaves out entirely.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What is a take rate?
        </h2>

        <p>
          A marketplace take rate, also called commission or &quot;the rake,&quot; is the percentage of each transaction your platform keeps for facilitating the sale between a buyer and a seller.
        </p>

        <p>The formula is simple:</p>

        <p>
          <strong className="text-foreground">Take rate (%) = (Marketplace revenue ÷ Gross Merchandise Value) × 100</strong>
        </p>

        <p>
          If your marketplace processes $100,000 in transactions in a month and keeps $10,000 of that as revenue, your take rate is 10%.
        </p>

        <p>
          That revenue figure matters more than it sounds: GMV, the total value flowing through your marketplace, is not your revenue, it&apos;s the number your take rate gets applied to.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What a typical take rate actually looks like
        </h2>

        <p>
          There&apos;s no single &quot;correct&quot; number, take rates across successful marketplaces range from under 2% to over 70%, but the ranges cluster meaningfully by category:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Physical goods marketplaces:</strong> 5% to 20%, Etsy sits near the low end at 6.5%, eBay and Amazon average around 10-12%.
          </li>
          <li>
            <strong className="text-foreground">Service marketplaces:</strong> 10% to 30%, Uber and Lyft have historically operated around 20-30%, Fiverr charges sellers 20% and buyers a separate 5.5% service fee.
          </li>
          <li>
            <strong className="text-foreground">Rental marketplaces:</strong> 3% to 15%, often split between host and guest, Airbnb charges hosts around 3% and guests a variable 0-20%.
          </li>
          <li>
            <strong className="text-foreground">Digital goods and stock content:</strong> often the highest of all, Shutterstock&apos;s average take rate is close to 70%, tiered so higher-volume creators keep a larger share.
          </li>
          <li>
            <strong className="text-foreground">B2B marketplaces:</strong> typically lower, 2% to 10%, since order values are larger and margins on bulk goods are already thin.
          </li>
        </ul>

        <p>
          If you&apos;re benchmarking your own rate, the honest advice from most experienced marketplace operators is to look at your specific niche rather than the overall average.
        </p>

        <p>
          A stock-photo marketplace and a B2B industrial-parts marketplace have nothing useful to tell each other about pricing.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What actually determines the right number for you
        </h2>

        <p>
          The take rate isn&apos;t a number you pick once and forget, it responds to a handful of real forces in your specific market.
        </p>

        <p>
          <strong className="text-foreground">Seller margins.</strong> If your sellers are already running thin margins, a large commission on top pushes them out entirely.
        </p>

        <p>
          Ride-sharing and food delivery sit on the lower end of what they can charge relative to their category because drivers and restaurants don&apos;t have much room left to give.
        </p>

        <p>
          Digital goods and stock content can support far higher take rates because there&apos;s no marginal cost to produce another sale.
        </p>

        <p>
          <strong className="text-foreground">Competition.</strong> If your sellers have other channels to reach the same buyers, your take rate has to stay competitive with what those channels cost.
        </p>

        <p>
          Etsy&apos;s early growth against eBay leaned partly on undercutting eBay&apos;s fees category by category, not on being a fundamentally better product.
        </p>

        <p>
          <strong className="text-foreground">Network effects.</strong> The more valuable your marketplace becomes as it grows, the more room you have to charge.
        </p>

        <p>
          A stock-photo site becomes more useful to a buyer with every photographer who joins, which is part of why those marketplaces can sustain unusually high take rates.
        </p>

        <p>
          A ride-sharing marketplace has a much lower ceiling on this, past a certain driver density, adding more drivers stops making the experience meaningfully better for riders.
        </p>

        <p>
          <strong className="text-foreground">Transaction size.</strong> Buyers and sellers judge a take rate by the absolute number more than the percentage. Fiverr&apos;s 20% seller commission sounds steep, but on a typical $5 gig, that&apos;s $1.
        </p>

        <p>
          The bigger the average transaction, the lower the percentage tends to be, which is why B2B marketplaces with large order values can run sustainably on single-digit take rates.
        </p>

        <p>
          <strong className="text-foreground">Who&apos;s actually paying.</strong> Most marketplaces are demand-constrained, meaning once there are enough buyers, sellers show up on their own, so the seller side typically absorbs the fee.
        </p>

        <p>
          Marketplaces that are supply-constrained instead, where getting enough sellers is the hard part, sometimes shift more of the fee to buyers to keep the seller side as frictionless as possible.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          What most take rate advice leaves out
        </h2>

        <p>
          Every guide to setting a take rate treats it as a clean split between the marketplace and the seller. In practice, a third party takes a cut before either of you sees a cent: the payment processor.
        </p>

        <p>
          If your marketplace charges a 10% take rate and your underlying payment processing costs 2.9% plus a fixed fee per transaction, your actual margin isn&apos;t 10%, it&apos;s meaningfully less, and that gap gets worse on smaller transactions where the fixed per-transaction fee eats a bigger share of a smaller total.
        </p>

        <p>
          A marketplace running high volume, low-value transactions (a food delivery platform) needs to account for this far more carefully than one running fewer, larger transactions.
        </p>

        <p>
          This is because the fixed component of a processing fee barely registers on a $2,000 transaction and meaningfully dents a $15 one.
        </p>

        <p>
          This matters even more for marketplaces using <Link to="/marketplace-payment-provider" className="text-primary hover:underline">split payments</Link>, where funds have to be divided between the platform and multiple sellers on every transaction.
        </p>

        <p>
          The processing cost, the splitting logic, and your take rate all interact, and picking a payment setup that wasn&apos;t built with that interaction in mind is a common, avoidable way to find out your real margin is thinner than your spreadsheet said it was.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          How to actually calculate your working take rate
        </h2>

        <p>
          Before locking in a headline commission percentage, run the real numbers, not just the GMV split:
        </p>

        <ol className="list-decimal pl-6 space-y-3">
          <li>Start with your target take rate (the industry benchmarks above are a starting point, not a formula).</li>
          <li>Subtract your actual payment processing cost for a typical transaction, both the percentage and the fixed fee.</li>
          <li>Subtract your other per-transaction costs, fraud checks, support, dispute handling.</li>
          <li>What&apos;s left is your real margin, not the headline number you&apos;re telling sellers.</li>
        </ol>

        <p>
          If that real margin is too thin to be sustainable, the fix isn&apos;t always to raise your take rate, sometimes the more durable fix is choosing payment infrastructure that costs less on the transaction sizes your marketplace actually runs.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-6">
          Frequently asked questions
        </h2>

        <FAQAccordion faqs={faqItems} />

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
          Get your marketplace&apos;s real margin reviewed
        </h2>

        <p>
          If you&apos;ve set a take rate based on industry benchmarks without checking what your actual payment processing setup is costing you per transaction, that could be a lousy move.
        </p>

        <p>
          It&apos;s worth finding out before it shows up as a smaller number than expected at payout.
        </p>

        <p>
          For more on how split payments interact with your commission structure, see our <Link to="/insights/marketplace-payments-guide" className="text-primary hover:underline">guide to marketplace payments</Link>.
        </p>

        <p>
          Let us know what your thoughts are on this topic. Share if we missed anything
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default MarketplaceTakeRate;
