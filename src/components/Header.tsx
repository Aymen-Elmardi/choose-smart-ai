'use client'

import { useState } from "react";
import { usePathname } from 'next/navigation';
import { Link } from '@/lib/router-compat';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isUS = pathname === "/us" || (pathname?.startsWith("/us/") ?? false);
  const isHome = pathname === "/" || pathname === "/us";
  const ctaLabel = isHome ? "See if you're overpaying" : "Run My Risk Profile";
  const ctaHref = isHome ? (isUS ? "/statement-review?us=1" : "/statement-review") : "/assessment?start=true";

  const navLinks = [
    { to: "/#how-it-works", label: "How It Works" },
    { to: isUS ? "/us/insights" : "/insights", label: "Insights" },
    { to: "/#why-us", label: "Why Us" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="ChosePayments home">
            <img src="/chosepayments-logo.svg" alt="ChosePayments" className="h-8 w-auto shrink-0" width={144} height={36} />
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to} 
                className="text-muted-foreground hover:text-foreground transition-colors text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="hero" size="sm" asChild>
              <Link to="/onboard-with-us">
                Partner With Us
              </Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to={ctaHref} replace>
                {ctaLabel}
              </Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-3">
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
                    <Button variant="hero" className="mt-2 w-fit" asChild>
                      <Link to="/onboard-with-us" onClick={() => setIsOpen(false)}>
                        Partner With Us
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="hero" className="mt-4" asChild>
                      <Link to={ctaHref} replace onClick={() => setIsOpen(false)}>
                        {ctaLabel}
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
