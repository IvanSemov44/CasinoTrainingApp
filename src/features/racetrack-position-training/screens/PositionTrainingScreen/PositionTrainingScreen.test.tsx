import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PositionTrainingScreen from './PositionTrainingScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PositionTrainingScreen', () => {
  const mockNavigation = { navigate: jest.fn() } as any;
  const mockRoute = {
    params: { mode: 'random' as const },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with single mode param', () => {
      const singleRoute = {
        params: { mode: 'single' as const },
      } as any;
      const { toJSON } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={singleRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Mode Handling', () => {
    it('handles random mode', () => {
      const randomRoute = {
        params: { mode: 'random' as const },
      } as any;
      const { toJSON } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={randomRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles single mode', () => {
      const singleRoute = {
        params: { mode: 'single' as const },
      } as any;
      const { toJSON } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={singleRoute} />);
      expect(toJSON()).toBeTruthy();
    });

    it('uses random mode as default if not provided', () => {
      const emptyRoute = {
        params: {},
      } as any;
      const { toJSON } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={emptyRoute} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('HUD Elements', () => {
    it('displays score section', () => {
      const { getByText } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('score')).toBeTruthy();
      expect(getByText('accuracy')).toBeTruthy();
    });

    it('displays target section', () => {
      const { getByText } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText('FIND NUMBER')).toBeTruthy();
    });

    it('displays on the racetrack instruction', () => {
      const { getByText } = renderWithTheme(<PositionTrainingScreen navigation={mockNavigation} route={mockRoute} />);
      expect(getByText(/on the racetrack/)).toBeTruthy();
    });
  });
});
