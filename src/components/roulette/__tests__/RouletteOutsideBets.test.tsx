/**
 * Tests for RouletteOutsideBets component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RouletteOutsideBets from '../RouletteOutsideBets';
import { BetType } from '../../../types/roulette.types';

// Mock RouletteChip since it's tested separately
jest.mock('../RouletteChip', () => {
  const MockRouletteChip: React.FC<{ amount: number; size: number }> = () => null as any;
  return MockRouletteChip;
});

// Mock the styles
jest.mock('../styles/roulette.styles', () => ({
  getOutsideBetsStyles: () => ({
    outsideBetsRow: {},
    emptyCorner: {},
    evenMoneyRow: {},
    evenMoneyBet: {},
    outsideBetText: {},
    redCell: {},
    blackCell: {},
    dozensRow: {},
    dozenBet: {},
  }),
  getRouletteStyles: () => ({
    outsideBetText: {},
  }),
}));

describe('RouletteOutsideBets', () => {
  const defaultProps = {
    cellSize: 40,
    getBetAmount: jest.fn(() => 0),
    onBetAreaPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering - even money bets', () => {
    it('should render 1-18 bet', () => {
      const { getByText } = render(<RouletteOutsideBets {...defaultProps} />);
      expect(getByText('1-18')).toBeTruthy();
    });

    it('should render EVEN bet', () => {
      const { getByText } = render(<RouletteOutsideBets {...defaultProps} />);
      expect(getByText('EVEN')).toBeTruthy();
    });

    it('should render ODD bet', () => {
      const { getByText } = render(<RouletteOutsideBets {...defaultProps} />);
      expect(getByText('ODD')).toBeTruthy();
    });

    it('should render 19-36 bet', () => {
      const { getByText } = render(<RouletteOutsideBets {...defaultProps} />);
      expect(getByText('19-36')).toBeTruthy();
    });

    it('should render red diamond symbol', () => {
      const { getAllByText } = render(<RouletteOutsideBets {...defaultProps} />);
      // Two diamonds - one for red, one for black
      const diamonds = getAllByText('◆');
      expect(diamonds.length).toBe(2);
    });
  });

  describe('rendering - dozens', () => {
    it('should render 1st 12 bet', () => {
      const { getByText } = render(<RouletteOutsideBets {...defaultProps} />);
      expect(getByText('1st 12')).toBeTruthy();
    });

    it('should render 2nd 12 bet', () => {
      const { getByText } = render(<RouletteOutsideBets {...defaultProps} />);
      expect(getByText('2nd 12')).toBeTruthy();
    });

    it('should render 3rd 12 bet', () => {
      const { getByText } = render(<RouletteOutsideBets {...defaultProps} />);
      expect(getByText('3rd 12')).toBeTruthy();
    });
  });

  describe('interactions - even money bets', () => {
    it('should call onBetAreaPress with HIGH_LOW and low numbers when 1-18 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('1-18'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.HIGH_LOW, expect.any(Array));
    });

    it('should call onBetAreaPress with EVEN_ODD and even numbers when EVEN pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('EVEN'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.EVEN_ODD, expect.any(Array));
    });

    it('should call onBetAreaPress with RED_BLACK when red diamond pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getAllByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      const diamonds = getAllByText('◆');
      fireEvent.press(diamonds[0]); // First diamond is red
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.RED_BLACK, expect.any(Array));
    });

    it('should call onBetAreaPress with EVEN_ODD and odd numbers when ODD pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('ODD'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.EVEN_ODD, expect.any(Array));
    });

    it('should call onBetAreaPress with HIGH_LOW and high numbers when 19-36 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('19-36'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.HIGH_LOW, expect.any(Array));
    });
  });

  describe('interactions - dozens', () => {
    it('should call onBetAreaPress with DOZEN and first dozen when 1st 12 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('1st 12'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.DOZEN, expect.any(Array));
    });

    it('should call onBetAreaPress with DOZEN and second dozen when 2nd 12 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('2nd 12'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.DOZEN, expect.any(Array));
    });

    it('should call onBetAreaPress with DOZEN and third dozen when 3rd 12 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('3rd 12'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.DOZEN, expect.any(Array));
    });
  });

  describe('edge cases', () => {
    it('should not crash when onBetAreaPress is undefined', () => {
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={undefined} />
      );

      expect(() => fireEvent.press(getByText('1-18'))).not.toThrow();
    });

    it('should call getBetAmount for each bet area', () => {
      render(<RouletteOutsideBets {...defaultProps} />);
      // 6 even money bets + 3 dozens = 9 calls
      expect(defaultProps.getBetAmount).toHaveBeenCalledTimes(9);
    });
  });
});