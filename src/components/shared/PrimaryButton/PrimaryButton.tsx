import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Primary action button with gold background
 * Used for submit/check answer actions in training screens
 */
export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
  textStyle,
}: PrimaryButtonProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityRole="button"
    >
      <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    button: {
      backgroundColor: colors.text.gold,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 16,
    },
    buttonDisabled: {
      backgroundColor: colors.background.darkGray,
      opacity: 0.5,
    },
    text: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.background.primary,
    },
    textDisabled: {
      color: colors.text.muted,
    },
  });
}
