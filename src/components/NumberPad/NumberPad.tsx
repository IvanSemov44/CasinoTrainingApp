import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { createTextStyles } from '@styles';
import type { AppColors } from '@styles/themes';

interface NumberPadProps {
  onNumberPress: (num: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  disabled?: boolean;
}

interface ButtonConfig {
  value: string;
  action?: () => void;
}

const BUTTON_LAYOUT: ButtonConfig[][] = [
  [{ value: '1' }, { value: '2' }, { value: '3' }],
  [{ value: '4' }, { value: '5' }, { value: '6' }],
  [{ value: '7' }, { value: '8' }, { value: '9' }],
];

export default function NumberPad({
  onNumberPress,
  onClear,
  onBackspace,
  disabled = false,
}: NumberPadProps) {
  const styles = useThemedStyles(makeStyles);

  const handlePress = (value: string, callback?: () => void) => {
    if (!disabled) {
      if (callback) {
        callback();
      } else {
        onNumberPress(value);
      }
    }
  };

  const renderButton = (config: ButtonConfig, index: number) => (
    <TouchableOpacity
      key={`${config.value}-${index}`}
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={() => handlePress(config.value, config.action)}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityLabel={
        config.value === 'C'
          ? 'Clear'
          : config.value === '⌫'
            ? 'Backspace'
            : `Number ${config.value}`
      }
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text style={styles.buttonText}>{config.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.pad}>
      {BUTTON_LAYOUT.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((config, btnIndex) => renderButton(config, btnIndex))}
        </View>
      ))}
      <View style={styles.row}>
        {renderButton({ value: 'C', action: onClear }, 0)}
        {renderButton({ value: '0' }, 1)}
        {renderButton({ value: '⌫', action: onBackspace }, 2)}
      </View>
    </View>
  );
}

function makeStyles(colors: AppColors) {
  const textStyles = createTextStyles(colors);

  return StyleSheet.create({
    pad: { marginBottom: 12 },
    row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
    button: {
      flex: 1,
      backgroundColor: colors.background.secondary,
      paddingVertical: 16,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: { opacity: 0.4 },
    buttonText: { ...textStyles.headlineText, color: colors.text.gold },
  });
}
