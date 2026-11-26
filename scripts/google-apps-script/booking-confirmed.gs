/**
 * booking_confirmed → GA4
 *
 * The "Book a call" panel on chosepayments.com embeds a Google Calendar
 * appointment schedule. Google's embed tells the website nothing when a
 * visitor books (no postMessage, no reload), so GA only ever saw
 * booking_open. This script runs in the calendar owner's Google account,
 * finds new bookings of the free call on the calendar, and sends one
 * booking_confirmed event per booking to GA4 through the Measurement
 * Protocol.
 *
 * GA counts these as conversions but cannot tie them to the visitor's web
 * session, so they carry no traffic source.
 *
 * No personal data is sent to GA: no names, emails or event titles, only
 * timing.
 *
 * Setup (once): see scripts/google-apps-script/README.md.
 */

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

const MEASUREMENT_ID = "G-L6LB24F1J8"; // chosepayments.com web stream (app/layout.tsx)

// Calendar events whose title starts with this are bookings of the free call.
// Google titles them "<schedule name> (<visitor name>)".
const BOOKING_TITLE_PREFIX = "Free 15-minute payments call";

// How far ahead to look for booked calls. Bookings are usually for the next
// few weeks; this only needs to cover the schedule's booking window.
const LOOKAHEAD_DAYS = 90;

// Script property names.
const PROP_API_SECRET = "GA_API_SECRET";
const PROP_SENT = "SENT_BOOKINGS"; // JSON { eventId: sentAtMillis }
const PROP_SINCE = "TRACK_SINCE"; // millis; bookings created before this are ignored

const DAY_MS = 24 * 60 * 60 * 1000;

// ---------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------

/**
 * Run once by hand after pasting the script. Records "now" as the start
 * point, so bookings made before install are not sent, and creates the
 * 10-minute trigger.
 */
function setup() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty(PROP_API_SECRET)) {
    throw new Error(
      "Add the GA Measurement Protocol API secret first: Project Settings → Script properties → " +
        PROP_API_SECRET,
    );
  }
  if (!props.getProperty(PROP_SINCE)) props.setProperty(PROP_SINCE, String(Date.now()));

  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "checkForNewBookings")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("checkForNewBookings").timeBased().everyMinutes(10).create();

  Logger.log("Tracking bookings created after " + new Date(Number(props.getProperty(PROP_SINCE))));
}

/** Runs every 10 minutes. Sends booking_confirmed for each new booking. */
function checkForNewBookings() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30 * 1000)) return; // a previous run is still going
  try {
    const props = PropertiesService.getScriptProperties();
    const apiSecret = props.getProperty(PROP_API_SECRET);
    if (!apiSecret) throw new Error("Missing script property " + PROP_API_SECRET);

    const since = Number(props.getProperty(PROP_SINCE) || Date.now());
    const sent = pruneSent(JSON.parse(props.getProperty(PROP_SENT) || "{}"));
    const now = new Date();

    const bookings = findNewBookings(
      CalendarApp.getDefaultCalendar(),
      now,
      since,
      sent,
    );

    for (const event of bookings) {
      const ok = sendBookingConfirmed(apiSecret, event, now);
      if (ok) sent[event.getId()] = now.getTime();
    }

    props.setProperty(PROP_SENT, JSON.stringify(sent));
    if (bookings.length) Logger.log("Sent booking_confirmed for " + bookings.length + " booking(s)");
  } finally {
    lock.releaseLock();
  }
}

/**
 * Optional check, run by hand: validates an example event against GA's
 * debug endpoint without recording anything. Look for
 * "validationMessages": [] in the log.
 */
function testWithGaDebug() {
  const apiSecret = PropertiesService.getScriptProperties().getProperty(PROP_API_SECRET);
  const payload = buildPayload({ start: new Date(Date.now() + 2 * DAY_MS), created: new Date() }, new Date());
  const res = UrlFetchApp.fetch(endpoint("debug/mp/collect", apiSecret), {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  Logger.log(res.getResponseCode() + " " + res.getContentText());
}

// ---------------------------------------------------------------------------
// Logic
// ---------------------------------------------------------------------------

/** Free-call events created after `since` that have not been sent yet. */
function findNewBookings(calendar, now, since, sent) {
  // Include events that already started: a booking made for "in 10 minutes"
  // may have begun by the time the next run sees it.
  const from = new Date(now.getTime() - DAY_MS);
  const to = new Date(now.getTime() + LOOKAHEAD_DAYS * DAY_MS);
  return calendar.getEvents(from, to).filter((e) => {
    if (!String(e.getTitle()).startsWith(BOOKING_TITLE_PREFIX)) return false;
    if (sent[e.getId()]) return false;
    return e.getDateCreated().getTime() >= since;
  });
}

function buildPayload(booking, now) {
  const start = booking.start;
  const created = booking.created;
  return {
    // A fresh pseudonymous id per booking: there is no link to the visitor's
    // browser session, and GA requires some client_id.
    client_id: Math.floor(Math.random() * 2147483647) + "." + Math.floor(created.getTime() / 1000),
    timestamp_micros: String(created.getTime() * 1000),
    non_personalized_ads: true,
    events: [
      {
        name: "booking_confirmed",
        params: {
          booking_source: "google_calendar_appointment",
          days_until_call: Math.max(0, Math.round((start.getTime() - created.getTime()) / DAY_MS)),
          call_hour_utc: start.getUTCHours(),
          engagement_time_msec: 1,
        },
      },
    ],
  };
}

function sendBookingConfirmed(apiSecret, event, now) {
  const payload = buildPayload({ start: event.getStartTime(), created: event.getDateCreated() }, now);
  // GA4 rejects timestamps more than 72 hours old; send those without one
  // (they are then dated at receipt).
  if (now.getTime() - event.getDateCreated().getTime() > 72 * 60 * 60 * 1000) {
    delete payload.timestamp_micros;
  }
  const res = UrlFetchApp.fetch(endpoint("mp/collect", apiSecret), {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });
  const code = res.getResponseCode();
  if (code < 200 || code >= 300) {
    Logger.log("GA rejected booking_confirmed (" + code + "): " + res.getContentText());
    return false;
  }
  return true;
}

function endpoint(path, apiSecret) {
  return (
    "https://www.google-analytics.com/" +
    path +
    "?measurement_id=" +
    encodeURIComponent(MEASUREMENT_ID) +
    "&api_secret=" +
    encodeURIComponent(apiSecret)
  );
}

/** Drop records older than the lookahead window so the property stays small. */
function pruneSent(sent) {
  const cutoff = Date.now() - (LOOKAHEAD_DAYS + 30) * DAY_MS;
  const out = {};
  Object.keys(sent).forEach((id) => {
    if (sent[id] >= cutoff) out[id] = sent[id];
  });
  return out;
}
