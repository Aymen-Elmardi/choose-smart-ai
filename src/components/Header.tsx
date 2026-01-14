import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground tracking-tight">ChosePayments</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              How it Works
            </Link>
            <Link to="/#why-us" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Why Us
            </Link>
            <Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              Insights
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
              About
            </Link>
            <Button variant="hero" size="default" asChild>
              <Link to="/assessment?start=true" replace>
                Get Started
              </Link>
            </Button>
          </nav>

          <Button variant="hero" size="sm" className="md:hidden" asChild>
            <Link to="/assessment?start=true" replace>
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
