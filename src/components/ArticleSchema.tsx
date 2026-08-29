'use client'

import { usePathname } from "next/navigation";

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
 * Renders Article structured data (JSON-LD) for SEO.
 * Enhanced for E-E-A-T with keywords, articleBody, and author details.
 * Use this on all insight/blog articles.
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
  // Resolved at prerender time for statically exported routes, so the canonical
  // page URL is baked into the HTML instead of falling back to the site root.
  const pathname = usePathname();

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
      "@id": `${BASE_URL}${pathname ?? ""}`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemaData) }}
    />
  );
};

export default ArticleSchema;
