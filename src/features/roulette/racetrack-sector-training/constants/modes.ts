import { SectorMode } from '../types';

export interface SectorModeOption {
  mode: SectorMode;
  title: string;
  description: string;
  color: string;
}

// Accent colors for racetrack sectors - visual hierarchy indicators
export const SECTOR_ACCENT_COLORS: Record<SectorMode, string> = {
  voisins: '#3b82f6', // Blue
  tier: '#ef4444', // Red
  orphelins: '#f59e0b', // Amber
  zero: '#8b5cf6', // Purple
  random: '#10b981', // Green
};

export const SECTOR_MODE_OPTIONS: SectorModeOption[] = [
  {
    mode: 'voisins',
    title: 'Voisins du Zéro',
    description: '17 numbers: 0, 2, 3, 4, 7, 12, 15, 18, 19, 21, 22, 25, 26, 28, 29, 32, 35',
    color: SECTOR_ACCENT_COLORS.voisins,
  },
  {
    mode: 'tier',
    title: 'Tier du Cylindre',
    description: '12 numbers: 5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36',
    color: SECTOR_ACCENT_COLORS.tier,
  },
  {
    mode: 'orphelins',
    title: 'Orphelins',
    description: '8 numbers: 1, 6, 9, 14, 17, 20, 31, 34',
    color: SECTOR_ACCENT_COLORS.orphelins,
  },
  {
    mode: 'zero',
    title: 'Jeu Zéro',
    description: '7 numbers: 0, 3, 12, 15, 26, 32, 35',
    color: SECTOR_ACCENT_COLORS.zero,
  },
  {
    mode: 'random',
    title: 'Random Training',
    description: 'Practice all sectors randomly',
    color: SECTOR_ACCENT_COLORS.random,
  },
];
