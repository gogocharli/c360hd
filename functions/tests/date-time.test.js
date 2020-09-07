const { formatTime } = require('../utils/date-time');

test('Converts UTC time to local time string', () => {
  expect(formatTime('2020-09-03T04:00:00.000Z')).toBe('00h00');
});

test('Converts when minutes is below half hour', () => {
  expect(formatTime('2020-09-24T19:12:00.000Z')).toBe('15h00');
});

test('Converts when minutes is above half hour', () => {
  expect(formatTime('2020-09-24T19:44:00.000Z')).toBe('15h30');
});
