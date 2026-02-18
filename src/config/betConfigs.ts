import { RouletteNumber } from '../types/roulette.types';
import { ALL_CORNERS, ALL_STREETS, ALL_SIX_LINES } from '../features/roulette-training/constants/betCombinations';

export interface BetConfig {
  type: string;
  name: string;
  displayName: string;
  payout: number;
  description: string;
  hintText: string;
  exampleChips: number;
  generatePossibleBets: () => RouletteNumber[][];
  formatNumbers: (numbers: RouletteNumber[]) => string;
}

export const BET_CONFIGS: Record<string, BetConfig> = {
  STRAIGHT_UP: {
    type: 'STRAIGHT',
    name: 'Straight Up',
    displayName: 'Straight Up',
    payout: 35,
    description: 'Single number bet',
    hintText: '• A straight-up bet pays 35:1\n• Payout = chips × 35 (winnings only)\n• Example: 3 chips → 3 × 35 = 105',
    exampleChips: 3,
    generatePossibleBets: () => {
      // Numbers 0-12
      return Array.from({ length: 13 }, (_, i) => [i as RouletteNumber]);
    },
    formatNumbers: (numbers) => `${numbers[0]}`,
  },
  
  SPLIT: {
    type: 'SPLIT',
    name: 'Split',
    displayName: 'Split',
    payout: 17,
    description: '2 adjacent numbers',
    hintText: '• A split bet covers 2 adjacent numbers\n• Split bet pays 17:1\n• Payout = chips × 17 (winnings only)\n• Example: 3 chips → 3 × 17 = 51',
    exampleChips: 3,
    generatePossibleBets: () => {
      const possibleSplits: RouletteNumber[][] = [];
      
      // Vertical splits (same column): 1-2, 2-3, 4-5, etc.
      for (let i = 1; i <= 11; i++) {
        if (i % 3 !== 0) {
          possibleSplits.push([i as RouletteNumber, (i + 1) as RouletteNumber]);
        }
      }
      
      // Horizontal splits (same row): 1-4, 2-5, 3-6, etc.
      for (let i = 1; i <= 9; i++) {
        possibleSplits.push([i as RouletteNumber, (i + 3) as RouletteNumber]);
      }
      
      // Splits with 0
      possibleSplits.push([0, 1]);
      possibleSplits.push([0, 2]);
      possibleSplits.push([0, 3]);
      
      return possibleSplits;
    },
    formatNumbers: (numbers) => `${numbers[0]}-${numbers[1]}`,
  },
  
  STREET: {
    type: 'STREET',
    name: 'Street',
    displayName: 'Street',
    payout: 11,
    description: '3 numbers in a row',
    hintText: '• A street bet covers 3 numbers in a row\n• Street bet pays 11:1\n• Payout = chips × 11 (winnings only)\n• Example: 4 chips → 4 × 11 = 44',
    exampleChips: 4,
    generatePossibleBets: () => {
      return ALL_STREETS;
    },
    formatNumbers: (numbers) => `${numbers[0]}-${numbers[1]}-${numbers[2]}`,
  },
  
  CORNER: {
    type: 'CORNER',
    name: 'Corner',
    displayName: 'Corner',
    payout: 8,
    description: '4 numbers forming a square',
    hintText: '• A corner bet covers 4 numbers forming a square\n• Corner bet pays 8:1\n• Payout = chips × 8 (winnings only)\n• Example: 5 chips → 5 × 8 = 40',
    exampleChips: 5,
    generatePossibleBets: () => {
      return ALL_CORNERS;
    },
    formatNumbers: (numbers) => `${numbers[0]}-${numbers[1]}-${numbers[2]}-${numbers[3]}`,
  },
  
  SIX_LINE: {
    type: 'LINE',
    name: 'Six Line',
    displayName: 'Six Line',
    payout: 5,
    description: '6 numbers (double street)',
    hintText: '• A six line bet covers 6 numbers (two adjacent streets)\n• Six line bet pays 5:1\n• Payout = chips × 5 (winnings only)\n• Example: 4 chips → 4 × 5 = 20',
    exampleChips: 4,
    generatePossibleBets: () => {
      return ALL_SIX_LINES;
    },
    formatNumbers: (numbers) => `${numbers[0]}-${numbers[1]}-${numbers[2]}-${numbers[3]}-${numbers[4]}-${numbers[5]}`,
  },
};

export type BetConfigKey = keyof typeof BET_CONFIGS;

export function getBetConfig(key: BetConfigKey): BetConfig {
  return BET_CONFIGS[key];
}
