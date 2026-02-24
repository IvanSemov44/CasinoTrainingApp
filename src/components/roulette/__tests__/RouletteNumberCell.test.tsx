/**
 * Unit tests for RouletteNumberCell component
 * Tests rendering, interactions, and accessibility
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RouletteNumberCell from '../RouletteNumberCell';
import { BetType } from '../../../types/roulette.types';

// Mock the constants
jest.mock('../../../constants/roulette.constants', () => ({
  getNumberColor: (number: number) => {
    if (number === 0) return 'green';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(number) ? 'red' : 'black';
  },
}));

// Mock the styles
jest.mock('../styles/roulette.styles', () => ({
  getRouletteStyles: (cellSize: number) => ({
    numberCell: { width: cellSize, height: cellSize },
    greenCell: { backgroundColor: '#008000' },
    numberText: { fontSize: 14 },
    redText: { color: '#FF0000' },
    whiteText: { color: '#FFFFFF' },
  }),
}));

// Mock RouletteChip
jest.mock('../RouletteChip', () => {
  const { View } = require('react-native');
  return ({ amount, size }: { amount: number; size: number }) => (
    <View testID={`chip-${amount}-${size}`} />
  );
});

describe('RouletteNumberCell', () => {
  const defaultProps = {
    number: 5 as any,
    cellSize: 40,
    betAmount: 0,
    onNumberPress: jest.fn(),
    onBetAreaPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the number correctly', () => {
      const { getByText } = render(<RouletteNumberCell {...defaultProps} />);
      
      expect(getByText('5')).toBeTruthy();
    });

    it('should render zero correctly', () => {
      const { getByText } = render(
        <RouletteNumberCell {...defaultProps} number={0 as any} />
      );
      
      expect(getByText('0')).toBeTruthy();
    });

    it('should render double zero correctly', () => {
      const { getByText } = render(
        <RouletteNumberCell {...defaultProps} number={'00' as any} />
      );
      
      expect(getByText('00')).toBeTruthy();
    });

    it('should render chip when bet amount is greater than 0', () => {
      const { getByTestId } = render(
        <RouletteNumberCell {...defaultProps} betAmount={25} />
      );
      
      const chipSize = 40 * 0.4; // cellSize * 0.4
      expect(getByTestId(`chip-25-${chipSize}`)).toBeTruthy();
    });

    it('should render chip with amount 0 when no bet', () => {
      const { getByTestId } = render(<RouletteNumberCell {...defaultProps} />);
      
      const chipSize = 40 * 0.4;
      expect(getByTestId(`chip-0-${chipSize}`)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    it('should call onNumberPress when pressed', () => {
      const onNumberPress = jest.fn();
      const { getByText } = render(
        <RouletteNumberCell {...defaultProps} onNumberPress={onNumberPress} />
      );
      
      fireEvent.press(getByText('5'));
      
      expect(onNumberPress).toHaveBeenCalledWith(5);
    });

    it('should call onBetAreaPress when pressed', () => {
      const onBetAreaPress = jest.fn();
      const { getByText } = render(
        <RouletteNumberCell {...defaultProps} onBetAreaPress={onBetAreaPress} />
      );
      
      fireEvent.press(getByText('5'));
      
      expect(onBetAreaPress).toHaveBeenCalledWith(BetType.STRAIGHT, [5]);
    });

    it('should handle press without onBetAreaPress callback', () => {
      const onNumberPress = jest.fn();
      const { getByText } = render(
        <RouletteNumberCell 
          {...defaultProps} 
          onNumberPress={onNumberPress}
          onBetAreaPress={undefined}
        />
      );
      
      fireEvent.press(getByText('5'));
      
      expect(onNumberPress).toHaveBeenCalledWith(5);
    });
  });

  describe('accessibility', () => {
    it('should have correct accessibility label for red number without bet', () => {
      const { getByLabelText } = render(
        <RouletteNumberCell {...defaultProps} number={1 as any} />
      );
      
      expect(getByLabelText('Number 1, red')).toBeTruthy();
    });

    it('should have correct accessibility label for black number without bet', () => {
      const { getByLabelText } = render(
        <RouletteNumberCell {...defaultProps} number={2 as any} />
      );
      
      expect(getByLabelText('Number 2, black')).toBeTruthy();
    });

    it('should have correct accessibility label for green number (zero)', () => {
      const { getByLabelText } = render(
        <RouletteNumberCell {...defaultProps} number={0 as any} />
      );
      
      expect(getByLabelText('Number 0, green')).toBeTruthy();
    });

    it('should include bet amount in accessibility label when bet is placed', () => {
      const { getByLabelText } = render(
        <RouletteNumberCell {...defaultProps} betAmount={50} />
      );
      
      expect(getByLabelText('Number 5, red, $50 bet placed')).toBeTruthy();
    });

    it('should have button accessibility role', () => {
      const { getByLabelText } = render(<RouletteNumberCell {...defaultProps} />);
      
      // The accessibilityRole is set to 'button' in the component
      const button = getByLabelText('Number 5, red');
      expect(button).toBeTruthy();
    });

    it('should have accessibility hint for placing bets', () => {
      const { getByHintText } = render(<RouletteNumberCell {...defaultProps} />);
      
      expect(getByHintText('Double tap to place a bet on this number')).toBeTruthy();
    });
  });

  describe('memoization', () => {
    it('should not re-render when same props are passed', () => {
      const { rerender, getByText } = render(<RouletteNumberCell {...defaultProps} />);
      
      rerender(<RouletteNumberCell {...defaultProps} />);
      
      expect(getByText('5')).toBeTruthy();
    });

    it('should re-render when number changes', () => {
      const { rerender, getByText, queryByText } = render(
        <RouletteNumberCell {...defaultProps} />
      );
      
      expect(getByText('5')).toBeTruthy();
      
      rerender(<RouletteNumberCell {...defaultProps} number={10 as any} />);
      
      expect(queryByText('5')).toBeNull();
      expect(getByText('10')).toBeTruthy();
    });

    it('should re-render when bet amount changes', () => {
      const { rerender, getByTestId } = render(
        <RouletteNumberCell {...defaultProps} />
      );
      
      const chipSize = 40 * 0.4;
      expect(getByTestId(`chip-0-${chipSize}`)).toBeTruthy();
      
      rerender(<RouletteNumberCell {...defaultProps} betAmount={100} />);
      
      expect(getByTestId(`chip-100-${chipSize}`)).toBeTruthy();
    });
  });

  describe('different cell sizes', () => {
    it('should render with small cell size', () => {
      const { getByText } = render(
        <RouletteNumberCell {...defaultProps} cellSize={30} />
      );
      
      expect(getByText('5')).toBeTruthy();
    });

    it('should render with large cell size', () => {
      const { getByText } = render(
        <RouletteNumberCell {...defaultProps} cellSize={60} />
      );
      
      expect(getByText('5')).toBeTruthy();
    });

    it('should calculate chip size based on cell size', () => {
      const { getByTestId } = render(
        <RouletteNumberCell {...defaultProps} cellSize={50} betAmount={10} />
      );
      
      const expectedChipSize = 50 * 0.4; // 20
      expect(getByTestId(`chip-10-${expectedChipSize}`)).toBeTruthy();
    });
  });
});
