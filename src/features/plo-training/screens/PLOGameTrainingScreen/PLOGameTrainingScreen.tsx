import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { usePLOGameState } from '../../hooks';
import { ActionLog, PotCalculationInput } from '../../components';
import { PLOScoreHeader } from '../../components/PLOScoreHeader';
import { PLOFeedbackCard } from '../../components/PLOFeedbackCard';
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
      <PLOScoreHeader
        sessionPoints={sessionPoints}
        accuracy={accuracy}
        streak={streak}
        handBlindLevel={hand.blindLevel}
        momentIndex={momentIndex}
        totalMoments={hand.askMoments.length}
      />

      {phase === 'asking' ? (
        <>
          <ActionLog
            lines={currentMoment.actionLog}
            requesterName={currentMoment.requesterName}
          />

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>What is the pot?</Text>
            <PotCalculationInput onSubmit={handleCheck} />
          </View>

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
        <PLOFeedbackCard
          isCorrect={isCorrect}
          userAnswer={userAnswer}
          correctAnswer={currentMoment.correctAnswer}
          explanation={currentMoment.explanation}
          upcomingMultiplier={upcomingMultiplier}
          sessionCorrect={sessionCorrect}
          sessionTotal={sessionTotal}
          accuracy={accuracy}
          onContinue={handleContinue}
        />
      )}
    </ScrollView>
  );
}

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
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
  });
}
