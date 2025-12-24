// ChosePayments Confirmation Email Function
// Sends confirmation email to user after successful quiz submission

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  firstName: string;
}

// HTML escape function
const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Extract first name from full name
const extractFirstName = (fullName: string): string => {
  const trimmed = fullName.trim();
  const firstName = trimmed.split(/\s+/)[0];
  return firstName || trimmed;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send-confirmation-email");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate required fields
    if (!rawData.email || !rawData.firstName) {
      console.warn("Missing required fields for confirmation email");
      return new Response(
        JSON.stringify({ success: false, error: "Email and first name are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const email = String(rawData.email).trim().slice(0, 254);
    const firstName = extractFirstName(String(rawData.firstName).trim().slice(0, 100));

    console.log(`Sending confirmation email to: ${email}`);

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
      line-height: 1.7; 
      color: #1a1a1a; 
      max-width: 600px; 
      margin: 0 auto; 
      padding: 40px 20px;
      background-color: #ffffff;
    }
    .greeting { 
      font-size: 18px; 
      margin-bottom: 24px;
    }
    p { 
      margin: 0 0 20px 0; 
      font-size: 16px;
      color: #374151;
    }
    .signature { 
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }
    .company-name {
      font-weight: 600;
      color: #1a1a1a;
    }
    .email-link {
      color: #3b82f6;
      text-decoration: none;
    }
    .email-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <p class="greeting">Hi ${escapeHtml(firstName)},</p>
  
  <p>Thanks for completing the questions.</p>
  
  <p>We've reviewed your answers and shared the right context with the provider that best fits your business. You don't need to do anything else for now.</p>
  
  <p>You should hear back within 24 hours with next steps or any follow-up they need.</p>
  
  <p>If at any point this doesn't feel like the right fit, let us know. We can step in and help you find a better option.</p>
  
  <p>We're here to make sure you don't get stuck with the wrong setup.</p>
  
  <div class="signature">
    <p class="company-name">ChosePayments</p>
    <p><a href="mailto:hello@chosepayments.com" class="email-link">hello@chosepayments.com</a></p>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "ChosePayments <hello@chosepayments.com>",
      to: email,
      subject: "We've got your details",
      html: emailHtml,
    });

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-confirmation-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
