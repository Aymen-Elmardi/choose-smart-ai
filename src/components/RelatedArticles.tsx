import { Link } from '@/lib/router-compat';
import { ArrowRight, Clock } from "lucide-react";
import { ContentCluster, getRelatedArticles, buildInsightUrl } from "@/lib/insightsArchitecture";

interface RelatedArticlesProps {
  currentSlug: string;
  cluster: ContentCluster;
  title?: string;
}

/**
 * Related Articles section for Spoke articles.
 * Displays up to 2 related articles from the same cluster.
 * 
 * Usage: Add to Crisis and Provider articles to keep users in the ecosystem.
 */
const RelatedArticles = ({ 
  currentSlug, 
  cluster,
  title = "Related Articles"
}: RelatedArticlesProps) => {
  const relatedArticles = getRelatedArticles(currentSlug, cluster);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-12 border-t border-border">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        {title}
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        {relatedArticles.map((article) => (
          <Link
            key={article.slug}
            to={buildInsightUrl(article.slug, article.cluster)}
            className="group p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                5 min read
              </span>
            </div>
            
            <h4 className="text-base font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {article.title}
            </h4>
            
            <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
              Read article
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedArticles;
