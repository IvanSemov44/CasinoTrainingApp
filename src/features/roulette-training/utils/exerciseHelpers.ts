import type { RouletteNumber } from '@app-types/roulette.types';
import type { BetType, Bet } from '../types/exercise.types';
import { BET_TYPE_METADATA } from '../constants/payouts';
import { ALL_CORNERS, ALL_STREETS, ALL_SIX_LINES, ZERO_SPLITS } from '../constants/betCombinations';

export function getBetTypeName(type: BetType): string {
  return BET_TYPE_METADATA[type].name;
}

export function getBetPayout(type: BetType): number {
  return BET_TYPE_METADATA[type].payout;
}

// Get all valid splits for a number
export function getSplitsForNumber(num: RouletteNumber): [RouletteNumber, RouletteNumber][] {
  const splits: [RouletteNumber, RouletteNumber][] = [];

  if (num === 0) {
    return ZERO_SPLITS;
  }

  // Vertical splits (consecutive numbers in same column)
  if (num > 0 && num < 12) {
    if (num % 3 !== 0) splits.push([num, (num + 1) as RouletteNumber]);
    if (num % 3 !== 1) splits.push([(num - 1) as RouletteNumber, num]);
  }

  // Horizontal splits (same row, different columns)
  if (num >= 4) splits.push([(num - 3) as RouletteNumber, num]);
  if (num <= 9) splits.push([num, (num + 3) as RouletteNumber]);

  return splits;
}

// Get all valid corners for a number
export function getCornersForNumber(num: RouletteNumber): RouletteNumber[][] {
  return ALL_CORNERS.filter(corner => corner.includes(num));
}

// Get all valid streets for a number
export function getStreetsForNumber(num: RouletteNumber): RouletteNumber[][] {
  return ALL_STREETS.filter(street => street.includes(num));
}

// Get all valid six lines for a number
export function getSixLinesForNumber(num: RouletteNumber): RouletteNumber[][] {
  return ALL_SIX_LINES.filter(sixLine => sixLine.includes(num));
}

export function formatBetNumbers(bet: Bet): string {
  return bet.type === 'STRAIGHT' ? `${bet.numbers[0]}` : bet.numbers.join('-');
}

export function generateBetExplanation(bets: Bet[]): string {
  const parts = bets.map(bet => {
    const numbersStr = formatBetNumbers(bet);
    return `${numbersStr} (${bet.chips} × ${bet.payout} = ${bet.chips * bet.payout})`;
  });
  
  const total = bets.reduce((sum, bet) => sum + (bet.chips * bet.payout), 0);
  return parts.join(' + ') + ` = ${total}`;
}

export function createMockBets(bets: Bet[]) {
  return bets.map((bet, index) => ({
    id: `bet-${index}`,
    type: bet.type as BetType,
    numbers: bet.numbers,
    amount: bet.chips,
    payout: bet.payout,
    timestamp: Date.now() + index,
  }));
}
