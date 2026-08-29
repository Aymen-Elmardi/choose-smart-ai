'use client'

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BASE_URL = "https://chosepayments.com";

/**
 * Renders BreadcrumbList structured data (JSON-LD) for SEO.
 * Mirrors the visual breadcrumb navigation.
 *
 * The <script> is returned as JSX rather than appended to document.head in an
 * effect, so the JSON-LD is present in the prerendered HTML. Under
 * `output: 'export'` an effect-injected tag only exists once client JS has run,
 * which means crawlers reading the static file never see it.
 *
 * Usage:
 * <BreadcrumbSchema items={[
 *   { name: "Home", url: "/" },
 *   { name: "Insights", url: "/insights" },
 *   { name: "Article Title" } // No URL for current page
 * ]} />
 */
/**
 * JSON.stringify does not escape "<", so a literal "</script>" anywhere in the
 * data would terminate the tag early. Escaping it keeps the payload inert.
 */
const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url ? { "item": `${BASE_URL}${item.url}` } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaData) }}
    />
  );
};

export default BreadcrumbSchema;
