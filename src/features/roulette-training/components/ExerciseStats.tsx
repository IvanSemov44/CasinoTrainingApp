import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface ExerciseStatsProps {
  score: number;
  attempts: number;
}

export default function ExerciseStats({ score, attempts }: ExerciseStatsProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    header: {
      padding: 16,
      backgroundColor: colors.background.darkGray,
      borderBottomWidth: 1,
      borderBottomColor: colors.border.primary,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statsText: {
      fontSize: 16,
      color: colors.text.gold,
      fontWeight: '600',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}
