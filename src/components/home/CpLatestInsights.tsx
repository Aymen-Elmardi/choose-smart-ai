'use client'

import Link from 'next/link';
import { allInsights, categoryLabels, getInsightUrl } from "@/data/insightsArticles";

/**
 * Homepage → individual-article internal links.
 *
 * The 2026 prototype dropped the old insights preview entirely, which would
 * have left the homepage linking only to the /insights hub. That matters here:
 * a large share of /insights URLs are sitting in Search Console as
 * "Discovered – currently not indexed", i.e. a crawl-priority problem, and the
 * homepage is the strongest internal link source available to fix it.
 *
 * Titles and descriptions are read from the shared article data rather than
 * duplicated, so this cannot drift out of sync with the articles themselves.
 */
const FEATURED_SLUGS = [
  "pricing-models/interchange-plus-plus",
  "pricing-models/blended-vs-interchange",
  "hidden-payment-processor-fees",
  "marketplace-payments-guide",
];

const CpLatestInsights = () => {
  const articles = FEATURED_SLUGS
    .map((slug) => allInsights.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (!articles.length) return null;

  return (
    <section id="insights" className="cp-section">
      <div className="cp-wrap">
        <div className="cp-section-head cp-reveal">
          <span className="cp-section-tag">Insights</span>
          <h2>What we&apos;ve learned about payment processors</h2>
          <p>Independent breakdowns of pricing, risk and provider behaviour, written for operators.</p>
        </div>

        <div className="cp-insights-grid">
          {articles.map((article) => (
            <Link key={article.slug} href={getInsightUrl(article)} className="cp-i-card cp-reveal">
              <div className="cp-i-meta">
                <span>{categoryLabels[article.category]}</span>
                <span className="cp-i-dot" aria-hidden="true">•</span>
                <span className="cp-i-time">{article.readTime}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </Link>
          ))}
        </div>

        <Link href="/insights" className="cp-i-more cp-reveal">
          Read all insights <span className="cp-arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default CpLatestInsights;
