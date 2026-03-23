import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PositionTrainingScreen from './PositionTrainingScreen';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PositionTrainingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { toJSON } = renderWithTheme(<PositionTrainingScreen mode="random" />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders with single mode param', () => {
      const { toJSON } = renderWithTheme(<PositionTrainingScreen mode="single" />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('Mode Handling', () => {
    it('handles random mode', () => {
      const { toJSON } = renderWithTheme(<PositionTrainingScreen mode="random" />);
      expect(toJSON()).toBeTruthy();
    });

    it('handles single mode', () => {
      const { toJSON } = renderWithTheme(<PositionTrainingScreen mode="single" />);
      expect(toJSON()).toBeTruthy();
    });

    it('uses random mode as default if not provided', () => {
      const { toJSON } = renderWithTheme(<PositionTrainingScreen />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('HUD Elements', () => {
    it('displays score section', () => {
      const { getByText } = renderWithTheme(<PositionTrainingScreen mode="random" />);
      expect(getByText('score')).toBeTruthy();
      expect(getByText('accuracy')).toBeTruthy();
    });

    it('displays target section', () => {
      const { getByText } = renderWithTheme(<PositionTrainingScreen mode="random" />);
      expect(getByText('FIND NUMBER')).toBeTruthy();
    });

    it('displays on the racetrack instruction', () => {
      const { getByText } = renderWithTheme(<PositionTrainingScreen mode="random" />);
      expect(getByText(/on the racetrack/)).toBeTruthy();
    });
  });
});
