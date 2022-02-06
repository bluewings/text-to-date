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

const b____b = Object.entries(tokens)
  .reduce(
    (accum, [replace, terms]) => [...accum, ...terms.map((find) => ({ find, replace }))],
    [] as { find: string; replace: string }[],
  )
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

  // console.log(bb);

  // source.replace()
  const ccc = b____b
    .reduce((accu, e) => {
      return accu.replace(e.find, e.replace);
    }, source)
    .split(' ');

  const today = new Date();

  if (ccc.includes(TextToken.StartOf) || ccc.includes(TextToken.EndOf)) {
    let stdDate = new Date();
    let isStart = ccc.includes(TextToken.StartOf);
    let fn;

    if (ccc.includes(TextToken.ThisWeek)) {
      // stdDate = addDays(today, -7);
      stdDate = today;
      fn = isStart ? startOfWeek : endOfWeek;
    } else if (ccc.includes(TextToken.LastWeek)) {
      stdDate = addDays(today, -7);
      fn = isStart ? startOfWeek : endOfWeek;
    } else if (ccc.includes(TextToken.NextWeek)) {
      stdDate = addDays(today, 7);
      fn = isStart ? startOfWeek : endOfWeek;
    } else if (ccc.includes(TextToken.ThisMonth)) {
      stdDate = today;
      fn = isStart ? startOfMonth : endOfMonth;
    } else if (ccc.includes(TextToken.LastMonth)) {
      stdDate = addMonths(today, -1);
      fn = isStart ? startOfMonth : endOfMonth;
    } else if (ccc.includes(TextToken.NextMonth)) {
      stdDate = addMonths(today, 1);
      fn = isStart ? startOfMonth : endOfMonth;
    } else if (ccc.includes(TextToken.ThisYear)) {
      stdDate = today;
      fn = isStart ? startOfYear : endOfYear;
    } else if (ccc.includes(TextToken.LastYear)) {
      stdDate = addYears(today, -1);
      fn = isStart ? startOfYear : endOfYear;
    } else if (ccc.includes(TextToken.NextYear)) {
      stdDate = addYears(today, 1);
      fn = isStart ? startOfYear : endOfYear;
    } else if (ccc.includes(TextToken.ThisQuarter)) {
      stdDate = today;
      fn = isStart ? startOfQuarter : endOfQuarter;
    } else if (ccc.includes(TextToken.LastQuarter)) {
      stdDate = addQuarters(today, -1);
      fn = isStart ? startOfQuarter : endOfQuarter;
    } else if (ccc.includes(TextToken.NextQuarter)) {
      stdDate = addQuarters(today, 1);
      fn = isStart ? startOfQuarter : endOfQuarter;
    }

    if (fn) {
      return fn(stdDate);
    }
    // }

    // if (ccc.includes(TextToken.StartOf)) {
    //   if (ccc.includes(TextToken.ThisWeek)) {
    //     return startOfWeek(today);
    //   } else if (ccc.includes(TextToken.LastWeek)) {
    //     return startOfWeek(addDays(today, -7));
    //   } else if (ccc.includes(TextToken.NextWeek)) {
    //     return startOfWeek(addDays(today, 7));
    //   } else if (ccc.includes(TextToken.ThisMonth)) {
    //     return startOfMonth(today);
    //   } else if (ccc.includes(TextToken.LastMonth)) {
    //     return startOfMonth(addMonths(today, -1));
    //   } else if (ccc.includes(TextToken.NextMonth)) {
    //     return startOfMonth(addMonths(today, 1));
    //   }
    // } else if (ccc.includes(TextToken.EndOf)) {
    //   if (ccc.includes(TextToken.ThisWeek)) {
    //     return endOfWeek(today);
    //   } else if (ccc.includes(TextToken.LastWeek)) {
    //     return endOfWeek(addDays(today, -7));
    //   } else if (ccc.includes(TextToken.NextWeek)) {
    //     return endOfWeek(addDays(today, 7));
    //   }
  } else {
    // const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    const aaa = ccc.find((e) => daysInWeek.includes(e));
    const dayofw = aaa ? daysInWeek.indexOf(aaa) : -1;
    // console.log(ccc, dayofw);

    // if (dayofw_) {

    // }

    if (dayofw !== -1) {
      let week = new Date();
      if (ccc.includes('last')) {
        week = addDays(week, -7);
      } else if (ccc.includes('next')) {
        week = addDays(week, 7);
      }
      return startOfDay(setDay(week, dayofw));
    }

    // if (ccc.includes('this')) {
    // }
  }

  // source.

  // source.match()

  return null;
};

const isValidDate = (date: Date) => !Number.isNaN(date.getTime());

// 37라 7818
