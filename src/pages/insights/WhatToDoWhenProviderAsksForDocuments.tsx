import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import ChecklistEmailModal from "@/components/ChecklistEmailModal";
import HowToSchema from "@/components/HowToSchema";
import ArticleActions from "@/components/ArticleActions";

const howToSteps = [
  {
    name: "Read the request carefully",
    text: "Understand exactly what is being asked for. If anything is unclear, ask for clarification before sending documents.",
  },
  {
    name: "Acknowledge promptly",
    text: "Respond quickly, even if you need time to gather information. A short acknowledgement shows cooperation and prevents escalation.",
  },
  {
    name: "Submit only what is requested",
    text: "Provide clear, complete files and avoid adding unnecessary explanations. Payment reviews are procedural, not personal.",
  },
  {
    name: "Confirm your timeline",
    text: "If a deadline is mentioned, confirm when you expect to submit everything. Clear communication helps keep the review moving.",
  },
];

const WhatToDoWhenProviderAsksForDocuments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useSEO({
    title: "What To Do When a Payment Provider Asks for More Documents | ChosePayments",
    description: "Learn why payment providers request additional documents, what these requests mean, and how to respond confidently. Get a free document checklist."
  });

  return (
    <div className="min-h-screen bg-background">
      <HowToSchema
        name="How to Respond When Your Payment Provider Requests Documents"
        description="Step-by-step guide for responding to payment provider document requests confidently and efficiently."
        steps={howToSteps}
        totalTime="PT15M"
      />
      <Header />
      
      <main className="pt-24 pb-16">
        <article className="section-container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            What To Do When a Payment Provider Asks for More Documents
          </h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              When a payment provider asks for additional documents, it often feels sudden and uncomfortable. Many businesses worry that something has gone wrong or that their account is about to be restricted.
            </p>
            
            <p>
              In most cases, this is not a problem. It is a normal part of how payment providers manage risk, meet regulatory requirements, and confirm that a business is operating as expected. What matters most is how you respond.
            </p>
            
            <p>
              This guide explains why these requests happen, what they usually mean, and what you can do to handle them with confidence.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Why payment providers ask for documents
            </h2>
            
            <p>
              Payment providers are required to understand who they are dealing with and how money flows through a business. As your activity changes over time, they are often required to reassess this.
            </p>
            
            <p>
              Requests are commonly triggered by increased transaction volume, changes in customer location, new products or services, marketplace activity, or routine periodic reviews. Sometimes there is no specific trigger at all, just a scheduled compliance check.
            </p>
            
            <p>
              A document request usually means your account is being reviewed, not that it is being closed.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              What to do first when you receive a request
            </h2>
            
            <p>
              Start by reading the request carefully and making sure you understand exactly what is being asked for. If anything is unclear, ask for clarification before sending documents.
            </p>
            
            <p>
              Respond promptly, even if you need time to gather information. A short acknowledgement shows cooperation and prevents unnecessary escalation.
            </p>
            
            <p>
              When submitting documents, stick to what is requested. Provide clear, complete files and avoid adding unnecessary explanations. Payment reviews are procedural, not personal.
            </p>
            
            <p>
              If a deadline is mentioned, confirm when you expect to submit everything. Clear communication helps keep the review moving.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              How to prepare so reviews are easier
            </h2>
            
            <p>
              Businesses that handle reviews smoothly are usually prepared before a request arrives.
            </p>
            
            <p>
              Most payment providers ask for the same core information repeatedly. This typically includes identity documents for directors, proof of address, company registration details, and simple evidence explaining how money moves through the business.
            </p>
            
            <p>
              To make this easier, we've created a short checklist that outlines the documents payment providers most commonly ask for and how to prepare them correctly.
            </p>
            
            <p>
              You can request this checklist by entering your email below, and we'll send it to you directly. It's designed to give you clarity, not urgency, so you know what to expect if a review happens later.
            </p>
            
            <p>
              You do not need to gather everything immediately. The value is knowing what is typically required so you are not caught off guard.
            </p>

            {/* Checklist CTA Block */}
            <div className="my-8 p-6 bg-muted/50 rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">
                Get the document checklist
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                We'll email you a simple checklist of the documents payment providers usually ask for, so you know what to expect.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
              >
                Request the checklist →
              </button>
            </div>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              Common mistakes that slow reviews down
            </h2>
            
            <p>
              Ignoring requests is one of the quickest ways to create problems. Even if you are unsure or need more time, acknowledging the request is important.
            </p>
            
            <p>
              Another common issue is submitting screenshots, cropped files, or low quality images. Providers usually need full, readable documents that can be verified easily.
            </p>
            
            <p>
              It also helps to avoid becoming defensive. Reviews are standard practice across the payments industry. Treat them as a process to complete, not a dispute to win.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">
              When document requests become a bigger signal
            </h2>
            
            <p>
              If document requests keep happening or feel excessive, it may indicate that your current provider is not well suited to your business model or stage of growth.
            </p>
            
            <p>
              Some providers are designed for early stage businesses, while others are built for scale, international sales, or more complex operations. Frequent reviews often point to a mismatch rather than a problem with your business.
            </p>
            
            <p>
              Recognising this early can save time, stress, and disruption.
            </p>
            
            <p>
              If you want clarity on which payment providers are better suited to your business, <Link to="/assessment?start=true" replace className="text-primary hover:text-primary/80 font-medium underline underline-offset-4">start a short assessment</Link>.
            </p>

            {/* Share & Like Actions */}
            <ArticleActions
              slug="what-to-do-when-provider-asks-for-documents"
              title="What to Do When Your Payment Provider Asks for Documents"
              className="mt-8 pt-6 border-t border-border"
            />
          </div>
        </article>
      </main>
      
      <Footer />
      
      <ChecklistEmailModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
};

export default WhatToDoWhenProviderAsksForDocuments;