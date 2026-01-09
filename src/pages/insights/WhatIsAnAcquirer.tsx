import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import { useSEO } from "@/hooks/useSEO";

const WhatIsAnAcquirer = () => {
  useSEO({
    title: "What Is an Acquirer and Why Your Payment Provider Needs One | ChosePayments",
    description: "Understand what an acquirer is, how they connect payment providers to card networks, and why this relationship affects your business approval and account reviews."
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <InsightsBreadcrumb 
              category={{ name: "Guides", slug: "guides" }}
              currentTitle="What Is an Acquirer"
            />

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
              What Is an Acquirer and Why Your Payment Provider Needs One
            </h1>

            <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
              <p>
                Most businesses never hear the word "acquirer" until something goes wrong.
              </p>
              <p>
                Your payment provider may feel like the company approving your account, processing transactions, and holding your funds. In reality, there is another party behind the scenes that plays a much bigger role in risk decisions.
              </p>
              <p>
                That party is the acquirer.
              </p>
              <p>
                This page explains what an acquirer actually is, why payment providers rely on them, and why understanding this relationship matters if you want fewer surprises later.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                What an acquirer actually does
              </h2>
              <p>
                An acquirer is a regulated financial institution that connects your business to the card networks like Visa and Mastercard.
              </p>
              <p>Their role is to:</p>
              <p className="pl-4">• Sponsor merchants into the card networks</p>
              <p className="pl-4">• Set risk rules based on network requirements</p>
              <p className="pl-4">• Settle card payments into merchant accounts</p>
              <p className="pl-4">• Carry legal responsibility if something goes wrong</p>
              <p>
                In simple terms, the acquirer is the institution taking the financial and regulatory risk on your transactions.
              </p>
              <p>
                Your payment provider does not operate independently. They must work under an acquirer's license.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Why payment providers need acquirers
              </h2>
              <p>
                Most payment providers are not banks.
              </p>
              <p>
                They build technology, checkout flows, dashboards, and APIs. But they cannot access card networks directly without an acquirer backing them.
              </p>
              <p>This means:</p>
              <p className="pl-4">• Every payment provider has one or more acquirers behind it</p>
              <p className="pl-4">• Your approval is ultimately tied to acquirer rules</p>
              <p className="pl-4">• Your account can be reviewed even if nothing has changed on your side</p>
              <p>
                When a provider says "our risk team needs more information," they are often responding to acquirer requirements.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Who actually approves your business
              </h2>
              <p>
                Initial onboarding may feel instant.
              </p>
              <p>
                But approval is not a one-time event.
              </p>
              <p>Acquirers continuously monitor:</p>
              <p className="pl-4">• Transaction patterns</p>
              <p className="pl-4">• Volume growth</p>
              <p className="pl-4">• Disputes and chargebacks</p>
              <p className="pl-4">• Industry changes</p>
              <p className="pl-4">• Regulatory updates</p>
              <p>If risk increases, the acquirer can require:</p>
              <p className="pl-4">• More documents</p>
              <p className="pl-4">• Updated verification</p>
              <p className="pl-4">• Transaction limits</p>
              <p className="pl-4">• Account reviews</p>
              <p>
                This is why accounts can be flagged months or years after launch.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Why switching providers does not always fix the problem
              </h2>
              <p>
                Many businesses assume switching payment providers will remove friction.
              </p>
              <p>
                But if the new provider uses the same acquirer, the same risk rules still apply.
              </p>
              <p>This is why:</p>
              <p className="pl-4">• Problems sometimes follow you between providers</p>
              <p className="pl-4">• Approval outcomes feel inconsistent</p>
              <p className="pl-4">• Different providers can ask for the same documents</p>
              <p>
                Understanding the acquirer layer explains why this happens.
              </p>

              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">
                Why this matters when choosing a provider
              </h2>
              <p>
                Choosing a payment provider is not just a pricing or feature decision.
              </p>
              <p>
                It is also a risk alignment decision.
              </p>
              <p>
                Some providers work with acquirers that are more conservative. Others support faster growth but apply stricter monitoring later.
              </p>
              <p>
                Knowing how acquirers work helps you choose a provider that fits your business model before problems appear.
              </p>
              <p>
                If you want help understanding which providers are likely to align with your business, you can{" "}
                <Link to="/assessment" className="text-primary hover:underline">
                  start a short assessment
                </Link>{" "}
                to avoid unnecessary friction later.
              </p>
            </div>

            <footer className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                This content is informational and explains general payment system behaviour. It does not provide legal or financial advice and does not represent any card network or payment provider.
              </p>
            </footer>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default WhatIsAnAcquirer;
