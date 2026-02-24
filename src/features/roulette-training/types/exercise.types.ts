import { BetType as RouletteBetType, type RouletteNumber } from '@app-types/roulette.types';

// Exercise bet types are a subset of all roulette bet types
// Used for calculation exercises (straight, split, corner, street, line/six-line)
// These are string literal types matching the enum values for type-safe string usage
export type ExerciseBetType =
  | 'STRAIGHT'
  | 'SPLIT'
  | 'CORNER'
  | 'STREET'
  | 'LINE';

// Legacy type alias for backwards compatibility
export type BetType = ExerciseBetType;

// Helper to convert ExerciseBetType to RouletteBetType enum
export function toRouletteBetType(betType: ExerciseBetType): RouletteBetType {
  const mapping: Record<ExerciseBetType, RouletteBetType> = {
    STRAIGHT: RouletteBetType.STRAIGHT,
    SPLIT: RouletteBetType.SPLIT,
    CORNER: RouletteBetType.CORNER,
    STREET: RouletteBetType.STREET,
    LINE: RouletteBetType.LINE,
  };
  return mapping[betType];
}

export interface Bet {
  type: BetType;
  numbers: RouletteNumber[];
  chips: number;
  payout: number;
}
