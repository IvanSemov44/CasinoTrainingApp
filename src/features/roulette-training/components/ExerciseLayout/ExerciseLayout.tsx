import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import ExerciseStats from '../ExerciseStats';
import HintSection from '../HintSection';
import ExerciseVisualReference from './ExerciseVisualReference';
import ExerciseAnswerSection from './ExerciseAnswerSection';
import { useThemedStyles } from '@hooks/useThemedStyles';
import type { AppColors } from '@styles/themes';
import type { ExerciseLayoutProps } from './ExerciseLayout.types';

/**
 * Main layout component for exercise screens
 * Orchestrates roulette visualization, input handling, and feedback display
 */
export default function ExerciseLayout({
  score,
  attempts,
  showHint,
  onToggleHint,
  hintContent,
  placedBets,
  answerLabel,
  userAnswer,
  onAnswerChange,
  showFeedback,
  onCheckAnswer,
  isCorrect,
  correctAnswer,
  explanation,
  onNextQuestion,
  cellSize = 55,
  maxColumns = 4,
  isLoading = false,
}: ExerciseLayoutProps) {
  const styles = useThemedStyles(makeStyles);

  return (
    <ScrollView style={styles.container}>
      <ExerciseStats score={score} attempts={attempts} />

      <HintSection isOpen={showHint} onToggle={onToggleHint}>
        {hintContent}
      </HintSection>

      <ExerciseVisualReference
        placedBets={placedBets}
        cellSize={cellSize}
        maxColumns={maxColumns}
        isLoading={isLoading}
      />

      <ExerciseAnswerSection
        answerLabel={answerLabel}
        userAnswer={userAnswer}
        onAnswerChange={onAnswerChange}
        showFeedback={showFeedback}
        isLoading={isLoading}
        onCheckAnswer={onCheckAnswer}
        isCorrect={isCorrect}
        correctAnswer={correctAnswer}
        explanation={explanation}
        onNextQuestion={onNextQuestion}
      />
    </ScrollView>
  );
}

function makeStyles(colors: AppColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.primary,
    },
  });
}
