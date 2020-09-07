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
  mins = +mins + 30 < 60 ? '00' : '30';
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
