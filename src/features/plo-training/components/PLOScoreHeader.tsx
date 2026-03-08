import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { createContainerStyles } from '@styles';
import { StatTile } from '@components/shared/StatTile';

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
        <StatTile
          label="Score"
          value={sessionPoints}
          containerStyle={styles.scoreItem}
          labelStyle={styles.scoreLabel}
          valueStyle={styles.scoreValue}
        />
        <StatTile
          label="Accuracy"
          value={`${accuracyValue}%`}
          containerStyle={styles.scoreItem}
          labelStyle={styles.scoreLabel}
          valueStyle={[styles.scoreValue, { color: colors.text.gold }]}
        />
        <StatTile
          label="Streak"
          value={`×${streak}`}
          containerStyle={styles.scoreItem}
          labelStyle={styles.scoreLabel}
          valueStyle={[styles.scoreValue, { color: colors.status.streak }]}
        />
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
  const containerStyles = createContainerStyles(colors);

  return StyleSheet.create({
    scoreSection: {
      ...containerStyles.secondaryCard,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      borderWidth: 0,
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
