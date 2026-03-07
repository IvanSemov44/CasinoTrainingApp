import { useState, useCallback } from 'react';

export interface ExerciseState {
  userAnswer: string;
  score: number;
  attempts: number;
  showFeedback: boolean;
  isCorrect: boolean;
  showHint: boolean;
}

export function useExerciseState() {
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = useCallback((correctAnswer: number, onCorrect?: () => void) => {
    const userNum = parseInt(userAnswer);
    const correct = userNum === correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);
    setAttempts(prev => prev + 1);

    if (correct) {
      setScore(prev => prev + 1);
      onCorrect?.();
    }

    return correct;
  }, [userAnswer]);

  const resetAnswer = useCallback(() => {
    setUserAnswer('');
    setShowFeedback(false);
    setShowHint(false);
  }, []);

  const toggleHint = useCallback(() => {
    setShowHint(prev => !prev);
  }, []);

  return {
    userAnswer,
    setUserAnswer,
    score,
    attempts,
    showFeedback,
    isCorrect,
    showHint,
    checkAnswer,
    resetAnswer,
    toggleHint,
  };
}
