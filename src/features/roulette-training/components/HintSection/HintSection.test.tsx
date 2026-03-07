import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import HintSection from './HintSection';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('HintSection', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  describe('Toggle Button Rendering', () => {
    it('renders hint toggle button', () => {
      renderWithTheme(
        <HintSection isOpen={false} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      expect(screen.getByLabelText('Toggle hint')).toBeOnTheScreen();
    });

    it('displays collapsed arrow when hint is closed', () => {
      renderWithTheme(
        <HintSection isOpen={false} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      expect(screen.getByText('▶ Hint')).toBeOnTheScreen();
    });

    it('displays expanded arrow when hint is open', () => {
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      expect(screen.getByText('▼ Hint')).toBeOnTheScreen();
    });
  });

  describe('Hint Content Display', () => {
    it('hides hint content when isOpen is false', () => {
      renderWithTheme(
        <HintSection isOpen={false} onToggle={mockOnToggle}>
          Hidden hint content
        </HintSection>
      );

      expect(screen.queryByText('Hidden hint content')).not.toBeOnTheScreen();
    });

    it('shows hint content when isOpen is true', () => {
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          Visible hint content
        </HintSection>
      );

      expect(screen.getByText('Visible hint content')).toBeOnTheScreen();
    });

    it('displays children as hint text', () => {
      const hintText = 'This is a helpful hint for the player';
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          {hintText}
        </HintSection>
      );

      expect(screen.getByText(hintText)).toBeOnTheScreen();
    });

    it('handles multiline hint content', () => {
      const multilineHint = 'Line 1\nLine 2\nLine 3';
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          {multilineHint}
        </HintSection>
      );

      expect(screen.getByText(multilineHint)).toBeOnTheScreen();
    });
  });

  describe('Toggle Callback', () => {
    it('calls onToggle when button is pressed', () => {
      renderWithTheme(
        <HintSection isOpen={false} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      const button = screen.getByLabelText('Toggle hint');
      fireEvent.press(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onToggle when already open and button is pressed', () => {
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      const button = screen.getByLabelText('Toggle hint');
      fireEvent.press(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onToggle only once per press', () => {
      renderWithTheme(
        <HintSection isOpen={false} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      const button = screen.getByLabelText('Toggle hint');
      fireEvent.press(button);
      fireEvent.press(button);

      expect(mockOnToggle).toHaveBeenCalledTimes(2);
    });
  });

  describe('Accessibility', () => {
    it('has accessible toggle button with label', () => {
      renderWithTheme(
        <HintSection isOpen={false} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      const button = screen.getByLabelText('Toggle hint');
      expect(button).toBeOnTheScreen();
    });

    it('renders hint content when open for screen readers', () => {
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      const button = screen.getByLabelText('Toggle hint');
      const hintText = screen.getByText('Test hint content');
      expect(button).toBeOnTheScreen();
      expect(hintText).toBeOnTheScreen();
    });

    it('hides hint content when closed for screen readers', () => {
      renderWithTheme(
        <HintSection isOpen={false} onToggle={mockOnToggle}>
          Test hint content
        </HintSection>
      );

      expect(screen.queryByText('Test hint content')).not.toBeOnTheScreen();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty hint content', () => {
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          {''}
        </HintSection>
      );

      expect(screen.getByLabelText('Toggle hint')).toBeOnTheScreen();
    });

    it('handles special characters in hint', () => {
      const specialHint = 'Hint with special chars: @#$%^&*()';
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          {specialHint}
        </HintSection>
      );

      expect(screen.getByText(specialHint)).toBeOnTheScreen();
    });

    it('handles React component children as hint', () => {
      renderWithTheme(
        <HintSection isOpen={true} onToggle={mockOnToggle}>
          <Text testID="hint-child">Hint with child component</Text>
        </HintSection>
      );

      expect(screen.getByTestId('hint-child')).toBeOnTheScreen();
    });
  });
});

// Helper for the edge case test
import { Text } from 'react-native';
