import type { FiveCardRank } from '@utils/fiveCardEvaluator';

// ── Blind pay table ────────────────────────────────────────────────────────────
// Pays when player WINS the hand comparison.
// Dealer qualification does NOT affect whether Blind pays — only hand comparison matters.
// <Straight win → Blind PUSHES (returned without extra payment).

const BLIND_MULTIPLIERS: Partial<Record<FiveCardRank, number>> = {
  'royal-flush':    500,
  'straight-flush':  50,
  'four-of-a-kind':  10,
  'full-house':       3,
  'flush':          1.5,  // 3:2
  'straight':         1,
};

export function blindMultiplier(rank: FiveCardRank): number | null {
  return BLIND_MULTIPLIERS[rank] ?? null;
}

/** Net payout on the Blind. Returns 0 if hand pushes (player wins with <Straight). */
export function blindPayout(rank: FiveCardRank, blindAmount: number): number {
  const mult = BLIND_MULTIPLIERS[rank];
  if (mult === undefined) return 0;
  return Math.round(blindAmount * mult * 100) / 100;
}

/** True if this winning hand causes the Blind to push instead of pay. */
export function blindPushes(rank: FiveCardRank): boolean {
  return !(rank in BLIND_MULTIPLIERS);
}

// ── Trips Plus pay table ───────────────────────────────────────────────────────
// Independent side bet. Pays based on player's final best 5-card hand only.
// Fully independent of dealer qualification and hand comparison result.

const TRIPS_PLUS_MULTIPLIERS: Partial<Record<FiveCardRank, number>> = {
  'royal-flush':    50,
  'straight-flush': 40,
  'four-of-a-kind': 30,
  'full-house':      8,
  'flush':           7,
  'straight':        4,
  'three-of-a-kind': 3,
};

export function tripsPlusMultiplier(rank: FiveCardRank): number {
  return TRIPS_PLUS_MULTIPLIERS[rank] ?? 0;
}

export function tripsPayout(rank: FiveCardRank, tripsAmount: number): number {
  return tripsAmount * tripsPlusMultiplier(rank);
}

export function tripsPlusQualifies(rank: FiveCardRank): boolean {
  return rank in TRIPS_PLUS_MULTIPLIERS;
}
