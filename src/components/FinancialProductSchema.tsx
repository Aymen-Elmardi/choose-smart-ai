'use client'

import { useEffect } from "react";

interface FinancialProduct {
  name: string;
  description: string;
  provider: string;
  fees?: string;
  bestFor?: string;
}

interface FinancialProductSchemaProps {
  products: FinancialProduct[];
  listName?: string;
  areaServed?: string;
}

const BASE_URL = "https://chosepayments.com";

/**
 * Injects FinancialProduct and ItemList structured data (JSON-LD) for SEO.
 * Use on payment provider comparison pages.
 */
const FinancialProductSchema = ({
  products,
  listName = "UK Payment Providers Comparison",
  areaServed = "GB",
}: FinancialProductSchemaProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "financial-product-schema";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": listName,
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "FinancialProduct",
          "name": product.name,
          "description": product.description,
          "provider": {
            "@type": "Organization",
            "name": product.provider,
          },
          ...(product.fees && {
            "feesAndCommissionsSpecification": product.fees,
          }),
          "areaServed": areaServed,
          "category": "Payment Processing",
        },
      })),
    };

    script.textContent = JSON.stringify(schemaData);

    // Remove existing schema if present
    const existingScript = document.getElementById("financial-product-schema");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("financial-product-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [products, listName, areaServed]);

  return null;
};

export default FinancialProductSchema;
