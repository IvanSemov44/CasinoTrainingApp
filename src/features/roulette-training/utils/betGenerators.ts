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
  getRandomChipCount,
  shouldInclude,
  getRandomCount,
} from './randomUtils';

/**
 * Configuration for bet generation probabilities
 */
const BET_PROBABILITIES = {
  CORNER: 0.3,  // 70% chance to include corners
  STREET: 0.4,  // 60% chance to include streets
  SIX_LINE: 0.5, // 50% chance to include six lines
} as const;

/**
 * Generate bets for a specific winning number based on allowed bet types
 */
export function generateBetsForNumber(
  number: RouletteNumber,
  allowedBetTypes: BetType[]
): Bet[] {
  const bets: Bet[] = [];

  // Add straight up bet if included
  if (allowedBetTypes.includes('STRAIGHT')) {
    bets.push({
      type: 'STRAIGHT',
      numbers: [number],
      chips: getRandomChipCount(),
      payout: getBetPayout('STRAIGHT'),
    });
  }

  // Add splits if included
  if (allowedBetTypes.includes('SPLIT')) {
    const possibleSplits = getSplitsForNumber(number);
    if (possibleSplits.length > 0) {
      const numSplits = getRandomCount(2, possibleSplits.length);
      const shuffled = shuffleArray(possibleSplits);
      
      for (let i = 0; i < numSplits; i++) {
        bets.push({
          type: 'SPLIT',
          numbers: shuffled[i],
          chips: getRandomChipCount(),
          payout: getBetPayout('SPLIT'),
        });
      }
    }
  }

  // Add corners if included
  if (allowedBetTypes.includes('CORNER')) {
    const possibleCorners = getCornersForNumber(number);
    if (possibleCorners.length > 0 && shouldInclude(BET_PROBABILITIES.CORNER)) {
      const numCorners = getRandomCount(2, possibleCorners.length);
      const shuffled = shuffleArray(possibleCorners);
      
      for (let i = 0; i < numCorners; i++) {
        bets.push({
          type: 'CORNER',
          numbers: shuffled[i],
          chips: getRandomChipCount(),
          payout: getBetPayout('CORNER'),
        });
      }
    }
  }

  // Add streets if included
  if (allowedBetTypes.includes('STREET')) {
    const possibleStreets = getStreetsForNumber(number);
    if (possibleStreets.length > 0 && shouldInclude(BET_PROBABILITIES.STREET)) {
      bets.push({
        type: 'STREET',
        numbers: getRandomElement(possibleStreets),
        chips: getRandomChipCount(),
        payout: getBetPayout('STREET'),
      });
    }
  }

  // Add six lines if included
  if (allowedBetTypes.includes('SIX_LINE')) {
    const possibleSixLines = getSixLinesForNumber(number);
    if (possibleSixLines.length > 0 && shouldInclude(BET_PROBABILITIES.SIX_LINE)) {
      bets.push({
        type: 'SIX_LINE',
        numbers: getRandomElement(possibleSixLines),
        chips: getRandomChipCount(),
        payout: getBetPayout('SIX_LINE'),
      });
    }
  }

  return bets;
}

/**
 * Generate a single bet from bet config for focused practice
 */
export function generateSingleBetFromConfig(
  possibleBets: RouletteNumber[][],
  betType: BetType,
  chipCount?: number
): { bet: Bet; number: RouletteNumber } {
  const randomBet = getRandomElement(possibleBets);
  const number = getRandomElement(randomBet);
  
  const bet: Bet = {
    type: betType,
    numbers: randomBet,
    chips: chipCount ?? getRandomInt(1, 5),
    payout: getBetPayout(betType),
  };
  
  return { bet, number };
}
