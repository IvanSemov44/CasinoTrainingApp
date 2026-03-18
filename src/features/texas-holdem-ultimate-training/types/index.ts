import type { Card } from '@utils/cardUtils';
import type { BaseDrillScenario } from '@hooks/useDrillState';

export type THUDrillType =
  | 'hand-recognition' // Easy — best 5-card hand from 7 cards
  | 'dealer-qualification' // Easy — pair or better?
  | 'basic-outcome' // Easy — who wins?
  | 'raise-sizing' // Medium — Play bet calculation from raise multiplier
  | 'blind-payout' // Medium — Blind pay table
  | 'trips-plus-payout' // Medium — Trips Plus pay table
  | 'no-qualify-scenario' // Medium — Ante always returned when dealer doesn't qualify
  | 'blind-push' // Medium — <Straight winning hand → Blind pushes
  | 'blind-no-qualify' // Advanced — dealer no qualify + player wins with Straight
  | 'full-outcome'; // Advanced — multi-bet resolution

export interface THUScenario extends BaseDrillScenario {
  drillType: THUDrillType;
  playerHoleCards?: Card[];
  dealerHoleCards?: Card[];
  communityCards?: Card[];
  anteAmount?: number;
  blindAmount?: number; // always equals anteAmount when both shown
  tripsAmount?: number;
  /** Narrows base correctAnswer to number-only for numeric drill answers */
  correctAnswer?: number;
}
