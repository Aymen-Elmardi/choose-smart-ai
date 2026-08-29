'use client'

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

/**
 * Renders FAQPage structured data (JSON-LD).
 *
 * The <script> is returned as JSX rather than appended to document.head in an
 * effect, so the JSON-LD is present in the prerendered HTML. Under
 * `output: 'export'` an effect-injected tag only exists once client JS has run,
 * which means crawlers reading the static file never see it.
 */
/**
 * JSON.stringify does not escape "<", so a literal "</script>" anywhere in the
 * data would terminate the tag early. Escaping it keeps the payload inert.
 */
const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaData) }}
    />
  );
};

export default FAQSchema;
