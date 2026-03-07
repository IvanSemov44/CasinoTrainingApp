import type { Card } from './cardUtils';
import { evaluateFiveCardHand, type FiveCardRank } from './fiveCardEvaluator';

const RANK_ORDER: FiveCardRank[] = [
  'royal-flush',
  'straight-flush',
  'four-of-a-kind',
  'full-house',
  'flush',
  'straight',
  'three-of-a-kind',
  'two-pair',
  'one-pair',
  'high-card',
];

/**
 * Returns the best FiveCardRank achievable from 7 cards.
 * Checks all C(7,2)=21 ways to exclude 2 cards, evaluating the remaining 5.
 */
export function bestFiveFromSeven(cards: Card[]): FiveCardRank {
  let bestIdx = RANK_ORDER.length - 1;
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const five = cards.filter((_, k) => k !== i && k !== j);
      const rank = evaluateFiveCardHand(five);
      const idx = RANK_ORDER.indexOf(rank);
      if (idx < bestIdx) bestIdx = idx;
    }
  }
  return RANK_ORDER[bestIdx];
}

/** THU dealer qualifies with Pair or better (any hand except High Card). */
export function thuDealerQualifies(cards: Card[]): boolean {
  return bestFiveFromSeven(cards) !== 'high-card';
}
