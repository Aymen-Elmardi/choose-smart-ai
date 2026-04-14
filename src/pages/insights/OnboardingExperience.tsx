import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const OnboardingExperience = () => {
  return (
    <InsightsArticleLayout
      title="Why Merchant Onboarding Can Make or Break Your Customer Relationships"
      description="Your onboarding flow is entirely within your control. Learn how to choose a payment provider whose onboarding tools fit your market and reduce drop-off."
      category={{ name: "Guides", slug: "guides" }}
      cluster="hub"
      currentSlug="onboarding-experience"
      keywords={[
        "merchant onboarding",
        "payment onboarding UX",
        "KYC onboarding flow",
        "hosted onboarding vs API",
        "reduce onboarding drop-off",
      ]}
      publishedTime="2026-04-13"
      modifiedTime="2026-04-13"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Why Merchant Onboarding Can Make or Break Your Customer Relationships
      </h1>

      <div className="text-muted-foreground space-y-6">
        <p>
          Most businesses spend months choosing a payment provider based on
          pricing, features, and settlement speed. Then they hand their
          customers a generic onboarding form and wonder why half of them never
          finish signing up.
        </p>

        <p>
          The onboarding experience is one of the few things that is entirely
          within your control. The provider sets the compliance requirements,
          but how you present them to your users, how much friction you
          introduce, and how much you ask for upfront are decisions you make.
        </p>

        <p>
          Get it wrong and you lose customers before they ever process a single
          transaction.
        </p>

        {/* --- Section: Onboarding models --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Three onboarding models, one decision
        </h2>

        <p>
          Payment providers typically offer one of three approaches to merchant
          onboarding, and each one gives you a different level of control.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          Hosted onboarding
        </h3>
        <p>
          The provider gives you a link. Your customer clicks it and lands on
          the provider's own form, styled with their branding, their field
          order, their copy. You have little to no control over the experience.
          It is fast to integrate but the flow is rigid.
        </p>
        <p>
          This works if your customers are technically sophisticated or if you
          are onboarding low volumes. It breaks down the moment you need to
          tailor the experience to a specific market.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          API-based onboarding
        </h3>
        <p>
          The provider exposes onboarding endpoints and you build the entire
          flow yourself. You control every field, every screen, every
          validation message. This is maximum flexibility but it requires
          engineering time and ongoing maintenance as compliance requirements
          change.
        </p>
        <p>
          Platforms with dedicated product teams usually prefer this model
          because it lets them design onboarding that feels native to their
          product.
        </p>

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
          Embeddable components
        </h3>
        <p>
          A middle ground. The provider gives you pre-built UI components that
          you drop into your own application. You control the surrounding
          experience, the sequencing, and the branding, but the compliance
          logic is handled by the component. Stripe Connect's embedded
          onboarding and Adyen's hosted onboarding pages are examples of this
          approach.
        </p>
        <p>
          This is often the best balance between speed and control, but not
          every provider offers it.
        </p>

        {/* --- Section: Context matters --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          A plumber and a takeaway owner are not the same user
        </h2>

        <p>
          This is where most platforms get onboarding wrong. They build one
          flow and push every merchant through it, regardless of who they are
          or how they operate.
        </p>

        <p>
          A plumber signing up to take card payments on the go does not need
          the same experience as a takeaway owner setting up online ordering.
          The plumber wants to be taking payments within minutes. The takeaway
          owner needs to configure menus, delivery zones, and tipping. Their
          tolerance for friction is completely different.
        </p>

        <p>
          A SaaS platform onboarding software companies has a different
          problem entirely. Their merchants are used to slick product
          experiences and will abandon a clunky onboarding flow before page
          two. The onboarding has to match the quality of the product it sits
          inside.
        </p>

        <p>
          Your job as the business owner is to work with a provider that
          gives you the tools to customise onboarding for your market. If your
          provider only offers a single hosted form with no flexibility, you
          are accepting a conversion rate that you cannot improve.
        </p>

        {/* --- Section: Don't ask for what you can find --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Stop asking users for information you can find yourself
        </h2>

        <p>
          This is the single biggest source of unnecessary friction in
          merchant onboarding, and it is entirely avoidable.
        </p>

        <p>
          If a piece of information is publicly available from a reliable
          source at a reasonable cost, do not ask your user to provide it
          manually. Company registration details are on Companies House. VAT
          numbers are verifiable through HMRC. Director information, SIC
          codes, registered addresses are all publicly accessible.
        </p>

        <p>
          Every additional field you put in front of a merchant is a chance
          for them to abandon the flow. Every document you ask them to upload
          that you could have retrieved programmatically is friction you chose
          to introduce.
        </p>

        <p>
          The best onboarding flows pre-fill everything they can. They ask
          for a company number, hit the Companies House API, and auto-populate
          the legal name, registered address, directors, and SIC code. The
          merchant confirms what is correct rather than typing it all from
          scratch.
        </p>

        <p>
          This is not just about user experience. It is also about data
          quality. Information pulled from authoritative sources is more
          accurate than information typed into a form at speed. Fewer errors
          means fewer compliance flags downstream, which means fewer delays
          in getting merchants live.
        </p>

        {/* --- Section: What to look for --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What to look for in a provider's onboarding tools
        </h2>

        <p>
          When evaluating providers, the onboarding tooling should be part of
          the decision, not an afterthought. Here is what to assess:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Customisation depth.</strong>{" "}
            Can you control field order, required vs optional fields, and
            conditional logic based on merchant type?
          </li>
          <li>
            <strong className="text-foreground">Data enrichment.</strong>{" "}
            Does the provider support pre-filling from Companies House, open
            banking verification, or similar data sources?
          </li>
          <li>
            <strong className="text-foreground">Progressive onboarding.</strong>{" "}
            Can merchants start processing before every compliance check is
            complete, with limits that increase as verification progresses?
          </li>
          <li>
            <strong className="text-foreground">Localisation.</strong>{" "}
            If you operate across markets, can the flow adapt language, field
            labels, and document requirements by country?
          </li>
          <li>
            <strong className="text-foreground">Drop-off analytics.</strong>{" "}
            Does the provider give you visibility into where merchants abandon
            the flow so you can optimise it over time?
          </li>
        </ul>

        <p>
          If a provider cannot answer these questions clearly, their
          onboarding tooling is probably not built for platforms that care
          about conversion.
        </p>

        {/* --- Section: The cost of getting it wrong --- */}
        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          The cost of getting it wrong
        </h2>

        <p>
          A poor onboarding experience does not just lose you a signup. It
          sets the tone for the entire relationship. A merchant who struggled
          to get through your onboarding will be quicker to churn, slower to
          trust your platform, and less likely to recommend you.
        </p>

        <p>
          Conversely, a merchant who was live and processing within minutes
          will associate your platform with competence. That first impression
          compounds over time.
        </p>

        <p>
          The providers you work with determine the ceiling of your onboarding
          experience. Choose one whose tools match your ambition. If you are
          unsure which providers offer the flexibility your market needs, a{" "}
          <Link
            to="/assessment"
            className="text-primary hover:underline"
          >
            short assessment
          </Link>{" "}
          can help narrow the field.
        </p>

        <p>
          You can also{" "}
          <Link
            to="/fee-calculator"
            className="text-primary hover:underline"
          >
            compare provider fees
          </Link>{" "}
          to make sure the onboarding flexibility you need does not come at an
          unreasonable cost.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default OnboardingExperience;
