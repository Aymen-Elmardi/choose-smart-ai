'use client'

import { useEffect } from "react";
import { useLocation } from '@/lib/router-compat';

const BASE_URL = "https://chosepayments.com";

/**
 * Sets the canonical URL for the current page.
 * Ensures HTTPS without www prefix for all pages.
 */
export const useCanonical = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname === "/" ? "" : location.pathname;
    const canonicalUrl = `${BASE_URL}${path}`;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    
    link.setAttribute("href", canonicalUrl);

    return () => {
      // Don't remove on cleanup - let the next page set its own
    };
  }, [location.pathname]);
};

/**
 * Returns the canonical URL for a given path.
 */
export const getCanonicalUrl = (path: string): string => {
  const cleanPath = path === "/" ? "" : path;
  return `${BASE_URL}${cleanPath}`;
};
