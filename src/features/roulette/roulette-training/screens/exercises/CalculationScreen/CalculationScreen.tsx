import React from 'react';
import LoadingSpinner from '@shared/LoadingSpinner';
import ExerciseLayout from '../../../components/ExerciseLayout';
import { useCalculationQuestion } from './useCalculationQuestion';
import type { CalculationRouteParams } from './useCalculationQuestion';
import type { PlacedBet } from '@app-types/roulette.types';
import type { CalculationScreenProps } from './CalculationScreen.types';

function CalculationScreen(props: CalculationScreenProps) {
  const params: CalculationRouteParams = props.route?.params || {};
  const {
    score,
    attempts,
    showHint,
    toggleHint,
    hintContent,
    placedBets,
    answerLabel,
    userAnswer,
    setUserAnswer,
    showFeedback,
    handleCheckAnswer,
    isCorrect,
    correctAnswer,
    explanation,
    handleNextQuestion,
    isLoading,
    showInitialLoading,
  } = useCalculationQuestion(params);

  if (showInitialLoading) {
    return <LoadingSpinner message="Generating question..." />;
  }

  return (
    <ExerciseLayout
      score={score}
      attempts={attempts}
      showHint={showHint}
      onToggleHint={toggleHint}
      hintContent={hintContent}
      placedBets={placedBets as PlacedBet[]}
      answerLabel={answerLabel}
      userAnswer={userAnswer}
      onAnswerChange={setUserAnswer}
      showFeedback={showFeedback}
      onCheckAnswer={handleCheckAnswer}
      isCorrect={isCorrect}
      correctAnswer={correctAnswer}
      explanation={explanation}
      onNextQuestion={handleNextQuestion}
      isLoading={isLoading}
    />
  );
}

export default CalculationScreen;
