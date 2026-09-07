'use client'
import { createContext, useContext } from "react";

export interface ArticleBylineData {
  /**
   * ISO date the article was published. Undefined for articles that have
   * never carried a real date, which display the author on its own rather
   * than inventing one.
   */
  publishedTime?: string;
  /** Display name and expertise, e.g. "Aymen Elmardi (Payments Expert)". */
  author: string;
}

/**
 * Byline used where an article has never named its own author. Most of the
 * library is payments, risk and compliance writing, so this is the house
 * default; articles by another author pass `author` explicitly.
 */
export const DEFAULT_ARTICLE_AUTHOR = "Aymen Elmardi (Payments Expert)";

export const GROWTH_ARTICLE_AUTHOR = "Madalsa Bhat (Growth Expert)";

const ArticleBylineContext = createContext<ArticleBylineData | null>(null);

export const ArticleBylineProvider = ArticleBylineContext.Provider;

/**
 * Formats an ISO date as "September 2, 2026".
 *
 * Parsed in UTC deliberately: `new Date("2026-09-02")` is midnight UTC, so
 * formatting it in a timezone behind UTC would render the previous day.
 */
const formatPublished = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
};

/**
 * Published date and author for an article, on separate lines.
 *
 * Reads from context rather than props so each article only places the
 * byline (directly under its H1) and the layout stays the single source of
 * the date and author. That keeps the two from drifting apart.
 */
const ArticleByline = ({ publishedTime, author }: Partial<ArticleBylineData> = {}) => {
  // Articles inside InsightsArticleLayout read the date and author from
  // context. The handful that predate that layout and roll their own markup
  // pass them directly, or fall back to the house author with no date.
  const data = useContext(ArticleBylineContext);
  const resolvedAuthor = author ?? data?.author ?? DEFAULT_ARTICLE_AUTHOR;
  const resolvedDate = publishedTime ?? data?.publishedTime;

  const published = resolvedDate ? formatPublished(resolvedDate) : null;

  return (
    <div className="mb-8 text-sm text-muted-foreground not-italic">
      {published && <div>Published {published}</div>}
      <div>{resolvedAuthor}</div>
    </div>
  );
};

export default ArticleByline;
