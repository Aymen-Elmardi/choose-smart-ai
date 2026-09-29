// Google Calendar appointment schedule for the free 15-minute intro call.
// Used by every "Book a Free 15-Minute Call" CTA (homepage + insight articles).
// BookingDialog intercepts plain clicks on this URL and opens the schedule in
// an on-site panel; the link itself stays the no-JS / new-tab fallback.
export const BOOKING_URL = "https://calendar.app.google/qJhK6KM2XjdWcCkS6";

// The same schedule in Google's embeddable form (`gv=true`). The short link
// above redirects to a page that refuses to be framed.
export const BOOKING_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0r_WkAI8n28nGwe3aDi9DBCG8l_lbCYuJtWY3_22asgIBJ8mm_O1cmpvUVACqDUEKLgyBswnfk?gv=true";
