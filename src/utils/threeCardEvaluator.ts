import type { Card } from './cardUtils';

export type ThreeCardRank =
  | 'straight-flush'
  | 'three-of-a-kind'
  | 'straight'
  | 'flush'
  | 'pair'
  | 'high-card';

/** Numeric value of a rank. Ace = 14 by default. */
function rankValue(rank: string): number {
  if (rank === 'A') return 14;
  if (rank === 'J') return 11;
  if (rank === 'Q') return 12;
  if (rank === 'K') return 13;
  return parseInt(rank, 10);
}

function isFlush(cards: Card[]): boolean {
  return cards[0].suit === cards[1].suit && cards[1].suit === cards[2].suit;
}

function isStraight(cards: Card[]): boolean {
  const vals = cards.map(c => rankValue(c.rank)).sort((a, b) => a - b);
  // All three must be different ranks
  if (new Set(vals).size !== 3) return false;
  // Normal consecutive check (covers mid and A-high: Q-K-A = 12-13-14)
  if (vals[2] - vals[0] === 2) return true;
  // A-low special case: A-2-3 → treat A as 1
  if (vals[2] === 14) {
    const low = vals.map(v => (v === 14 ? 1 : v)).sort((a, b) => a - b);
    if (low[2] - low[0] === 2) return true;
  }
  return false;
}

function rankCounts(cards: Card[]): number[] {
  const counts = new Map<string, number>();
  for (const card of cards) {
    counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1);
  }
  return [...counts.values()];
}

export function evaluateThreeCardHand(cards: Card[]): ThreeCardRank {
  const flush = isFlush(cards);
  const straight = isStraight(cards);
  const maxCount = Math.max(...rankCounts(cards));

  if (flush && straight) return 'straight-flush';
  if (maxCount === 3) return 'three-of-a-kind';
  if (straight) return 'straight';
  if (flush) return 'flush';
  if (maxCount === 2) return 'pair';
  return 'high-card';
}

export function threeCardHandName(rank: ThreeCardRank): string {
  const names: Record<ThreeCardRank, string> = {
    'straight-flush': 'Straight Flush',
    'three-of-a-kind': 'Three of a Kind',
    'straight': 'Straight',
    'flush': 'Flush',
    'pair': 'Pair',
    'high-card': 'High Card',
  };
  return names[rank];
}

/** Dealer qualifies with Queen-high or better. Any made hand always qualifies. */
export function dealerQualifies(cards: Card[]): boolean {
  const rank = evaluateThreeCardHand(cards);
  if (rank !== 'high-card') return true;
  // High-card hand: highest card must be Q (12) or better
  const maxVal = Math.max(...cards.map(c => rankValue(c.rank)));
  return maxVal >= 12;
}
