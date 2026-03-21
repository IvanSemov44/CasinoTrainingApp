import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { PositionTrainingSidebar } from './PositionTrainingSidebar';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('PositionTrainingSidebar', () => {
  const baseProps = {
    stats: { correct: 3, total: 5 },
    currentWinningNumber: 17,
    result: null,
    isProcessing: false,
    wheelPosition: 8,
    accuracyColor: '#FFD700',
    percentage: 60,
    onSkip: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders score, accuracy and target number', () => {
    const { getByText, getAllByText } = renderWithTheme(<PositionTrainingSidebar {...baseProps} />);

    expect(getByText('3/5')).toBeTruthy();
    expect(getByText('60%')).toBeTruthy();
    expect(getByText('FIND NUMBER')).toBeTruthy();
    expect(getAllByText('17').length).toBeGreaterThan(0);
  });

  it('calls onSkip when skip button is pressed', () => {
    const { getByText } = renderWithTheme(<PositionTrainingSidebar {...baseProps} />);

    fireEvent.press(getByText('Skip  ›'));

    expect(baseProps.onSkip).toHaveBeenCalledTimes(1);
  });

  it('renders incorrect feedback details', () => {
    const { getByText } = renderWithTheme(
      <PositionTrainingSidebar
        {...baseProps}
        result={{
          isCorrect: false,
          correctNumber: 17,
          userNumber: 12,
          winningNumber: 17,
          score: 0,
        }}
      />
    );

    expect(getByText('✗  Try again')).toBeTruthy();
    expect(getByText('That was 12')).toBeTruthy();
  });

  it('hides skip button while processing', () => {
    const { queryByText } = renderWithTheme(
      <PositionTrainingSidebar {...baseProps} isProcessing />
    );

    expect(queryByText('Skip  ›')).toBeNull();
  });
});
