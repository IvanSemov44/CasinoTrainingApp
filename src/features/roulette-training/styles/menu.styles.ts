import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../constants/theme';

export type MenuTheme = 'green' | 'dark';

// Green theme (for RouletteExercisesScreen)
const greenTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
  exerciseCard: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    marginBottom: SPACING.md,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.border.primary,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  exerciseTitle: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDERS.radius.sm,
  },
  difficultyText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: 'bold',
  },
  exerciseDescription: {
    color: COLORS.text.secondary,
    fontSize: TYPOGRAPHY.fontSize.base,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  extraInfo: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.gold,
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
});

// Dark theme (for PositionSelectionScreen)
const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.darkGray,
    padding: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    marginBottom: SPACING.lg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
  exerciseCard: {
    backgroundColor: COLORS.background.mediumGray,
    borderRadius: BORDERS.radius.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: BORDERS.width.thin,
    borderColor: '#444',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  exerciseTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
    marginRight: SPACING.sm,
  },
  exerciseDescription: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.secondary,
    lineHeight: TYPOGRAPHY.lineHeight.tight,
  },
  difficultyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDERS.radius.md,
  },
  difficultyText: {
    color: COLORS.text.primary,
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: 'bold',
  },
  extraInfo: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text.gold,
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
});

export const menuStyles = {
  green: greenTheme,
  dark: darkTheme,
};
