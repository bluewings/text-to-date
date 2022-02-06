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

enum TextToken {
  StartOf = 'startof',
  EndOf = 'endof',
  Monday = 'mon',
  Tuesday = 'tue',
  Wednesday = 'wed',
  Thursday = 'thu',
  Friday = 'fri',
  Saturday = 'sat',
  Sunday = 'sun',
  ThisWeek = 'thisweek',
  LastWeek = 'lastweek',
  NextWeek = 'nextweek',
  ThisMonth = 'thismonth',
  LastMonth = 'lastmonth',
  NextMonth = 'nextmonth',
  ThisYear = 'thisyear',
  LastYear = 'lastyear',
  NextYear = 'nextyear',
  ThisQuarter = 'thisquarter',
  LastQuarter = 'lastquarter',
  NextQuarter = 'nextquarter',
  This = 'this',
  Last = 'last',
  Next = 'next',
}

const tokens = {
  [TextToken.StartOf]: ['start of'],
  [TextToken.EndOf]: ['end of'],
  [TextToken.Monday]: ['monday'],
  [TextToken.Tuesday]: ['tuesday'],
  [TextToken.Wednesday]: ['wednesday'],
  [TextToken.Thursday]: ['thursday'],
  [TextToken.Friday]: ['friday'],
  [TextToken.Saturday]: ['saturday'],
  [TextToken.Sunday]: ['sunday'],
  [TextToken.ThisWeek]: ['this week'],
  [TextToken.LastWeek]: ['last week'],
  [TextToken.NextWeek]: ['next week'],
  [TextToken.ThisMonth]: ['this month'],
  [TextToken.LastMonth]: ['last month'],
  [TextToken.NextMonth]: ['next month'],
  [TextToken.ThisYear]: ['this year'],
  [TextToken.LastYear]: ['last year'],
  [TextToken.NextYear]: ['next year'],
  [TextToken.ThisQuarter]: ['this quarter'],
  [TextToken.LastQuarter]: ['last quarter'],
  [TextToken.NextQuarter]: ['next quarter'],
};

const replacements = Object.entries(tokens)
  .reduce((accum, [replace, terms]) => {
    accum.push(...terms.map((find) => ({ find, replace })));
    return accum;
  }, [] as { find: string; replace: string }[])
  .sort((a, b) => (a.find.length === b.find.length ? 0 : a.find.length > b.find.length ? -1 : 1));

const daysInWeek: string[] = [
  TextToken.Sunday,
  TextToken.Monday,
  TextToken.Tuesday,
  TextToken.Wednesday,
  TextToken.Thursday,
  TextToken.Friday,
  TextToken.Saturday,
];

export const textToDate = (text: string) => {
  const source = text.toLowerCase().replace(/\s+/g, ' ');

  // basic conversion
  const date = new Date(source);
  if (isValidDate(date)) {
    return new Date(source);
  }

  const tokens = replacements.reduce((prev, { find, replace }) => prev.replace(find, replace), source).split(' ');

  const today = new Date();

  if (tokens.includes(TextToken.StartOf) || tokens.includes(TextToken.EndOf)) {
    // (start|end) of (week|month|year|quarter)
    let refDate = new Date();
    let isStart = tokens.includes(TextToken.StartOf);
    let transform;

    if (tokens.includes(TextToken.ThisWeek)) {
      refDate = today;
      transform = isStart ? startOfWeek : endOfWeek;
    } else if (tokens.includes(TextToken.LastWeek)) {
      refDate = addDays(today, -7);
      transform = isStart ? startOfWeek : endOfWeek;
    } else if (tokens.includes(TextToken.NextWeek)) {
      refDate = addDays(today, 7);
      transform = isStart ? startOfWeek : endOfWeek;
    } else if (tokens.includes(TextToken.ThisMonth)) {
      refDate = today;
      transform = isStart ? startOfMonth : endOfMonth;
    } else if (tokens.includes(TextToken.LastMonth)) {
      refDate = addMonths(today, -1);
      transform = isStart ? startOfMonth : endOfMonth;
    } else if (tokens.includes(TextToken.NextMonth)) {
      refDate = addMonths(today, 1);
      transform = isStart ? startOfMonth : endOfMonth;
    } else if (tokens.includes(TextToken.ThisYear)) {
      refDate = today;
      transform = isStart ? startOfYear : endOfYear;
    } else if (tokens.includes(TextToken.LastYear)) {
      refDate = addYears(today, -1);
      transform = isStart ? startOfYear : endOfYear;
    } else if (tokens.includes(TextToken.NextYear)) {
      refDate = addYears(today, 1);
      transform = isStart ? startOfYear : endOfYear;
    } else if (tokens.includes(TextToken.ThisQuarter)) {
      refDate = today;
      transform = isStart ? startOfQuarter : endOfQuarter;
    } else if (tokens.includes(TextToken.LastQuarter)) {
      refDate = addQuarters(today, -1);
      transform = isStart ? startOfQuarter : endOfQuarter;
    } else if (tokens.includes(TextToken.NextQuarter)) {
      refDate = addQuarters(today, 1);
      transform = isStart ? startOfQuarter : endOfQuarter;
    }

    if (transform) {
      return transform(refDate);
    }
  } else {
    // (this|last|next) (sun|mon|tue|wed|thu|fri|sat|sun)
    const nameOfDay = tokens.find((e) => daysInWeek.includes(e));
    const day = nameOfDay ? daysInWeek.indexOf(nameOfDay) : -1;
    if (day !== -1) {
      let week = new Date();
      if (tokens.includes(TextToken.Last)) {
        week = addDays(week, -7);
      } else if (tokens.includes(TextToken.Next)) {
        week = addDays(week, 7);
      }
      return startOfDay(setDay(week, day));
    }
  }

  return null;
};

const isValidDate = (date: Date) => !Number.isNaN(date.getTime());
