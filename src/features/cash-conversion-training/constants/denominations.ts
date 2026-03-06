/**
 * Casino chip denominations and their colors
 * Organized for cash conversion training
 */

export const CHIP_DENOMINATIONS = [
  { value: 1000, color: '#FFD700' },  // Gold
  { value: 500, color: '#9370DB' },   // Purple
  { value: 100, color: '#000000' },   // Black
  { value: 25, color: '#228B22' },    // Forest Green
] as const;

export type ChipDenomination = (typeof CHIP_DENOMINATIONS)[number];
