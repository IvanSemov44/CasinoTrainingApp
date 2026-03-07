import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface PLOScoreHeaderProps {
  sessionPoints: number;
  accuracy: number | null;
  streak: number;
  handBlindLevel: number;
  momentIndex: number;
  totalMoments: number;
}

/**
 * Score header for PLO training screen
 * Displays session stats and hand progress
 */
export function PLOScoreHeader({
  sessionPoints,
  accuracy,
  streak,
  handBlindLevel,
  momentIndex,
  totalMoments,
}: PLOScoreHeaderProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const accuracyValue = accuracy ?? 0;

  return (
    <>
      <View style={styles.scoreSection}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{sessionPoints}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Accuracy</Text>
          <Text style={[styles.scoreValue, { color: colors.text.gold }]}>{accuracyValue}%</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Streak</Text>
          <Text style={[styles.scoreValue, { color: colors.status.streak }]}>×{streak}</Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.progressText}>
          Hand {handBlindLevel}: Question {momentIndex + 1} of {totalMoments}
        </Text>
      </View>
    </>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    scoreSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    scoreItem: {
      alignItems: 'center',
    },
    scoreLabel: {
      fontSize: 12,
      color: colors.text.muted,
      marginBottom: 4,
      fontWeight: '500',
    },
    scoreValue: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text.primary,
    },
    progressSection: {
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    progressText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '500',
    },
  });
}
