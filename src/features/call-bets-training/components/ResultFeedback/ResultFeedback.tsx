import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import { createTextStyles } from '@styles';
import type { AppColors } from '@styles/themes';
import { FeedbackShell, FeedbackSection, FeedbackActions } from '@shared';
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

      <FeedbackActions
        primary={{ label: 'Next Challenge', onPress: onNext }}
        secondary={{ label: 'Clear & Retry', onPress: onClear }}
        containerStyle={styles.buttonRow}
        buttonStyle={styles.button}
        primaryButtonStyle={styles.nextButton}
        secondaryButtonStyle={styles.clearButton}
        textStyle={styles.buttonText}
        primaryTextStyle={styles.nextButtonText}
        secondaryTextStyle={styles.clearButtonText}
      />
    </FeedbackShell>
  );
}

function makeStyles(colors: AppColors) {
  const textStyles = createTextStyles(colors);

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
      ...textStyles.sectionLabel,
      color: colors.text.gold,
    },
    betText: {
      fontSize: 14,
      color: colors.text.primary,
      marginLeft: 8,
      marginBottom: 2,
    },
    buttonRow: {
      marginTop: 8,
    },
    button: {
      paddingVertical: 8,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    clearButton: {
      backgroundColor: colors.background.darkGray,
    },
    nextButton: {
      backgroundColor: colors.text.gold,
    },
    clearButtonText: {
      color: colors.text.primary,
    },
    nextButtonText: {
      color: colors.background.primary,
    },
  });
}
