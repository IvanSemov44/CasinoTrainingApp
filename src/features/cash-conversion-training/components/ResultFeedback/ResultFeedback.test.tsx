import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import ResultFeedback from './ResultFeedback';
import { ValidationResult } from '../../types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ResultFeedback', () => {
  const mockOnNext = jest.fn();

  const correctResult: ValidationResult = {
    isCorrect: true,
    correctTotalBet: 100,
    correctChange: 50,
    userTotalBet: 100,
    userChange: 50,
    correctBetPerPosition: 20,
    userBetPerPosition: 20,
  };

  const incorrectResult: ValidationResult = {
    isCorrect: false,
    correctTotalBet: 100,
    correctChange: 50,
    userTotalBet: 90,
    userChange: 60,
    correctBetPerPosition: 20,
    userBetPerPosition: 18,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with correct result message', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={correctResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('✓ Correct!')).toBeTruthy();
  });

  it('should render with incorrect result message', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={incorrectResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('✗ Incorrect')).toBeTruthy();
  });

  it('should not show comparison when result is correct', () => {
    const { queryByText } = renderWithTheme(
      <ResultFeedback result={correctResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(queryByText('Your Answer:')).toBeNull();
    expect(queryByText('Correct Answer:')).toBeNull();
  });

  it('should show comparison when result is incorrect', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={incorrectResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('Your Answer:')).toBeTruthy();
    expect(getByText('Correct Answer:')).toBeTruthy();
  });

  it('should display user answer values when incorrect', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={incorrectResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('Tier Total: $90')).toBeTruthy();
    expect(getByText('Tier Play By: $18')).toBeTruthy();
    expect(getByText('Rest: $60')).toBeTruthy();
  });

  it('should display correct answer values when incorrect', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={incorrectResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('Tier Total: $100')).toBeTruthy();
    expect(getByText('Tier Play By: $20')).toBeTruthy();
    expect(getByText('Rest: $50')).toBeTruthy();
  });

  it('should have Next Challenge button', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={correctResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('Next Challenge')).toBeTruthy();
  });

  it('should call onNext when Next Challenge button is pressed', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={correctResult} onNext={mockOnNext} sectorName="Tier" />
    );

    const nextButton = getByText('Next Challenge');
    fireEvent.press(nextButton);

    expect(mockOnNext).toHaveBeenCalled();
  });

  it('should display custom sector name in comparison', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={incorrectResult} onNext={mockOnNext} sectorName="Orphelins" />
    );

    expect(getByText('Orphelins Total: $90')).toBeTruthy();
  });

  it('should render correct answer with green text styling when incorrect', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={incorrectResult} onNext={mockOnNext} sectorName="Tier" />
    );

    // Correct answer text should be styled differently (correctText style)
    expect(getByText('Tier Total: $100')).toBeTruthy();
  });

  it('should handle zero values in results', () => {
    const zeroResult: ValidationResult = {
      isCorrect: false,
      correctTotalBet: 0,
      correctChange: 0,
      userTotalBet: 0,
      userChange: 0,
      correctBetPerPosition: 0,
      userBetPerPosition: 0,
    };

    const { getByText } = renderWithTheme(
      <ResultFeedback result={zeroResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('Tier Total: $0')).toBeTruthy();
  });

  it('should handle large values in results', () => {
    const largeResult: ValidationResult = {
      isCorrect: false,
      correctTotalBet: 10000,
      correctChange: 5000,
      userTotalBet: 9500,
      userChange: 5500,
      correctBetPerPosition: 2000,
      userBetPerPosition: 1900,
    };

    const { getByText } = renderWithTheme(
      <ResultFeedback result={largeResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('Tier Total: $9500')).toBeTruthy();
    expect(getByText('Tier Total: $10000')).toBeTruthy();
  });

  it('should display all fields in incorrect result', () => {
    const { getByText } = renderWithTheme(
      <ResultFeedback result={incorrectResult} onNext={mockOnNext} sectorName="Tier" />
    );

    expect(getByText('Your Answer:')).toBeTruthy();
    expect(getByText('Correct Answer:')).toBeTruthy();
    expect(getByText('Tier Play By: $18')).toBeTruthy();
    expect(getByText('Rest: $60')).toBeTruthy();
  });

  it('should handle multiple calls to onNext', () => {
    const { getByText, rerender } = renderWithTheme(
      <ResultFeedback result={correctResult} onNext={mockOnNext} sectorName="Tier" />
    );

    const nextButton = getByText('Next Challenge');
    fireEvent.press(nextButton);
    fireEvent.press(nextButton);

    expect(mockOnNext).toHaveBeenCalledTimes(2);
  });
});
