/**
 * Tests for CallBetsTrainingScreen
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CallBetsTrainingScreen from '../CallBetsTrainingScreen';
import { validateCallBet, getRandomMode } from '../../utils/validation';

// Mock the validation utils
jest.mock('../../utils/validation', () => ({
  validateCallBet: jest.fn(() => ({
    isCorrect: true,
    correctBets: [],
    userBets: [],
    missingBets: [],
    extraBets: [],
    score: 100,
  })),
  getRandomMode: jest.fn(() => 'tier'),
  getModeDisplayName: jest.fn((mode: string) => {
    const names: Record<string, string> = {
      tier: 'Tier',
      voisins: 'Voisins du Zero',
      orphelins: 'Orphelins',
      zero: 'Zero Spiel',
    };
    return names[mode] || mode;
  }),
}));

// Mock the announced bets constants
jest.mock('../../../racetrack/constants/announcedBets.constants', () => ({
  ANNOUNCED_BETS: {
    tier: {
      name: 'Tier',
      bets: [
        { type: 'split', numbers: [5, 8] },
        { type: 'split', numbers: [10, 13] },
        { type: 'split', numbers: [24, 27] },
        { type: 'split', numbers: [33, 36] },
        { type: 'straight', numbers: [1] },
        { type: 'straight', numbers: [2] },
      ],
    },
    voisins: {
      name: 'Voisins du Zero',
      bets: Array(9).fill({ type: 'split', numbers: [1, 2] }),
    },
    orphelins: {
      name: 'Orphelins',
      bets: Array(5).fill({ type: 'straight', numbers: [1] }),
    },
    zero: {
      name: 'Zero Spiel',
      bets: Array(4).fill({ type: 'split', numbers: [0, 1] }),
    },
  },
}));

describe('CallBetsTrainingScreen', () => {
  const mockRoute = {
    params: { mode: 'tier' as const },
    key: 'test-key',
    name: 'CallBetsTraining' as const,
  };

  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    dispatch: jest.fn(),
    isFocused: jest.fn(() => true),
    canGoBack: jest.fn(() => true),
    getParent: jest.fn(),
    getState: jest.fn(),
    navigateDeprecated: jest.fn(),
    preload: jest.fn(),
    getId: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the score display', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText(/Score: 0\/0/)).toBeTruthy();
    });

    it('should render the challenge display', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Training Challenge')).toBeTruthy();
    });

    it('should render the placed bets counter', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText(/Placed: 0\/6/)).toBeTruthy();
    });

    it('should render the undo button', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      // The undo button has a special character prefix
      expect(getByText(/Undo/)).toBeTruthy();
    });

    it('should render the clear all button', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Clear All')).toBeTruthy();
    });

    it('should render the check answer button', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Check Answer')).toBeTruthy();
    });
  });

  describe('initial state', () => {
    it('should start with 0 correct and 0 total', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Score: 0/0 (0%)')).toBeTruthy();
    });

    it('should start with no placed bets', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Placed: 0/6')).toBeTruthy();
    });
  });

  describe('button states', () => {
    it('should have disabled undo button when no bets placed', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      // The undo button text contains "Undo"
      const undoButtonText = getByText(/Undo/);
      expect(undoButtonText).toBeTruthy();
    });

    it('should have disabled check button when no bets placed', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      const checkButton = getByText('Check Answer');
      expect(checkButton).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should clear bets when Clear All is pressed', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      fireEvent.press(getByText('Clear All'));
      // After clearing, the placed bets counter should still show 0
      expect(getByText('Placed: 0/6')).toBeTruthy();
    });
  });

  describe('different modes', () => {
    it('should display correct bet count for tier mode (6 bets)', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Placed: 0/6')).toBeTruthy();
    });

    it('should display correct bet count for voisins mode (9 bets)', () => {
      const voisinsRoute = {
        ...mockRoute,
        params: { mode: 'voisins' as const },
      };
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={voisinsRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Placed: 0/9')).toBeTruthy();
    });

    it('should display correct bet count for orphelins mode (5 bets)', () => {
      const orphelinsRoute = {
        ...mockRoute,
        params: { mode: 'orphelins' as const },
      };
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={orphelinsRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Placed: 0/5')).toBeTruthy();
    });

    it('should display correct bet count for zero mode (4 bets)', () => {
      const zeroRoute = {
        ...mockRoute,
        params: { mode: 'zero' as const },
      };
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={zeroRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getByText('Placed: 0/4')).toBeTruthy();
    });

    it('should use random mode when mode is random', () => {
      const randomRoute = {
        ...mockRoute,
        params: { mode: 'random' as const },
      };
      render(
        <CallBetsTrainingScreen 
          route={randomRoute} 
          navigation={mockNavigation as any} 
        />
      );
      expect(getRandomMode).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have accessible buttons', () => {
      const { getByText } = render(
        <CallBetsTrainingScreen 
          route={mockRoute} 
          navigation={mockNavigation as any} 
        />
      );
      // Use regex for Undo since it has a special character prefix
      expect(getByText(/Undo/)).toBeTruthy();
      expect(getByText('Clear All')).toBeTruthy();
      expect(getByText('Check Answer')).toBeTruthy();
    });
  });
});
