import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { ScoreAccuracyText } from '@components/shared/ScoreAccuracyText';
import type { ExerciseStatsProps } from './ExerciseStats.types';

/**
 * ExerciseStats component for displaying score and accuracy metrics
 * Shows score/attempts ratio and calculated accuracy percentage
 */
const ExerciseStats: React.FC<ExerciseStatsProps> = React.memo(({ score, attempts }) => {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.header}>
      <ScoreAccuracyText
        correct={score}
        total={attempts}
        textStyle={styles.statsText}
        containerStyle={styles.statsRow}
      />
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
