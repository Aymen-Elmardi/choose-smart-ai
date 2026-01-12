import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ChecklistEmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChecklistEmailModal = ({ open, onOpenChange }: ChecklistEmailModalProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    // Log the email capture for now (can be connected to an edge function later)
    console.log("Checklist email capture:", { email, timestamp: new Date().toISOString() });
    
    // Simulate a brief delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 200);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Get the preparation checklist
          </DialogTitle>
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="py-4">
            <p className="text-muted-foreground">
              Thanks. We'll send this shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We'll email you a short checklist you can keep for reference if a provider asks for documents.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="checklist-email" className="sr-only">
                Email address
              </Label>
              <Input
                id="checklist-email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send me the checklist"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChecklistEmailModal;
