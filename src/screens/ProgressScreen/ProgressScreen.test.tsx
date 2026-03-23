/**
 * ProgressScreen component tests
 */

import React from 'react';
import { screen, waitFor } from '@testing-library/react-native';
import { render } from '@test-utils/render';
import { ProgressScreen } from './ProgressScreen';
import { ExerciseType } from '@app-types/roulette.types';

// Mock the useAppSelector hook
jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

import { useAppSelector } from '../../store/hooks';

describe('ProgressScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderScreen = (
    exerciseResults: Array<{
      exerciseType: string;
      score: number;
      totalQuestions: number;
      correctAnswers: number;
      timeSpent: number;
      timestamp: number;
    }> = []
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useAppSelector as any).mockImplementation((selector: (state: any) => unknown) => {
      return selector({
        roulette: {
          placedBets: [],
          selectedChipValue: 5,
          currentExercise: null,
          exerciseResults,
        },
      });
    });

    return render(<ProgressScreen />);
  };

  describe('Rendering', () => {
    it('renders the title "My Progress"', async () => {
      renderScreen([]);
      await waitFor(() => {
        expect(screen.getByText('My Progress')).toBeTruthy();
      });
    });

    it('renders all stat labels', async () => {
      renderScreen([]);
      await waitFor(() => {
        expect(screen.getByText('Completed')).toBeTruthy();
        expect(screen.getByText('Accuracy')).toBeTruthy();
        expect(screen.getByText('Correct')).toBeTruthy();
      });
    });

    it('renders the section title "Recent Results"', async () => {
      renderScreen([]);
      await waitFor(() => {
        expect(screen.getByText('Recent Results')).toBeTruthy();
      });
    });
  });

  describe('Empty state', () => {
    it('shows zero values when no exercises completed', async () => {
      renderScreen([]);
      await waitFor(() => {
        expect(screen.getAllByText('0').length).toBeGreaterThan(0);
        expect(screen.getByText('0%')).toBeTruthy();
        expect(screen.getByText('0/0')).toBeTruthy();
      });
    });
  });

  describe('Statistics calculation', () => {
    it('calculates 100% accuracy when all answers are correct', async () => {
      const mockResult = {
        exerciseType: ExerciseType.PAYOUT_CALCULATION,
        score: 100,
        totalQuestions: 10,
        correctAnswers: 10,
        timeSpent: 120,
        timestamp: Date.now(),
      };
      renderScreen([mockResult]);
      await waitFor(() => {
        expect(screen.getByText('100%')).toBeTruthy();
      });
    });

    it('calculates 0% accuracy when no answers are correct', async () => {
      const mockResult = {
        exerciseType: ExerciseType.PAYOUT_CALCULATION,
        score: 0,
        totalQuestions: 10,
        correctAnswers: 0,
        timeSpent: 120,
        timestamp: Date.now(),
      };
      renderScreen([mockResult]);
      await waitFor(() => {
        expect(screen.getByText('0%')).toBeTruthy();
      });
    });

    it('calculates correct accuracy for partial answers', async () => {
      const mockResult = {
        exerciseType: ExerciseType.PAYOUT_CALCULATION,
        score: 50,
        totalQuestions: 10,
        correctAnswers: 5,
        timeSpent: 120,
        timestamp: Date.now(),
      };
      renderScreen([mockResult]);
      await waitFor(() => {
        expect(screen.getByText('50%')).toBeTruthy();
      });
    });

    it('rounds accuracy to nearest whole number', async () => {
      const mockResult = {
        exerciseType: ExerciseType.PAYOUT_CALCULATION,
        score: 33,
        totalQuestions: 3,
        correctAnswers: 1,
        timeSpent: 30,
        timestamp: Date.now(),
      };
      renderScreen([mockResult]);
      // 1/3 = 33.333... rounded is 33%
      await waitFor(() => {
        expect(screen.getByText('33%')).toBeTruthy();
      });
    });

    it('shows total questions across all exercises', async () => {
      const mockResults = [
        {
          exerciseType: ExerciseType.PAYOUT_CALCULATION,
          score: 50,
          totalQuestions: 10,
          correctAnswers: 5,
          timeSpent: 60,
          timestamp: 1000,
        },
        {
          exerciseType: ExerciseType.SPLIT_CALCULATION,
          score: 60,
          totalQuestions: 5,
          correctAnswers: 3,
          timeSpent: 45,
          timestamp: 2000,
        },
      ];
      renderScreen(mockResults);
      // 10 + 5 = 15 total
      await waitFor(() => {
        expect(screen.getByText('8/15')).toBeTruthy();
      });
    });

    it('shows correct completed count for multiple exercises', async () => {
      const mockResults = [
        {
          exerciseType: ExerciseType.PAYOUT_CALCULATION,
          score: 100,
          totalQuestions: 10,
          correctAnswers: 10,
          timeSpent: 60,
          timestamp: 1000,
        },
        {
          exerciseType: ExerciseType.SPLIT_CALCULATION,
          score: 100,
          totalQuestions: 10,
          correctAnswers: 10,
          timeSpent: 45,
          timestamp: 2000,
        },
        {
          exerciseType: ExerciseType.STREET_CALCULATION,
          score: 100,
          totalQuestions: 10,
          correctAnswers: 10,
          timeSpent: 30,
          timestamp: 3000,
        },
      ];
      renderScreen(mockResults);
      await waitFor(() => {
        expect(screen.getByText('3')).toBeTruthy();
      });
    });

    it('handles single question exercise with 100%', async () => {
      const mockResult = {
        exerciseType: ExerciseType.PAYOUT_CALCULATION,
        score: 100,
        totalQuestions: 1,
        correctAnswers: 1,
        timeSpent: 5,
        timestamp: Date.now(),
      };
      renderScreen([mockResult]);
      await waitFor(() => {
        expect(screen.getByText('1/1')).toBeTruthy();
        expect(screen.getByText('100%')).toBeTruthy();
      });
    });

    it('displays score for single exercise', async () => {
      const mockResult = {
        exerciseType: ExerciseType.PAYOUT_CALCULATION,
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeSpent: 120,
        timestamp: Date.now(),
      };
      renderScreen([mockResult]);
      await waitFor(() => {
        expect(screen.getByText('8/10')).toBeTruthy();
      });
    });

    it('handles multiple exercises with different scores', async () => {
      const mockResults = [
        {
          exerciseType: ExerciseType.PAYOUT_CALCULATION,
          score: 50,
          totalQuestions: 10,
          correctAnswers: 5,
          timeSpent: 60,
          timestamp: 1000,
        },
        {
          exerciseType: ExerciseType.SPLIT_CALCULATION,
          score: 60,
          totalQuestions: 5,
          correctAnswers: 3,
          timeSpent: 45,
          timestamp: 2000,
        },
      ];
      renderScreen(mockResults);
      // 5 + 3 = 8 correct, 10 + 5 = 15 total, 8/15 = 53%
      await waitFor(() => {
        expect(screen.getByText('2')).toBeTruthy(); // completed count
        expect(screen.getByText('53%')).toBeTruthy(); // accuracy
      });
    });
  });
});
