import {
  addDays,
  addMonths,
  addQuarters,
  addYears,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  setDay,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { textToDate } from './text-to-date';

describe('default', () => {
  test('yyyy-MM-dd', () => {
    expect(textToDate('2022-01-01')).toEqual(new Date(`2022-01-01T00:00:00.000Z`));
  });

  test('start of this week', () => {
    expect(textToDate('start of this week')).toEqual(startOfWeek(new Date()));
  });

  test('end of this week', () => {
    expect(textToDate('end of this week')).toEqual(endOfWeek(new Date()));
  });

  test('start of last week', () => {
    expect(textToDate('start of last week')).toEqual(startOfWeek(addDays(new Date(), -7)));
  });

  test('end of last week', () => {
    expect(textToDate('end of last week')).toEqual(endOfWeek(addDays(new Date(), -7)));
  });

  test('start of next week', () => {
    expect(textToDate('start of next week')).toEqual(startOfWeek(addDays(new Date(), 7)));
  });

  test('end of next week', () => {
    expect(textToDate('end of next week')).toEqual(endOfWeek(addDays(new Date(), 7)));
  });

  test('start of this month', () => {
    expect(textToDate('start of this month')).toEqual(startOfMonth(new Date()));
  });

  test('end of this month', () => {
    expect(textToDate('end of this month')).toEqual(endOfMonth(new Date()));
  });

  test('start of last month', () => {
    expect(textToDate('start of last month')).toEqual(startOfMonth(addMonths(new Date(), -1)));
  });

  test('end of last month', () => {
    expect(textToDate('end of last month')).toEqual(endOfMonth(addMonths(new Date(), -1)));
  });

  test('start of next month', () => {
    expect(textToDate('start of next month')).toEqual(startOfMonth(addMonths(new Date(), 1)));
  });

  test('end of next month', () => {
    expect(textToDate('end of next month')).toEqual(endOfMonth(addMonths(new Date(), 1)));
  });

  test('start of this year', () => {
    expect(textToDate('start of this year')).toEqual(startOfYear(new Date()));
  });

  test('end of this year', () => {
    expect(textToDate('end of this year')).toEqual(endOfYear(new Date()));
  });

  test('start of last year', () => {
    expect(textToDate('start of last year')).toEqual(startOfYear(addYears(new Date(), -1)));
  });

  test('end of last year', () => {
    expect(textToDate('end of last year')).toEqual(endOfYear(addYears(new Date(), -1)));
  });

  test('start of next year', () => {
    expect(textToDate('start of next year')).toEqual(startOfYear(addYears(new Date(), 1)));
  });

  test('end of next year', () => {
    expect(textToDate('end of next year')).toEqual(endOfYear(addYears(new Date(), 1)));
  });

  test('start of this quarter', () => {
    expect(textToDate('start of this quarter')).toEqual(startOfQuarter(new Date()));
  });

  test('end of this quarter', () => {
    expect(textToDate('end of this quarter')).toEqual(endOfQuarter(new Date()));
  });

  test('start of last quarter', () => {
    expect(textToDate('start of last quarter')).toEqual(startOfQuarter(addQuarters(new Date(), -1)));
  });

  test('end of last quarter', () => {
    expect(textToDate('end of last quarter')).toEqual(endOfQuarter(addQuarters(new Date(), -1)));
  });

  test('start of next quarter', () => {
    expect(textToDate('start of next quarter')).toEqual(startOfQuarter(addQuarters(new Date(), 1)));
  });

  test('end of next quarter', () => {
    expect(textToDate('end of next quarter')).toEqual(endOfQuarter(addQuarters(new Date(), 1)));
  });

  test('this sunday', () => {
    expect(textToDate('this sunday')).toEqual(startOfDay(setDay(new Date(), 0)));
  });

  test('this saturday', () => {
    expect(textToDate('this saturday')).toEqual(startOfDay(setDay(new Date(), 6)));
  });

  test('last sunday', () => {
    expect(textToDate('last sunday')).toEqual(startOfDay(setDay(addDays(new Date(), -7), 0)));
  });

  test('last saturday', () => {
    expect(textToDate('last saturday')).toEqual(startOfDay(setDay(addDays(new Date(), -7), 6)));
  });

  test('next sunday', () => {
    expect(textToDate('next sunday')).toEqual(startOfDay(setDay(addDays(new Date(), 7), 0)));
  });

  test('next saturday', () => {
    expect(textToDate('next saturday')).toEqual(startOfDay(setDay(addDays(new Date(), 7), 6)));
  });
});
