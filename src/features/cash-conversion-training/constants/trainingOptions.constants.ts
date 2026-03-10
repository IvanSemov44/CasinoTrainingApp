/**
 * Configuration constants for cash conversion training
 * Defines difficulty levels, sector options, and exercise settings
 */

import type { DropdownItem } from '@components/shared';
import { SECTOR_POSITIONS, DIFFICULTY_MAX_BET } from './sectors';

/**
 * Difficulty level options for cash conversion exercises
 * Each level has a different maximum bet per position
 */
export const DIFFICULTY_OPTIONS: DropdownItem[] = [
  {
    key: 'easy',
    label: 'Easy',
    icon: '🟢',
    extraInfo: `Max $${DIFFICULTY_MAX_BET.easy} per position`,
  },
  {
    key: 'medium',
    label: 'Medium',
    icon: '🟡',
    extraInfo: `Max $${DIFFICULTY_MAX_BET.medium} per position`,
  },
  {
    key: 'hard',
    label: 'Hard',
    icon: '🔴',
    extraInfo: `Max $${DIFFICULTY_MAX_BET.hard} per position`,
  },
];

/**
 * Available sector types for cash conversion training
 * Each sector covers different roulette wheel positions
 */
export const SECTOR_OPTIONS: DropdownItem[] = [
  {
    key: 'tier',
    label: 'Tier',
    icon: '🎯',
    extraInfo: `${SECTOR_POSITIONS.tier} positions`,
  },
  {
    key: 'orphelins',
    label: 'Orphelins',
    icon: '🎪',
    extraInfo: `${SECTOR_POSITIONS.orphelins} positions`,
  },
  {
    key: 'voisins',
    label: 'Voisins',
    icon: '🎭',
    extraInfo: `${SECTOR_POSITIONS.voisins} positions`,
  },
  {
    key: 'zero',
    label: 'Zero',
    icon: '⭕',
    extraInfo: `${SECTOR_POSITIONS.zero} positions`,
  },
  {
    key: 'neighbors',
    label: 'Neighbors',
    icon: '👥',
    extraInfo: `${SECTOR_POSITIONS.neighbors} positions`,
  },
  {
    key: 'random',
    label: 'Random',
    icon: '🎲',
    extraInfo: 'Random sector',
  },
];

/**
 * Available exercise count options
 * Determines the number of questions in a training session
 */
export const EXERCISE_COUNT_OPTIONS = [5, 10, 15, 20, 25, 30];
