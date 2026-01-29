import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../roulette-training/constants/theme';
import { ValidationResult } from '../types';

interface ResultFeedbackProps {
  result: ValidationResult;
  onNext: () => void;
  sectorName: string;
}

export default function ResultFeedback({ result, onNext, sectorName }: ResultFeedbackProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, result.isCorrect ? styles.headerCorrect : styles.headerIncorrect]}>
        <Text style={styles.headerText}>
          {result.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </Text>
      </View>

      {!result.isCorrect && (
        <View style={styles.comparisonContainer}>
          <View style={styles.answerSection}>
            <Text style={styles.sectionTitle}>Your Answer:</Text>
            <Text style={styles.answerText}>
              Total: ${result.userTotalBet}
            </Text>
            <Text style={styles.answerText}>
              ${result.userChange} rest
            </Text>
          </View>

          <View style={styles.answerSection}>
            <Text style={styles.sectionTitle}>Correct Answer:</Text>
            <Text style={[styles.answerText, styles.correctText]}>
              {sectorName} by ${result.correctBetPerPosition} = ${result.correctTotalBet}
            </Text>
            <Text style={[styles.answerText, styles.correctText]}>
              ${result.correctChange} rest
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Next Challenge</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.text.gold,
    overflow: 'hidden',
  },
  header: {
    padding: SPACING.md,
    alignItems: 'center',
  },
  headerCorrect: {
    backgroundColor: '#22c55e',
  },
  headerIncorrect: {
    backgroundColor: '#ef4444',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  comparisonContainer: {
    padding: SPACING.lg,
  },
  answerSection: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  answerText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  correctText: {
    color: '#22c55e',
  },
  nextButton: {
    backgroundColor: COLORS.text.gold,
    padding: SPACING.md,
    margin: SPACING.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.background.primary,
  },
});
