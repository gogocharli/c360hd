/**
 * Algorithm to find the closest free time periods to a specified hour.
 *
 * If the list's length is shorter than 3 elements, return the list as is
 * Append preferred time to list of periods
 * Sort the list according to their occurence in the day
 * Perform a binary search on the list for the time
 * If the index is 0, pick the two next hours
 * If the index is at the end of the list, pick the two previous hours
 * Otherwise, pick the hour on the left, and the hour on the right
 */

function findClosestHours(
  preferredHour: string,
  availableHours: string[],
): string[] {
  if (availableHours.length < 3) {
    return availableHours;
  }

  const sortedHours = [...availableHours, preferredHour].sort();
  const hourIndex = binarySearch(sortedHours, preferredHour);

  if (hourIndex == 0) {
    return sortedHours.slice(0, 3);
  } else if (hourIndex == availableHours.length) {
    return sortedHours.slice(hourIndex - 2, hourIndex);
  } else {
    return [sortedHours[hourIndex - 1], sortedHours[hourIndex + 1]];
  }
}

function binarySearch<T>(
  list: T[],
  item: T,
  start = 0,
  end = list.length - 1,
): number {
  // Base case
  if (start > end) return -1;

  let middle = Math.floor((start + end) / 2);

  if (item === list[middle]) {
    return middle;
  }

  if (item < list[middle]) {
    return binarySearch(list, item, start, middle - 1);
  } else {
    return binarySearch(list, item, middle + 1, end);
  }
}

export { findClosestHours };
