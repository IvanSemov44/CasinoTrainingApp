import type { Card } from './cardUtils';

export type FiveCardRank =
  | 'royal-flush'
  | 'straight-flush'
  | 'four-of-a-kind'
  | 'full-house'
  | 'flush'
  | 'straight'
  | 'three-of-a-kind'
  | 'two-pair'
  | 'one-pair'
  | 'high-card';

// ── Helpers ───────────────────────────────────────────────────────────────────

function rankValue(rank: string): number {
  if (rank === 'A') return 14;
  if (rank === 'K') return 13;
  if (rank === 'Q') return 12;
  if (rank === 'J') return 11;
  return parseInt(rank, 10);
}

function isFlush5(cards: Card[]): boolean {
  return cards.every(c => c.suit === cards[0].suit);
}

function isStraight5(cards: Card[]): boolean {
  const vals = cards.map(c => rankValue(c.rank)).sort((a, b) => a - b);
  if (new Set(vals).size !== 5) return false;
  // Normal consecutive (includes A-high: 10-J-Q-K-A)
  if (vals[4] - vals[0] === 4) return true;
  // Wheel: A-2-3-4-5 (Ace low)
  if (vals[4] === 14 && vals[0] === 2 && vals[1] === 3 && vals[2] === 4 && vals[3] === 5) return true;
  return false;
}

/** Returns rank counts in descending order, e.g. [4,1], [3,2], [3,1,1], [2,2,1], [2,1,1,1] */
function rankCounts5(cards: Card[]): number[] {
  const map = new Map<string, number>();
  for (const c of cards) map.set(c.rank, (map.get(c.rank) ?? 0) + 1);
  return [...map.values()].sort((a, b) => b - a);
}

function isRoyalFlush(cards: Card[]): boolean {
  if (!isFlush5(cards)) return false;
  const vals = cards.map(c => rankValue(c.rank));
  return vals.includes(14) && vals.includes(10) && vals.includes(11) && vals.includes(12) && vals.includes(13);
}

// ── Evaluation ────────────────────────────────────────────────────────────────

export function evaluateFiveCardHand(cards: Card[]): FiveCardRank {
  const flush   = isFlush5(cards);
  const straight = isStraight5(cards);
  const counts  = rankCounts5(cards);

  if (isRoyalFlush(cards))               return 'royal-flush';
  if (flush && straight)                 return 'straight-flush';
  if (counts[0] === 4)                   return 'four-of-a-kind';
  if (counts[0] === 3 && counts[1] === 2) return 'full-house';
  if (flush)                             return 'flush';
  if (straight)                          return 'straight';
  if (counts[0] === 3)                   return 'three-of-a-kind';
  if (counts[0] === 2 && counts[1] === 2) return 'two-pair';
  if (counts[0] === 2)                   return 'one-pair';
  return 'high-card';
}

export function fiveCardHandName(rank: FiveCardRank): string {
  const names: Record<FiveCardRank, string> = {
    'royal-flush':     'Royal Flush',
    'straight-flush':  'Straight Flush',
    'four-of-a-kind':  'Four of a Kind',
    'full-house':      'Full House',
    'flush':           'Flush',
    'straight':        'Straight',
    'three-of-a-kind': 'Three of a Kind',
    'two-pair':        'Two Pair',
    'one-pair':        'One Pair',
    'high-card':       'High Card',
  };
  return names[rank];
}

/**
 * Caribbean Poker dealer qualification: Ace-King or better.
 * Any made hand (pair or better) qualifies.
 * High-card hands must contain both an Ace AND a King.
 */
export function caribbeanDealerQualifies(cards: Card[]): boolean {
  const rank = evaluateFiveCardHand(cards);
  if (rank !== 'high-card') return true;
  const ranks = cards.map(c => c.rank);
  return ranks.includes('A') && ranks.includes('K');
}

/**
 * Compare two 5-card hands. Returns 1 if a wins, -1 if b wins, 0 if tie.
 * Simplified: compares only hand rank (not kicker). Sufficient for drill scenarios.
 */
const RANK_ORDER: FiveCardRank[] = [
  'royal-flush', 'straight-flush', 'four-of-a-kind', 'full-house',
  'flush', 'straight', 'three-of-a-kind', 'two-pair', 'one-pair', 'high-card',
];

export function compareFiveCardHands(a: Card[], b: Card[]): 1 | -1 | 0 {
  const ra = RANK_ORDER.indexOf(evaluateFiveCardHand(a));
  const rb = RANK_ORDER.indexOf(evaluateFiveCardHand(b));
  if (ra < rb) return 1;
  if (ra > rb) return -1;
  return 0;
}
