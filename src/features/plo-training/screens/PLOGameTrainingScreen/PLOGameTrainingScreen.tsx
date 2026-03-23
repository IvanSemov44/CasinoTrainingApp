import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { PrimaryButton } from '@shared';
import { usePLOGameState } from './usePLOGameState';
import ActionLog from '@features/plo-training/components/ActionLog';
import PotCalculationInput from '@features/plo-training/components/PotCalculationInput';
import PLOScoreHeader from '@features/plo-training/components/PLOScoreHeader';
import PLOFeedbackCard from '@features/plo-training/components/PLOFeedbackCard';
import type { PLOGameTrainingScreenProps } from './PLOGameTrainingScreen.types';

export default function PLOGameTrainingScreen(props: PLOGameTrainingScreenProps) {
  const { difficulty } = props;

  const styles = useThemedStyles(makeStyles);

  // Provide default to satisfy React hooks rules
  const effectiveDifficulty = difficulty ?? 'easy';

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
  } = usePLOGameState(effectiveDifficulty);

  if (!difficulty) {
    return null;
  }

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
          <ActionLog lines={currentMoment.actionLog} requesterName={currentMoment.requesterName} />

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>What is the pot?</Text>
            <PotCalculationInput onSubmit={handleCheck} />
          </View>

          <PrimaryButton
            label="Check Answer"
            onPress={handleCheck}
            accessibilityLabel="Check answer"
          />
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

function makeStyles(colors: AppColors) {
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
  });
}
