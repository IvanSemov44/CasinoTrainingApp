import type { Card } from '@utils/cardUtils';

export type TCPDrillType =
  | 'hand-recognition'
  | 'dealer-qualification'
  | 'pair-plus-payout'
  | 'ante-bonus'
  | 'full-outcome';

export type AnswerType = 'multiple-choice' | 'numeric';

export interface TCPScenario {
  drillType: TCPDrillType;
  /** Cards for player's hand (shown when drill is about player's hand) */
  playerCards?: Card[];
  /** Cards for dealer's hand (shown for dealer-qualification and full-outcome) */
  dealerCards?: Card[];
  /** Ante or side-bet amount used in payout drills */
  betAmount?: number;
  question: string;
  answerType: AnswerType;
  /** Options for multiple-choice drills */
  options?: string[];
  /** Correct option string (multiple-choice) */
  correctOption?: string;
  /** Correct numeric answer (numeric drills) */
  correctAnswer?: number;
  explanation: string;
}
