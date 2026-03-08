import { StyleSheet } from 'react-native';
import { createTextStyles } from '@styles';
import type { AppColors } from '@styles/themes';

export function makeStyles(colors: AppColors) {
  const textStyles = createTextStyles(colors);
  return StyleSheet.create({
    overlay: {
      flex: 1,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
      backgroundColor: colors.background.secondary,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text.gold,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: `${colors.text.primary}1A`,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 18,
      color: colors.text.primary,
      fontWeight: '600',
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
    },
    stepContainer: {
      marginBottom: 20,
    },
    stepHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    stepNumber: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.text.gold,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    stepNumberText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.background.dark,
    },
    stepTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
    },
    optionalText: {
      fontSize: 14,
      fontWeight: '400',
      color: colors.text.muted,
    },
    numberInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    dropdownTrigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background.tertiary,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    numberInputTrigger: {
      flex: 1,
    },
    dropdownTriggerText: {
      ...textStyles.bodyLarge,
      fontWeight: '500',
    },
    dropdownArrow: {
      fontSize: 12,
      color: colors.text.gold,
      marginLeft: 10,
    },
    customInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    customInputLabel: {
      fontSize: 12,
      color: colors.text.muted,
      marginRight: 8,
    },
    customInput: {
      width: 60,
      backgroundColor: colors.background.tertiary,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.border.primary,
      color: colors.text.primary,
      fontSize: 14,
      textAlign: 'center',
    },
    dropdownList: {
      marginTop: 8,
      backgroundColor: colors.background.tertiary,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
    },
    dropdownItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primaryDark,
    },
    dropdownItemSelected: {
      backgroundColor: `${colors.text.gold}22`,
    },
    dropdownItemText: {
      fontSize: 14,
      color: colors.text.primary,
      flex: 1,
    },
    dropdownItemTextSelected: {
      color: colors.text.gold,
      fontWeight: '600',
    },
    checkmark: {
      fontSize: 16,
      color: colors.text.gold,
      fontWeight: 'bold',
    },
    summaryContainer: {
      backgroundColor: `${colors.status.success}15`,
      borderRadius: 12,
      padding: 16,
      marginTop: 8,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.gold,
      marginBottom: 12,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    summaryLabel: {
      fontSize: 14,
      color: colors.text.muted,
    },
    summaryValue: {
      fontSize: 14,
      color: colors.text.primary,
      fontWeight: '500',
    },
    startButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.status.success,
      borderRadius: 12,
      paddingVertical: 16,
      marginTop: 16,
    },
    startButtonDisabled: {
      backgroundColor: colors.border.primaryDark,
      opacity: 0.6,
    },
    startButtonIcon: {
      fontSize: 20,
      marginRight: 8,
    },
    startButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
  });
}
