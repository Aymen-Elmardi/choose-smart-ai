import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsightsBreadcrumb from "@/components/InsightsBreadcrumb";
import InsightsCTA from "@/components/InsightsCTA";
import RelatedArticles from "@/components/RelatedArticles";
import ConceptLinks from "@/components/ConceptLinks";
import ArticleSchema from "@/components/ArticleSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SourcesCitation, { Source } from "@/components/SourcesCitation";
import ArticleActions from "@/components/ArticleActions";
import { ContentCluster } from "@/lib/insightsArchitecture";
import { useSEO } from "@/hooks/useSEO";

interface InsightsArticleLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  category: {
    name: string;
    slug: string;
  };
  cluster?: ContentCluster;
  currentSlug?: string;
  showCTA?: boolean;
  showRelated?: boolean;
  ctaVariant?: "default" | "compact";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  sources?: Source[];
}

/**
 * Standard layout wrapper for all Insights articles.
 * Automatically includes:
 * - Header and Footer
 * - Breadcrumb navigation with schema
 * - Article structured data (JSON-LD)
 * - SEO meta tags (title, description, OG, Twitter)
 * - Standardized CTA block (at bottom)
 * - Related articles section (for spoke articles)
 * 
 * Usage:
 * <InsightsArticleLayout
 *   title="Article Title"
 *   description="Meta description for SEO"
 *   category={{ name: "Crisis Intervention", slug: "crisis" }}
 *   cluster="crisis"
 *   currentSlug="stripe-funds-frozen"
 *   publishedTime="2026-01-15"
 * >
 *   <article content />
 * </InsightsArticleLayout>
 */
const InsightsArticleLayout = ({
  children,
  title,
  description,
  category,
  cluster = "hub",
  currentSlug,
  showCTA = true,
  showRelated = true,
  ctaVariant = "default",
  publishedTime = "2026-01-01",
  modifiedTime,
  keywords,
  sources,
}: InsightsArticleLayoutProps) => {
  // Set SEO meta tags
  useSEO({
    title: `${title} | ChosePayments`,
    description,
    ogType: "article",
    publishedTime,
    modifiedTime,
    keywords,
  });

  // Build breadcrumb items for schema
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Insights", url: "/insights" },
    ...(category.slug !== "insights" ? [{ name: category.name, url: `/insights/${category.slug}` }] : []),
    { name: title },
  ];
  // Only show related articles for spoke articles (crisis/provider)
  const shouldShowRelated = showRelated && (cluster === "crisis" || cluster === "provider" || cluster === "pricing") && currentSlug;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Structured Data */}
      <ArticleSchema
        title={title}
        description={description}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        sources={sources}
        keywords={keywords}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <InsightsBreadcrumb category={category} currentTitle={title} />
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
          
          {/* Share & Like Actions */}
          {currentSlug && (
            <ArticleActions
              slug={currentSlug}
              title={title}
              className="mt-8 mb-10 pt-6 border-t border-border"
            />
          )}
          
          {/* Sources & References */}
          {sources && sources.length > 0 && (
            <SourcesCitation sources={sources} />
          )}

          {/* Related Articles (for spoke articles) */}
          {shouldShowRelated && currentSlug && (
            <RelatedArticles
              currentSlug={currentSlug}
              cluster={cluster}
              title={cluster === "crisis" ? "More Crisis Solutions" : cluster === "pricing" ? "More on Pricing" : "More Provider Deep Dives"}
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
