'use client'

import { useEffect } from "react";

interface ArticleSchemaProps {
  title: string;
  description: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  authorUrl?: string;
  image?: string;
  sources?: Array<{ name: string; url: string }>;
  keywords?: string[];
  articleBody?: string;
}

const BASE_URL = "https://chosepayments.com";

/**
 * Injects Article structured data (JSON-LD) for SEO.
 * Enhanced for E-E-A-T with keywords, articleBody, and author details.
 * Use this on all insight/blog articles.
 */
const ArticleSchema = ({
  title,
  description,
  publishedTime = "2025-12-17",
  modifiedTime,
  author = "ChosePayments",
  authorUrl = BASE_URL,
  image = "https://chosepayments.com/og-default.png",
  sources,
  keywords,
  articleBody,
}: ArticleSchemaProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-schema";

    const schemaData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image,
      "author": {
        "@type": "Organization",
        "name": author,
        "url": authorUrl,
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

    // Add keywords if provided
    if (keywords && keywords.length > 0) {
      schemaData.keywords = keywords.join(", ");
    }

    // Add articleBody if provided (truncated to 2000 chars for schema)
    if (articleBody) {
      schemaData.articleBody = articleBody.slice(0, 2000);
    }

    // Add citations if sources provided
    if (sources && sources.length > 0) {
      schemaData.citation = sources.map(source => ({
        "@type": "CreativeWork",
        "name": source.name,
        "url": source.url
      }));
    }

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
  }, [title, description, publishedTime, modifiedTime, author, authorUrl, image, sources, keywords, articleBody]);

  return null;
};

export default ArticleSchema;
