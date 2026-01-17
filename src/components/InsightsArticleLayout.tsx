import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import InsightsCTA from "@/components/InsightsCTA";
import RelatedArticles from "@/components/RelatedArticles";
import { ContentCluster } from "@/lib/insightsArchitecture";

interface InsightsArticleLayoutProps {
  children: ReactNode;
  title: string;
  category: {
    name: string;
    slug: string;
  };
  cluster?: ContentCluster;
  currentSlug?: string;
  showCTA?: boolean;
  showRelated?: boolean;
  ctaVariant?: "default" | "compact";
}

/**
 * Standard layout wrapper for all Insights articles.
 * Automatically includes:
 * - Header and Footer
 * - Breadcrumb navigation
 * - Standardized CTA block (at bottom)
 * - Related articles section (for spoke articles)
 * 
 * Usage:
 * <InsightsArticleLayout
 *   title="Article Title"
 *   category={{ name: "Crisis Intervention", slug: "crisis" }}
 *   cluster="crisis"
 *   currentSlug="stripe-funds-frozen"
 * >
 *   <article content />
 * </InsightsArticleLayout>
 */
const InsightsArticleLayout = ({
  children,
  title,
  category,
  cluster = "hub",
  currentSlug,
  showCTA = true,
  showRelated = true,
  ctaVariant = "default"
}: InsightsArticleLayoutProps) => {
  // Only show related articles for spoke articles (crisis/provider)
  const shouldShowRelated = showRelated && (cluster === "crisis" || cluster === "provider") && currentSlug;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <InsightsBreadcrumb category={category} currentTitle={title} />
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
          
          {/* Related Articles (for spoke articles) */}
          {shouldShowRelated && currentSlug && (
            <RelatedArticles
              currentSlug={currentSlug}
              cluster={cluster}
              title={cluster === "crisis" ? "More Crisis Solutions" : "More Provider Deep Dives"}
            />
          )}
          
          {/* Standardized CTA Block */}
          {showCTA && <InsightsCTA variant={ctaVariant} />}
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default InsightsArticleLayout;
