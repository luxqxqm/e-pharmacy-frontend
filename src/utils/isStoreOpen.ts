// На бекенді поки нема графіка роботи аптек,
// тому вважаємо, що всі працюють з 8:00 до 22:00 за Києвом
const OPEN_HOUR = 8;
const CLOSE_HOUR = 22;

export function isStoreOpen(date = new Date()) {
  const hour = Number(
    date.toLocaleString('en-US', {
      timeZone: 'Europe/Kyiv',
      hour: 'numeric',
      hour12: false,
    }),
  );

  return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}
