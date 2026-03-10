import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { FeedbackSection } from './FeedbackSection';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('FeedbackSection', () => {
  it('renders title and children', () => {
    const { getByText } = renderWithTheme(
      <FeedbackSection title="Details">
        <Text>Correct answer: 17</Text>
      </FeedbackSection>
    );

    expect(getByText('Details')).toBeTruthy();
    expect(getByText('Correct answer: 17')).toBeTruthy();
  });
});
