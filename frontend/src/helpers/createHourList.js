import {
  addHours,
  eachHourOfInterval,
  endOfToday,
  format,
  startOfToday,
  subHours,
} from "date-fns";

export const createHourList = (hiddenHours, startTime, endTime) => {
  let result;

  const start = startTime || addHours(startOfToday(), 9);
  const end = endTime || subHours(endOfToday(), 6);

  const hourList = eachHourOfInterval({
    start: start,
    end: end,
  });

  result = hourList.map((hour) => format(hour, "HH:mm"));

  if (hiddenHours && hiddenHours.length > 0)
    result = result.filter((hour) => !hiddenHours.includes(hour));

  return result;
};
