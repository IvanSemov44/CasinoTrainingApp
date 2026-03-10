import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { StatTile } from './StatTile';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('StatTile', () => {
  it('renders label and numeric value', () => {
    const { getByText } = renderWithTheme(<StatTile label="Streak" value={12} />);

    expect(getByText('Streak')).toBeTruthy();
    expect(getByText('12')).toBeTruthy();
  });

  it('renders string values', () => {
    const { getByText } = renderWithTheme(<StatTile label="Mode" value="Hard" />);

    expect(getByText('Mode')).toBeTruthy();
    expect(getByText('Hard')).toBeTruthy();
  });
});
