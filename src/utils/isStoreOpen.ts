// На бекенді поки нема графіка роботи аптек (openTime / closeTime).
// Щоб статуси були різні, кожній аптеці даємо свій графік, який залежить від її id:
// - відкривається з 7 до 10 години, закривається з 18 до 23 (за Києвом)
// - один вихідний день на тиждень
function getSchedule(storeId: string) {
  let sum = 0;
  for (const char of storeId) sum += char.charCodeAt(0);

  return {
    openHour: 7 + (sum % 4), // 7..10
    closeHour: 18 + (sum % 6), // 18..23
    dayOff: sum % 7, // 0 = неділя ... 6 = субота
  };
}

export function isStoreOpen(storeId: string, date = new Date()) {
  const kyivTime = new Date(
    date.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }),
  );
  const hour = kyivTime.getHours();
  const day = kyivTime.getDay();
  const { openHour, closeHour, dayOff } = getSchedule(storeId);

  if (day === dayOff) return false;
  return hour >= openHour && hour < closeHour;
}
