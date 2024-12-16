export function formatTimeToCounter(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formatedHours = hours >= 10 ? hours : `0${hours}`;
  const formatedMinutes = minutes >= 10 ? minutes : `0${minutes}`;
  const formatedSeconds =
    remainingSeconds >= 10 ? remainingSeconds : `0${remainingSeconds}`;

  return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
}

export function formatDateToDMY(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based in JavaScript/TypeScript
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

export function getSecondsBetweenDates(date1: Date, date2: Date): number {
  const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());


  return Math.round(differenceInMilliseconds / 1000);
}

export function formatTimeFromDate(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
