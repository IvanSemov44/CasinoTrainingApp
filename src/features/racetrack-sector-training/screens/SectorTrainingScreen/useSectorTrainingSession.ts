import { useCallback, useEffect, useRef, useState } from 'react';
import type { SectorMode, SectorType, TrainingStats } from '../../types';
import {
  getRandomWinningNumber,
  getSectorForNumber,
  validateSectorSelection,
} from '../../utils/validation';

interface UseSectorTrainingSessionOptions {
  mode: SectorMode;
  onCorrect?: () => void | Promise<void>;
  onIncorrect?: () => void | Promise<void>;
}

export interface UseSectorTrainingSessionReturn {
  currentWinningNumber: number;
  stats: TrainingStats;
  isProcessing: boolean;
  handleSectorPress: (sector: string) => Promise<void>;
  percentage: number;
}

export function useSectorTrainingSession({
  mode,
  onCorrect,
  onIncorrect,
}: UseSectorTrainingSessionOptions): UseSectorTrainingSessionReturn {
  const [currentWinningNumber, setCurrentWinningNumber] = useState<number>(0);
  const [stats, setStats] = useState<TrainingStats>({ correct: 0, total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateNewNumber = useCallback(() => {
    let nextNumber: number;
    do {
      nextNumber = getRandomWinningNumber();
    } while (mode !== 'random' && getSectorForNumber(nextNumber) !== mode);

    setCurrentWinningNumber(nextNumber);
    setIsProcessing(false);
  }, [mode]);

  useEffect(() => {
    generateNewNumber();
  }, [generateNewNumber]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSectorPress = useCallback(
    async (sector: string) => {
      if (isProcessing) return;
      setIsProcessing(true);

      const { isCorrect } = validateSectorSelection(currentWinningNumber, sector as SectorType);
      setStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));

      if (isCorrect) {
        await onCorrect?.();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => generateNewNumber(), 1000);
        return;
      }

      await onIncorrect?.();
      setIsProcessing(false);
    },
    [currentWinningNumber, generateNewNumber, isProcessing, onCorrect, onIncorrect]
  );

  const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return {
    currentWinningNumber,
    stats,
    isProcessing,
    handleSectorPress,
    percentage,
  };
}
