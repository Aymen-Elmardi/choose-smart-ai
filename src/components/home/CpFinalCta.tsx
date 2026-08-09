'use client'

import { BOOKING_URL } from "@/lib/booking";

const CpFinalCta = () => (
  <section id="book" className="cp-section cp-cta-final">
    <div className="cp-wrap">
      <div className="cp-cta-final-inner cp-reveal">
        <h2>Let&apos;s talk about your payment setup</h2>
        <p>
          Book a free 15-minute call. We&apos;ll review your current setup, tell you if you&apos;re
          overpaying, and match you with a processor that actually fits.
        </p>
        <div className="cp-btn-row">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="cp-btn cp-btn-primary">
            Book a call
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default CpFinalCta;
