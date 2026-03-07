import type { Card } from '@utils/cardUtils';

export type BJDrillType =
  | 'soft-hand-recognition' // Easy — announce hand total ("6 or 16")
  | 'dealer-action' // Easy — hit or stand?
  | 'hand-comparison' // Easy — who wins?
  | 'bj-payout' // Medium — 3:2 on even bets (numeric)
  | 'side-bet-payout' // Medium — BJ side 15:1 / Pair side 11:1 (numeric)
  | 'insurance-timing' // Medium — when to offer insurance / Ace Bet
  | 'surrender' // Medium — return half the bet (numeric)
  | 'split-scenario' // Medium — can these cards split?
  | 'super-seven' // Advanced — identify tier + payout
  | 'odd-bj-payout'; // Advanced — 3:2 on odd bets like €15, €35

export interface BJScenario {
  drillType: BJDrillType;
  /** Player's hand cards */
  playerCards?: Card[];
  /** Dealer's hand cards, or single upcard for insurance-timing */
  dealerCards?: Card[];
  betAmount?: number;
  question: string;
  answerType: 'multiple-choice' | 'numeric';
  options?: string[];
  correctOption?: string;
  correctAnswer?: number;
  explanation: string;
}
