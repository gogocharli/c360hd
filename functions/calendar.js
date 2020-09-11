const { google } = require('googleapis');

const { createDateTime } = require('./utils/date-time');
const { OAuth2 } = google.auth;

/**
 * Adds the order as an event in the Google Calendar
 *
 * @param {String} date
 * @param {String} time
 * @param {{summary: string, description: string, location: string}} eventInfo The basic event information
 */
exports.addToCalendar = async (date, time, eventInfo) => {
  // TODO remove the client ID and secret
  // Authenticate with Google Oauth and initialize calendar access
  const OAuth2Client = new OAuth2({
    clientId: process.env.GOOGLE_CAL_ID,
    clientSecret: process.env.GOOGLE_CAL_SECRET,
  });

  OAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_CAL_REFRESH_TOKEN,
  });

  const calendar = google.calendar({ version: 'v3', auth: OAuth2Client });

  // Set the start and end time for the event
  const dateTime = createDateTime(date, time);
  const eventStartTime = new Date(dateTime);

  const eventEndTime = new Date(dateTime);
  eventEndTime.setMinutes(eventEndTime.getMinutes() + 60);

  const event = {
    ...eventInfo,
    colorId: 6,
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
      resource: event,
    });
    console.log(`Event Created`);
  } catch (err) {
    console.error(err);
  }
};
