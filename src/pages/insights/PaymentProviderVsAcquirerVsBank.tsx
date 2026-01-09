import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import { useSEO } from "@/hooks/useSEO";

const PaymentProviderVsAcquirerVsBank = () => {
  useSEO({
    title: "Payment Provider vs Acquirer vs Bank – What's the Difference? | ChosePayments",
    description: "Understand who does what in card payments: payment providers, acquirers, and banks. Learn why money moves slower than transactions and what affects payout timelines."
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <InsightsBreadcrumb 
              category={{ name: "Guides", slug: "guides" }}
              currentTitle="Payment Provider vs Acquirer vs Bank"
            />
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Payment Provider vs Acquirer vs Bank. What Actually Happens to Your Money
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <section className="mb-12">
                <p className="text-lg leading-relaxed mb-6">
                  When a customer pays you by card, the payment looks instant.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Money appears approved in seconds. Your dashboard updates. The sale feels complete.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  But behind that moment is a chain of systems, institutions, and delays that most businesses never see until something breaks.
                </p>
                <p className="text-lg leading-relaxed">
                  This page explains who does what in card payments, but more importantly when they act, how long each step takes, and why money does not always move as fast as the transaction itself.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Step 1. The payment is authorised in seconds
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  When a customer taps their card or completes checkout, the first thing that happens is authorisation, not payment.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  This step usually takes 1–3 seconds.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  That speed matters more than most businesses realise. Even small delays at the approval stage can increase checkout abandonment, especially on mobile or high-value transactions.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  If you want to understand why approval speed directly affects conversion and lost revenue, see: <Link to="/insights/why-card-approval-speed-affects-checkout-abandonment" className="text-primary hover:text-primary/80 underline">Why Card Approval Speed Affects Checkout Abandonment</Link>.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Here's what happens:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The payment provider sends the transaction to the card network
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The card network passes it to the customer's issuing bank
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The issuing bank checks funds, fraud signals, and card status
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  The bank sends back an approval or decline
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  At this point:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  No money has moved
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The funds are only reserved
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  The transaction can still fail later
                </p>
                <p className="text-lg leading-relaxed">
                  This is why approvals feel instant but are not final.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Step 2. The acquirer takes responsibility for the transaction
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Once a transaction is authorised, the acquirer becomes responsible for it.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  The acquirer is the regulated financial institution backing your payment provider.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Their role is to:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Accept liability for the transaction
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Ensure it complies with Visa and Mastercard rules
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Decide whether the risk profile still fits your account
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  This is why:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Transactions can be approved but later reviewed
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Accounts can be flagged after successful payments
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Providers ask questions even when payments "worked"
                </p>
                <p className="text-lg leading-relaxed">
                  Authorisation speed does not equal risk approval.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Step 3. Settlement happens later, not instantly
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Settlement is when money actually moves.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  This typically happens:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  End of day or next business day for most card payments
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Later for high-risk, international, or marketplace transactions
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  During settlement:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The issuing bank sends funds to the acquirer
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The acquirer reconciles transactions
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  The provider prepares merchant payouts
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  If something looks off during this stage, settlement can be delayed or paused.
                </p>
                <p className="text-lg leading-relaxed">
                  This is often when businesses first notice issues.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Step 4. Payouts depend on provider and bank timelines
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Even after settlement, money does not reach your bank immediately.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Because of these delays, some providers now offer same-day settlement or instant payout options. For smaller businesses, this can make a meaningful difference to cash flow, payroll timing, and supplier payments.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  We explain how these options work and when they actually help here: <Link to="/insights/same-day-settlement-and-instant-payouts" className="text-primary hover:text-primary/80 underline">Same-Day Settlement and Instant Payouts. What Businesses Should Know</Link>.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Typical timelines:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Same day or next day for low-risk accounts
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  2–7 days for standard accounts
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Longer for new, growing, or reviewed accounts
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Delays here are usually caused by:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Acquirer risk rules
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Provider payout schedules
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Banking cut-off times
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Compliance reviews triggered after authorisation
                </p>
                <p className="text-lg leading-relaxed">
                  The payment was approved days ago, but the money is still moving.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Why this feels confusing to businesses
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  From the outside, it feels like one system.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  From the inside, it is four:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Payment provider handles the experience
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Acquirer manages risk and liability
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Card networks enforce global rules
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Banks move money on fixed schedules
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Each layer has its own timing and controls.
                </p>
                <p className="text-lg leading-relaxed">
                  This is why support answers often feel vague. The provider is usually waiting on another party.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Why switching providers rarely speeds things up
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Businesses often assume a new provider will be faster.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  But if:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The same acquirer is used
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The same banking rails apply
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  The same card networks are involved
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Then timelines often remain similar.
                </p>
                <p className="text-lg leading-relaxed">
                  Speed differences usually come from risk alignment, not brand choice.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  What actually improves payment reliability
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  The businesses that experience fewer delays usually have:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  A provider aligned with their growth profile
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  An acquirer comfortable with their industry
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Predictable transaction patterns
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Clean documentation before reviews happen
                </p>
                <p className="text-lg leading-relaxed">
                  This is not about gaming the system. It is about fitting into it.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  A practical takeaway
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Card payments are fast at the front and slow at the back.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Understanding who controls each stage explains why approvals, payouts, and reviews happen when they do.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  If you want to reduce surprises, the most effective step is choosing a setup that matches how your business actually operates.
                </p>
                <p className="text-lg leading-relaxed">
                  A short assessment can help identify where misalignment is likely before it causes disruption.
                </p>
              </section>

              <section className="mb-12">
                <Link 
                  to="/quiz" 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Start a short assessment →
                </Link>
              </section>

              <footer className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  This page explains general payment system behaviour and timelines. It does not provide legal or financial advice and does not represent any card network, bank, or payment provider.
                </p>
              </footer>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentProviderVsAcquirerVsBank;
