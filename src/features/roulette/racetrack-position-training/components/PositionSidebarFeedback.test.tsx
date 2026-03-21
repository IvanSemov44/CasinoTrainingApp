import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PositionSidebarFeedback from './PositionSidebarFeedback';

describe('PositionSidebarFeedback', () => {
  it('renders result text and skip button when not processing', () => {
    const onSkip = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <PositionSidebarFeedback
          result={{
            isCorrect: true,
            correctNumber: 5,
            userNumber: 5,
            winningNumber: 5,
            score: 1,
          }}
          wheelPosition={4}
          isProcessing={false}
          onSkip={onSkip}
        />
      </ThemeProvider>
    );

    expect(getByText('✓  Correct!')).toBeTruthy();
    expect(getByText('Found at position 5')).toBeTruthy();

    fireEvent.press(getByText('Skip ›'));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
