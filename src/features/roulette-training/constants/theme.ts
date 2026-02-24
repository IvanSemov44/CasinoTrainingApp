/**
 * Roulette training feature theme - re-exports from centralized styles.
 * This file provides backward compatibility for existing imports.
 */
import { COLORS as CENTRALIZED_COLORS, colorWithOpacity } from '@styles/colors';
import { 
  SPACING as CENTRALIZED_SPACING, 
  BORDER_RADIUS, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  LAYOUT, 
  ANIMATION 
} from '@styles/spacing';

// Re-export from centralized styles
export { colorWithOpacity, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, LAYOUT, ANIMATION };
export const COLORS = CENTRALIZED_COLORS;
export const SPACING = CENTRALIZED_SPACING;

// Feature-specific typography and border aliases for backward compatibility
export const TYPOGRAPHY = {
  fontSize: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 48,
  },
  lineHeight: {
    tight: 20,
    normal: 22,
  },
} as const;

export const BORDERS = {
  width: {
    thin: 1,
    medium: 2,
  },
  radius: {
    sm: 8,
    md: 10,
  },
} as const;

// Type for accessing theme values with autocomplete
export type ColorPath = typeof COLORS;
export type SpacingValue = typeof SPACING[keyof typeof SPACING];
export type FontSize = typeof TYPOGRAPHY.fontSize[keyof typeof TYPOGRAPHY.fontSize];
export type BorderRadius = typeof BORDERS.radius[keyof typeof BORDERS.radius];
