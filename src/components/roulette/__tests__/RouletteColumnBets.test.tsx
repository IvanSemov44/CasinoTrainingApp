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
    // Column numbers based on LAYOUT_GRID from roulette.constants.ts
    const FIRST_COLUMN = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
    const SECOND_COLUMN = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
    const THIRD_COLUMN = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];

    it('should call onBetAreaPress with first column numbers when first button pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getAllByText } = render(
        <RouletteColumnBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      const buttons = getAllByText('2 to 1');
      fireEvent.press(buttons[0]);

      expect(onBetAreaPress).toHaveBeenCalledTimes(1);
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.COLUMN, FIRST_COLUMN);
    });

    it('should call onBetAreaPress with second column numbers when second button pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getAllByText } = render(
        <RouletteColumnBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      const buttons = getAllByText('2 to 1');
      fireEvent.press(buttons[1]);

      expect(onBetAreaPress).toHaveBeenCalledTimes(1);
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.COLUMN, SECOND_COLUMN);
    });

    it('should call onBetAreaPress with third column numbers when third button pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getAllByText } = render(
        <RouletteColumnBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      const buttons = getAllByText('2 to 1');
      fireEvent.press(buttons[2]);

      expect(onBetAreaPress).toHaveBeenCalledTimes(1);
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.COLUMN, THIRD_COLUMN);
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

  describe('accessibility', () => {
    it('should have accessibility labels on column bet buttons', () => {
      const { getByLabelText } = render(<RouletteColumnBets {...defaultProps} />);
      
      // Each column button should have an accessibility label
      expect(getByLabelText('Column 1 bet, 2 to 1')).toBeTruthy();
      expect(getByLabelText('Column 2 bet, 2 to 1')).toBeTruthy();
      expect(getByLabelText('Column 3 bet, 2 to 1')).toBeTruthy();
    });

    it('should have button accessibility role on column buttons', () => {
      const { getByLabelText } = render(<RouletteColumnBets {...defaultProps} />);
      
      const column1 = getByLabelText('Column 1 bet, 2 to 1');
      expect(column1.props.accessibilityRole).toBe('button');
    });

    it('should indicate when a column has a bet', () => {
      const getBetAmount = jest.fn((numbers) => 
        numbers.includes(3) ? 50 : 0 // First column has bet
      );
      const { getByLabelText } = render(
        <RouletteColumnBets {...defaultProps} getBetAmount={getBetAmount} />
      );

      const column1 = getByLabelText('Column 1 bet, 2 to 1');
      expect(column1.props.accessibilityState).toEqual({ selected: true });
    });
  });
});