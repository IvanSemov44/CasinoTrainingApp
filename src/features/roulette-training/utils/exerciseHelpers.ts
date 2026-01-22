import type { RouletteNumber } from '@app-types/roulette.types';
import type { BetType, Bet } from '../types/exercise.types';
import { BET_PAYOUTS } from '../constants/payouts';

export function getBetTypeName(type: BetType): string {
  switch (type) {
    case 'STRAIGHT': return 'Straight';
    case 'SPLIT': return 'Split';
    case 'CORNER': return 'Corner';
    case 'STREET': return 'Street';
    case 'SIX_LINE': return 'Six Line';
  }
}

export function getBetPayout(type: BetType): number {
  return BET_PAYOUTS[type];
}

// Get all valid splits for a number
export function getSplitsForNumber(num: RouletteNumber): [RouletteNumber, RouletteNumber][] {
  const splits: [RouletteNumber, RouletteNumber][] = [];

  if (num === 0) {
    return [[0, 1], [0, 2], [0, 3]];
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
  const allCorners: RouletteNumber[][] = [
    [0, 1, 2, 3],
    [1, 2, 4, 5],
    [2, 3, 5, 6],
    [4, 5, 7, 8],
    [5, 6, 8, 9],
    [7, 8, 10, 11],
    [8, 9, 11, 12],
  ];

  return allCorners.filter(corner => corner.includes(num));
}

// Get all valid streets for a number
export function getStreetsForNumber(num: RouletteNumber): RouletteNumber[][] {
  const allStreets: RouletteNumber[][] = [
    [0, 1, 2],
    [0, 2, 3],
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
  ];

  return allStreets.filter(street => street.includes(num));
}

// Get all valid six lines for a number
export function getSixLinesForNumber(num: RouletteNumber): RouletteNumber[][] {
  const allSixLines: RouletteNumber[][] = [
    [1, 2, 3, 4, 5, 6],
    [4, 5, 6, 7, 8, 9],
    [7, 8, 9, 10, 11, 12],
  ];

  return allSixLines.filter(sixLine => sixLine.includes(num));
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
    type: bet.type as any,
    numbers: bet.numbers,
    amount: bet.chips,
    payout: bet.payout,
    timestamp: Date.now() + index,
  }));
}
