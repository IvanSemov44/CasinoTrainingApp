/**
 * Training type configurations for roulette exercises
 * Defines available bet types and their display properties
 */

import type { DropdownItem } from '@components/shared';

/**
 * Available training types for roulette calculation exercises
 * Each type focuses on a specific bet type or combination
 */
export const TRAINING_TYPES: DropdownItem[] = [
  {
    key: 'STRAIGHT_UP',
    label: 'Straight Up',
    icon: '🎯',
    extraInfo: 'Payout: 35:1',
  },
  {
    key: 'SPLIT',
    label: 'Split',
    icon: '↔️',
    extraInfo: 'Payout: 17:1',
  },
  {
    key: 'STREET',
    label: 'Street',
    icon: '📏',
    extraInfo: 'Payout: 11:1',
  },
  {
    key: 'CORNER',
    label: 'Corner',
    icon: '⬜',
    extraInfo: 'Payout: 8:1',
  },
  {
    key: 'SIX_LINE',
    label: 'Six Line',
    icon: '🔷',
    extraInfo: 'Payout: 5:1',
  },
  {
    key: 'MIXED_CALCULATION',
    label: 'Mixed (Straight + Split)',
    icon: '🔀',
    extraInfo: 'Payout: Varies',
  },
  {
    key: 'TRIPLE_MIXED_CALCULATION',
    label: 'Triple Mixed',
    icon: '🎰',
    extraInfo: 'Payout: Varies',
  },
  {
    key: 'ALL_POSITIONS_CALCULATION',
    label: 'All Positions',
    icon: '🏆',
    extraInfo: 'Payout: Varies',
  },
];

/**
 * Available chip count options for exercises
 * Determines the number of chips used in training scenarios
 */
export const CHIP_COUNT_OPTIONS = [1, 2, 3, 4, 5, 10, 15, 20, 25];
