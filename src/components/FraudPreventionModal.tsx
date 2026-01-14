import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface FraudPreventionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageSource: string;
}

const FraudPreventionModal = ({ open, onOpenChange, pageSource }: FraudPreventionModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error: fnError } = await supabase.functions.invoke("send-insight-lead", {
        body: {
          email: email.trim(),
          pageSource,
          tag: "fraud-prevention-interest"
        }
      });

      if (fnError) {
        throw new Error(fnError.message || "Failed to submit");
      }
      
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit fraud prevention interest:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
      setError(null);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Get guidance on fraud prevention tools
          </DialogTitle>
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              Thanks. We'll follow up with relevant options shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We'll only use this to share relevant options. No spam.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="fraud-prevention-email" className="sr-only">
                Email address
              </Label>
              <Input
                id="fraud-prevention-email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send me the details"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FraudPreventionModal;
