// одне місце для формату ціни: якщо в макеті інша валюта — міняємо тут
export function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}
