/**
 * Shared styles module for the Casino Training App.
 * 
 * This module provides centralized styling constants and shared style definitions
 * to ensure visual consistency across all components.
 * 
 * @example
 * import { COLORS, SPACING, sharedStyles } from '@styles';
 * 
 * // Using colors
 * const backgroundColor = COLORS.background.primary;
 * 
 * // Using shared styles
 * <View style={sharedStyles.container}>
 *   <Text style={sharedStyles.title}>Hello</Text>
 * </View>
 */

// Color constants
export { COLORS, colorWithOpacity } from './colors';

// Spacing and layout constants
export { 
  SPACING, 
  BORDER_RADIUS, 
  FONT_SIZE, 
  FONT_WEIGHT, 
  LAYOUT,
  ANIMATION,
} from './spacing';

// Shared style definitions
export { sharedStyles, stylePresets } from './shared.styles';
