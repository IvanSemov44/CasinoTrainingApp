/**
 * Random utility functions for generating exercise questions
 * Shared across multiple features
 */

/**
 * Get random integer between min and max (inclusive)
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get random element from an array
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random chip count for bets (1-3 chips)
 */
export function getRandomChipCount(min = 1, max = 3): number {
  return getRandomInt(min, max);
}

/**
 * Get random probability check
 */
export function shouldInclude(probability: number): boolean {
  return Math.random() > probability;
}

/**
 * Get random number of items to select from available options
 */
export function getRandomCount(maxCount: number, availableCount: number): number {
  return Math.min(getRandomInt(1, maxCount), availableCount);
}
