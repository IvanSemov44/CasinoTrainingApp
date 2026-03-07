import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { TrainingHeader } from '@components/shared/TrainingHeader';
import { ChallengeDisplay, ResultFeedback } from '../../components';
import { useCallBetsState } from './useCallBetsState';
import type { CallBetsTrainingScreenProps } from './CallBetsTrainingScreen.types';

export default function CallBetsTrainingScreen({ route }: CallBetsTrainingScreenProps) {
  const { mode } = route.params;
  const styles = useThemedStyles(makeStyles);

  const { stats, result, totalBets, currentMode, generateNewChallenge, handleSubmit, handleClear } =
    useCallBetsState({ mode });

  const title = mode === 'random' ? 'Random Mode' : mode.toUpperCase();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TrainingHeader title={title} correct={stats.correct} total={stats.total} />

      {!result && (
        <>
          <ChallengeDisplay mode={currentMode} totalBets={totalBets} />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            accessibilityLabel="Submit answer"
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        </>
      )}

      {result && (
        <ResultFeedback result={result} onNext={generateNewChallenge} onClear={handleClear} />
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
      padding: 24,
    },
    submitButton: {
      backgroundColor: colors.text.gold,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 24,
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.background.primary,
    },
  });
}
