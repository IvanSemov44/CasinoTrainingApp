import { Position } from '../types';

// Position order at the table
export const POSITIONS: Position[] = ['SB', 'BB', 'UTG', 'MP', 'CO', 'D'];

// Position names for display
export const POSITION_NAMES: Record<Position, string> = {
  SB: 'Small Blind',
  BB: 'Big Blind',
  UTG: 'Under the Gun',
  MP: 'Middle Position',
  CO: 'Cut Off',
  D: 'Dealer',
};

// Common blind levels
export const BLIND_LEVELS = [
  { sb: 1, bb: 2 },
  { sb: 2, bb: 5 },
  { sb: 5, bb: 10 },
  { sb: 10, bb: 20 },
  { sb: 25, bb: 50 },
  { sb: 50, bb: 100 },
];

// Training configuration
export const TRAINING_CONFIG = {
  minActions: 2,
  maxActions: 4,
  minBetMultiplier: 2,
  maxBetMultiplier: 5,
};
