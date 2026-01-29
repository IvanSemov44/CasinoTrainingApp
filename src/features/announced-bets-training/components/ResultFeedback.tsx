import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { ValidationResult } from '../types';

interface ResultFeedbackProps {
  result: ValidationResult;
  onNext: () => void;
  onClear: () => void;
}

export default function ResultFeedback({ result, onNext, onClear }: ResultFeedbackProps) {
  const isCorrect = result.isCorrect;

  return (
    <View style={[styles.container, isCorrect ? styles.correct : styles.incorrect]}>
      <Text style={styles.title}>
        {isCorrect ? '✅ Perfect!' : '❌ Not Quite'}
      </Text>
      
      <Text style={styles.score}>
        Score: {result.score}%
      </Text>

      {result.missingBets.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Missing Positions:</Text>
          {result.missingBets.map((bet, idx) => (
            <Text key={idx} style={styles.betText}>
              • {bet.type}: {bet.numbers.join(', ')}
            </Text>
          ))}
        </View>
      )}

      {result.extraBets.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extra/Wrong Positions:</Text>
          {result.extraBets.map((bet, idx) => (
            <Text key={idx} style={styles.betText}>
              • {bet.type}: {bet.numbers.join(', ')}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={onClear}
        >
          <Text style={styles.buttonText}>Clear & Retry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={onNext}
        >
          <Text style={styles.buttonText}>Next Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: SPACING.md,
  },
  correct: {
    backgroundColor: '#1a4d2e',
    borderColor: '#4ade80',
  },
  incorrect: {
    backgroundColor: '#4d1a1a',
    borderColor: '#ef4444',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  score: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.gold,
    marginBottom: SPACING.xs,
  },
  betText: {
    fontSize: 14,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
    marginBottom: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.sm,
  },
  button: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#6b7280',
  },
  nextButton: {
    backgroundColor: COLORS.text.gold,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
});
