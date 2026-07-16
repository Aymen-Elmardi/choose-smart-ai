import { BOOKING_URL } from '@/lib/booking';

// Homepage "talk to a human" CTA. Mirrors the dark consultation card used on the
// insight articles, so the offer looks the same wherever a visitor meets it.
const ContactCTASection = () => (
  <section className="section-padding bg-background">
    <div className="section-container max-w-3xl mx-auto">
      <div
        style={{
          background: "#0D1117",
          border: "1px solid #1F2937",
          borderRadius: "14px",
          padding: "2.5rem 2.8rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg,#10B981,#059669)",
          }}
        />
        <p style={{ color: "#10B981", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 1rem 0" }}>
          Free Consultation
        </p>
        <p style={{ color: "#F9FAFB", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.4, margin: "0 0 0.75rem 0" }}>
          Would you rather just talk it through?
        </p>
        <p style={{ color: "#9CA3AF", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.75rem 0" }}>
          Book a free 15-minute call with our team. We will help you work out which processor actually fits your volume, industry, and risk profile. No sales pitch. No strings attached.
        </p>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: "#10B981",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "0.95rem",
            padding: "0.85rem 2rem",
            borderRadius: "8px",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Book a Free 15-Minute Call
        </a>
      </div>
    </div>
  </section>
);

export default ContactCTASection;
