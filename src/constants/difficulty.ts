/**
 * Unified difficulty constants for training modules.
 * These constants define difficulty levels and their associated parameters.
 */

// Difficulty level type
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Difficulty configuration interface
export interface DifficultyConfig {
  /** Difficulty identifier */
  key: DifficultyLevel;
  /** Display name */
  name: string;
  /** Emoji icon for UI */
  icon: string;
  /** Description for UI */
  description: string;
  /** Maximum bet per position for cash conversion training */
  maxBetPerPosition: number;
  /** Minimum cash percentage for random generation */
  minCashPercentage: number;
}

// Difficulty configurations
export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, Omit<DifficultyConfig, 'key'>> = {
  easy: {
    name: 'Easy',
    icon: '🟢',
    description: 'Max $50 per position',
    maxBetPerPosition: 50,
    minCashPercentage: 0,
  },
  medium: {
    name: 'Medium',
    icon: '🟡',
    description: 'Max $100 per position',
    maxBetPerPosition: 100,
    minCashPercentage: 0.4,
  },
  hard: {
    name: 'Hard',
    icon: '🔴',
    description: 'Max $200 per position',
    maxBetPerPosition: 200,
    minCashPercentage: 0.4,
  },
};

// Quick lookup for max bet per position
export const DIFFICULTY_MAX_BET: Record<DifficultyLevel, number> = {
  easy: 50,
  medium: 100,
  hard: 200,
};

// Quick lookup for difficulty names
export const DIFFICULTY_NAMES: Record<DifficultyLevel, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

// Quick lookup for difficulty icons
export const DIFFICULTY_ICONS: Record<DifficultyLevel, string> = {
  easy: '🟢',
  medium: '🟡',
  hard: '🔴',
};

/**
 * Get difficulty configuration as an array for dropdowns
 */
export function getDifficultyOptions(): DifficultyConfig[] {
  return Object.entries(DIFFICULTY_CONFIGS).map(([key, config]) => ({
    key: key as DifficultyLevel,
    ...config,
  }));
}

/**
 * Get a difficulty's configuration by key
 */
export function getDifficultyConfig(key: DifficultyLevel): DifficultyConfig {
  return {
    key,
    ...DIFFICULTY_CONFIGS[key],
  };
}

/**
 * Get the max bet for a difficulty level
 */
export function getMaxBetForDifficulty(difficulty: DifficultyLevel): number {
  return DIFFICULTY_MAX_BET[difficulty];
}
