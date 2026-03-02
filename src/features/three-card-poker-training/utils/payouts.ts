import type { ThreeCardRank } from '@utils/threeCardEvaluator';

// ── Pair Plus ─────────────────────────────────────────────────────────────────

const PAIR_PLUS_MULTIPLIERS: Partial<Record<ThreeCardRank, number>> = {
  'straight-flush':  40,
  'three-of-a-kind': 30,
  'straight':         6,
  'flush':            3,
  'pair':             1,
};

export function pairPlusMultiplier(rank: ThreeCardRank): number {
  return PAIR_PLUS_MULTIPLIERS[rank] ?? 0;
}

/** Returns total winnings (bet amount × multiplier). 0 if hand doesn't qualify. */
export function pairPlusPayout(rank: ThreeCardRank, betAmount: number): number {
  return pairPlusMultiplier(rank) * betAmount;
}

// ── Ante Bonus ────────────────────────────────────────────────────────────────
// Casino-specific: SF=4:1, Three of a Kind=3:1, Straight=1:1
// Pays regardless of whether the player wins or loses the hand.

const ANTE_BONUS_MULTIPLIERS: Partial<Record<ThreeCardRank, number>> = {
  'straight-flush':  4,
  'three-of-a-kind': 3,
  'straight':        1,
};

export function anteBonusMultiplier(rank: ThreeCardRank): number {
  return ANTE_BONUS_MULTIPLIERS[rank] ?? 0;
}

/** Returns Ante Bonus winnings. 0 if hand is not SF / Three of a Kind / Straight. */
export function anteBonusPayout(rank: ThreeCardRank, anteAmount: number): number {
  return anteBonusMultiplier(rank) * anteAmount;
}

// ── Ante + Play outcome ───────────────────────────────────────────────────────

export interface OutcomeResult {
  /** Net change on Ante bet (positive = win, negative = loss, 0 = push) */
  ante: number;
  /** Net change on Play bet */
  play: number;
  label: string;
}

const HAND_ORDER: ThreeCardRank[] = [
  'straight-flush',
  'three-of-a-kind',
  'straight',
  'flush',
  'pair',
  'high-card',
];

/**
 * Returns the net Ante / Play result.
 * Ante Bonus and Pair Plus are separate — compute them independently.
 */
export function callOutcome(
  playerRank: ThreeCardRank,
  dealerRank: ThreeCardRank,
  qualifies: boolean,
  anteAmount: number,
): OutcomeResult {
  if (!qualifies) {
    return {
      ante: anteAmount,
      play: 0,
      label: "Dealer does not qualify — Ante pays 1:1, Play returned",
    };
  }

  const pi = HAND_ORDER.indexOf(playerRank);
  const di = HAND_ORDER.indexOf(dealerRank);

  if (pi < di) {
    // Lower index = better hand → player wins
    return {
      ante: anteAmount,
      play: anteAmount,
      label: "Player wins — Ante and Play each pay 1:1",
    };
  }
  if (pi > di) {
    return {
      ante: -anteAmount,
      play: -anteAmount,
      label: "Dealer wins — Ante and Play collected",
    };
  }
  return {
    ante: 0,
    play: 0,
    label: "Tie — Ante and Play pushed",
  };
}
