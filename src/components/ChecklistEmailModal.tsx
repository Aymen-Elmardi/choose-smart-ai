'use client'

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
    
    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // TODO: Integrate with email service when ready
    console.log("Checklist requested for:", email);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after modal closes
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Get the document checklist
          </DialogTitle>
        </DialogHeader>
        
        {isSubmitted ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              Thanks. We've sent the checklist to your email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              We'll email you a simple checklist of the documents payment providers usually ask for, so you know what to expect.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="checklist-email" className="sr-only">
                Email address
              </Label>
              <Input
                id="checklist-email"
                type="email"
                placeholder="Your email address"
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