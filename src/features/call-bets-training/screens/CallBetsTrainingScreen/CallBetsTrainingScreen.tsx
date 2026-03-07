import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { ChallengeDisplay, ResultFeedback } from '../../components';
import { useCallBetsState } from './useCallBetsState';
import type { CallBetsTrainingScreenProps } from './CallBetsTrainingScreen.types';

export default function CallBetsTrainingScreen({ route }: CallBetsTrainingScreenProps) {
  const { mode } = route.params;
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const { stats, result, totalBets, currentMode, generateNewChallenge, handleSubmit, handleClear } =
    useCallBetsState({ mode });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.difficultyText}>
          {mode === 'random' ? 'Random Mode' : mode.toUpperCase()}
        </Text>
        <Text style={styles.statsText}>
          Score: {stats.correct}/{stats.total} (
          {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%)
        </Text>
      </View>

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

function makeStyles(colors: ReturnType<typeof useTheme>['colors']) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
    contentContainer: {
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 24,
    },
    difficultyText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.secondary,
      marginBottom: 4,
    },
    statsText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text.primary,
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
