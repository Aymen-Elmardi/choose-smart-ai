import { ChevronDown } from "lucide-react";

interface FAQAccordionItem {
  question: string;
  answer: string;
}

/**
 * Collapsible FAQ list, built on native <details>/<summary>.
 *
 * The answer is always in the DOM and in the served HTML. An earlier version
 * mounted it conditionally (`{open && ...}`), which kept the copy out of the
 * HTML entirely until someone clicked: it existed only inside the FAQPage
 * JSON-LD. That accounted for roughly 75,000 characters of answer text across
 * 43 pages, and FAQ markup is expected to reflect content that is actually on
 * the page.
 *
 * <details> rather than a JS-toggled panel: no state, no hydration needed, it
 * works before and without JavaScript, it is keyboard accessible and screen
 * reader friendly by default, and its open/closed behaviour cannot be broken by
 * a stylesheet. The chevron is driven off the [open] attribute, and the default
 * disclosure triangle is removed via ::-webkit-details-marker and list-none.
 */
const AccordionItem = ({ item }: { item: FAQAccordionItem }) => (
  <details className="group border border-border rounded-lg overflow-hidden bg-card">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors [&::-webkit-details-marker]:hidden">
      <span className="font-medium text-foreground text-base">{item.question}</span>
      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
    </summary>
    <p className="px-5 pb-5 text-muted-foreground text-base leading-relaxed">
      {item.answer}
    </p>
  </details>
);

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
