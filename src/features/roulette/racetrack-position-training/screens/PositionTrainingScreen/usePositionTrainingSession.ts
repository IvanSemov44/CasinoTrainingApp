import { useCallback, useEffect, useRef, useState } from 'react';
import type { PositionMode, PositionValidationResult, TrainingStats } from '../../types';
import { getRandomWinningNumber, validatePositionSelection } from '../../utils/validation';

interface UsePositionTrainingSessionOptions {
  mode: PositionMode;
}

export interface UsePositionTrainingSessionReturn {
  currentWinningNumber: number;
  result: PositionValidationResult | null;
  stats: TrainingStats;
  isProcessing: boolean;
  generateNewNumber: () => void;
  handleNumberPress: (numberStr: string) => void;
  handleNext: () => void;
}

export function usePositionTrainingSession({
  mode,
}: UsePositionTrainingSessionOptions): UsePositionTrainingSessionReturn {
  const [currentWinningNumber, setCurrentWinningNumber] = useState<number>(0);
  const [result, setResult] = useState<PositionValidationResult | null>(null);
  const [stats, setStats] = useState<TrainingStats>({ correct: 0, total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateNewNumber = useCallback(() => {
    const newNumber = getRandomWinningNumber();
    setCurrentWinningNumber(newNumber);
    setResult(null);
    setIsProcessing(false);
  }, []);

  const handleNumberPress = useCallback(
    (numberStr: string) => {
      if (isProcessing) return;

      const tappedNumber = parseInt(numberStr, 10);
      const validationResult = validatePositionSelection(currentWinningNumber, tappedNumber);
      setResult(validationResult);

      setStats(prev => ({
        correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));

      if (validationResult.isCorrect) {
        setIsProcessing(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          generateNewNumber();
        }, 1000);
      }
    },
    [currentWinningNumber, generateNewNumber, isProcessing]
  );

  const handleNext = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    generateNewNumber();
  }, [generateNewNumber]);

  useEffect(() => {
    generateNewNumber();
  }, [generateNewNumber, mode]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    currentWinningNumber,
    result,
    stats,
    isProcessing,
    generateNewNumber,
    handleNumberPress,
    handleNext,
  };
}
