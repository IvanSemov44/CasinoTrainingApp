import type { Card } from './cardUtils';

// ── Card value ────────────────────────────────────────────────────────────────

/** Hard value of one card: A=1, 2–10=face, J/Q/K=10 */
export function cardBJValue(card: Card): number {
  if (card.rank === 'A') return 1;
  if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') return 10;
  return parseInt(card.rank, 10);
}

// ── Hand total ────────────────────────────────────────────────────────────────

/**
 * Returns the hard total (Ace = 1) and, if an Ace can be counted as 11
 * without busting, a soft total as well.
 */
export function handTotal(cards: Card[]): { hard: number; soft: number | null } {
  const hard = cards.reduce((sum, c) => sum + cardBJValue(c), 0);
  const hasAce = cards.some(c => c.rank === 'A');
  const soft = hasAce && hard + 10 <= 21 ? hard + 10 : null;
  return { hard, soft };
}

/**
 * Returns the dealer announcement string for a soft hand: "6 or 16".
 * Returns null when the hand is hard (no usable Ace).
 */
export function softAnnouncement(cards: Card[]): string | null {
  const { hard, soft } = handTotal(cards);
  if (soft === null) return null;
  return `${hard} or ${soft}`;
}

// ── Dealer rules ──────────────────────────────────────────────────────────────

/**
 * Returns true when the dealer must hit.
 * Casino rule: stand on ALL 17s including soft 17 (A+6 = "7 or 17").
 */
export function dealerMustHit(cards: Card[]): boolean {
  const { hard, soft } = handTotal(cards);
  // Bust → dealer has already busted, no action needed
  if (hard > 21) return false;
  // Use soft total if available; otherwise hard
  const effective = soft ?? hard;
  return effective <= 16;
}

// ── Natural Blackjack ─────────────────────────────────────────────────────────

/** True if exactly 2 cards forming Ace + 10-value (natural Blackjack). */
export function isNaturalBlackjack(cards: Card[]): boolean {
  if (cards.length !== 2) return false;
  const hasAce = cards.some(c => c.rank === 'A');
  const hasTen = cards.some(c => cardBJValue(c) === 10 && c.rank !== 'A');
  return hasAce && hasTen;
}

// ── Pair / split ──────────────────────────────────────────────────────────────

/**
 * True if 2 cards with the same rank string.
 * J+Q cannot split — different ranks, even though both = 10 value.
 */
export function canSplit(cards: Card[]): boolean {
  if (cards.length !== 2) return false;
  return cards[0].rank === cards[1].rank;
}

/** Alias for canSplit — two cards with identical rank string. */
export function isPair(cards: Card[]): boolean {
  return canSplit(cards);
}

// ── Super Seven ───────────────────────────────────────────────────────────────

export interface SuperSevenInfo {
  tier: string;
  multiplier: number;
}

/**
 * Returns Super Seven tier for 1–3 cards that are all rank '7'.
 * Returns null if any card is not a 7.
 * Same suit = all cards share the exact same suit symbol.
 */
export function superSevenInfo(sevens: Card[]): SuperSevenInfo | null {
  if (sevens.length === 0 || sevens.length > 3) return null;
  if (sevens.some(c => c.rank !== '7')) return null;

  if (sevens.length === 1) {
    return { tier: '1 Seven', multiplier: 3 };
  }

  if (sevens.length === 2) {
    const sameSuit = sevens[0].suit === sevens[1].suit;
    return sameSuit
      ? { tier: '2 Sevens — Same Suit', multiplier: 100 }
      : { tier: '2 Sevens — Different Suits', multiplier: 30 };
  }

  // 3 sevens
  const allSameSuit = sevens[0].suit === sevens[1].suit && sevens[1].suit === sevens[2].suit;
  return allSameSuit
    ? { tier: '3 Sevens — Same Suit', multiplier: 5000 }
    : { tier: '3 Sevens — Mixed Suits', multiplier: 500 };
}
