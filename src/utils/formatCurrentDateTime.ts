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
