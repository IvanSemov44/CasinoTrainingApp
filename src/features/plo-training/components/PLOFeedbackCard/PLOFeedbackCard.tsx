import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';

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
export default function PLOFeedbackCard({
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
  const styles = useThemedStyles((themeColors: AppColors) => {
    return StyleSheet.create({
      feedbackSection: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        backgroundColor: isCorrect
          ? themeColors.status.success + '15'
          : themeColors.status.error + '15',
      },
      feedbackTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12,
        color: isCorrect ? themeColors.status.success : themeColors.status.error,
      },
      feedbackAnswer: {
        fontSize: 14,
        color: themeColors.text.primary,
        marginBottom: 8,
        fontWeight: '500',
      },
      feedbackExplanation: {
        fontSize: 14,
        color: themeColors.text.secondary,
        marginTop: 12,
        lineHeight: 20,
      },
      pointsSection: {
        alignItems: 'center',
        marginBottom: 16,
      },
      pointsLabel: {
        fontSize: 14,
        color: themeColors.text.muted,
        marginBottom: 4,
      },
      pointsValue: {
        fontSize: 28,
        fontWeight: '700',
      },
      continueButton: {
        backgroundColor: themeColors.text.gold,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
      },
      continueButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: themeColors.background.primary,
      },
      statsSection: {
        backgroundColor: themeColors.background.secondary,
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
      },
      statsLabel: {
        fontSize: 14,
        color: themeColors.text.muted,
        marginBottom: 8,
        fontWeight: '500',
      },
      statsText: {
        fontSize: 16,
        color: themeColors.text.primary,
        fontWeight: '600',
      },
    });
  });

  return (
    <>
      {/* Feedback Section */}
      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>{isCorrect ? '✓ Correct!' : '✗ Incorrect'}</Text>
        <Text style={styles.feedbackAnswer}>Your answer: {userAnswer}</Text>
        <Text style={styles.feedbackAnswer}>Correct answer: {correctAnswer}</Text>
        {!isCorrect && <Text style={styles.feedbackExplanation}>{explanation}</Text>}
      </View>

      {/* Points Earned */}
      <View style={styles.pointsSection}>
        <Text style={styles.pointsLabel}>Points Earned</Text>
        <Text style={[styles.pointsValue, { color: '#FFD700' }]}>
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
