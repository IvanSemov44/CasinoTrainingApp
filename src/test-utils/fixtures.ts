/**
 * Test fixtures for Casino Training App tests
 * Use these to create consistent test data across all tests
 */

import { CashRequest, CashAnswer } from '../features/cash-conversion-training/types';
import { PotRequest, Position, PlayerAction } from '../features/plo-training/types';
import { BetType, RouletteNumber } from '../types/roulette.types';

// ============================================
// Cash Conversion Fixtures
// ============================================

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
  voisins: {
    cashAmount: 450,
    sector: 'voisins',
    requestType: 'for-the-money',
  },
  orphelins: {
    cashAmount: 250,
    sector: 'orphelins',
    requestType: 'for-the-money',
  },
  zero: {
    cashAmount: 200,
    sector: 'zero',
    requestType: 'for-the-money',
  },
  neighbors: {
    cashAmount: 250,
    sector: 'neighbors',
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
    change: 50,
  },
};

// ============================================
// PLO (Pot Limit Omaha) Fixtures
// ============================================

export const mockPotRequests: Record<string, PotRequest> = {
  simpleBet: {
    requestingPosition: 'BB',
    previousActions: [
      { position: 'UTG', action: 'bet', amount: 10 },
    ],
    smallBlind: 1,
    bigBlind: 2,
  },
  withRaise: {
    requestingPosition: 'D',
    previousActions: [
      { position: 'UTG', action: 'bet', amount: 10 },
      { position: 'MP', action: 'raise', amount: 30 },
    ],
    smallBlind: 1,
    bigBlind: 2,
  },
  multiWay: {
    requestingPosition: 'CO',
    previousActions: [
      { position: 'UTG', action: 'call', amount: 2 },
      { position: 'MP', action: 'call', amount: 2 },
      { position: 'CO', action: 'raise', amount: 8 },
    ],
    smallBlind: 1,
    bigBlind: 2,
  },
  withFolds: {
    requestingPosition: 'BB',
    previousActions: [
      { position: 'UTG', action: 'fold', amount: 0 },
      { position: 'MP', action: 'bet', amount: 5 },
      { position: 'CO', action: 'call', amount: 5 },
    ],
    smallBlind: 1,
    bigBlind: 2,
  },
};

// ============================================
// Roulette Fixtures
// ============================================

export const mockChipValues = [1, 5, 10, 25, 100, 500, 1000];

export const mockRouletteNumbers = {
  all: Array.from({ length: 37 }, (_, i) => i as RouletteNumber), // 0-36
  red: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36] as RouletteNumber[],
  black: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35] as RouletteNumber[],
  zero: [0] as RouletteNumber[],
};

export const mockBetTypes: BetType[] = [
  BetType.STRAIGHT,
  BetType.SPLIT,
  BetType.STREET,
  BetType.CORNER,
  BetType.LINE,
  BetType.DOZEN,
  BetType.COLUMN,
  BetType.RED_BLACK,
  BetType.EVEN_ODD,
  BetType.HIGH_LOW,
  BetType.VOISINS,
  BetType.TIERS,
  BetType.ORPHELINS,
  BetType.ZERO_GAME,
  BetType.NEIGHBOR,
];

export const mockPayouts: Partial<Record<BetType, number>> = {
  [BetType.STRAIGHT]: 35,
  [BetType.SPLIT]: 17,
  [BetType.STREET]: 11,
  [BetType.CORNER]: 8,
  [BetType.LINE]: 5,
  [BetType.DOZEN]: 2,
  [BetType.COLUMN]: 2,
  [BetType.RED_BLACK]: 1,
  [BetType.EVEN_ODD]: 1,
  [BetType.HIGH_LOW]: 1,
};

// ============================================
// Racetrack Fixtures
// ============================================

export const mockRacetrackSectors = {
  tier: [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33] as RouletteNumber[],
  voisins: [22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25] as RouletteNumber[],
  orphelins: [17, 34, 6, 1, 20, 14, 31, 9] as RouletteNumber[],
  zero: [12, 35, 3, 26, 0, 32, 15] as RouletteNumber[],
};

// ============================================
// Difficulty Settings
// ============================================

export const mockDifficultySettings = {
  easy: {
    maxBetPerPosition: 50,
    maxChange: 100,
  },
  medium: {
    maxBetPerPosition: 100,
    maxChange: 150,
  },
  hard: {
    maxBetPerPosition: 200,
    maxChange: 250,
  },
};

// ============================================
// Position Mappings (PLO)
// ============================================

export const mockPositions: Position[] = ['UTG', 'MP', 'CO', 'D', 'SB', 'BB'];

export const mockPositionNames: Record<Position, string> = {
  UTG: 'Under the Gun',
  MP: 'Middle Position',
  CO: 'Cutoff',
  D: 'Dealer',
  SB: 'Small Blind',
  BB: 'Big Blind',
};
