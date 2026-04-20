import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Terms = () => {
  useSEO({
    title: "Terms of Service — ChosePayments",
    description: "Terms of Service for ChosePayments. Read our terms and conditions for using our payment provider advisory services."
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <article className="container max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-sm text-muted-foreground">
              Last updated: January 2026
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using the ChosePayments website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Description of Service
            </h2>
            <p>
              ChosePayments provides independent payment advisory services to help businesses understand and select appropriate payment providers. Our services include educational content, assessment tools, and guidance on payment provider selection.
            </p>
            <p>
              We are an independent advisory service. We are not a payment processor, acquirer, or financial institution. We do not process payments, hold funds, or provide financial products.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Information Purposes Only
            </h2>
            <p>
              The information provided through our website and services is for general informational purposes only. It should not be construed as legal, financial, or professional advice.
            </p>
            <p>
              While we strive to provide accurate and up to date information, the payment industry changes frequently. We recommend verifying current terms, pricing, and availability directly with payment providers before making any decisions.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              No Guarantees
            </h2>
            <p>
              We do not guarantee approval by any payment provider. Our assessments and recommendations are based on general industry knowledge and publicly available information. Actual approval decisions are made solely by payment providers and their underwriting teams.
            </p>
            <p>
              Provider policies, pricing, and availability may change without notice. We are not responsible for any decisions made by payment providers regarding your application or account.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              User Responsibilities
            </h2>
            <p>
              When using our services, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when completing assessments or forms</li>
              <li>Use our services for lawful purposes only</li>
              <li>Not attempt to interfere with or disrupt our services</li>
              <li>Not reproduce, duplicate, or resell any part of our services without permission</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Intellectual Property
            </h2>
            <p>
              All content on the ChosePayments website, including text, graphics, logos, and software, is the property of ChosePayments or its content suppliers and is protected by copyright and intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Third Party Links
            </h2>
            <p>
              Our website may contain links to third party websites or services. We are not responsible for the content, privacy policies, or practices of any third party sites or services.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, ChosePayments shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use or inability to use our services</li>
              <li>Any decisions made based on information provided through our services</li>
              <li>Any actions or inactions by payment providers</li>
              <li>Any unauthorised access to or use of our servers or any personal information</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless ChosePayments, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, or expenses arising from your use of our services or violation of these terms.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services after any changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Contact
            </h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at hello@chosepayments.com.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;