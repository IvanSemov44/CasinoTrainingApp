import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDERS } from '../constants/theme';

interface FeedbackCardProps {
  isCorrect: boolean;
  correctAnswer: number;
  explanation?: string;
  onNextQuestion: () => void;
}

export default function FeedbackCard({ isCorrect, correctAnswer, explanation, onNextQuestion }: FeedbackCardProps) {
  return (
    <View style={styles.feedbackContainer}>
      <View style={[
        styles.feedbackCard,
        isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
      ]}>
        <Text style={styles.feedbackIcon}>
          {isCorrect ? '✓' : '✗'}
        </Text>
        <Text style={styles.feedbackText}>
          {isCorrect ? 'Correct!' : 'Incorrect'}
        </Text>
        <Text style={styles.feedbackAnswer}>
          Correct answer: {correctAnswer}
        </Text>
        {!isCorrect && explanation && (
          <Text style={styles.feedbackExplanation}>
            {explanation}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={onNextQuestion}
      >
        <Text style={styles.nextButtonText}>Next Question →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  feedbackContainer: {
    gap: SPACING.md,
  },
  feedbackCard: {
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    alignItems: 'center',
  },
  feedbackCorrect: {
    backgroundColor: COLORS.status.successAlt,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.status.success,
  },
  feedbackIncorrect: {
    backgroundColor: COLORS.status.errorAlt,
    borderWidth: BORDERS.width.medium,
    borderColor: COLORS.status.error,
  },
  feedbackIcon: {
    fontSize: TYPOGRAPHY.fontSize.xxxl,
    marginBottom: SPACING.sm,
    color: COLORS.text.primary,
  },
  feedbackText: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  feedbackAnswer: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  feedbackExplanation: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text.secondary,
    fontStyle: 'italic',
    marginTop: SPACING.xs,
  },
  nextButton: {
    backgroundColor: COLORS.status.success,
    padding: SPACING.lg,
    borderRadius: BORDERS.radius.md,
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.background.dark,
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: 'bold',
  },
});
