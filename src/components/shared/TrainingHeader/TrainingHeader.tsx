import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

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
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <View style={styles.header}>
      <Text style={styles.difficultyText}>{title}</Text>
      <Text style={styles.statsText}>
        Score: {correct}/{total} ({accuracy}%)
      </Text>
    </View>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    header: {
      backgroundColor: colors.background.secondary,
      padding: 16,
      borderRadius: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    difficultyText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text.gold,
      marginBottom: 4,
    },
    statsText: {
      fontSize: 14,
      color: colors.text.secondary,
    },
  });
}
