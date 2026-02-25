/**
 * PLO Game Training Scenarios
 * One hand from preflop through turn showing pot calculation progression
 * 
 * Note: In this game, Small Blind = Big Blind (equal blinds)
 * Blinds can be: 2/2, 5/5, 10/10
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
  blindLevel: number; // Both SB and BB are equal to this value
}

export const GAME_SCENARIOS: GameScenario[] = [
  {
    // Question 1: Preflop - UTG asks pot after blinds (2/2 game)
    difficulty: 'easy',
    blindLevel: 2,
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 2 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, betAmount: 2 },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true },
    ],
    potAmount: 0,
    communityCards: 0,
    correctAnswer: 8,
    explanation: 'Preflop (2/2 blinds):\nDead Money: $2 (SB)\nLast Action: $2 (BB)\nPot = $2 + 3×$2 = $8'
  },
  {
    // Question 2: UTG raises to $8 (pot), MP asks pot
    difficulty: 'easy',
    blindLevel: 2,
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isRequesting: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, betAmount: 8 },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 2 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, betAmount: 2 },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true },
    ],
    potAmount: 0,
    communityCards: 0,
    correctAnswer: 28,
    explanation: 'Preflop (2/2 blinds):\nDead Money: $4 (SB $2 + BB $2)\nLast Action: $8 (UTG pot raise)\nPot = $4 + 3×$8 = $28'
  },
  {
    // Question 3: Preflop ends - MP raised to $28, CO/D/SB fold, BB and UTG call
    // Pot = $86 goes to center
    // FLOP: BB bets $50, UTG asks pot
    difficulty: 'medium',
    blindLevel: 2,
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 50 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 86,
    communityCards: 3,
    correctAnswer: 236,
    explanation: 'FLOP: BB bets $50\nPot in center: $86 (from preflop: SB $2 + MP $28 + UTG $28 + BB $28)\nLast Action: $50 (BB bet)\nPot = $86 + 3×$50 = $236'
  },
  {
    // Question 4: UTG raises to $236, MP folds, BB asks pot
    difficulty: 'medium',
    blindLevel: 2,
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isFolded: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, betAmount: 236 },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 50, isRequesting: true },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 86,
    communityCards: 3,
    correctAnswer: 794,
    explanation: 'FLOP: UTG raises to $236\nPot in center: $136 ($86 preflop + BB $50)\nLast Action: $236 (UTG raise)\nBB has $50 in front\nPot = $136 + 3×$236 - $50 = $794'
  },
  {
    // Question 5: BB raises $794, UTG calls $558 more. Flop betting ends.
    // Pot = $86 + $236 + $794 + $558 = $1,674 goes to center
    // TURN: BB bets $120, UTG asks pot
    difficulty: 'advanced',
    blindLevel: 2,
    players: [
      { position: 1, name: 'CO', chipAmount: 300, isDealer: false, isFolded: true },
      { position: 2, name: 'MP', chipAmount: 280, isDealer: false, isFolded: true },
      { position: 3, name: 'UTG', chipAmount: 350, isDealer: false, isRequesting: true },
      { position: 4, name: 'BB', chipAmount: 288, isDealer: false, betAmount: 120 },
      { position: 5, name: 'SB', chipAmount: 309, isDealer: false, isFolded: true },
      { position: 6, name: 'D', chipAmount: 290, isDealer: true, isFolded: true },
    ],
    potAmount: 1674,
    communityCards: 4,
    correctAnswer: 2034,
    explanation: 'TURN: BB bets $120\nPot in center: $1,674 ($86 preflop + $236 UTG + $794 BB + $558 UTG call on flop)\nLast Action: $120 (BB bet)\nPot = $1,674 + 3×$120 = $2,034'
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

/**
 * Available blind levels (SB = BB)
 */
export const BLIND_LEVELS = [2, 5, 10] as const;
export type BlindLevel = typeof BLIND_LEVELS[number];
