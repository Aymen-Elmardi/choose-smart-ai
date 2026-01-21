import { useEffect } from "react";

interface ComparisonItem {
  name: string;
  description: string;
  provider?: string;
  fees?: string;
  bestFor?: string;
  rating?: number;
}

interface ComparisonTableSchemaProps {
  items: ComparisonItem[];
  listName: string;
  listDescription?: string;
}

const BASE_URL = "https://chosepayments.com";

/**
 * Injects ItemList + FinancialProduct structured data for comparison pages.
 * Enables rich snippets for provider comparison tables.
 * Use on pages like /stripe-vs-square-vs-paypal-uk and /best-payment-processor-uk
 */
const ComparisonTableSchema = ({
  items,
  listName,
  listDescription,
}: ComparisonTableSchemaProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "comparison-table-schema";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": listName,
      "description": listDescription || `Comparison of ${listName}`,
      "numberOfItems": items.length,
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "FinancialProduct",
          "name": item.name,
          "description": item.description,
          "provider": {
            "@type": "Organization",
            "name": item.provider || item.name,
          },
          ...(item.fees && {
            "offers": {
              "@type": "Offer",
              "description": `Transaction fees: ${item.fees}`,
            },
          }),
          ...(item.bestFor && {
            "audience": {
              "@type": "Audience",
              "audienceType": item.bestFor,
            },
          }),
          ...(item.rating && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": item.rating,
              "bestRating": 5,
              "worstRating": 1,
            },
          }),
        },
      })),
      "publisher": {
        "@type": "Organization",
        "name": "ChosePayments",
        "url": BASE_URL,
      },
    };

    script.textContent = JSON.stringify(schemaData);

    // Remove existing schema if present
    const existingScript = document.getElementById("comparison-table-schema");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("comparison-table-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items, listName, listDescription]);

  return null;
};

export default ComparisonTableSchema;
