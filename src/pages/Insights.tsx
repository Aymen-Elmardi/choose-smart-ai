import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Search, ArrowRight, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

// Import from centralized data file
import {
  allInsights,
  featuredInsights,
  filterTabs,
  categoryLabels,
  filterInsights,
  getInsightUrl,
  type InsightCategory,
  type Insight,
} from "@/data/insightsArticles";
import InsightsSidebarModule from "@/components/InsightsSidebarModule";

const Insights = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("q") || "");
  const [activeFilter, setActiveFilter] = useState<InsightCategory>(
    () => (searchParams.get("filter") as InsightCategory) || "all"
  );
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Payment Processing Insights & Guides — ChosePayments",
    description: "Insider knowledge on payment provider risk, underwriting criteria, account freezes, and why businesses get rejected. Strategic guidance from industry experts.",
    keywords: ["payment provider insights", "payment risk", "underwriting criteria", "account freezes", "provider rejection"],
  });

  const filteredInsights = useMemo(() => {
    const effectiveFilter = searchQuery.trim() ? "all" : activeFilter;
    return filterInsights(allInsights, effectiveFilter, searchQuery);
  }, [searchQuery, activeFilter]);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return filterInsights(allInsights, "all", searchQuery).slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestionsOpen || suggestions.length === 0) {
      if (e.key === "Escape") setSuggestionsOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        const picked = suggestions[highlightedIndex];
        setSuggestionsOpen(false);
        navigate(getInsightUrl(picked));
      }
    } else if (e.key === "Escape") {
      setSuggestionsOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="section-container max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Expert Insights: What Payment Providers Don't Tell You
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insider knowledge on provider risk, underwriting criteria, and account management. Strategic guidance from industry experts.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12">
            <div
              ref={searchContainerRef}
              className="relative max-w-md mx-auto mb-8"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
              <Input
                type="text"
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSuggestionsOpen(true);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) setSuggestionsOpen(true);
                }}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded={suggestionsOpen && suggestions.length > 0}
                aria-controls="insights-search-suggestions"
                aria-autocomplete="list"
                className="pl-12 h-12 rounded-full border-border bg-background"
              />

              {suggestionsOpen && searchQuery.trim() && (
                <div
                  id="insights-search-suggestions"
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 bg-popover border border-border rounded-2xl shadow-lg overflow-hidden z-20"
                >
                  {suggestions.length === 0 ? (
                    <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                      No matching insights. Press Enter to browse all.
                    </div>
                  ) : (
                    <ul className="max-h-96 overflow-y-auto py-2">
                      {suggestions.map((insight, index) => (
                        <li key={insight.slug} role="option" aria-selected={highlightedIndex === index}>
                          <Link
                            to={getInsightUrl(insight)}
                            onClick={() => setSuggestionsOpen(false)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                              highlightedIndex === index ? "bg-muted" : "hover:bg-muted/60"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
                                  {categoryLabels[insight.category]}
                                </span>
                                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {insight.readTime}
                                </span>
                              </div>
                              <div className="text-sm font-medium text-foreground line-clamp-1">
                                {insight.title}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                                {insight.description}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === tab.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Insight */}
          {activeFilter !== "all" && featuredInsights[activeFilter] && (
            <div className="mb-12">
              <Link
                to={getInsightUrl(featuredInsights[activeFilter])}
                className="block group"
              >
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-8 md:p-10 transition-all hover:border-primary/40 hover:shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Featured
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      {categoryLabels[featuredInsights[activeFilter].category]}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {featuredInsights[activeFilter].title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-4 max-w-3xl">
                    {featuredInsights[activeFilter].description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredInsights[activeFilter].readTime}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:underline">
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Insights Grid with Sidebar */}
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsights.map((insight) => (
              <Link
                key={insight.slug}
                to={getInsightUrl(insight)}
                className="group block bg-card border border-border rounded-xl p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {categoryLabels[insight.category]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {insight.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {insight.readTime}
                  </span>
                  <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <InsightsSidebarModule />
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredInsights.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No insights found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-10 md:p-14">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Not sure which provider fits your risk profile?
              </h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Get your personalized risk assessment in under 60 seconds. We'll tell you which providers actually match your business — or why now isn't the right time.
              </p>
              <Link
                to="/assessment"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Your Risk Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Insights;
