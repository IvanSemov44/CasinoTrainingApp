import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { ValidationResult } from '../types';

interface ResultFeedbackProps {
  result: ValidationResult;
  onNext: () => void;
  onClear: () => void;
}

export default function ResultFeedback({ result, onNext, onClear }: ResultFeedbackProps) {
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

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
          <Text style={styles.clearButtonText}>Clear &amp; Retry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={onNext}
        >
          <Text style={styles.nextButtonText}>Next Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      padding: 16,
      borderRadius: 12,
      borderWidth: 2,
      marginTop: 16,
    },
    correct: {
      backgroundColor: colors.status.successAlt,
      borderColor: colors.status.success,
    },
    incorrect: {
      backgroundColor: colors.status.errorAlt,
      borderColor: colors.status.error,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 8,
    },
    score: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 16,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.gold,
      marginBottom: 4,
    },
    betText: {
      fontSize: 14,
      color: colors.text.primary,
      marginLeft: 8,
      marginBottom: 2,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    button: {
      flex: 1,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    clearButton: {
      backgroundColor: colors.background.darkGray,
    },
    nextButton: {
      backgroundColor: colors.text.gold,
    },
    clearButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
    },
    nextButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.background.primary,
    },
  });
}
