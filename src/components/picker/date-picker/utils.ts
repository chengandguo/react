export function isLeapYear(year: number) {
  if ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0) {
    return true;
  }
  return false;
}

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// 1 => 01
function addZeroPrefix(num: number) {
  if (num > 0 && num < 10) {
    return `0${num}`;
  }
  return num;
}

export function getYearList(minDate: Date, maxDate: Date) {
  const minFullYear = minDate.getFullYear();
  const maxFullYear = maxDate.getFullYear();
  const list = [];
  for (let i = minFullYear; i <= maxFullYear; ++i) {
    list.push({ label: i, value: i });
  }
  return list;
}

export function getMonthList() {
  const list = [];
  for (let i = 0; i < MONTHS.length; ++i) {
    list.push({
      label: addZeroPrefix(MONTHS[i]),
      value: MONTHS[i],
    });
  }
  return list;
}

export function getDayList(year: number, month: number) {
  let count = 30;
  const isLeap = isLeapYear(year);
  if (month === 2) {
    count = isLeap ? 29 : 28;
  }
  const month_31 = [1, 3, 5, 7, 8, 10, 12];
  if (month_31.includes(month)) {
    count = 31;
  }
  const result = [];
  for (let i = 0; i < count; ++i) {
    result.push({
      label: addZeroPrefix(i + 1),
      value: i + 1,
    });
  }
  return result;
}
