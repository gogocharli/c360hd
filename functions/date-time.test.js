const { formatTime } = require('./date-time');

test('3rd of september', () => {
  expect(formatTime('2020-09-03T04:00:00.000Z')).toBe('00h00');
});

test('24th of september', () => {
  expect(formatTime('2020-09-24T19:00:00.000Z')).toBe('15h00');
});
