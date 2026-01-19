import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, TrendingUp, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCanonical } from "@/hooks/useCanonical";

const ReferralCommissionGuide = () => {
  useCanonical();

  useEffect(() => {
    document.title = "How to Earn Recurring Commission by Referring Payment Providers | ChosePayments";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "If you advise other businesses, you're probably already influencing their payment choices. Here's how referral commission works and how to do it without burning trust.");
    }
    return () => {
      document.title = "ChosePayments";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Link 
            to="/insights" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Insights
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Guide
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              How Businesses Earn Recurring Commission by Referring Payment Providers
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              If you run an agency, consultancy, platform, or any business that advises other businesses, you're probably already influencing one of the most valuable decisions they make: which payment provider to use.
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-foreground/90">
            
            <p className="text-lg leading-relaxed">
              Every week, someone asks you a version of the same question:
            </p>
            
            <blockquote className="border-l-4 border-primary/30 pl-6 my-8 italic text-muted-foreground">
              "Should we use Stripe or PayPal?"<br />
              "Why did our payment account get frozen?"<br />
              "Can you help us get better processing rates?"
            </blockquote>
            
            <p className="text-lg leading-relaxed">
              What most people don't realise is that payment providers often pay <strong>recurring commission</strong> to businesses that introduce merchants to them, provided those introductions are qualified and appropriate.
            </p>
            
            <p className="text-lg leading-relaxed">
              This isn't affiliate marketing. It's not about clicks or referral codes. It's about being compensated for something you're already doing: helping businesses make better decisions.
            </p>

            {/* Section: What This Actually Looks Like */}
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-primary" />
              What This Actually Looks Like
            </h2>
            
            <p className="text-lg leading-relaxed">
              Payment referral commission is typically structured as an ongoing revenue share. You introduce a business to a provider. If they're approved and start processing, you receive a small percentage of the provider's revenue from that merchant, usually monthly or quarterly.
            </p>
            
            <p className="text-lg leading-relaxed">
              The amounts vary, but here's a simplified example:
            </p>
            
            <div className="bg-muted/50 rounded-lg p-6 my-8">
              <p className="text-foreground font-medium mb-2">A business you refer processes £150,000/month</p>
              <p className="text-muted-foreground mb-2">The provider earns roughly £1,500 in fees</p>
              <p className="text-primary font-semibold">You receive £150 to £400 per month, recurring</p>
            </div>
            
            <p className="text-lg leading-relaxed">
              That's not life-changing from one referral. But if you advise 10, 20, or 50 businesses a year? It adds up. And unlike one-off affiliate payouts, this income compounds over time.
            </p>

            {/* Section: Who This Is For */}
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              Who This Is For
            </h2>
            
            <p className="text-lg leading-relaxed">
              You don't need to be a payments company. You just need to be in a position where other businesses trust your opinion on operational decisions.
            </p>
            
            <p className="text-lg leading-relaxed">
              That includes:
            </p>
            
            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Digital agencies</strong> in ecommerce, web development, or growth marketing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>SaaS platforms</strong> with paying customers who need to accept payments</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Accountants and bookkeepers</strong> who see the full financial picture</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Business consultants</strong> helping clients scale or restructure</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>POS vendors and tech resellers</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Industry-specific service providers</strong> in hospitality, retail, or marketplaces</span>
              </li>
            </ul>
            
            <p className="text-lg leading-relaxed">
              If your business already influences how clients operate or grow, you're likely eligible. The key requirement is credibility and context, not sales volume.
            </p>

            {/* Section: Why Providers Pay */}
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6 text-primary" />
              Why Payment Providers Are Happy to Pay
            </h2>
            
            <p className="text-lg leading-relaxed">
              Payment providers don't make money upfront. They make money over time, from transaction fees. A good merchant can generate thousands in annual revenue and stay with a provider for years.
            </p>
            
            <p className="text-lg leading-relaxed">
              That's why providers are willing to share revenue with people who bring them <em>qualified</em> merchants. A warm introduction from someone who understands the business is far more valuable than a cold sales lead.
            </p>
            
            <p className="text-lg leading-relaxed">
              Good referrals mean:
            </p>
            
            <ul className="space-y-2 my-6 text-muted-foreground">
              <li>• Higher approval rates</li>
              <li>• Fewer account freezes and disputes</li>
              <li>• Better long-term retention</li>
              <li>• Lower acquisition costs</li>
            </ul>
            
            <p className="text-lg leading-relaxed">
              In short: qualified referrals are cheaper and safer than cold sales. Providers know this.
            </p>

            {/* Section: The Trap */}
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              The Trap Most Businesses Fall Into
            </h2>
            
            <p className="text-lg leading-relaxed">
              Here's where things go wrong.
            </p>
            
            <p className="text-lg leading-relaxed">
              Most businesses that try to earn referral commission make the same mistake: <strong>they refer everyone to the same provider.</strong>
            </p>
            
            <p className="text-lg leading-relaxed">
              Maybe it's Stripe because that's what they use. Maybe it's whoever offered the best commission rate. Either way, blind referrals lead to:
            </p>
            
            <ul className="space-y-2 my-6 text-muted-foreground">
              <li>• Failed applications</li>
              <li>• Frozen accounts weeks after launch</li>
              <li>• Frustrated clients who blame you</li>
              <li>• Damaged trust</li>
              <li>• Lost commission (providers don't pay for merchants who churn)</li>
            </ul>
            
            <p className="text-lg leading-relaxed">
              Payment providers are not interchangeable. Each has different risk tolerances, underwriting rules, and ideal customer profiles. A referral that's perfect for one provider might be rejected or frozen by another.
            </p>

            {/* Section: Getting It Right */}
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              How to Get This Right
            </h2>
            
            <p className="text-lg leading-relaxed">
              The most effective approach isn't about selling payments. It's about understanding:
            </p>
            
            <ul className="space-y-2 my-6 text-muted-foreground">
              <li>• How the business actually operates</li>
              <li>• What kind of transactions they'll process</li>
              <li>• Where their customers are based</li>
              <li>• What their growth looks like</li>
            </ul>
            
            <p className="text-lg leading-relaxed">
              Then matching them to a provider that fits, not just the one you have a relationship with.
            </p>
            
            <p className="text-lg leading-relaxed">
              This protects your client relationship, your reputation, and your recurring revenue. Commission should be the <em>outcome</em> of good advice, not the driver of it.
            </p>

            {/* Section: Where ChosePayments Fits */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 my-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Where ChosePayments Fits In
              </h2>
              
              <p className="text-lg leading-relaxed mb-4">
                ChosePayments was built to solve the mismatch problem.
              </p>
              
              <p className="text-lg leading-relaxed mb-4">
                Instead of pushing a single provider, our assessment evaluates how a business actually operates, identifies suitable providers, and reduces the risk of failed referrals or frozen accounts.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                For businesses referring other businesses, this means better recommendations, fewer client headaches, and sustainable recurring commission without needing to become a payments expert yourself.
              </p>
              
              <Link to="/assessment">
                <Button variant="default" size="lg">
                  Try the Assessment
                </Button>
              </Link>
            </div>

            {/* Section: Transparency */}
            <h2 className="text-2xl font-bold text-foreground mt-12 mb-6">
              A Note on Transparency
            </h2>
            
            <p className="text-lg leading-relaxed">
              Any referral arrangement should be disclosed to clients. Not because it's legally required in every case, but because it builds trust.
            </p>
            
            <p className="text-lg leading-relaxed">
              When you're transparent about how you're compensated, and when clients see that your recommendation actually worked for them, you've created something more valuable than a one-off commission. You've built a reputation.
            </p>

            {/* Final Takeaway */}
            <div className="border-t border-border pt-8 mt-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                The Bottom Line
              </h2>
              
              <p className="text-lg leading-relaxed">
                If your business already helps other businesses operate, scale, or make technical decisions, you're already influencing payment choices. The opportunity isn't selling payments. It's guiding businesses to the right provider and being fairly compensated for doing it well.
              </p>
              
              <p className="text-lg leading-relaxed mt-4">
                Done correctly, everyone wins: the client, the provider, and your business.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-foreground text-background rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">
              Want to learn more about referral partnerships?
            </h3>
            <p className="text-background/70 mb-6 max-w-xl mx-auto">
              If you're a platform, agency, or advisor interested in exploring referral arrangements, get in touch. We can help you understand how this works and whether it's right for your business.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReferralCommissionGuide;
