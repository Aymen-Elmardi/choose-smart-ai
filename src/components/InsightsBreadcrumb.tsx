import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface InsightsBreadcrumbProps {
  category: {
    name: string;
    slug: string;
  };
  currentTitle: string;
  /** If true, category slug is treated as a subfolder (e.g., /insights/crisis/) */
  isSubfolder?: boolean;
}

const InsightsBreadcrumb = ({ 
  category, 
  currentTitle,
  isSubfolder = false 
}: InsightsBreadcrumbProps) => {
  // Build the category URL based on structure
  const categoryUrl = isSubfolder 
    ? `/insights/${category.slug}` 
    : `/insights/${category.slug}`;

  return (
    <nav 
      className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap"
      aria-label="Breadcrumb"
    >
      <Link 
        to="/insights" 
        className="hover:text-foreground transition-colors flex items-center gap-1"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only sm:not-sr-only">Insights</span>
      </Link>
      <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <Link 
        to={categoryUrl} 
        className="hover:text-foreground transition-colors"
      >
        {category.name}
      </Link>
      <ChevronRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      <span className="text-foreground/70 truncate max-w-[200px] md:max-w-none">
        {currentTitle}
      </span>
    </nav>
  );
};

export default InsightsBreadcrumb;
