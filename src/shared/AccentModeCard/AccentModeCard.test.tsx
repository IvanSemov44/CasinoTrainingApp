import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@contexts/ThemeContext';
import { AccentModeCard } from './AccentModeCard';

function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider>{component}</ThemeProvider>);
}

describe('AccentModeCard', () => {
  it('renders title, description, and badge label', () => {
    const { getByText } = renderWithTheme(
      <AccentModeCard
        title="Speed Drill"
        description="Quick-fire mode"
        accentColor="#ff0000"
        onPress={jest.fn()}
        badge={{ label: 'Hard', color: '#00ff00' }}
      />
    );

    expect(getByText('Speed Drill')).toBeTruthy();
    expect(getByText('Quick-fire mode')).toBeTruthy();
    expect(getByText('Hard')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <AccentModeCard
        title="Mode"
        description="Description"
        accentColor="#ff0000"
        onPress={onPress}
      />
    );

    fireEvent.press(getByText('Mode'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
