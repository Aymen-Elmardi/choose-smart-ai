'use client'

import Link from 'next/link';
import { BOOKING_URL } from "@/lib/booking";

const CpFinalCta = () => (
  <section id="book" className="cp-section cp-cta-final">
    <div className="cp-wrap">
      <div className="cp-cta-final-inner cp-reveal">
        <h2>Find your payment processor today</h2>
        <p>
          5 questions, about 30 seconds, and a match you can act on. Prefer to talk it through?
          Book a free 15-minute call or write to us.
        </p>
        <div className="cp-btn-row">
          <Link href="/assessment" className="cp-btn cp-btn-primary">
            Find my processor
          </Link>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cp-btn cp-btn-ghost">
            Book a free call
          </a>
        </div>
        <Link href="/contact" className="cp-i-more">Or write to us</Link>
      </div>
    </div>
  </section>
);

export default CpFinalCta;
