import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { FeedbackShell } from '@components/shared/FeedbackShell';
import { FeedbackSection } from '@components/shared/FeedbackSection';
import { FeedbackActions } from '@components/shared/FeedbackActions';
import type { ResultFeedbackProps } from './ResultFeedback.types';

export default function ResultFeedback({ result, onNext, sectorName }: ResultFeedbackProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <FeedbackShell
      isCorrect={result.isCorrect}
      mode="header"
      correctTitle="✓ Correct!"
      incorrectTitle="✗ Incorrect"
      containerStyle={styles.container}
    >
      {!result.isCorrect && (
        <View style={styles.comparisonContainer}>
          <FeedbackSection
            title="Your Answer:"
            containerStyle={styles.answerSection}
            titleStyle={styles.sectionTitle}
          >
            <Text style={styles.answerText}>
              {sectorName} Total: ${result.userTotalBet}
            </Text>
            <Text style={styles.answerText}>
              {sectorName} Play By: ${result.userBetPerPosition}
            </Text>
            <Text style={styles.answerText}>Rest: ${result.userChange}</Text>
          </FeedbackSection>

          <FeedbackSection
            title="Correct Answer:"
            containerStyle={styles.answerSection}
            titleStyle={styles.sectionTitle}
          >
            <Text style={[styles.answerText, styles.correctText]}>
              {sectorName} Total: ${result.correctTotalBet}
            </Text>
            <Text style={[styles.answerText, styles.correctText]}>
              {sectorName} Play By: ${result.correctBetPerPosition}
            </Text>
            <Text style={[styles.answerText, styles.correctText]}>
              Rest: ${result.correctChange}
            </Text>
          </FeedbackSection>
        </View>
      )}

      <FeedbackActions
        primary={{ label: 'Next Challenge', onPress: onNext }}
        containerStyle={styles.actionsRow}
        buttonStyle={styles.nextButton}
        textStyle={styles.nextButtonText}
      />
    </FeedbackShell>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      marginTop: 0,
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
    actionsRow: {
      marginHorizontal: 24,
      marginBottom: 24,
      marginTop: 0,
    },
    nextButton: {
      padding: 16,
      backgroundColor: colors.text.gold,
    },
    nextButtonText: {
      fontSize: 18,
      color: colors.background.primary,
    },
  });
}
