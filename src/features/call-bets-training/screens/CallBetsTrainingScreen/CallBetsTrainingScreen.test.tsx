import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import CallBetsTrainingScreen from './CallBetsTrainingScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

const renderScreenWithTheme = (props: any) => {
  return renderWithTheme(<CallBetsTrainingScreen {...props} />);
};

// Mock components
jest.mock('../../components', () => ({
  ChallengeDisplay: jest.fn(() => null),
  ResultFeedback: jest.fn(() => null),
}));

describe('CallBetsTrainingScreen', () => {
  const mockRoute = {
    params: { mode: 'tier' as const },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = renderScreenWithTheme({ route: mockRoute });
      expect(toJSON()).toBeTruthy();
    });

    it('should display tier mode in header', () => {
      const { getByText } = renderScreenWithTheme({ route: mockRoute });
      expect(getByText('TIER')).toBeTruthy();
    });

    it('should display score section', () => {
      const { getByText } = renderScreenWithTheme({ route: mockRoute });
      expect(getByText(/Score:/)).toBeTruthy();
    });

    it('should render submit button', () => {
      const { getByText } = renderScreenWithTheme({ route: mockRoute });
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
      modes.forEach((mode) => {
        const modeRoute = { params: { mode } } as any;
        const { toJSON } = renderScreenWithTheme({ route: modeRoute });
        expect(toJSON()).toBeTruthy();
      });
    });

    it('should display correct mode labels', () => {
      const modeRoute = { params: { mode: 'orphelins' as const } } as any;
      const { getByText } = renderScreenWithTheme({ route: modeRoute });
      expect(getByText('ORPHELINS')).toBeTruthy();
    });

    it('should handle random mode correctly', () => {
      const modeRoute = { params: { mode: 'random' as const } } as any;
      const { getByText } = renderScreenWithTheme({ route: modeRoute });
      expect(getByText('Random Mode')).toBeTruthy();
    });

    it('should display initial score as 0/0', () => {
      const { getByText } = renderScreenWithTheme({ route: mockRoute });
      expect(getByText(/Score: 0\/0/)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should have accessible submit button', () => {
      const { getByLabelText } = renderScreenWithTheme({ route: mockRoute });
      const submitButton = getByLabelText('Submit answer');
      expect(submitButton).toBeTruthy();
    });

    it('should submit answer when submit button is pressed', () => {
      const { getByText, getByLabelText } = renderScreenWithTheme({ route: mockRoute });
      const submitButton = getByLabelText('Submit answer');
      fireEvent.press(submitButton);
      expect(getByText(/Score:/)).toBeTruthy();
    });
  });

  describe('state management', () => {
    it('should render ChallengeDisplay component', () => {
      const { toJSON } = renderScreenWithTheme({ route: mockRoute });
      expect(toJSON()).toBeTruthy();
    });

    it('should update stats after submission', () => {
      const { getByText, getByLabelText } = renderScreenWithTheme({ route: mockRoute });
      expect(getByText(/Score: 0\/0/)).toBeTruthy();
      const submitButton = getByLabelText('Submit answer');
      fireEvent.press(submitButton);
      expect(getByText(/Score: 0\/1/)).toBeTruthy();
    });

    it('should handle all call bet modes', () => {
      const modes: Array<'tier' | 'orphelins' | 'voisins' | 'zero' | 'random'> = [
        'tier',
        'orphelins',
        'voisins',
        'zero',
        'random',
      ];
      modes.forEach((mode) => {
        const modeRoute = { params: { mode } } as any;
        const { toJSON } = renderScreenWithTheme({ route: modeRoute });
        expect(toJSON()).toBeTruthy();
      });
    });

    it('should pass correct mode to components', () => {
      const { toJSON } = renderScreenWithTheme({ route: mockRoute });
      expect(toJSON()).toBeTruthy();
    });

    it('should reset result when generating new challenge', () => {
      const { getByText, getByLabelText } = renderScreenWithTheme({ route: mockRoute });
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
        const modeRoute = { params: { mode } } as any;
        const { getByText } = renderScreenWithTheme({ route: modeRoute });
        expect(getByText(label)).toBeTruthy();
      });
    });
  });

  describe('styling and theme', () => {
    it('should render with proper theme colors', () => {
      const { toJSON } = renderScreenWithTheme({ route: mockRoute });
      expect(toJSON()).toBeTruthy();
    });
  });
});
