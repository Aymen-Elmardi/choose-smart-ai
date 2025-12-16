import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ChosePayments</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#why-us" className="text-muted-foreground hover:text-foreground transition-colors">
              Why Us
            </a>
            <Button variant="hero" size="default" asChild>
              <a href="/quiz" target="_blank" rel="noopener noreferrer">
                Take the Quiz
              </a>
            </Button>
          </nav>

          <Button variant="hero" size="sm" className="md:hidden" asChild>
            <a href="/quiz" target="_blank" rel="noopener noreferrer">
              Start Quiz
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
