import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { StatTile } from '@components/shared/StatTile';
import type { TrainingStats } from '../types';

interface PositionSidebarHeaderProps {
  stats: TrainingStats;
  percentage: number;
  accuracyColor: string;
  currentWinningNumber: number;
}

export default function PositionSidebarHeader({
  stats,
  percentage,
  accuracyColor,
  currentWinningNumber,
}: PositionSidebarHeaderProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <View style={styles.statsRow}>
        <StatTile
          label="score"
          value={`${stats.correct}/${stats.total}`}
          containerStyle={styles.statPill}
          labelStyle={styles.statLabel}
          valueStyle={styles.statValue}
        />
        <StatTile
          label="accuracy"
          value={`${percentage}%`}
          containerStyle={styles.statPill}
          labelStyle={styles.statLabel}
          valueStyle={[styles.statValue, { color: accuracyColor }]}
        />
      </View>

      <View style={styles.targetSection}>
        <Text style={styles.targetLabel}>FIND NUMBER</Text>
        <View style={styles.targetCircle}>
          <Text style={styles.targetNumber}>{currentWinningNumber}</Text>
        </View>
      </View>

      <Text style={styles.instruction}>
        Tap <Text style={styles.instructionAccent}>{currentWinningNumber}</Text> on the racetrack
      </Text>
    </>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    statsRow: {
      flexDirection: 'row',
      gap: 6,
      marginBottom: 14,
    },
    statPill: {
      flex: 1,
      backgroundColor: colors.background.primary,
      borderRadius: 10,
      paddingVertical: 7,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 14,
      fontWeight: '800',
      color: colors.text.gold,
    },
    statLabel: {
      fontSize: 9,
      color: colors.text.muted,
      marginTop: 1,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    targetSection: {
      alignItems: 'center',
      marginBottom: 12,
    },
    targetLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: colors.text.muted,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    targetCircle: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: colors.text.gold,
      borderWidth: 3,
      borderColor: colors.border.gold,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 5,
    },
    targetNumber: {
      fontSize: 34,
      fontWeight: '900',
      color: colors.background.primary,
    },
    instruction: {
      fontSize: 12,
      color: colors.text.secondary,
      textAlign: 'center',
      marginBottom: 10,
      lineHeight: 17,
    },
    instructionAccent: {
      fontWeight: '700',
      color: colors.text.gold,
    },
  });
}
