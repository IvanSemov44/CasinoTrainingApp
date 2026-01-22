import type { RouletteNumber } from '@app-types/roulette.types';

export type BetType = 'STRAIGHT' | 'SPLIT' | 'CORNER' | 'STREET' | 'SIX_LINE';

export interface Bet {
  type: BetType;
  numbers: RouletteNumber[];
  chips: number;
  payout: number;
}
