/** 3:2 Blackjack payout. May be fractional for odd bets (€15 → 22.5). */
export const bjPayout = (bet: number): number => bet * 1.5;

/** Insurance pays 2:1. */
export const insurancePayout = (bet: number): number => bet * 2;

/** Ace Bet (player-initiated on 10-card) pays 11:1. */
export const aceBetPayout = (bet: number): number => bet * 11;

/** BJ Side Bet: player's first two cards are Natural Blackjack. Pays 15:1. */
export const bjSideBetPayout = (bet: number): number => bet * 15;

/** Pair Side Bet: player's first two cards are a pair. Pays 11:1. */
export const pairSideBetPayout = (bet: number): number => bet * 11;

/** Surrender: player gets back half their bet. */
export const surrenderReturn = (bet: number): number => bet / 2;

/** Format a payout amount as euros: €22.50 or €30 */
export function formatEuro(amount: number): string {
  if (amount % 1 === 0) return `€${amount}`;
  return `€${amount.toFixed(2)}`;
}
