import { useState, useEffect, useCallback } from 'react';
import type { CallBetMode, ValidationResult } from '../../types';
import { validateCallBet } from '../../utils/validation';
import { PlacedBet } from '@app-types/roulette.types';
import { getRandomElement, getRandomInt } from '@utils/randomUtils';

interface UseCallBetsStateProps {
  mode: CallBetMode;
}

export interface UseCallBetsStateReturn {
  stats: { correct: number; total: number };
  result: ValidationResult | null;
  totalBets: number;
  currentMode: Exclude<CallBetMode, 'random'>;
  userBets: PlacedBet[];
  addBet: (bet: PlacedBet) => void;
  removeBet: (betId: string) => void;
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
  const [userBets, setUserBets] = useState<PlacedBet[]>([]);
  const [currentMode, setCurrentMode] = useState<Exclude<CallBetMode, 'random'>>(
    mode === 'random' ? 'tier' : mode
  );

  const generateNewChallenge = useCallback(() => {
    // Generate challenge based on mode
    if (mode === 'random') {
      const modes: Array<Exclude<CallBetMode, 'random'>> = ['tier', 'orphelins', 'voisins', 'zero'];
      setCurrentMode(getRandomElement(modes));
    } else {
      setCurrentMode(mode);
    }
    setTotalBets(getRandomInt(1, 5)); // 1-5 bets
    setUserBets([]);
    setResult(null);
  }, [mode]);

  const addBet = useCallback((bet: PlacedBet) => {
    setUserBets(prev => [...prev, bet]);
  }, []);

  const removeBet = useCallback((betId: string) => {
    setUserBets(prev => prev.filter(b => b.id !== betId));
  }, []);

  useEffect(() => {
    generateNewChallenge();
  }, [generateNewChallenge]);

  const handleSubmit = useCallback(() => {
    // Use validation function for proper answer checking
    const validationResult = validateCallBet(currentMode, userBets);
    setResult(validationResult);
    setStats(prev => ({
      correct: prev.correct + (validationResult.isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  }, [currentMode, userBets]);

  const handleClear = useCallback(() => {
    setUserBets([]);
    setResult(null);
  }, []);

  return {
    stats,
    result,
    totalBets,
    currentMode,
    userBets,
    addBet,
    removeBet,
    generateNewChallenge,
    handleSubmit,
    handleClear,
  };
}
