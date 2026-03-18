import type { BJDrillType } from '../types';
import type { DrillMenuItem } from '@components/shared/DrillMenuScreen';

export const DRILLS: Array<DrillMenuItem & { drillType: BJDrillType }> = [
  {
    drillType: 'soft-hand-recognition',
    label: 'Soft Hand Announcement',
    description: 'Announce the correct hand total for soft hands: "A+5 = 6 or 16".',
    difficulty: 'easy',
  },
  {
    drillType: 'dealer-action',
    label: 'Dealer Action',
    description: 'Hit or stand? Dealer stands on ALL 17s, including soft 17 (A+6).',
    difficulty: 'easy',
  },
  {
    drillType: 'hand-comparison',
    label: 'Hand Comparison',
    description: 'Compare player and dealer hands — who wins? Natural BJ beats 21.',
    difficulty: 'easy',
  },
  {
    drillType: 'bj-payout',
    label: 'Blackjack Payout (3:2)',
    description: 'Calculate the 3:2 payout for Natural Blackjack on even bets.',
    difficulty: 'medium',
  },
  {
    drillType: 'side-bet-payout',
    label: 'Side Bet Payout',
    description: 'BJ Side Bet pays 15:1. Pair Side Bet pays 11:1. Independent of the main hand.',
    difficulty: 'medium',
  },
  {
    drillType: 'insurance-timing',
    label: 'Insurance & Ace Bet Timing',
    description:
      'Ace → offer Insurance (2:1). 10/J/Q/K → player may request Ace Bet (11:1). 2–9 → no action.',
    difficulty: 'medium',
  },
  {
    drillType: 'surrender',
    label: 'Surrender',
    description: 'Return half the bet. Only valid before the player draws any additional card.',
    difficulty: 'medium',
  },
  {
    drillType: 'split-scenario',
    label: 'Split Rules',
    description: 'Same RANK can split (J+Q cannot — different ranks). Split Aces: one card each.',
    difficulty: 'medium',
  },
  {
    drillType: 'super-seven',
    label: 'Super Seven',
    description:
      '1 Seven=3:1 · 2 Diff Suit=30:1 · 2 Same Suit=100:1 · 3 Mixed=500:1 · 3 Same=5000:1',
    difficulty: 'advanced',
  },
  {
    drillType: 'odd-bj-payout',
    label: 'Odd Bet BJ Payout (3:2)',
    description: 'Fractional 3:2 payouts for odd bets: €15→€22.50, €25→€37.50, €35→€52.50…',
    difficulty: 'advanced',
  },
];
