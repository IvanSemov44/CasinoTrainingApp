/**
 * Racetrack Sector Validation Utilities
 */

import { getRandomElement } from '@utils/randomUtils';
import { SectorType, SectorValidationResult, SectorMode } from '../types';

// Sector number mappings - strict non-overlapping definitions
// Priority order: zero > tier > orphelins > voisins
export const SECTOR_NUMBERS: Record<SectorType, number[]> = {
  // Jeu Zéro (Zero Game): 0, 3, 12, 15, 26, 32, 35 - HIGHEST PRIORITY
  zero: [0, 3, 12, 15, 26, 32, 35],
  // Tier du Cylindre: 5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36
  tier: [5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36],
  // Orphelins: 1, 6, 9, 14, 17, 20, 31, 34
  orphelins: [1, 6, 9, 14, 17, 20, 31, 34],
  // Voisins du Zéro: only numbers NOT in Zero/Tier/Orphelins
  // 2, 4, 7, 18, 19, 21, 22, 25, 28, 29
  voisins: [2, 4, 7, 18, 19, 21, 22, 25, 28, 29],
};

// Priority order for sector lookup (highest to lowest)
const SECTOR_PRIORITY: SectorType[] = ['zero', 'tier', 'orphelins', 'voisins'];

// All roulette numbers that can appear (0-36)
export const ALL_ROULETTE_NUMBERS = Array.from({ length: 37 }, (_, i) => i);

/**
 * Get the primary sector for a given number using strict priority order.
 * Priority: Zero Game > Tier > Orphelins > Voisins
 * This ensures overlapping numbers (like 26) return the correct sector.
 */
export function getSectorForNumber(number: number): SectorType | null {
  // Check sectors in priority order
  for (const sector of SECTOR_PRIORITY) {
    if (SECTOR_NUMBERS[sector].includes(number)) {
      return sector;
    }
  }
  return null;
}

/**
 * Validate user's sector selection against the winning number
 * Special case: All Jeu Zéro numbers are part of Voisins du Zéro betting region
 */
export function validateSectorSelection(
  winningNumber: number,
  selectedSector: SectorType | null
): SectorValidationResult {
  const correctSector = getSectorForNumber(winningNumber);

  // Allow either 'zero' or 'voisins' for all zero sector numbers (0, 3, 12, 15, 26, 32, 35)
  const isCorrect = correctSector === 'zero'
    ? (selectedSector === 'zero' || selectedSector === 'voisins')
    : selectedSector === correctSector;

  return {
    isCorrect,
    correctSector: correctSector || 'voisins', // Fallback (should never happen)
    userSector: selectedSector,
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
 * Get a random sector mode (excluding 'random')
 */
export function getRandomSectorMode(): SectorType {
  const sectors: SectorType[] = ['tier', 'orphelins', 'voisins', 'zero'];
  return getRandomElement(sectors);
}

/**
 * Get display name for a sector
 */
export function getSectorDisplayName(sector: SectorType): string {
  const names: Record<SectorType, string> = {
    tier: 'Tier du Cylindre',
    orphelins: 'Orphelins',
    voisins: 'Voisins du Zéro',
    zero: 'Jeu Zéro',
  };
  return names[sector];
}

/**
 * Get all sector options with their numbers
 */
export function getSectorOptions() {
  return Object.entries(SECTOR_NUMBERS).map(([sector, numbers]) => ({
    sector: sector as SectorType,
    name: getSectorDisplayName(sector as SectorType),
    numbers,
  }));
}
