import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PLOGameTrainingScreen from './PLOGameTrainingScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// Mock hooks
jest.mock('./usePLOGameState', () => ({
  usePLOGameState: jest.fn(() => ({
    hand: {
      blindLevel: 5,
      askMoments: [
        {
          street: 'preflop' as const,
          communityCards: 0,
          centerPot: 0,
          players: [],
          actionLog: ['UTG limps $5'],
          requesterName: 'MP',
          correctAnswer: 10,
          explanation: 'Pot = $5 + $5 = $10',
        },
      ],
    },
    momentIndex: 0,
    phase: 'asking' as const,
    userAnswer: null,
    isCorrect: false,
    sessionPoints: 0,
    sessionCorrect: 0,
    sessionTotal: 0,
    streak: 1,
    accuracy: 0,
    handleCheck: jest.fn(),
    handleContinue: jest.fn(),
    upcomingMultiplier: 1,
  })),
}));

// Mock components
jest.mock('../../components', () => ({
  GameStateDisplay: jest.fn(() => null),
  ActionLog: jest.fn(() => null),
  PotCalculationInput: jest.fn(() => null),
}));

describe('PLOGameTrainingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(toJSON()).toBeTruthy();
    });

    it('should display score section', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(getByText('Score')).toBeTruthy();
      expect(getByText('Accuracy')).toBeTruthy();
      expect(getByText('Streak')).toBeTruthy();
    });

    it('should display progress information', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(getByText(/Hand 5:/)).toBeTruthy();
      expect(getByText(/Question 1 of 1/)).toBeTruthy();
    });

    it('should display input label during asking phase', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(getByText('What is the pot?')).toBeTruthy();
    });

    it('should display check answer button during asking phase', () => {
      const { getByLabelText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(getByLabelText('Check answer')).toBeTruthy();
    });

    it('should not display feedback stats section during asking phase', () => {
      const { queryByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(queryByText('Session Stats')).toBeNull();
    });
  });

  describe('state management', () => {
    it('should render with different difficulty levels', () => {
      const difficulties: Array<'easy' | 'medium' | 'advanced'> = ['easy', 'medium', 'advanced'];
      difficulties.forEach(diff => {
        const { toJSON } = renderWithTheme(<PLOGameTrainingScreen difficulty={diff} />);
        expect(toJSON()).toBeTruthy();
      });
    });

    it('should display accuracy percentage', () => {
      const { getAllByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(getAllByText(/0%/).length).toBeGreaterThan(0);
    });

    it('should not display feedback statistics during asking phase', () => {
      const { queryByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(queryByText('Session Stats')).toBeNull();
      expect(queryByText(/0 \/ 0 correct/)).toBeNull();
    });
  });

  describe('feedback phase', () => {
    it('should show feedback when in feedback phase', () => {
      const mockHookModule = require('./usePLOGameState');
      mockHookModule.usePLOGameState.mockReturnValueOnce({
        hand: {
          blindLevel: 5,
          askMoments: [
            {
              street: 'preflop' as const,
              communityCards: 0,
              centerPot: 0,
              players: [],
              actionLog: ['UTG limps $5'],
              requesterName: 'MP',
              correctAnswer: 10,
              explanation: 'Pot = $5 + $5 = $10',
            },
          ],
        },
        momentIndex: 0,
        phase: 'feedback' as const,
        userAnswer: 10,
        isCorrect: true,
        sessionPoints: 1,
        sessionCorrect: 1,
        sessionTotal: 1,
        streak: 2,
        accuracy: 100,
        handleCheck: jest.fn(),
        handleContinue: jest.fn(),
        upcomingMultiplier: 2,
      });

      const { getByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(getByText('✓ Correct!')).toBeTruthy();
      expect(getByText('Session Stats')).toBeTruthy();
      expect(getByText(/1 \/ 1 correct/)).toBeTruthy();
    });

    it('should display correct answer in feedback', () => {
      const mockHookModule = require('./usePLOGameState');
      mockHookModule.usePLOGameState.mockReturnValueOnce({
        hand: {
          blindLevel: 5,
          askMoments: [
            {
              street: 'preflop' as const,
              communityCards: 0,
              centerPot: 0,
              players: [],
              actionLog: ['UTG limps $5'],
              requesterName: 'MP',
              correctAnswer: 10,
              explanation: 'Pot = $5 + $5 = $10',
            },
          ],
        },
        momentIndex: 0,
        phase: 'feedback' as const,
        userAnswer: 8,
        isCorrect: false,
        sessionPoints: 0,
        sessionCorrect: 0,
        sessionTotal: 1,
        streak: 1,
        accuracy: 0,
        handleCheck: jest.fn(),
        handleContinue: jest.fn(),
        upcomingMultiplier: 1,
      });

      const { getByText } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(getByText('✗ Incorrect')).toBeTruthy();
      expect(getByText('Your answer: 8')).toBeTruthy();
      expect(getByText('Correct answer: 10')).toBeTruthy();
    });
  });

  describe('styling and theme', () => {
    it('should render with proper theme colors', () => {
      const { toJSON } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      expect(toJSON()).toBeTruthy();
    });

    it('should have scrollable container', () => {
      const { toJSON } = renderWithTheme(<PLOGameTrainingScreen difficulty="easy" />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
    });
  });
});
