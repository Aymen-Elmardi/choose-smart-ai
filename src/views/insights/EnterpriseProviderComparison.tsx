'use client'
import { Link } from '@/lib/router-compat';
import InsightsArticleLayout from "@/components/InsightsArticleLayout";
import ComparisonTableSchema from "@/components/ComparisonTableSchema";
import FAQSchema from "@/components/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const faqs = [
  {
    question: "What is enterprise payment processing?",
    answer: "Enterprise payment processing is the infrastructure used by large businesses to accept, route, and settle payments at scale. Unlike standard SMB processors, enterprise payment platforms offer custom negotiated pricing, local acquiring networks in multiple countries, dedicated compliance and underwriting support, and deep integration with ERP and treasury systems. The threshold for enterprise payment processing is typically businesses processing several million pounds or more annually."
  },
  {
    question: "How do Adyen, Checkout.com, and Shift4 compare for enterprise use?",
    answer: "Adyen is strongest for global enterprises needing maximum acquiring control and omnichannel capability across physical and digital channels. Checkout.com is best for digital-first businesses, SaaS platforms, and fast-growing online merchants that need modern APIs and fast onboarding. Shift4 excels in high-risk verticals, hospitality, gaming, and complex commerce environments where other enterprise providers will not go."
  },
  {
    question: "What is the best enterprise payment provider in the UK?",
    answer: "Checkout.com has the strongest UK presence and is typically the fastest to approve and onboard UK digital businesses. Adyen is the market leader for large UK retail and enterprise, but requires a longer onboarding process. Shift4 is the best option for UK businesses in high-risk verticals like hospitality and gaming. The right choice depends on your industry, volume, and how much integration complexity you can absorb."
  },
  {
    question: "What does global acquiring mean for enterprise businesses?",
    answer: "Global acquiring means having direct acquiring relationships or licences in multiple countries, allowing transactions to be processed locally rather than cross-border. This reduces card scheme fees and typically improves authorisation rates. Adyen has local acquiring in 30+ markets. Checkout.com has local acquiring in 45+ markets including UK, EU, US, and MENA. For UK enterprises with significant international card volumes, the acquiring network is often more important than headline processing rates."
  },
  {
    question: "What should enterprises look for when comparing payment platforms?",
    answer: "Beyond pricing, enterprises should evaluate: risk appetite and underwriting approach (will they approve your business?), global acquiring network coverage, integration complexity and developer resources needed, support model and account team quality, authorisation rate benchmarks for your card mix, chargeback handling procedures, and contract flexibility. The provider that will approve your business and support your growth trajectory is more important than headline rates that you may never actually qualify for."
  },
  {
    question: "How do enterprise payment providers price their services?",
    answer: "Enterprise providers use negotiated pricing rather than published rate cards. The two main models are interchange-plus (IC++), where you pay the underlying card cost plus a markup, and blended or flat rate, where a single percentage covers all costs. IC++ is more transparent and typically better value at scale. All pricing is negotiated based on your volume, card mix, geographic spread, and risk profile. Never accept the first quote without understanding your true card cost breakdown."
  },
  {
    question: "What industries does Shift4 serve?",
    answer: "Shift4 specialises in high-risk and complex verticals including hospitality (hotels, restaurants, resorts), gaming and casinos, entertainment, ticketing, stadiums, and large merchants with complex omnichannel commerce environments. It is one of the few enterprise providers with genuine underwriting tolerance for these sectors and has hands-on support teams that understand vertical-specific payment complexity."
  },
  {
    question: "Is Adyen good for enterprise businesses?",
    answer: "Yes, Adyen is widely regarded as the benchmark enterprise payment provider for global brands. Its strengths are local acquiring coverage in 30+ markets, unified commerce across physical and digital channels, and deep technical control over payment routing. Its limitations are long onboarding timelines (3-6 months), strict risk appetite that excludes many industries, and complexity of initial integration. It is best suited to large enterprises with predictable, high-volume, low-risk transaction profiles."
  },
  {
    question: "How long does enterprise payment provider onboarding take?",
    answer: "Adyen typically takes 3-6 months from initial application to live processing. Checkout.com is faster at 4-12 weeks for established businesses with clean compliance history. Shift4 timelines vary depending on business complexity and vertical. All enterprise providers require detailed underwriting documentation including financial statements, processing history, and corporate structure information. The more complete your application, the faster the process."
  },
  {
    question: "What is the difference between enterprise payment processing and standard processing?",
    answer: "Standard processors like Stripe or Square offer automated onboarding, published rate cards, and limited customisation. Enterprise processors offer negotiated pricing, dedicated underwriting, local acquiring networks, custom routing logic, and deep integration support, but require a manual approval process, longer onboarding, and typically minimum volume thresholds. For businesses processing under a few million pounds annually, standard processors are usually sufficient. Above that level, enterprise payment processing typically delivers better economics and operational control."
  }
];

