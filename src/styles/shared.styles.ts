import { StyleSheet } from 'react-native';
import { COLORS } from './colors';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, LAYOUT } from './spacing';

/**
 * Shared styles for common UI components.
 * These styles provide consistent appearance across the app.
 */
export const sharedStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },
  
  card: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.border.gold,
  },

  // Typography styles
  title: {
    fontSize: FONT_SIZE.title,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.gold,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },

  bodyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
  },

  label: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.muted,
  },

  // Button styles
  button: {
    backgroundColor: COLORS.status.success,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: LAYOUT.buttonHeight,
  },

  buttonSecondary: {
    backgroundColor: COLORS.background.tertiary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: LAYOUT.buttonHeight,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },

  buttonText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.primary,
  },

  buttonTextSecondary: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.text.primary,
  },

  // Input styles
  input: {
    backgroundColor: COLORS.background.tertiary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.regular,
    minHeight: LAYOUT.inputHeight,
  },

  inputFocused: {
    borderColor: COLORS.border.gold,
    backgroundColor: COLORS.background.tertiaryLight,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background.overlay,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primary,
    backgroundColor: COLORS.background.secondary,
  },

  modalTitle: {
    fontSize: FONT_SIZE.h1,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.text.gold,
  },

  // Dropdown styles
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background.tertiary,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },

  dropdownTriggerSelected: {
    borderColor: COLORS.border.gold,
    backgroundColor: COLORS.background.tertiaryLight,
  },

  dropdownTriggerText: {
    fontSize: FONT_SIZE.regular,
    color: COLORS.text.primary,
    fontWeight: FONT_WEIGHT.medium,
  },

  dropdownTriggerPlaceholder: {
    fontSize: FONT_SIZE.regular,
    color: COLORS.text.placeholder,
    flex: 1,
  },

  dropdownArrow: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.gold,
    marginLeft: SPACING.sm,
  },

  dropdownList: {
    marginTop: SPACING.sm,
    backgroundColor: COLORS.background.tertiary,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
    overflow: 'hidden',
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.primaryDark,
  },

  dropdownItemSelected: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
  },

  dropdownItemText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    flex: 1,
  },

  dropdownItemTextSelected: {
    color: COLORS.text.gold,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  // Step indicator styles
  stepNumber: {
    width: LAYOUT.stepNumberSize,
    height: LAYOUT.stepNumberSize,
    borderRadius: LAYOUT.stepNumberSize / 2,
    backgroundColor: COLORS.text.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },

  stepNumberText: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
    color: '#000',
  },

  // Close button
  closeButton: {
    width: LAYOUT.closeButtonSize,
    height: LAYOUT.closeButtonSize,
    borderRadius: LAYOUT.closeButtonSize / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    fontSize: FONT_SIZE.xl,
    color: COLORS.text.primary,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  // Summary styles
  summaryContainer: {
    backgroundColor: 'rgba(26, 95, 63, 0.5)',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border.primary,
  },

  summaryTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text.gold,
    marginBottom: SPACING.md,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },

  summaryLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.muted,
  },

  summaryValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.primary,
    fontWeight: FONT_WEIGHT.medium,
  },

  // ScrollView styles
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: SPACING.xl,
  },

  // Step container
  stepContainer: {
    marginBottom: SPACING.xl,
  },

  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },

  stepTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.text.primary,
  },
});

/**
 * Common style combinations for quick reuse
 */
export const stylePresets = {
  centerContent: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  
  spaceBetween: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  
  flex1: {
    flex: 1,
  },
  
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
};
