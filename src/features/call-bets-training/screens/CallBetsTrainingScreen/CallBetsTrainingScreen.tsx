import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import { TrainingHeader, PrimaryButton } from '@components/shared';
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

          <PrimaryButton
            label="Submit Answer"
            onPress={handleSubmit}
            accessibilityLabel="Submit answer"
            style={{ marginTop: 24 }}
          />
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
  });
}
