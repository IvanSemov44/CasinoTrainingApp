/**
 * Custom hook for managing drill screen state across all training modules.
 * Eliminates code duplication for quiz-style drill screens.
 *
 * @generic TScenario - The scenario type (TCPScenario, THUScenario, etc.)
 */

import { useState, useCallback, useEffect } from 'react';

/**
 * Base scenario interface that all drill scenarios must extend
 */
export interface BaseDrillScenario {
  answerType: 'multiple-choice' | 'numeric';
  correctOption?: string;
  correctAnswer?: number;
  options?: string[];
}

/**
 * Return type for the drill state hook
 */
export interface DrillState<TScenario extends BaseDrillScenario> {
  // Scenario state
  scenario: TScenario;
  setScenario: (scenario: TScenario) => void;

  // UI phase state
  phase: 'asking' | 'feedback';
  setPhase: (phase: 'asking' | 'feedback') => void;

  // User input state
  selectedOption: string | null;
  setSelectedOption: (option: string | null) => void;
  userAmountStr: string;
  setUserAmountStr: (amount: string | ((prev: string) => string)) => void;

  // Result state
  isCorrect: boolean;
  setIsCorrect: (correct: boolean) => void;

  // Session tracking state
  streak: number;
  setStreak: (streak: number) => void;
  sessionPoints: number;
  setSessionPoints: (points: number) => void;
  sessionCorrect: number;
  setSessionCorrect: (correct: number) => void;
  sessionTotal: number;
  setSessionTotal: (total: number) => void;

  // Computed values
  accuracy: number | null;
  upcomingMultiplier: number;
  canSubmit: boolean;
  autoSubmit: boolean;

  // Handler functions
  handleSubmit: (directOption?: string) => void;
  handleNext: () => void;
  resetSession: () => void;
}

/**
 * Hook that manages drill screen state consistently across all training modules
 *
 * @param scenarioGenerator - Function to generate new scenarios of type TScenario
 * @param drillType - The drill type to generate scenarios for
 * @param streakMultiplierFn - Optional custom streak multiplier function (default: 2^(streak-1))
 * @returns DrillState object with all state and handlers
 *
 * @example
 * ```typescript
 * const drillState = useDrillState(generateTCPScenario, drillType);
 * const { scenario, handleSubmit, streak, sessionPoints } = drillState;
 * ```
 */
export function useDrillState<TScenario extends BaseDrillScenario, TDrillType = unknown>(
  scenarioGenerator: (drillType: TDrillType) => TScenario,
  drillType: TDrillType,
  streakMultiplierFn: (streak: number) => number = s => Math.pow(2, s - 1)
): DrillState<TScenario> {
  // Scenario state
  const [scenario, setScenario] = useState<TScenario>(() => scenarioGenerator(drillType));

  // UI phase state
  const [phase, setPhase] = useState<'asking' | 'feedback'>('asking');

  // User input state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userAmountStr, setUserAmountStr] = useState('');

  // Result state
  const [isCorrect, setIsCorrect] = useState(false);

  // Session tracking state
  const [streak, setStreak] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  // Clear inputs when scenario changes
  useEffect(() => {
    setSelectedOption(null);
    setUserAmountStr('');
  }, [scenario]);

  /**
   * Handle submission of answer (either multiple choice or numeric)
   */
  const handleSubmit = useCallback(
    (directOption?: string) => {
      let correct = false;

      if (scenario.answerType === 'multiple-choice') {
        const chosen = directOption ?? selectedOption;
        correct = chosen === scenario.correctOption;
      } else {
        const entered = parseInt(userAmountStr, 10);
        correct = !isNaN(entered) && entered === scenario.correctAnswer;
      }

      setIsCorrect(correct);
      setSessionTotal(t => t + 1);

      if (correct) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setSessionCorrect(c => c + 1);
        setSessionPoints(p => p + streakMultiplierFn(newStreak));
      } else {
        setStreak(0);
      }

      setPhase('feedback');
    },
    [scenario, selectedOption, userAmountStr, streak, streakMultiplierFn]
  );

  /**
   * Load next scenario and reset for next question
   */
  const handleNext = useCallback(() => {
    setScenario(scenarioGenerator(drillType));
    setPhase('asking');
  }, [drillType, scenarioGenerator]);

  /**
   * Reset entire session state
   */
  const resetSession = useCallback(() => {
    setScenario(scenarioGenerator(drillType));
    setPhase('asking');
    setSelectedOption(null);
    setUserAmountStr('');
    setIsCorrect(false);
    setStreak(0);
    setSessionPoints(0);
    setSessionCorrect(0);
    setSessionTotal(0);
  }, [drillType, scenarioGenerator]);

  // Computed values
  const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : null;

  const upcomingMultiplier = Math.pow(2, streak);

  const canSubmit =
    scenario.answerType === 'multiple-choice' ? selectedOption !== null : userAmountStr.length > 0;

  const autoSubmit =
    scenario.answerType === 'multiple-choice' && (scenario.options?.length ?? 0) === 2;

  return {
    // Scenario
    scenario,
    setScenario,
    // Phase
    phase,
    setPhase,
    // User input
    selectedOption,
    setSelectedOption,
    userAmountStr,
    setUserAmountStr,
    // Result
    isCorrect,
    setIsCorrect,
    // Session tracking
    streak,
    setStreak,
    sessionPoints,
    setSessionPoints,
    sessionCorrect,
    setSessionCorrect,
    sessionTotal,
    setSessionTotal,
    // Computed
    accuracy,
    upcomingMultiplier,
    canSubmit,
    autoSubmit,
    // Handlers
    handleSubmit,
    handleNext,
    resetSession,
  };
}
