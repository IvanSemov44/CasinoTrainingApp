import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/theme';

export const exerciseTextStyles = StyleSheet.create({
  highlightNumber: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: 'bold',
    color: COLORS.text.gold,
  },
  highlightChips: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: 'bold',
    color: COLORS.status.success,
  },
  hintTitle: {
    fontWeight: 'bold',
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.text.gold,
  },
  hintBet: {
    fontSize: TYPOGRAPHY.fontSize.base,
    lineHeight: TYPOGRAPHY.lineHeight.normal,
    color: COLORS.text.secondary,
  },
});
