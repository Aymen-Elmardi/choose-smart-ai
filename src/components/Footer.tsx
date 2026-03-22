import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setSubmitting(true);
    try {
      await supabase.from("popup_submissions").insert({
        popup_type: "newsletter",
        question: "Newsletter signup",
        email: email.trim(),
        page_url: window.location.pathname,
      });
      setSubscribed(true);
    } catch {
      // Silently fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-background border-t border-border">
      {/* Newsletter Section */}
      <div className="section-container py-10 border-b border-border">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Stay updated on payment processor trends and tips for high-growth merchants
          </h3>
          {subscribed ? (
            <p className="text-primary font-medium mt-4">Thanks! You're subscribed.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 mt-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 rounded-full px-4"
                required
              />
              <Button type="submit" size="sm" disabled={submitting} className="rounded-full px-6 h-11">
                {submitting ? "..." : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-foreground tracking-tight">ChosePayments</span>
            <a 
              href="https://www.linkedin.com/company/chosepayments" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors">
              Insights
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 ChosePayments. All rights reserved. | Based in the United Kingdom | Independent Payment Risk Analysis
        </div>
      </div>
    </footer>
  );
};

export default Footer;
