import { startOfDay, endOfDay } from 'date-fns';
import { textToDate } from './text-to-date';

export const textToTimeRange = (text: string) => {
  const parts = text.split(/ to | ~ | - /);
  if (parts.length === 2) {
    const from = textToDate(parts[0]);
    const to = textToDate(parts[1]);
    if (from && to) {
      return [startOfDay(from), endOfDay(to)];
    }
  }
  return [null, null];
};
