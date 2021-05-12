export const localizeCurrency = (number, currency) => {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }).format(number)
}