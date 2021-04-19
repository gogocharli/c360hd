/*
  Extract upcoming order dates from airtable into an array of objects containing date and time
  Filter the records which contain the same date
*/

import { OrdersTable } from '../../modules/db-adapter';
import { findClosestHours } from '../../utils/find-time';
import config from '../../config.js';

// Depend on the number of available photographers on the field
const MAX_CONCURRENT_ORDERS = config.maxOrders;
const MAX_DAILY_ORDERS = MAX_CONCURRENT_ORDERS * 5;
const OPENING_HOURS = config.openingHours;

/**
 * Determines if the order can be placed at the desired date and time.
 * - If the date is fully booked, throw an error message that can be passed to the order form.
 * - If the time is not available, throw an error message with 2 other available hours.
 * @param {string} date Formatted as `2020-09-14` for `September 14th 2020`
 * @param {string} time Formatted as `15h00` for `3PM`
 * @returns {{isFree: boolean, reason: string|null}}
 */
async function checkSchedule(date: string, time: string) {
  const data = await OrdersTable.all({ fields: ['Time', 'Date'] });
  const orders = data.map((order) => {
    return { Date: order.fields['Date'], Time: order.fields['Time'] };
  });

  // List orders occuring the same day as the order
  const ordersOnSameDate = orders
    .filter((order) => order.Date === date)
    .map((order) => order.Time);

  if (ordersOnSameDate.length === 0) {
    return { isFree: true, reason: null };
  } else if (ordersOnSameDate.length < MAX_DAILY_ORDERS) {
    // Check if there are shootings at that time
    if (isAvailable(ordersOnSameDate, time)) {
      return { isFree: true, reason: null };
    } else {
      // Find the next set of time with less than 4 orders
      // Get the other filled hours of the day
      // If the hour has been sheduled, don't include it in the available hours
      let freeHours = OPENING_HOURS.filter(
        (hour) => !ordersOnSameDate.includes(hour),
      );

      if (freeHours.length < 3) {
        // Get more availble hours from the ones not fully booked yet
        const otherHours = ordersOnSameDate
          .filter((orderTime) => orderTime !== time)
          .reduce(getOrderCount, {});

        for (const [hour, count] of Object.entries(otherHours)) {
          if (count < MAX_CONCURRENT_ORDERS) {
            freeHours.push(hour);
          }
        }
      }

      const closestHours = findClosestHours(time, freeHours);

      // Throw an error to the consumer with the next three available hours
      // TODO return the reason as an array of the hours instead for localization later
      return {
        isFree: false,
        reason: `Schedule conflict. How about the following hours instead ${closestHours.join(
          ', ',
        )}`,
      };
    }
  } else {
    return {
      isFree: false,
      reason: 'Day is fully booked, please choose another date.',
    };
  }
}

//== Helper Functions ==//

/**
 * Determines whether an order can be booked at a specific time
 *
 * @param {string[]} dayOrders List of the hours for the order date's day
 * @param {string} time Formatted as `15h00` for `3PM`
 */
function isAvailable(dayOrders: string[], time: string): boolean {
  // Return true if there is less than 4 in the array
  // Return false otherwise
  const isSameTime = dayOrders.filter((orderTime) => orderTime === time);
  const timeAvailable = isSameTime.length < MAX_CONCURRENT_ORDERS;
  return timeAvailable;
}

function getOrderCount(otherHours: any, currentTime: string) {
  if (!otherHours.hasOwnProperty(currentTime)) {
    otherHours[currentTime] = 1;
  } else {
    otherHours[currentTime] += 1;
  }
  return otherHours;
}

export { checkSchedule };
