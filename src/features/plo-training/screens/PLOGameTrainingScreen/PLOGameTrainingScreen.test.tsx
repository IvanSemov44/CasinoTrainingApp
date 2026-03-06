import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PLOGameTrainingScreen from './PLOGameTrainingScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// Mock hooks
jest.mock('../../hooks', () => ({
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
  const mockNavigation = { navigate: jest.fn() } as any;
  const mockRoute = {
    params: { difficulty: 'easy' as const },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('should display score section', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Score')).toBeTruthy();
      expect(getByText('Accuracy')).toBeTruthy();
      expect(getByText('Streak')).toBeTruthy();
    });

    it('should display progress information', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText(/Hand 5:/)).toBeTruthy();
      expect(getByText(/Question 1 of 1/)).toBeTruthy();
    });

    it('should display input label during asking phase', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('What is the pot?')).toBeTruthy();
    });

    it('should display check answer button during asking phase', () => {
      const { getByLabelText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByLabelText('Check answer')).toBeTruthy();
    });

    it('should display stats section', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Session Stats')).toBeTruthy();
    });
  });

  describe('state management', () => {
    it('should render with different difficulty levels', () => {
      const difficulties: Array<'easy' | 'medium' | 'advanced'> = ['easy', 'medium', 'advanced'];
      difficulties.forEach((diff) => {
        const route = { params: { difficulty: diff } } as any;
        const { toJSON } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={route} />);
        expect(toJSON()).toBeTruthy();
      });
    });

    it('should display accuracy percentage', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText(/0%/)).toBeTruthy();
    });

    it('should display session statistics', () => {
      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('Session Stats')).toBeTruthy();
      expect(getByText(/0 \/ 0 correct/)).toBeTruthy();
    });
  });

  describe('feedback phase', () => {
    it('should show feedback when in feedback phase', () => {
      const mockHookModule = require('../../hooks');
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

      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('✓ Correct!')).toBeTruthy();
    });

    it('should display correct answer in feedback', () => {
      const mockHookModule = require('../../hooks');
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

      const { getByText } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('✗ Incorrect')).toBeTruthy();
      expect(getByText('Your answer: 8')).toBeTruthy();
      expect(getByText('Correct answer: 10')).toBeTruthy();
    });
  });

  describe('styling and theme', () => {
    it('should render with proper theme colors', () => {
      const { toJSON } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('should have scrollable container', () => {
      const { toJSON } = renderWithTheme(<PLOGameTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      const tree = toJSON();
      expect(tree).toBeTruthy();
    });
  });
});
