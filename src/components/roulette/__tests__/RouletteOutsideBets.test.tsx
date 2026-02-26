/**
 * Tests for RouletteOutsideBets component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RouletteOutsideBets, {
  LOW_NUMBERS,
  HIGH_NUMBERS,
  EVEN_NUMBERS,
  ODD_NUMBERS,
  RED_NUMBERS,
  BLACK_NUMBERS,
  FIRST_DOZEN,
  SECOND_DOZEN,
  THIRD_DOZEN,
} from '../RouletteOutsideBets';
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
    it('should call onBetAreaPress with HIGH_LOW and correct low numbers when 1-18 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('1-18'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.HIGH_LOW, LOW_NUMBERS);
      expect(LOW_NUMBERS).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    });

    it('should call onBetAreaPress with EVEN_ODD and correct even numbers when EVEN pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('EVEN'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.EVEN_ODD, EVEN_NUMBERS);
      expect(EVEN_NUMBERS).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]);
    });

    it('should call onBetAreaPress with RED_BLACK and correct red numbers when red diamond pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByLabelText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByLabelText('Red numbers'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.RED_BLACK, RED_NUMBERS);
      expect(RED_NUMBERS).toEqual([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
    });

    it('should call onBetAreaPress with RED_BLACK and correct black numbers when black diamond pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByLabelText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByLabelText('Black numbers'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.RED_BLACK, BLACK_NUMBERS);
      expect(BLACK_NUMBERS).toEqual([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]);
    });

    it('should call onBetAreaPress with EVEN_ODD and correct odd numbers when ODD pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('ODD'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.EVEN_ODD, ODD_NUMBERS);
      expect(ODD_NUMBERS).toEqual([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]);
    });

    it('should call onBetAreaPress with HIGH_LOW and correct high numbers when 19-36 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('19-36'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.HIGH_LOW, HIGH_NUMBERS);
      expect(HIGH_NUMBERS).toEqual([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
    });
  });

  describe('interactions - dozens', () => {
    it('should call onBetAreaPress with DOZEN and correct first dozen when 1st 12 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('1st 12'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.DOZEN, FIRST_DOZEN);
      expect(FIRST_DOZEN).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('should call onBetAreaPress with DOZEN and correct second dozen when 2nd 12 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('2nd 12'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.DOZEN, SECOND_DOZEN);
      expect(SECOND_DOZEN).toEqual([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
    });

    it('should call onBetAreaPress with DOZEN and correct third dozen when 3rd 12 pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteOutsideBets {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );

      fireEvent.press(getByText('3rd 12'));
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.DOZEN, THIRD_DOZEN);
      expect(THIRD_DOZEN).toEqual([25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
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
      // 6 even money bets + 3 dozens = 9 bet areas
      // Each bet area calls getBetAmount twice: once for accessibilityState, once for RouletteChip
      // So total calls = 9 * 2 = 18
      expect(defaultProps.getBetAmount).toHaveBeenCalledTimes(18);
    });
  });

  describe('accessibility', () => {
    it('should have accessibility labels on even money bets', () => {
      const { getByLabelText } = render(<RouletteOutsideBets {...defaultProps} />);
      
      expect(getByLabelText('Low, 1 to 18')).toBeTruthy();
      expect(getByLabelText('Even numbers')).toBeTruthy();
      expect(getByLabelText('Red numbers')).toBeTruthy();
      expect(getByLabelText('Black numbers')).toBeTruthy();
      expect(getByLabelText('Odd numbers')).toBeTruthy();
      expect(getByLabelText('High, 19 to 36')).toBeTruthy();
    });

    it('should have accessibility labels on dozen bets', () => {
      const { getByLabelText } = render(<RouletteOutsideBets {...defaultProps} />);
      
      expect(getByLabelText('First dozen, 1 to 12')).toBeTruthy();
      expect(getByLabelText('Second dozen, 13 to 24')).toBeTruthy();
      expect(getByLabelText('Third dozen, 25 to 36')).toBeTruthy();
    });

    it('should have button accessibility role on all bet buttons', () => {
      const { getByLabelText } = render(<RouletteOutsideBets {...defaultProps} />);
      
      const lowBet = getByLabelText('Low, 1 to 18');
      expect(lowBet.props.accessibilityRole).toBe('button');
    });

    it('should indicate selected state when bet has amount', () => {
      const getBetAmount = jest.fn((numbers) => 
        numbers === LOW_NUMBERS ? 50 : 0
      );
      const { getByLabelText } = render(
        <RouletteOutsideBets {...defaultProps} getBetAmount={getBetAmount} />
      );

      const lowBet = getByLabelText('Low, 1 to 18');
      expect(lowBet.props.accessibilityState).toEqual({ selected: true });
    });

    it('should not have selected state when bet has no amount', () => {
      const { getByLabelText } = render(<RouletteOutsideBets {...defaultProps} />);

      const lowBet = getByLabelText('Low, 1 to 18');
      expect(lowBet.props.accessibilityState).toBeUndefined();
    });
  });
});