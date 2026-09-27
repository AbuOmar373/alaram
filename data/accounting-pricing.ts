// Shared by the accounting pricing page and the product catalog.
export const accountingPrices = {
  basic: 299,
  professional: 699,
  enterprise: 1999,
} as const;

export function annualAccountingPrice(monthlyPrice: number) {
  return Math.round(monthlyPrice * 12 * 0.8);
}
