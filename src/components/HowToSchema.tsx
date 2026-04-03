'use client'

import { useEffect } from "react";

interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format, e.g., "PT10M" for 10 minutes
}

const BASE_URL = "https://chosepayments.com";

/**
 * Injects HowTo structured data (JSON-LD) for SEO.
 * Use on step-by-step guide articles.
 */
const HowToSchema = ({
  name,
  description,
  steps,
  totalTime,
}: HowToSchemaProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "howto-schema";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": name,
      "description": description,
      ...(totalTime && { "totalTime": totalTime }),
      "step": steps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text,
      })),
    };

    script.textContent = JSON.stringify(schemaData);

    // Remove existing schema if present
    const existingScript = document.getElementById("howto-schema");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("howto-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, steps, totalTime]);

  return null;
};

export default HowToSchema;
