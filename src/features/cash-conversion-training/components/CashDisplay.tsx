import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';

interface CashDisplayProps {
  amount: number;
}

export default function CashDisplay({ amount }: CashDisplayProps) {
  // Break down amount into chip denominations
  const getChips = (total: number) => {
    const chips: { value: number; count: number; color: string }[] = [];
    let remaining = total;

    const denominations = [
      { value: 1000, color: '#FFD700' },
      { value: 500, color: '#9370DB' },
      { value: 100, color: '#000000' },
      { value: 25, color: '#228B22' },
      { value: 5, color: '#DC143C' },
    ];

    for (const denom of denominations) {
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
        {chips.map((chip, index) => (
          <View key={index} style={styles.chipRow}>
            <View style={[styles.chip, { backgroundColor: chip.color, borderColor: chip.value === 100 ? '#FFFFFF' : chip.color }]}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    padding: SPACING.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
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
    marginBottom: SPACING.xs,
  },
  chipValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  chipValueWhite: {
    color: '#FFFFFF',
  },
  chipCount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.gold,
    textAlign: 'center',
  },
});
