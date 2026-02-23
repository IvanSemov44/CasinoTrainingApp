/**
 * Centralized color constants for the Casino Training App.
 * Using consistent colors across all components ensures visual coherence.
 */
export const COLORS = {
  // Background colors - casino green theme
  background: {
    /** Primary dark green background */
    primary: '#0a2f1f',
    /** Secondary green for headers and cards */
    secondary: '#0f4f2f',
    /** Tertiary green for inputs and dropdowns */
    tertiary: '#1a5f3f',
    /** Lighter tertiary variant */
    tertiaryLight: '#1a6f4f',
    /** Overlay for modals */
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Text colors
  text: {
    /** Primary white text */
    primary: '#FFFFFF',
    /** Secondary gray text */
    secondary: '#CCCCCC',
    /** Muted text */
    muted: '#AAAAAA',
    /** Placeholder text */
    placeholder: '#888888',
    /** Gold accent text */
    gold: '#FFD700',
  },

  // Border colors
  border: {
    /** Primary green border */
    primary: '#2a7f4f',
    /** Darker green border */
    primaryDark: '#2a5f3f',
    /** Gold accent border */
    gold: '#FFD700',
  },

  // Status colors
  status: {
    /** Success green */
    success: '#4CAF50',
    /** Error red */
    error: '#ef4444',
    /** Warning yellow */
    warning: '#eab308',
    /** Info blue */
    info: '#3b82f6',
  },

  // Chip colors for roulette
  chips: {
    white: '#FFFFFF',
    yellow: '#FFD700',
    red: '#DC2626',
    blue: '#2563EB',
    green: '#16A34A',
    black: '#1F2937',
    purple: '#9333EA',
    orange: '#EA580C',
  },

  // Roulette wheel colors
  roulette: {
    red: '#DC2626',
    black: '#1F2937',
    green: '#16A34A',
  },
} as const;

/**
 * Helper function to get a color with opacity
 * @param color - Hex color string (e.g., '#FFD700')
 * @param opacity - Opacity value between 0 and 1
 * @returns RGBA color string
 */
export function colorWithOpacity(color: string, opacity: number): string {
  // Remove # if present
  const hex = color.replace('#', '');
  
  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
