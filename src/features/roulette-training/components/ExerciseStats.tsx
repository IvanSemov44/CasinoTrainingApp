import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../constants/theme';

interface ExerciseStatsProps {
  score: number;
  attempts: number;
}

export default function ExerciseStats({ score, attempts }: ExerciseStatsProps) {
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <View style={styles.header}>
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>Score: {score}/{attempts}</Text>
        <Text style={styles.statsText}>Accuracy: {accuracy}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.background.darkGray,
    borderBottomWidth: BORDERS.width.medium,
    borderBottomColor: COLORS.border.primary,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.gold,
    fontWeight: '600',
  },
});
