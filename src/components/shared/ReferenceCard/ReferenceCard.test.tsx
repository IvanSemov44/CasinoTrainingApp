import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { ReferenceCard } from './ReferenceCard';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('ReferenceCard', () => {
  it('renders title, subtitle, and child content', () => {
    const { getByText } = renderWithTheme(
      <ReferenceCard title="Payouts" subtitle="Inside Bets">
        <Text>Split pays 17:1</Text>
      </ReferenceCard>
    );

    expect(getByText('Payouts')).toBeTruthy();
    expect(getByText('Inside Bets')).toBeTruthy();
    expect(getByText('Split pays 17:1')).toBeTruthy();
  });

  it('renders without subtitle', () => {
    const { getByText, queryByText } = renderWithTheme(
      <ReferenceCard title="Sectors">
        <Text>Voisins du Zero</Text>
      </ReferenceCard>
    );

    expect(getByText('Sectors')).toBeTruthy();
    expect(getByText('Voisins du Zero')).toBeTruthy();
    expect(queryByText('Inside Bets')).toBeNull();
  });
});
