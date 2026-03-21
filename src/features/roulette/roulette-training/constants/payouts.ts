import type { BetType } from '../types/exercise.types';
import { BetType as RouletteBetType } from '@app-types/roulette.types';

// Bet type metadata - single source of truth
export interface BetTypeMetadata {
  name: string;
  payout: number;
  enumValue?: RouletteBetType;
}

// Comprehensive bet type metadata for exercise types
export const BET_TYPE_METADATA: Record<BetType, BetTypeMetadata> = {
  STRAIGHT: {
    name: 'Straight',
    payout: 35,
    enumValue: RouletteBetType.STRAIGHT,
  },
  SPLIT: {
    name: 'Split',
    payout: 17,
    enumValue: RouletteBetType.SPLIT,
  },
  CORNER: {
    name: 'Corner',
    payout: 8,
    enumValue: RouletteBetType.CORNER,
  },
  STREET: {
    name: 'Street',
    payout: 11,
    enumValue: RouletteBetType.STREET,
  },
  LINE: {
    name: 'Six Line',
    payout: 5,
    enumValue: RouletteBetType.LINE,
  },
} as const;

// Payout multipliers for each bet type (legacy - use BET_TYPE_METADATA instead)
export const BET_PAYOUTS: Record<BetType, number> = {
  STRAIGHT: BET_TYPE_METADATA.STRAIGHT.payout,
  SPLIT: BET_TYPE_METADATA.SPLIT.payout,
  CORNER: BET_TYPE_METADATA.CORNER.payout,
  STREET: BET_TYPE_METADATA.STREET.payout,
  LINE: BET_TYPE_METADATA.LINE.payout,
} as const;

// Payout lookup for RouletteBetType enum (for layout screens)
export const ROULETTE_BET_PAYOUTS: Record<RouletteBetType, number> = {
  [RouletteBetType.STRAIGHT]: 35,
  [RouletteBetType.SPLIT]: 17,
  [RouletteBetType.STREET]: 11,
  [RouletteBetType.CORNER]: 8,
  [RouletteBetType.LINE]: 5,
  [RouletteBetType.DOZEN]: 2,
  [RouletteBetType.COLUMN]: 2,
  [RouletteBetType.RED_BLACK]: 1,
  [RouletteBetType.EVEN_ODD]: 1,
  [RouletteBetType.HIGH_LOW]: 1,
  [RouletteBetType.VOISINS]: 0,
  [RouletteBetType.TIERS]: 0,
  [RouletteBetType.ORPHELINS]: 0,
  [RouletteBetType.ZERO_GAME]: 0,
  [RouletteBetType.NEIGHBOR]: 0,
} as const;

// Helper function to get payout by RouletteBetType enum
export function getPayoutForBetType(betType: RouletteBetType): number {
  return ROULETTE_BET_PAYOUTS[betType];
}
