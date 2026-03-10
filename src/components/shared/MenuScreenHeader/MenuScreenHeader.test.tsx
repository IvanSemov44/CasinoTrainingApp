import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { MenuScreenHeader } from './MenuScreenHeader';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('MenuScreenHeader', () => {
  it('renders title and subtitle', () => {
    const { getByText } = renderWithTheme(
      <MenuScreenHeader title="Roulette Training" subtitle="Pick a drill to begin" />
    );

    expect(getByText('Roulette Training')).toBeTruthy();
    expect(getByText('Pick a drill to begin')).toBeTruthy();
  });
});
