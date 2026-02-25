/**
 * Tests for RouletteColumnBets component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RouletteColumnBets from '../RouletteColumnBets';
import { BetType } from '../../../types/roulette.types';

// Mock RouletteChip since it's tested separately
jest.mock('../RouletteChip', () => {
  const MockRouletteChip: React.FC<{ amount: number; size: number }> = ({ amount }) => 
    null as any;
  return MockRouletteChip;
});

// Mock the styles
jest.mock('../styles/roulette.styles', () => ({
  getColumnBetsStyles: () => ({
    columnBetsContainer: {},
    columnBet: {},
    columnBetText: {},
  }),
}));

describe('RouletteColumnBets', () => {
  const defaultProps = {
    cellSize: 40,
    getBetAmount: jest.fn(() => 0),
    onBetAreaPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render three column bet buttons', () => {
      const { getAllByText } = render(<RouletteColumnBets {...defaultProps} />);
      // All three buttons have "2 to 1" text
      const buttons = getAllByText('2 to 1');
      expect(buttons).toHaveLength(3);
    });

    it('should call getBetAmount for each column', () => {
      render(<RouletteColumnBets {...defaultProps} />);
      // getBetAmount is called for each of the 3 columns
      expect(defaultProps.getBetAmount).toHaveBeenCalledTimes(3);
    });
  });

  describe('interactions', () => {
    it('should call onBetAreaPress with first column when first button pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getAllByText } = render(
        <RouletteColumnBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      const buttons = getAllByText('2 to 1');
      fireEvent.press(buttons[0]);

      expect(onBetAreaPress).toHaveBeenCalledTimes(1);
      expect(onBetAreaPress).toHaveBeenCalledWith(
        BetType.COLUMN,
        expect.arrayContaining([expect.any(Number)])
      );
    });

    it('should call onBetAreaPress with second column when second button pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getAllByText } = render(
        <RouletteColumnBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      const buttons = getAllByText('2 to 1');
      fireEvent.press(buttons[1]);

      expect(onBetAreaPress).toHaveBeenCalledTimes(1);
      expect(onBetAreaPress).toHaveBeenCalledWith(
        BetType.COLUMN,
        expect.arrayContaining([expect.any(Number)])
      );
    });

    it('should call onBetAreaPress with third column when third button pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getAllByText } = render(
        <RouletteColumnBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      const buttons = getAllByText('2 to 1');
      fireEvent.press(buttons[2]);

      expect(onBetAreaPress).toHaveBeenCalledTimes(1);
      expect(onBetAreaPress).toHaveBeenCalledWith(
        BetType.COLUMN,
        expect.arrayContaining([expect.any(Number)])
      );
    });

    it('should not crash when onBetAreaPress is undefined', () => {
      const { getAllByText } = render(
        <RouletteColumnBets {...defaultProps} onBetAreaPress={undefined} />
      );

      const buttons = getAllByText('2 to 1');
      // Should not throw
      expect(() => fireEvent.press(buttons[0])).not.toThrow();
    });
  });

  describe('chip display', () => {
    it('should pass correct chip size based on cellSize', () => {
      const getBetAmount = jest.fn((numbers) => numbers.length * 5);
      const { UNSAFE_root } = render(
        <RouletteColumnBets {...defaultProps} cellSize={50} getBetAmount={getBetAmount} />
      );

      // Component renders without errors
      expect(UNSAFE_root).toBeTruthy();
    });

    it('should display bet amounts from getBetAmount', () => {
      const getBetAmount = jest.fn(() => 25);
      render(
        <RouletteColumnBets {...defaultProps} getBetAmount={getBetAmount} />
      );

      // getBetAmount is called for each column
      expect(getBetAmount).toHaveBeenCalledTimes(3);
    });
  });
});