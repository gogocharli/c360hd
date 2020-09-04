const { getFromTable } = require('./utils/queries');

// Depend on the number of available photographers on the field
const MAX_CONCURRENT_ORDERS = 4;
const MAX_DAILY_ORDERS = MAX_CONCURRENT_ORDERS * 7;
const OPENING_HOURS = [
  '9h00',
  '10h00',
  '11h00',
  '12h00',
  '13h00',
  '14h00',
  '15h00',
  '16h00',
  '17h00',
];

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
 * If the date is fully booked, throw an error message that can be passed to the order form
 * If the time is not available, throw an error message with 3 other available hours
 * @param {String} date Formatted as `2020-09-14` for `September 14th 2020`
 * @param {String} time Formatted as `15h00` for `3PM`
 */
const schedule = async function (date, time) {
  const orders = await getFromTable('Orders', 'Date', 'Time');
  const isSameDate = orders
    .filter((order) => order.Date === date)
    .map((order) => order.Time);

  if (!isSameDate.length < MAX_DAILY_ORDERS) {
    // Check if there are shootings at that time
    // If there is enough space that day
    if (isAvailable(isSameDate, time)) {
      // TODO Create the record
      console.log('Can place order');
    } else {
      // Find the next set of time with less than 4 orders
      // Get the other filled hours of the day

      let availableHours = isSameDate.filter((hour) => {
        // If the hour has been shedule, don't include it in the available hours
        return !OPENING_HOURS.includes(hour);
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

        // Throw an error to the sales rep with the next three available hours
      }
    }
  } else {
    // Present an error to choose new date
    console.log('error my friend');
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
