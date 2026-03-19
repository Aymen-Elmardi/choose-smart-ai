import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "cp_timedPopupShown";
const CTA_SELECTORS = 'a[href="/assessment"], a[href="/contact"], a[href="/onboard-with-us"]';

const TimedPopup = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ctaClicked = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Track CTA clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(CTA_SELECTORS)) {
        ctaClicked.current = true;
      }
    };
    document.addEventListener("click", handleClick, true);

    const timer = setTimeout(() => {
      if (!ctaClicked.current && !sessionStorage.getItem(SESSION_KEY)) {
        sessionStorage.setItem(SESSION_KEY, "1");
        setOpen(true);
      }
    }, 30000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: dbError } = await supabase.from("popup_submissions").insert({
        popup_type: "timed_30s",
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
            Dealing with a payment issue right now?
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
              Tell us what's happening — we'll point you in the right direction.
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
              {isSubmitting ? "Sending..." : "Get help"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Free. No commitment.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TimedPopup;
