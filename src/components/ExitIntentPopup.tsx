import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "cp_exitIntentShown";

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showPopup = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(true);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showPopup]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: dbError } = await supabase.from("popup_submissions").insert({
        popup_type: "exit_intent",
        question: question.trim(),
        email: email.trim(),
        page_url: window.location.href,
      });

      if (dbError) throw dbError;
      setIsSubmitted(true);
      setTimeout(() => setOpen(false), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            Before you go —
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">
              Thanks — we'll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-muted-foreground">
              What's your biggest payment challenge right now?
            </p>

            <Input
              type="text"
              placeholder="e.g. my funds are on hold, I was just rejected by Stripe..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              className="w-full"
            />

            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Get a free answer"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We reply within 24 hours. No spam.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
