import type { CPDrillType } from '../types';
import type { DrillMenuItem } from '@shared';

export const DRILLS: Array<DrillMenuItem & { drillType: CPDrillType }> = [
  {
    drillType: 'hand-recognition',
    label: 'Hand Recognition',
    description:
      'Identify the 5-card poker hand: Royal Flush, Straight Flush, Four of a Kind, etc.',
    difficulty: 'easy',
  },
  {
    drillType: 'dealer-qualification',
    label: 'Dealer Qualification',
    description:
      'Does the dealer qualify? Needs Ace-King or better (pair, or high-card with both A and K).',
    difficulty: 'easy',
  },
  {
    drillType: 'basic-outcome',
    label: 'Basic Outcome',
    description: 'What is the result? No qualify / Player wins / Dealer wins / tie.',
    difficulty: 'easy',
  },
  {
    drillType: 'call-bet-payout',
    label: 'Call Bet Payout',
    description:
      'Calculate the Call bet payout. Call = 2× Ante; multiplier applied to the Call bet amount.',
    difficulty: 'medium',
  },
  {
    drillType: 'bonus-payout',
    label: 'Bonus Payout',
    description: 'Fixed €1 side bet. Pays RF=€5000, SF=€1000, FoaK=€300, FH=€150, Flush=€100.',
    difficulty: 'medium',
  },
  {
    drillType: 'bonus-after-swap',
    label: 'Bonus After Swap',
    description: 'Player swapped a card → ALL Bonus payouts are halved. How much does it pay now?',
    difficulty: 'medium',
  },
  {
    drillType: 'no-qualify-outcome',
    label: 'No Qualify Outcome',
    description:
      'Dealer does not qualify → Ante 1:1, Call returned. Call does NOT pay the hand table.',
    difficulty: 'medium',
  },
  {
    drillType: 'bonus-on-fold',
    label: 'Bonus on Fold',
    description:
      'Key rule: Bonus pays even if the player folded their Ante. Test this common mistake.',
    difficulty: 'advanced',
  },
  {
    drillType: 'swap-procedure',
    label: 'Swap Procedure',
    description:
      'Two-phase swap mechanic: fee (1× Ante), Phase 2 order, Bonus independence after swap.',
    difficulty: 'advanced',
  },
];
