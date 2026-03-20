import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import NumberPad from './NumberPad';

describe('NumberPad', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  const mockOnNumberPress = jest.fn();
  const mockOnClear = jest.fn();
  const mockOnBackspace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all number buttons from 0 to 9', () => {
    render(
      <Wrapper>
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      </Wrapper>
    );

    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(String(i))).toBeOnTheScreen();
    }
  });

  it('renders clear and backspace buttons', () => {
    render(
      <Wrapper>
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      </Wrapper>
    );

    expect(screen.getByText('C')).toBeOnTheScreen();
    expect(screen.getByText('⌫')).toBeOnTheScreen();
  });

  it('calls onNumberPress when a number button is pressed', () => {
    render(
      <Wrapper>
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      </Wrapper>
    );

    fireEvent.press(screen.getByText('5'));
    expect(mockOnNumberPress).toHaveBeenCalledWith('5');
  });

  it('calls onClear when clear button is pressed', () => {
    render(
      <Wrapper>
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      </Wrapper>
    );

    fireEvent.press(screen.getByText('C'));
    expect(mockOnClear).toHaveBeenCalled();
  });

  it('calls onBackspace when backspace button is pressed', () => {
    render(
      <Wrapper>
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      </Wrapper>
    );

    fireEvent.press(screen.getByText('⌫'));
    expect(mockOnBackspace).toHaveBeenCalled();
  });

  it('does not call handlers when disabled', () => {
    render(
      <Wrapper>
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
          disabled={true}
        />
      </Wrapper>
    );

    fireEvent.press(screen.getByText('5'));
    fireEvent.press(screen.getByText('C'));
    fireEvent.press(screen.getByText('⌫'));

    expect(mockOnNumberPress).not.toHaveBeenCalled();
    expect(mockOnClear).not.toHaveBeenCalled();
    expect(mockOnBackspace).not.toHaveBeenCalled();
  });

  it('has proper accessibility labels', () => {
    render(
      <Wrapper>
        <NumberPad
          onNumberPress={mockOnNumberPress}
          onClear={mockOnClear}
          onBackspace={mockOnBackspace}
        />
      </Wrapper>
    );

    expect(screen.getByLabelText('Number 5')).toBeOnTheScreen();
    expect(screen.getByLabelText('Clear')).toBeOnTheScreen();
    expect(screen.getByLabelText('Backspace')).toBeOnTheScreen();
  });
});
