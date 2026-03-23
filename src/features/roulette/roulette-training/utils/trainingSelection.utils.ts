import type { BetConfigKey } from '@config/betConfigs';
import type { PositionType } from '@features/roulette-training/config/exerciseDefinitions';

// Screen names for roulette training - used by thin wrappers in app/
export type RouletteTrainingScreen =
  | 'Calculation'
  | 'MixedCalculation'
  | 'TripleMixedCalculation'
  | 'AllPositionsCalculation'
  | 'CashHandling'
  | 'LayoutPractice';

const TRAINING_SCREEN_MAP: Record<PositionType, RouletteTrainingScreen> = {
  STRAIGHT_UP: 'Calculation',
  SPLIT: 'Calculation',
  STREET: 'Calculation',
  CORNER: 'Calculation',
  SIX_LINE: 'Calculation',
  MIXED_CALCULATION: 'MixedCalculation',
  TRIPLE_MIXED_CALCULATION: 'TripleMixedCalculation',
  ALL_POSITIONS_CALCULATION: 'AllPositionsCalculation',
};

const BET_CONFIG_MAP: Partial<Record<PositionType, BetConfigKey>> = {
  STRAIGHT_UP: 'STRAIGHT_UP',
  SPLIT: 'SPLIT',
  STREET: 'STREET',
  CORNER: 'CORNER',
  SIX_LINE: 'SIX_LINE',
};

const BET_TYPES_MAP: Partial<Record<PositionType, string[]>> = {
  MIXED_CALCULATION: ['STRAIGHT', 'SPLIT'],
  TRIPLE_MIXED_CALCULATION: ['STRAIGHT', 'SPLIT', 'CORNER'],
  ALL_POSITIONS_CALCULATION: ['STRAIGHT', 'SPLIT', 'CORNER', 'STREET', 'SIX_LINE'],
};

export function getTrainingScreen(trainingType: PositionType): RouletteTrainingScreen {
  return TRAINING_SCREEN_MAP[trainingType] || 'Calculation';
}

export function getTrainingBetConfig(trainingType: PositionType): BetConfigKey | undefined {
  return BET_CONFIG_MAP[trainingType];
}

export function getTrainingBetTypes(trainingType: PositionType): string[] | undefined {
  return BET_TYPES_MAP[trainingType];
}
