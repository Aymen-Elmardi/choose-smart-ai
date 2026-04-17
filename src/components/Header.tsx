import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { to: "/#how-it-works", label: "How It Works" },
    { to: "/insights", label: "Insights" },
    { to: "/#why-us", label: "Why Us" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground tracking-tight">ChosePayments</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/analyse-statement"
              className="text-base font-medium text-primary hover:text-primary/80 transition-colors border-b border-primary/30 hover:border-primary pb-0.5"
            >
              Analyse My Statement
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] pt-12">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.to}>
                      <Link 
                        to={link.to}
                        className="text-foreground hover:text-primary transition-colors text-lg font-medium py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      to="/analyse-statement"
                      className="text-primary font-medium text-lg py-2 border-b border-primary/30 w-fit"
                      onClick={() => setIsOpen(false)}
                    >
                      Analyse My Statement
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="hero" className="mt-4" asChild>
                      <Link to="/assessment?start=true" replace onClick={() => setIsOpen(false)}>
                        Run My Risk Profile
                      </Link>
                    </Button>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
