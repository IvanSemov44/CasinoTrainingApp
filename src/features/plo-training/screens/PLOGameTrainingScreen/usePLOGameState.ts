import { useState, useCallback, useEffect, useRef } from 'react';
import { generateHand } from '../../utils/handGenerator';
import type { GeneratedHand, PLODifficulty } from '../../types';
import { getRandomElement } from '@utils/randomUtils';

const BLIND_LEVELS = [2, 5, 10] as const;
const DEALING_DURATION_MS = 1200;

type Phase = 'asking' | 'feedback' | 'dealing';

function freshHand(difficulty: PLODifficulty): GeneratedHand {
  return generateHand(difficulty, getRandomElement([...BLIND_LEVELS]));
}

function streakMultiplier(streakAfterAnswer: number): number {
  return Math.pow(2, streakAfterAnswer - 1);
}

export function usePLOGameState(difficulty: PLODifficulty) {
  const [hand, setHand] = useState<GeneratedHand>(() => freshHand(difficulty));
  const [handKey, setHandKey] = useState(0);
  const [momentIndex, setMomentIndex] = useState(0);

  const [phase, setPhase] = useState<Phase>('asking');
  const [userAnswer, setUserAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const [sessionPoints, setSessionPoints] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  const dealingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase === 'dealing') {
      dealingTimer.current = setTimeout(() => {
        setHand(freshHand(difficulty));
        setMomentIndex(0);
        setHandKey(k => k + 1);
        setUserAnswer(0);
        setPhase('asking');
      }, DEALING_DURATION_MS);
    }
    return () => {
      if (dealingTimer.current) clearTimeout(dealingTimer.current);
    };
  }, [phase, difficulty]);

  const moment = hand.askMoments[momentIndex];

  const handleCheck = useCallback(() => {
    const correct = userAnswer === moment.correctAnswer;
    setIsCorrect(correct);
    setSessionTotal(t => t + 1);

    if (correct) {
      const newStreak = streak + 1;
      const earned = streakMultiplier(newStreak);
      setStreak(newStreak);
      setSessionCorrect(c => c + 1);
      setSessionPoints(p => p + earned);
    } else {
      setStreak(0);
    }

    setPhase('feedback');
  }, [userAnswer, moment.correctAnswer, streak]);

  const handleContinue = useCallback(() => {
    const hasNext = momentIndex + 1 < hand.askMoments.length;
    if (hasNext) {
      setMomentIndex(i => i + 1);
      setUserAnswer(0);
      setPhase('asking');
    } else {
      setPhase('dealing');
    }
  }, [momentIndex, hand.askMoments.length]);

  const isLastMoment = momentIndex + 1 >= hand.askMoments.length;
  const accuracy = sessionTotal > 0
    ? Math.round((sessionCorrect / sessionTotal) * 100)
    : null;
  const lastEarned = isCorrect ? streakMultiplier(streak) : 0;
  const upcomingMultiplier = Math.pow(2, streak);

  return {
    hand,
    handKey,
    momentIndex,
    phase,
    userAnswer,
    isCorrect,
    moment,
    sessionPoints,
    sessionCorrect,
    sessionTotal,
    streak,
    isLastMoment,
    accuracy,
    lastEarned,
    upcomingMultiplier,
    handleCheck,
    handleContinue,
    setUserAnswer,
  };
}
