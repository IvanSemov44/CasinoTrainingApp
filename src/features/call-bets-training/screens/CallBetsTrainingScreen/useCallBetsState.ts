import { useState, useEffect, useCallback } from 'react';
import type { CallBetMode, ValidationResult } from '../../types';

interface UseCallBetsStateProps {
  mode: CallBetMode;
}

interface UseCallBetsStateReturn {
  stats: { correct: number; total: number };
  result: ValidationResult | null;
  totalBets: number;
  currentMode: Exclude<CallBetMode, 'random'>;
  generateNewChallenge: () => void;
  handleSubmit: () => void;
  handleClear: () => void;
}

/**
 * Manages state for call bets training screen
 * Handles challenge generation, answer validation, and stats tracking
 */
export function useCallBetsState({ mode }: UseCallBetsStateProps): UseCallBetsStateReturn {
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [totalBets, setTotalBets] = useState(0);
  const [currentMode, setCurrentMode] = useState<Exclude<CallBetMode, 'random'>>(
    mode === 'random' ? 'tier' : mode
  );

  const generateNewChallenge = useCallback(() => {
    // Generate challenge based on mode
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

  return {
    stats,
    result,
    totalBets,
    currentMode,
    generateNewChallenge,
    handleSubmit,
    handleClear,
  };
}
