import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { usePLOGameState } from '../../hooks';
import { GameStateDisplay, ActionLog, PotCalculationInput } from '../../components';
import type { PLOGameTrainingScreenProps } from './PLOGameTrainingScreen.types';

export default function PLOGameTrainingScreen({ route }: PLOGameTrainingScreenProps) {
  const { difficulty } = route.params;
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const {
    hand,
    momentIndex,
    phase,
    userAnswer,
    isCorrect,
    sessionPoints,
    sessionCorrect,
    sessionTotal,
    streak,
    accuracy,
    handleCheck,
    handleContinue,
    upcomingMultiplier,
  } = usePLOGameState(difficulty);

  if (!hand || momentIndex >= hand.askMoments.length) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Loading next hand...</Text>
        </View>
      </ScrollView>
    );
  }

  const currentMoment = hand.askMoments[momentIndex];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Score Section */}
      <View style={styles.scoreSection}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{sessionPoints}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Accuracy</Text>
          <Text style={[styles.scoreValue, { color: colors.text.gold }]}>
            {accuracy}%
          </Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Streak</Text>
          <Text style={[styles.scoreValue, { color: colors.status.streak }]}>
            ×{streak}
          </Text>
        </View>
      </View>

      {/* Hand Progress */}
      <View style={styles.progressSection}>
        <Text style={styles.progressText}>
          Hand {hand.blindLevel}: Question {momentIndex + 1} of {hand.askMoments.length}
        </Text>
      </View>

      {phase === 'asking' ? (
        <>
          {/* Action Log */}
          <ActionLog
            lines={currentMoment.actionLog}
            requesterName={currentMoment.requesterName}
          />

          {/* Pot Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>What is the pot?</Text>
            <PotCalculationInput onSubmit={handleCheck} />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCheck}
            accessibilityLabel="Check answer"
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>Check Answer</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Feedback Section */}
          <View
            style={[
              styles.feedbackSection,
              {
                backgroundColor: isCorrect ? colors.status.success + '15' : colors.status.error + '15',
              },
            ]}
          >
            <Text
              style={[
                styles.feedbackTitle,
                { color: isCorrect ? colors.status.success : colors.status.error },
              ]}
            >
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </Text>
            <Text style={styles.feedbackAnswer}>Your answer: {userAnswer}</Text>
            <Text style={styles.feedbackAnswer}>Correct answer: {currentMoment.correctAnswer}</Text>
            {!isCorrect && (
              <Text style={styles.feedbackExplanation}>{currentMoment.explanation}</Text>
            )}
          </View>

          {/* Points Earned */}
          <View style={styles.pointsSection}>
            <Text style={styles.pointsLabel}>Points Earned</Text>
            <Text style={[styles.pointsValue, { color: colors.text.gold }]}>
              +{isCorrect ? upcomingMultiplier : 0}
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            accessibilityLabel="Continue to next question"
            accessibilityRole="button"
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Stats Summary */}
      <View style={styles.statsSection}>
        <Text style={styles.statsLabel}>Session Stats</Text>
        <Text style={styles.statsText}>
          {sessionCorrect} / {sessionTotal} correct ({accuracy}%)
        </Text>
      </View>
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  /* eslint-disable react-native/no-unused-styles */
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: 32,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 300,
    },
    emptyTitle: {
      fontSize: 18,
      color: colors.text.secondary,
      fontWeight: '600',
    },
    scoreSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    scoreItem: {
      alignItems: 'center',
    },
    scoreLabel: {
      fontSize: 12,
      color: colors.text.muted,
      marginBottom: 4,
      fontWeight: '500',
    },
    scoreValue: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text.primary,
    },
    progressSection: {
      marginBottom: 16,
      paddingHorizontal: 8,
    },
    progressText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontWeight: '500',
    },
    inputSection: {
      marginVertical: 16,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 12,
    },
    submitButton: {
      backgroundColor: colors.text.gold,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 16,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.background.primary,
    },
    feedbackSection: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    feedbackTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
    },
    feedbackAnswer: {
      fontSize: 14,
      color: colors.text.primary,
      marginBottom: 8,
      fontWeight: '500',
    },
    feedbackExplanation: {
      fontSize: 14,
      color: colors.text.secondary,
      marginTop: 12,
      lineHeight: 20,
    },
    pointsSection: {
      alignItems: 'center',
      marginBottom: 16,
    },
    pointsLabel: {
      fontSize: 14,
      color: colors.text.muted,
      marginBottom: 4,
    },
    pointsValue: {
      fontSize: 28,
      fontWeight: '700',
    },
    continueButton: {
      backgroundColor: colors.text.gold,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.background.primary,
    },
    statsSection: {
      backgroundColor: colors.background.secondary,
      borderRadius: 12,
      padding: 16,
      marginTop: 16,
    },
    statsLabel: {
      fontSize: 14,
      color: colors.text.muted,
      marginBottom: 8,
      fontWeight: '500',
    },
    statsText: {
      fontSize: 16,
      color: colors.text.primary,
      fontWeight: '600',
    },
  });
  /* eslint-enable react-native/no-unused-styles */
}
