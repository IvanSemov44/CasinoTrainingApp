import type { RouletteNumber } from '@app-types/roulette.types';

/**
 * All valid corner bet combinations (4 numbers forming a square)
 */
export const ALL_CORNERS: RouletteNumber[][] = [
  [0, 1, 2, 3],
  [1, 2, 4, 5],
  [2, 3, 5, 6],
  [4, 5, 7, 8],
  [5, 6, 8, 9],
  [7, 8, 10, 11],
  [8, 9, 11, 12],
];

/**
 * All valid street bet combinations (3 numbers in a row)
 */
export const ALL_STREETS: RouletteNumber[][] = [
  [0, 1, 2],
  [0, 2, 3],
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
];

/**
 * All valid six line bet combinations (6 numbers in two rows)
 */
export const ALL_SIX_LINES: RouletteNumber[][] = [
  [1, 2, 3, 4, 5, 6],
  [4, 5, 6, 7, 8, 9],
  [7, 8, 9, 10, 11, 12],
];

/**
 * All valid split bet combinations with zero
 */
export const ZERO_SPLITS: [RouletteNumber, RouletteNumber][] = [
  [0, 1],
  [0, 2],
  [0, 3],
];
