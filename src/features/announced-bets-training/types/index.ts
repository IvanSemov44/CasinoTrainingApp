export type AnnouncedBetMode = 'tier' | 'orphelins' | 'voisins' | 'zero' | 'random';

export interface ValidationResult {
  isCorrect: boolean;
  correctBets: Array<{ type: string; numbers: number[] }>;
  userBets: Array<{ type: string; numbers: number[] }>;
  missingBets: Array<{ type: string; numbers: number[] }>;
  extraBets: Array<{ type: string; numbers: number[] }>;
  score: number;
}
