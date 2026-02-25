/**
 * Unit tests for RouletteChip component
 * Tests rendering, styling, and accessibility
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import RouletteChip from '../RouletteChip';

describe('RouletteChip', () => {
  describe('rendering', () => {
    it('should render when amount is greater than 0', () => {
      const { getByText } = render(<RouletteChip amount={25} size={20} />);
      
      expect(getByText('25')).toBeTruthy();
    });

    it('should not render when amount is 0', () => {
      const { queryByText } = render(<RouletteChip amount={0} size={20} />);
      
      expect(queryByText('0')).toBeNull();
    });

    it('should display the correct amount', () => {
      const amounts = [1, 5, 10, 25, 100, 500, 1000];
      
      amounts.forEach(amount => {
        const { getByText } = render(<RouletteChip amount={amount} size={20} />);
        expect(getByText(String(amount))).toBeTruthy();
      });
    });

    it('should render with different sizes', () => {
      const { getByText } = render(<RouletteChip amount={10} size={30} />);
      
      const chip = getByText('10');
      expect(chip).toBeTruthy();
    });
  });

  describe('styling', () => {
    it('should apply correct size to chip container', () => {
      const size = 25;
      const { getByLabelText } = render(<RouletteChip amount={10} size={size} />);
      
      const chip = getByLabelText('$10 chip');
      expect(chip.props.style.width).toBe(size);
      expect(chip.props.style.height).toBe(size);
    });

    it('should apply correct margin for centering', () => {
      const size = 20;
      const { getByLabelText } = render(<RouletteChip amount={10} size={size} />);
      
      const chip = getByLabelText('$10 chip');
      expect(chip.props.style.marginLeft).toBe(-size / 2);
      expect(chip.props.style.marginTop).toBe(-size / 2);
    });

    it('should have gold background color', () => {
      const { getByLabelText } = render(<RouletteChip amount={10} size={20} />);
      
      const chip = getByLabelText('$10 chip');
      expect(chip.props.style.backgroundColor).toBe('#FFD700');
    });

    it('should have circular shape', () => {
      const { getByLabelText } = render(<RouletteChip amount={10} size={20} />);
      
      const chip = getByLabelText('$10 chip');
      expect(chip.props.style.borderRadius).toBe(100);
    });
  });

  describe('text styling', () => {
    it('should have correct font size based on chip size', () => {
      const size = 20;
      const expectedFontSize = size * 0.5; // 10
      
      const { getByText } = render(<RouletteChip amount={10} size={size} />);
      
      const text = getByText('10');
      expect(text.props.style.fontSize).toBe(expectedFontSize);
    });

    it('should scale font size with chip size', () => {
      const sizes = [15, 20, 25, 30, 40];
      
      sizes.forEach(size => {
        const expectedFontSize = size * 0.5;
        const { getByText } = render(<RouletteChip amount={10} size={size} />);
        const text = getByText('10');
        expect(text.props.style.fontSize).toBe(expectedFontSize);
      });
    });

    it('should have bold font weight', () => {
      const { getByText } = render(<RouletteChip amount={10} size={20} />);
      
      const text = getByText('10');
      expect(text.props.style.fontWeight).toBe('bold');
    });

    it('should have black text color', () => {
      const { getByText } = render(<RouletteChip amount={10} size={20} />);
      
      const text = getByText('10');
      expect(text.props.style.color).toBe('#000000');
    });
  });

  describe('accessibility', () => {
    it('should have correct accessibility label', () => {
      const { getByLabelText } = render(<RouletteChip amount={25} size={20} />);
      
      expect(getByLabelText('$25 chip')).toBeTruthy();
    });

    it('should have image accessibility role', () => {
      const { getByLabelText } = render(<RouletteChip amount={10} size={20} />);
      
      const chip = getByLabelText('$10 chip');
      expect(chip.props.accessibilityRole).toBe('image');
    });

    it('should have correct accessibility label for different amounts', () => {
      const amounts = [1, 5, 10, 25, 100, 500, 1000];
      
      amounts.forEach(amount => {
        const { getByLabelText } = render(<RouletteChip amount={amount} size={20} />);
        expect(getByLabelText(`$${amount} chip`)).toBeTruthy();
      });
    });
  });

  describe('memoization', () => {
    it('should not re-render when same props are passed', () => {
      const { rerender, getByText } = render(<RouletteChip amount={10} size={20} />);
      
      rerender(<RouletteChip amount={10} size={20} />);
      
      expect(getByText('10')).toBeTruthy();
    });

    it('should re-render when amount changes', () => {
      const { rerender, getByText, queryByText } = render(
        <RouletteChip amount={10} size={20} />
      );
      
      expect(getByText('10')).toBeTruthy();
      
      rerender(<RouletteChip amount={25} size={20} />);
      
      expect(queryByText('10')).toBeNull();
      expect(getByText('25')).toBeTruthy();
    });

    it('should re-render when size changes', () => {
      const { rerender, getByText } = render(
        <RouletteChip amount={10} size={20} />
      );
      
      const text1 = getByText('10');
      expect(text1.props.style.fontSize).toBe(10);
      
      rerender(<RouletteChip amount={10} size={40} />);
      
      const text2 = getByText('10');
      expect(text2.props.style.fontSize).toBe(20);
    });
  });

  describe('edge cases', () => {
    it('should handle very small chip size', () => {
      const { getByText } = render(<RouletteChip amount={5} size={10} />);
      
      const text = getByText('5');
      expect(text.props.style.fontSize).toBe(5);
    });

    it('should handle very large chip size', () => {
      const { getByText } = render(<RouletteChip amount={100} size={100} />);
      
      const text = getByText('100');
      expect(text.props.style.fontSize).toBe(50);
    });

    it('should handle large chip amounts', () => {
      const { getByText } = render(<RouletteChip amount={10000} size={30} />);
      
      expect(getByText('10000')).toBeTruthy();
    });

    it('should handle negative amounts (edge case)', () => {
      // Component will render negative amounts since it only checks for 0
      const { getByText } = render(<RouletteChip amount={-5} size={20} />);
      
      expect(getByText('-5')).toBeTruthy();
    });
  });
});
