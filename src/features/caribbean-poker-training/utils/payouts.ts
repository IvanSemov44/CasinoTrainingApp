import type { FiveCardRank } from '@utils/fiveCardEvaluator';

// ── Call bet ──────────────────────────────────────────────────────────────────
// Applies when dealer qualifies AND player wins. Multiplier applied to Call bet (= 2× Ante).

const CALL_BET_MULTIPLIERS: Record<FiveCardRank, number> = {
  'royal-flush': 100,
  'straight-flush': 50,
  'four-of-a-kind': 20,
  'full-house': 7,
  flush: 5,
  straight: 4,
  'three-of-a-kind': 3,
  'two-pair': 2,
  'one-pair': 1,
  'high-card': 1,
};

export function callBetMultiplier(rank: FiveCardRank): number {
  return CALL_BET_MULTIPLIERS[rank];
}

/** Net payout on the Call bet. Call bet = 2× Ante. */
export function callBetPayout(rank: FiveCardRank, anteAmount: number): number {
  return anteAmount * 2 * callBetMultiplier(rank);
}

// ── Bonus bet ─────────────────────────────────────────────────────────────────
// Fixed €1 side bet. FIXED payouts (not multipliers). Halved after swap.
// Pays regardless of dealer result and regardless of whether player folded.

const BONUS_STANDARD: Partial<Record<FiveCardRank, number>> = {
  'royal-flush': 5000,
  'straight-flush': 1000,
  'four-of-a-kind': 300,
  'full-house': 150,
  flush: 100,
};

const BONUS_AFTER_SWAP: Partial<Record<FiveCardRank, number>> = {
  'royal-flush': 2500,
  'straight-flush': 500,
  'four-of-a-kind': 150,
  'full-house': 75,
  flush: 50,
};

/** Returns the fixed Bonus payout (€). 0 if hand doesn't qualify for Bonus. */
export function bonusFixedPayout(rank: FiveCardRank, swapped: boolean): number {
  const table = swapped ? BONUS_AFTER_SWAP : BONUS_STANDARD;
  return table[rank] ?? 0;
}

/** True if the hand qualifies for a Bonus payout. */
export function bonusQualifies(rank: FiveCardRank): boolean {
  return rank in BONUS_STANDARD;
}
