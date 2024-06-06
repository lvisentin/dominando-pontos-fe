export function convertDateWithHours(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedHour = hour < 10 ? '0' + hour : hour;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${formattedDay}/${formattedMonth} - ${formattedHour}:${formattedMinutes}`;
}