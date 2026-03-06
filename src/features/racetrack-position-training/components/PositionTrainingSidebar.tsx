import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { PositionValidationResult, TrainingStats } from '../types';

export interface PositionTrainingSidebarProps {
  stats: TrainingStats;
  currentWinningNumber: number;
  result: PositionValidationResult | null;
  isProcessing: boolean;
  wheelPosition: number;
  accuracyColor: string;
  percentage: number;
  onSkip: () => void;
}

/**
 * Sidebar HUD for position training screen
 * Displays stats, target number, instructions, and feedback
 */
export function PositionTrainingSidebar({
  stats,
  currentWinningNumber,
  result,
  isProcessing,
  wheelPosition,
  accuracyColor,
  percentage,
  onSkip,
}: PositionTrainingSidebarProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors, accuracyColor);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statValue}>{stats.correct}/{stats.total}</Text>
            <Text style={styles.statLabel}>score</Text>
          </View>
          <View style={styles.statPill}>
            <Text style={[styles.statValue, { color: accuracyColor }]}>{percentage}%</Text>
            <Text style={styles.statLabel}>accuracy</Text>
          </View>
        </View>

        {/* Target number */}
        <View style={styles.targetSection}>
          <Text style={styles.targetLabel}>FIND NUMBER</Text>
          <View style={styles.targetCircle}>
            <Text style={styles.targetNumber}>{currentWinningNumber}</Text>
          </View>
        </View>

        {/* Instruction */}
        <Text style={styles.instruction}>
          Tap <Text style={styles.instructionAccent}>{currentWinningNumber}</Text> on the racetrack
        </Text>

        {/* Feedback card */}
        {result && (
          <View style={[styles.feedbackCard, result.isCorrect ? styles.feedbackOk : styles.feedbackErr]}>
            <Text style={styles.feedbackTitle}>
              {result.isCorrect ? '✓  Correct!' : '✗  Try again'}
            </Text>
            <Text style={styles.feedbackBody}>
              {result.isCorrect
                ? `Found at position ${wheelPosition + 1}`
                : `That was ${result.userNumber}`}
            </Text>
          </View>
        )}

        <View style={styles.spacer} />

        {/* Skip button - only show when not processing */}
        {!isProcessing && (
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={onSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.nextBtnText}>
              Skip  ›
            </Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors'], accuracyColor: string) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      width: 172,
      backgroundColor: colors.background.secondary,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border.primary,
      overflow: 'hidden',
    },
    content: {
      padding: 12,
      paddingBottom: 24,
    },
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
    feedbackCard: {
      borderRadius: 10,
      padding: 10,
      borderWidth: 1.5,
    },
    feedbackOk: {
      backgroundColor: colors.status.successAlt,
      borderColor: colors.status.success,
    },
    feedbackErr: {
      backgroundColor: colors.status.errorAlt,
      borderColor: colors.status.error,
    },
    feedbackTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 2,
    },
    feedbackBody: {
      fontSize: 11,
      color: colors.text.secondary,
    },
    spacer: { flex: 1 },
    nextBtn: {
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.primary,
      backgroundColor: colors.background.primary,
    },
    nextBtnText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.secondary,
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}
