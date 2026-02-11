import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { allInsights, categoryLabels } from "@/data/insightsArticles";

const featuredSlugs = [
  "stripe-fees-explained",
  "crisis/stripe-account-frozen",
  "payment-provider-risk-models",
];

const featuredArticles = featuredSlugs
  .map((slug) => allInsights.find((a) => a.slug === slug))
  .filter(Boolean);

const InsightsPreviewSection = () => {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.15 });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="section-container">
        <div className={`text-center max-w-3xl mx-auto mb-12 reveal ${isInView ? "visible" : ""}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Insights and Resources
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {featuredArticles.map((article, index) => {
            if (!article) return null;
            const url = article.isSubfolder
              ? `/insights/${article.slug}`
              : `/insights/${article.slug}`;
            return (
              <Link
                key={article.slug}
                to={url}
                className={`group p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all reveal stagger-${index + 1} ${isInView ? "visible" : ""}`}
              >
                <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
                  {categoryLabels[article.category]}
                </span>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                <span className="inline-block mt-4 text-xs text-muted-foreground">{article.readTime}</span>
              </Link>
            );
          })}
        </div>

        <div className={`text-center mt-10 reveal stagger-4 ${isInView ? "visible" : ""}`}>
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View all insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightsPreviewSection;
