import type { ViewStyle } from 'react-native';
import type { AppColors } from './themes';

/**
 * Shared container style patterns used across components
 * These are factory functions that accept colors to generate themed container styles
 */

export const createContainerStyles = (colors: AppColors) => ({
  /**
   * Secondary card - used for info sections, instruction boxes, reference cards
   * Background: Secondary, Border radius: 12px, Padding: 16px, Border: Primary
   */
  secondaryCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.primary,
  } as ViewStyle,

  /**
   * Secondary panel - similar to secondary card but with larger padding
   * Background: Secondary, Border radius: 12px, Padding: 24px
   */
  secondaryPanel: {
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    padding: 24,
  } as ViewStyle,

  /**
   * Roulette section card - used in roulette training components
   * Background: Secondary, Border radius: 10px, Padding: 16px
   */
  rouletteCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: 10,
    padding: 16,
  } as ViewStyle,
});

export type ContainerStyles = ReturnType<typeof createContainerStyles>;
