import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import PositionSidebarHeader from './PositionSidebarHeader';

describe('PositionSidebarHeader', () => {
  it('shows score, accuracy, and current target number', () => {
    const { getByText } = render(
      <ThemeProvider>
        <PositionSidebarHeader
          stats={{ correct: 7, total: 10 }}
          percentage={70}
          accuracyColor="#00FF00"
          currentWinningNumber={32}
        />
      </ThemeProvider>
    );

    expect(getByText('score')).toBeTruthy();
    expect(getByText('7/10')).toBeTruthy();
    expect(getByText('70%')).toBeTruthy();
    expect(getByText('FIND NUMBER')).toBeTruthy();
    expect(getByText(/Tap/)).toBeTruthy();
  });
});
