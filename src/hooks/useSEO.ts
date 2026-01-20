import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://chosepayments.com";
const DEFAULT_OG_IMAGE = "https://chosepayments.com/og-default.png";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  noIndex?: boolean;
}

// Use useLayoutEffect for SSR/prerendering to ensure meta tags are set before paint
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Sets SEO meta tags for the current page including:
 * - Title
 * - Meta description
 * - Canonical URL
 * - Robots meta tag (index, follow)
 * - Open Graph meta tags
 * - Twitter Card meta tags
 * - Article meta tags (for articles)
 * - Keywords meta tag
 */
export const useSEO = ({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  publishedTime,
  modifiedTime,
  author = "ChosePayments",
  keywords,
  noIndex = false,
}: SEOProps) => {
  const location = useLocation();

  const setMetaTag = (selector: string, attribute: string, value: string, createTag?: () => HTMLElement) => {
    let element = document.querySelector(selector) as HTMLElement | null;
    if (!element && createTag) {
      element = createTag();
      document.head.appendChild(element);
    }
    if (element) {
      element.setAttribute(attribute, value);
    }
  };

  const removeMetaTag = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
    }
  };

  // Set meta tags immediately (synchronously) for prerendering
  const updateMetaTags = () => {
    const path = location.pathname === "/" ? "" : location.pathname;
    const canonicalUrl = `${BASE_URL}${path}`;

    // Set title
    document.title = title;

    // Set meta description
    setMetaTag('meta[name="description"]', "content", description, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      return meta;
    });

    // Set robots meta tag
    setMetaTag('meta[name="robots"]', "content", noIndex ? "noindex, nofollow" : "index, follow", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      return meta;
    });

    // Set canonical URL
    setMetaTag('link[rel="canonical"]', "href", canonicalUrl, () => {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      return link;
    });

    // Set keywords if provided
    if (keywords && keywords.length > 0) {
      setMetaTag('meta[name="keywords"]', "content", keywords.join(", "), () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "keywords");
        return meta;
      });
    }

    // Open Graph meta tags
    setMetaTag('meta[property="og:title"]', "content", title, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      return meta;
    });

    setMetaTag('meta[property="og:description"]', "content", description, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      return meta;
    });

    setMetaTag('meta[property="og:type"]', "content", ogType, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:type");
      return meta;
    });

    setMetaTag('meta[property="og:url"]', "content", canonicalUrl, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:url");
      return meta;
    });

    setMetaTag('meta[property="og:image"]', "content", ogImage, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:image");
      return meta;
    });

    setMetaTag('meta[property="og:site_name"]', "content", "ChosePayments", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:site_name");
      return meta;
    });

    // Twitter Card meta tags
    setMetaTag('meta[name="twitter:card"]', "content", "summary_large_image", () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:card");
      return meta;
    });

    setMetaTag('meta[name="twitter:title"]', "content", title, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:title");
      return meta;
    });

    setMetaTag('meta[name="twitter:description"]', "content", description, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:description");
      return meta;
    });

    setMetaTag('meta[name="twitter:image"]', "content", ogImage, () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:image");
      return meta;
    });

    // Article-specific meta tags (only for articles)
    if (ogType === "article") {
      if (publishedTime) {
        setMetaTag('meta[property="article:published_time"]', "content", publishedTime, () => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:published_time");
          return meta;
        });
      }

      if (modifiedTime) {
        setMetaTag('meta[property="article:modified_time"]', "content", modifiedTime, () => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:modified_time");
          return meta;
        });
      }

      if (author) {
        setMetaTag('meta[property="article:author"]', "content", author, () => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:author");
          return meta;
        });
      }
    } else {
      // Remove article meta tags if not an article
      removeMetaTag('meta[property="article:published_time"]');
      removeMetaTag('meta[property="article:modified_time"]');
      removeMetaTag('meta[property="article:author"]');
    }
  };

  // Run synchronously on mount for prerendering
  useIsomorphicLayoutEffect(() => {
    updateMetaTags();

    return () => {
      document.title = "ChosePayments";
    };
  }, [title, description, ogImage, ogType, publishedTime, modifiedTime, author, keywords, noIndex, location.pathname]);
};
