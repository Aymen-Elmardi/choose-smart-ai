import { ExternalLink, BookOpen, Shield, Building2 } from "lucide-react";

export interface Source {
  name: string;
  url: string;
  type?: "official" | "regulatory" | "industry" | "educational";
}

interface SourcesCitationProps {
  sources: Source[];
  title?: string;
}

const getSourceIcon = (type: Source["type"]) => {
  switch (type) {
    case "official":
      return <Shield className="w-4 h-4 text-primary" />;
    case "regulatory":
      return <Building2 className="w-4 h-4 text-amber-600" />;
    case "industry":
      return <BookOpen className="w-4 h-4 text-blue-600" />;
    default:
      return <ExternalLink className="w-4 h-4 text-muted-foreground" />;
  }
};

const getSourceBadge = (type: Source["type"]) => {
  switch (type) {
    case "official":
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          Official
        </span>
      );
    case "regulatory":
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
          Regulatory
        </span>
      );
    case "industry":
      return (
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
          Industry
        </span>
      );
    default:
      return null;
  }
};

/**
 * Displays a list of credible external sources at the bottom of articles.
 * Enhances credibility and E-E-A-T signals for SEO.
 */
const SourcesCitation = ({ sources, title = "Sources & References" }: SourcesCitationProps) => {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-muted-foreground" />
        {title}
      </h2>
      <ul className="space-y-3">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-1 flex-shrink-0">
              {getSourceIcon(source.type)}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline text-sm font-medium"
              >
                {source.name}
              </a>
              {getSourceBadge(source.type)}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">
        External links open in a new tab. ChosePayments is not affiliated with these sources.
      </p>
    </section>
  );
};

export default SourcesCitation;
