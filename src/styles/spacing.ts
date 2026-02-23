/**
 * Spacing and layout constants for consistent styling across the app.
 * Using standardized spacing values ensures visual consistency.
 */
export const SPACING = {
  /** Extra small - 4px */
  xs: 4,
  /** Small - 8px */
  sm: 8,
  /** Medium - 12px */
  md: 12,
  /** Large - 16px */
  lg: 16,
  /** Extra large - 20px */
  xl: 20,
  /** Extra extra large - 24px */
  xxl: 24,
  /** 32px */
  xxxl: 32,
} as const;

/**
 * Border radius values for consistent rounded corners
 */
export const BORDER_RADIUS = {
  /** Small radius - 8px */
  sm: 8,
  /** Medium radius - 10px */
  md: 10,
  /** Large radius - 12px */
  lg: 12,
  /** Extra large radius - 16px */
  xl: 16,
  /** Full/circular radius */
  full: 9999,
} as const;

/**
 * Font size values for consistent typography
 */
export const FONT_SIZE = {
  /** Extra small - 10px */
  xs: 10,
  /** Small - 12px */
  sm: 12,
  /** Medium - 14px */
  md: 14,
  /** Regular - 15px */
  regular: 15,
  /** Large - 16px */
  lg: 16,
  /** Extra large - 18px */
  xl: 18,
  /** Heading 2 - 20px */
  h2: 20,
  /** Heading 1 - 22px */
  h1: 22,
  /** Title - 28px */
  title: 28,
} as const;

/**
 * Font weight values
 */
export const FONT_WEIGHT = {
  /** Regular weight */
  regular: '400' as const,
  /** Medium weight */
  medium: '500' as const,
  /** Semi-bold weight */
  semiBold: '600' as const,
  /** Bold weight */
  bold: '700' as const,
} as const;

/**
 * Common layout dimensions
 */
export const LAYOUT = {
  /** Standard button height */
  buttonHeight: 48,
  /** Small button height */
  buttonHeightSm: 40,
  /** Input field height */
  inputHeight: 48,
  /** Icon size small */
  iconSm: 16,
  /** Icon size medium */
  iconMd: 20,
  /** Icon size large */
  iconLg: 24,
  /** Icon size extra large */
  iconXl: 32,
  /** Modal max width on larger screens */
  modalMaxWidth: 500,
  /** Step number circle size */
  stepNumberSize: 28,
  /** Close button size */
  closeButtonSize: 36,
} as const;

/**
 * Animation durations in milliseconds
 */
export const ANIMATION = {
  /** Fast animation - 150ms */
  fast: 150,
  /** Normal animation - 200ms */
  normal: 200,
  /** Slow animation - 300ms */
  slow: 300,
  /** Spring animation friction */
  springFriction: 8,
  /** Spring animation tension */
  springTension: 65,
} as const;
