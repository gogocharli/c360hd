const dateTime = require('date-time');

/**
 * Extracts local time from an ISO 8601 time string in a readable format
 *
 * @param {string} time
 * @returns {string} the matched time
 */

exports.formatTime = (time) => {
  const localDate = dateTime({ local: true, date: new Date(time) });
  const localTime = localDate.split(' ').pop().split(':');
  [hours, mins] = localTime;
  return [hours, mins].join('h');
};
