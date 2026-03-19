import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { ScoreAccuracyText } from './ScoreAccuracyText';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('ScoreAccuracyText', () => {
  it('renders score and accuracy in compact mode', () => {
    const { getByText } = renderWithTheme(<ScoreAccuracyText correct={8} total={10} compact />);

    expect(getByText('Score: 8/10 (80%)')).toBeTruthy();
  });

  it('renders separate score and accuracy lines in full mode', () => {
    const { getByText } = renderWithTheme(<ScoreAccuracyText correct={3} total={4} />);

    expect(getByText('Score: 3/4')).toBeTruthy();
    expect(getByText('Accuracy: 75%')).toBeTruthy();
  });
});
