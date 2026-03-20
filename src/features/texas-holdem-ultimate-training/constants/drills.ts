import type { THUDrillType } from '../types';
import type { DrillMenuItem } from '@shared';

export const DRILLS: Array<DrillMenuItem & { drillType: THUDrillType }> = [
  {
    drillType: 'hand-recognition',
    label: 'Hand Recognition',
    description: 'Identify the best 5-card hand from 2 hole cards + 5 community cards.',
    difficulty: 'easy',
  },
  {
    drillType: 'dealer-qualification',
    label: 'Dealer Qualification',
    description: 'Does the dealer qualify? Needs One Pair or better.',
    difficulty: 'easy',
  },
  {
    drillType: 'basic-outcome',
    label: 'Basic Outcome',
    description: 'Who wins? Dealer no-qualify → Ante returned. Identify the correct outcome.',
    difficulty: 'easy',
  },
  {
    drillType: 'raise-sizing',
    label: 'Raise Sizing',
    description: 'Pre-flop: 3× or 4×. Flop: 2×. Turn+River: 1×. Calculate the Play bet.',
    difficulty: 'medium',
  },
  {
    drillType: 'blind-payout',
    label: 'Blind Payout',
    description:
      'Blind pays when player wins ≥ Straight. RF=500:1, SF=50:1, FoaK=10:1, FH=3:1, Flush=3:2, Straight=1:1.',
    difficulty: 'medium',
  },
  {
    drillType: 'trips-plus-payout',
    label: 'Trips Plus Payout',
    description:
      'Independent side bet. ToaK=3:1, Straight=4:1, Flush=7:1, FH=8:1, FoaK=30:1, SF=40:1, RF=50:1.',
    difficulty: 'medium',
  },
  {
    drillType: 'no-qualify-scenario',
    label: 'No-Qualify Scenario',
    description:
      "Ante is ALWAYS returned when dealer doesn't qualify — even if dealer wins comparison.",
    difficulty: 'medium',
  },
  {
    drillType: 'blind-push',
    label: 'Blind Push Rule',
    description:
      'Player wins with less than Straight → Blind pushes (returned). Not collected, not paid.',
    difficulty: 'medium',
  },
  {
    drillType: 'blind-no-qualify',
    label: 'Blind + No Qualify',
    description:
      "Dealer doesn't qualify but player wins with Straight — Blind still pays 1:1. Dealer qualification never affects Blind.",
    difficulty: 'advanced',
  },
  {
    drillType: 'full-outcome',
    label: 'Full Outcome',
    description:
      'Resolve all bets: Ante, Blind, Play, and Trips Plus simultaneously across complex scenarios.',
    difficulty: 'advanced',
  },
];
