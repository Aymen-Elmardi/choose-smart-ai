import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import { Button } from "@/components/ui/button";
import FraudPreventionModal from "@/components/FraudPreventionModal";

const Chargebacks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useSEO({
    title: "Chargebacks Explained: Costs, Causes, and How to Reduce Them (UK & EU)",
    description: "Chargebacks cost merchants billions every year and put payment accounts at risk. Learn why they happen, how much they really cost, and how to reduce them."
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <article className="container max-w-3xl mx-auto px-4">
          <InsightsBreadcrumb 
            category={{ name: "Practical Guides", slug: "guides" }}
            currentTitle="Chargebacks"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Chargebacks: Why They Happen, How Much They Really Cost, and How Merchants Can Avoid Them
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p className="text-xl font-medium text-foreground">
              In 2023 alone, chargebacks cost businesses over $100 billion worldwide.
            </p>
            
            <p>
              By 2026, losses linked to disputed card payments are expected to pass $28 billion per year.
            </p>

            <p>
              For many businesses, chargebacks are not just annoying. Too many of them can lead to higher fees, frozen funds, or even account shutdowns.
            </p>

            <p>
              This guide explains, in plain terms, what chargebacks are, why they happen, and what you can do to reduce them before they start damaging your business.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What Is a Chargeback (in simple terms)?
            </h2>

            <p>
              A chargeback happens when a customer contacts their bank, not you, and says:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>"I don't recognize this payment"</li>
              <li>"I didn't receive what I paid for"</li>
              <li>"This charge shouldn't be there"</li>
            </ul>

            <p>
              The bank then pulls the money back from your payment provider and asks you to prove the transaction was legitimate.
            </p>

            <p>
              This is very different from a refund.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>A refund is handled between you and the customer</li>
              <li>A chargeback is handled by the bank, often without warning</li>
            </ul>

            <p>
              Even if you later win the dispute, chargebacks still cost time, money, and trust.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why Chargebacks Are a Bigger Problem Than Most Businesses Realize
            </h2>

            <p>
              A single chargeback usually means:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>The transaction amount is removed from your balance</li>
              <li>You pay a dispute fee (often £15–£50, sometimes more)</li>
              <li>You lose the product or service already delivered</li>
              <li>Your account risk level increases</li>
            </ul>

            <p>
              But the real danger is patterns.
            </p>

            <p>
              If chargebacks happen too often, payment providers may:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Delay your payouts</li>
              <li>Hold a reserve from your funds</li>
              <li>Increase your processing fees</li>
              <li>Suspend or close your account entirely</li>
            </ul>

            <p>
              For every £1 lost to a chargeback, businesses often lose £4–£5 in total impact once fees, admin time, and future risk are included.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              The Three Main Reasons Chargebacks Happen
            </h2>

            <p>
              Most chargebacks fall into one of these categories.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              1. Stolen Card Details (Real Fraud)
            </h3>

            <p>
              This is when someone uses card details without the cardholder's permission.
            </p>

            <p>
              You usually have very little control here, but strong security checks can reduce it.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              2. Business Mistakes (More Common Than You Think)
            </h3>

            <p>
              Many chargebacks are triggered by simple issues, such as:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Customers being charged twice</li>
              <li>Payments taken earlier than expected</li>
              <li>Long delivery delays</li>
              <li>Confusing refund processes</li>
              <li>Poor or slow customer support</li>
            </ul>

            <p>
              In these cases, customers often go straight to their bank because it feels faster than contacting the business.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              3. Customers Don't Recognize the Charge
            </h3>

            <p>
              This is one of the most overlooked causes of chargebacks.
            </p>

            <p>
              A customer checks their bank app and sees a name they don't recognize. They assume the payment is wrong and dispute it.
            </p>

            <p>
              This often happens when:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Your company name is different from the name customers know you by</li>
              <li>The payment shows a legal entity name instead of your shop or brand name</li>
            </ul>

            <p>
              For example:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Customers know you as "Heathrow Kebab"</li>
              <li>Their bank app shows "Heathrow UK Limited"</li>
            </ul>

            <p>
              Even though the payment is legitimate, the customer doesn't connect the two.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              How to Reduce Chargebacks (What You Can Control)
            </h2>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              1. Make Your Name Familiar Before and After the Payment
            </h3>

            <p>
              To reduce "I don't recognize this charge" disputes:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Give your payment provider the name customers know you by, not just your legal company name</li>
              <li>Ask how your business name will appear on customers' bank statements and apps</li>
              <li>Keep that name consistent across your website, receipts, and confirmations</li>
            </ul>

            <p>
              Familiarity matters.
            </p>

            <p>
              Businesses that regularly appear in a customer's inbox or messages are far less likely to be disputed later.
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Send order confirmations and receipts</li>
              <li>Use SMS or WhatsApp updates where appropriate</li>
              <li>Always display your business name clearly</li>
            </ul>

            <p>
              The more often customers see your name, the less likely they are to forget it.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              2. Make Refunds Easier Than Chargebacks
            </h3>

            <p>
              Many customers file chargebacks simply because refunds feel slow or unclear.
            </p>

            <p>
              To prevent this:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Clearly explain your refund policy before purchase</li>
              <li>Make it easy to contact you</li>
              <li>Respond quickly when something goes wrong</li>
            </ul>

            <p>
              If customers trust that you'll help them, they won't go straight to their bank.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              3. Reduce Fraud at Checkout
            </h3>

            <p>
              Simple protections can dramatically reduce stolen-card disputes:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Extra security checks for online payments</li>
              <li>Strong authentication for higher-value transactions</li>
              <li>Tools that block suspicious behaviour automatically</li>
            </ul>

            <p>
              These not only reduce fraud, they also protect your account reputation with payment providers.
            </p>

            {/* Inline Lead Capture CTA */}
            <div className="my-10 p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Want help reducing chargebacks before they become a problem?
              </h3>
              <p className="text-muted-foreground mb-4">
                Some businesses benefit from dedicated fraud prevention tools. If you'd like an introduction or guidance on whether these tools make sense for your business, leave your email and we'll point you in the right direction.
              </p>
              <Button 
                onClick={() => setIsModalOpen(true)}
                variant="outline"
                className="font-medium"
              >
                Get guidance on fraud prevention tools
              </Button>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">
              4. Keep Proof (Even If You Never Use It)
            </h3>

            <p>
              If a chargeback happens, banks expect evidence.
            </p>

            <p>
              This can include:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Order confirmations</li>
              <li>Delivery confirmations</li>
              <li>Customer emails or messages</li>
              <li>Terms agreed at checkout</li>
            </ul>

            <p>
              Even if you never plan to fight disputes, having this information protects you if your provider reviews your account.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why Chargebacks Often Lead to Account Reviews or Freezes
            </h2>

            <p>
              Payment providers track dispute levels closely.
            </p>

            <p>
              If chargebacks rise suddenly or stay high over time, providers may:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Ask for more documents</li>
              <li>Change your payout schedule</li>
              <li>Flag your account for review</li>
            </ul>

            <p>
              This is often connected to the same risk checks that cause{" "}
              <Link to="/insights/why-payment-accounts-get-flagged-without-changes" className="text-primary hover:underline">
                payment accounts to get flagged
              </Link>{" "}
              or payout delays.
            </p>

            <p>
              Understanding this link helps businesses act early instead of reacting when money is already held. It also explains why providers may trigger{" "}
              <Link to="/insights/why-providers-re-underwrite-existing-accounts" className="text-primary hover:underline">
                re-underwriting
              </Link>{" "}
              on accounts with rising dispute rates.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Final Thought
            </h2>

            <p>
              Chargebacks are not just a payments issue. They are a trust issue.
            </p>

            <p>
              Most can be reduced by:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Clear communication</li>
              <li>Familiar business naming</li>
              <li>Better customer experience</li>
              <li>Basic fraud protection</li>
            </ul>

            <p>
              Understanding how chargebacks work — and how providers see them — gives you far more control than most businesses realize.
            </p>

            <p>
              If you want to reduce risk before it turns into chargebacks or account issues, you can start a{" "}
              <Link to="/assessment?start=true" className="text-primary hover:underline">
                short assessment
              </Link>{" "}
              to understand which payment providers are best suited to your business model.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Chargebacks;
