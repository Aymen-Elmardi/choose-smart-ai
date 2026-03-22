import { Link } from "react-router-dom";
import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="section-container">
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
