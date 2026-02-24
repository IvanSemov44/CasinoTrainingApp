import type { RouletteNumber } from '@app-types/roulette.types';
import type { Bet, BetType } from '../types/exercise.types';
import {
  getBetPayout,
  getSplitsForNumber,
  getCornersForNumber,
  getStreetsForNumber,
  getSixLinesForNumber,
} from './exerciseHelpers';
import {
  getRandomInt,
  getRandomElement,
  shuffleArray,
  shouldInclude,
  getDynamicChipCount,
} from './randomUtils';

/**
 * Configuration for bet generation probabilities
 */
const BET_PROBABILITIES = {
  CORNER: 0.3,  // 70% chance to include corners
  STREET: 0.4,  // 60% chance to include streets
  LINE: 0.5, // 50% chance to include six lines
} as const;

/**
 * Distribute a target chip count across multiple positions randomly
 * Ensures the sum of all distributed chips equals exactly the target
 * 
 * @param targetChips - The total number of chips to distribute
 * @param positionCount - The number of positions to distribute chips across
 * @returns An array of chip counts that sum exactly to targetChips
 */
export function distributeChipsRandomly(targetChips: number, positionCount: number): number[] {
  if (positionCount <= 0) return [];
  if (positionCount === 1) return [targetChips];
  if (targetChips <= 0) return Array(positionCount).fill(0);
  
  // Each position must have at least 1 chip if we have enough chips
  const minChipsPerPosition = targetChips >= positionCount ? 1 : 0;
  const remainingChips = targetChips - (minChipsPerPosition * positionCount);
  
  // Generate random breakpoints to distribute remaining chips
  const distribution: number[] = Array(positionCount).fill(minChipsPerPosition);
  
  if (remainingChips > 0) {
    // Create random breakpoints for distribution
    // We need (positionCount - 1) breakpoints to split remainingChips into positionCount parts
    const breakpoints: number[] = [];
    for (let i = 0; i < positionCount - 1; i++) {
      breakpoints.push(getRandomInt(0, remainingChips));
    }
    breakpoints.sort((a, b) => a - b);
    
    // Calculate the size of each segment
    let prevBreakpoint = 0;
    for (let i = 0; i < breakpoints.length; i++) {
      distribution[i] += breakpoints[i] - prevBreakpoint;
      prevBreakpoint = breakpoints[i];
    }
    distribution[positionCount - 1] += remainingChips - prevBreakpoint;
    
    // Shuffle the distribution to randomize which positions get more chips
    const shuffledDistribution = [...distribution];
    for (let i = shuffledDistribution.length - 1; i > 0; i--) {
      const j = getRandomInt(0, i);
      [shuffledDistribution[i], shuffledDistribution[j]] = [shuffledDistribution[j], shuffledDistribution[i]];
    }
    
    return shuffledDistribution;
  }
  
  return distribution;
}

/**
 * Generate bets for a specific winning number based on allowed bet types
 * If targetChips is provided, distributes chips across all bets to sum exactly to target
 */
export function generateBetsForNumber(
  number: RouletteNumber,
  allowedBetTypes: BetType[],
  targetChips?: number
): Bet[] {
  const bets: Bet[] = [];
  const betPositions: { type: BetType; numbers: RouletteNumber[] }[] = [];

  // Collect all possible bet positions first
  // Add straight up bet if included
  if (allowedBetTypes.includes('STRAIGHT')) {
    betPositions.push({
      type: 'STRAIGHT',
      numbers: [number],
    });
  }

  // Add splits if included
  if (allowedBetTypes.includes('SPLIT')) {
    const possibleSplits = getSplitsForNumber(number);
    if (possibleSplits.length > 0) {
      // Randomly select 1-2 splits
      const numSplits = Math.min(getRandomInt(1, 2), possibleSplits.length);
      const shuffled = shuffleArray(possibleSplits);
      
      for (let i = 0; i < numSplits; i++) {
        betPositions.push({
          type: 'SPLIT',
          numbers: shuffled[i],
        });
      }
    }
  }

  // Add corners if included
  if (allowedBetTypes.includes('CORNER')) {
    const possibleCorners = getCornersForNumber(number);
    if (possibleCorners.length > 0 && shouldInclude(BET_PROBABILITIES.CORNER)) {
      // Add at most 1 corner
      betPositions.push({
        type: 'CORNER',
        numbers: getRandomElement(possibleCorners),
      });
    }
  }

  // Add streets if included
  if (allowedBetTypes.includes('STREET')) {
    const possibleStreets = getStreetsForNumber(number);
    if (possibleStreets.length > 0 && shouldInclude(BET_PROBABILITIES.STREET)) {
      betPositions.push({
        type: 'STREET',
        numbers: getRandomElement(possibleStreets),
      });
    }
  }

  // Add six lines if included
  if (allowedBetTypes.includes('LINE')) {
    const possibleSixLines = getSixLinesForNumber(number);
    if (possibleSixLines.length > 0 && shouldInclude(BET_PROBABILITIES.LINE)) {
      betPositions.push({
        type: 'LINE',
        numbers: getRandomElement(possibleSixLines),
      });
    }
  }

  // Distribute chips across all positions
  let chipDistribution: number[];
  if (targetChips !== undefined && targetChips > 0) {
    // Apply dynamic variance to the target chip count for realistic training
    const dynamicTargetChips = getDynamicChipCount(targetChips);
    chipDistribution = distributeChipsRandomly(dynamicTargetChips, betPositions.length);
  } else {
    // Use random chip counts if no target specified
    chipDistribution = betPositions.map(() => getRandomInt(1, 5));
  }

  // Create bets with the distributed chips
  betPositions.forEach((position, index) => {
    const chips = chipDistribution[index] || 0;
    if (chips > 0) {
      bets.push({
        type: position.type,
        numbers: position.numbers,
        chips: chips,
        payout: getBetPayout(position.type),
      });
    }
  });

  return bets;
}

/**
 * Generate a single bet from bet config for focused practice
 * If targetChips is provided, applies dynamic variance for realistic training
 */
export function generateSingleBetFromConfig(
  possibleBets: RouletteNumber[][],
  betType: BetType,
  targetChips?: number
): { bet: Bet; number: RouletteNumber } {
  const randomBet = getRandomElement(possibleBets);
  const number = getRandomElement(randomBet);
  
  // Apply dynamic variance to target chips for realistic training scenarios
  // For higher values (e.g., 20), results in range 15-20
  // For lower values (e.g., 5), results in range 3-5
  const chips = targetChips !== undefined 
    ? getDynamicChipCount(targetChips) 
    : getRandomInt(1, 5);
  
  const bet: Bet = {
    type: betType,
    numbers: randomBet,
    chips: chips,
    payout: getBetPayout(betType),
  };
  
  return { bet, number };
}
