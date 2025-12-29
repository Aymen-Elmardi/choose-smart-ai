import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://chosepayments.com";

interface SEOProps {
  title: string;
  description: string;
}

/**
 * Sets SEO meta tags for the current page including:
 * - Title
 * - Meta description
 * - Canonical URL
 * - Robots meta tag (index, follow)
 */
export const useSEO = ({ title, description }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Set title
    document.title = title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Set robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", "index, follow");

    // Set canonical URL
    const path = location.pathname === "/" ? "" : location.pathname;
    const canonicalUrl = `${BASE_URL}${path}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    return () => {
      document.title = "ChosePayments";
    };
  }, [title, description, location.pathname]);
};
