'use client'
import Link from 'next/link';
import { BOOKING_URL } from "@/lib/booking";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";

const MastercardThreeDSFeeChangesEurope = () => {
  const sources = [
    { name: "Worldline – Indicative Card Scheme Fee Rates, United Kingdom (July 2026)", url: "https://worldline.com/content/dam/worldline/global/documents/brochures/scheme-fees-uk.pdf", type: "official" as const },
    { name: "Adyen Docs – 3D Secure for Regulation Compliance", url: "https://docs.adyen.com/online-payments/3d-secure-for-regulation-compliance", type: "official" as const },
  ];

  const faqItems = [
    {
      question: "What is the Mastercard EMV 3DS Authentication Fee?",
      answer: "It's a scheme fee Mastercard charges on card-not-present transactions that go through 3D Secure (3DS) authentication - the challenge or verification step used for Strong Customer Authentication (SCA). It's separate from your processor's own markup and from interchange; it's set directly by Mastercard and passed through to merchants by every acquirer and processor."
    },
    {
      question: "When did the new Mastercard 3DS fee rates take effect?",
      answer: "29 July 2026, per acquirer notifications sent ahead of the change. The update restructures the fee to distinguish recurring from non-recurring transactions and adds separate, lower fee caps for declined transactions versus approved ones."
    },
    {
      question: "Which merchants does this affect?",
      answer: "Merchants based in the EEA, UK, and a handful of other European markets (Switzerland, Norway, Iceland, Liechtenstein). If your business is based outside this list, the specific rate change doesn't apply to you directly, though it's a useful signal of where scheme-level 3DS pricing is heading generally."
    },
    {
      question: "Does this fee apply to every card transaction?",
      answer: "No - only transactions that actually go through 3DS authentication. Transactions that qualify for an SCA exemption (low-value, TRA, recurring/MIT, trusted beneficiary, etc.) and are processed without a 3DS challenge don't trigger this specific authentication fee, though a different, typically smaller scheme fee still applies to the authorisation itself."
    },
    {
      question: "Can my payment processor waive this fee?",
      answer: "No. This is a card scheme fee set by Mastercard, not a processor markup. Your processor or acquirer has no discretion over it - they're required to pass it through as billed. What they can help with is optimising your authentication flow (more exemptions, fewer full 3DS challenges) to reduce how often the fee is triggered in the first place."
    },
  ];

  return (
    <InsightsArticleLayout
      title="Mastercard's 2026 3DS Authentication Fee Changes in Europe: What Merchants Should Know"
      description="Mastercard restructured its EMV 3DS Authentication Fee across Europe from 29 July 2026, splitting rates by recurring vs one-off transactions and by approved vs declined outcomes. Here's what changed and how SCA exemptions reduce your exposure to it."
      category={{ name: "Guides", slug: "guides" }}
      cluster="hub"
      currentSlug="mastercard-3ds-authentication-fee-changes-europe"
      publishedTime="2026-07-29"
      modifiedTime="2026-07-29"
      keywords={[
        "mastercard 3ds authentication fee", "mastercard scheme fee changes 2026", "emv 3ds authentication fee",
        "3ds authentication fee europe", "mastercard card brand fees", "sca exemption",
        "tra exemption", "reduce 3ds authentication costs",
      ]}
      sources={sources}
    >
      <FAQSchema faqs={faqItems} />

      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
        Mastercard's 2026 3DS Authentication Fee Changes in Europe: What Merchants Should Know
      </h1>

      <p className="text-foreground/90 mb-4">
        From 29 July 2026, Mastercard restructured its EMV 3DS Authentication Fee for merchants across Europe. This is a card scheme fee - set by Mastercard, not by your processor - charged on card-not-present transactions that go through 3D Secure authentication. Acquirers and processors have no discretion over it; they're contractually required to pass it through, and every merchant using Mastercard in the affected countries will see the updated rate on their next statement whether or not anyone told them it was coming.
      </p>
      <p className="text-foreground/90 mb-12">
        This is what changed, what it actually costs at different transaction sizes, and - more usefully - how Strong Customer Authentication (SCA) exemptions reduce how often you pay it at all.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What the EMV 3DS Authentication Fee Actually Is</h2>
      <p className="text-foreground/90 mb-4">
        Every time a card-not-present transaction is authenticated through 3D Secure - the redirect or challenge step that confirms Strong Customer Authentication - Mastercard charges a small scheme fee for that authentication event. It's separate from interchange (paid to the issuing bank) and separate from your processor's own margin. It exists specifically because 3DS authentication involves Mastercard's network infrastructure verifying the cardholder with the issuer in real time.
      </p>
      <p className="text-foreground/90 mb-8">
        Because it's a scheme fee, it's identical in structure no matter which processor or acquirer you use - Stripe, Adyen, Checkout.com, or a traditional acquirer all pass through the same Mastercard-set rate. What differs between providers is only how clearly and how far in advance they tell you about a change like this one.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What Changed on 29 July 2026</h2>
      <p className="text-foreground/90 mb-4">
        The previous fee schedule didn't distinguish between recurring and non-recurring transactions, and used a single fee cap regardless of whether the transaction was ultimately approved or declined. The updated structure introduces both distinctions. One acquirer's disclosed schedule (rates and caps vary slightly by acquirer contract, but the structure below reflects the new Mastercard framework):
      </p>

      <p className="text-foreground/90 mb-2"><strong>Previous rates:</strong></p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Authentication Type</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Area of Event</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Fee Rate</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Maximum Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">Non-recurring</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Domestic & Intraregional</td>
              <td className="border border-border px-4 py-3 text-foreground/90">0.0155% - 0.0230%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€0.155</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">Non-recurring</td>
              <td className="border border-border px-4 py-3 text-foreground/90">International</td>
              <td className="border border-border px-4 py-3 text-foreground/90">0.031% - 0.046%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€0.310</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-foreground/90 mb-2"><strong>Updated rates (effective 29 July 2026):</strong></p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Authentication Type</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Area of Event</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Fee Rate</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Max (Approved)*</th>
              <th className="border border-border px-4 py-3 text-left font-semibold text-foreground">Max (Declined)**</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">Non-recurring</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Domestic & Intraregional</td>
              <td className="border border-border px-4 py-3 text-foreground/90">0.018%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€1.80</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€0.18</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">Non-recurring</td>
              <td className="border border-border px-4 py-3 text-foreground/90">International</td>
              <td className="border border-border px-4 py-3 text-foreground/90">0.036%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€3.60</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€0.36</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-3 text-foreground/90">Recurring</td>
              <td className="border border-border px-4 py-3 text-foreground/90">Domestic & Intraregional</td>
              <td className="border border-border px-4 py-3 text-foreground/90">0.006%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€0.60</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€0.06</td>
            </tr>
            <tr className="bg-muted/30">
              <td className="border border-border px-4 py-3 text-foreground/90">Recurring</td>
              <td className="border border-border px-4 py-3 text-foreground/90">International</td>
              <td className="border border-border px-4 py-3 text-foreground/90">0.012%</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€1.20</td>
              <td className="border border-border px-4 py-3 text-foreground/90">€0.12</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-foreground/90 mb-4 text-sm text-muted-foreground">
        *The approved-transaction cap applies to transactions above €10,000. **The declined-transaction cap applies to transactions above €1,000. Fixed fees are charged per transaction; percentage fees apply to the transaction value. Affected merchants are those based in the EEA, UK, Switzerland, Norway, Iceland, and Liechtenstein.
      </p>
      <p className="text-foreground/90 mb-8">
        Two structural changes matter more than the headline percentages. First, recurring transactions now carry a materially lower rate than non-recurring ones - roughly a third of the cost - which reflects Mastercard pricing repeat, tokenised, low-fraud transactions differently from one-off checkouts. Second, the fee now has separate, much lower caps for declined transactions, so a failed authentication no longer costs nearly as much as a successful one. Both changes reward merchants who structure their checkout and billing correctly rather than treating every transaction the same way.
      </p>

      {/* Dark CTA */}
      <div style={{ background: "#0D1117", border: "1px solid #1F2937", borderRadius: "14px", padding: "2.5rem 2.8rem", margin: "3rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#10B981,#059669)" }} />
        <p style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem 0" }}>
          Free Consultation
        </p>
        <p style={{ color: "#F9FAFB", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
          Not sure how much this actually adds to your processing costs?
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.75rem 0" }}>
          Book a free 15-minute call with our team. We will help you work out your real exposure to scheme fee changes like this one, and whether SCA exemptions could meaningfully reduce it. No sales pitch. No strings attached.
        </p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#10B981", color: "#ffffff", fontWeight: 700, fontSize: "0.95rem", padding: "0.85rem 2rem", borderRadius: "8px", textDecoration: "none", letterSpacing: "0.02em" }}>
          Book a Free 15-Minute Call
        </a>
      </div>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why This Is a Good Time to Look at SCA Exemptions</h2>
      <p className="text-foreground/90 mb-4">
        This fee only applies to transactions that actually go through 3DS authentication. A transaction processed under a valid SCA exemption - meaning the issuer accepts the risk and skips the full authentication challenge - doesn't trigger this specific charge. As the per-authentication cost rises, the financial case for using exemptions properly gets stronger, on top of the conversion benefits they already provide by removing checkout friction.
      </p>
      <p className="text-foreground/90 mb-4">
        Two exemptions are worth checking against your own transaction mix:
      </p>
      <ul className="list-disc pl-6 space-y-3 text-foreground/90 mb-8">
        <li>
          <strong><Link href="/insights/tra-exemption-reduces-payment-friction" className="text-primary hover:underline">Transaction Risk Analysis (TRA) exemption</Link></strong> - available to acquirers and issuers with a low enough fraud rate, and applicable up to higher transaction values than the low-value exemption. If your provider qualifies and your fraud rate is clean, this is usually the highest-leverage exemption to pursue.
        </li>
        <li>
          <strong><Link href="/insights/low-value-transaction-exemption" className="text-primary hover:underline">Low Value Transaction (LVT) exemption</Link></strong> - lets transactions under a set threshold (currently €30 in most of Europe, with a rolling cumulative cap) skip SCA entirely. If you run a lot of small-ticket transactions, this is the more straightforward exemption to configure.
        </li>
      </ul>
      <p className="text-foreground/90 mb-8">
        Both exemptions are requested by the merchant's acquirer at the point of authorisation - the issuer can still decline the exemption and force a full challenge if their own risk model disagrees, which is why exemption approval rates vary by issuer and shouldn't be assumed at 100%. Recurring, tokenised transactions (subscriptions, saved cards) are also generally exempt from a full SCA challenge after the first authentication, which is part of why the new recurring rate in the table above is priced so much lower - Mastercard is pricing in the fact that these transactions carry less authentication overhead in the first place.
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What to Actually Do About This</h2>
      <ol className="list-decimal pl-6 space-y-2 text-foreground/90 mb-8">
        <li>Ask your processor or acquirer for the exact updated fee schedule that applies to your account - the table above illustrates the structure, but confirm your own contracted rate and caps directly.</li>
        <li>Check what proportion of your transactions currently go through a full 3DS challenge versus an exemption. Most dashboards (Stripe Radar, Adyen, Checkout.com) report this directly.</li>
        <li>If your fraud rate is low and your provider supports it, ask specifically about TRA exemption eligibility - it's usually not applied automatically.</li>
        <li>For subscription or recurring-billing businesses, confirm your provider is correctly flagging renewal transactions as recurring/MIT rather than running them through full non-recurring authentication each time - that flag is what determines which rate in the table above applies.</li>
        <li>Factor scheme fee movements like this one into your effective rate calculations going forward - they happen periodically and are outside any processor's control, but they compound with everything else on your statement. See our{" "}
          <Link href="/insights/hidden-payment-processor-fees" className="text-primary hover:underline">breakdown of hidden payment processor fees</Link>{" "}
          for the full picture of what else shows up on a statement beyond the headline rate.
        </li>
      </ol>

      <p className="text-foreground/90 mb-8">
        Scheme fee changes like this one are a useful reminder that a payment processor's headline rate is only part of the cost structure - Visa and Mastercard set fees like this one independently, and no processor can absorb or negotiate them away. Understanding{" "}
        <Link href="/insights/payment-scheme-rules-explained" className="text-primary hover:underline">how scheme rules actually work</Link>{" "}
        explains why these changes land on your statement with little warning, and why the businesses that manage cost proactively are the ones tracking exemption eligibility and authentication rates, not just the advertised processing percentage.
      </p>

      <InlineAssessmentCTA
        context="Want to know whether your current processor is actually optimising your 3DS exemption rate, or just passing every fee straight through?"
      />

      <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">Frequently Asked Questions</h2>
      <FAQAccordion faqs={faqItems} />
    </InsightsArticleLayout>
  );
};

export default MastercardThreeDSFeeChangesEurope;
