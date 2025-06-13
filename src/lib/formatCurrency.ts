export function formatCurrency(amount: number, currency: string = 'Rp') {
  return `${currency} ${amount.toLocaleString('id-ID')}`;
}