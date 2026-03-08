import type { TextStyle } from 'react-native';
import type { AppColors } from './themes';

/**
 * Shared text style patterns used across components
 * These are factory functions that accept colors to generate themed styles
 */

export const createTextStyles = (colors: AppColors) => ({
  /**
   * Gold title style - used for section headings, card titles
   * Size: 18px, Weight: 700, Color: Gold
   */
  goldTitle: {
    fontSize: 18,
    fontWeight: '700',
    color:colors.text.gold,
    marginBottom: 8,
  } as TextStyle,

  /**
   * Secondary text style - used for descriptions, body text
   * Size: 14px, Color: Secondary
   */
  secondaryText: {
    fontSize: 14,
    color: colors.text.secondary,
  } as TextStyle,

  /**
   * Stat badge text - used for score displays, point counters
   * Size: 17px, Weight: 700, Color: Gold
   */
  statBadge: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text.gold,
  } as TextStyle,

  /**
   * Muted label - used for small labels, hints
   * Size: 12px, Color: Muted, Uppercase, Letter spacing
   */
  mutedLabel: {
    fontSize: 12,
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  } as TextStyle,
});

export type TextStyles = ReturnType<typeof createTextStyles>;
