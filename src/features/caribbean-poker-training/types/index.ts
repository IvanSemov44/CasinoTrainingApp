import type { Card } from '@utils/cardUtils';

export type CPDrillType =
  | 'hand-recognition'     // Easy — name the 5-card hand
  | 'dealer-qualification' // Easy — A-K or better?
  | 'basic-outcome'        // Easy — qualify + compare, who wins?
  | 'call-bet-payout'      // Medium — Call bet payout (numeric)
  | 'bonus-payout'         // Medium — fixed Bonus payout (multiple-choice)
  | 'bonus-after-swap'     // Medium — Bonus halved after swap (multiple-choice)
  | 'no-qualify-outcome'   // Medium — dealer doesn't qualify scenario
  | 'bonus-on-fold'        // Advanced — player folded, Bonus still pays
  | 'swap-procedure';      // Advanced — knowledge quiz on 2-phase swap

export interface CPScenario {
  drillType: CPDrillType;
  playerCards?: Card[];
  /** Dealer's full hand, or single visible upcard */
  dealerCards?: Card[];
  /** Ante amount for payout drills */
  betAmount?: number;
  /** True when player used the swap option (affects Bonus payout) */
  swapped?: boolean;
  question: string;
  answerType: 'multiple-choice' | 'numeric';
  options?: string[];
  correctOption?: string;
  correctAnswer?: number;
  explanation: string;
}
