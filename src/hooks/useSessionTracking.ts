/**
 * Shared hook for session tracking across training modules.
 * Manages streak, points, correct/total counts, and accuracy calculation.
 */

import { useState, useCallback, useRef } from 'react';

export interface SessionTrackingState {
  streak: number;
  sessionPoints: number;
  sessionCorrect: number;
  sessionTotal: number;
  accuracy: number | null;
  upcomingMultiplier: number;
}

export interface SessionTrackingActions {
  recordAnswer: (isCorrect: boolean, customMultiplierFn?: (streak: number) => number) => void;
  resetSession: () => void;
}

export interface UseSessionTrackingReturn extends SessionTrackingState, SessionTrackingActions {}

/**
 * Hook for managing session tracking state and logic
 *
 * @param streakMultiplierFn - Optional custom streak multiplier function (default: 2^(streak-1))
 *
 * @example
 * const { streak, sessionPoints, accuracy, recordAnswer, resetSession } = useSessionTracking();
 */
export function useSessionTracking(
  streakMultiplierFn: (streak: number) => number = s => Math.pow(2, s - 1)
): UseSessionTrackingReturn {
  const [streak, setStreak] = useState(0);
  const streakRef = useRef(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const recordAnswer = useCallback(
    (isCorrect: boolean, customMultiplierFn?: (streak: number) => number) => {
      const multiplierFn = customMultiplierFn ?? streakMultiplierFn;
      setSessionTotal(t => t + 1);

      if (isCorrect) {
        const newStreak = streakRef.current + 1;
        streakRef.current = newStreak;
        setStreak(newStreak);
        setSessionCorrect(c => c + 1);
        setSessionPoints(p => p + multiplierFn(newStreak));
      } else {
        streakRef.current = 0;
        setStreak(0);
      }
    },
    [streakMultiplierFn]
  );

  const resetSession = useCallback(() => {
    streakRef.current = 0;
    setStreak(0);
    setSessionPoints(0);
    setSessionCorrect(0);
    setSessionTotal(0);
  }, []);

  // Computed values
  const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : null;
  const upcomingMultiplier = Math.pow(2, streak);

  return {
    // State
    streak,
    sessionPoints,
    sessionCorrect,
    sessionTotal,
    accuracy,
    upcomingMultiplier,
    // Actions
    recordAnswer,
    resetSession,
  };
}
