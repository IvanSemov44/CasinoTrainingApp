// Roulette bet types and game data structures

export type RouletteNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36;

export enum BetType {
  STRAIGHT = 'STRAIGHT',           // Single number (35:1)
  SPLIT = 'SPLIT',                 // Two adjacent numbers (17:1)
  STREET = 'STREET',               // Three numbers in a row (11:1)
  CORNER = 'CORNER',               // Four numbers (8:1)
  LINE = 'LINE',                   // Six numbers (5:1)
  DOZEN = 'DOZEN',                 // 12 numbers (2:1)
  COLUMN = 'COLUMN',               // 12 numbers (2:1)
  RED_BLACK = 'RED_BLACK',         // 18 numbers (1:1)
  EVEN_ODD = 'EVEN_ODD',           // 18 numbers (1:1)
  HIGH_LOW = 'HIGH_LOW',           // 18 numbers (1:1)
  // Racetrack bets
  VOISINS = 'VOISINS',             // Neighbors of zero
  TIERS = 'TIERS',                 // Third of the wheel
  ORPHELINS = 'ORPHELINS',         // Orphans
  ZERO_GAME = 'ZERO_GAME',         // Zero game
  NEIGHBOR = 'NEIGHBOR',           // Number + neighbors
}

export interface Bet {
  id: string;
  type: BetType;
  numbers: RouletteNumber[];
  amount: number;
  payout: number;
}

export interface PlacedBet extends Bet {
  timestamp: number;
  isCorrect?: boolean;
}

export interface ExerciseResult {
  exerciseType: ExerciseType;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  timestamp: number;
}

export enum ExerciseType {
  ROULETTE_LAYOUT = 'ROULETTE_LAYOUT',
  CHIP_PLACEMENT = 'CHIP_PLACEMENT',
  PAYOUT_CALCULATION = 'PAYOUT_CALCULATION',
  SPLIT_CALCULATION = 'SPLIT_CALCULATION',
  STREET_CALCULATION = 'STREET_CALCULATION',
  CORNER_CALCULATION = 'CORNER_CALCULATION',
  SIXLINE_CALCULATION = 'SIXLINE_CALCULATION',
  MIXED_CALCULATION = 'MIXED_CALCULATION',
  TRIPLE_MIXED_CALCULATION = 'TRIPLE_MIXED_CALCULATION',
  ALL_POSITIONS_CALCULATION = 'ALL_POSITIONS_CALCULATION',
  CASH_HANDLING = 'CASH_HANDLING',
  CASH_HANDLING_TWO_DOLLAR = 'CASH_HANDLING_TWO_DOLLAR',
  CASH_HANDLING_FIVE_DOLLAR = 'CASH_HANDLING_FIVE_DOLLAR',
  BET_RECOGNITION = 'BET_RECOGNITION',
  SPEED_DRILL = 'SPEED_DRILL',
  NEIGHBOR_BETS = 'NEIGHBOR_BETS',
  SECTOR_BETS = 'SECTOR_BETS',
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // in seconds
}

export interface UserProgress {
  userId?: string;
  exerciseResults: ExerciseResult[];
  totalScore: number;
  lastUpdated: number;
}

export interface ChipValue {
  value: number;
  color: string;
}

export interface RouletteState {
  placedBets: PlacedBet[];
  selectedChipValue: number;
  currentExercise: Exercise | null;
  exerciseResults: ExerciseResult[];
}
