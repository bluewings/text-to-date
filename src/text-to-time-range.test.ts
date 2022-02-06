import { addYears, endOfYear, endOfDay, startOfDay, startOfYear } from 'date-fns';
import { textToDate } from './text-to-date';
import { textToTimeRange } from './text-to-time-range';

describe('default', () => {
  test('this sunday ~ this saturday', () => {
    expect(textToTimeRange('this sunday ~ this saturday')).toEqual([
      startOfDay(textToDate('this sunday') as Date),
      endOfDay(textToDate('this saturday') as Date),
    ]);
  });

  test('start of last year ~ end of this year', () => {
    expect(textToTimeRange('start of last year ~ end of this year')).toEqual([
      startOfYear(addYears(new Date(), -1)),
      endOfYear(new Date()),
    ]);
  });

  test('2011-11-11 ~ end of this year', () => {
    expect(textToTimeRange('2011-11-11 ~ end of this year')).toEqual([
      startOfDay(new Date('2011-11-11')),
      endOfYear(new Date()),
    ]);
  });
});
