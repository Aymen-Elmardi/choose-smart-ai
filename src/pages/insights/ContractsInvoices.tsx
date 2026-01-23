import { Link } from "react-router-dom";
import InsightsArticleLayout from "@/components/InsightsArticleLayout";

const ContractsInvoices = () => {
  return (
    <InsightsArticleLayout
      title="Document Requests Explained: Contracts, Invoices, and Agreements"
      description="Understanding why payment providers request contracts, invoices, and customer agreements, when these requests appear, and how to respond effectively."
      category={{ name: "Guides", slug: "guides" }}
      cluster="hub"
      currentSlug="contracts-invoices"
      keywords={["document requests", "contracts", "invoices", "payment verification"]}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
        Document Requests Explained: Contracts, Invoices, and Agreements
      </h1>
      
      <div className="text-muted-foreground space-y-6">
        <p>
          Payment providers sometimes ask for contracts, invoices, or customer agreements even after an account has already been approved. This can feel confusing or unnecessary, especially when nothing has changed in your business.
        </p>
        <p>
          In most cases, this request is part of routine risk and compliance checks. This guide explains when these requests appear, what providers are actually reviewing, and how to respond without slowing down your account.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          When this request usually appears
        </h2>
        <p>
          Providers typically ask for contracts or invoices at predictable moments, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>After a noticeable increase in transaction volume</li>
          <li>When processing larger or higher-value payments</li>
          <li>When a business model involves subscriptions or ongoing billing</li>
          <li>During periodic compliance or account reviews</li>
        </ul>
        <p>
          These checks are common and do not automatically mean there is a problem with your account. Understanding <Link to="/insights/why-providers-re-underwrite-existing-accounts" className="text-primary hover:underline">why providers re-underwrite existing accounts</Link> can help you anticipate when these requests might appear.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What providers are actually checking
        </h2>
        <p>
          When reviewing contracts or invoices, providers are usually trying to confirm a few core things:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>That you are selling what you described during onboarding</li>
          <li>That customers clearly understand what they are paying for</li>
          <li>That refunds, cancellations, or disputes are handled properly</li>
          <li>That transaction amounts and billing frequency match expectations</li>
        </ul>
        <p>
          The goal is to assess refund risk and chargeback exposure, not to evaluate your legal paperwork. The <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">approval requirements across major payment providers</Link> vary in how strictly they enforce documentation.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What acceptable documentation usually looks like
        </h2>
        <p>
          In most cases, providers are not expecting perfect or fully executed contracts.
        </p>
        <p>
          Acceptable examples often include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Standard customer contracts or templates</li>
          <li>Sample invoices showing pricing and services</li>
          <li>Links to published terms of service or customer agreements</li>
        </ul>
        <p>
          Documents do not usually need to include sensitive customer data, and templates are often sufficient.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Common mistakes that slow approval
        </h2>
        <p>
          Some responses unintentionally delay reviews, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Uploading screenshots instead of documents</li>
          <li>Sending marketing brochures instead of contracts or invoices</li>
          <li>Over-redacting information so key details are missing</li>
          <li>Submitting documents that do not match the business model</li>
        </ul>
        <p>
          Clear, simple documentation is usually more effective than detailed or polished files. For a complete walkthrough on handling document requests, see our guide on <Link to="/insights/what-to-do-when-provider-asks-for-documents" className="text-primary hover:underline">what to do when a provider asks for more documents</Link>.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          What to do if you don't have these documents yet
        </h2>
        <p>
          Many early-stage or service-based businesses do not have formal contracts or invoices prepared.
        </p>
        <p>
          If that's the case:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use simple templates that reflect how you bill customers</li>
          <li>Provide draft agreements rather than rushing incomplete documents</li>
          <li>Avoid creating documents that do not reflect your actual process</li>
        </ul>
        <p>
          Providers generally prefer accuracy over speed.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
          Why this matters when choosing a payment provider
        </h2>
        <p>
          Different payment providers apply documentation checks differently. Some are more flexible with early-stage businesses, while others expect formal processes from day one.
        </p>
        <p>
          Understanding these differences before onboarding can help avoid delays and repeated verification requests. Our guide on <Link to="/best-payment-processor-uk" className="text-primary hover:underline">UK payment processor approval criteria</Link> can help you understand what to expect from different providers.
        </p>
      </div>
    </InsightsArticleLayout>
  );
};

export default ContractsInvoices;
