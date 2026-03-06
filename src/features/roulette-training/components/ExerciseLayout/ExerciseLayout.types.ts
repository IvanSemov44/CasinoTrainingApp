import type { ReactNode } from 'react';
import type { PlacedBet } from '@app-types/roulette.types';

export interface ExerciseLayoutProps {
  score: number;
  attempts: number;
  showHint: boolean;
  onToggleHint: () => void;
  hintContent: ReactNode;
  placedBets: PlacedBet[];
  answerLabel: string;
  userAnswer: string;
  onAnswerChange: (text: string) => void;
  showFeedback: boolean;
  onCheckAnswer: () => void;
  isCorrect: boolean;
  correctAnswer: number;
  explanation?: string;
  onNextQuestion: () => void;
  cellSize?: number;
  maxColumns?: number;
  isLoading?: boolean;
}
