import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { FeedbackCardProps } from './FeedbackCard.types';

/**
 * Feedback card component for displaying exercise results
 * Shows correctness, correct answer, and optional explanation
 */
const FeedbackCard: React.FC<FeedbackCardProps> = React.memo(
  ({ isCorrect, correctAnswer, explanation, onNextQuestion }) => {
    const { colors } = useTheme();
    const styles = useMemo(() => makeStyles(colors), [colors]);
    const cardStyle = useMemo(
      () => [styles.feedbackCard, isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect],
      [styles, isCorrect]
    );

    return (
      <View style={styles.feedbackContainer}>
        <View style={cardStyle}>
          <Text style={styles.feedbackIcon}>{isCorrect ? '✓' : '✗'}</Text>
          <Text style={styles.feedbackText}>{isCorrect ? 'Correct!' : 'Incorrect'}</Text>
          <Text style={styles.feedbackAnswer}>Correct answer: {correctAnswer}</Text>
          {!isCorrect && explanation && (
            <Text style={styles.feedbackExplanation}>{explanation}</Text>
          )}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
          <Text style={styles.nextButtonText}>Next Question →</Text>
        </TouchableOpacity>
      </View>
    );
  }
);

FeedbackCard.displayName = 'FeedbackCard';

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    feedbackContainer: {
      gap: 16,
    },
    feedbackCard: {
      padding: 24,
      borderRadius: 10,
      alignItems: 'center',
    },
    feedbackCorrect: {
      backgroundColor: colors.status.successAlt,
      borderWidth: 2,
      borderColor: colors.status.success,
    },
    feedbackIncorrect: {
      backgroundColor: colors.status.errorAlt,
      borderWidth: 2,
      borderColor: colors.status.error,
    },
    feedbackIcon: {
      fontSize: 48,
      marginBottom: 8,
      color: colors.text.primary,
    },
    feedbackText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 8,
    },
    feedbackAnswer: {
      fontSize: 18,
      color: colors.text.primary,
      marginBottom: 4,
    },
    feedbackExplanation: {
      fontSize: 16,
      color: colors.text.secondary,
      fontStyle: 'italic',
      marginTop: 4,
    },
    nextButton: {
      backgroundColor: colors.status.success,
      padding: 24,
      borderRadius: 10,
      alignItems: 'center',
    },
    nextButtonText: {
      color: colors.background.dark,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
}

export default FeedbackCard;
