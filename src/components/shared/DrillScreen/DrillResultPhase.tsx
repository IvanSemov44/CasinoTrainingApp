import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { BaseDrillScenario } from '@hooks/useDrillState';
import type { makeStyles } from './DrillScreen.styles';

interface DrillScreenViewScenario extends BaseDrillScenario {
  explanation?: string;
}

interface DrillResultPhaseProps {
  isCorrect: boolean;
  lastEarned: number;
  scenario: BaseDrillScenario;
  viewScenario: DrillScreenViewScenario;
  userAmountStr: string;
  streak: number;
  upcomingMultiplier: number;
  handleNext: () => void;
  styles: ReturnType<typeof makeStyles>;
}

export default function DrillResultPhase({
  isCorrect,
  lastEarned,
  scenario,
  viewScenario,
  userAmountStr,
  streak,
  upcomingMultiplier,
  handleNext,
  styles,
}: DrillResultPhaseProps) {
  return (
    <>
      <View style={[styles.resultCard, isCorrect ? styles.resultCorrect : styles.resultIncorrect]}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultIcon}>{isCorrect ? '✓' : '✗'}</Text>
          <Text style={styles.resultTitle}>{isCorrect ? 'Correct!' : 'Incorrect'}</Text>
          {isCorrect && (
            <Text style={styles.pointsEarned}>
              +{lastEarned} pt{lastEarned !== 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {scenario.answerType === 'multiple-choice' ? (
          !isCorrect && (
            <View style={styles.answerRow}>
              <Text style={styles.answerLabel}>Correct answer</Text>
              <Text style={[styles.answerValue, styles.correctHL]}>{scenario.correctOption}</Text>
            </View>
          )
        ) : (
          <>
            <View style={styles.answerRow}>
              <Text style={styles.answerLabel}>Your answer</Text>
              <Text style={styles.answerValue}>€{userAmountStr || '0'}</Text>
            </View>
            {!isCorrect && (
              <View style={styles.answerRow}>
                <Text style={styles.answerLabel}>Correct answer</Text>
                <Text style={[styles.answerValue, styles.correctHL]}>
                  €{scenario.correctAnswer}
                </Text>
              </View>
            )}
          </>
        )}

        <View style={styles.explanationBox}>
          <Text style={styles.explanationText}>{viewScenario.explanation ?? ''}</Text>
        </View>

        {isCorrect && streak >= 2 && (
          <Text style={styles.streakNote}>
            🔥 {streak} in a row — next answer ×{upcomingMultiplier}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.8}>
        <Text style={styles.continueBtnText}>Next Question →</Text>
      </TouchableOpacity>
    </>
  );
}
