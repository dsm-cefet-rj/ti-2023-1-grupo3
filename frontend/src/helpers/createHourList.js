import { eachHourOfInterval, endOfToday, format, startOfToday } from "date-fns";

export const createHourList = (hiddenHours) => {
  let result;

  const start = startOfToday();
  const end = endOfToday();

  const hourList = eachHourOfInterval({
    start: start,
    end: end,
  });

  result = hourList.map((hour) => format(hour, "HH:mm"));

  if (hiddenHours && hiddenHours.length > 0)
    result = result.filter((hour) => !hiddenHours.includes(hour));

  return result;
};
