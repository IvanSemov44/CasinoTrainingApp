import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
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

  it('applies custom title style', () => {
    const { getByText } = renderWithTheme(
      <FeedbackSection title="Styled Title" titleStyle={{ fontSize: 24 }}>
        <Text>Content</Text>
      </FeedbackSection>
    );

    expect(getByText('Styled Title')).toBeTruthy();
  });

  it('handles empty children', () => {
    const { getByText } = renderWithTheme(
      <FeedbackSection title="Empty Section">{null}</FeedbackSection>
    );

    expect(getByText('Empty Section')).toBeTruthy();
  });

  it('handles long title text', () => {
    const longTitle = 'This is a very long title that might wrap to multiple lines in the UI';
    const { getByText } = renderWithTheme(
      <FeedbackSection title={longTitle}>
        <Text>Content</Text>
      </FeedbackSection>
    );

    expect(getByText(longTitle)).toBeTruthy();
  });

  it('renders multiple children', () => {
    const { getByText } = renderWithTheme(
      <FeedbackSection title="Multiple Children">
        <Text>First child</Text>
        <Text>Second child</Text>
        <View>
          <Text>Nested child</Text>
        </View>
      </FeedbackSection>
    );

    expect(getByText('First child')).toBeTruthy();
    expect(getByText('Second child')).toBeTruthy();
    expect(getByText('Nested child')).toBeTruthy();
  });

  it('renders with special characters in title', () => {
    const { getByText } = renderWithTheme(
      <FeedbackSection title="Title with special chars: !@#$%^&*()">
        <Text>Content</Text>
      </FeedbackSection>
    );

    expect(getByText('Title with special chars: !@#$%^&*()')).toBeTruthy();
  });
});
