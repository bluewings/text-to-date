import { textToDate } from './text-to-date';

describe('default', () => {
  test('yyyy-MM-dd', () => {
    expect(textToDate('2022-01-01')).toEqual(new Date(`2022-01-01T00:00:00.000Z`));
  });
});
