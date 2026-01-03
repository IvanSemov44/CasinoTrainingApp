import { RouletteNumber, ChipValue, BetType } from '../types/roulette.types';

// European Roulette wheel order
export const WHEEL_ORDER: RouletteNumber[] = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
  5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

// Red numbers in European Roulette
export const RED_NUMBERS: RouletteNumber[] = [
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
];

// Black numbers in European Roulette
export const BLACK_NUMBERS: RouletteNumber[] = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35
];

// Layout grid - 3 columns x 12 rows (reading from bottom to top)
export const LAYOUT_GRID: RouletteNumber[][] = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],  // Top row
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],  // Middle row
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],  // Bottom row
];

// Payout ratios for each bet type
export const PAYOUT_RATIOS: Record<BetType, number> = {
  [BetType.STRAIGHT]: 35,
  [BetType.SPLIT]: 17,
  [BetType.STREET]: 11,
  [BetType.CORNER]: 8,
  [BetType.LINE]: 5,
  [BetType.DOZEN]: 2,
  [BetType.COLUMN]: 2,
  [BetType.RED_BLACK]: 1,
  [BetType.EVEN_ODD]: 1,
  [BetType.HIGH_LOW]: 1,
  [BetType.VOISINS]: 0, // Complex bet, varies
  [BetType.TIERS]: 0,   // Complex bet, varies
  [BetType.ORPHELINS]: 0, // Complex bet, varies
  [BetType.ZERO_GAME]: 0, // Complex bet, varies
  [BetType.NEIGHBOR]: 35, // Straight up on each
};

// Voisins du Zero (Neighbors of Zero) - 17 numbers
export const VOISINS_NUMBERS: RouletteNumber[] = [
  22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25
];

// Tiers du Cylindre (Third of the Wheel) - 12 numbers
export const TIERS_NUMBERS: RouletteNumber[] = [
  27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33
];

// Orphelins (Orphans) - 8 numbers
export const ORPHELINS_NUMBERS: RouletteNumber[] = [
  1, 20, 14, 31, 9, 17, 34, 6
];

// Zero Game - 7 numbers
export const ZERO_GAME_NUMBERS: RouletteNumber[] = [
  12, 35, 3, 26, 0, 32, 15
];

// Chip denominations
export const CHIP_VALUES: ChipValue[] = [
  { value: 1, color: '#FFFFFF' },      // White
  { value: 5, color: '#FF0000' },      // Red
  { value: 10, color: '#0000FF' },     // Blue
  { value: 25, color: '#00FF00' },     // Green
  { value: 100, color: '#000000' },    // Black
  { value: 500, color: '#800080' },    // Purple
  { value: 1000, color: '#FFA500' },   // Orange
];

// Helper function to get neighbors of a number on the wheel
export const getNeighbors = (number: RouletteNumber, count: number = 2): RouletteNumber[] => {
  const index = WHEEL_ORDER.indexOf(number);
  const neighbors: RouletteNumber[] = [number];
  
  for (let i = 1; i <= count; i++) {
    const leftIndex = (index - i + WHEEL_ORDER.length) % WHEEL_ORDER.length;
    const rightIndex = (index + i) % WHEEL_ORDER.length;
    neighbors.unshift(WHEEL_ORDER[leftIndex]);
    neighbors.push(WHEEL_ORDER[rightIndex]);
  }
  
  return neighbors;
};

// Helper function to determine if a number is red or black
export const getNumberColor = (number: RouletteNumber): 'red' | 'black' | 'green' => {
  if (number === 0) return 'green';
  if (RED_NUMBERS.includes(number)) return 'red';
  return 'black';
};

// Dozens
export const DOZEN_1: RouletteNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const DOZEN_2: RouletteNumber[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const DOZEN_3: RouletteNumber[] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
