import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { ValidationResult } from '../types';

interface ResultFeedbackProps {
  result: ValidationResult;
  onNext: () => void;
  sectorName: string;
}

export default function ResultFeedback({ result, onNext, sectorName }: ResultFeedbackProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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
              {sectorName} Total: ${result.userTotalBet}
            </Text>
            <Text style={styles.answerText}>
              {sectorName} Play By: ${result.userBetPerPosition}
            </Text>
            <Text style={styles.answerText}>
              Rest: ${result.userChange}
            </Text>
          </View>

          <View style={styles.answerSection}>
            <Text style={styles.sectionTitle}>Correct Answer:</Text>
            <Text style={[styles.answerText, styles.correctText]}>
              {sectorName} Total: ${result.correctTotalBet}
            </Text>
            <Text style={[styles.answerText, styles.correctText]}>
              {sectorName} Play By: ${result.correctBetPerPosition}
            </Text>
            <Text style={[styles.answerText, styles.correctText]}>
              Rest: ${result.correctChange}
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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border.gold,
      overflow: 'hidden',
    },
    header: {
      padding: 16,
      alignItems: 'center',
    },
    headerCorrect: {
      backgroundColor: colors.status.success,
    },
    headerIncorrect: {
      backgroundColor: colors.status.error,
    },
    headerText: {
      fontSize: 24,
      fontWeight: '700',
      color: '#FFF',
    },
    comparisonContainer: {
      padding: 24,
    },
    answerSection: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: 4,
    },
    answerText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 4,
    },
    correctText: {
      color: colors.status.success,
    },
    nextButton: {
      backgroundColor: colors.text.gold,
      padding: 16,
      margin: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    nextButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.background.primary,
    },
  });
}
