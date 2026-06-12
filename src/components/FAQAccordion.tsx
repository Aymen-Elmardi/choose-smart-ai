'use client'

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQAccordionItem {
  question: string;
  answer: string;
}

const AccordionItem = ({ item }: { item: FAQAccordionItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground text-base">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-muted-foreground text-base leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQAccordion = ({ faqs }: { faqs: FAQAccordionItem[] }) => {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <AccordionItem key={faq.question} item={faq} />
      ))}
    </div>
  );
};

export default FAQAccordion;
