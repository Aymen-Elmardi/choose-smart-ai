import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

const BASE_URL = "https://chosepayments.com";

/**
 * Injects BreadcrumbList structured data (JSON-LD) for SEO.
 * Mirrors the visual breadcrumb navigation.
 * 
 * Usage:
 * <BreadcrumbSchema items={[
 *   { name: "Home", url: "/" },
 *   { name: "Insights", url: "/insights" },
 *   { name: "Article Title" } // No URL for current page
 * ]} />
 */
const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "breadcrumb-schema";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        ...(item.url && { "item": `${BASE_URL}${item.url}` }),
      })),
    };

    script.textContent = JSON.stringify(schemaData);

    // Remove existing breadcrumb schema if present
    const existingScript = document.getElementById("breadcrumb-schema");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("breadcrumb-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return null;
};

export default BreadcrumbSchema;
