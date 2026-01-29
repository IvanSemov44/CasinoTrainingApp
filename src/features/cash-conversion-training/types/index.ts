export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type SectorType = 'tier' | 'orphelins' | 'voisins' | 'zero' | 'neighbors' | 'random';

export type RequestType = 'for-the-money' | 'by-amount';

export interface CashRequest {
  cashAmount: number;
  sector: Exclude<SectorType, 'random'>;
  requestType: RequestType;
  specifiedAmount?: number; // Only for 'by-amount' requests
}

export interface CashAnswer {
  totalBet: number;
  change: number;
}

export interface ValidationResult {
  isCorrect: boolean;
  correctTotalBet: number;
  correctChange: number;
  userTotalBet: number;
  userChange: number;
  correctBetPerPosition: number;
}
