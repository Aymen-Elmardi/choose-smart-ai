'use client'

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

// No-op: every route now exports its own Next.js `metadata` (title, description,
// canonical, robots, OG, Twitter) via app/**/page.tsx, resolved server-side against
// the root layout's title template. This hook predates that migration — it used to
// be the only way to set meta tags client-side, but left active it fires after
// hydration and overwrites the correct server-rendered tags with whatever string
// was hardcoded at each call site, which had drifted out of sync with page.tsx in
// several places. Kept as a no-op so the ~39 existing call sites don't need
// touching; safe to remove entirely in a follow-up cleanup.
export const useSEO = (_props: SEOProps) => {};
