import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { RouletteNumber } from '@app-types/roulette.types';

export interface LayoutPracticeHeaderProps {
  totalBets: number;
  totalAmount: number;
  selectedNumber: RouletteNumber | null;
}

/**
 * Header bar for roulette layout practice screen
 * Displays title, subtitle, and current session stats
 */
export function LayoutPracticeHeader({
  totalBets,
  totalAmount,
  selectedNumber,
}: LayoutPracticeHeaderProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Roulette Layout Practice</Text>
      <Text style={styles.subtitle}>Learn the table layout and number positions</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Bets</Text>
          <Text style={styles.statValue}>{totalBets}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Amount</Text>
          <Text style={styles.statValue}>${totalAmount}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Selected</Text>
          <Text style={styles.statValue}>{selectedNumber ?? '-'}</Text>
        </View>
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    header: {
      backgroundColor: colors.background.secondary,
      padding: 24,
      borderBottomWidth: 2,
      borderBottomColor: colors.border.gold,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text.gold,
      marginBottom: 4,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 16,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statBox: {
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text.gold,
    },
  });
}
