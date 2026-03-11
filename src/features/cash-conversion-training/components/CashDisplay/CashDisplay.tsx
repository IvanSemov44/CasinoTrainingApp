import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { getChips } from '@utils/chipUtils';
import type { CashDisplayProps } from './CashDisplay.types';

export default function CashDisplay({ amount }: CashDisplayProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);

  const chips = getChips(amount);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer gives:</Text>
      <View style={styles.chipsContainer}>
        {chips.map(chip => (
          <View key={`chip-${chip.value}`} style={styles.chipRow}>
            <View
              style={[
                styles.chip,
                {
                  backgroundColor: chip.color,
                  borderColor: chip.value === 100 ? colors.text.primary : chip.color,
                },
              ]}
            >
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
}
