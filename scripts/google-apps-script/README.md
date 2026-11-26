# booking_confirmed (Google Apps Script)

The "Book a call" panel embeds a Google Calendar appointment schedule
(`src/lib/booking.ts`). Google's embed gives the page no signal when someone
books: no postMessage, and no iframe reload when a slot is picked or the form
opens (tested 26 Nov 2026). So the site can only track `booking_open`.

`booking-confirmed.gs` closes the gap from the calendar side. It runs every 10
minutes in the calendar owner's Google account, finds new events whose title
starts with `Free 15-minute payments call`, and sends one `booking_confirmed`
event per booking to GA4 (`G-L6LB24F1J8`) through the Measurement Protocol.

**What GA gets:** `booking_confirmed` with these parameters:
- `booking_source`: always `google_calendar_appointment`
- `days_until_call`
- `call_hour_utc`

No names, emails or event titles are sent.

**Limit:** these events aren't linked to the visitor's browser session, so GA
shows them with no traffic source or landing page. They still count as key
events.

## Setup (about 5 minutes, once)

1. **Create a GA API secret.**
   - In GA4, go to Admin → Data streams → the chosepayments.com web stream →
     Measurement Protocol API secrets → Create.
   - Name it `booking-confirmed` and copy the value.
2. **Create the script.**
   - Signed in as the account that owns the booking calendar, open
     https://script.google.com → New project.
   - Name it `ChosePayments booking_confirmed`.
   - Replace `Code.gs` with the contents of `booking-confirmed.gs` and save.
3. **Add the secret.**
   - Project Settings (gear icon) → Script properties → Add.
   - Property: `GA_API_SECRET`, value: the secret from step 1. Save.
4. **Optional check.**
   - In the editor, select `testWithGaDebug` → Run. Approve the permissions
     prompt.
   - The log should show `"validationMessages": []`. Nothing is recorded in GA.
5. **Start tracking.**
   - Select `setup` → Run.
   - This records the start time (earlier bookings are not sent) and creates
     the 10-minute trigger. Run it again any time to reset the trigger; the
     start time is kept.
6. **Mark it as a key event.**
   - In GA4, go to Admin → Key events → New key event → `booking_confirmed`.
   - You can do this before the first booking arrives.

## Notes

- **Renamed the appointment schedule?** Update `BOOKING_TITLE_PREFIX` in the
  script.
- **Cancellations:** a cancelled booking is not reversed in GA.
- **Failed sends:** if GA rejects a send, the booking is retried on the next
  run. The run log is in the script editor under Executions.
