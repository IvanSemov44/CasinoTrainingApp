import { BetType } from '../../../types/roulette.types';

// Payout ratios for each bet type
export const PAYOUTS: Record<BetType, number> = {
  [BetType.STRAIGHT]: 35,
  [BetType.SPLIT]: 17,
  [BetType.STREET]: 11,
  [BetType.CORNER]: 8,
  [BetType.LINE]: 5,
  [BetType.COLUMN]: 2,
  [BetType.DOZEN]: 2,
  [BetType.RED_BLACK]: 1,
  [BetType.EVEN_ODD]: 1,
  [BetType.HIGH_LOW]: 1,
  [BetType.VOISINS]: 1,
  [BetType.TIERS]: 1,
  [BetType.ORPHELINS]: 1,
  [BetType.ZERO_GAME]: 1,
  [BetType.NEIGHBOR]: 1,
};

// Announced bet definitions
export interface AnnouncedBetDefinition {
  name: string;
  bets: Array<{
    type: BetType;
    numbers: number[];
    multiplier?: number; // For double positions (default: 1)
  }>;
}

export const ANNOUNCED_BETS: Record<string, AnnouncedBetDefinition> = {
  tier: {
    name: 'Tier du Cylindre',
    bets: [
      { type: BetType.SPLIT, numbers: [5, 8] },
      { type: BetType.SPLIT, numbers: [10, 11] },
      { type: BetType.SPLIT, numbers: [13, 16] },
      { type: BetType.SPLIT, numbers: [23, 24] },
      { type: BetType.SPLIT, numbers: [27, 30] },
      { type: BetType.SPLIT, numbers: [33, 36] },
    ],
  },
  orphelins: {
    name: 'Orphelins',
    bets: [
      { type: BetType.STRAIGHT, numbers: [1] },
      { type: BetType.SPLIT, numbers: [6, 9] },
      { type: BetType.SPLIT, numbers: [14, 17] },
      { type: BetType.SPLIT, numbers: [17, 20] },
      { type: BetType.SPLIT, numbers: [31, 34] },
    ],
  },
  zero: {
    name: 'Jeu Zéro',
    bets: [
      { type: BetType.STRAIGHT, numbers: [26] },
      { type: BetType.SPLIT, numbers: [0, 3] },
      { type: BetType.SPLIT, numbers: [12, 15] },
      { type: BetType.SPLIT, numbers: [32, 35] },
    ],
  },
  voisins: {
    name: 'Voisins du Zéro',
    bets: [
      { type: BetType.STREET, numbers: [0, 2, 3], multiplier: 2 },
      { type: BetType.SPLIT, numbers: [4, 7] },
      { type: BetType.SPLIT, numbers: [12, 15] },
      { type: BetType.SPLIT, numbers: [18, 21] },
      { type: BetType.SPLIT, numbers: [19, 22] },
      { type: BetType.SPLIT, numbers: [32, 35] },
      { type: BetType.CORNER, numbers: [25, 26, 28, 29], multiplier: 2 },
    ],
  },
};
