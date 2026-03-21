/**
 * Racetrack Sector Training Types
 */

export type SectorType = 'tier' | 'orphelins' | 'voisins' | 'zero';

export type SectorMode = SectorType | 'random';

export interface SectorValidationResult {
  isCorrect: boolean;
  correctSector: SectorType;
  userSector: SectorType | null;
  winningNumber: number;
  score: number;
}

export interface TrainingStats {
  correct: number;
  total: number;
}

export interface SectorOption {
  sector: SectorType;
  name: string;
  description: string;
  numbers: number[];
}
