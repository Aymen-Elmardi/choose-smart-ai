import { Link } from '@/lib/router-compat';
import { ArrowRight, BookOpen } from "lucide-react";
import { 
  getConceptRelatedArticles, 
  buildConceptArticleUrl,
  clusterMeta,
  getPrimaryCluster,
  type ConceptCluster 
} from "@/lib/conceptClusters";

interface ConceptLinksProps {
  currentSlug: string;
  limit?: number;
  title?: string;
  className?: string;
}

/**
 * Displays concept-clustered related articles for SEO internal linking.
 * Shows articles that share the same semantic concepts (risk, approval, etc.)
 * 
 * Usage:
 * <ConceptLinks currentSlug="low-value-transaction-exemption" />
 */
const ConceptLinks = ({ 
  currentSlug, 
  limit = 3,
  title,
  className = ""
}: ConceptLinksProps) => {
  const relatedArticles = getConceptRelatedArticles(currentSlug, limit);
  const primaryCluster = getPrimaryCluster(currentSlug);
  
  if (relatedArticles.length === 0) {
    return null;
  }

  // Determine title based on primary cluster
  const displayTitle = title || (primaryCluster 
    ? `More on ${clusterMeta[primaryCluster].title}`
    : "Related Reading"
  );

  // Group articles by their primary concept for better display
  const groupedByCluster = relatedArticles.reduce((acc, article) => {
    const cluster = article.concepts[0];
    if (!acc[cluster]) acc[cluster] = [];
    acc[cluster].push(article);
    return acc;
  }, {} as Record<ConceptCluster, typeof relatedArticles>);

  return (
    <section className={`mt-12 pt-8 border-t border-border ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          {displayTitle}
        </h3>
      </div>
      
      <div className="space-y-3">
        {relatedArticles.map((article) => {
          const articleCluster = article.concepts[0];
          return (
            <Link
              key={article.slug}
              to={buildConceptArticleUrl(article.slug)}
              className="group flex items-start gap-3 p-4 rounded-lg border border-border bg-card/50 hover:border-primary/40 hover:bg-card transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
                    {clusterMeta[articleCluster].title}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
            </Link>
          );
        })}
      </div>

      {/* Show cluster context for SEO */}
      {primaryCluster && (
        <p className="mt-4 text-xs text-muted-foreground">
          Part of our {clusterMeta[primaryCluster].title.toLowerCase()} content series.
        </p>
      )}
    </section>
  );
};

export default ConceptLinks;
