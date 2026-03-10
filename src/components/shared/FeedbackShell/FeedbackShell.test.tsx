import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { FeedbackShell } from './FeedbackShell';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('FeedbackShell', () => {
  it('renders correct title in header mode', () => {
    const { getByText } = renderWithTheme(
      <FeedbackShell isCorrect correctTitle="Great!" incorrectTitle="Try again">
        <Text>Body content</Text>
      </FeedbackShell>
    );

    expect(getByText('Great!')).toBeTruthy();
    expect(getByText('Body content')).toBeTruthy();
  });

  it('renders incorrect title in container mode', () => {
    const { getByText } = renderWithTheme(
      <FeedbackShell
        isCorrect={false}
        correctTitle="Great!"
        incorrectTitle="Try again"
        mode="container"
      >
        <Text>Body content</Text>
      </FeedbackShell>
    );

    expect(getByText('Try again')).toBeTruthy();
  });
});
