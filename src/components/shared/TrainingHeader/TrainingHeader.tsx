import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { createTextStyles } from '@styles';
import { ScoreAccuracyText } from '@components/shared/ScoreAccuracyText';

export interface TrainingHeaderProps {
  title: string;
  correct: number;
  total: number;
}

/**
 * Shared training screen header
 * Displays mode/difficulty and score with accuracy percentage
 */
export function TrainingHeader({ title, correct, total }: TrainingHeaderProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <View style={styles.header}>
      <Text style={styles.difficultyText}>{title}</Text>
      <ScoreAccuracyText correct={correct} total={total} compact textStyle={styles.statsText} />
    </View>
  );
}

function makeStyles(colors: AppColors) {
  const textStyles = createTextStyles(colors);
  
  return StyleSheet.create({
    header: {
      backgroundColor: colors.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    difficultyText: textStyles.goldTitle,
    statsText: textStyles.secondaryText,
  });
}
