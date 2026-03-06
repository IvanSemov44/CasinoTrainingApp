import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { CHIP_DENOMINATIONS } from '../../constants/denominations';
import type { CashDisplayProps } from './CashDisplay.types';

export default function CashDisplay({ amount }: CashDisplayProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  // Break down amount into chip denominations
  const getChips = (total: number) => {
    const chips: { value: number; count: number; color: string }[] = [];
    let remaining = total;

    for (const denom of CHIP_DENOMINATIONS) {
      if (remaining >= denom.value) {
        const count = Math.floor(remaining / denom.value);
        chips.push({ value: denom.value, count, color: denom.color });
        remaining -= count * denom.value;
      }
    }

    return chips;
  };

  const chips = getChips(amount);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer gives:</Text>
      <View style={styles.chipsContainer}>
        {chips.map((chip) => (
          <View key={`chip-${chip.value}`} style={styles.chipRow}>
            <View style={[styles.chip, { backgroundColor: chip.color, borderColor: chip.value === 100 ? colors.text.primary : chip.color }]}>
              <Text style={[styles.chipValue, chip.value === 100 && styles.chipValueWhite]}>
                ${chip.value}
              </Text>
            </View>
            <Text style={styles.chipCount}>× {chip.count}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.totalAmount}>Total: ${amount}</Text>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      padding: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border.gold,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 16,
      textAlign: 'center',
    },
    chipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 16,
    },
    chipRow: {
      alignItems: 'center',
    },
    chip: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      marginBottom: 4,
    },
    chipValue: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.text.primary,
    },
    chipValueWhite: {
      color: colors.text.primary,
    },
    chipCount: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
    },
    totalAmount: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.gold,
      textAlign: 'center',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}
