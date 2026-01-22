import type { BetType } from '../types/exercise.types';

// Payout multipliers for each bet type
export const BET_PAYOUTS: Record<BetType, number> = {
  STRAIGHT: 35,
  SPLIT: 17,
  CORNER: 8,
  STREET: 11,
  SIX_LINE: 5,
} as const;
