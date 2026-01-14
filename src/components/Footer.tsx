import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground tracking-tight">ChosePayments</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-8 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors">
              Insights
            </Link>
            <a href="mailto:hello@chosepayments.com" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </nav>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 ChosePayments. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
