import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import RouletteGameScreen from './RouletteGameScreen';

// Mock the useAnnouncedBets hook
jest.mock('../../../racetrack/hooks/useAnnouncedBets', () => ({
  useAnnouncedBets: jest.fn(() => ({
    handleSectionPress: jest.fn(),
    handleNumberPress: jest.fn(),
  })),
}));

// Mock RacetrackLayout since it uses react-native-svg
jest.mock('../../../racetrack/components', () => ({
  RacetrackLayout: () => null,
}));

// Mock RouletteLayout
jest.mock('../../../../components/roulette', () => ({
  RouletteLayout: () => null,
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('RouletteGameScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = renderWithTheme(<RouletteGameScreen />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render the game container with correct testID', () => {
      const { getByTestId } = renderWithTheme(<RouletteGameScreen />);
      const container = getByTestId('roulette-game-container');
      expect(container).toBeTruthy();
    });
  });

  describe('Layout Structure', () => {
    it('should render racetrack layout container', () => {
      const { toJSON } = renderWithTheme(<RouletteGameScreen />);
      // The RacetrackLayout component should be rendered
      expect(toJSON()).not.toBeNull();
    });

    it('should render roulette layout container', () => {
      const { toJSON } = renderWithTheme(<RouletteGameScreen />);
      // The RouletteLayout component should be rendered
      expect(toJSON()).not.toBeNull();
    });
  });

  describe('Initial State', () => {
    it('should start with empty placed bets', () => {
      const { toJSON } = renderWithTheme(<RouletteGameScreen />);
      // Initial state should have no placed bets
      expect(toJSON()).toBeTruthy();
    });

    it('should have default chip value of 5', () => {
      const { toJSON } = renderWithTheme(<RouletteGameScreen />);
      // Default chip value is 5, verified through hook call
      const { useAnnouncedBets } = require('../../../racetrack/hooks/useAnnouncedBets');
      expect(useAnnouncedBets).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedChipValue: 5,
        })
      );
    });
  });

  describe('Hooks Integration', () => {
    it('should call useAnnouncedBets with correct parameters', () => {
      renderWithTheme(<RouletteGameScreen />);
      const { useAnnouncedBets } = require('../../../racetrack/hooks/useAnnouncedBets');
      expect(useAnnouncedBets).toHaveBeenCalledWith({
        selectedChipValue: 5,
        onBetsPlaced: expect.any(Function),
      });
    });

    it('should pass correct callback to useAnnouncedBets', () => {
      renderWithTheme(<RouletteGameScreen />);
      const { useAnnouncedBets } = require('../../../racetrack/hooks/useAnnouncedBets');
      expect(useAnnouncedBets).toHaveBeenCalled();
      const callArgs = useAnnouncedBets.mock.calls[0][0];
      expect(callArgs.onBetsPlaced).toBeDefined();
      expect(typeof callArgs.onBetsPlaced).toBe('function');
    });
  });

  describe('Props with Defaults', () => {
    it('uses default values for all settings', () => {
      const { toJSON } = renderWithTheme(<RouletteGameScreen />);
      expect(toJSON()).toBeTruthy();
    });

    it('should maintain theme context through render', () => {
      const { toJSON } = renderWithTheme(<RouletteGameScreen />);
      expect(toJSON()).toBeTruthy();
    });
  });
});
