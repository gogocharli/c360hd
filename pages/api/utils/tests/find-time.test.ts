import { findClosestHours } from '../find-time';

test('Returns when there is an empty list', () => {
  expect(findClosestHours('12h00', [])).toStrictEqual([]);
});

test('Returns when there is less than 3 elements', () => {
  expect(findClosestHours('09h00', ['10h00', '14h30'])).toStrictEqual([
    '10h00',
    '14h30',
  ]);
});

test('Finds correct times for a list of 4 elements', () => {
  expect(
    findClosestHours('13h00', ['12h00', '10h30', '15h00', '17h30'])
  ).toStrictEqual(['12h00', '15h00']);
});
