import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { ExerciseStatsProps } from './ExerciseStats.types';

/**
 * ExerciseStats component for displaying score and accuracy metrics
 * Shows score/attempts ratio and calculated accuracy percentage
 */
const ExerciseStats: React.FC<ExerciseStatsProps> = React.memo(({ score, attempts }) => {
  const styles = useThemedStyles(makeStyles);

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  return (
    <View style={styles.header}>
      <View style={styles.statsRow}>
        <Text style={styles.statsText}>
          Score: {score}/{attempts}
        </Text>
        <Text style={styles.statsText}>Accuracy: {accuracy}%</Text>
      </View>
    </View>
  );
});

ExerciseStats.displayName = 'ExerciseStats';

function makeStyles(colors: AppColors) {
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
}

export default ExerciseStats;
