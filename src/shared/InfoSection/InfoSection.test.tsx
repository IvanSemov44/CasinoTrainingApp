import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { InfoSection } from './InfoSection';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('InfoSection', () => {
  it('renders title and children content', () => {
    const { getByText } = renderWithTheme(
      <InfoSection title="About this drill">
        <Text>Practice payout calculations fast.</Text>
      </InfoSection>
    );

    expect(getByText('About this drill')).toBeTruthy();
    expect(getByText('Practice payout calculations fast.')).toBeTruthy();
  });
});
