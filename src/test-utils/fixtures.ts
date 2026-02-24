/**
 * Test fixtures for Casino Training App tests
 * Provides reusable test data for all test files
 */

// ============================================
// Cash Conversion Training Fixtures
// ============================================

import { CashRequest, CashAnswer } from '@features/cash-conversion-training/types';

export const mockCashRequests: Record<string, CashRequest> = {
  simple: {
    cashAmount: 300,
    sector: 'tier',
    requestType: 'for-the-money',
  },
  withChange: {
    cashAmount: 350,
    sector: 'tier',
    requestType: 'for-the-money',
  },
  byAmount: {
    cashAmount: 500,
    sector: 'voisins',
    requestType: 'by-amount',
    specifiedAmount: 50,
  },
  easy: {
    cashAmount: 150,
    sector: 'tier',
    requestType: 'for-the-money',
  },
  medium: {
    cashAmount: 450,
    sector: 'voisins',
    requestType: 'for-the-money',
  },
  hard: {
    cashAmount: 1200,
    sector: 'orphelins',
    requestType: 'for-the-money',
  },
};

export const mockCashAnswers: Record<string, CashAnswer> = {
  correct: {
    totalBet: 300,
    betPerPosition: 50,
    change: 0,
  },
  withChange: {
    totalBet: 300,
    betPerPosition: 50,
    change: 50,
  },
  incorrect: {
    totalBet: 250,
    betPerPosition: 40,
    change: 100,
  },
};

// ============================================
// PLO Training Fixtures
// ============================================

import { PotRequest, PlayerAction } from '@features/plo-training/types';

export const mockPlayerActions: Record<string, PlayerAction[]> = {
  simpleBet: [
    { position: 'UTG', action: 'bet', amount: 10 },
  ],
  withRaise: [
    { position: 'UTG', action: 'bet', amount: 10 },
    { position: 'MP', action: 'raise', amount: 30 },
  ],
  withCalls: [
    { position: 'UTG', action: 'bet', amount: 10 },
    { position: 'MP', action: 'call', amount: 10 },
    { position: 'CO', action: 'call', amount: 10 },
  ],
  withFolds: [
    { position: 'UTG', action: 'fold' },
    { position: 'MP', action: 'bet', amount: 15 },
    { position: 'CO', action: 'fold' },
  ],
  complex: [
    { position: 'UTG', action: 'bet', amount: 10 },
    { position: 'MP', action: 'raise', amount: 30 },
    { position: 'CO', action: 'call', amount: 30 },
    { position: 'D', action: 'call', amount: 30 },
  ],
};

export const mockPotRequests: Record<string, PotRequest> = {
  simpleBet: {
    requestingPosition: 'BB',
    previousActions: mockPlayerActions.simpleBet,
    smallBlind: 1,
    bigBlind: 2,
  },
  withRaise: {
    requestingPosition: 'D',
    previousActions: mockPlayerActions.withRaise,
    smallBlind: 1,
    bigBlind: 2,
  },
  withCalls: {
    requestingPosition: 'D',
    previousActions: mockPlayerActions.withCalls,
    smallBlind: 1,
    bigBlind: 2,
  },
  withFolds: {
    requestingPosition: 'D',
    previousActions: mockPlayerActions.withFolds,
    smallBlind: 1,
    bigBlind: 2,
  },
  complex: {
    requestingPosition: 'BB',
    previousActions: mockPlayerActions.complex,
    smallBlind: 1,
    bigBlind: 2,
  },
};

// ============================================
// Roulette Training Fixtures
// ============================================

export const mockRouletteNumbers = {
  red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
  black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
  zero: [0],
  all: Array.from({ length: 37 }, (_, i) => i),
};

export const mockChipValues = [1, 5, 10, 25, 100, 500, 1000];

export const mockPayouts = {
  straightUp: 35,
  split: 17,
  street: 11,
  corner: 8,
  sixLine: 5,
  column: 2,
  dozen: 2,
  red: 1,
  black: 1,
  even: 1,
  odd: 1,
  low: 1,
  high: 1,
};

// ============================================
// Racetrack Fixtures
// ============================================

export const mockSectors = {
  tier: [6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26],
  voisins: [22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25],
  orphelins: [17, 34, 6, 1, 20, 14, 31, 9],
  zero: [0, 3, 12, 15, 26, 32, 35],
};

export const mockNeighborBets = {
  number0: [0, 32, 15, 19, 4],
  number17: [17, 25, 2, 21, 34],
  number32: [32, 0, 15, 19, 4],
};

// ============================================
// Navigation Fixtures
// ============================================

export const mockNavigationState = {
  index: 0,
  routes: [
    { name: 'Home', key: 'Home-0' },
    { name: 'RouletteTraining', key: 'RouletteTraining-1' },
    { name: 'CashConversion', key: 'CashConversion-2' },
    { name: 'PLOTraining', key: 'PLOTraining-3' },
    { name: 'CallBets', key: 'CallBets-4' },
  ],
};

// ============================================
// Difficulty Fixtures
// ============================================

export const mockDifficultySettings = {
  easy: {
    maxBetPerPosition: 50,
    timeLimit: null,
    hintsEnabled: true,
  },
  medium: {
    maxBetPerPosition: 100,
    timeLimit: 60,
    hintsEnabled: true,
  },
  hard: {
    maxBetPerPosition: 200,
    timeLimit: 30,
    hintsEnabled: false,
  },
};

// ============================================
// Exercise State Fixtures
// ============================================

export const mockExerciseState = {
  initial: {
    score: 0,
    currentExercise: 0,
    totalExercises: 10,
    correctAnswers: 0,
    incorrectAnswers: 0,
    isComplete: false,
  },
  inProgress: {
    score: 50,
    currentExercise: 5,
    totalExercises: 10,
    correctAnswers: 5,
    incorrectAnswers: 0,
    isComplete: false,
  },
  complete: {
    score: 80,
    currentExercise: 10,
    totalExercises: 10,
    correctAnswers: 8,
    incorrectAnswers: 2,
    isComplete: true,
  },
};
