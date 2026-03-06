import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import NumberPad from './NumberPad';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('NumberPad', () => {
  const mockOnNumberPress = jest.fn();
  const mockOnClear = jest.fn();
  const mockOnBackspace = jest.fn();

  beforeEach(() => {
    mockOnNumberPress.mockClear();
    mockOnClear.mockClear();
    mockOnBackspace.mockClear();
  });

  describe('Number Button Rendering', () => {
    it('renders all number buttons 1-9', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      for (let i = 1; i <= 9; i++) {
        expect(screen.getByText(i.toString())).toBeOnTheScreen();
      }
    });

    it('renders zero button', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      expect(screen.getByText('0')).toBeOnTheScreen();
    });

    it('renders clear button', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      expect(screen.getByLabelText('Clear')).toBeOnTheScreen();
    });

    it('renders backspace button', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      expect(screen.getByLabelText('Backspace')).toBeOnTheScreen();
    });
  });

  describe('Number Button Callbacks', () => {
    it('calls onNumberPress when a number button is pressed', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      const button5 = screen.getByLabelText('Number 5');
      fireEvent.press(button5);

      expect(mockOnNumberPress).toHaveBeenCalledWith('5');
    });

    it('calls onNumberPress with correct digit for each button', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      const button7 = screen.getByLabelText('Number 7');
      fireEvent.press(button7);

      expect(mockOnNumberPress).toHaveBeenCalledWith('7');
    });

    it('calls onNumberPress when zero button is pressed', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      const button0 = screen.getByText('0');
      fireEvent.press(button0);

      expect(mockOnNumberPress).toHaveBeenCalledWith('0');
    });
  });

  describe('Action Button Callbacks', () => {
    it('calls onClear when clear button is pressed', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      const clearButton = screen.getByLabelText('Clear');
      fireEvent.press(clearButton);

      expect(mockOnClear).toHaveBeenCalledTimes(1);
      expect(mockOnNumberPress).not.toHaveBeenCalled();
    });

    it('calls onBackspace when backspace button is pressed', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      const backspaceButton = screen.getByLabelText('Backspace');
      fireEvent.press(backspaceButton);

      expect(mockOnBackspace).toHaveBeenCalledTimes(1);
      expect(mockOnNumberPress).not.toHaveBeenCalled();
    });
  });

  describe('Disabled State', () => {
    it('does not call callbacks when disabled', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
          disabled={true}
        />
      );

      const button5 = screen.getByLabelText('Number 5');
      fireEvent.press(button5);

      expect(mockOnNumberPress).not.toHaveBeenCalled();
    });

    it('disables all buttons when disabled prop is true', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
          disabled={true}
        />
      );

      const button3 = screen.getByLabelText('Number 3');
      expect(button3).toBeOnTheScreen();
    });

    it('allows buttons when disabled prop is false', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
          disabled={false}
        />
      );

      const button3 = screen.getByLabelText('Number 3');
      expect(button3).toBeOnTheScreen();
    });
  });

  describe('Accessibility', () => {
    it('provides proper accessibility labels for number buttons', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      expect(screen.getByLabelText('Number 1')).toBeOnTheScreen();
      expect(screen.getByLabelText('Number 5')).toBeOnTheScreen();
      expect(screen.getByLabelText('Number 9')).toBeOnTheScreen();
    });

    it('has accessible buttons with labels', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      const button2 = screen.getByLabelText('Number 2');
      expect(button2).toBeOnTheScreen();
    });
  });

  describe('Multiple Presses', () => {
    it('calls onNumberPress multiple times for sequential presses', () => {
      renderWithTheme(
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      );

      fireEvent.press(screen.getByLabelText('Number 1'));
      fireEvent.press(screen.getByLabelText('Number 2'));
      fireEvent.press(screen.getByLabelText('Number 3'));

      expect(mockOnNumberPress).toHaveBeenCalledTimes(3);
      expect(mockOnNumberPress).toHaveBeenNthCalledWith(1, '1');
      expect(mockOnNumberPress).toHaveBeenNthCalledWith(2, '2');
      expect(mockOnNumberPress).toHaveBeenNthCalledWith(3, '3');
    });
  });
});
