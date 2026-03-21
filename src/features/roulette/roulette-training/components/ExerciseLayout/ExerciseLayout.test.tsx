import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import ExerciseLayout from './ExerciseLayout';
import { BetType } from '@app-types/roulette.types';
import type { PlacedBet } from '@app-types/roulette.types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ExerciseLayout', () => {
  const mockHandlers = {
    onToggleHint: jest.fn(),
    onAnswerChange: jest.fn(),
    onCheckAnswer: jest.fn(),
    onNextQuestion: jest.fn(),
  };

  const mockPlacedBets: PlacedBet[] = [
    {
      id: 'bet-1',
      type: BetType.STRAIGHT,
      numbers: [17],
      amount: 10,
      payout: 350,
      timestamp: Date.now(),
    },
  ];

  beforeEach(() => {
    Object.values(mockHandlers).forEach(fn => fn.mockClear());
  });

  describe('Layout Structure', () => {
    it('renders the layout label', () => {
      renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint text</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      expect(screen.getByText('Visual Reference:')).toBeOnTheScreen();
      expect(screen.getByText('Total Payout:')).toBeOnTheScreen();
    });
  });

  describe('Input State', () => {
    it('displays the user answer in the input field', () => {
      const { getByDisplayValue } = renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      expect(getByDisplayValue('250')).toBeTruthy();
    });

    it('disables input when showing feedback', () => {
      const { getByDisplayValue } = renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={true}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={true}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      const input = getByDisplayValue('250');
      expect(input.props.editable).toBe(false);
    });

    it('enables input when not showing feedback', () => {
      const { getByDisplayValue } = renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      const input = getByDisplayValue('250');
      expect(input.props.editable).toBe(true);
    });
  });

  describe('Check Answer Button', () => {
    it('renders check button when not showing feedback', () => {
      renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      expect(screen.getByText('✓ Check Answer')).toBeOnTheScreen();
    });

    it('renders check button when user answer is empty', () => {
      const { getByText } = renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer=""
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      const button = getByText('✓ Check Answer');
      expect(button).toBeTruthy();
    });

    it('calls onCheckAnswer when check button is pressed', () => {
      renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      const button = screen.getByText('✓ Check Answer');
      fireEvent.press(button);

      expect(mockHandlers.onCheckAnswer).toHaveBeenCalledTimes(1);
    });
  });

  describe('Feedback Display', () => {
    it('hides NumberPad when showing feedback', () => {
      renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={true}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={true}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      // Check button should be replaced with feedback card
      expect(screen.queryByText('✓ Check Answer')).not.toBeOnTheScreen();
    });

    it('shows FeedbackCard when showing feedback', () => {
      renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={true}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={true}
          correctAnswer={250}
          explanation="This is correct"
          onNextQuestion={mockHandlers.onNextQuestion}
        />
      );

      expect(screen.getByText('Correct!')).toBeOnTheScreen();
      expect(screen.getByText('Next Question →')).toBeOnTheScreen();
    });
  });

  describe('Loading State', () => {
    it('shows skeleton loaders when isLoading is true', () => {
      renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer=""
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
          isLoading={true}
        />
      );

      // When loading, the input and number pad should not be rendered
      expect(screen.queryByPlaceholderText('Enter total payout')).not.toBeOnTheScreen();
    });

    it('shows interactive elements when isLoading is false', () => {
      const { getByPlaceholderText } = renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer=""
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
          isLoading={false}
        />
      );

      expect(getByPlaceholderText('Enter total payout')).toBeTruthy();
    });
  });

  describe('Props with Defaults', () => {
    it('uses default values for optional props', () => {
      renderWithTheme(
        <ExerciseLayout
          score={100}
          attempts={10}
          showHint={false}
          onToggleHint={mockHandlers.onToggleHint}
          hintContent={<>Hint</>}
          placedBets={mockPlacedBets}
          answerLabel="Total Payout:"
          userAnswer="250"
          onAnswerChange={mockHandlers.onAnswerChange}
          showFeedback={false}
          onCheckAnswer={mockHandlers.onCheckAnswer}
          isCorrect={false}
          correctAnswer={250}
          onNextQuestion={mockHandlers.onNextQuestion}
          // cellSize, maxColumns, isLoading use defaults
        />
      );

      expect(screen.getByText('✓ Check Answer')).toBeOnTheScreen();
    });
  });
});
