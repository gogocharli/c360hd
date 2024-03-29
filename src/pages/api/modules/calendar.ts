import { DateTime } from 'luxon';
import { google } from 'googleapis';

import { createDateTime } from '../utils/date-time';
const { OAuth2 } = google.auth;

interface EventInfo {
  summary: string;
  description: string;
  location: string;
}

/**
 * Adds the order as an event in the Google Calendar
 *
 * @param {String} date
 * @param {String} time
 * @param {{summary: string, description: string, location: string}} eventInfo The basic event information
 */
async function addToCalendar(startTime: string, eventInfo: EventInfo) {
  // Authenticate with Google Oauth and initialize calendar access
  const OAuth2Client = new OAuth2({
    clientId: process.env.GOOGLE_CAL_ID,
    clientSecret: process.env.GOOGLE_CAL_SECRET,
  });

  OAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_CAL_REFRESH_TOKEN,
  });

  const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });

  const eventStartTime = startTime;

  const eventEndTime = DateTime.fromISO(startTime)
    .plus({ hours: 1, minutes: 30 })
    .toISO();

  const event = {
    ...eventInfo,
    colorId: '6',
    start: {
      dateTime: eventStartTime,
      timeZone: 'America/Toronto',
    },
    end: {
      dateTime: eventEndTime,
      timeZone: 'America/Toronto',
    },
  };

  try {
    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
  } catch (err: any) {
    console.log(err);
    throw { errorMessage: err.message };
  }
}

export { addToCalendar };
