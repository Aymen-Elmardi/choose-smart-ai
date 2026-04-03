'use client'

import { Heart, Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useArticleEngagement } from "@/hooks/useArticleEngagement";
import { cn } from "@/lib/utils";

interface ArticleActionsProps {
  slug: string;
  title: string;
  className?: string;
}

const BASE_URL = "https://chosepayments.com";

/**
 * Article sharing buttons and like functionality.
 * Renders share dropdown (X, LinkedIn, Facebook, Copy Link) and like button with count.
 */
const ArticleActions = ({ slug, title, className }: ArticleActionsProps) => {
  const [copied, setCopied] = useState(false);
  const { likeCount, isLiked, isLoading, toggleLike, recordShare } =
    useArticleEngagement(slug);

  const articleUrl = `${BASE_URL}/insights/${slug}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = (platform: "twitter" | "linkedin" | "facebook") => {
    recordShare(platform);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    };

    window.open(urls[platform], "_blank", "noopener,noreferrer,width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Share Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => handleShare("twitter")} className="gap-3 cursor-pointer">
            <Twitter className="h-4 w-4" />
            Share on X
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("linkedin")} className="gap-3 cursor-pointer">
            <Linkedin className="h-4 w-4" />
            Share on LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")} className="gap-3 cursor-pointer">
            <Facebook className="h-4 w-4" />
            Share on Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink} className="gap-3 cursor-pointer">
            {copied ? (
              <>
                <Check className="h-4 w-4 text-primary" />
                Copied!
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                Copy link
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Like Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLike}
        disabled={isLoading}
        className={cn(
          "gap-2 transition-colors",
          isLiked
            ? "text-destructive border-destructive/30 hover:text-destructive hover:border-destructive/50 hover:bg-destructive/5"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Heart
          className={cn("h-4 w-4 transition-all", isLiked && "fill-current")}
        />
        <span>{likeCount > 0 ? likeCount : ""}</span>
        <span className="hidden sm:inline">{isLiked ? "Liked" : "Like"}</span>
      </Button>
    </div>
  );
};

export default ArticleActions;
