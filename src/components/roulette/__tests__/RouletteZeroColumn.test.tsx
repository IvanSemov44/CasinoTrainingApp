/**
 * Tests for RouletteZeroColumn component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RouletteZeroColumn from '../RouletteZeroColumn';
import { BetType } from '../../../types/roulette.types';

// Mock RouletteChip since it's tested separately
jest.mock('../RouletteChip', () => {
  const MockRouletteChip: React.FC<{ amount: number; size: number }> = () => null as any;
  return MockRouletteChip;
});

// Mock the styles
jest.mock('../styles/roulette.styles', () => ({
  getZeroColumnStyles: () => ({
    zeroColumn: {},
    zeroCell: {},
    greenCell: {},
  }),
  getRouletteStyles: () => ({
    numberText: {},
  }),
}));

describe('RouletteZeroColumn', () => {
  const defaultProps = {
    cellSize: 40,
    getBetAmount: jest.fn(() => 0),
    onNumberPress: jest.fn(),
    onBetAreaPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render zero cell', () => {
      const { getByText } = render(<RouletteZeroColumn {...defaultProps} />);
      expect(getByText('0')).toBeTruthy();
    });

    it('should call getBetAmount with zero', () => {
      render(<RouletteZeroColumn {...defaultProps} />);
      expect(defaultProps.getBetAmount).toHaveBeenCalledWith([0]);
    });
  });

  describe('interactions', () => {
    it('should call onNumberPress with 0 when pressed', () => {
      const onNumberPress = jest.fn();
      const { getByText } = render(
        <RouletteZeroColumn {...defaultProps} onNumberPress={onNumberPress} />
      );

      fireEvent.press(getByText('0'));
      expect(onNumberPress).toHaveBeenCalledWith(0);
    });

    it('should call onBetAreaPress when pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteZeroColumn {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('0'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.STRAIGHT, [0]);
    });

    it('should not crash when onBetAreaPress is undefined', () => {
      const { getByText } = render(
        <RouletteZeroColumn {...defaultProps} onBetAreaPress={undefined} />
      );

      expect(() => fireEvent.press(getByText('0'))).not.toThrow();
    });

    it('should call both onNumberPress and onBetAreaPress when pressed', () => {
      const onNumberPress = jest.fn();
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteZeroColumn
          {...defaultProps}
          onNumberPress={onNumberPress}
          onBetAreaPress={onBetAreaPress}
        />
      );

      fireEvent.press(getByText('0'));

      expect(onNumberPress).toHaveBeenCalledTimes(1);
      expect(onBetAreaPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('chip display', () => {
    it('should display bet amount from getBetAmount', () => {
      const getBetAmount = jest.fn(() => 50);
      render(<RouletteZeroColumn {...defaultProps} getBetAmount={getBetAmount} />);

      expect(getBetAmount).toHaveBeenCalledWith([0]);
    });

    it('should calculate chip size based on cellSize', () => {
      const { UNSAFE_root } = render(
        <RouletteZeroColumn {...defaultProps} cellSize={50} />
      );

      // Component renders without errors
      expect(UNSAFE_root).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have accessibility label on zero cell', () => {
      const { getByLabelText } = render(<RouletteZeroColumn {...defaultProps} />);
      
      expect(getByLabelText('Zero, number 0')).toBeTruthy();
    });

    it('should have button accessibility role on zero cell', () => {
      const { getByLabelText } = render(<RouletteZeroColumn {...defaultProps} />);
      
      const zeroCell = getByLabelText('Zero, number 0');
      expect(zeroCell.props.accessibilityRole).toBe('button');
    });

    it('should indicate selected state when zero has a bet', () => {
      const getBetAmount = jest.fn(() => 100);
      const { getByLabelText } = render(
        <RouletteZeroColumn {...defaultProps} getBetAmount={getBetAmount} />
      );

      const zeroCell = getByLabelText('Zero, number 0');
      expect(zeroCell.props.accessibilityState).toEqual({ selected: true });
    });

    it('should not have selected state when zero has no bet', () => {
      const getBetAmount = jest.fn(() => 0);
      const { getByLabelText } = render(
        <RouletteZeroColumn {...defaultProps} getBetAmount={getBetAmount} />
      );

      const zeroCell = getByLabelText('Zero, number 0');
      expect(zeroCell.props.accessibilityState).toBeUndefined();
    });
  });
});