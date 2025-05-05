import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
export function formatCurrentDateTime() {
  const date = new Date();
  const [month, day, year, hours, minutes] = [
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
    date.getFullYear(),
    date.getHours().toString().padStart(2, "0"),
    date.getMinutes().toString().padStart(2, "0"),
  ];
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function parseDateTimeString(dateTime: string) {
  const [datePart, timePart] = dateTime.split("T");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");

  return {
    year,
    month,
    day,
    hours,
    minutes,
  };
}

export function getDateDiffInDays(base: string, target: string) {
  const dayDiff = dayjs.utc(target).diff(dayjs.utc(base), "day");
  console.log(target, base);
  console.log(dayDiff);

  return dayDiff;
}
