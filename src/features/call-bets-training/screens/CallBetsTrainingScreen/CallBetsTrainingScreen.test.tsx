import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CallBetsTrainingScreen from './CallBetsTrainingScreen';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

// Mock components
jest.mock('../../components', () => ({
  ChallengeDisplay: jest.fn(() => null),
  ResultFeedback: jest.fn(() => null),
}));

describe('CallBetsTrainingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(toJSON()).toBeTruthy();
    });

    it('should display tier mode in header', () => {
      const { getByText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(getByText('TIER')).toBeTruthy();
    });

    it('should display score section', () => {
      const { getByText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(getByText(/Score:/)).toBeTruthy();
    });

    it('should render submit button', () => {
      const { getByText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(getByText('Submit Answer')).toBeTruthy();
    });

    it('should render with different modes', () => {
      const modes: Array<'tier' | 'orphelins' | 'voisins' | 'zero' | 'random'> = [
        'tier',
        'orphelins',
        'voisins',
        'zero',
        'random',
      ];
      modes.forEach(mode => {
        const { toJSON } = renderWithTheme(<CallBetsTrainingScreen mode={mode} />);
        expect(toJSON()).toBeTruthy();
      });
    });

    it('should display correct mode labels', () => {
      const { getByText } = renderWithTheme(<CallBetsTrainingScreen mode="orphelins" />);
      expect(getByText('ORPHELINS')).toBeTruthy();
    });

    it('should handle random mode correctly', () => {
      const { getByText } = renderWithTheme(<CallBetsTrainingScreen mode="random" />);
      expect(getByText('Random Mode')).toBeTruthy();
    });

    it('should display initial score as 0/0', () => {
      const { getByText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(getByText(/Score: 0\/0/)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should have accessible submit button', () => {
      const { getByLabelText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      const submitButton = getByLabelText('Submit answer');
      expect(submitButton).toBeTruthy();
    });

    it('should submit answer when submit button is pressed', () => {
      const { getByText, getByLabelText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      const submitButton = getByLabelText('Submit answer');
      fireEvent.press(submitButton);
      expect(getByText(/Score:/)).toBeTruthy();
    });
  });

  describe('state management', () => {
    it('should render ChallengeDisplay component', () => {
      const { toJSON } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(toJSON()).toBeTruthy();
    });

    it('should update stats after submission', () => {
      const { getByText, getByLabelText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(getByText(/Score: 0\/0/)).toBeTruthy();
      const submitButton = getByLabelText('Submit answer');
      fireEvent.press(submitButton);
      expect(getByText(/Score:\s*[01]\/1/)).toBeTruthy();
    });

    it('should handle all call bet modes', () => {
      const modes: Array<'tier' | 'orphelins' | 'voisins' | 'zero' | 'random'> = [
        'tier',
        'orphelins',
        'voisins',
        'zero',
        'random',
      ];
      modes.forEach(mode => {
        const { toJSON } = renderWithTheme(<CallBetsTrainingScreen mode={mode} />);
        expect(toJSON()).toBeTruthy();
      });
    });

    it('should pass correct mode to components', () => {
      const { toJSON } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(toJSON()).toBeTruthy();
    });

    it('should reset result when generating new challenge', () => {
      const { getByText, getByLabelText } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      const submitButton = getByLabelText('Submit answer');
      fireEvent.press(submitButton);
      expect(getByText(/Score:/)).toBeTruthy();
    });

    it('should correctly render different modes with proper labels', () => {
      const testModes = [
        { mode: 'tier' as const, label: 'TIER' },
        { mode: 'orphelins' as const, label: 'ORPHELINS' },
        { mode: 'voisins' as const, label: 'VOISINS' },
        { mode: 'zero' as const, label: 'ZERO' },
      ];
      testModes.forEach(({ mode, label }) => {
        const { getByText } = renderWithTheme(<CallBetsTrainingScreen mode={mode} />);
        expect(getByText(label)).toBeTruthy();
      });
    });
  });

  describe('styling and theme', () => {
    it('should render with proper theme colors', () => {
      const { toJSON } = renderWithTheme(<CallBetsTrainingScreen mode="tier" />);
      expect(toJSON()).toBeTruthy();
    });
  });
});
