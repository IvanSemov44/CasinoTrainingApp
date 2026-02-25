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

// PLO uses equal blinds: SB = BB
export const BLIND_LEVELS = [
  { sb: 2, bb: 2 },
  { sb: 5, bb: 5 },
  { sb: 10, bb: 10 },
];

// Training configuration
export const TRAINING_CONFIG = {
  minActions: 2,
  maxActions: 4,
  minBetMultiplier: 2,
  maxBetMultiplier: 5,
};
