import { useEffect } from "react";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
}

const BASE_URL = "https://chosepayments.com";

/**
 * Injects Article structured data (JSON-LD) for SEO.
 * Use this on all insight/blog articles.
 */
const ArticleSchema = ({
  title,
  description,
  publishedTime = "2026-01-01",
  modifiedTime,
  author = "ChosePayments",
  image = "https://chosepayments.com/og-default.png",
}: ArticleSchemaProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-schema";

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image,
      "author": {
        "@type": "Organization",
        "name": author,
        "url": BASE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name": "ChosePayments",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/favicon.png`,
        },
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": typeof window !== "undefined" ? window.location.href : BASE_URL,
      },
    };

    script.textContent = JSON.stringify(schemaData);

    // Remove existing article schema if present
    const existingScript = document.getElementById("article-schema");
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("article-schema");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [title, description, publishedTime, modifiedTime, author, image]);

  return null;
};

export default ArticleSchema;
