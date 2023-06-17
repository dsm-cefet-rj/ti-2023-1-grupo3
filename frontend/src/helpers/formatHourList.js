import { format, isSameDay } from "date-fns";

export const formatHourList = (hours, day) => {
  const formmatedList = hours.map((hour) => new Date(hour));
  const filteredList = formmatedList.filter((item) =>
    isSameDay(new Date(day), item)
  );

  return filteredList.map((item) => format(item, "HH:mm"));
};
