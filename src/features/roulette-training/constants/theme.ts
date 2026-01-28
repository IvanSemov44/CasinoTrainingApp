// Centralized color theme for roulette training feature
export const COLORS = {
  // Background colors
  background: {
    primary: '#0a2f1f',      // Dark green (main background)
    secondary: '#1a5f3f',    // Medium green (cards, sections)
    tertiary: '#0f4f2f',     // Darker green (hover states)
    dark: '#000',            // Pure black
    darkGray: '#1a1a1a',     // Dark gray
    mediumGray: '#2a2a2a',   // Medium gray
    hint: '#2a4f3f',         // Hint background
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',      // White
    secondary: '#CCCCCC',    // Light gray
    gold: '#FFD700',         // Gold (headers, highlights)
  },
  
  // Border colors
  border: {
    primary: '#2a7f4f',      // Green border
    gold: '#FFD700',         // Gold border
    hint: '#3a6f5f',         // Hint border
  },
  
  // Status colors
  status: {
    success: '#4CAF50',      // Green (correct answer)
    successAlt: '#2d5f2d',   // Dark green
    error: '#CC0000',        // Red (incorrect)
    errorAlt: '#5f2d2d',     // Dark red
    errorBorder: '#FF0000',  // Bright red border
  },
  
  // Difficulty badge colors
  difficulty: {
    easy: '#4CAF50',         // Green
    medium: '#FF9800',       // Orange
    hard: '#F44336',         // Red
  },
} as const;

// Spacing constants for consistent margins and padding
export const SPACING = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 25,
} as const;

// Typography constants for consistent font sizes
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

// Border constants
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
