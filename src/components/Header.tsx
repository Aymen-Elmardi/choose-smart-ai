'use client'

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { BOOKING_URL } from "@/lib/booking";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isUS = pathname === "/us" || (pathname?.startsWith("/us/") ?? false);

  // Solid + blurred once the page moves, transparent over the hero at rest.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section links are absolute (`/#id`) so they also work from article pages,
  // where they navigate home first and then scroll.
  const navLinks = [
    { to: "/#how", label: "How it works", external: false },
    { to: "/#why", label: "Why us", external: false },
    { to: "/#use-cases", label: "Use cases", external: false },
    { to: "/statement-review", label: "Hidden fee check", external: false },
    { to: isUS ? "/us/insights" : "/insights", label: "Insights", external: false },
  ];

  return (
    <header className={`cp-header${scrolled ? " cp-scrolled" : ""}`}>
      <div className="cp-wrap">
        <nav className="cp-nav">
          <Link href="/" className="cp-nav-logo" aria-label="ChosePayments home">
            <img src="/logo-mark.png" alt="" width={176} height={192} />
            <span className="cp-logotype">Chose<em>Payments</em></span>
          </Link>

          <div className="cp-nav-links">
            {navLinks.map((link) => (
              <Link key={link.to} href={link.to}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="cp-nav-right">
            <Link href="/assessment" className="cp-btn cp-btn-ghost cp-nav-cta-ghost">
              Risk analysis
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-btn cp-btn-primary cp-nav-cta-primary"
            >
              Book a call
            </a>

            {/* Mobile menu. The prototype simply hides the nav below 900px with
                no replacement; keeping the sheet here so small screens don't
                lose every navigation entry point. */}
            <div className="cp-nav-menu">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-[color:var(--cp-text)] hover:bg-[color:var(--cp-surface)] transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[288px] pt-12">
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.to}>
                        <Link
                          href={link.to}
                          className="text-[color:var(--cp-text)] text-lg font-medium py-2.5"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <SheetClose asChild>
                      <Link
                        href="/assessment"
                        className="cp-btn cp-btn-ghost mt-4 justify-center"
                        onClick={() => setIsOpen(false)}
                      >
                        Risk analysis
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cp-btn cp-btn-primary mt-2 justify-center"
                        onClick={() => setIsOpen(false)}
                      >
                        Book a call
                      </a>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
