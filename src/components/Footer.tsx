'use client'

import { useState } from "react";
import { LOGO, IS_SEASONAL_LOGO } from "@/lib/brand";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { OPEN_COOKIE_SETTINGS } from "@/components/CookieConsent";

interface FooterProps {
  /** Replaces the default tagline in the bottom row. Only the homepage sets it. */
  tagline?: string;
  /** Replaces the default newsletter heading and adds a line under it. Only the homepage sets it. */
  newsletter?: { heading: string; body: string };
}

const Footer = ({ tagline, newsletter }: FooterProps = {}) => {
  const pathname = usePathname();
  const isUS = pathname === "/us" || (pathname?.startsWith("/us/") ?? false);
  const insightsHref = isUS ? "/us/insights" : "/insights";
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return;

    setSubmitting(true);
    setError(false);

    const page = typeof window !== "undefined" ? window.location.pathname : "";

    // Two independent sinks: the existing submissions table (unchanged, so the
    // historical record stays intact) and the contact mailbox, so a signup
    // actually reaches a human rather than only landing in the database.
    const [stored, mailed] = await Promise.allSettled([
      supabase.from("popup_submissions").insert({
        popup_type: "newsletter",
        question: "Newsletter signup",
        email: value,
        page_url: page,
      }),
      supabase.functions.invoke("send-contact-email", {
        body: {
          type: "newsletter",
          name: "Newsletter subscriber",
          email: value,
          businessName: "Not provided",
          message: `Newsletter signup from ${page || "the site"}.`,
        },
      }),
    ]);

    const ok =
      (stored.status === "fulfilled" && !stored.value.error) ||
      (mailed.status === "fulfilled" && !mailed.value.error);

    if (ok) {
      setSubscribed(true);
      setEmail("");
    } else {
      setError(true);
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="cp-newsletter">
        <div className="cp-wrap cp-nl-row">
          {newsletter ? (
            <div>
              <h3>{newsletter.heading}</h3>
              <p className="text-sm text-[color:var(--cp-text-2)] mt-1 max-w-[360px]">{newsletter.body}</p>
            </div>
          ) : (
            <h3>Stay updated on payment processor trends and tips for high-growth merchants</h3>
          )}
          {subscribed ? (
            <p className="cp-nl-note" role="status">Thanks. You&apos;re subscribed.</p>
          ) : (
            <form className="cp-nl-form" onSubmit={handleSubscribe}>
              <label htmlFor="cp-newsletter-email" className="sr-only">Email address</label>
              <input
                id="cp-newsletter-email"
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="cp-btn cp-btn-primary" disabled={submitting}>
                {submitting ? "Subscribing…" : "Subscribe"}
              </button>
              {error && (
                <p role="alert" className="w-full text-sm text-[color:var(--cp-text-2)]">
                  Something went wrong. Email us at{" "}
                  <a href="mailto:hello@chosepayments.com" className="underline">hello@chosepayments.com</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <footer className="cp-footer">
        <div className="cp-wrap">
          <div className="cp-footer-top">
            <div className="flex items-center gap-4">
              <Link href="/" className="cp-nav-logo" aria-label="ChosePayments home">
                <img src={LOGO.mark.src} alt="" width={LOGO.mark.width} height={LOGO.mark.height} loading="lazy" decoding="async" style={IS_SEASONAL_LOGO ? { borderRadius: 6 } : undefined} />
                <span className="cp-logotype">Chose<em>Payments</em></span>
              </Link>
              <a
                href="https://www.linkedin.com/company/chosepayments"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[color:var(--cp-text-3)] hover:text-[color:var(--cp-text)] transition-colors"
                aria-label="ChosePayments on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <nav className="cp-footer-links">
              <Link href="/about">About</Link>
              <Link href={insightsHref}>Insights</Link>
              <Link href="/contact" data-cta="write" data-placement="footer">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>Cookie settings</button>
            </nav>
          </div>

          <div className="cp-footer-bottom">
            <span>© 2026 ChosePayments. All rights reserved.</span>
            <span>{tagline ?? "Independent Payment Risk Analysis \u2013 US, UK & EU"}</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
