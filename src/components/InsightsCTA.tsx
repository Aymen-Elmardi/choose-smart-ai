import { BOOKING_URL } from "@/lib/booking";

interface InsightsCTAProps {
  variant?: "default" | "compact";
}

/**
 * Standardized Call-to-Action block for all /insights articles.
 * Mirrors the "Book a 15-Minute Call" CTA used on the homepage
 * (ContactCTASection) so the offer looks the same wherever a visitor meets it.
 */
const InsightsCTA = ({ variant = "default" }: InsightsCTAProps) => {
  if (variant === "compact") {
    return (
      <div
        style={{
          marginTop: "3rem",
          background: "#0D1117",
          border: "1px solid #1F2937",
          borderRadius: "12px",
          padding: "1.5rem",
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p style={{ color: "#10B981", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.5rem 0" }}>
              Free Consultation
            </p>
            <h3 style={{ color: "#F9FAFB", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>
              Would you rather just talk it through?
            </h3>
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#10B981",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.9rem",
              padding: "0.7rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Book a Free 15-Minute Call
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-16">
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
    </section>
  );
};

export default InsightsCTA;
