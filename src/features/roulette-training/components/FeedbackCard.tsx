import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
    backgroundColor: '#2d5f2d',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  feedbackIncorrect: {
    backgroundColor: '#5f2d2d',
    borderWidth: 2,
    borderColor: '#f44336',
  },
  feedbackIcon: {
    fontSize: 48,
    marginBottom: 10,
    color: '#FFF',
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  feedbackAnswer: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 5,
  },
  feedbackExplanation: {
    fontSize: 16,
    color: '#CCC',
    fontStyle: 'italic',
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: '#FFD700',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
