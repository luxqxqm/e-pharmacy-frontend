function getSchedule(storeId: string) {
  let sum = 0;
  for (const char of storeId) sum += char.charCodeAt(0);

  return {
    openHour: 7 + (sum % 4),
    closeHour: 18 + (sum % 6),
    dayOff: sum % 7,
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
