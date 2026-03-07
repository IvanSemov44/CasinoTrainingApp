import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { FeedbackShell } from '@components/shared/FeedbackShell';
import { FeedbackSection } from '@components/shared/FeedbackSection';
import type { ResultFeedbackProps } from './ResultFeedback.types';

export default function ResultFeedback({ result, onNext, onClear }: ResultFeedbackProps) {
  const styles = useThemedStyles(makeStyles);

  const isCorrect = result.isCorrect;

  return (
    <FeedbackShell
      isCorrect={isCorrect}
      mode="container"
      correctTitle="✅ Perfect!"
      incorrectTitle="❌ Not Quite"
      containerStyle={styles.container}
      contentStyle={styles.content}
    >
      <Text style={styles.score}>Score: {result.score}%</Text>

      {result.missingBets.length > 0 && (
        <FeedbackSection
          title="Missing Positions:"
          containerStyle={styles.section}
          titleStyle={styles.sectionTitle}
        >
          {result.missingBets.map((bet, idx) => (
            <Text key={idx} style={styles.betText}>
              • {bet.type}: {bet.numbers.join(', ')}
            </Text>
          ))}
        </FeedbackSection>
      )}

      {result.extraBets.length > 0 && (
        <FeedbackSection
          title="Extra/Wrong Positions:"
          containerStyle={styles.section}
          titleStyle={styles.sectionTitle}
        >
          {result.extraBets.map((bet, idx) => (
            <Text key={idx} style={styles.betText}>
              • {bet.type}: {bet.numbers.join(', ')}
            </Text>
          ))}
        </FeedbackSection>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={onClear}>
          <Text style={styles.clearButtonText}>Clear &amp; Retry</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={onNext}>
          <Text style={styles.nextButtonText}>Next Challenge</Text>
        </TouchableOpacity>
      </View>
    </FeedbackShell>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      marginTop: 16,
    },
    content: {
      padding: 16,
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
