const moment = require('moment-timezone');
moment.locale('en-gb');
/**
 * Converts UTC timezone to local using locale
 *
 * @param {String} time
 * @param {String=} timeZone `America/Toronto` by default
 */
const convertTimeZone = (time, timeZone = 'America/Toronto') => {
  return moment.tz(time, timeZone).format('LLL');
};

/**
 * Extracts local time from an ISO 8601 time string in a readable format
 *
 * @param {string} time
 * @returns {string} the matched time
 */

exports.formatTime = (time) => {
  const localDate = convertTimeZone(time);
  const localTime = localDate.split(' ').pop().split(':');
  [hours, mins] = localTime;
  mins = +mins + 30 < 60 ? '00' : '30'; // Rounds to 30 minutes interval
  return [hours, mins].join('h');
};

/**
 * Extracts date from an ISO 8601 time string in airtable's format
 *
 * @param {string} date
 * @returns {string} the matched date
 */
exports.formatDate = (date) => {
  const regex = /(^.*)(?:T)/g;
  const formattedDate = regex.exec(date)[1];
  return formattedDate;
};

/**
 * Creates a date string from a date and a time UTC string
 *
 * @param {String} date Formatted as `2020-09-24`
 * @param {String} time A UTC string
 * @returns {String}
 */
exports.createDateTime = (date, time) => {
  const timeRegex = /(?:^.+)(T.*$)/g;
  const timeSection = timeRegex.exec(time)[1];
  const dateTime = date + timeSection;
  return dateTime;
};
