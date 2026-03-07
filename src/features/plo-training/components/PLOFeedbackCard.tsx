 
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

export interface PLOFeedbackCardProps {
  isCorrect: boolean;
  userAnswer: number;
  correctAnswer: number;
  explanation: string;
  upcomingMultiplier: number;
  sessionCorrect: number;
  sessionTotal: number;
   accuracy: number | null;
  onContinue: () => void;
}

/**
 * Feedback card for PLO training screen
 * Shows result, points earned, stats, and continue button
 */
export function PLOFeedbackCard({
  isCorrect,
  userAnswer,
  correctAnswer,
  explanation,
  upcomingMultiplier,
  sessionCorrect,
  sessionTotal,
  accuracy,
  onContinue,
}: PLOFeedbackCardProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors, isCorrect);

  return (
    <>
      {/* Feedback Section */}
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>
          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </Text>
        <Text style={styles.feedbackAnswer}>Your answer: {userAnswer}</Text>
        <Text style={styles.feedbackAnswer}>Correct answer: {correctAnswer}</Text>
        {!isCorrect &&  (
          <Text style={styles.feedbackExplanation}>{explanation}</Text>
        )}
      </View>

      {/* Points Earned */}
      <View style={styles.pointsSection}>
        <Text style={styles.pointsLabel}>Points Earned</Text>
        <Text style={[styles.pointsValue, { color: colors.text.gold }]}>
          +{isCorrect ? upcomingMultiplier : 0}
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={onContinue}
        accessibilityLabel="Continue to next question"
        accessibilityRole="button"
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Stats Summary */}
      <View style={styles.statsSection}>
        <Text style={styles.statsLabel}>Session Stats</Text>
        <Text style={styles.statsText}>
          {sessionCorrect} / {sessionTotal} correct ({accuracy}%)
        </Text>
      </View>
    </>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors'], isCorrect: boolean) {
  return StyleSheet.create({
    feedbackSection: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      backgroundColor: isCorrect ? colors.status.success + '15' : colors.status.error + '15',
    },
    feedbackTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
      color: isCorrect ? colors.status.success : colors.status.error,
    },
    feedbackAnswer: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 8,
      fontWeight: '500',
    },
    feedbackExplanation: {
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 12,
      lineHeight: 20,
    },
    pointsSection: {
      alignItems: 'center',
      marginBottom: 16,
    },
    pointsLabel: {
      fontSize: 14,
      color: colors.text.muted,
      marginBottom: 4,
    },
    pointsValue: {
      fontSize: 28,
      fontWeight: '700',
    },
    continueButton: {
      backgroundColor: colors.text.gold,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.background.primary,
    },
    statsSection: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
    },
    statsLabel: {
      fontSize: 14,
      color: colors.text.muted,
      marginBottom: 8,
      fontWeight: '500',
    },
    statsText: {
      fontSize: 16,
      color: colors.text.primary,
      fontWeight: '600',
    },
  });
}
