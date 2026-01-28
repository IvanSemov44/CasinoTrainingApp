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

// Type for accessing color values with autocomplete
export type ColorPath = typeof COLORS;
