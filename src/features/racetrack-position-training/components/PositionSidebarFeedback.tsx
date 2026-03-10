import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import type { PositionValidationResult } from '../types';

interface PositionSidebarFeedbackProps {
  result: PositionValidationResult | null;
  wheelPosition: number;
  isProcessing: boolean;
  onSkip: () => void;
}

export default function PositionSidebarFeedback({
  result,
  wheelPosition,
  isProcessing,
  onSkip,
}: PositionSidebarFeedbackProps) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      {result && (
        <View
          style={[styles.feedbackCard, result.isCorrect ? styles.feedbackOk : styles.feedbackErr]}
        >
          <Text style={styles.feedbackTitle}>
            {result.isCorrect ? '✓  Correct!' : '✗  Try again'}
          </Text>
          <Text style={styles.feedbackBody}>
            {result.isCorrect
              ? `Found at position ${wheelPosition + 1}`
              : `That was ${result.userNumber}`}
          </Text>
        </View>
      )}

      <View style={styles.spacer} />

      {!isProcessing && (
        <TouchableOpacity style={styles.nextBtn} onPress={onSkip} activeOpacity={0.8}>
          <Text style={styles.nextBtnText}>Skip ›</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    feedbackCard: {
      borderRadius: 10,
      padding: 10,
      borderWidth: 1.5,
    },
    feedbackOk: {
      backgroundColor: colors.status.successAlt,
      borderColor: colors.status.success,
    },
    feedbackErr: {
      backgroundColor: colors.status.errorAlt,
      borderColor: colors.status.error,
    },
    feedbackTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.primary,
      marginBottom: 2,
    },
    feedbackBody: {
      fontSize: 11,
      color: colors.text.secondary,
    },
    spacer: { flex: 1 },
    nextBtn: {
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border.primary,
      backgroundColor: colors.background.primary,
    },
    nextBtnText: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.text.secondary,
    },
  });
}
