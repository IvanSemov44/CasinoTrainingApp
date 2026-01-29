import { SectorType } from '../types';

export const SECTOR_POSITIONS: Record<Exclude<SectorType, 'random'>, number> = {
  tier: 6,
  orphelins: 5,
  voisins: 9,
  zero: 4,
  neighbors: 5,
};

export const SECTOR_NAMES: Record<Exclude<SectorType, 'random'>, string> = {
  tier: 'Tier',
  orphelins: 'Orphelins',
  voisins: 'Voisins',
  zero: 'Zero',
  neighbors: 'Neighbors',
};

export const DIFFICULTY_MAX_BET: Record<string, number> = {
  easy: 50,
  medium: 100,
  hard: 200,
};

export const MIN_BET_PER_POSITION = 5;
export const BET_INCREMENT = 5;
