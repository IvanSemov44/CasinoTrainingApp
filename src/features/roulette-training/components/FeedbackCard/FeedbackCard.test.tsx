import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import FeedbackCard from './FeedbackCard';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('FeedbackCard', () => {
  const mockOnNextQuestion = jest.fn();

  beforeEach(() => {
    mockOnNextQuestion.mockClear();
  });

  describe('Correct Answer Display', () => {
    it('renders success state when isCorrect is true', () => {
      renderWithTheme(
        <FeedbackCard
          isCorrect={true}
          correctAnswer={42}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Correct!')).toBeOnTheScreen();
      expect(screen.getByText('✓')).toBeOnTheScreen();
    });

    it('displays the correct answer number', () => {
      renderWithTheme(
        <FeedbackCard
          isCorrect={true}
          correctAnswer={42}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Correct answer: 42')).toBeOnTheScreen();
    });
  });

  describe('Incorrect Answer Display', () => {
    it('renders error state when isCorrect is false', () => {
      renderWithTheme(
        <FeedbackCard
          isCorrect={false}
          correctAnswer={42}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Incorrect')).toBeOnTheScreen();
      expect(screen.getByText('✗')).toBeOnTheScreen();
    });

    it('shows explanation when provided and answer is incorrect', () => {
      const explanation = 'The answer is 42 because it is the answer to life';

      renderWithTheme(
        <FeedbackCard
          isCorrect={false}
          correctAnswer={42}
          explanation={explanation}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText(explanation)).toBeOnTheScreen();
    });

    it('hides explanation when answer is correct', () => {
      const explanation = 'Explanation should not appear';

      renderWithTheme(
        <FeedbackCard
          isCorrect={true}
          correctAnswer={42}
          explanation={explanation}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.queryByText(explanation)).not.toBeOnTheScreen();
    });
  });

  describe('Next Question Button', () => {
    it('renders the next question button', () => {
      renderWithTheme(
        <FeedbackCard
          isCorrect={true}
          correctAnswer={42}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Next Question →')).toBeOnTheScreen();
    });

    it('calls onNextQuestion when button is pressed', () => {
      renderWithTheme(
        <FeedbackCard
          isCorrect={true}
          correctAnswer={42}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      const button = screen.getByText('Next Question →');
      fireEvent.press(button);

      expect(mockOnNextQuestion).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('handles explanation=undefined gracefully', () => {
      renderWithTheme(
        <FeedbackCard
          isCorrect={false}
          correctAnswer={42}
          explanation={undefined}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Incorrect')).toBeOnTheScreen();
    });

    it('displays answer 0 correctly', () => {
      renderWithTheme(
        <FeedbackCard
          isCorrect={true}
          correctAnswer={0}
          onNextQuestion={mockOnNextQuestion}
        />
      );

      expect(screen.getByText('Correct answer: 0')).toBeOnTheScreen();
    });
  });
});
