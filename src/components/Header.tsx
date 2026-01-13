import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,15%,6%)]">
      <div className="section-container">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center">
            <span className="text-lg font-semibold text-[hsl(220,10%,75%)] tracking-tight">ChosePayments</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#how-it-works" className="text-[hsl(220,10%,50%)] hover:text-[hsl(220,10%,70%)] transition-colors text-sm">
              How it Works
            </Link>
            <Link to="/#why-us" className="text-[hsl(220,10%,50%)] hover:text-[hsl(220,10%,70%)] transition-colors text-sm">
              Why Us
            </Link>
            <Link to="/insights" className="text-[hsl(220,10%,50%)] hover:text-[hsl(220,10%,70%)] transition-colors text-sm">
              Insights
            </Link>
            <Link to="/about" className="text-[hsl(220,10%,50%)] hover:text-[hsl(220,10%,70%)] transition-colors text-sm">
              About
            </Link>
            <Button variant="ghost" size="sm" className="text-[hsl(220,10%,60%)] hover:text-[hsl(220,10%,80%)] hover:bg-[hsl(220,15%,12%)]" asChild>
              <Link to="/assessment?start=true" replace>
                Start Assessment
              </Link>
            </Button>
          </nav>

          <Button variant="ghost" size="sm" className="md:hidden text-[hsl(220,10%,60%)]" asChild>
            <Link to="/assessment?start=true" replace>
              Start
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
