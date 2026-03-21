import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { StatTile } from '@shared';
import type { RouletteNumber } from '@app-types/roulette.types';
import type { AppColors } from '@styles/themes';

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
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Roulette Layout Practice</Text>
      <Text style={styles.subtitle}>Learn the table layout and number positions</Text>
      <View style={styles.statsRow}>
        <StatTile
          label="Total Bets"
          value={totalBets}
          containerStyle={styles.statBox}
          labelStyle={styles.statLabel}
          valueStyle={styles.statValue}
        />
        <StatTile
          label="Total Amount"
          value={`$${totalAmount}`}
          containerStyle={styles.statBox}
          labelStyle={styles.statLabel}
          valueStyle={styles.statValue}
        />
        <StatTile
          label="Selected"
          value={selectedNumber ?? '-'}
          containerStyle={styles.statBox}
          labelStyle={styles.statLabel}
          valueStyle={styles.statValue}
        />
      </View>
    </View>
  );
}

function makeStyles(colors: AppColors) {
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
