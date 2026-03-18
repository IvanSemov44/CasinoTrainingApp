import { SectorType } from '../types';
import { DIFFICULTY_MAX_BET as CENTRAL_MAX_BET } from '@constants/difficulty';
import { SECTOR_NAMES } from '@constants/sectors';

export { CENTRAL_MAX_BET as DIFFICULTY_MAX_BET, SECTOR_NAMES };

export const SECTOR_POSITIONS: Record<Exclude<SectorType, 'random'>, number> = {
  tier: 6,
  orphelins: 5,
  voisins: 9,
  zero: 4,
  neighbors: 5,
};

export const MIN_BET_PER_POSITION = 5;
export const BET_INCREMENT = 5;
