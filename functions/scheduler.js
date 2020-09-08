const { getAllFromTable } = require('./utils/queries');

// Depend on the number of available photographers on the field
const MAX_CONCURRENT_ORDERS = 4;
const MAX_DAILY_ORDERS = MAX_CONCURRENT_ORDERS * 7;
const OPENING_HOURS = [
  '9h00',
  '9h30',
  '10h00',
  '10h30',
  '11h00',
  '11h30',
  '12h00',
  '12h30',
  '13h00',
  '13h30',
  '14h00',
  '14h30',
  '15h00',
  '15h30',
  '16h00',
  '16h30',
  '17h00',
  '17h30',
];

class scheduleError extends Error {}

exports.scheduleError = scheduleError;
/*
  Extract upcoming order dates from airtable into an array of objects containing date and time
  Filter the records which contain the same date
  If there isn't the same date — create a new record
  If there isn't 28 orders the same date
  If there is less than 4 orders at the same time — create a new record
  Else find the closest time periods with less than 4 orders and send an error message to the sales rep
*/

/**
 * Schedules the order at the desired date and time.
 * - If the date is fully booked, throw an error message that can be passed to the order form.
 * - If the time is not available, throw an error message with 3 other available hours.
 * @param {String} date Formatted as `2020-09-14` for `September 14th 2020`
 * @param {String} time Formatted as `15h00` for `3PM`
 */
exports.schedule = async function (date, time) {
  const data = await getAllFromTable('Orders', 'Date', 'Time');
  const orders = data.map((order) => {
    return { Date: order.get('Date'), Time: order.get('Time') };
  });

  const isSameDate = orders
    .filter((order) => order.Date === date)
    .map((order) => order.Time);

  if (!isSameDate.length) {
    return true;
  } else if (isSameDate.length < MAX_DAILY_ORDERS) {
    // Check if there are shootings at that time
    if (isAvailable(isSameDate, time)) {
      // If there is enough space for that time
      return true;
    } else {
      // Find the next set of time with less than 4 orders
      // Get the other filled hours of the day
      let availableHours = OPENING_HOURS.filter((hour) => {
        // If the hour has been shedule, don't include it in the available hours
        return !isSameDate.includes(hour);
      });

      if (availableHours.length < 3) {
        // Get more from the ones which already have less than the max number of concurrent orders
        const getOrderCount = (nextHours, currentTime) => {
          if (!nextHours.hasOwnProperty(currentTime)) {
            nextHours[currentTime] = 1;
          } else {
            nextHours[currentTime] += 1;
          }
          return nextHours;
        };

        const nextHours = isSameDate
          .filter((orderTime) => orderTime !== time)
          .reduce(getOrderCount, {});

        for (const [hour, count] of Object.entries(nextHours)) {
          if (count < MAX_CONCURRENT_ORDERS) {
            availableHours.push(hour);
          }
        }
      }

      /*
      TODO Return the hours closest to the desired hour.
      For example, if 15h00 is chosen, return 14h00, 15h30, 16h00 if available 
      */
      // Throw an error to the sales rep with the next three available hours
      throw new scheduleError(
        `Schedule conflict. How about the following hours instead ${availableHours
          .slice(0, 3)
          .join(', ')}`
      );
    }
  } else {
    // Present an error to choose new date
    throw new scheduleError(
      "Can't book more for that day, please choose another date."
    );
  }
};

/**
 * Determines whether an order can be booked at a specific time
 *
 * @param {String[]} dayOrders List of the hours for the order date's day
 * @param {String} time Formatted as `15h00` for `3PM`
 * @returns {Boolean}
 */
function isAvailable(dayOrders, time) {
  // Return true if there is less than 4 in the array
  // Return false otherwise
  const isSameTime = dayOrders.filter((orderTime) => orderTime === time);
  const timeAvailable =
    isSameTime.length < MAX_CONCURRENT_ORDERS ? true : false;
  return timeAvailable;
}
