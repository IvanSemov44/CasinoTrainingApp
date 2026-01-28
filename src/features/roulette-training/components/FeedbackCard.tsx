import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

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
    gap: 15,
  },
  feedbackCard: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  feedbackCorrect: {
    backgroundColor: COLORS.status.successAlt,
    borderWidth: 2,
    borderColor: COLORS.status.success,
  },
  feedbackIncorrect: {
    backgroundColor: COLORS.status.errorAlt,
    borderWidth: 2,
    borderColor: COLORS.status.error,
  },
  feedbackIcon: {
    fontSize: 48,
    marginBottom: 10,
    color: COLORS.text.primary,
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 10,
  },
  feedbackAnswer: {
    fontSize: 18,
    color: COLORS.text.primary,
    marginBottom: 5,
  },
  feedbackExplanation: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontStyle: 'italic',
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: COLORS.background.gold,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.text.dark,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
