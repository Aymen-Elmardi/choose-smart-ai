import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import FAQSchema from "@/components/FAQSchema";

const WhyStripeFreezes = () => {
  useSEO({
    title: "Why Stripe Freezes Accounts in the UK | ChosePayments",
    description: "Stripe does not freeze accounts at random. Learn the common triggers for Stripe account freezes in the UK and how to prevent them before they happen."
  });

  const faqs = [
    {
      question: "Why does Stripe freeze accounts in the UK?",
      answer: "Stripe freezes accounts when automated risk systems detect activity that no longer matches the information originally provided at signup. This includes sudden volume increases, customer type changes, or products in higher risk categories."
    },
    {
      question: "What triggers a Stripe account freeze?",
      answer: "Common triggers include sudden increase in transaction volume, changes in customer types, new products in higher risk categories, incomplete or outdated business information, and changes to business structure or ownership."
    },
    {
      question: "How can I prevent my Stripe account from being frozen?",
      answer: "Keep your business information up to date, notify Stripe before significant volume increases, understand which products may be considered higher risk, and choose a payment provider aligned with your business model from the start."
    },
    {
      question: "Are Stripe account freezes random?",
      answer: "No, Stripe account freezes are not random. They are triggered by specific risk signals and are designed to protect card networks and customers. Understanding these signals can help you prevent freezes."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FAQSchema faqs={faqs} />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <InsightsBreadcrumb 
            category={{ name: "Payment Risk", slug: "payment-risk" }}
            currentTitle="Why Stripe Freezes Accounts"
          />
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Why Stripe Freezes Accounts in the UK
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              Stripe does not freeze accounts at random. In the UK, freezes usually happen when automated risk systems detect activity that no longer matches the information originally provided at signup.
            </p>
            
            <p>
              Common triggers include a sudden increase in transaction volume, changes in the type of customers you serve, or new products that fall into higher-risk categories. Stripe regularly re-evaluates accounts as businesses grow, especially when card usage patterns change. Understanding <Link to="/stripe-vs-square-vs-paypal-uk" className="text-primary hover:underline">how Stripe, Square, and PayPal assess risk</Link> differently can help you prepare.
            </p>
            
            <p>
              Another frequent cause is incomplete or outdated business information. If your business structure, ownership, or operating model has evolved, Stripe may pause payouts while it reassesses risk.
            </p>
            
            <p>
              These reviews are not accusations. They are safeguards designed to protect card networks and customers. However, they can be disruptive if you are unprepared.
            </p>
            
            <p>
              If your business is growing or changing, understanding approval and risk signals early can prevent interruptions later. <Link to="/best-payment-processor-uk" className="text-primary hover:underline">Choosing the right payment processor in the UK</Link> from the start reduces this risk significantly.
            </p>
            
            <p className="text-foreground font-medium mt-8">
              If this situation sounds familiar, our assessment helps identify approval risks before you apply or scale.
            </p>
            
            <Link 
              to="/assessment?start=true"
              replace
              className="inline-block mt-4 text-primary hover:text-primary/80 font-medium underline underline-offset-4"
            >
              Take our short assessment →
            </Link>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default WhyStripeFreezes;
