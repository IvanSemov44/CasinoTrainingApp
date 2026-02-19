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

/**
 * Calculate dynamic chip count with variance based on selected value
 * For higher values (e.g., 20), returns random between 15-20 (75%-100%)
 * For lower values (e.g., 5), returns random between 3-5 (60%-100%)
 * 
 * @param selectedChipCount - The user-selected chip count
 * @returns A randomized chip count within the calculated range
 */
export function getDynamicChipCount(selectedChipCount: number): number {
  if (selectedChipCount <= 0) return 0;
  if (selectedChipCount === 1) return 1;
  
  // Calculate the lower bound percentage based on selected value
  // Higher values get 75% lower bound, lower values scale down to 60%
  // This creates realistic training scenarios with appropriate variance
  let lowerBoundPercentage: number;
  
  if (selectedChipCount >= 20) {
    // For 20+: use 75% lower bound (e.g., 20 → 15-20)
    lowerBoundPercentage = 0.75;
  } else if (selectedChipCount >= 10) {
    // For 10-19: scale from 70% to 75%
    // 10 → 70% (7-10), 19 → ~75% (14-19)
    lowerBoundPercentage = 0.70 + (selectedChipCount - 10) * 0.005;
  } else if (selectedChipCount >= 5) {
    // For 5-9: scale from 60% to 70%
    // 5 → 60% (3-5), 9 → ~70% (6-9)
    lowerBoundPercentage = 0.60 + (selectedChipCount - 5) * 0.025;
  } else {
    // For 2-4: use 60% lower bound with minimum of 1
    // 2 → 1-2, 3 → 2-3, 4 → 2-4
    lowerBoundPercentage = 0.60;
  }
  
  // Calculate lower bound, ensuring it's at least 1
  const lowerBound = Math.max(1, Math.floor(selectedChipCount * lowerBoundPercentage));
  
  // Return random value between lower bound and selected value (inclusive)
  return getRandomInt(lowerBound, selectedChipCount);
}
