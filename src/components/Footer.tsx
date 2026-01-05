import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">ChosePayments</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            <Link to="/about" className="text-background/70 hover:text-background transition-colors">
              About
            </Link>
            <Link to="/insights" className="text-background/70 hover:text-background transition-colors">
              Insights
            </Link>
            <a href="mailto:hello@chosepayments.com" className="text-background/70 hover:text-background transition-colors">
              Contact
            </a>
            <a href="#" className="text-background/70 hover:text-background transition-colors">
              Privacy Policy
            </a>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-background/10 text-center text-sm text-background/50">
          © 2026 ChosePayments. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
