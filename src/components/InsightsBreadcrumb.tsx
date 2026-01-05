import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface InsightsBreadcrumbProps {
  category: {
    name: string;
    slug: string;
  };
  currentTitle: string;
}

const InsightsBreadcrumb = ({ category, currentTitle }: InsightsBreadcrumbProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
      <Link to="/insights" className="hover:text-foreground transition-colors">
        Insights
      </Link>
      <ChevronRight className="w-4 h-4 flex-shrink-0" />
      <Link to={`/insights/${category.slug}`} className="hover:text-foreground transition-colors">
        {category.name}
      </Link>
      <ChevronRight className="w-4 h-4 flex-shrink-0" />
      <span className="text-foreground/70 truncate max-w-[200px] md:max-w-none">
        {currentTitle}
      </span>
    </nav>
  );
};

export default InsightsBreadcrumb;
