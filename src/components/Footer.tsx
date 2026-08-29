'use client'

import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Linkedin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
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
          <h3>Stay updated on payment processor trends and tips for high-growth merchants</h3>
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
                <img src="/logo-mark.png" alt="" width={176} height={192} loading="lazy" decoding="async" />
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
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </nav>
          </div>

          <div className="cp-footer-bottom">
            <span>© 2026 ChosePayments. All rights reserved.</span>
            <span>Independent Payment Risk Analysis – US, UK &amp; EU</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
