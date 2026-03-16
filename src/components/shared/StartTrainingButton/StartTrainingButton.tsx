import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

export interface StartTrainingButtonProps {
  icon: string;
  label?: string;
  hint: string;
  onPress: () => void;
  style?: ViewStyle;
}

/**
 * Shared start training button with icon, label, and hint text
 * Used in menu screens to launch training modals
 */
export function StartTrainingButton({
  icon,
  label = 'Start Training',
  hint,
  onPress,
  style,
}: StartTrainingButtonProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </TouchableOpacity>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      padding: 30,
      width: '100%',
      maxWidth: 400,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.gold,
      marginTop: 20,
    },
    icon: {
      fontSize: 48,
      marginBottom: 12,
    },
    label: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 8,
    },
    hint: {
      fontSize: 14,
      color: colors.text.muted,
    },
  });
}
