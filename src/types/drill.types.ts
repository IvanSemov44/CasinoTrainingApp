/**
 * Shared drill types for training features
 */

/** Answer type for drill scenarios */
export type AnswerType = 'multiple-choice' | 'numeric';

/**
 * Base interface for all drill scenarios
 * All feature-specific scenario types should extend this
 */
export interface BaseDrillScenario {
  answerType: AnswerType;
  question: string;
  explanation: string;
  correctAnswer?: string | number;
  correctOption?: string; // For multiple-choice
  options?: string[]; // For multiple-choice
  difficulty?: number;
  drillType?: string;
}
