import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import { ChallengeDisplay, ResultFeedback } from '../../components';
import type { CallBetMode, ValidationResult } from '../../types';
import type { CallBetsTrainingScreenProps } from './CallBetsTrainingScreen.types';

export default function CallBetsTrainingScreen({ route }: CallBetsTrainingScreenProps) {
  const { mode } = route.params;
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [totalBets, setTotalBets] = useState(0);
  const [currentMode, setCurrentMode] = useState<Exclude<CallBetMode, 'random'>>(
    mode === 'random' ? 'tier' : mode
  );

  const generateNewChallenge = useCallback(() => {
    // TODO: Implement challenge generation based on mode
    if (mode === 'random') {
      const modes: Array<Exclude<CallBetMode, 'random'>> = ['tier', 'orphelins', 'voisins', 'zero'];
      setCurrentMode(modes[Math.floor(Math.random() * modes.length)]);
    } else {
      setCurrentMode(mode);
    }
    setTotalBets(Math.floor(Math.random() * 5) + 1); // 1-5 bets
    setResult(null);
  }, [mode]);

  useEffect(() => {
    generateNewChallenge();
  }, [generateNewChallenge]);

  const handleSubmit = useCallback(() => {
    // TODO: Implement answer validation
    const validationResult: ValidationResult = {
      isCorrect: true, // placeholder
      correctBets: [],
      userBets: [],
      missingBets: [],
      extraBets: [],
      score: 100,
    };
    setResult(validationResult);
    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  }, []);

  const handleClear = useCallback(() => {
    setResult(null);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.difficultyText}>
          {mode === 'random' ? 'Random Mode' : mode.toUpperCase()}
        </Text>
        <Text style={styles.statsText}>
          Score: {stats.correct}/{stats.total} ({stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%)
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
        <ResultFeedback
          result={result}
          onNext={generateNewChallenge}
          onClear={handleClear}
        />
      )}
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
  /* eslint-enable react-native/no-unused-styles */
}
