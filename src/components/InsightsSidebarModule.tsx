import { Link } from "react-router-dom";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const InsightsSidebarModule = () => {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Find Your Payment Provider Fit</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Enter your business details and see which payment providers match your risk profile.
      </p>
      <Button asChild size="sm" className="w-full">
        <Link to="/assessment">
          Run My Risk Profile
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
};

export default InsightsSidebarModule;
