import { ReactNode } from "react";
import InlineAssessmentCTA from "@/components/InlineAssessmentCTA";
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
import { ArticleBylineProvider, DEFAULT_ARTICLE_AUTHOR } from "@/components/ArticleByline";
import { ContentCluster } from "@/lib/insightsArchitecture";

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
  /**
   * Renders the large closing CTA block. Off by default: the layout already
   * injects InlineAssessmentCTA, and showing both stacked two CTAs directly
   * on top of each other at the foot of every article.
   */
  showCTA?: boolean;
  /** Byline author, as "Name (Expertise)". */
  author?: string;
  /**
   * Injects the contextual assessment CTA and the closing advisory note.
   * Turn off for an article that supplies its own single CTA and must not
   * end up with several stacked together.
   */
  showInlineCTA?: boolean;
  /**
   * Emits the layout's own Article JSON-LD. Turn off for an article that
   * renders a hand-written schema graph, so the page does not carry two
   * competing Article nodes.
   */
  showArticleSchema?: boolean;
  showRelated?: boolean;
  ctaVariant?: "default" | "compact";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  sources?: Source[];
  breadcrumbSchemaItems?: { name: string; url?: string }[];
  /**
   * Article schema `image`, for articles with their own cover image.
   * Defaults to the shared OG card inside ArticleSchema.
   */
  image?: string;
  /**
   * Article schema `headline`, when it should differ from the SEO title.
   * Used where the title tag is trimmed for the SERP but the schema headline
   * should still match the visible H1. Defaults to `title`.
   */
  schemaHeadline?: string;
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
  showCTA = false,
  showRelated = true,
  ctaVariant = "default",
  publishedTime,
  modifiedTime,
  author = DEFAULT_ARTICLE_AUTHOR,
  showInlineCTA = true,
  showArticleSchema = true,
  keywords,
  sources,
  breadcrumbSchemaItems,
  image,
  schemaHeadline,
}: InsightsArticleLayoutProps) => {

  // Articles that never carried a real date still emit the long-standing
  // schema fallback, but display no date rather than showing an invented one.
  const schemaPublishedTime = publishedTime ?? "2026-01-01";

  // Build breadcrumb items for schema (overridable per article)
  const breadcrumbItems = breadcrumbSchemaItems ?? [
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
      {showArticleSchema && (
      <ArticleSchema
        title={schemaHeadline ?? title}
        description={description}
        publishedTime={schemaPublishedTime}
        modifiedTime={modifiedTime}
        image={image}
        sources={sources}
        keywords={keywords}
      />
      )}
      <BreadcrumbSchema items={breadcrumbItems} />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <InsightsBreadcrumb category={category} currentTitle={title} />
          
          {/* Article Content */}
          <div className="insight-body max-w-none">
            <ArticleBylineProvider value={{ publishedTime, author }}>
              {children}
            </ArticleBylineProvider>
          </div>
          
          {/* Share & Like Actions */}
          {currentSlug && (
            <ArticleActions
              slug={currentSlug}
              title={title}
              className="mt-8 mb-10 pt-6 border-t border-border"
            />
          )}

          {/* Auto-injected contextual assessment CTA */}
          {showInlineCTA && (
            <InlineAssessmentCTA
              context="Wondering if your current provider is the right fit? See how your business matches against 21 providers."
            />
          )}
          
          {/* Sources & References */}
          {sources && sources.length > 0 && (
            <SourcesCitation sources={sources} />
          )}

          {/* Concept-based Related Articles (SEO cross-linking) */}
          {currentSlug && (
            <ConceptLinks
              currentSlug={currentSlug}
              limit={3}
            />
          )}

          {/* Legacy Related Articles (for spoke articles in same cluster) */}
          {shouldShowRelated && currentSlug && (
            <RelatedArticles
              currentSlug={currentSlug}
              cluster={cluster}
              title={cluster === "crisis" ? "More Crisis Solutions" : cluster === "pricing" ? "More on Pricing" : "More Provider Deep Dives"}
            />
          )}
          
          {/* Inline advisory note */}
          {showInlineCTA && (
          <p className="mt-10 text-muted-foreground text-base leading-relaxed">
            If you're making a payment provider decision where getting it wrong is expensive, we offer{" "}
            <a href="/assessment" className="text-primary hover:underline font-medium">
              independent advisory support
            </a>{" "}
            before you apply.
          </p>
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
