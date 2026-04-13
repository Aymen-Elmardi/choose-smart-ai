import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const Privacy = () => {
  useSEO({
    title: "Privacy Policy — ChosePayments",
    description: "Learn how ChosePayments collects, uses, and protects your personal information when using our payment provider recommendation service."
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last Updated: January 14, 2026</p>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to ChosePayments.com ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our payment provider recommendation service.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              By using ChosePayments.com, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-foreground mb-3">2.1 Information You Provide to Us</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you use our 60-second quiz or contact us, we may collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
              <li><strong className="text-foreground">Business Information</strong>: Company name, industry type, business size, transaction volume, and other business-related details you provide through our quiz</li>
              <li><strong className="text-foreground">Contact Information</strong>: Email address, name, phone number (if provided)</li>
              <li><strong className="text-foreground">Communication Data</strong>: Any information you provide when contacting us for support or inquiries</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mb-3">2.2 Information Collected Automatically</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong className="text-foreground">Device Information</strong>: IP address, browser type, operating system, device type</li>
              <li><strong className="text-foreground">Usage Data</strong>: Pages viewed, time spent on pages, links clicked, referral sources</li>
              <li><strong className="text-foreground">Cookies and Similar Technologies</strong>: We use cookies and similar tracking technologies to enhance your experience (see Section 5)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide personalized payment provider recommendations based on your quiz responses</li>
              <li>Improve and optimize our website and recommendation algorithm</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you relevant information about payment providers (only if you opt in)</li>
              <li>Analyze website usage and user behavior to enhance our services</li>
              <li>Comply with legal obligations and prevent fraud</li>
              <li>Send administrative information such as updates to our terms and policies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. How We Share Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">4.1 With Payment Providers</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              When you receive recommendations through our quiz, we may share relevant business information with the payment providers you're matched with, but only if you choose to proceed with contacting them.
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">4.2 With Service Providers</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may share information with third-party service providers who assist us in operating our website, conducting our business, or serving our users, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-6">
              <li>Website hosting providers</li>
              <li>Analytics services (e.g., Google Analytics)</li>
              <li>Email service providers</li>
              <li>Customer support tools</li>
            </ul>

            <h3 className="text-xl font-medium text-foreground mb-3">4.3 For Legal Reasons</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities, or to protect our rights, property, or safety.
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">4.4 Business Transfers</h3>
            <p className="text-muted-foreground leading-relaxed">
              If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li><strong className="text-foreground">Essential Cookies</strong>: Required for the website to function properly</li>
              <li><strong className="text-foreground">Analytics Cookies</strong>: Help us understand how visitors interact with our website</li>
              <li><strong className="text-foreground">Preference Cookies</strong>: Remember your settings and preferences</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Quiz responses and business information are typically retained for up to 2 years to improve our recommendation service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Data Protection Rights (GDPR)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you are a resident of the UK or European Economic Area (EEA), you have certain data protection rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li><strong className="text-foreground">Right to Access</strong>: You can request copies of your personal data</li>
              <li><strong className="text-foreground">Right to Rectification</strong>: You can request correction of inaccurate or incomplete data</li>
              <li><strong className="text-foreground">Right to Erasure</strong>: You can request deletion of your personal data under certain circumstances</li>
              <li><strong className="text-foreground">Right to Restrict Processing</strong>: You can request that we limit how we use your data</li>
              <li><strong className="text-foreground">Right to Data Portability</strong>: You can request transfer of your data to another service</li>
              <li><strong className="text-foreground">Right to Object</strong>: You can object to our processing of your personal data</li>
              <li><strong className="text-foreground">Right to Withdraw Consent</strong>: You can withdraw consent at any time where we relied on consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              To exercise any of these rights, please contact us at privacy@chosepayments.com.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and maintained on computers located outside of your country or jurisdiction where data protection laws may differ. If you are located outside the UK and choose to provide information to us, we transfer your data to the UK and process it there.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal data, please contact us, and we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Email</strong>: privacy@chosepayments.com<br />
              <strong className="text-foreground">Website</strong>: https://chosepayments.com
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For data protection inquiries specifically related to GDPR, you may also contact your local data protection authority.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <h2 className="text-xl font-semibold text-foreground mb-3">Your Consent</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using ChosePayments.com, you consent to our Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
