/**
 * Unified sector constants for roulette-based games.
 * These constants define the actual roulette wheel sectors and their numbers.
 * 
 * Note: Cash conversion training uses a simplified "positions" concept that
 * differs from actual number counts. See cash-conversion-training/constants/sectors.ts
 * for training-specific position counts.
 */

// Sector types (excludes 'random' which is a training selection option)
export type SectorKey = 'tier' | 'orphelins' | 'voisins' | 'zero' | 'neighbors';

// Sector configuration interface
export interface SectorConfig {
  /** Sector identifier */
  key: SectorKey;
  /** Display name */
  name: string;
  /** Emoji icon for UI */
  icon: string;
  /** Numbers included in this sector */
  numbers: readonly number[];
}

// Individual sector number definitions (source of truth for roulette wheel)
export const SECTOR_NUMBERS = {
  /** Tiers du Cylindre - 12 numbers on the opposite side of zero */
  tier: [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33] as const,
  /** Orphelins - 8 numbers split into two groups */
  orphelins: [1, 20, 14, 31, 9, 17, 34, 6] as const,
  /** Voisins du Zero - 17 numbers around zero */
  voisins: [22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25] as const,
  /** Zero Game - 7 numbers around zero (smaller version of voisins) */
  zero: [12, 35, 3, 26, 0, 32, 15] as const,
  /** Neighbors - 5 numbers (1 number + 2 neighbors on each side) - calculated dynamically */
  neighbors: [] as const,
} as const;

// Full sector configurations for UI display
export const SECTOR_CONFIGS: Record<SectorKey, Omit<SectorConfig, 'key'>> = {
  tier: {
    name: 'Tier',
    icon: '🎯',
    numbers: SECTOR_NUMBERS.tier,
  },
  orphelins: {
    name: 'Orphelins',
    icon: '🎪',
    numbers: SECTOR_NUMBERS.orphelins,
  },
  voisins: {
    name: 'Voisins',
    icon: '🎭',
    numbers: SECTOR_NUMBERS.voisins,
  },
  zero: {
    name: 'Zero',
    icon: '⭕',
    numbers: SECTOR_NUMBERS.zero,
  },
  neighbors: {
    name: 'Neighbors',
    icon: '👥',
    numbers: SECTOR_NUMBERS.neighbors,
  },
};

// Sector names for quick lookup
export const SECTOR_NAMES: Record<SectorKey, string> = {
  tier: 'Tier',
  orphelins: 'Orphelins',
  voisins: 'Voisins',
  zero: 'Zero',
  neighbors: 'Neighbors',
};

// Sector icons for quick lookup
export const SECTOR_ICONS: Record<SectorKey, string> = {
  tier: '🎯',
  orphelins: '🎪',
  voisins: '🎭',
  zero: '⭕',
  neighbors: '👥',
};

/**
 * Get sector configuration as an array for dropdowns
 */
export function getSectorOptions(): SectorConfig[] {
  return Object.entries(SECTOR_CONFIGS).map(([key, config]) => ({
    key: key as SectorKey,
    ...config,
  }));
}

/**
 * Get a sector's configuration by key
 */
export function getSectorConfig(key: SectorKey): SectorConfig {
  return {
    key,
    ...SECTOR_CONFIGS[key],
  };
}

/**
 * Get the numbers for a specific sector
 */
export function getSectorNumbers(key: SectorKey): readonly number[] {
  return SECTOR_NUMBERS[key];
}