const comparisonItems = [
  {
    name: "Adyen",
    description: "End-to-end global payments with deep acquiring control. Best for large enterprises, global brands, and omnichannel retailers.",
    provider: "Adyen",
    bestFor: "Large enterprises, global brands, omnichannel retailers",
  },
  {
    name: "Shift4",
    description: "High-risk and complex commerce done at scale. Best for hospitality, gaming, and large merchants needing flexibility.",
    provider: "Shift4 Payments",
    bestFor: "High-risk verticals, hospitality, gaming, large merchants",
  },
  {
    name: "Checkout.com",
    description: "Clean, modern API-first payments for fast-growing online businesses. Best for SaaS, marketplaces, and fintechs.",
    provider: "Checkout.com",
    bestFor: "Digital-first businesses, SaaS, marketplaces, fintechs",
  },
];

const comparisonData = [
  {
    area: "Core Strength",
    adyen: "End-to-end global payments with deep acquiring control",
    shift4: "High-risk and complex commerce done at scale",
    checkout: "Clean, modern API-first payments for fast-growing online businesses",
  },
  {
    area: "Best For",
    adyen: "Large enterprises, global brands, omnichannel retailers",
    shift4: "High-risk verticals, hospitality, gaming, large merchants needing flexibility",
    checkout: "Digital-first businesses, SaaS, marketplaces, fintechs",
  },
  {
    area: "Risk Appetite",
    adyen: "Medium to low tolerance, prefers predictable scale",
    shift4: "High tolerance when structure is sound",
    checkout: "Medium tolerance with strong underwriting",
  },
  {
    area: "Underwriting Depth",
    adyen: "Extremely strict, long approval cycles",
    shift4: "Deep but pragmatic, case by case",
    checkout: "Thorough but faster than banks",
  },
  {
    area: "Global Coverage",
    adyen: "Excellent (local acquiring in many countries)",
    shift4: "Strong US plus international expansion",
    checkout: "Very strong EU, UK, MENA, global cards",
  },
  {
    area: "Omnichannel (POS + Online)",
    adyen: "Best in class unified commerce",
    shift4: "Strong in hospitality and physical locations",
    checkout: "Primarily online, improving POS",
  },
  {
    area: "High-Risk Industries",
    adyen: "Selective and cautious",
    shift4: "One of the strongest",
    checkout: "Selective but open with structure",
  },
  {
    area: "Customisation and Control",
    adyen: "Maximum control, complex setup",
    shift4: "High flexibility, custom routing",
    checkout: "High flexibility via APIs",
  },
  {
    area: "Speed to Market",
    adyen: "Slow",
    shift4: "Medium",
    checkout: "Fast",
  },
  {
    area: "Support Model",
    adyen: "Enterprise account teams",
    shift4: "Hands-on, relationship-driven",
    checkout: "Dedicated account management",
  },
  {
    area: "Brand Visibility",
    adyen: "Very high (enterprise circles)",
    shift4: "Lower public profile, huge volume",
    checkout: "High in fintech and scale-up circles",
  },
];

