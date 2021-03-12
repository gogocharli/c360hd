import { DateTime } from 'luxon';
import { formatDate, formatTime, humanizeDate, isTomorrow } from '../date-time';

test('Converts UTC time to local time string', () => {
  expect(formatTime('2020-09-03T04:00:00.000Z')).toBe('00h00');
});

test('Converts when minutes is below half hour', () => {
  expect(formatTime('2020-09-24T19:12:00.000Z')).toBe('15h00');
});

test('Converts when minutes is above half hour', () => {
  expect(formatTime('2020-09-24T19:44:00.000Z')).toBe('15h30');
});

test('Gets date from UTC string', () => {
  expect(formatDate('2020-09-03T04:00:00.000Z')).toBe('2020-09-03');
});

test('Humanizes date correctly in English', () => {
  expect(humanizeDate('2020-09-03T04:00:00.000Z', 'en')).toBe('September 3');
  expect(humanizeDate('2020-03-12T04:00:00.000Z', 'en')).toBe('March 12');
});

test('Humanizes date correctly in French', () => {
  expect(humanizeDate('2020-09-03T04:00:00.000Z', 'fr')).toBe('3 Septembre');
  expect(humanizeDate('2020-03-12T04:00:00.000Z', 'fr')).toBe('12 Mars');
});

test("Correctly figures out next day's date", () => {
  const nextDay = DateTime.local().plus({ days: 1 });
  expect(isTomorrow(String(nextDay))).toBe(true);
});

test('Today is not tomorrow', () => {
  expect(isTomorrow(String(new Date()))).toBe(false);
});
