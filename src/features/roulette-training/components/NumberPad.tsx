import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../constants/theme';

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

export default function NumberPad({ onNumberPress, onClear, onBackspace, disabled = false }: NumberPadProps) {
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
      style={styles.numberButton}
      onPress={() => handlePress(config.value, config.action)}
      disabled={disabled}
    >
      <Text style={styles.numberButtonText}>{config.value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.numberPad}>
      {BUTTON_LAYOUT.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.numberPadRow}>
          {row.map((config, btnIndex) => renderButton(config, btnIndex))}
        </View>
      ))}
      <View style={styles.numberPadRow}>
        {renderButton({ value: 'C', action: onClear }, 0)}
        {renderButton({ value: '0' }, 1)}
        {renderButton({ value: '⌫', action: onBackspace }, 2)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numberPad: {
    marginBottom: SPACING.md,
  },
  numberPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  numberButton: {
    flex: 1,
    backgroundColor: COLORS.background.mediumGray,
    padding: 12,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDERS.radius.sm,
    borderWidth: BORDERS.width.thin,
    borderColor: COLORS.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberButtonText: {
    color: COLORS.text.gold,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
  },
});
