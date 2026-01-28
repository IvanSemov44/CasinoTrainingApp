import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export type MenuTheme = 'green' | 'dark';

// Green theme (for RouletteExercisesScreen)
const greenTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.primary,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  exerciseCard: {
    backgroundColor: COLORS.background.secondary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.border.primary,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  difficultyText: {
    color: COLORS.text.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  exerciseDescription: {
    color: COLORS.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
  extraInfo: {
    fontSize: 12,
    color: COLORS.text.gold,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

// Dark theme (for PositionSelectionScreen)
const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.darkGray,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text.gold,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  exerciseCard: {
    backgroundColor: COLORS.background.mediumGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    flex: 1,
    marginRight: 12,
  },
  exerciseDescription: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    color: COLORS.text.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  extraInfo: {
    fontSize: 12,
    color: COLORS.text.gold,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export const menuStyles = {
  green: greenTheme,
  dark: darkTheme,
};
