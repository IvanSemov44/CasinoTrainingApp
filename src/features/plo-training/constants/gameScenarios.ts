/**
 * PLO Game Training Scenarios
 * One hand from preflop through turn showing pot calculation progression
 * 
 * Difficulty levels:
 * - easy: Preflop only (communityCards: 0)
 * - medium: Easy + Flop (communityCards: 0-3)
 * - advanced: Medium + Turn and River (communityCards: 0-5)
 */

import type { PLODifficulty } from '../types';

export interface PlayerScenario {
  position: number;
  name: string;
  chipAmount: number;
  isDealer: boolean;
  isFolded?: boolean;
  isRequesting?: boolean;
  betAmount?: number;
}

export interface GameScenario {
  players: PlayerScenario[];
  potAmount: number;
  communityCards: number;
  correctAnswer: number;
  explanation: string;
  difficulty: PLODifficulty;
}

export const GAME_SCENARIOS: GameScenario[] = [
  {
    // Question 1: Preflop - UTG asks pot after blinds
    difficulty: 'easy',
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 2 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, betAmount: 1 },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true },
    ],
    potAmount: 0,
    communityCards: 0,
    correctAnswer: 7,
    explanation: 'Preflop:\nDead Money: $1 (SB)\nLast Action: $2 (BB)\nPot = $1 + 3×$2 = $7'
  },
  {
    // Question 2: UTG raises to $7, MP asks pot
    difficulty: 'easy',
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isRequesting: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, betAmount: 7 },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 2 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, betAmount: 1 },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true },
    ],
    potAmount: 0,
    communityCards: 0,
    correctAnswer: 24,
    explanation: 'Preflop:\nDead Money: $3 (SB $1 + BB $2)\nLast Action: $7 (UTG)\nPot = $3 + 3×$7 = $24'
  },
  {
    // Question 3: Preflop ends - MP raised to $24, CO/D/SB fold, BB and UTG call. Pot = $73 goes to center
    // FLOP: BB bets $50, UTG asks pot
    difficulty: 'medium',
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 50 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 73,
    communityCards: 3,
    correctAnswer: 223,
    explanation: 'FLOP: BB bets $50\nPot in center: $73 (from preflop: SB $1 + MP $24 + UTG $24 + BB $24)\nLast Action: $50 (BB bet)\nPot = $73 + 3×$50 = $223'
  },
  {
    // Question 4: UTG raises to $223, MP folds, BB asks pot
    difficulty: 'medium',
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isFolded: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, betAmount: 223 },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 50, isRequesting: true },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 73,
    communityCards: 3,
    correctAnswer: 742,
    explanation: 'FLOP: UTG raises to $223\nPot in center: $123 ($73 preflop + BB $50)\nLast Action: $223 (UTG raise)\nBB has $50 in front\nPot = $123 + 3×$223 - $50 = $742'
  },
  {
    // Question 5: BB raises $742, UTG calls $519 more. Flop betting ends. Pot = $73 + $223 + $742 + $519 = $1,557 goes to center
    // TURN: BB bets $120, UTG asks pot
    difficulty: 'advanced',
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isFolded: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 120 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 1557,
    communityCards: 4,
    correctAnswer: 1917,
    explanation: 'TURN: BB bets $120\nPot in center: $1,557 ($73 preflop + $223 UTG + $742 BB + $519 UTG call on flop)\nLast Action: $120 (BB bet)\nPot = $1,557 + 3×$120 = $1,917'
  }
];

/**
 * Get scenarios filtered by difficulty level
 * - easy: Only preflop scenarios (communityCards: 0)
 * - medium: Easy + flop scenarios (communityCards: 0-3)
 * - advanced: All scenarios including turn and river
 */
export function getScenariosByDifficulty(difficulty: PLODifficulty): GameScenario[] {
  switch (difficulty) {
    case 'easy':
      return GAME_SCENARIOS.filter(s => s.difficulty === 'easy');
    case 'medium':
      return GAME_SCENARIOS.filter(s => s.difficulty === 'easy' || s.difficulty === 'medium');
    case 'advanced':
      return GAME_SCENARIOS;
  }
}

/**
 * Get difficulty display info
 */
export const DIFFICULTY_INFO: Record<PLODifficulty, { label: string; description: string; icon: string }> = {
  easy: {
    label: 'Easy',
    description: 'Preflop only - Learn the basics of pot calculation',
    icon: '🌱',
  },
  medium: {
    label: 'Medium',
    description: 'Preflop + Flop - Practice multi-street scenarios',
    icon: '🌿',
  },
  advanced: {
    label: 'Advanced',
    description: 'All streets - Master complex pot calculations',
    icon: '🌳',
  },
};
