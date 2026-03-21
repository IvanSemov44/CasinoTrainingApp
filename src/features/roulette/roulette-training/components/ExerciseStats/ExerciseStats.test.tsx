import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import ExerciseStats from './ExerciseStats';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ExerciseStats', () => {
  describe('Score Display', () => {
    it('renders score display with correct format', () => {
      renderWithTheme(<ExerciseStats score={5} attempts={10} />);

      expect(screen.getByText('Score: 5/10')).toBeOnTheScreen();
    });

    it('displays zero score', () => {
      renderWithTheme(<ExerciseStats score={0} attempts={5} />);

      expect(screen.getByText('Score: 0/5')).toBeOnTheScreen();
    });

    it('displays perfect score', () => {
      renderWithTheme(<ExerciseStats score={10} attempts={10} />);

      expect(screen.getByText('Score: 10/10')).toBeOnTheScreen();
    });

    it('displays score when score equals attempts', () => {
      renderWithTheme(<ExerciseStats score={7} attempts={7} />);

      expect(screen.getByText('Score: 7/7')).toBeOnTheScreen();
    });
  });

  describe('Accuracy Calculation', () => {
    it('calculates accuracy as percentage', () => {
      renderWithTheme(<ExerciseStats score={5} attempts={10} />);

      expect(screen.getByText('Accuracy: 50%')).toBeOnTheScreen();
    });

    it('calculates 100% accuracy for perfect score', () => {
      renderWithTheme(<ExerciseStats score={10} attempts={10} />);

      expect(screen.getByText('Accuracy: 100%')).toBeOnTheScreen();
    });

    it('calculates 0% accuracy for zero score', () => {
      renderWithTheme(<ExerciseStats score={0} attempts={10} />);

      expect(screen.getByText('Accuracy: 0%')).toBeOnTheScreen();
    });

    it('rounds accuracy to nearest integer', () => {
      renderWithTheme(<ExerciseStats score={1} attempts={3} />);

      // 1/3 = 0.333... rounds to 33%
      expect(screen.getByText('Accuracy: 33%')).toBeOnTheScreen();
    });

    it('rounds up when appropriate', () => {
      renderWithTheme(<ExerciseStats score={2} attempts={3} />);

      // 2/3 = 0.666... rounds to 67%
      expect(screen.getByText('Accuracy: 67%')).toBeOnTheScreen();
    });

    it('handles fractional percentages correctly', () => {
      renderWithTheme(<ExerciseStats score={3} attempts={7} />);

      // 3/7 = 0.4285... rounds to 43%
      expect(screen.getByText('Accuracy: 43%')).toBeOnTheScreen();
    });
  });

  describe('Edge Cases', () => {
    it('handles zero attempts by displaying 0% accuracy', () => {
      renderWithTheme(<ExerciseStats score={0} attempts={0} />);

      expect(screen.getByText('Accuracy: 0%')).toBeOnTheScreen();
    });

    it('displays correctly with one attempt', () => {
      renderWithTheme(<ExerciseStats score={1} attempts={1} />);

      expect(screen.getByText('Score: 1/1')).toBeOnTheScreen();
      expect(screen.getByText('Accuracy: 100%')).toBeOnTheScreen();
    });

    it('displays correctly with large numbers', () => {
      renderWithTheme(<ExerciseStats score={500} attempts={1000} />);

      expect(screen.getByText('Score: 500/1000')).toBeOnTheScreen();
      expect(screen.getByText('Accuracy: 50%')).toBeOnTheScreen();
    });

    it('handles high accuracy with large denominators', () => {
      renderWithTheme(<ExerciseStats score={99} attempts={100} />);

      expect(screen.getByText('Accuracy: 99%')).toBeOnTheScreen();
    });
  });

  describe('Component Rendering', () => {
    it('renders both score and accuracy in same component', () => {
      renderWithTheme(<ExerciseStats score={8} attempts={10} />);

      expect(screen.getByText('Score: 8/10')).toBeOnTheScreen();
      expect(screen.getByText('Accuracy: 80%')).toBeOnTheScreen();
    });

    it('displays stats with proper spacing', () => {
      const { getByText } = renderWithTheme(<ExerciseStats score={5} attempts={10} />);

      const scoreText = getByText('Score: 5/10');
      const accuracyText = getByText('Accuracy: 50%');

      expect(scoreText).toBeOnTheScreen();
      expect(accuracyText).toBeOnTheScreen();
    });

    it('memoizes and updates on prop changes', () => {
      const { rerender } = renderWithTheme(<ExerciseStats score={5} attempts={10} />);

      expect(screen.getByText('Score: 5/10')).toBeOnTheScreen();
      expect(screen.getByText('Accuracy: 50%')).toBeOnTheScreen();

      rerender(
        <ThemeProvider>
          <ExerciseStats score={7} attempts={10} />
        </ThemeProvider>
      );

      expect(screen.getByText('Score: 7/10')).toBeOnTheScreen();
      expect(screen.getByText('Accuracy: 70%')).toBeOnTheScreen();
    });
  });
});
