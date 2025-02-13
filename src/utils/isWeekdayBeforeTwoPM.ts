export const isWeekdayBeforeTwoPM = () => {
  const now = new Date();
  const day = now.getDay();
  const hours = now.getHours();

  return day >= 1 && day <= 5 && hours < 14;
}