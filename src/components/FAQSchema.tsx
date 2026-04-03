'use client'

import { useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    
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
    
    script.textContent = JSON.stringify(schemaData);
    
    // Remove existing FAQ schema if present
    const existingScript = document.getElementById("faq-schema");
    if (existingScript) {
      existingScript.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const scriptToRemove = document.getElementById("faq-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faqs]);

  return null;
};

export default FAQSchema;