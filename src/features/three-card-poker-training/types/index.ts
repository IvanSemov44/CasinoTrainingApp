import type { Card } from '@utils/cardUtils';
import type { BaseDrillScenario } from '@hooks/useDrillState';

export type TCPDrillType =
  | 'hand-recognition'
  | 'dealer-qualification'
  | 'pair-plus-payout'
  | 'ante-bonus'
  | 'full-outcome';

export interface TCPScenario extends BaseDrillScenario {
  drillType: TCPDrillType;
  /** Cards for player's hand (shown when drill is about player's hand) */
  playerCards?: Card[];
  /** Cards for dealer's hand (shown for dealer-qualification and full-outcome) */
  dealerCards?: Card[];
  /** Ante or side-bet amount used in payout drills */
  betAmount?: number;
  /** Narrows base correctAnswer to number-only for numeric drill answers */
  correctAnswer?: number;
}
