import { CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ChosePayments</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </Link>
            <Link to="/#why-us" className="text-muted-foreground hover:text-foreground transition-colors">
              Why Us
            </Link>
            <Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors">
              Insights
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Button variant="hero" size="default" asChild>
              <Link to="/assessment?start=true">
                Answer a few quick questions
              </Link>
            </Button>
          </nav>

          <Button variant="hero" size="sm" className="md:hidden" asChild>
            <Link to="/assessment?start=true">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
