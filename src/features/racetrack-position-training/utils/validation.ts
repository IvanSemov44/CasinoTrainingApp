/**
 * Racetrack Position Validation Utilities
 */

import { getRandomElement } from '@utils/randomUtils';
import { PositionValidationResult, WheelPosition } from '../types';

// European Roulette wheel order
const WHEEL_ORDER: number[] = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

// All roulette numbers that can appear (0-36)
export const ALL_ROULETTE_NUMBERS: number[] = Array.from({ length: 37 }, (_, i) => i);

/**
 * Get the wheel position (index in wheel order) for a given number
 */
export function getWheelPosition(number: number): number {
  return WHEEL_ORDER.indexOf(number);
}

/**
 * Get wheel position data for all numbers
 */
export function getWheelPositions(): WheelPosition[] {
  return WHEEL_ORDER.map((num: number, pos: number) => ({
    number: num,
    position: pos,
  }));
}

/**
 * Validate user's number selection against the winning number
 */
export function validatePositionSelection(
  winningNumber: number,
  selectedNumber: number | null
): PositionValidationResult {
  const isCorrect = selectedNumber === winningNumber;

  return {
    isCorrect,
    correctNumber: winningNumber,
    userNumber: selectedNumber,
    winningNumber,
    score: isCorrect ? 100 : 0,
  };
}

/**
 * Get a random winning number from all roulette numbers
 */
export function getRandomWinningNumber(): number {
  return getRandomElement(ALL_ROULETTE_NUMBERS);
}

/**
 * Get the position display name (e.g., "Position 5" or "Number 0")
 */
export function getPositionDisplayName(number: number): string {
  const position = getWheelPosition(number);
  return `Position ${position + 1} (Number ${number})`;
}

/**
 * Get a formatted string showing the wheel order around a number
 */
export function getWheelContext(number: number, contextSize: number = 3): string {
  const position = getWheelPosition(number);
  const wheelLength = WHEEL_ORDER.length;
  const context: string[] = [];

  for (let i = -contextSize; i <= contextSize; i++) {
    const idx = (position + i + wheelLength) % wheelLength;
    const num = WHEEL_ORDER[idx];
    if (i === 0) {
      context.push(`[${num}]`);
    } else {
      context.push(num.toString());
    }
  }

  return context.join(' ← ');
}

/**
 * Get the wheel order array for reference
 */
export function getWheelOrder(): number[] {
  return [...WHEEL_ORDER];
}
