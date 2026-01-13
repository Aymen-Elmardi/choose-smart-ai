import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,15%,4%)] py-12 border-t border-[hsl(220,10%,10%)]">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-sm font-medium text-[hsl(220,10%,50%)]">ChosePayments</span>
          </div>
          
          <nav className="flex flex-wrap gap-8 text-xs">
            <Link to="/about" className="text-[hsl(220,10%,35%)] hover:text-[hsl(220,10%,55%)] transition-colors">
              About
            </Link>
            <Link to="/insights" className="text-[hsl(220,10%,35%)] hover:text-[hsl(220,10%,55%)] transition-colors">
              Insights
            </Link>
            <a href="mailto:hello@chosepayments.com" className="text-[hsl(220,10%,35%)] hover:text-[hsl(220,10%,55%)] transition-colors">
              Contact
            </a>
            <a href="#" className="text-[hsl(220,10%,35%)] hover:text-[hsl(220,10%,55%)] transition-colors">
              Privacy
            </a>
          </nav>
        </div>
        
        <div className="mt-10 pt-6 border-t border-[hsl(220,10%,10%)] text-xs text-[hsl(220,10%,25%)]">
          © 2026 ChosePayments. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
