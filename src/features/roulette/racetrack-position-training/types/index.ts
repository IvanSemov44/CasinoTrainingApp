/**
 * Racetrack Position Training Types
 */

export type PositionMode = 'single' | 'random';

export interface PositionValidationResult {
  isCorrect: boolean;
  correctNumber: number;
  userNumber: number | null;
  winningNumber: number;
  score: number;
}

export interface TrainingStats {
  correct: number;
  total: number;
}

export interface WheelPosition {
  number: number;
  position: number; // 0-36, position in wheel order
}
