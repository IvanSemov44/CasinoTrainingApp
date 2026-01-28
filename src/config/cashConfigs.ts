export interface CashConfig {
  denomination: number; // Chip value in dollars
  cashIncrement: number; // Cash increment step
  displayName: string;
  description: string;
  getCashOptions: (totalCash: number) => number[];
}

/**
 * Generate cash options based on increment starting from specified value
 */
function generateCashOptions(totalCash: number, startValue: number, increment: number): number[] {
  const options: number[] = [];
  for (let cash = startValue; cash < totalCash; cash += increment) {
    options.push(cash);
  }
  return options;
}

/**
 * Generate specific cash options for low-value chips ($1)
 */
function generateLowValueCashOptions(totalCash: number): number[] {
  return [25, 50, 75].filter(cash => cash < totalCash);
}

export const CASH_CONFIGS = {
  ONE_DOLLAR: {
    denomination: 1,
    cashIncrement: 25,
    displayName: 'Cash Handling - $1',
    description: 'Cash handling with $1 chips. Cash requests: 25, 50, or 75.',
    getCashOptions: generateLowValueCashOptions,
  } as CashConfig,

  TWO_DOLLAR: {
    denomination: 2,
    cashIncrement: 50,
    displayName: 'Cash Handling - $2',
    description: 'Cash handling with $2 chips. Cash requests by $50 increments.',
    getCashOptions: (totalCash: number) => generateCashOptions(totalCash, 50, 50),
  } as CashConfig,

  FIVE_DOLLAR: {
    denomination: 5,
    cashIncrement: 100,
    displayName: 'Cash Handling - $5',
    description: 'Cash handling with $5 chips. Cash requests by $100 increments.',
    getCashOptions: (totalCash: number) => generateCashOptions(totalCash, 100, 100),
  } as CashConfig,

  TEN_DOLLAR: {
    denomination: 10,
    cashIncrement: 100,
    displayName: 'Cash Handling - $10',
    description: 'Cash handling with $10 chips. Cash requests by $100 increments.',
    getCashOptions: (totalCash: number) => generateCashOptions(totalCash, 100, 100),
  } as CashConfig,

  TWENTY_FIVE_DOLLAR: {
    denomination: 25,
    cashIncrement: 500,
    displayName: 'Cash Handling - $25',
    description: 'Cash handling with $25 chips. Cash requests by $500 increments.',
    getCashOptions: (totalCash: number) => generateCashOptions(totalCash, 500, 500),
  } as CashConfig,

  ONE_HUNDRED_DOLLAR: {
    denomination: 100,
    cashIncrement: 500,
    displayName: 'Cash Handling - $100',
    description: 'Cash handling with $100 chips. Cash requests by $500 increments.',
    getCashOptions: (totalCash: number) => generateCashOptions(totalCash, 500, 500),
  } as CashConfig,
};

export type CashConfigKey = keyof typeof CASH_CONFIGS;

export function getCashConfig(key: CashConfigKey): CashConfig {
  return CASH_CONFIGS[key];
}
