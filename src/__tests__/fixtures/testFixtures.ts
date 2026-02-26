/**
 * Shared test fixtures for Casino Training App tests
 * 
 * This file contains reusable test data to reduce duplication across test files.
 * Import from this file instead of defining mock data inline.
 */

import { DropdownItem } from '../../components/shared/DropdownSelector';
import { RouletteNumber } from '../../types/roulette.types';

// ============================================================
// Dropdown Selector Fixtures
// ============================================================

/**
 * Standard difficulty items for dropdown selectors
 */
export const DIFFICULTY_DROPDOWN_ITEMS: DropdownItem[] = [
  { key: 'easy', label: 'Easy', icon: '🟢', extraInfo: 'Max $50' },
  { key: 'medium', label: 'Medium', icon: '🟡', extraInfo: 'Max $100' },
  { key: 'hard', label: 'Hard', icon: '🔴', extraInfo: 'Max $200' },
];

/**
 * Minimal dropdown items without icons or extra info
 */
export const MINIMAL_DROPDOWN_ITEMS: DropdownItem[] = [
  { key: 'option1', label: 'Option 1' },
  { key: 'option2', label: 'Option 2' },
  { key: 'option3', label: 'Option 3' },
];

/**
 * Empty dropdown items array for edge case testing
 */
export const EMPTY_DROPDOWN_ITEMS: DropdownItem[] = [];

// ============================================================
// Roulette Constants Fixtures
// ============================================================

/**
 * Column numbers based on LAYOUT_GRID from roulette.constants.ts
 */
export const ROULETTE_COLUMNS = {
  FIRST_COLUMN: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36] as RouletteNumber[],
  SECOND_COLUMN: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35] as RouletteNumber[],
  THIRD_COLUMN: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34] as RouletteNumber[],
};

/**
 * Dozen numbers for outside bets
 */
export const ROULETTE_DOZENS = {
  FIRST_DOZEN: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as RouletteNumber[],
  SECOND_DOZEN: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24] as RouletteNumber[],
  THIRD_DOZEN: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] as RouletteNumber[],
};

/**
 * Even money bet numbers
 */
export const ROULETTE_EVEN_MONEY = {
  LOW_NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as RouletteNumber[],
  HIGH_NUMBERS: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] as RouletteNumber[],
  EVEN_NUMBERS: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36] as RouletteNumber[],
  ODD_NUMBERS: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35] as RouletteNumber[],
  RED_NUMBERS: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36] as RouletteNumber[],
  BLACK_NUMBERS: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35] as RouletteNumber[],
};

/**
 * Standard chip values for testing
 */
export const CHIP_VALUES = {
  SMALL: 1,
  STANDARD: 5,
  MEDIUM: 10,
  LARGE: 25,
  HIGH: 100,
  VERY_HIGH: 500,
  MAX: 1000,
};

/**
 * Common cell sizes for roulette layout testing
 */
export const CELL_SIZES = {
  SMALL: 30,
  STANDARD: 40,
  LARGE: 50,
  EXTRA_LARGE: 60,
};

// ============================================================
// Mock Callback Factories
// ============================================================

/**
 * Creates a mock bet amount getter that returns a fixed amount
 */
export const createMockGetBetAmount = (amount: number = 0) => jest.fn(() => amount);

/**
 * Creates a mock callback that can be used for press handlers
 */
export const createMockPressHandler = () => jest.fn();

/**
 * Creates mock props for RouletteNumberCell component
 */
export const createMockRouletteNumberCellProps = (overrides = {}) => ({
  number: 5 as RouletteNumber,
  cellSize: CELL_SIZES.STANDARD,
  betAmount: 0,
  onNumberPress: createMockPressHandler(),
  onBetAreaPress: createMockPressHandler(),
  ...overrides,
});

/**
 * Creates mock props for DropdownSelector component
 */
export const createMockDropdownSelectorProps = (overrides = {}) => ({
  placeholder: 'Select difficulty...',
  items: DIFFICULTY_DROPDOWN_ITEMS,
  selectedKey: null,
  onSelect: createMockPressHandler(),
  showDropdown: false,
  onToggleDropdown: createMockPressHandler(),
  ...overrides,
});
