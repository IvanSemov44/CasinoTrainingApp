import { BetType, RouletteNumber } from '../types/roulette.types';
import { PAYOUT_RATIOS } from '../constants/roulette.constants';

/**
 * Calculate the payout for a bet
 */
export const calculatePayout = (betType: BetType, betAmount: number): number => {
  const ratio = PAYOUT_RATIOS[betType];
  return betAmount * ratio + betAmount; // Return includes original bet
};

/**
 * Calculate total payout for winning number
 */
export const calculateTotalPayout = (
  winningNumber: RouletteNumber,
  placedBets: Array<{ type: BetType; numbers: RouletteNumber[]; amount: number }>
): number => {
  let totalPayout = 0;

  placedBets.forEach((bet) => {
    if (bet.numbers.includes(winningNumber)) {
      totalPayout += calculatePayout(bet.type, bet.amount);
    }
  });

  return totalPayout;
};

/**
 * Validate if bet placement is correct
 */
export const validateBetPlacement = (
  betType: BetType,
  numbers: RouletteNumber[]
): boolean => {
  switch (betType) {
    case BetType.STRAIGHT:
      return numbers.length === 1;
    case BetType.SPLIT:
      return numbers.length === 2;
    case BetType.STREET:
      return numbers.length === 3;
    case BetType.CORNER:
      return numbers.length === 4;
    case BetType.LINE:
      return numbers.length === 6;
    case BetType.DOZEN:
    case BetType.COLUMN:
      return numbers.length === 12;
    case BetType.RED_BLACK:
    case BetType.EVEN_ODD:
    case BetType.HIGH_LOW:
      return numbers.length === 18;
    default:
      return true;
  }
};

/**
 * Generate a random roulette number
 */
export const generateRandomNumber = (): RouletteNumber => {
  return Math.floor(Math.random() * 37) as RouletteNumber;
};

/**
 * Format time in MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate score percentage
 */
export const calculateScorePercentage = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
};
