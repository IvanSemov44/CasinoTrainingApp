import type { BetConfigKey } from '@config/betConfigs';
import type { CashConfigKey } from '@config/cashConfigs';

export type PositionType = 
  | 'STRAIGHT_UP'
  | 'SPLIT'
  | 'STREET'
  | 'CORNER'
  | 'SIX_LINE'
  | 'MIXED_CALCULATION'
  | 'TRIPLE_MIXED_CALCULATION'
  | 'ALL_POSITIONS_CALCULATION';

export type Difficulty = 'easy' | 'medium' | 'hard';

// Screen names that match the navigation param list
export type ExerciseScreenName = 
  | 'Calculation'
  | 'MixedCalculation'
  | 'TripleMixedCalculation'
  | 'AllPositionsCalculation'
  | 'CashHandling';

export interface ExerciseTemplate {
  title: string;
  description: string;
  difficulty: Difficulty;
  screen: ExerciseScreenName;
  betConfigKey?: BetConfigKey;
  cashConfigKey?: CashConfigKey;
}

export interface CashExerciseConfig {
  cashConfigKey: CashConfigKey;
  chipValue: string;
  difficulty: Difficulty;
}

// Cash configurations for different chip denominations
export const CASH_CONFIGS: CashExerciseConfig[] = [
  { cashConfigKey: 'ONE_DOLLAR', chipValue: '$1', difficulty: 'medium' },
  { cashConfigKey: 'TWO_DOLLAR', chipValue: '$2', difficulty: 'medium' },
  { cashConfigKey: 'FIVE_DOLLAR', chipValue: '$5', difficulty: 'medium' },
  { cashConfigKey: 'TEN_DOLLAR', chipValue: '$10', difficulty: 'medium' },
  { cashConfigKey: 'TWENTY_FIVE_DOLLAR', chipValue: '$25', difficulty: 'hard' },
  { cashConfigKey: 'ONE_HUNDRED_DOLLAR', chipValue: '$100', difficulty: 'hard' },
];

// Position metadata
export const POSITION_METADATA: Record<PositionType, { title: string; payout: string }> = {
  STRAIGHT_UP: { title: 'Straight Up', payout: '35:1' },
  SPLIT: { title: 'Split', payout: '17:1' },
  STREET: { title: 'Street', payout: '11:1' },
  CORNER: { title: 'Corner', payout: '8:1' },
  SIX_LINE: { title: 'Six Line', payout: '5:1' },
  MIXED_CALCULATION: { title: 'Mixed Calculation', payout: 'varies' },
  TRIPLE_MIXED_CALCULATION: { title: 'Triple Mixed', payout: 'varies' },
  ALL_POSITIONS_CALCULATION: { title: 'All Positions', payout: 'varies' },
};

// Exercise definitions for each position type
export const POSITION_EXERCISES: Record<PositionType, ExerciseTemplate[]> = {
  STRAIGHT_UP: [
    {
      title: 'Payout Calculation',
      description: 'Calculate payouts for straight-up bets (35:1). Practice with random numbers and chip amounts.',
      difficulty: 'easy',
      screen: 'Calculation',
      betConfigKey: 'STRAIGHT_UP',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'Cash requests: 25, 50, or 75. Calculate chips + cash breakdown.',
      difficulty: 'medium',
      screen: 'CashHandling',
    },
  ],
  SPLIT: [
    {
      title: 'Payout Calculation',
      description: 'Calculate payouts for split bets (17:1). Practice with random adjacent numbers and chip amounts.',
      difficulty: 'easy',
      screen: 'Calculation',
      betConfigKey: 'SPLIT',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'Cash requests and chip/cash breakdown for split bets (17:1).',
      difficulty: 'medium',
      screen: 'CashHandling',
      betConfigKey: 'SPLIT',
    },
  ],
  STREET: [
    {
      title: 'Payout Calculation',
      description: 'Calculate payouts for street bets (11:1). Practice with random 3-number rows and chip amounts.',
      difficulty: 'easy',
      screen: 'Calculation',
      betConfigKey: 'STREET',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'Cash requests and chip/cash breakdown for street bets (11:1).',
      difficulty: 'medium',
      screen: 'CashHandling',
      betConfigKey: 'STREET',
    },
  ],
  CORNER: [
    {
      title: 'Payout Calculation',
      description: 'Calculate payouts for corner bets (8:1). Practice with random 4-number squares and chip amounts.',
      difficulty: 'easy',
      screen: 'Calculation',
      betConfigKey: 'CORNER',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'Cash requests and chip/cash breakdown for corner bets (8:1).',
      difficulty: 'medium',
      screen: 'CashHandling',
      betConfigKey: 'CORNER',
    },
  ],
  SIX_LINE: [
    {
      title: 'Payout Calculation',
      description: 'Calculate payouts for six line bets (5:1). Practice with random 6-number double streets and chip amounts.',
      difficulty: 'easy',
      screen: 'Calculation',
      betConfigKey: 'SIX_LINE',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'Cash requests and chip/cash breakdown for six line bets (5:1).',
      difficulty: 'medium',
      screen: 'CashHandling',
      betConfigKey: 'SIX_LINE',
    },
  ],
  MIXED_CALCULATION: [
    {
      title: 'Payout Calculation',
      description: 'Calculate total payouts combining straight ups (35:1) and splits (17:1).',
      difficulty: 'medium',
      screen: 'MixedCalculation',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'Mixed bets with %CHIP% chips. Calculate total payout with cash denomination.',
      difficulty: 'medium',
      screen: 'MixedCalculation',
    },
  ],
  TRIPLE_MIXED_CALCULATION: [
    {
      title: 'Payout Calculation',
      description: 'Combines straight ups (35:1), splits (17:1), and corners (8:1).',
      difficulty: 'hard',
      screen: 'TripleMixedCalculation',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'Triple mixed bets with %CHIP% chips. Calculate total payout with cash denomination.',
      difficulty: 'hard',
      screen: 'TripleMixedCalculation',
    },
  ],
  ALL_POSITIONS_CALCULATION: [
    {
      title: 'Payout Calculation',
      description: 'Master level! Combines all bet types: straight ups, splits, corners, streets, and six lines.',
      difficulty: 'hard',
      screen: 'AllPositionsCalculation',
    },
    {
      title: 'Cash Handling - %CHIP%',
      description: 'All positions with %CHIP% chips. Ultimate challenge with cash denomination.',
      difficulty: 'hard',
      screen: 'AllPositionsCalculation',
    },
  ],
};
