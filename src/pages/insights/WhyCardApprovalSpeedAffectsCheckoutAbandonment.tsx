import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import { useSEO } from "@/hooks/useSEO";

const WhyCardApprovalSpeedAffectsCheckoutAbandonment = () => {
  useSEO({
    title: "Card Approval Speed and Checkout Abandonment: The Connection Explained | ChosePayments",
    description: "Learn why card approval speed matters for conversion rates. Understand what slows down approvals and how delays cause checkout abandonment and lost revenue."
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <InsightsBreadcrumb 
              category={{ name: "Guides", slug: "guides" }}
              currentTitle="Card Approval Speed and Checkout Abandonment"
            />
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
              Card Approval Speed and Checkout Abandonment: The Connection Explained
            </h1>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <section className="mb-12">
                <p className="text-lg leading-relaxed mb-6">
                  When a customer pays by card, they expect the result to be immediate.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  If approval takes too long, many customers assume something has gone wrong. They hesitate, refresh the page, or abandon the checkout entirely.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  For businesses, this moment matters more than most people realise.
                </p>
                <p className="text-lg leading-relaxed">
                  This page explains why card approval speed is critical, what slows it down, and how it directly affects conversion rates and lost revenue.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Card approval feels instant but it is not guaranteed
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Most card payments are approved in one to three seconds.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  That speed feels invisible when everything works. Customers barely notice it.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  But when approval takes longer than expected, even by a few seconds, trust drops quickly.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  On mobile devices especially, delays longer than five seconds can feel like failure rather than processing.
                </p>
                <p className="text-lg leading-relaxed">
                  Customers do not usually wait to find out why.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  What actually happens during approval
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Approval speed depends on several systems working together in real time.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  During those few seconds:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The payment provider sends the transaction to the card network
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The card network forwards it to the issuing bank
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  The issuing bank checks available funds, fraud signals, and card rules
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  A response is sent back through the same chain
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Any additional check adds time.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  This includes:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Strong customer authentication
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Fraud scoring
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Cross border card usage
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  High value transactions
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Unusual spending patterns
                </p>
                <p className="text-lg leading-relaxed">
                  The more complex the check, the slower the approval.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Why small delays cause disproportionate drop off
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Customers are highly sensitive at checkout.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  They have already committed mentally. They are now waiting for confirmation.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  If that confirmation feels slow, doubt creeps in.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Common reactions include:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Refreshing the page
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Retrying the payment
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Abandoning the checkout
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Switching devices
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Giving up entirely
                </p>
                <p className="text-lg leading-relaxed">
                  In many cases, the card would have been approved if the customer had waited another second.
                </p>
                <p className="text-lg leading-relaxed mt-6">
                  Instead, the sale is lost.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Mobile and first time customers are most affected
                </h2>
                <p className="text-lg leading-relaxed mb-4">
                  Checkout abandonment caused by slow approvals is highest among:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Mobile users
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  First time customers
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Higher value purchases
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  International cards
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  These customers have less patience and less trust built in.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  They are also more likely to assume a technical issue rather than wait.
                </p>
                <p className="text-lg leading-relaxed">
                  This is why approval speed matters most for growing businesses trying to convert new customers.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Why some businesses see slower approvals than others
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Approval speed is not the same for every business.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  It can be affected by:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Industry risk profile
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Transaction values
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Customer geography
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Card types used
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Fraud history
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Provider and acquirer setup
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Some providers prioritise faster approvals but apply stricter reviews later.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Others apply heavier checks upfront, which slows approval but reduces later disruption.
                </p>
                <p className="text-lg leading-relaxed">
                  Neither approach is wrong. The key is alignment.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Faster approval does not mean fewer checks
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  It is important to understand that fast approval does not mean less compliance.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  It often means:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Better risk models
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Cleaner customer data
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  More predictable transaction patterns
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Stronger alignment between provider and acquirer
                </p>
                <p className="text-lg leading-relaxed">
                  Businesses that experience consistently fast approvals usually fit well within their provider's expectations.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  What businesses can realistically influence
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  You cannot control how banks make decisions.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  But you can influence:
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  Which provider and acquirer you use
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  How predictable your transactions are
                </p>
                <p className="text-lg leading-relaxed mb-2 pl-4">
                  How well your business model is understood upfront
                </p>
                <p className="text-lg leading-relaxed mb-6 pl-4">
                  Whether risk checks happen before or after growth
                </p>
                <p className="text-lg leading-relaxed">
                  Choosing the right setup reduces friction at the most sensitive moment in the customer journey.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  A practical takeaway
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                  Checkout abandonment is not always about price, design, or marketing.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Sometimes it is about time.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Even a few extra seconds during card approval can quietly cost revenue, especially as volume grows.
                </p>
                <p className="text-lg leading-relaxed">
                  If you want to understand whether your current payment setup supports fast, reliable approvals for your business model, a short assessment can help highlight potential friction before it affects conversion.
                </p>
              </section>

              <section className="mb-12">
                <Link 
                  to="/assessment"
                  replace 
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Start a short assessment →
                </Link>
              </section>

              <footer className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground italic">
                  This page explains general payment approval behaviour. It does not provide legal or financial advice and does not represent any card network, bank, or payment provider.
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

export default WhyCardApprovalSpeedAffectsCheckoutAbandonment;
