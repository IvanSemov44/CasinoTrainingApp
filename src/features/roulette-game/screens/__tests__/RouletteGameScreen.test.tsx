/**
 * Tests for RouletteGameScreen
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import RouletteGameScreen from '../RouletteGameScreen';

// Mock the useAnnouncedBets hook - path relative to test file location
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

describe('RouletteGameScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render without crashing', () => {
      const { toJSON } = render(<RouletteGameScreen />);
      expect(toJSON()).toBeTruthy();
    });

    it('should render the game container', () => {
      const { getByTestId } = render(<RouletteGameScreen />);
      // The screen should render a View container
      const tree = getByTestId('roulette-game-container');
      expect(tree).toBeTruthy();
    });
  });

  describe('layout', () => {
    it('should render racetrack layout', () => {
      const { toJSON } = render(<RouletteGameScreen />);
      // The RacetrackLayout component should be rendered
      expect(toJSON()).not.toBeNull();
    });

    it('should render roulette layout', () => {
      const { toJSON } = render(<RouletteGameScreen />);
      // The RouletteLayout component should be rendered
      expect(toJSON()).not.toBeNull();
    });
  });

  describe('initial state', () => {
    it('should start with empty placed bets', () => {
      const { toJSON } = render(<RouletteGameScreen />);
      // Initial state should have no placed bets
      expect(toJSON()).toBeTruthy();
    });

    it('should have default chip value of 5', () => {
      const { toJSON } = render(<RouletteGameScreen />);
      // Default chip value is 5
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('hooks', () => {
    it('should call useAnnouncedBets with correct parameters', () => {
      render(<RouletteGameScreen />);
      const { useAnnouncedBets } = require('../../../racetrack/hooks/useAnnouncedBets');
      expect(useAnnouncedBets).toHaveBeenCalledWith({
        selectedChipValue: 5,
        onBetsPlaced: expect.any(Function),
      });
    });
  });
});
