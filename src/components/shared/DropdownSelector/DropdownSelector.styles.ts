import { StyleSheet } from 'react-native';
import type { AppColors } from '@styles/themes';

export function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    trigger: {
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
    triggerSelected: {
      borderColor: colors.border.gold,
      backgroundColor: colors.background.tertiary,
    },
    triggerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    triggerIcon: {
      fontSize: 24,
      marginRight: 12,
    },
    triggerTextContainer: {
      flex: 1,
    },
    triggerText: {
      fontSize: 15,
      color: colors.text.primary,
      fontWeight: '500',
    },
    triggerSubtext: {
      fontSize: 12,
      color: colors.text.secondary,
      marginTop: 2,
    },
    triggerPlaceholder: {
      fontSize: 15,
      color: colors.text.placeholder,
      flex: 1,
    },
    dropdownArrow: {
      fontSize: 12,
      color: colors.text.gold,
      marginLeft: 10,
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
      backgroundColor: `${colors.text.gold}26`,
    },
    dropdownItemIcon: {
      fontSize: 20,
      marginRight: 12,
    },
    dropdownItemContent: {
      flex: 1,
    },
    dropdownItemText: {
      fontSize: 14,
      color: colors.text.primary,
    },
    dropdownItemTextSelected: {
      color: colors.text.gold,
      fontWeight: '600',
    },
    dropdownItemExtra: {
      fontSize: 12,
      color: colors.text.muted,
      marginTop: 2,
    },
    checkmark: {
      fontSize: 16,
      color: colors.text.gold,
      fontWeight: 'bold',
    },
  });
}
