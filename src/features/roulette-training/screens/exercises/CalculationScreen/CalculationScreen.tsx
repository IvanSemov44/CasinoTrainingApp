import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingSpinner from '@components/LoadingSpinner';
import ExerciseLayout from '../../../components/ExerciseLayout';
import { useCalculationQuestion, type CalculationRouteParams } from './useCalculationQuestion';
import type { RouletteTrainingStackParamList } from '../../../navigation';
import type { PlacedBet } from '@app-types/roulette.types';

type CalculationScreenName =
  | 'Calculation'
  | 'MixedCalculation'
  | 'TripleMixedCalculation'
  | 'AllPositionsCalculation'
  | 'CashHandling';

type CalculationScreenRouteProp = RouteProp<RouletteTrainingStackParamList, CalculationScreenName>;
type CalculationScreenNavigationProp = StackNavigationProp<
  RouletteTrainingStackParamList,
  CalculationScreenName
>;

interface CalculationScreenProps {
  route: CalculationScreenRouteProp;
  navigation: CalculationScreenNavigationProp;
}

function CalculationScreen({ route }: CalculationScreenProps) {
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
  } = useCalculationQuestion(route.params as CalculationRouteParams);

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
