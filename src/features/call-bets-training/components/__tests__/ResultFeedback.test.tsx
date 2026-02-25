/**
 * Tests for ResultFeedback component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ResultFeedback from '../ResultFeedback';
import { ValidationResult } from '../../types';

describe('ResultFeedback', () => {
  const mockOnNext = jest.fn();
  const mockOnClear = jest.fn();

  const correctResult: ValidationResult = {
    isCorrect: true,
    correctBets: [
      { type: 'split', numbers: [5, 8] },
      { type: 'split', numbers: [10, 13] },
    ],
    userBets: [
      { type: 'split', numbers: [5, 8] },
      { type: 'split', numbers: [10, 13] },
    ],
    missingBets: [],
    extraBets: [],
    score: 100,
  };

  const incorrectResult: ValidationResult = {
    isCorrect: false,
    correctBets: [
      { type: 'split', numbers: [5, 8] },
    ],
    userBets: [
      { type: 'split', numbers: [5, 8] },
      { type: 'split', numbers: [1, 2] },
    ],
    missingBets: [
      { type: 'split', numbers: [10, 13] },
    ],
    extraBets: [
      { type: 'split', numbers: [1, 2] },
    ],
    score: 50,
  };

  const defaultProps = {
    result: correctResult,
    onNext: mockOnNext,
    onClear: mockOnClear,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering - correct result', () => {
    it('should render success message for correct answer', () => {
      const { getByText } = render(<ResultFeedback {...defaultProps} />);
      // The text includes an emoji: "✅ Perfect!"
      expect(getByText(/Perfect!/)).toBeTruthy();
    });

    it('should render score percentage', () => {
      const { getByText } = render(<ResultFeedback {...defaultProps} />);
      expect(getByText('Score: 100%')).toBeTruthy();
    });

    it('should not show missing bets section when correct', () => {
      const { queryByText } = render(<ResultFeedback {...defaultProps} />);
      expect(queryByText('Missing Positions:')).toBeNull();
    });

    it('should not show extra bets section when correct', () => {
      const { queryByText } = render(<ResultFeedback {...defaultProps} />);
      expect(queryByText('Extra/Wrong Positions:')).toBeNull();
    });
  });

  describe('rendering - incorrect result', () => {
    it('should render failure message for incorrect answer', () => {
      const { getByText } = render(
        <ResultFeedback result={incorrectResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      // The text includes an emoji: "❌ Not Quite"
      expect(getByText(/Not Quite/)).toBeTruthy();
    });

    it('should render score percentage for incorrect answer', () => {
      const { getByText } = render(
        <ResultFeedback result={incorrectResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      expect(getByText('Score: 50%')).toBeTruthy();
    });

    it('should show missing bets section when there are missing bets', () => {
      const { getByText } = render(
        <ResultFeedback result={incorrectResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      expect(getByText('Missing Positions:')).toBeTruthy();
    });

    it('should show extra bets section when there are extra bets', () => {
      const { getByText } = render(
        <ResultFeedback result={incorrectResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      expect(getByText('Extra/Wrong Positions:')).toBeTruthy();
    });

    it('should display missing bet details', () => {
      const { getByText } = render(
        <ResultFeedback result={incorrectResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      expect(getByText(/split: 10, 13/)).toBeTruthy();
    });

    it('should display extra bet details', () => {
      const { getByText } = render(
        <ResultFeedback result={incorrectResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      expect(getByText(/split: 1, 2/)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should call onClear when Clear & Retry button is pressed', () => {
      const { getByText } = render(<ResultFeedback {...defaultProps} />);
      fireEvent.press(getByText('Clear & Retry'));
      expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it('should call onNext when Next Challenge button is pressed', () => {
      const { getByText } = render(<ResultFeedback {...defaultProps} />);
      fireEvent.press(getByText('Next Challenge'));
      expect(mockOnNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('buttons', () => {
    it('should render Clear & Retry button', () => {
      const { getByText } = render(<ResultFeedback {...defaultProps} />);
      expect(getByText('Clear & Retry')).toBeTruthy();
    });

    it('should render Next Challenge button', () => {
      const { getByText } = render(<ResultFeedback {...defaultProps} />);
      expect(getByText('Next Challenge')).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle result with 0% score', () => {
      const zeroScoreResult: ValidationResult = {
        isCorrect: false,
        correctBets: [],
        userBets: [{ type: 'split', numbers: [1, 2] }],
        missingBets: [{ type: 'split', numbers: [5, 8] }],
        extraBets: [{ type: 'split', numbers: [1, 2] }],
        score: 0,
      };
      const { getByText } = render(
        <ResultFeedback result={zeroScoreResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      expect(getByText('Score: 0%')).toBeTruthy();
    });

    it('should handle result with multiple missing bets', () => {
      const multipleMissingResult: ValidationResult = {
        isCorrect: false,
        correctBets: [],
        userBets: [],
        missingBets: [
          { type: 'split', numbers: [5, 8] },
          { type: 'split', numbers: [10, 13] },
          { type: 'straight', numbers: [0] },
        ],
        extraBets: [],
        score: 0,
      };
      const { getByText } = render(
        <ResultFeedback result={multipleMissingResult} onNext={mockOnNext} onClear={mockOnClear} />
      );
      expect(getByText(/split: 5, 8/)).toBeTruthy();
      expect(getByText(/split: 10, 13/)).toBeTruthy();
      expect(getByText(/straight: 0/)).toBeTruthy();
    });
  });
});