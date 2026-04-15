import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const VisaCardBrandFees2026 = () => {
  return (
    <InsightsArticleLayout
      title="Visa's 2026 Card Brand Fee Changes: What They Mean for Your Processing Costs"
      description="Visa is changing how 3DS and token fees work from 15 May 2026. Learn how these scheme fee changes affect your processing costs and what you can actually do about them."
      category={{ name: "Guides", slug: "guides" }}
      cluster="hub"
      currentSlug="visa-card-brand-fees-2026"
      keywords={[
        "Visa card brand fees 2026",
        "Visa 3DS fee",
        "Visa scheme fees",
        "e-commerce token facilitation fee",
        "Visa interchange changes",
        "payment processing cost increase",
      ]}
      publishedTime="2026-04-15"
      modifiedTime="2026-04-15"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Visa's 2026 Card Brand Fee Changes: What They Mean for Your Processing Costs
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          If you process Visa cards in Europe, your acquirer has probably
          already sent you an email about this. Or they are about to. From{" "}
          <strong className="text-foreground">15 May 2026</strong>, Visa is
          changing how two of its scheme fees are calculated, and the changes
          will flow through to every merchant, on every acquirer.
        </p>

        <p>
          This is not a Paysafe thing, or a Stripe thing, or an Adyen thing.
          Scheme fees are set by Visa itself. Acquirers simply pass them on,
          sometimes with a markup on top. So whatever your processor is called,
          these changes apply to you.
        </p>

        <p>
          Here is what is actually changing, why it matters, and the one lever
          you control that can meaningfully reduce what you pay.
        </p>

        {/* --- Section: What's changing --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What is actually changing
        </h2>

        <p>
          There are two changes. The first affects how you are charged for 3D
          Secure authentication. The second introduces a brand new fee on
          tokenised e-commerce transactions.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          1. The 3DS fee is moving from flat to variable
        </h3>
        <p>
          Until now, Visa charged a flat €0.02 per 3DS authentication. Simple
          to model, easy to forecast. From 15 May 2026, that single fee is
          being replaced with a matrix. The rate you pay depends on three
          things:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Who initiated the transaction.</strong>{" "}
            Cardholder-initiated (CIT) transactions are checkouts where the
            customer is actively present. Merchant-initiated (MIT) transactions
            are things like recurring subscription charges or scheduled
            installments.
          </li>
          <li>
            <strong className="text-foreground">Where the card and merchant are based.</strong>{" "}
            Group A covers most of the intra-European activity you would
            expect: domestic, intra-EEA, UK to EEA, UK to Switzerland. Group B
            covers cross-region flows like Europe to non-Europe, and specific
            countries like Türkiye and Israel.
          </li>
          <li>
            <strong className="text-foreground">Whether you pass clean data to Visa.</strong>{" "}
            This is the one you control. More on it below.
          </li>
        </ul>

        <p>
          The practical effect: a cardholder-initiated checkout that used to
          cost €0.02 in 3DS fees can now cost anywhere from €0.025 to €0.040,
          depending on which boxes you tick. That is a 25% to 100% increase on
          the same fee line.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          2. A new E-Commerce Token Facilitation Fee
        </h3>
        <p>
          Visa is also introducing a new fee on e-commerce transactions where
          the card has been tokenised. This is most of your online volume if
          you use saved cards, Apple Pay, Google Pay, or any card-on-file
          experience.
        </p>

        <p>
          The fee is calculated as a percentage of the transaction value with
          a cap:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Group A:</strong> 0.05% of the
            transaction, capped at $1.25.
          </li>
          <li>
            <strong className="text-foreground">Group B:</strong> 0.08% of the
            transaction, capped at $2.00.
          </li>
        </ul>

        <p>
          On a £50 basket, that is a few pence. On a £5,000 basket, it hits
          the cap. Either way, it is a brand new line item that did not exist
          before. You will see it on your statement as{" "}
          <strong className="text-foreground">"AD HOC SCHEME FEE"</strong> and
          the 3DS charge as <strong className="text-foreground">"3DS FEE"</strong>.
        </p>

        {/* --- Section: Why this matters --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Why this quietly eats into your margin
        </h2>

        <p>
          Scheme fees are easy to ignore. They sit below interchange on your
          statement, they move in fractions of a penny, and most merchants
          never look at them closely. That is exactly why changes like this
          matter.
        </p>

        <p>
          If your effective rate is 1.4% and your scheme fees go up by €0.01
          per transaction, that sounds trivial. On a business doing 100,000
          transactions a month, it is €1,000. Per month. Forever. And it
          compounds with every similar change the schemes roll out, which
          they do every six months or so.
        </p>

        <p>
          The cardholder-initiated transactions are the ones to watch. That is
          your actual checkout, your highest-volume fee line, and the category
          where the price is going up the most. If you run subscriptions, your
          MIT transactions are comparatively safe, but the initial signup is
          still a CIT and still affected.
        </p>

        {/* --- Section: The data quality lever --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          The one lever you actually control
        </h2>

        <p>
          Visa is giving merchants a discount for passing clean data with
          each authentication request. They call it{" "}
          <strong className="text-foreground">Data Quality Met</strong>. Hit
          the criteria and your 3DS fee drops. Miss them and you pay more.
        </p>

        <p>
          For browser transactions, Data Quality Met means you are passing:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>The cardholder's browser IP address</li>
          <li>The cardholder's name</li>
          <li>At least one of: phone number or email address</li>
        </ul>

        <p>
          For in-app transactions, it is the same idea but using the device IP
          instead of a browser IP.
        </p>

        <p>
          None of this information is hard to collect. You almost certainly
          have all of it already. The question is whether your checkout,
          payment integration, and acquirer are actually forwarding it to
          Visa in the 3DS request. If they are not, you are paying the higher
          rate for no reason.
        </p>

        <p>
          The difference is not cosmetic. On cardholder-initiated Group A
          transactions, meeting the data quality bar drops your fee from
          €0.030 to €0.025. On Group B, it drops from €0.040 to €0.030. That
          is a 17% to 25% saving on every qualifying authentication, for
          doing nothing more than sending data you already have.
        </p>

        {/* --- Section: What to do about it --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What to do before 15 May
        </h2>

        <p>
          You do not need to overhaul your payments stack. You need to do
          three things.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          Audit your 3DS data quality
        </h3>
        <p>
          Ask your acquirer or PSP a direct question: are we currently meeting
          Visa's Data Quality Met criteria on our 3DS traffic? If they cannot
          answer clearly, that is an answer in itself. Push them to tell you
          what fields are being passed and what is missing. This is the
          single cheapest way to reduce the impact of the change.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          Read your statement after May
        </h3>
        <p>
          When the change takes effect, your statement will have new line
          items: "3DS FEE" and "AD HOC SCHEME FEE". Find them, calculate what
          they add up to as a percentage of your volume, and compare it
          against what you were paying before. Some acquirers will pass
          through the exact Visa rate. Others will add a markup. You need to
          know which camp yours is in.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          Reassess your pricing model
        </h3>
        <p>
          If you are on a blended rate, your acquirer absorbs scheme fee
          changes silently. That sounds like a good thing, but it means they
          will quietly adjust your effective cost to protect their margin,
          usually with a higher blended rate at your next review. If you are
          on Interchange++ pricing, you see the scheme fees as a separate
          line, which means you can challenge them and benchmark them.
        </p>

        <p>
          For most businesses above modest volume, the transparency of
          Interchange++ becomes worth the complexity precisely because of
          changes like this. Every time Visa or Mastercard rolls out a new
          fee, Interchange++ merchants see it. Blended merchants find out
          six months later through a rate increase.
        </p>

        {/* --- Section: The bigger picture --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          The bigger picture
        </h2>

        <p>
          Scheme fee changes are not going to stop. Visa and Mastercard roll
          out adjustments every six months, and the direction of travel is
          almost always up. Individually, each change is small enough to
          ignore. Collectively, they are one of the main reasons your
          effective processing cost quietly drifts upward year after year.
        </p>

        <p>
          The merchants who stay on top of this are the ones who treat their
          acquiring relationship as something that needs to be reviewed, not
          set and forgotten. They ask questions when emails like this arrive.
          They look at their statements. They push back when fees show up
          that should not.
        </p>

        <p>
          If you are not sure whether your current provider is passing scheme
          fees through cleanly or marking them up, a{" "}
          <Link to="/assessment" className="text-primary hover:underline">
            short assessment
          </Link>{" "}
          can help you figure out whether your setup is still competitive for
          how you actually process.
        </p>

        <p>
          You can also{" "}
          <Link to="/fee-calculator" className="text-primary hover:underline">
            estimate your monthly fees
          </Link>{" "}
          across several providers to see how the headline rate stacks up
          once scheme fees are factored in.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default VisaCardBrandFees2026;
