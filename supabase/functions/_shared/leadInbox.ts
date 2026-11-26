// Where every lead / form notification is delivered.
//
// hello@chosepayments.com exists in Google Workspace but does not deliver to
// the inbox anyone reads, so leads sent there were accepted by Resend and then
// never seen. Send to the monitored mailbox instead. Set LEAD_INBOX (comma
// separated) in the function secrets to change it without a code change.
export const LEAD_INBOX: string[] = (Deno.env.get("LEAD_INBOX") ?? "aymenelmardi@chosepayments.com")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// Reply-To for emails sent to visitors, so their replies reach the same inbox.
export const LEAD_REPLY_TO: string = LEAD_INBOX[0];