const EnterpriseProviderComparison = () => {
  return (
    <InsightsArticleLayout
      title="Enterprise Payment Processors: Adyen vs Shift4 vs Checkout"
      description="Comparing enterprise payment providers? We break down Adyen, Shift4, and Checkout.com across pricing, global acquiring, risk appetite, and UK suitability for 2026."
      category={{ name: "Provider Deep Dive", slug: "providers" }}
      cluster="provider"
      currentSlug="enterprise-provider-comparison"
      publishedTime="2026-01-24"
      keywords={[
        "enterprise payment providers",
        "enterprise payment approval platforms comparison",
        "enterprise payment api global coverage comparison",
        "Adyen vs Shift4 vs Checkout.com",
        "payment provider comparison UK",
        "enterprise payments comparison",
        "high-risk payment providers",
        "global payment processors",
        "payment provider underwriting",
        "best enterprise payment gateway",
      ]}
      sources={[
        { name: "Adyen official website", url: "https://www.adyen.com", type: "official" },
        { name: "Shift4 Payments official website", url: "https://www.shift4.com", type: "official" },
        { name: "Checkout.com official website", url: "https://www.checkout.com", type: "official" },
      ]}
    >
      <ComparisonTableSchema
        items={comparisonItems}
        listName="Enterprise Payment Providers: Strength Comparison"
        listDescription="A founder-level comparison of Adyen, Shift4, and Checkout.com focusing on risk appetite, underwriting depth, and operational fit."
      />
      <FAQSchema faqs={faqs} />
      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why Provider Fit Matters More Than Features
        </h2>
        <p className="text-muted-foreground mb-4">
          Most payment provider comparisons focus on features and pricing. But for growing businesses, the real differences lie elsewhere: risk appetite, underwriting depth, speed to approval, and long-term operational stability.
        </p>
        <p className="text-muted-foreground mb-4">
          Adyen, Shift4, and Checkout.com are three of the most significant enterprise payment providers operating today. Each has distinct strengths, and choosing between them is less about "which is best" and more about "which fits your operating reality."
        </p>
        <p className="text-muted-foreground">
          This comparison is designed to help founders and finance leaders understand where each provider excels, without marketing fluff or misleading pricing comparisons.
        </p>
      </section>

      {/* What Is Enterprise Payment Processing? */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          What Is Enterprise Payment Processing?
        </h2>
        <p className="text-muted-foreground mb-4">
          Enterprise payment processing refers to the infrastructure and services that large businesses use to accept, route, and settle payments at scale. It is categorically different from the payment tools used by smaller businesses, in several ways.
        </p>
        <p className="text-muted-foreground mb-3">Enterprise payment processing typically includes:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Custom pricing negotiated on volume and risk profile, rather than published flat rates</li>
          <li>Local acquiring networks in multiple countries, which reduce cross-border fees and improve authorisation rates</li>
          <li>Dedicated underwriting and compliance support, rather than automated account reviews</li>
          <li>Direct access to card scheme connectivity (Visa, Mastercard) with more routing control</li>
          <li>Integration with ERP systems, reconciliation platforms, and treasury tools</li>
          <li>Advanced fraud and risk management with configurable rulesets</li>
        </ul>
        <p className="text-muted-foreground mb-4">
          For businesses processing tens or hundreds of millions of pounds annually, the difference between a consumer-grade processor and a genuine enterprise payment platform is not just pricing. It is operational control, reliability, and access to acquiring infrastructure that smaller providers cannot offer.
        </p>
        <p className="text-muted-foreground">
          The three providers in this comparison, Adyen, Shift4, and Checkout.com, all operate as enterprise payment processing platforms. Each has a different origin, risk appetite, and geographic strength, which is why they suit different types of enterprise businesses.
        </p>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Strength Comparison Table
        </h2>
        <div className="border border-border rounded-lg overflow-hidden max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-foreground w-[20%] bg-muted">Area</TableHead>
                <TableHead className="font-semibold text-foreground w-[26%] bg-muted">
                  <Link 
                    to="/insights/adyen-enterprise-platform" 
                    className="text-primary hover:underline"
                  >
                    Adyen
                  </Link>
                </TableHead>
                <TableHead className="font-semibold text-foreground w-[26%] bg-muted">
                  <Link 
                    to="/insights/shift4-payments-platform" 
                    className="text-primary hover:underline"
                  >
                    Shift4
                  </Link>
                </TableHead>
                <TableHead className="font-semibold text-foreground w-[28%] bg-muted">
                  <Link 
                    to="/insights/checkout-com-enterprise-platform" 
                    className="text-primary hover:underline"
                  >
                    Checkout.com
                  </Link>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                  <TableCell className="font-medium text-foreground">{row.area}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.adyen}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.shift4}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{row.checkout}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Global Acquiring for Enterprise Businesses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Global Acquiring for Enterprise Businesses
        </h2>
        <p className="text-muted-foreground mb-4">
          One of the most significant differences between enterprise payment providers and standard processors is access to local acquiring. This is one of the most searched but least explained topics in enterprise payments, and it directly affects the cost and performance of your payment operation.
        </p>
        <p className="text-muted-foreground mb-4">
          A payment is "locally acquired" when it is processed through a bank in the same country or region as the cardholder. For most merchants using standard processors, transactions are routed through a single acquiring bank regardless of where the customer is. For enterprise businesses using providers with global acquiring networks, transactions can be routed through a local bank in the customer's region.
        </p>
        <p className="text-muted-foreground mb-4">This matters for two reasons.</p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Lower scheme fees:</strong> Card schemes (Visa and Mastercard) charge additional fees on cross-border transactions. When a UK merchant processes a US card through a UK acquirer, the scheme treats it as a cross-border transaction and applies a surcharge. When that same merchant has a US acquiring relationship, the surcharge disappears.
        </p>
        <p className="text-muted-foreground mb-6">
          <strong className="text-foreground">Higher authorisation rates:</strong> Local acquirers have stronger relationships with issuing banks in their region. A US-issued card is more likely to be approved by a US acquirer than a UK one. For businesses where authorisation rate differences of 1-2% translate to millions in recovered revenue, this is a meaningful operational consideration.
        </p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left py-3 px-3 font-semibold text-foreground">Provider</th>
                <th className="text-left py-3 px-3 font-semibold text-foreground">Local Acquiring Presence</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Adyen</td>
                <td className="py-3 px-3">30+ markets with own acquiring licence</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-3 font-medium text-foreground">Shift4</td>
                <td className="py-3 px-3">Strong US base, international expansion underway</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-medium text-foreground">Checkout.com</td>
                <td className="py-3 px-3">45+ markets, own acquiring in UK, EU, US, MENA</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground">
          For UK enterprises processing significant card volumes in the US, Europe, or MENA, the acquiring network is one of the most important selection criteria, ahead of headline pricing.
        </p>
      </section>

      {/* Key Takeaways */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Key Takeaways
        </h2>
        <div className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Choose Adyen if:</h3>
            <p className="text-muted-foreground text-sm">
              You are a large enterprise with predictable, high-volume transactions across multiple countries. You need maximum control over payment routing and are willing to invest in a longer onboarding process for long-term stability.
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Choose Shift4 if:</h3>
            <p className="text-muted-foreground text-sm">
              You operate in hospitality, gaming, entertainment, or other high-risk verticals. You need a provider with genuine risk tolerance and hands-on support for complex commerce environments.
            </p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Choose Checkout.com if:</h3>
            <p className="text-muted-foreground text-sm">
              You are a digital-first business, SaaS company, or marketplace that needs fast integration, modern APIs, and strong support for online transactions with room to scale.
            </p>
          </div>
        </div>
      </section>

      {/* How Enterprise Payment Providers Price Their Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          How Enterprise Payment Providers Price Their Services
        </h2>
        <p className="text-muted-foreground mb-4">
          Enterprise pricing is rarely published. All three providers in this comparison use negotiated pricing models rather than standard rate cards. Understanding how enterprise payment processing is priced helps you negotiate more effectively and model your real cost.
        </p>
        <p className="text-muted-foreground mb-4">The two main structures you will encounter:</p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Interchange-plus (IC++) pricing:</strong> The provider charges the underlying card scheme cost (interchange) plus a fixed markup. This is the most transparent model and typically the most cost-effective at scale. Adyen and Checkout.com both operate on IC++ for enterprise clients.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Blended or flat rate:</strong> A single percentage that covers interchange and processing. Easier to forecast but less transparent about underlying costs. Some Shift4 arrangements use this structure depending on the vertical and volume.
        </p>
        <p className="text-muted-foreground mb-3">
          Additional enterprise cost components you should negotiate, not just accept by default:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
          <li>Setup and integration fees</li>
          <li>Monthly platform fees</li>
          <li>Chargeback handling fees</li>
          <li>FX conversion margins on international transactions</li>
          <li>Payout fees and settlement timeline flexibility</li>
          <li>Network tokenisation and vault fees</li>
          <li>3DS authentication costs</li>
        </ul>
        <p className="text-muted-foreground">
          The right pricing structure depends on your card mix, average transaction value, and geographic spread. Businesses with high average transaction values benefit from IC++ because their interchange costs are relatively low. High-volume consumer businesses often prefer flat rate simplicity. Any provider quoting you a rate without understanding your card mix is guessing.
        </p>
      </section>

      {/* Why This Table Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Why This Comparison Matters
        </h2>
        <p className="text-muted-foreground mb-4">
          Pricing comparisons are often meaningless without understanding underwriting. A provider may quote attractive rates, but if your business profile does not align with their risk appetite, you may face delays, restrictions, or outright rejection.
        </p>
        <p className="text-muted-foreground mb-4">
          This table focuses on operational realities rather than marketing claims. It signals that approval is not guaranteed with any provider and that the best choice depends on your specific business model, industry, and growth trajectory.
        </p>
        <p className="text-muted-foreground mb-4">
          Understanding how each provider approaches risk is as important as understanding their fee structure. Adyen's strict underwriting means enterprise businesses in certain sectors will never receive approval regardless of volume. Shift4's pragmatic underwriting means businesses that have been rejected elsewhere often find a path. Checkout.com's position sits between the two.
        </p>
        <p className="text-muted-foreground">
          For deeper analysis of each provider, read the individual deep dives linked in the table above.
        </p>
      </section>

      {/* UK Enterprise Payment Considerations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          UK Enterprise Payment Considerations
        </h2>
        <p className="text-muted-foreground mb-4">
          For UK-based enterprises, several additional factors shape the decision between these three providers.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">FCA regulation:</strong> All three providers hold FCA authorisation or operate through a regulated entity in the UK. Before contracting, confirm which specific entity is the counterparty and what activities it is regulated to perform.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Post-Brexit cross-border fees:</strong> Since 2021, card transactions between UK merchants and EEA customers carry cross-border scheme fees that did not exist before Brexit. UK enterprises processing significant EU card volumes should ask each provider about their EU acquiring capability. Checkout.com and Adyen both have strong EU local acquiring that can reduce these costs.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Bacs and UK bank payments:</strong> For UK B2B enterprises collecting recurring payments, Bacs Direct Debit is often preferable to card. Checkout.com and Adyen both support Bacs. Shift4's UK Bacs capability is more limited.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Open banking:</strong> UK payment initiation via open banking is growing among enterprise buyers. All three providers support open banking integrations to varying degrees through third-party connections.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-foreground">UK support:</strong> Checkout.com has the most visible UK team and fastest UK onboarding. Adyen has strong UK enterprise presence but longer approval processes. Shift4 has a smaller UK footprint but is growing.
        </p>
      </section>

      {/* Switching Enterprise Payment Providers */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Switching Enterprise Payment Providers: What to Expect
        </h2>
        <p className="text-muted-foreground mb-4">
          Switching enterprise payment providers is one of the more complex operational decisions a finance or payments team can make. Understanding the process reduces friction and helps you plan the transition.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Timeline:</strong> Adyen onboarding typically takes 3-6 months from initial application to live processing. Checkout.com is faster, typically 4-12 weeks for established businesses with clean compliance history. Shift4 timelines vary by vertical and complexity.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Integration effort:</strong> All three providers require development resource for initial integration. Checkout.com's API is generally considered the most developer-friendly. Adyen's setup is the most complex but also the most configurable. Shift4's integration requirements depend on the product being used.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Card data migration:</strong> Stored payment tokens can often be migrated using network tokenisation (via Visa and Mastercard), reducing the impact on recurring customers. Your existing processor and the new provider must both support the migration process.
        </p>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">Parallel running:</strong> Most enterprise businesses run both the old and new provider simultaneously during a transition period, routing a portion of traffic to each to compare authorisation rates before full cutover.
        </p>
        <p className="text-muted-foreground">
          The switching cost is real but often overstated. For businesses paying above-market rates or experiencing authorisation issues, the financial benefit of switching typically outweighs the migration cost within 6-12 months.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>

      {/* Related Reading */}
      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Related Reading
        </h2>
        <ul className="space-y-2">
          <li>
            <Link to="/insights/adyen-enterprise-platform" className="text-primary hover:underline">
              Adyen: The Enterprise Payments Giant
            </Link>
          </li>
          <li>
            <Link to="/insights/shift4-payments-platform" className="text-primary hover:underline">
              Shift4 Payments: The Global Payments Giant Most Businesses Have Never Heard Of
            </Link>
          </li>
          <li>
            <Link to="/insights/checkout-com-enterprise-platform" className="text-primary hover:underline">
              Checkout.com: The API-First Payments Platform
            </Link>
          </li>
          <li>
            <Link to="/insights/why-accounts-flagged-after-growth" className="text-primary hover:underline">
              Why Payment Accounts Get Flagged After Sudden Growth
            </Link>
          </li>
        </ul>
      </section>
    </InsightsArticleLayout>
  );
};

export default EnterpriseProviderComparison;
