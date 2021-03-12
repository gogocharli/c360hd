import { DateTime } from 'luxon';

/**
 * Converts UTC timezone to local using locale
 *
 * @param {String} time
 * @param {String} timeZone `America/Toronto` by default
 */
function convertTimeZone(time: string, timeZone = 'America/Toronto'): string {
  const dt = DateTime.fromISO(time, { zone: timeZone });
  return dt.toLocaleString(DateTime.TIME_24_SIMPLE);
}

/**
 * Extracts local time from an ISO 8601 time string in a readable format
 *
 * @param {string} time
 * @returns {string} the matched time
 */

function formatTime(time: string): string {
  const localDate = convertTimeZone(time);
  const localTime = localDate.split(' ').pop().split(':');
  let [hours, mins] = localTime;
  mins = +mins + 30 < 60 ? '00' : '30'; // Rounds to 30 minutes interval
  return [hours, mins].join('h');
}

/**
 * Formats an ISO 8601 time string to an IS0 Date
 *
 * @param {string} date
 * @returns {string} the matched date
 */
function formatDate(date: string): string {
  const dt = DateTime.fromISO(date);
  return dt.toISODate();
}

/**
 * Creates a date string from a date and a time UTC string
 *
 * @param {String} date Formatted as `2020-09-24`
 * @param {String} time A UTC string
 * @returns {String}
 */
function createDateTime(date: string, time: string): DateTime {
  const [year, month, day] = date.split('-').map((s) => Number(s));
  const { hour, minute } = DateTime.fromISO(time).toUTC().toObject();

  const dateTime = DateTime.utc(year, month, day, hour, minute);

  return dateTime;
}

/**
 * Formats a ISO date string to a human readable string
 *
 * @param {String} date The date in ISO format
 * @param {String} lang Any valid Intl locale, defaults to en
 *
 * @see https://moment.github.io/luxon/docs/manual/intl.html
 */
function humanizeDate(date: string, lang: 'en' | 'fr' = 'en'): string {
  const dt = DateTime.fromISO(date);
  const format = { month: 'long', day: 'numeric' };
  const formattedDate = dt.setLocale(lang).toLocaleString(format);

  // setLocale is not working reliably in Node 12.18.3 due to the lack of NODE_ICU
  // I haven't been able to make it work reliably in Netlify's interface
  // thus I localize myself with `dateToFrench`
  const humanDate = lang === 'en' ? formattedDate : dateToFrench(formattedDate);
  return humanDate;
}

/**
 * Checks whether any date occurs the same day as tomorrow
 *
 * @param {string} date Any ISO 8601 date string
 * @returns {boolean}
 */
function isTomorrow(date: string): boolean {
  const dateISO = DateTime.fromISO(date);
  const tomorrow = DateTime.local().plus({ days: 1 });

  return tomorrow.hasSame(dateISO, 'day');
}

/**
 * Translates date format to french
 *
 * `January 3rd` becomes `3 Janvier`
 *
 * @param {String} date The date in english
 */
function dateToFrench(date: string): string {
  const months = {
    January: 'Janvier',
    February: 'Février',
    March: 'Mars',
    April: 'Avril',
    May: 'Mai',
    June: 'Juin',
    July: 'Juillet',
    August: 'Aout',
    September: 'Septembre',
    October: 'Octobre',
    November: 'Novembre',
    December: 'Decembre',
  };

  let [month, day] = date.split(' ');
  month = months[month];
  return `${day} ${month}`;
}

export { formatTime, formatDate, createDateTime, humanizeDate, isTomorrow };
